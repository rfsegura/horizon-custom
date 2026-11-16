/**
 * Feeds Horizon's cross-page "product image" view transition (assets/view-transitions.js, base.css)
 * from the catalog: tile -> product page, and the back arrow -> the tile on the homepage.
 * Needs the `transition_to_main_product` theme setting on. Browsers without cross-document view
 * transitions simply navigate normally.
 */
const TYPE = 'product-image-transition';

/** @param {Element | null | undefined} element */
function markTriggered(element) {
  element?.setAttribute('data-view-transition-type', TYPE);
  element?.setAttribute('data-view-transition-triggered', 'true');
}

document.addEventListener('click', (event) => {
  // The grid's own handler cancels the click when it opens the color picker: not a navigation.
  if (event.defaultPrevented || !(event.target instanceof Element)) return;

  if (event.target.closest('.catalog-bar__back')) {
    // On a product page the main gallery image already carries the attribute from Liquid.
    markTriggered(document.querySelector(`[data-view-transition-type="${TYPE}"]`));
  } else {
    markTriggered(event.target.closest('.catalog__link')?.querySelector('img'));
  }
});

// Arriving on the homepage from a product page: mark that product's tile as the landing target.
window.addEventListener('pagereveal', (event) => {
  const from = window.navigation?.activation?.from?.url;
  if (!from || !/** @type {PageRevealEvent} */ (event).viewTransition) return;

  const path = new URL(from).pathname;
  const link = [...document.querySelectorAll('[data-main-grid] .catalog__link')].find(
    (a) => new URL(/** @type {HTMLAnchorElement} */ (a).href).pathname === path
  );

  link?.querySelector('img')?.setAttribute('data-view-transition-type', TYPE);
});
