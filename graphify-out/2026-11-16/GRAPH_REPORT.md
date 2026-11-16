# Graph Report - horizon-custom  (2026-11-16)

## Corpus Check
- 165 files · ~232,419 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1323 nodes · 2564 edges · 87 communities (41 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5facb7f6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- facets.js
- Scroller
- onAnimationEnd
- CartItemsComponent
- standard-events.d.ts
- ProductFormComponent
- theme-drawer.js
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
- PaginatedList
- qr-code-generator.js
- dialog.js
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
- slideshow.js
- ProductCardLink
- .applyDiscount
- theme-editor.js
- Horizon
- ComparisonSliderComponent
- product-card.js
- MediaGallery
- CartDrawerComponent
- CollectionLinks
- PricePerItemComponent
- paginated-list.js
- HeaderComponent
- ShowMoreComponent
- .#handleMouseDown
- BuyPanel
- .connectedCallback
- catalog-transitions.js
- view-event-elements.d.ts
- HeaderActions
- view-transitions.js
- ScrollHint
- ProductSelectEvent
- ProductViewEvent
- rte-formatter.js
- SearchPageInputComponent
- StandardStorefrontEventMap
- VolumePricingInfoComponent
- Release Notes - Version 4.1.5
- ProductCustomProperty
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

## Communities (87 total, 46 thin omitted)

### Community 0 - "facets.js"
Cohesion: 0.05
Nodes (13): FacetClearComponent, FacetInputsComponent, FacetRemoveComponent, FacetsFormComponent, FacetStatusComponent, PriceFacetComponent, SortingFilterComponent, convertMoneyToMinorUnits() (+5 more)

### Community 1 - "Scroller"
Cohesion: 0.18
Nodes (4): calculatePaddingStart(), getScrollAxis(), Scroller, throttle()

### Community 2 - "onAnimationEnd"
Cohesion: 0.07
Nodes (12): CartIcon, DialogComponent, getFocusableElements(), removeTrapFocus(), trapFocus(), trapFocusHandlers, HeaderDrawer, reset() (+4 more)

### Community 3 - "CartItemsComponent"
Cohesion: 0.08
Nodes (13): CartItemsComponent, MORPH_OPTIONS, ProductRecommendations, hydrate(), hydrateSection(), buildSectionRenderingURL(), buildSectionSelector(), containsShadowRoot() (+5 more)

### Community 4 - "standard-events.d.ts"
Cohesion: 0.05
Nodes (38): CartAjaxLine, CartAjaxResponse, CartDiscountUpdatePayloadDetail, CartDiscountUpdateResult, CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdatePayload, CartLinesUpdatePayloadDetail (+30 more)

### Community 5 - "ProductFormComponent"
Cohesion: 0.12
Nodes (4): AddToCartComponent, ProductFormComponent, normalizeVariantId(), resolveVariantId()

### Community 6 - "theme-drawer.js"
Cohesion: 0.15
Nodes (14): getIntersectionRoot(), getScrollContainer(), getScrollTop(), originalPushState, restoreSavedScrollTop(), saveScrollPosition(), scrollTo(), SQUEEZE_QUERY (+6 more)

### Community 7 - "popover-polyfill.js"
Cohesion: 0.16
Nodes (29): apply(), checkPopoverValidity(), closeAllOpenPopovers(), closeAllOpenPopoversInList(), focusDelegate(), getPopoverVisibilityState(), getRootNode(), getStackPosition() (+21 more)

### Community 8 - "utilities.js"
Cohesion: 0.11
Nodes (18): MegaMenuHoverEvent, calculateHeaderGroupHeight(), getIOSVersion(), isClickedOutside(), isMobileBreakpoint(), isPointWithinElement(), isTouchDevice(), mediaQueryLarge (+10 more)

### Community 10 - "standard-actions.d.ts"
Cohesion: 0.07
Nodes (27): ActionArgs, ActionConfiguration, ActionFunction, CartCost, CartDiscountCode, CartLine, CartLineInput, CartMutationUserError (+19 more)

### Community 11 - "QuickOrderListComponent"
Cohesion: 0.12
Nodes (3): QuickOrderListComponent, CartLinesUpdateEvent, resetShimmer()

### Community 13 - "LocalizationFormComponent"
Cohesion: 0.12
Nodes (4): DrawerLocalizationComponent, DropdownLocalizationComponent, LocalizationFormComponent, normalizeString()

### Community 15 - "QuantitySelectorComponent"
Cohesion: 0.17
Nodes (3): CartQuantitySelectorComponent, QuantitySelectorComponent, parseIntOrDefault()

### Community 16 - "HeaderMenu"
Cohesion: 0.15
Nodes (3): findMenuItem(), findSubmenu(), HeaderMenu

### Community 17 - "zoom-dialog.js"
Cohesion: 0.08
Nodes (11): CatalogGrid, JumboText, ResultsList, isLowPowerDevice(), prefersReducedMotion(), preloadImage(), shouldDisableCrossDocumentViewTransitions(), startViewTransition() (+3 more)

### Community 21 - "global.d.ts"
Cohesion: 0.09
Nodes (15): CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdateResultDetail, LoadCallback, ModelViewer, NavigationActivation, NavigationHistoryEntry, Navigator (+7 more)

### Community 22 - "morph.js"
Cohesion: 0.08
Nodes (23): LocalPickup, attributesEqual(), collectHydrationTargets(), copyAttributes(), getNodeKey(), morph(), morphHydrationByKey(), PRESERVED_ATTRIBUTES (+15 more)

### Community 26 - "qr-code-generator.js"
Cohesion: 0.12
Nodes (7): getTypeNumber(), getUTF8Length(), onMakeImage(), QRCode(), QRErrorCorrectLevel, QRMaskPattern, QRMode

### Community 27 - "dialog.js"
Cohesion: 0.25
Nodes (4): DialogCloseEvent, DialogOpenEvent, MediaStartedPlayingEvent, preventDefault()

### Community 28 - "component-cart-items.js"
Cohesion: 0.29
Nodes (5): CartNote, ANIMATION_OPTIONS, cartPerformance, debounce(), fetchConfig()

### Community 29 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, checkJs, noImplicitAny, noUncheckedIndexedAccess, paths, strictNullChecks, target (+7 more)

### Community 39 - "ShopifyStandardEvent"
Cohesion: 0.15
Nodes (8): CartLinesUpdateEventImpl, CollectionUpdateEvent, CollectionUpdatePayload, CollectionViewEvent, CollectionViewPayload, PageViewEvent, PageViewPayload, ShopifyStandardEvent

### Community 40 - "component.js"
Cohesion: 0.08
Nodes (14): Component, getAncestor(), getClosestComponent(), MissingRefError, parseData(), parseValue(), registerEventListeners(), CopyToClipboardComponent (+6 more)

### Community 42 - "slideshow.js"
Cohesion: 0.21
Nodes (6): SlideshowSelectEvent, center(), clamp(), closest(), getVisibleElements(), Scheduler

### Community 44 - ".applyDiscount"
Cohesion: 0.39
Nodes (3): CartDiscount, CartDiscountUpdateEvent, CartDiscountUpdatePayload

### Community 45 - "theme-editor.js"
Cohesion: 0.18
Nodes (4): carouselState, isIOS, layeredSlideshowState, slideshowState

### Community 46 - "Horizon"
Cohesion: 0.18
Nodes (10): Contributing, Developer tools, Getting started, Horizon, License, Shopify CLI, Shopify/theme-check-action, Shopify Theme Store development (+2 more)

### Community 48 - "product-card.js"
Cohesion: 0.11
Nodes (10): DeclarativeShadowElement, FlyToCart, OverflowMinimumEvent, SwatchesVariantPickerComponent, getViewParameterValue(), isDesktopBreakpoint(), ResizeNotifier, yieldToMainThread() (+2 more)

### Community 53 - "paginated-list.js"
Cohesion: 0.25
Nodes (3): FloatingPanelComponent, requestIdleCallback, viewTransition

### Community 59 - "catalog-transitions.js"
Cohesion: 0.47
Nodes (3): findNeighbours(), initProductSwap(), safeProductUrl()

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
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component` connect `component.js` to `facets.js`, `onAnimationEnd`, `rte-formatter.js`, `theme-drawer.js`, `utilities.js`, `slideshow.js`, `view-event-elements.d.ts`, `product-card.js`, `zoom-dialog.js`, `paginated-list.js`, `morph.js`, `dialog.js`, `component-cart-items.js`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `LayeredSlideshowComponent` connect `LayeredSlideshowComponent` to `utilities.js`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `CartLinesUpdateEvent` connect `QuickOrderListComponent` to `CartItemsComponent`, `standard-events.d.ts`, `ProductFormComponent`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `BlogPostsList`, `CartNote`, `trapFocusHandlers` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `facets.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `onAnimationEnd` be split into smaller, more focused modules?**
  _Cohesion score 0.06715063520871144 - nodes in this community are weakly interconnected._
- **Should `CartItemsComponent` be split into smaller, more focused modules?**
  _Cohesion score 0.08305647840531562 - nodes in this community are weakly interconnected._