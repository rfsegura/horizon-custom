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
