# Graph Report - horizon-custom  (2026-11-16)

## Corpus Check
- 165 files · ~230,776 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1318 nodes · 2555 edges · 94 communities (44 shown, 50 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `053288e6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- facets.js
- component.js
- onAnimationEnd
- CartItemsComponent
- standard-events.d.ts
- ProductFormComponent
- dialog.js
- popover-polyfill.js
- utilities.js
- ProductCard
- standard-actions.d.ts
- QuickOrderListComponent
- LayeredSlideshowComponent
- LocalizationFormComponent
- PredictiveSearchComponent
- QuantitySelectorComponent
- HeaderMenu
- zoom-dialog.js
- QuickAddComponent
- Slideshow
- DragZoomWrapper
- global.d.ts
- morph.js
- OverflowList
- GiftCardRecipientForm
- events.js
- qr-code-generator.js
- theme-drawer.js
- component-cart-items.js
- compilerOptions
- DeferredMedia
- ThemePerformance
- ProductHotspotComponent
- StickyAddToCartComponent
- PaginatedListAspectRatioHelper
- AccordionCustom
- AnchoredPopoverComponent
- AnnouncementBar
- MarqueeComponent
- ShopifyStandardEvent
- slideshow.js
- DisclosuresSummaryFit
- Scroller
- ProductCardLink
- Scheduler
- theme-editor.js
- Horizon
- ComparisonSliderComponent
- product-card.js
- MediaGallery
- CartDrawerComponent
- HeaderActions
- PricePerItemComponent
- ShowMoreComponent
- CartIcon
- search-page-input.js
- BuyPanel
- FloatingPanelComponent
- isClickedOutside
- section-renderer.js
- HeaderDrawer
- view-transitions.js
- CatalogGrid
- DialogComponent
- .applyDiscount
- results-list.js
- requestIdleCallback
- ProductRecommendations
- StandardStorefrontEventMap
- volume-pricing-info.js
- Release Notes - Version 4.1.5
- product-custom-property.js
- CartErrorEvent
- CartNoteUpdateEvent
- CartViewEvent
- view-event-elements.d.ts
- ScrollHint
- ProductPrice
- SearchUpdateEvent
- package.json
- ViewEventElement
- ProductSkuComponent
- rte-formatter.js
- qr-code-image.js
- ProductSelectEvent
- ProductViewEvent

## God Nodes (most connected - your core abstractions)
1. `Component` - 65 edges
2. `Slideshow` - 40 edges
3. `ProductCard` - 29 edges
4. `QuickOrderListComponent` - 29 edges
5. `LayeredSlideshowComponent` - 28 edges
6. `morph()` - 27 edges
7. `onAnimationEnd()` - 26 edges
8. `ProductFormComponent` - 25 edges
9. `HeaderMenu` - 23 edges
10. `DragZoomWrapper` - 22 edges

## Surprising Connections (you probably didn't know these)
- `CollectionComponent` --inherits--> `Component`  [EXTRACTED]
  assets/view-event-elements.d.ts → assets/component.js
- `ProductComponent` --inherits--> `Component`  [EXTRACTED]
  assets/view-event-elements.d.ts → assets/component.js
- `morphSection()` --calls--> `morph()`  [EXTRACTED]
  assets/section-renderer.js → assets/morph.js
- `hydrateSection()` --calls--> `buildSectionSelector()`  [EXTRACTED]
  assets/section-hydration.js → assets/section-renderer.js
- `hydrateSection()` --calls--> `normalizeSectionId()`  [EXTRACTED]
  assets/section-hydration.js → assets/section-renderer.js

## Import Cycles
- None detected.

## Communities (94 total, 50 thin omitted)

### Community 0 - "facets.js"
Cohesion: 0.05
Nodes (13): FacetClearComponent, FacetInputsComponent, FacetRemoveComponent, FacetsFormComponent, FacetStatusComponent, PriceFacetComponent, SortingFilterComponent, convertMoneyToMinorUnits() (+5 more)

### Community 1 - "component.js"
Cohesion: 0.10
Nodes (11): Component, getAncestor(), getClosestComponent(), MissingRefError, parseData(), parseValue(), registerEventListeners(), CopyToClipboardComponent (+3 more)

### Community 2 - "onAnimationEnd"
Cohesion: 0.17
Nodes (6): ThemeDrawer, lockScroll(), onAnimationEnd(), pruneDisconnectedScrollLockOwners(), syncScrollLock(), unlockScroll()

### Community 4 - "standard-events.d.ts"
Cohesion: 0.05
Nodes (38): CartAjaxLine, CartAjaxResponse, CartDiscountUpdatePayloadDetail, CartDiscountUpdateResult, CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdatePayload, CartLinesUpdatePayloadDetail (+30 more)

### Community 6 - "dialog.js"
Cohesion: 0.08
Nodes (16): BlogPostsList, FlyToCart, HeaderComponent, JumboText, PaginatedList, getIntersectionRoot(), getScrollContainer(), getScrollEventTarget() (+8 more)

### Community 7 - "popover-polyfill.js"
Cohesion: 0.16
Nodes (29): apply(), checkPopoverValidity(), closeAllOpenPopovers(), closeAllOpenPopoversInList(), focusDelegate(), getPopoverVisibilityState(), getRootNode(), getStackPosition() (+21 more)

### Community 8 - "utilities.js"
Cohesion: 0.13
Nodes (15): QuickAddDialog, calculateHeaderGroupHeight(), getIOSVersion(), isMobileBreakpoint(), isTouchDevice(), mediaQueryLarge, reducedMotion, scrollLockOwners (+7 more)

### Community 10 - "standard-actions.d.ts"
Cohesion: 0.07
Nodes (27): ActionArgs, ActionConfiguration, ActionFunction, CartCost, CartDiscountCode, CartLine, CartLineInput, CartMutationUserError (+19 more)

### Community 11 - "QuickOrderListComponent"
Cohesion: 0.13
Nodes (3): QuickOrderListComponent, CartLinesUpdateEvent, resetShimmer()

### Community 13 - "LocalizationFormComponent"
Cohesion: 0.18
Nodes (3): DrawerLocalizationComponent, LocalizationFormComponent, normalizeString()

### Community 14 - "PredictiveSearchComponent"
Cohesion: 0.10
Nodes (4): DialogCloseEvent, DialogOpenEvent, PredictiveSearchComponent, RecentlyViewed

### Community 15 - "QuantitySelectorComponent"
Cohesion: 0.17
Nodes (3): CartQuantitySelectorComponent, QuantitySelectorComponent, parseIntOrDefault()

### Community 16 - "HeaderMenu"
Cohesion: 0.14
Nodes (4): findMenuItem(), findSubmenu(), HeaderMenu, onDocumentLoaded()

### Community 17 - "zoom-dialog.js"
Cohesion: 0.21
Nodes (7): isLowPowerDevice(), prefersReducedMotion(), preloadImage(), startViewTransition(), supportsViewTransitions(), getMostVisibleElement(), ZoomDialog

### Community 20 - "DragZoomWrapper"
Cohesion: 0.16
Nodes (4): DragZoomWrapper, getDistance(), clamp(), preventDefault()

### Community 21 - "global.d.ts"
Cohesion: 0.09
Nodes (15): CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdateResultDetail, LoadCallback, ModelViewer, NavigationActivation, NavigationHistoryEntry, Navigator (+7 more)

### Community 22 - "morph.js"
Cohesion: 0.07
Nodes (24): LocalPickup, attributesEqual(), collectHydrationTargets(), copyAttributes(), getNodeKey(), morph(), morphHydrationByKey(), PRESERVED_ATTRIBUTES (+16 more)

### Community 25 - "events.js"
Cohesion: 0.17
Nodes (5): MediaStartedPlayingEvent, MegaMenuHoverEvent, QuantitySelectorUpdateEvent, ThemeEvents, ZoomMediaSelectedEvent

### Community 26 - "qr-code-generator.js"
Cohesion: 0.12
Nodes (7): getTypeNumber(), getUTF8Length(), onMakeImage(), QRCode(), QRErrorCorrectLevel, QRMaskPattern, QRMode

### Community 27 - "theme-drawer.js"
Cohesion: 0.22
Nodes (7): getFocusableElements(), removeTrapFocus(), trapFocus(), trapFocusHandlers, reset(), DrawerCloseEvent, DrawerOpenEvent

### Community 28 - "component-cart-items.js"
Cohesion: 0.23
Nodes (6): CartNote, cartPerformance, debounce(), fetchConfig(), normalizeVariantId(), resolveVariantId()

### Community 29 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, checkJs, noImplicitAny, noUncheckedIndexedAccess, paths, strictNullChecks, target (+7 more)

### Community 39 - "ShopifyStandardEvent"
Cohesion: 0.15
Nodes (8): CartLinesUpdateEventImpl, CollectionUpdateEvent, CollectionUpdatePayload, CollectionViewEvent, CollectionViewPayload, PageViewEvent, PageViewPayload, ShopifyStandardEvent

### Community 40 - "slideshow.js"
Cohesion: 0.14
Nodes (7): CollectionLinks, SlideshowSelectEvent, cycleFocus(), center(), closest(), getVisibleElements(), viewTransition

### Community 42 - "Scroller"
Cohesion: 0.17
Nodes (5): calculatePaddingStart(), getScrollAxis(), Scroller, scrollIntoView(), throttle()

### Community 45 - "theme-editor.js"
Cohesion: 0.18
Nodes (4): carouselState, isIOS, layeredSlideshowState, slideshowState

### Community 46 - "Horizon"
Cohesion: 0.18
Nodes (10): Contributing, Developer tools, Getting started, Horizon, License, Shopify CLI, Shopify/theme-check-action, Shopify Theme Store development (+2 more)

### Community 48 - "product-card.js"
Cohesion: 0.14
Nodes (7): DeclarativeShadowElement, MORPH_OPTIONS, OverflowMinimumEvent, SwatchesVariantPickerComponent, ResizeNotifier, CollectionComponent, ProductComponent

### Community 59 - "isClickedOutside"
Cohesion: 0.26
Nodes (3): DropdownLocalizationComponent, isClickedOutside(), isPointWithinElement()

### Community 60 - "section-renderer.js"
Cohesion: 0.29
Nodes (6): buildSectionRenderingURL(), buildSectionSelector(), containsShadowRoot(), injectSectionStylesheet(), morphSection(), SectionRenderer

### Community 62 - "view-transitions.js"
Cohesion: 0.53
Nodes (4): isLowPowerDevice(), prefersReducedMotion(), shouldDisableCrossDocumentViewTransitions(), shouldSkipViewTransition()

### Community 65 - ".applyDiscount"
Cohesion: 0.39
Nodes (3): CartDiscount, CartDiscountUpdateEvent, CartDiscountUpdatePayload

### Community 67 - "requestIdleCallback"
Cohesion: 0.48
Nodes (5): hydrate(), hydrateSection(), normalizeSectionId(), onDocumentReady(), requestIdleCallback

### Community 69 - "StandardStorefrontEventMap"
Cohesion: 0.50
Nodes (4): DocumentEventMap, ElementEventMap, StandardStorefrontEventMap, WindowEventMap

### Community 71 - "Release Notes - Version 4.1.5"
Cohesion: 0.50
Nodes (3): Fixes and improvements, Release Notes - Version 4.1.5, What's Changed

### Community 76 - "view-event-elements.d.ts"
Cohesion: 0.33
Nodes (3): CollectionComponent, ProductComponent, Refs

## Knowledge Gaps
- **115 isolated node(s):** `BlogPostsList`, `CartNote`, `trapFocusHandlers`, `Theme`, `NavigationActivation` (+110 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component` connect `component.js` to `facets.js`, `dialog.js`, `utilities.js`, `PredictiveSearchComponent`, `zoom-dialog.js`, `DragZoomWrapper`, `morph.js`, `events.js`, `theme-drawer.js`, `component-cart-items.js`, `slideshow.js`, `product-card.js`, `search-page-input.js`, `isClickedOutside`, `volume-pricing-info.js`, `product-custom-property.js`, `view-event-elements.d.ts`, `rte-formatter.js`, `qr-code-image.js`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `LayeredSlideshowComponent` connect `LayeredSlideshowComponent` to `utilities.js`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `CartLinesUpdateEvent` connect `QuickOrderListComponent` to `CartItemsComponent`, `standard-events.d.ts`, `ProductFormComponent`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `BlogPostsList`, `CartNote`, `trapFocusHandlers` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `facets.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `component.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10037878787878787 - nodes in this community are weakly interconnected._
- **Should `standard-events.d.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._