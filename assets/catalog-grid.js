import { startViewTransition } from '@theme/utilities';

const TILE_NAME = 'catalog-tile';

/**
 * Catalog homepage: MALE/FEMALE tile toggle, grid density toggle, and the color picker for
 * multi-color products. None of it changes the URL; color tiles link to real product URLs.
 */
class CatalogGrid extends HTMLElement {
  /** @type {Element | null} The grid tile whose colors are currently shown */
  #openedTile = null;

  connectedCallback() {

    this.addEventListener('click', (event) => {
      const target = /** @type {Element} */ (event.target);
      const genderButton = target.closest('[data-gender-btn]');
      const menuButton = target.closest('[data-menu]');
      const tile = target.closest('[data-gender]');
      const colors = tile?.querySelector('template[data-colors]');

      if (genderButton instanceof HTMLElement) {
        this.#closeColors(() => this.#showGender(genderButton.dataset.genderBtn ?? ''));
      } else if (menuButton) {
        // "<" while the picker is open goes back to the grid; otherwise the button toggles density.
        if (this.#colorGrid.hidden) this.toggleAttribute('dense');
        else this.#closeColors();
        this.#syncIcon();
      } else if (tile && colors instanceof HTMLTemplateElement && target.closest('a')) {
        event.preventDefault();
        this.#openColors(colors, tile);
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

  /** "<" when the grid is dense or the color picker is open, "+" otherwise. */
  #syncIcon() {
    this.querySelector('.catalog-icon')?.toggleAttribute('data-back', this.hasAttribute('dense') || !this.#colorGrid.hidden);
  }

  /**
   * Runs `update` inside a view transition that morphs `from` into the element `to()` returns.
   * @param {() => void} update
   * @param {Element | null} from
   * @param {() => Element | null} to
   */
  async #morph(update, from, to) {
    /** @type {HTMLElement | null} */ (from)?.style.setProperty('view-transition-name', TILE_NAME);
    // Scopes the picker-specific root animation in catalog-bar.liquid to this transition only.
    document.documentElement.dataset.catalogPicker = '';

    await startViewTransition(() => {
      /** @type {HTMLElement | null} */ (from)?.style.removeProperty('view-transition-name');
      update();
      /** @type {HTMLElement | null} */ (to())?.style.setProperty('view-transition-name', TILE_NAME);
    });

    /** @type {HTMLElement | null} */ (to())?.style.removeProperty('view-transition-name');
    delete document.documentElement.dataset.catalogPicker;
  }

  /**
   * @param {HTMLTemplateElement} template
   * @param {Element} tile
   */
  #openColors(template, tile) {
    this.#openedTile = tile;

    this.#morph(
      () => {
        this.#colorGrid.replaceChildren(template.content.cloneNode(true));
        this.#mainGrid.hidden = true;
        this.#colorGrid.hidden = false;
        this.#syncIcon();
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.querySelector('.page-wrapper')?.scrollTo({ top: 0, behavior: 'instant' });
      },
      tile,
      () => this.#colorGrid.firstElementChild
    );
  }

  /** @param {() => void} [after] Runs in the same transition, e.g. to switch gender */
  #closeColors(after) {
    if (this.#colorGrid.hidden) return after?.();

    this.#morph(
      () => {
        this.#colorGrid.hidden = true;
        this.#colorGrid.replaceChildren();
        this.#mainGrid.hidden = false;
        after?.();
        this.#syncIcon();
      },
      this.#colorGrid.firstElementChild,
      () => this.#openedTile
    );
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
}

if (!customElements.get('catalog-grid')) customElements.define('catalog-grid', CatalogGrid);
