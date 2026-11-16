/**
 * Catalog page transitions.
 *
 * 1. Homepage <-> product page: feeds Horizon's cross-page "product image" view transition
 *    (assets/view-transitions.js, base.css) and tells the zoom animation in sections/catalog-bar.liquid
 *    which direction it is going and where to zoom from (`html[data-catalog-nav]`, `--catalog-origin`).
 *    Needs the `transition_to_main_product` theme setting on.
 * 2. Product page: wheel / swipe / ArrowUp / ArrowDown swap in the previous / next color of the same
 *    product in place (see "Product swap" below).
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
 * Product swap: scroll between the colors of this product
 *
 * On a product page the wheel, a vertical swipe or ArrowUp / ArrowDown moves to the next / previous
 * COLOR of the same product WITHOUT a page load:
 *   - each color is a variant link printed by blocks/buy-panel.liquid (script[data-catalog-colors]);
 *   - the target page (same product, ?variant=<first variant of that color>) is fetched (same origin
 *     only, path and variant id validated) and parsed with DOMParser; only its product section node
 *     is imported, nothing is injected as a string;
 *   - the new section is stacked on the old one inside <main> (a one-cell grid with clipped
 *     overflow, CSS in sections/catalog-bar.liquid) and both slide for 300ms, then the old one is removed;
 *   - the address is replaced (replaceState, never pushState) about 300ms in.
 * The neighbouring colors' pages and main images are preloaded after the page settles. Anything that
 * fails falls back to a normal navigation to that color.
 *
 * Event handlers need no re-initialisation: Horizon's `on:` handlers are delegated from document,
 * and the product components (buy panel, gallery, product form) start themselves when inserted.
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
 * A same-origin /products/<handle>[?variant=<digits>] URL, or null. Nothing else is ever fetched.
 * @param {string | null | undefined} url
 */
function safeVariantUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== window.location.origin || !PRODUCT_PATH.test(parsed.pathname)) return null;

    const variant = parsed.searchParams.get('variant');
    if (variant !== null && !/^\d+$/.test(variant)) return null;

    const safe = new URL(parsed.pathname, window.location.origin);
    if (variant) safe.searchParams.set('variant', variant);
    return safe;
  } catch {
    return null;
  }
}

/**
 * The previous / next color's URL, read from the colors list inside the given product section.
 * @param {ParentNode} scope
 * @returns {{ prev: string | null, next: string | null } | null}
 */
function readColors(scope) {
  const data = scope.querySelector('script[data-catalog-colors]');
  if (!data) return null;

  /** @type {{ n: string, u: string }[]} */
  let colors;
  try {
    colors = JSON.parse(data.textContent ?? '[]');
  } catch {
    return null;
  }

  const current = Number(data.getAttribute('data-current'));
  if (!Array.isArray(colors) || colors.length < 2 || !colors[current]) return null;

  const wrap = data.getAttribute('data-wrap') === 'true';
  const at = (/** @type {number} */ i) => colors[wrap ? (i + colors.length) % colors.length : i]?.u ?? null;

  return { prev: at(current - 1), next: at(current + 1) };
}

