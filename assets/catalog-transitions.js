/**
 * Catalog page transitions.
 *
 * 1. Homepage <-> product page: feeds Horizon's cross-page "product image" view transition
 *    (assets/view-transitions.js, base.css) and tells the zoom animation in sections/catalog-bar.liquid
 *    which direction it is going and where to zoom from (`html[data-catalog-nav]`, `--catalog-origin`).
 *    Needs the `transition_to_main_product` theme setting on.
 * 2. Product page: wheel / swipe / ArrowUp / ArrowDown swap in the previous / next product of the
 *    homepage list in place (see "Product swap" below).
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
 * On a product page the wheel, a vertical swipe or ArrowUp / ArrowDown moves to the next / previous
 * product of the homepage list WITHOUT a page load:
 *   - the target product page is fetched (same origin only, handle validated) and parsed with
 *     DOMParser; only its product section node is imported, nothing is injected as a string;
 *   - the new section is stacked on the old one inside <main> (a one-cell grid with clipped
 *     overflow, CSS in sections/catalog-bar.liquid) and both slide for 300ms, then the old one is removed;
 *   - the address is replaced (replaceState, never pushState) about 300ms in.
 * The neighbours' pages and main images are preloaded after the page settles. Anything that fails
 * falls back to a normal navigation to the target product.
 *
 * Event handlers need no re-initialisation: Horizon's `on:` handlers are delegated from document,
 * and the product components (buy panel, gallery, product form) start themselves when inserted.
 *
 * The list is printed by sections/catalog-bar.liquid as #catalog-list. Which Male / Female view it
 * follows is remembered by the homepage in sessionStorage (Male by default).
 */
const SWAP_MS = 300;
const COOLDOWN_MS = 250;
const WHEEL_THRESHOLD = 40;
const WHEEL_GESTURE_GAP_MS = 120;
const SWIPE_THRESHOLD = 50;
const MIN_LOCK_HEIGHT = 480;
const OWN_SCROLL = 'cart-drawer-component, [role="dialog"], input, textarea, select, [contenteditable]';
const PRODUCT_PATH = /^(?:\/[A-Za-z]{2}(?:-[A-Za-z0-9]{2,4})?)?\/products\/[a-z0-9][a-z0-9_-]*\/?$/i;

/**
 * A same-origin product URL, or null. Only plain /products/<handle> paths are ever fetched.
 * @param {string | undefined} url
 */
function safeProductUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== window.location.origin || !PRODUCT_PATH.test(parsed.pathname)) return null;
    return new URL(parsed.pathname, window.location.origin);
  } catch {
    return null;
  }
}

/** @returns {{ prev: string | null, next: string | null } | null} */
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

  const wrap = data.dataset.wrap === 'true';

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

  const at = (/** @type {number} */ i) => items[wrap ? (i + items.length) % items.length : i]?.u ?? null;
  return { prev: at(index - 1), next: at(index + 1) };
}

