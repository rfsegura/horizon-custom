/**
 * Catalog homepage: MALE/FEMALE tile toggle, grid density toggle, and the color picker for
 * multi-color products. None of it changes the URL; color tiles link to real product URLs.
 */
class CatalogGrid extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      const target = /** @type {Element} */ (event.target);
      const genderButton = target.closest('[data-gender-btn]');
      const densityButton = target.closest('[data-density]');
      const tile = target.closest('[data-gender]');
      const colors = tile?.querySelector('template[data-colors]');

      if (genderButton instanceof HTMLElement) {
        this.#closeColors();
        this.#showGender(genderButton.dataset.genderBtn ?? '');
      } else if (densityButton instanceof HTMLElement) {
        this.#toggleDensity(densityButton);
      } else if (colors instanceof HTMLTemplateElement && target.closest('a')) {
        event.preventDefault();
        this.#openColors(colors);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.#closeColors();
    });
  }

  get #mainGrid() {
    return /** @type {HTMLElement} */ (this.querySelector('[data-main-grid]'));
  }

  get #colorGrid() {
    return /** @type {HTMLElement} */ (this.querySelector('[data-color-grid]'));
  }

  /** @param {HTMLTemplateElement} template */
  #openColors(template) {
    this.#colorGrid.replaceChildren(template.content.cloneNode(true));
    this.#mainGrid.hidden = true;
    this.#colorGrid.hidden = false;
    window.scrollTo(0, 0);
  }

  #closeColors() {
    this.#colorGrid.hidden = true;
    this.#colorGrid.replaceChildren();
    this.#mainGrid.hidden = false;
  }

  /** @param {string} gender */
  #showGender(gender) {
    for (const tile of this.querySelectorAll('[data-gender]')) {
      const genders = /** @type {HTMLElement} */ (tile).dataset.gender?.split(' ') ?? [];
      /** @type {HTMLElement} */ (tile).hidden = !genders.includes(gender);
    }

    for (const button of this.querySelectorAll('[data-gender-btn]')) {
      button.setAttribute('aria-pressed', String(/** @type {HTMLElement} */ (button).dataset.genderBtn === gender));
    }
  }

  /** @param {HTMLElement} button */
  #toggleDensity(button) {
    const dense = this.toggleAttribute('dense');
    button.setAttribute('aria-pressed', String(dense));
    button.textContent = dense ? '<' : '+';
  }
}

if (!customElements.get('catalog-grid')) customElements.define('catalog-grid', CatalogGrid);
