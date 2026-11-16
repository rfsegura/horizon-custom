# Graph Report - horizon-custom  (2026-11-16)

## Corpus Check
- 165 files · ~230,694 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1317 nodes · 2554 edges · 80 communities (39 shown, 41 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa42fda0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- facets.js
- component.js
- ThemeDrawer
- CartItemsComponent
- standard-events.d.ts
- ProductFormComponent
- PaginatedList
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
- HeaderComponent
- DisclosuresSummaryFit
- JumboText
- ProductCardLink
- yieldToMainThread
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
- SearchPageInputComponent
- BuyPanel
- FloatingPanelComponent
- view-transitions.js
- StandardStorefrontEventMap
- VolumePricingInfoComponent
- Release Notes - Version 4.1.5
- ProductCustomProperty
- CartErrorEvent
- CartNoteUpdateEvent
- CartViewEvent
- CollectionUpdateEvent
- CollectionViewEvent
- PageViewEvent
- SearchUpdateEvent
- package.json
- ViewEventElement

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
- `morphSection()` --calls--> `morph()`  [EXTRACTED]
  assets/section-renderer.js → assets/morph.js
- `hydrate()` --calls--> `requestIdleCallback`  [EXTRACTED]
  assets/section-hydration.js → assets/utilities.js
- `CollectionComponent` --inherits--> `Component`  [EXTRACTED]
  assets/view-event-elements.d.ts → assets/component.js
- `ProductComponent` --inherits--> `Component`  [EXTRACTED]
  assets/view-event-elements.d.ts → assets/component.js
- `hydrateSection()` --calls--> `buildSectionSelector()`  [EXTRACTED]
  assets/section-hydration.js → assets/section-renderer.js

## Import Cycles
- None detected.

## Communities (80 total, 41 thin omitted)

### Community 0 - "facets.js"
Cohesion: 0.05
Nodes (13): FacetClearComponent, FacetInputsComponent, FacetRemoveComponent, FacetsFormComponent, FacetStatusComponent, PriceFacetComponent, SortingFilterComponent, convertMoneyToMinorUnits() (+5 more)

### Community 1 - "component.js"
Cohesion: 0.07
Nodes (17): Component, getAncestor(), getClosestComponent(), MissingRefError, parseData(), parseValue(), registerEventListeners(), CopyToClipboardComponent (+9 more)

### Community 2 - "ThemeDrawer"
Cohesion: 0.07
Nodes (13): DialogComponent, getFocusableElements(), removeTrapFocus(), trapFocus(), trapFocusHandlers, HeaderDrawer, reset(), ThemeDrawer (+5 more)

### Community 3 - "CartItemsComponent"
Cohesion: 0.07
Nodes (14): CartDiscount, CartItemsComponent, MORPH_OPTIONS, ProductRecommendations, hydrate(), hydrateSection(), buildSectionRenderingURL(), buildSectionSelector() (+6 more)

### Community 4 - "standard-events.d.ts"
Cohesion: 0.05
Nodes (38): CartAjaxLine, CartAjaxResponse, CartDiscountUpdatePayloadDetail, CartDiscountUpdateResult, CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdatePayload, CartLinesUpdatePayloadDetail (+30 more)

### Community 5 - "ProductFormComponent"
Cohesion: 0.12
Nodes (5): AddToCartComponent, ProductFormComponent, CartLinesUpdateEvent, normalizeVariantId(), resolveVariantId()

### Community 7 - "popover-polyfill.js"
Cohesion: 0.16
Nodes (29): apply(), checkPopoverValidity(), closeAllOpenPopovers(), closeAllOpenPopoversInList(), focusDelegate(), getPopoverVisibilityState(), getRootNode(), getStackPosition() (+21 more)

### Community 8 - "utilities.js"
Cohesion: 0.10
Nodes (21): DialogCloseEvent, DialogOpenEvent, calculateHeaderGroupHeight(), clamp(), getIOSVersion(), isClickedOutside(), isMobileBreakpoint(), isPointWithinElement() (+13 more)

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
Cohesion: 0.15
Nodes (3): findMenuItem(), findSubmenu(), HeaderMenu

### Community 17 - "zoom-dialog.js"
Cohesion: 0.06
Nodes (16): CatalogGrid, ResultsList, calculatePaddingStart(), getScrollAxis(), Scroller, ScrollHint, scrollIntoView(), isLowPowerDevice() (+8 more)

### Community 19 - "Slideshow"
Cohesion: 0.05
Nodes (7): CollectionLinks, cycleFocus(), Slideshow, SlideshowViewportObserver, center(), closest(), getVisibleElements()

### Community 21 - "global.d.ts"
Cohesion: 0.09
Nodes (15): CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdateResultDetail, LoadCallback, ModelViewer, NavigationActivation, NavigationHistoryEntry, Navigator (+7 more)

### Community 22 - "morph.js"
Cohesion: 0.08
Nodes (23): LocalPickup, attributesEqual(), collectHydrationTargets(), copyAttributes(), getNodeKey(), morph(), morphHydrationByKey(), PRESERVED_ATTRIBUTES (+15 more)

### Community 25 - "events.js"
Cohesion: 0.16
Nodes (6): MediaStartedPlayingEvent, MegaMenuHoverEvent, QuantitySelectorUpdateEvent, ThemeEvents, ZoomMediaSelectedEvent, onDocumentLoaded()

### Community 26 - "qr-code-generator.js"
Cohesion: 0.12
Nodes (7): getTypeNumber(), getUTF8Length(), onMakeImage(), QRCode(), QRErrorCorrectLevel, QRMaskPattern, QRMode

### Community 27 - "theme-drawer.js"
Cohesion: 0.19
Nodes (10): getScrollContainer(), getScrollTop(), originalPushState, restoreSavedScrollTop(), saveScrollPosition(), scrollTo(), SQUEEZE_QUERY, DrawerCloseEvent (+2 more)

### Community 28 - "component-cart-items.js"
Cohesion: 0.29
Nodes (5): CartNote, ANIMATION_OPTIONS, cartPerformance, debounce(), fetchConfig()

### Community 29 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, checkJs, noImplicitAny, noUncheckedIndexedAccess, paths, strictNullChecks, target (+7 more)

### Community 39 - "ShopifyStandardEvent"
Cohesion: 0.15
Nodes (8): CartDiscountUpdateEvent, CartDiscountUpdatePayload, CartLinesUpdateEventImpl, ProductSelectEvent, ProductSelectPayload, ProductViewEvent, ProductViewPayload, ShopifyStandardEvent

### Community 40 - "HeaderComponent"
Cohesion: 0.27
Nodes (3): HeaderComponent, getIntersectionRoot(), getScrollEventTarget()

### Community 44 - "yieldToMainThread"
Cohesion: 0.32
Nodes (3): FlyToCart, Scheduler, yieldToMainThread()

### Community 45 - "theme-editor.js"
Cohesion: 0.18
Nodes (4): carouselState, isIOS, layeredSlideshowState, slideshowState

### Community 46 - "Horizon"
Cohesion: 0.18
Nodes (10): Contributing, Developer tools, Getting started, Horizon, License, Shopify CLI, Shopify/theme-check-action, Shopify Theme Store development (+2 more)

### Community 48 - "product-card.js"
Cohesion: 0.12
Nodes (9): DeclarativeShadowElement, SlideshowSelectEvent, OverflowMinimumEvent, SwatchesVariantPickerComponent, getViewParameterValue(), isDesktopBreakpoint(), ResizeNotifier, CollectionComponent (+1 more)

### Community 49 - "MediaGallery"
Cohesion: 0.10
Nodes (3): MediaGallery, ProductPrice, ProductSkuComponent

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
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component` connect `component.js` to `facets.js`, `ThemeDrawer`, `utilities.js`, `yieldToMainThread`, `product-card.js`, `zoom-dialog.js`, `Slideshow`, `morph.js`, `events.js`, `theme-drawer.js`, `component-cart-items.js`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `LayeredSlideshowComponent` connect `LayeredSlideshowComponent` to `utilities.js`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `fetchConfig()` connect `component-cart-items.js` to `CartItemsComponent`, `ProductFormComponent`, `utilities.js`, `QuickOrderListComponent`, `theme-drawer.js`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `BlogPostsList`, `CartNote`, `trapFocusHandlers` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `facets.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `component.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06547619047619048 - nodes in this community are weakly interconnected._
- **Should `ThemeDrawer` be split into smaller, more focused modules?**
  _Cohesion score 0.07197763801537387 - nodes in this community are weakly interconnected._