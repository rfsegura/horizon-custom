/** Catalog homepage: MALE/FEMALE tile toggle and grid density toggle. No URL changes. */
class CatalogGrid extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      const target = /** @type {Element} */ (event.target);
      const genderButton = target.closest('[data-gender-btn]');
      const densityButton = target.closest('[data-density]');

      if (genderButton instanceof HTMLElement) this.#showGender(genderButton.dataset.genderBtn ?? '');
      if (densityButton instanceof HTMLElement) this.#toggleDensity(densityButton);
    });
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
