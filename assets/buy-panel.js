const FADE_MS = 150;

/**
 * Product page buy panel: "+" opens the size picker, a size adds that variant to the cart through
 * Horizon's product form, "INFORMATION" shows the description, "X" closes.
 */
class BuyPanel extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      const button = /** @type {Element} */ (event.target).closest('[data-action]');
      if (!(button instanceof HTMLElement)) return;

      switch (button.dataset.action) {
        case 'open':
          return this.#goTo('size', false);
        case 'info':
          return this.#goTo('info', false);
        case 'close':
          return this.#goTo('default', true);
        case 'size':
          return this.#addToCart(button.dataset.variantId);
      }
    });
  }

  /**
   * Opening swaps instantly (CSS animates the sizes in); closing fades out and back in.
   * @param {string} state
   * @param {boolean} fade
   */
  #goTo(state, fade) {
    if (!fade) {
      this.dataset.state = state;
      return;
    }

    this.classList.add('is-fading');

    setTimeout(() => {
      this.dataset.state = state;
      this.classList.remove('is-fading');
    }, FADE_MS);
  }

  /** @param {string | undefined} variantId */
  #addToCart(variantId) {
    const form = this.querySelector('form');
    const idInput = form?.querySelector('input[name="id"]');
    if (!variantId || !form || !(idInput instanceof HTMLInputElement)) return;

    // Horizon's <product-form-component> submits whatever variant id the form holds.
    idInput.value = variantId;
    form.requestSubmit();
    this.#goTo('default', true);
  }
}

if (!customElements.get('buy-panel')) customElements.define('buy-panel', BuyPanel);