function initProductSwap() {
  const main = document.getElementById('MainContent');
  const root = document.documentElement;

  if (!main || !main.dataset.template?.startsWith('product')) return;

  let neighbours = findNeighbours();
  if (!neighbours) {
    console.info('[catalog] scroll navigation is off: this product is not in the homepage list (#catalog-list).');
    return;
  }

  // Everything is removed together if the page goes away.
  const lifetime = new AbortController();
  const { signal } = lifetime;
  window.addEventListener('pagehide', () => lifetime.abort(), { once: true });

  /** @type {Map<string, Promise<Document>>} */
  const pages = new Map();

  /**
   * Fetch and parse a product page (cached). The text only ever goes through DOMParser.
   * @param {URL} url
   */
  const load = (url) => {
    let page = pages.get(url.pathname);
    if (!page) {
      page = fetch(url.pathname, { credentials: 'same-origin', signal }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return new DOMParser().parseFromString(await response.text(), 'text/html');
      });
      page.catch(() => pages.delete(url.pathname));
      pages.set(url.pathname, page);
    }
    return page;
  };

  /** The product section node in a parsed page: the one section inside <main> that holds the viewer. */
  const viewerOf = (/** @type {Document} */ doc) =>
    [...(doc.getElementById('MainContent')?.querySelectorAll(':scope > .shopify-section') ?? [])].find((section) =>
      section.querySelector('.product-information')
    ) ?? null;

  // After the page settles, preload the neighbours' HTML and their main image.
  const warm = () => {
    const idle = window.requestIdleCallback ?? ((/** @type {() => void} */ fn) => setTimeout(fn, 300));
    idle(() => {
      for (const target of [neighbours?.prev, neighbours?.next]) {
        const url = safeProductUrl(target ?? undefined);
        if (!url) continue;

        load(url)
          .then((doc) => {
            const image = viewerOf(doc)?.querySelector('.product-information__media img');
            if (!(image instanceof HTMLImageElement)) return;

            const preload = new Image();
            preload.sizes = image.sizes;
            preload.srcset = image.srcset;
            preload.src = image.src;
          })
          .catch(() => {});
      }
    });
  };
  warm();

  // Like yeezy.com the page is one screen tall and doesn't scroll (unless the screen is very short).
  const syncLock = () => root.classList.toggle('catalog-product-lock', window.innerHeight >= MIN_LOCK_HEIGHT);
  syncLock();
  window.addEventListener('resize', syncLock, { signal });
  signal.addEventListener('abort', () => root.classList.remove('catalog-product-lock'));

  let busy = false;

  /** True while the page is locked and the event isn't inside something that scrolls on its own. */
  const locked = (/** @type {EventTarget | null} */ target) => {
    if (!root.classList.contains('catalog-product-lock') || document.querySelector('dialog[open]')) return false;
    if (!(target instanceof Element)) return true;
    if (target.closest(OWN_SCROLL)) return false;

    const info = target.closest('.buy-panel__pane--info');
    return !(info instanceof HTMLElement && info.scrollHeight > info.clientHeight);
  };

  /** @param {'prev' | 'next'} direction */
  async function swap(direction) {
    const url = safeProductUrl(neighbours?.[direction] ?? undefined);
    if (!url || busy) return;
    busy = true;

    try {
      const incoming = await load(url);
      const section = viewerOf(incoming);
      const outgoing = [...main.querySelectorAll(':scope > .shopify-section')].find((el) =>
        el.querySelector('.product-information')
      );
      if (!section || !outgoing) throw new Error('Product section not found');

      const down = direction === 'next';
      const entering = /** @type {HTMLElement} */ (document.importNode(section, true));

      outgoing.classList.add(down ? 'catalog-exit-up' : 'catalog-exit-down');
      entering.classList.add(down ? 'catalog-enter-from-below' : 'catalog-enter-from-above', 'catalog-settle');
      main.append(entering);

      document.title = incoming.title;
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.querySelector('.page-wrapper')?.scrollTo({ top: 0, behavior: 'instant' });

      // About 300ms in: the slide has finished. replaceState, never pushState, so Back isn't flooded.
      await new Promise((resolve) => setTimeout(resolve, SWAP_MS));

      history.replaceState(history.state, '', url.pathname);
      outgoing.remove();
      entering.classList.remove('catalog-enter-from-below', 'catalog-enter-from-above');

      neighbours = findNeighbours();
      warm();
    } catch (error) {
      if (!signal.aborted) {
        console.warn('[catalog] in-page product swap failed, navigating instead.', error);
        window.location.assign(url.pathname);
      }
      return;
    }

    // Cooldown so one gesture (and its inertia) never changes more than one product.
    setTimeout(() => (busy = false), COOLDOWN_MS);
  }

  // Wheel: non-passive, on the viewer only. One swap per scroll gesture; a gesture is a run of wheel
  // events with gaps under WHEEL_GESTURE_GAP_MS, so trackpad inertia can't trigger a second swap.
  let wheelTotal = 0;
  let lastWheel = 0;
  let gestureUsed = false;

  main.addEventListener(
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

      wheelTotal += event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      if (Math.abs(wheelTotal) >= WHEEL_THRESHOLD) {
        gestureUsed = true;
        swap(wheelTotal > 0 ? 'next' : 'prev');
      }
    },
    { passive: false, signal }
  );

  // Touch: a mostly vertical swipe. Swipe up = next, swipe down = previous.
  let touchX = 0;
  let touchY = 0;

  main.addEventListener(
    'touchstart',
    (event) => {
      touchX = event.touches[0]?.clientX ?? 0;
      touchY = event.touches[0]?.clientY ?? 0;
    },
    { passive: true, signal }
  );

  main.addEventListener(
    'touchend',
    (event) => {
      if (busy || !locked(event.target)) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touchX - touch.clientX;
      const dy = touchY - touch.clientY;

      // Horizontal swipes belong to the image carousel.
      if (Math.abs(dy) >= SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx) * 1.5) swap(dy > 0 ? 'next' : 'prev');
    },
    { passive: true, signal }
  );

  // Keyboard: ArrowDown = next, ArrowUp = previous. Left / Right stay with the image gallery.
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (busy || !locked(event.target)) return;

      event.preventDefault();
      swap(event.key === 'ArrowDown' ? 'next' : 'prev');
    },
    { signal }
  );

  console.info('[catalog] scroll navigation ready:', neighbours);
}

initProductSwap();