function initProductSwap() {
  const main = document.getElementById('MainContent');
  const root = document.documentElement;

  if (!main || !main.dataset.template?.startsWith('product')) return;

  let neighbours = readColors(main);
  if (!neighbours) {
    console.info('[catalog] scroll navigation is off: this product has fewer than two colors.');
    return;
  }

  // Everything is removed together if the page goes away (but not when it only enters the back/forward cache).
  const lifetime = new AbortController();
  const { signal } = lifetime;
  window.addEventListener('pagehide', (event) => !event.persisted && lifetime.abort());

  /** @type {Map<string, Promise<Document>>} */
  const pages = new Map();

  /**
   * Fetch and parse a color's page (cached). The text only ever goes through DOMParser.
   * @param {URL} url
   */
  const load = (url) => {
    const key = url.pathname + url.search;
    let page = pages.get(key);
    if (!page) {
      page = fetch(key, { credentials: 'same-origin', signal }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return new DOMParser().parseFromString(await response.text(), 'text/html');
      });
      page.catch(() => pages.delete(key));
      pages.set(key, page);
    }
    return page;
  };

  /** The product section node of a page: the section inside <main> that holds the viewer. */
  const viewerOf = (/** @type {ParentNode} */ scope) =>
    [...scope.querySelectorAll(':scope > .shopify-section')].find((section) =>
      section.querySelector('.product-information')
    ) ?? null;

  // After the page settles, preload the neighbouring colors' HTML and their main image.
  const warm = () => {
    const idle = window.requestIdleCallback ?? ((/** @type {() => void} */ fn) => setTimeout(fn, 300));
    idle(() => {
      for (const target of [neighbours?.prev, neighbours?.next]) {
        const url = safeVariantUrl(target);
        if (!url) continue;

        load(url)
          .then((doc) => {
            const section = viewerOf(doc.getElementById('MainContent') ?? doc);
            const image = section?.querySelector('.product-information__media img');
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

  // Like yeezy.com the page is one screen tall and doesn't scroll (unless the screen is very short).
  // Checked again whenever it matters: a prerendered page can report a 0px window while it loads.
  const tallEnough = () => window.innerHeight >= MIN_LOCK_HEIGHT;
  const syncLock = () => root.classList.toggle('catalog-product-lock', tallEnough());
  syncLock();
  window.addEventListener('resize', syncLock, { signal });
  window.addEventListener('pageshow', syncLock, { signal });
  signal.addEventListener('abort', () => root.classList.remove('catalog-product-lock'));

  // Don't fetch the neighbours while this page is only being prerendered.
  if (document.prerendering) {
    document.addEventListener(
      'prerenderingchange',
      () => {
        syncLock();
        warm();
      },
      { once: true }
    );
  } else {
    warm();
  }

  let busy = false;
  let notes = 0;

  /**
   * Why a scroll / swipe / key press must be left alone, or null when it should change color.
   * @param {EventTarget | null} target
   */
  const blockedBy = (target) => {
    let reason = null;

    if (!tallEnough()) {
      reason = `the window is shorter than ${MIN_LOCK_HEIGHT}px (${window.innerHeight}px)`;
    } else if (document.querySelector('dialog[open]')) {
      reason = 'a dialog is open';
    } else if (target instanceof Element && target.closest(OWN_SCROLL)) {
      reason = `the event is inside ${target.closest(OWN_SCROLL)?.tagName.toLowerCase()}`;
    } else if (target instanceof Element) {
      const info = target.closest('.buy-panel__pane--info');
      if (info instanceof HTMLElement && info.scrollHeight > info.clientHeight) reason = 'the description is scrolling';
    }

    if (reason && notes++ < 3) console.info(`[catalog] scroll navigation skipped: ${reason}.`);
    if (!reason) syncLock();
    return reason;
  };

  const locked = (/** @type {EventTarget | null} */ target) => blockedBy(target) === null;

  /** @param {'prev' | 'next'} direction */
  async function swap(direction) {
    const url = safeVariantUrl(neighbours?.[direction]);
    if (!url || busy) return;
    busy = true;

    const address = url.pathname + url.search;

    try {
      const incoming = await load(url);
      const section = viewerOf(incoming.getElementById('MainContent') ?? incoming);
      const outgoing = viewerOf(main);
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

      history.replaceState(history.state, '', address);
      outgoing.remove();
      entering.classList.remove('catalog-enter-from-below', 'catalog-enter-from-above');

      neighbours = readColors(main);
      warm();
    } catch (error) {
      if (!signal.aborted) {
        console.warn('[catalog] in-page color swap failed, navigating instead.', error);
        window.location.assign(address);
      }
      return;
    }

    // Cooldown so one gesture (and its inertia) never changes more than one color.
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
