# Graph Report - horizon-custom  (2026-11-16)

## Corpus Check
- 165 files · ~231,478 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1320 nodes · 2557 edges · 87 communities (40 shown, 47 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9cdc71fb`
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
- startViewTransition
- QuickAddComponent
- Slideshow
- DragZoomWrapper
- global.d.ts
- VariantPicker
- OverflowList
- GiftCardRecipientForm
- HeaderComponent
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
- CollectionLinks
- DisclosuresSummaryFit
- Scroller
- ProductCardLink
- .applyDiscount
- theme-editor.js
- Horizon
- ComparisonSliderComponent
- product-card.js
- MediaGallery
- CartDrawerComponent
- morph.js
- PricePerItemComponent
- ShowMoreComponent
- CartIcon
- SearchPageInputComponent
- catalog-transitions.js
- BuyPanel
- paginated-list.js
- LocalPickup
- view-event-elements.d.ts
- FloatingPanelComponent
- view-transitions.js
- SwatchesVariantPickerComponent
- ProductSelectEvent
- ProductViewEvent
- StandardStorefrontEventMap
- VolumePricingInfoComponent
- Release Notes - Version 4.1.5
- ProductCustomProperty
- CartErrorEvent
- CartNoteUpdateEvent
- CartViewEvent
- ScrollHint
- ProductPrice
- SearchUpdateEvent
- package.json
- ViewEventElement
- ProductSkuComponent
- RTEFormatter

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

## Communities (87 total, 47 thin omitted)

### Community 0 - "facets.js"
Cohesion: 0.05
Nodes (13): FacetClearComponent, FacetInputsComponent, FacetRemoveComponent, FacetsFormComponent, FacetStatusComponent, PriceFacetComponent, SortingFilterComponent, convertMoneyToMinorUnits() (+5 more)

### Community 1 - "component.js"
Cohesion: 0.07
Nodes (16): Component, getAncestor(), getClosestComponent(), MissingRefError, parseData(), parseValue(), registerEventListeners(), CopyToClipboardComponent (+8 more)

### Community 2 - "ThemeDrawer"
Cohesion: 0.06
Nodes (16): DialogComponent, getFocusableElements(), removeTrapFocus(), trapFocus(), trapFocusHandlers, HeaderActions, HeaderDrawer, reset() (+8 more)

### Community 3 - "CartItemsComponent"
Cohesion: 0.09
Nodes (12): CartItemsComponent, ProductRecommendations, hydrate(), hydrateSection(), buildSectionRenderingURL(), buildSectionSelector(), containsShadowRoot(), injectSectionStylesheet() (+4 more)

### Community 4 - "standard-events.d.ts"
Cohesion: 0.05
Nodes (38): CartAjaxLine, CartAjaxResponse, CartDiscountUpdatePayloadDetail, CartDiscountUpdateResult, CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdatePayload, CartLinesUpdatePayloadDetail (+30 more)

### Community 5 - "ProductFormComponent"
Cohesion: 0.11
Nodes (4): AddToCartComponent, ProductFormComponent, normalizeVariantId(), resolveVariantId()

### Community 6 - "PaginatedList"
Cohesion: 0.17
Nodes (3): BlogPostsList, JumboText, PaginatedList

### Community 7 - "popover-polyfill.js"
Cohesion: 0.16
Nodes (29): apply(), checkPopoverValidity(), closeAllOpenPopovers(), closeAllOpenPopoversInList(), focusDelegate(), getPopoverVisibilityState(), getRootNode(), getStackPosition() (+21 more)

### Community 8 - "utilities.js"
Cohesion: 0.10
Nodes (20): MegaMenuHoverEvent, SQUEEZE_QUERY, calculateHeaderGroupHeight(), changeMetaThemeColor(), getIOSVersion(), isClickedOutside(), isMobileBreakpoint(), isPointWithinElement() (+12 more)

### Community 10 - "standard-actions.d.ts"
Cohesion: 0.07
Nodes (27): ActionArgs, ActionConfiguration, ActionFunction, CartCost, CartDiscountCode, CartLine, CartLineInput, CartMutationUserError (+19 more)

### Community 11 - "QuickOrderListComponent"
Cohesion: 0.13
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

### Community 17 - "startViewTransition"
Cohesion: 0.10
Nodes (8): CatalogGrid, ResultsList, isLowPowerDevice(), shouldDisableCrossDocumentViewTransitions(), startViewTransition(), supportsViewTransitions(), getMostVisibleElement(), ZoomDialog

### Community 21 - "global.d.ts"
Cohesion: 0.09
Nodes (15): CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdateResultDetail, LoadCallback, ModelViewer, NavigationActivation, NavigationHistoryEntry, Navigator (+7 more)

### Community 25 - "HeaderComponent"
Cohesion: 0.27
Nodes (3): HeaderComponent, getIntersectionRoot(), getScrollEventTarget()

### Community 26 - "qr-code-generator.js"
Cohesion: 0.12
Nodes (7): getTypeNumber(), getUTF8Length(), onMakeImage(), QRCode(), QRErrorCorrectLevel, QRMaskPattern, QRMode

### Community 27 - "onAnimationEnd"
Cohesion: 0.16
Nodes (13): DialogCloseEvent, DialogOpenEvent, SlideshowSelectEvent, scrollIntoView(), center(), clamp(), closest(), debounce() (+5 more)

### Community 28 - "component-cart-items.js"
Cohesion: 0.42
Nodes (4): CartNote, cartPerformance, fetchConfig(), preloadImage()

### Community 29 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, checkJs, noImplicitAny, noUncheckedIndexedAccess, paths, strictNullChecks, target (+7 more)

### Community 39 - "ShopifyStandardEvent"
Cohesion: 0.15
Nodes (8): CartLinesUpdateEventImpl, CollectionUpdateEvent, CollectionUpdatePayload, CollectionViewEvent, CollectionViewPayload, PageViewEvent, PageViewPayload, ShopifyStandardEvent

### Community 42 - "Scroller"
Cohesion: 0.19
Nodes (3): calculatePaddingStart(), getScrollAxis(), Scroller

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
Nodes (11): DeclarativeShadowElement, FlyToCart, MORPH_OPTIONS, OverflowMinimumEvent, getViewParameterValue(), isDesktopBreakpoint(), ResizeNotifier, Scheduler (+3 more)

### Community 51 - "morph.js"
Cohesion: 0.15
Nodes (21): attributesEqual(), collectHydrationTargets(), copyAttributes(), getNodeKey(), morph(), morphHydrationByKey(), PRESERVED_ATTRIBUTES, PRESERVED_ATTRIBUTES_SET (+13 more)

### Community 58 - "paginated-list.js"
Cohesion: 0.22
Nodes (8): getScrollContainer(), getScrollTop(), originalPushState, restoreSavedScrollTop(), saveScrollPosition(), scrollTo(), requestIdleCallback, viewTransition

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
- **116 isolated node(s):** `BlogPostsList`, `CartNote`, `neighbours`, `trapFocusHandlers`, `Theme` (+111 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Component` connect `component.js` to `facets.js`, `ThemeDrawer`, `CartItemsComponent`, `utilities.js`, `view-event-elements.d.ts`, `product-card.js`, `morph.js`, `paginated-list.js`, `onAnimationEnd`, `component-cart-items.js`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `LayeredSlideshowComponent` connect `LayeredSlideshowComponent` to `utilities.js`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `morph()` connect `morph.js` to `component.js`, `StickyAddToCartComponent`, `CartItemsComponent`, `ProductFormComponent`, `utilities.js`, `ProductCard`, `LocalPickup`, `PredictiveSearchComponent`, `product-card.js`, `VariantPicker`, `onAnimationEnd`, `component-cart-items.js`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `BlogPostsList`, `CartNote`, `neighbours` to the rest of the system?**
  _116 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `facets.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `component.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0726764500349406 - nodes in this community are weakly interconnected._
- **Should `ThemeDrawer` be split into smaller, more focused modules?**
  _Cohesion score 0.05698778833107191 - nodes in this community are weakly interconnected._