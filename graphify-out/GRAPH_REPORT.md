# Graph Report - horizon-custom  (2026-11-16)

## Corpus Check
- 165 files · ~232,438 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1322 nodes · 2561 edges · 84 communities (44 shown, 40 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0fe354fd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- facets.js
- morph.js
- ThemeDrawer
- CartItemsComponent
- standard-events.d.ts
- ProductFormComponent
- section-renderer.js
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
- slideshow.js
- QuickAddComponent
- Slideshow
- DragZoomWrapper
- global.d.ts
- morph
- OverflowList
- GiftCardRecipientForm
- PaginatedList
- qr-code-generator.js
- onAnimationEnd
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
- component.js
- DisclosuresSummaryFit
- .connectedCallback
- product-card.js
- .applyDiscount
- theme-editor.js
- Horizon
- ComparisonSliderComponent
- variant-picker.js
- MediaGallery
- CartDrawerComponent
- CartIcon
- PricePerItemComponent
- paginated-list.js
- ResultsList
- ShowMoreComponent
- local-pickup.js
- BuyPanel
- ProductInventory
- catalog-transitions.js
- view-event-elements.d.ts
- view-transitions.js
- ProductSelectEvent
- ProductViewEvent
- search-page-input.js
- StandardStorefrontEventMap
- VolumePricingInfoComponent
- Release Notes - Version 4.1.5
- product-custom-property.js
- CartErrorEvent
- CartNoteUpdateEvent
- CartViewEvent
- ProductPrice
- SearchUpdateEvent
- package.json
- ViewEventElement
- ProductSkuComponent

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
- `hydrate()` --calls--> `requestIdleCallback`  [EXTRACTED]
  assets/section-hydration.js → assets/utilities.js
- `hydrateSection()` --calls--> `buildSectionSelector()`  [EXTRACTED]
  assets/section-hydration.js → assets/section-renderer.js

## Import Cycles
- None detected.

## Communities (84 total, 40 thin omitted)

### Community 0 - "facets.js"
Cohesion: 0.05
Nodes (13): FacetClearComponent, FacetInputsComponent, FacetRemoveComponent, FacetsFormComponent, FacetStatusComponent, PriceFacetComponent, SortingFilterComponent, convertMoneyToMinorUnits() (+5 more)

### Community 1 - "morph.js"
Cohesion: 0.22
Nodes (18): attributesEqual(), collectHydrationTargets(), copyAttributes(), getNodeKey(), morphHydrationByKey(), PRESERVED_ATTRIBUTES, PRESERVED_ATTRIBUTES_SET, same() (+10 more)

### Community 2 - "ThemeDrawer"
Cohesion: 0.06
Nodes (16): DialogComponent, getFocusableElements(), removeTrapFocus(), trapFocus(), trapFocusHandlers, HeaderActions, HeaderDrawer, reset() (+8 more)

### Community 3 - "CartItemsComponent"
Cohesion: 0.13
Nodes (4): CartItemsComponent, ProductRecommendations, injectSectionStylesheet(), morphSection()

### Community 4 - "standard-events.d.ts"
Cohesion: 0.05
Nodes (38): CartAjaxLine, CartAjaxResponse, CartDiscountUpdatePayloadDetail, CartDiscountUpdateResult, CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdatePayload, CartLinesUpdatePayloadDetail (+30 more)

### Community 5 - "ProductFormComponent"
Cohesion: 0.13
Nodes (3): AddToCartComponent, ProductFormComponent, CartLinesUpdateEvent

### Community 6 - "section-renderer.js"
Cohesion: 0.21
Nodes (8): hydrate(), hydrateSection(), buildSectionRenderingURL(), buildSectionSelector(), containsShadowRoot(), normalizeSectionId(), SectionRenderer, onDocumentReady()

### Community 7 - "popover-polyfill.js"
Cohesion: 0.16
Nodes (29): apply(), checkPopoverValidity(), closeAllOpenPopovers(), closeAllOpenPopoversInList(), focusDelegate(), getPopoverVisibilityState(), getRootNode(), getStackPosition() (+21 more)

### Community 8 - "utilities.js"
Cohesion: 0.13
Nodes (15): calculateHeaderGroupHeight(), getIOSVersion(), isClickedOutside(), isMobileBreakpoint(), isPointWithinElement(), isTouchDevice(), mediaQueryLarge, reducedMotion (+7 more)

### Community 10 - "standard-actions.d.ts"
Cohesion: 0.07
Nodes (27): ActionArgs, ActionConfiguration, ActionFunction, CartCost, CartDiscountCode, CartLine, CartLineInput, CartMutationUserError (+19 more)

### Community 13 - "LocalizationFormComponent"
Cohesion: 0.12
Nodes (4): DrawerLocalizationComponent, DropdownLocalizationComponent, LocalizationFormComponent, normalizeString()

### Community 15 - "QuantitySelectorComponent"
Cohesion: 0.17
Nodes (3): CartQuantitySelectorComponent, QuantitySelectorComponent, parseIntOrDefault()

### Community 16 - "HeaderMenu"
Cohesion: 0.14
Nodes (4): findMenuItem(), findSubmenu(), HeaderMenu, onDocumentLoaded()

### Community 17 - "slideshow.js"
Cohesion: 0.07
Nodes (15): CatalogGrid, calculatePaddingStart(), getScrollAxis(), Scroller, ScrollHint, scrollIntoView(), isLowPowerDevice(), prefersReducedMotion() (+7 more)

### Community 19 - "Slideshow"
Cohesion: 0.05
Nodes (9): CollectionLinks, SlideshowSelectEvent, cycleFocus(), Slideshow, SlideshowViewportObserver, center(), clamp(), closest() (+1 more)

### Community 20 - "DragZoomWrapper"
Cohesion: 0.17
Nodes (3): DragZoomWrapper, getDistance(), preventDefault()

### Community 21 - "global.d.ts"
Cohesion: 0.09
Nodes (15): CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdateResultDetail, LoadCallback, ModelViewer, NavigationActivation, NavigationHistoryEntry, Navigator (+7 more)

### Community 22 - "morph"
Cohesion: 0.17
Nodes (4): morph(), recreateAppBlockScripts(), getViewParameterValue(), VariantPicker

### Community 25 - "PaginatedList"
Cohesion: 0.07
Nodes (17): BlogPostsList, FlyToCart, HeaderComponent, JumboText, PaginatedList, getIntersectionRoot(), getScrollContainer(), getScrollEventTarget() (+9 more)

### Community 26 - "qr-code-generator.js"
Cohesion: 0.12
Nodes (7): getTypeNumber(), getUTF8Length(), onMakeImage(), QRCode(), QRErrorCorrectLevel, QRMaskPattern, QRMode

### Community 27 - "onAnimationEnd"
Cohesion: 0.27
Nodes (5): DialogCloseEvent, DialogOpenEvent, ANIMATION_OPTIONS, debounce(), onAnimationEnd()

### Community 28 - "component-cart-items.js"
Cohesion: 0.35
Nodes (5): CartNote, cartPerformance, fetchConfig(), normalizeVariantId(), resolveVariantId()

### Community 29 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, checkJs, noImplicitAny, noUncheckedIndexedAccess, paths, strictNullChecks, target (+7 more)

### Community 39 - "ShopifyStandardEvent"
Cohesion: 0.15
Nodes (8): CartLinesUpdateEventImpl, CollectionUpdateEvent, CollectionUpdatePayload, CollectionViewEvent, CollectionViewPayload, PageViewEvent, PageViewPayload, ShopifyStandardEvent

### Community 40 - "component.js"
Cohesion: 0.08
Nodes (12): Component, MissingRefError, CopyToClipboardComponent, MediaStartedPlayingEvent, MegaMenuHoverEvent, QuantitySelectorUpdateEvent, ThemeEvents, ZoomMediaSelectedEvent (+4 more)

### Community 42 - ".connectedCallback"
Cohesion: 0.28
Nodes (5): getAncestor(), getClosestComponent(), parseData(), parseValue(), registerEventListeners()

### Community 43 - "product-card.js"
Cohesion: 0.20
Nodes (4): ProductCardLink, SwatchesVariantPickerComponent, CollectionComponent, ProductComponent

### Community 44 - ".applyDiscount"
Cohesion: 0.39
Nodes (3): CartDiscount, CartDiscountUpdateEvent, CartDiscountUpdatePayload

### Community 45 - "theme-editor.js"
Cohesion: 0.18
Nodes (4): carouselState, isIOS, layeredSlideshowState, slideshowState

### Community 46 - "Horizon"
Cohesion: 0.18
Nodes (10): Contributing, Developer tools, Getting started, Horizon, License, Shopify CLI, Shopify/theme-check-action, Shopify Theme Store development (+2 more)

### Community 48 - "variant-picker.js"
Cohesion: 0.25
Nodes (4): DeclarativeShadowElement, MORPH_OPTIONS, OverflowMinimumEvent, ResizeNotifier

### Community 53 - "paginated-list.js"
Cohesion: 0.25
Nodes (3): FloatingPanelComponent, requestIdleCallback, viewTransition

### Community 59 - "catalog-transitions.js"
Cohesion: 0.47
Nodes (3): initProductSwap(), readColors(), safeVariantUrl()

### Community 60 - "view-event-elements.d.ts"
Cohesion: 0.33
Nodes (3): CollectionComponent, ProductComponent, Refs

### Community 62 - "view-transitions.js"
Cohesion: 0.53
Nodes (4): isLowPowerDevice(), prefersReducedMotion(), shouldDisableCrossDocumentViewTransitions(), shouldSkipViewTransition()

### Community 69 - "StandardStorefrontEventMap"
Cohesion: 0.50
Nodes (4): DocumentEventMap, ElementEventMap, StandardStorefrontEventMap, WindowEventMap

### Community 71 - "Release Notes - Version 4.1.5"
Cohesion: 0.50
Nodes (3): Fixes and improvements, Release Notes - Version 4.1.5, What's Changed

## Knowledge Gaps
- **115 isolated node(s):** `BlogPostsList`, `CartNote`, `trapFocusHandlers`, `Theme`, `NavigationActivation` (+110 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component` connect `component.js` to `facets.js`, `morph.js`, `ThemeDrawer`, `search-page-input.js`, `section-renderer.js`, `utilities.js`, `product-custom-property.js`, `.connectedCallback`, `product-card.js`, `view-event-elements.d.ts`, `variant-picker.js`, `slideshow.js`, `Slideshow`, `paginated-list.js`, `local-pickup.js`, `PaginatedList`, `onAnimationEnd`, `component-cart-items.js`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `LayeredSlideshowComponent` connect `LayeredSlideshowComponent` to `utilities.js`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `morph()` connect `morph` to `morph.js`, `StickyAddToCartComponent`, `CartItemsComponent`, `ProductFormComponent`, `section-renderer.js`, `component.js`, `ProductCard`, `utilities.js`, `product-card.js`, `PredictiveSearchComponent`, `variant-picker.js`, `QuickAddComponent`, `local-pickup.js`, `ProductInventory`, `onAnimationEnd`, `component-cart-items.js`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `BlogPostsList`, `CartNote`, `trapFocusHandlers` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `facets.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `ThemeDrawer` be split into smaller, more focused modules?**
  _Cohesion score 0.05698778833107191 - nodes in this community are weakly interconnected._
- **Should `CartItemsComponent` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._