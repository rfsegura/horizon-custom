import { startViewTransition } from '@theme/utilities';

const TILE_NAME = 'catalog-tile';

/**
 * Catalog homepage: tag filters (up to 10, each with sub-filters), grid density toggle, and the
 * color picker for multi-color products. None of it changes the URL; color tiles link to real
 * product URLs. Tiles carry their lowercased tags as "|a|b|" in data-tags.
 */
class CatalogGrid extends HTMLElement {
  /** @type {Element | null} The grid tile whose colors are currently shown */
  #openedTile = null;

  /** @type {HTMLElement | null} The active main filter */
  #filter = null;

  /** @type {Set<string>} Sub-filter tags picked under the active filter */
  #subs = new Set();

  connectedCallback() {
    this.#buildDynamicSubs();
    const first = this.querySelector('[data-filter]');
    if (first instanceof HTMLElement) {
      this.#filter = first;
      this.#applyFilters(false);
    }

    this.addEventListener('click', (event) => {
      const target = /** @type {Element} */ (event.target);
      const filterButton = target.closest('[data-filter-btn]');
      const subButton = target.closest('[data-sub-btn]');
      const menuButton = target.closest('[data-menu]');
      const tile = target.closest('[data-tags]');
      const colors = tile?.querySelector('template[data-colors]');

      if (filterButton) {
        const filter = /** @type {HTMLElement} */ (filterButton.closest('[data-filter]'));
        this.#closeColors(() => this.#pickFilter(filter));
      } else if (subButton instanceof HTMLElement) {
        const filter = /** @type {HTMLElement} */ (subButton.closest('[data-filter]'));
        this.#closeColors(() => this.#pickSub(filter, subButton.dataset.tag ?? ''));
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

    // Click anywhere outside a filter closes its sub-filter menu (click mode).
    document.addEventListener('click', (event) => {
      if (!(/** @type {Element} */ (event.target).closest('[data-filter]'))) this.#openMenu(null);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      this.#openMenu(null);
      this.#closeColors();
    });
  }

  /** Sub-filters open on click when the section says so, and always on touch screens. */
  get #clickMode() {
    return this.dataset.subTrigger === 'click' || !window.matchMedia('(hover: hover)').matches;
  }

  /** @param {Element | null} filter Opens this filter's sub-filter menu and closes the others */
  #openMenu(filter) {
    for (const el of this.querySelectorAll('[data-filter]')) {
      el.toggleAttribute('data-open', el === filter);
      el.querySelector('[data-filter-btn]')?.setAttribute('aria-expanded', String(el === filter));
    }
  }

  /** @param {HTMLElement} filter */
  #pickFilter(filter) {
    if (filter !== this.#filter) {
      this.#filter = filter;
      this.#subs.clear();
      this.#applyFilters();
      if (this.#clickMode) this.#openMenu(filter);
    } else if (this.#clickMode) {
      this.#openMenu(filter.hasAttribute('data-open') ? null : filter);
    }
  }

  /**
   * Picking a sub-filter of another main filter switches to that filter first (clearing the old
   * sub-filters). Picking an already-picked one turns it off.
   * @param {HTMLElement} filter
   * @param {string} tag
   */
  #pickSub(filter, tag) {
    if (filter !== this.#filter) {
      this.#filter = filter;
      this.#subs.clear();
    }
    if (!this.#subs.delete(tag)) this.#subs.add(tag);
    this.#applyFilters();
  }

  /**
   * Dynamic sub-filters: the tags found on a filter's products, minus every main filter's tag and
   * the filter's own "leave out" list. Built once, shown always (even if a product is hidden).
   */
  #buildDynamicSubs() {
    const filters = /** @type {HTMLElement[]} */ ([...this.querySelectorAll('[data-filter]')]);
    const mainTags = new Set(filters.map((filter) => filter.dataset.tag));
    const tiles = /** @type {HTMLElement[]} */ ([...this.querySelectorAll('[data-main-grid] > [data-tags]')]);

    for (const filter of filters) {
      if (filter.dataset.subMode !== 'dynamic') continue;

      const leaveOut = new Set((filter.dataset.exclude ?? '').split(',').map((tag) => tag.trim()));
      const found = new Set();

      for (const tile of tiles) {
        if (!tile.dataset.tags?.includes(`|${filter.dataset.tag}|`)) continue;
        for (const tag of tile.dataset.tags.split('|')) {
          if (tag && !mainTags.has(tag) && !leaveOut.has(tag)) found.add(tag);
        }
      }

      const menu = filter.querySelector('[data-sub-menu]');
      for (const tag of [...found].sort()) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'catalog__sub-btn button-unstyled';
        button.dataset.subBtn = '';
        button.dataset.tag = tag;
        button.setAttribute('aria-pressed', 'false');
        button.textContent = tag;
        menu?.append(button);
      }
    }
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

  /**
   * A tile shows when it has the active filter's tag and, if sub-filters are picked, matches them:
   * any of them (OR) or all of them (AND), per the section setting.
   * @param {HTMLElement} tile
   */
  #matches(tile) {
    const tags = tile.dataset.tags ?? '';
    if (!this.#filter || !tags.includes(`|${this.#filter.dataset.tag}|`)) return false;
    if (!this.#subs.size) return true;

    const has = (/** @type {string} */ tag) => tags.includes(`|${tag}|`);
    return this.dataset.subLogic === 'and' ? [...this.#subs].every(has) : [...this.#subs].some(has);
  }

  /** @param {boolean} [glide] Animate the tiles to their new places (default true) */
  #applyFilters(glide = true) {
    // FLIP: remember where every visible tile is, switch the view, then glide the tiles that are in
    // both views from their old place to their new one. Skipped while the grid itself is hidden
    // (colour picker open: nothing to measure) and for people who prefer reduced motion.
    const animate = glide && !this.#mainGrid.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /** @type {Map<HTMLElement, DOMRect>} */
    const before = new Map();

    if (animate) {
      for (const tile of this.querySelectorAll('[data-tags]')) {
        if (!(/** @type {HTMLElement} */ (tile).hidden)) before.set(/** @type {HTMLElement} */ (tile), tile.getBoundingClientRect());
      }
    }

    for (const tile of this.querySelectorAll('[data-tags]')) {
      /** @type {HTMLElement} */ (tile).hidden = !this.#matches(/** @type {HTMLElement} */ (tile));
    }

    for (const [tile, from] of before) {
      if (tile.hidden) continue;

      const to = tile.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!dx && !dy) continue;

      tile.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }

    for (const filter of this.querySelectorAll('[data-filter]')) {
      const active = filter === this.#filter;
      filter.querySelector('[data-filter-btn]')?.setAttribute('aria-pressed', String(active));
      filter.toggleAttribute('data-has-sub', active && this.#subs.size > 0);

      for (const button of filter.querySelectorAll('[data-sub-btn]')) {
        const picked = active && this.#subs.has(/** @type {HTMLElement} */ (button).dataset.tag ?? '');
        button.setAttribute('aria-pressed', String(picked));
      }
    }
  }
}

if (!customElements.get('catalog-grid')) customElements.define('catalog-grid', CatalogGrid);
