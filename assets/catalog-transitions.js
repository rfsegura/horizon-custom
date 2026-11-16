import { startViewTransition } from '@theme/utilities';

/**
 * Catalog page transitions.
 *
 * 1. Homepage <-> product page: feeds Horizon's cross-page "product image" view transition
 *    (assets/view-transitions.js, base.css) and tells the zoom animation in sections/catalog-bar.liquid
 *    which direction it is going and where to zoom from (`html[data-catalog-nav]`, `--catalog-origin`).
 *    Needs the `transition_to_main_product` theme setting on.
 * 2. Product page: the mouse wheel / swipe swaps in the previous / next product of the homepage list
 *    in place, like yeezy.com (see "Product swap" below).
 *
 * Browsers without view transitions simply navigate / swap without animation.
 */
const TYPE = 'product-image-transition';
const ORIGIN_KEY = 'catalog-zoom-origin';
const GENDER_KEY = 'catalog-gender';

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
 * Product swap
 *
 * Like yeezy.com's product viewer: on a product page the wheel (or a vertical swipe) moves to the
 * next / previous product of the homepage list WITHOUT a page load. The next product's page is
 * fetched in the background, its <main> content replaces the current one inside a 300ms vertical
 * slide (a same-document view transition, CSS in sections/catalog-bar.liquid), and the address bar
 * is updated with replaceState about 300ms in, so the back button isn't filled with every product
 * you scrolled past. Anything that fails falls back to a normal page navigation.
 *
 * The list is printed by sections/catalog-bar.liquid as #catalog-list. Which Male / Female view it
 * follows is remembered by the homepage in sessionStorage (Male by default).
 */
const SWAP_MS = 300;
const WHEEL_THRESHOLD = 40;
const WHEEL_GESTURE_GAP_MS = 120;
const SWIPE_THRESHOLD = 50;
const MIN_LOCK_HEIGHT = 480;
const OWN_SCROLL = 'cart-drawer-component, [role="dialog"], input, textarea, select';

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

function initProductSwap() {
  const main = document.getElementById('MainContent');
  const root = document.documentElement;

  if (!main || main.dataset.template !== 'product') return;

  let neighbours = findNeighbours();
  if (!neighbours) {
    console.info('[catalog] scroll navigation is off: this product is not in the homepage list (#catalog-list).');
    return;
  }

  /** @type {Map<string, Promise<string>>} */
  const pages = new Map();

  /** @param {string} url */
  const load = (url) => {
    let page = pages.get(url);
    if (!page) {
      page = fetch(url, { credentials: 'same-origin' }).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      });
      page.catch(() => pages.delete(url));
      pages.set(url, page);
    }
    return page;
  };

  // Keep the neighbours warm so a scroll never waits on the network.
  const warm = () => {
    if (!neighbours) return;
    for (const url of [neighbours.prev, neighbours.next]) load(url).catch(() => {});
  };
  warm();

  // Like yeezy.com the page is one screen tall and doesn't scroll (unless the screen is very short).
  const syncLock = () => root.classList.toggle('catalog-product-lock', window.innerHeight >= MIN_LOCK_HEIGHT);
  syncLock();
  window.addEventListener('resize', syncLock);

  let busy = false;

  /** True while the page is locked and the event is not inside something with its own scrolling. */
  const locked = (/** @type {EventTarget | null} */ target) => {
    if (!root.classList.contains('catalog-product-lock') || document.querySelector('dialog[open]')) return false;
    if (!(target instanceof Element)) return true;
    if (target.closest(OWN_SCROLL)) return false;

    const info = target.closest('.buy-panel__pane--info');
    return !(info instanceof HTMLElement && info.scrollHeight > info.clientHeight);
  };

  /** @param {'prev' | 'next'} direction */
  async function swap(direction) {
    const url = neighbours?.[direction];
    if (!url || busy) return;
    busy = true;

    try {
      const html = await load(url);
      const incoming = new DOMParser().parseFromString(html, 'text/html');
      const content = incoming.getElementById('MainContent');
      if (!content) throw new Error('No main content in the fetched page');

      root.dataset.catalogSwap = direction;

      await startViewTransition(() => {
        main.replaceChildren(...document.importNode(content, true).childNodes);
        document.title = incoming.title;
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.querySelector('.page-wrapper')?.scrollTo({ top: 0, behavior: 'instant' });

        // About 300ms in, like yeezy.com: replace (not push) the address so Back isn't filled
        // with every product that was scrolled past.
        setTimeout(() => {
          history.replaceState(history.state, '', url);
          neighbours = findNeighbours();
          warm();
        }, SWAP_MS);
      });
    } catch (error) {
      console.warn('[catalog] in-page product swap failed, navigating instead.', error);
      window.location.assign(url);
      return;
    } finally {
      delete root.dataset.catalogSwap;
    }

    // Settle: ignore further scrolling until the new product has finished fading in.
    setTimeout(() => (busy = false), SWAP_MS);
  }

  // Wheel: one swap per scroll gesture. A gesture is a run of wheel events with gaps under
  // WHEEL_GESTURE_GAP_MS, so trackpad inertia after a swap doesn't trigger another one.
  let wheelTotal = 0;
  let lastWheel = 0;
  let gestureUsed = false;

  window.addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey || !locked(event.target)) return;

      // The page is locked: always swallow the scroll so it can't rubber-band.
      event.preventDefault();

      const now = performance.now();
      if (now - lastWheel > WHEEL_GESTURE_GAP_MS) {
        wheelTotal = 0;
        gestureUsed = false;
      }
      lastWheel = now;

      if (busy || gestureUsed) return;

      wheelTotal += event.deltaY;
      if (Math.abs(wheelTotal) >= WHEEL_THRESHOLD) {
        gestureUsed = true;
        swap(wheelTotal > 0 ? 'next' : 'prev');
      }
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
      if (busy || !locked(event.target)) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touchX - touch.clientX;
      const dy = touchY - touch.clientY;

      // Mostly vertical only; horizontal swipes belong to the image carousel.
      if (Math.abs(dy) >= SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx) * 1.5) swap(dy > 0 ? 'next' : 'prev');
    },
    { passive: true }
  );

  console.info('[catalog] scroll navigation ready:', neighbours);
}

initProductSwap();
