/**
 * Feeds Horizon's cross-page "product image" view transition (assets/view-transitions.js, base.css)
 * from the catalog: tile -> product page, and the back arrow -> the tile on the homepage. It also
 * tells the page-zoom animation in sections/catalog-bar.liquid which direction it is going and
 * where to zoom from (`html[data-catalog-nav]`, `--catalog-origin`).
 * Needs the `transition_to_main_product` theme setting on. Browsers without cross-document view
 * transitions simply navigate normally.
 */
const TYPE = 'product-image-transition';
const ORIGIN_KEY = 'catalog-zoom-origin';

/** @param {Element | null | undefined} element */
function markTriggered(element) {
  element?.setAttribute('data-view-transition-type', TYPE);
  element?.setAttribute('data-view-transition-triggered', 'true');
}

/**
 * The element's centre as a percentage of the viewport, e.g. "37.5% 52%".
 * @param {Element} element
 */
function centreOf(element) {
  const rect = element.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
}

document.addEventListener('click', (event) => {
  // The grid's own handler cancels the click when it opens the color picker: not a navigation.
  if (event.defaultPrevented || !(event.target instanceof Element)) return;

  if (event.target.closest('.catalog-bar__back')) {
    // On a product page the main gallery image already carries the attribute from Liquid.
    markTriggered(document.querySelector(`[data-view-transition-type="${TYPE}"]`));
    return;
  }

  const link = event.target.closest('.catalog__link');
  if (!link) return;

  markTriggered(link.querySelector('img'));

  try {
    // The animation CSS runs in the NEW page, so hand it the zoom origin through storage.
    sessionStorage.setItem(ORIGIN_KEY, centreOf(link.querySelector('img') ?? link));
  } catch {
    // Storage blocked: the zoom just originates from the centre.
  }
});

window.addEventListener('pagereveal', (event) => {
  const transition = /** @type {PageRevealEvent} */ (event).viewTransition;
  const from = window.navigation?.activation?.from?.url;
  if (!transition || !from) return;

  const root = document.documentElement;
  const path = new URL(from).pathname;

  // Arriving from scrolling to the next / previous product: slide in the matching direction.
  let direction = null;
  try {
    direction = sessionStorage.getItem("catalog-dir");
    sessionStorage.removeItem("catalog-dir");
  } catch {
    // Ignored, see above.
  }

  if (direction === "next" || direction === "prev") {
    root.dataset.catalogNav = direction;
    transition.finished.finally(() => {
      delete root.dataset.catalogNav;
    });
    return;
  }
  const link = [...document.querySelectorAll('[data-main-grid] .catalog__link')].find(
    (a) => new URL(/** @type {HTMLAnchorElement} */ (a).href).pathname === path
  );

  if (link) {
    // Back on the homepage from a product page: that product's tile is the landing target, and the
    // grid zooms back out from it.
    const image = link.querySelector('img');
    image?.setAttribute('data-view-transition-type', TYPE);
    root.style.setProperty('--catalog-origin', centreOf(image ?? link));
    root.dataset.catalogNav = 'back';
  } else if (!document.querySelector('[data-main-grid]')) {
    // Arriving on a product page: the old grid zooms in toward the tile that was clicked.
    let origin = null;
    try {
      origin = sessionStorage.getItem(ORIGIN_KEY);
      sessionStorage.removeItem(ORIGIN_KEY);
    } catch {
      // Ignored, see above.
    }

    if (origin) {
      root.style.setProperty('--catalog-origin', origin);
      root.dataset.catalogNav = 'forward';
    }
  }

  transition.finished.finally(() => {
    delete root.dataset.catalogNav;
    root.style.removeProperty('--catalog-origin');
  });
});

/*
 * Product page: scroll / swipe moves to the previous / next product of the homepage list, in the
 * Male / Female view the visitor came from (remembered by the homepage in sessionStorage; Male by
 * default). The list is printed by sections/catalog-bar.liquid as #catalog-list.
 * The page doesn't scroll while the product (almost) fits on screen (html.catalog-product-lock). If
 * the content is clearly taller than the screen (e.g. a phone in landscape) scrolling is left alone.
 */
const DIR_KEY = 'catalog-dir';
const GENDER_KEY = 'catalog-gender';
const WHEEL_THRESHOLD = 60;
const SWIPE_THRESHOLD = 60;
const OVERFLOW_TOLERANCE = 200;

