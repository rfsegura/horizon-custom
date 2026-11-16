import { StandardEvents } from '@shopify/events';

const FADE_MS = 150;
const CROSSFADE_MS = 350;
const ADDING_TIMEOUT_MS = 8000;

/**
 * Product page buy panel: "+" opens the size picker, a size adds that variant to the cart through
 * Horizon's product form, "INFORMATION" shows the description, "X" closes.
 * States (data-state): default | size | info | adding.
 */
class BuyPanel extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      const button = /** @type {Element} */ (event.target).closest('[data-action]');
      if (!(button instanceof HTMLElement)) return;

      switch (button.dataset.action) {
        case 'open':
          // Instant swap; CSS animates the sizes spreading out.
          return void (this.dataset.state = 'size');
        case 'info':
          return this.#showInfo();
        case 'close':
          return this.#fadeTo('default');
        case 'size':
          return this.#addToCart(button.dataset.variantId);
      }
    });
  }

  /** Size row fades out while the information text fades in, in the same place. */
  #showInfo() {
    this.toggleAttribute('data-leaving', true);
    this.dataset.state = 'info';
    setTimeout(() => this.removeAttribute('data-leaving'), CROSSFADE_MS);
  }

  /** @param {string} state */
  #fadeTo(state) {
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

    // Show "ADDING" right away; Horizon's cart round trip takes a moment.
    this.dataset.state = 'adding';

    const done = () => {
      clearTimeout(timeout);
      if (this.dataset.state === 'adding') this.dataset.state = 'size';
    };
    const timeout = setTimeout(done, ADDING_TIMEOUT_MS);

    document.addEventListener(
      StandardEvents.cartLinesUpdate,
      (event) => /** @type {any} */ (event).promise?.then(done, done) ?? done(),
      { once: true }
    );

    // Horizon's <product-form-component> submits whatever variant id the form holds.
    idInput.value = variantId;
    form.requestSubmit();
  }
}

if (!customElements.get('buy-panel')) customElements.define('buy-panel', BuyPanel);