/** @returns {{ prev: string, next: string } | null} */
function findNeighbours() {
  const data = document.getElementById('catalog-list');
  if (!data) return null;

  /** @type {{ u: string, m: boolean, f: boolean }[]} */
  let list;
  try {
    list = JSON.parse(data.textContent ?? '[]');
  } catch {
    return null;
  }

  /** @param {string} url */
  const handleOf = (url) => url.split('/products/')[1]?.split(/[?#]/)[0];
  const current = handleOf(window.location.pathname);
  const me = list.find((item) => handleOf(item.u) === current);
  if (!me) return null;

  let preferred = 'male';
  try {
    preferred = sessionStorage.getItem(GENDER_KEY) ?? 'male';
  } catch {
    // Storage blocked: default list.
  }

  // The view the visitor came from, if this product is in it; otherwise whichever view it is in.
  const gender = (preferred === 'female' ? me.f : me.m) ? preferred : me.m ? 'male' : 'female';
  const key = gender === 'female' ? 'f' : 'm';
  const items = list.filter((item) => item[key]);
  const index = items.findIndex((item) => handleOf(item.u) === current);
  if (items.length < 2 || index < 0) return null;

  return {
    prev: /** @type {string} */ (items[(index - 1 + items.length) % items.length]?.u),
    next: /** @type {string} */ (items[(index + 1) % items.length]?.u),
  };
}

const urls = findNeighbours();

if (urls) {
  const root = document.documentElement;
  let navigating = false;
  let wheelTotal = 0;
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let wheelReset;

  // Have both neighbours ready before the scroll happens.
  const rules = document.createElement('script');
  rules.type = 'speculationrules';
  rules.textContent = JSON.stringify({ prerender: [{ urls: [urls.prev, urls.next], eagerness: 'immediate' }] });
  document.head.append(rules);

  const fits = () => {
    const section = document.querySelector('.product-information');
    const bar = document.querySelector('#header-group');
    if (!section) return false;
    const overflow = section.scrollHeight + (bar?.clientHeight ?? 0) - window.innerHeight;
    return overflow <= OVERFLOW_TOLERANCE;
  };

  const syncLock = () => root.classList.toggle('catalog-product-lock', fits());
  syncLock();
  window.addEventListener('resize', syncLock);
  window.addEventListener('load', syncLock);
  window.addEventListener('pageshow', () => {
    navigating = false;
    syncLock();
  });

  /** Anything that should keep its own scrolling or gestures. */
  const isBusy = (/** @type {EventTarget | null} */ target) => {
    if (document.querySelector('dialog[open]')) return true;
    if (!(target instanceof Element)) return false;
    if (target.closest('cart-drawer-component, [role="dialog"], input, textarea, select')) return true;

    const info = target.closest('.buy-panel__pane--info');
    return info instanceof HTMLElement && info.scrollHeight > info.clientHeight;
  };

  /** @param {'prev' | 'next'} direction */
  const go = (direction) => {
    if (navigating) return;

    navigating = true;
    try {
      sessionStorage.setItem(DIR_KEY, direction);
    } catch {
      // Storage blocked: it just navigates without the slide direction.
    }
    window.location.assign(urls[direction]);
  };

  window.addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey || !fits() || isBusy(event.target)) return;

      // Stop the (locked) page from rubber-banding, then act once per deliberate scroll.
      event.preventDefault();
      wheelTotal += event.deltaY;
      clearTimeout(wheelReset);
      wheelReset = setTimeout(() => (wheelTotal = 0), 200);

      if (Math.abs(wheelTotal) >= WHEEL_THRESHOLD) go(wheelTotal > 0 ? 'next' : 'prev');
    },
    { passive: false }
  );

  let touchX = 0;
  let touchY = 0;

  window.addEventListener(
    'touchstart',
    (event) => {
      touchX = event.touches[0]?.clientX ?? 0;
      touchY = event.touches[0]?.clientY ?? 0;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    (event) => {
      if (!fits() || isBusy(event.target)) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touchX - touch.clientX;
      const dy = touchY - touch.clientY;

      // Mostly vertical only; horizontal swipes belong to the image carousel.
      if (Math.abs(dy) >= SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx) * 1.5) go(dy > 0 ? 'next' : 'prev');
    },
    { passive: true }
  );
}
