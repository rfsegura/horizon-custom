# Graph Report - horizon-custom  (2026-11-16)

## Corpus Check
- 162 files · ~230,869 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1300 nodes · 2526 edges · 89 communities (43 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `951bb1d0`
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
- slideshow.js
- QuickAddComponent
- Slideshow
- DragZoomWrapper
- global.d.ts
- morph.js
- OverflowList
- GiftCardRecipientForm
- morph
- qr-code-generator.js
- theme-drawer.js
- onAnimationEnd
- compilerOptions
- DeferredMedia
- component-cart-items.js
- ProductHotspotComponent
- Scroller
- StickyAddToCartComponent
- AccordionCustom
- AnchoredPopoverComponent
- AnnouncementBar
- MarqueeComponent
- ShopifyStandardEvent
- CollectionLinks
- DisclosuresSummaryFit
- PaginatedListAspectRatioHelper
- product-card.js
- HeaderComponent
- theme-editor.js
- Horizon
- ComparisonSliderComponent
- variant-picker.js
- MediaGallery
- CartDrawerComponent
- collection-links.js
- PricePerItemComponent
- ShowMoreComponent
- CartIcon
- ResultsList
- .connectedCallback
- HeaderActions
- local-pickup.js
- ThemePerformance
- view-event-elements.d.ts
- view-transitions.js
- ScrollHint
- FloatingPanelComponent
- ProductInventory
- ProductPrice
- ProductSkuComponent
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

## Communities (89 total, 46 thin omitted)

### Community 0 - "facets.js"
Cohesion: 0.05
Nodes (13): FacetClearComponent, FacetInputsComponent, FacetRemoveComponent, FacetsFormComponent, FacetStatusComponent, PriceFacetComponent, SortingFilterComponent, convertMoneyToMinorUnits() (+5 more)

### Community 1 - "component.js"
Cohesion: 0.07
Nodes (16): Component, getAncestor(), getClosestComponent(), MissingRefError, parseData(), parseValue(), registerEventListeners(), CopyToClipboardComponent (+8 more)

### Community 2 - "ThemeDrawer"
Cohesion: 0.07
Nodes (13): DialogComponent, getFocusableElements(), removeTrapFocus(), trapFocus(), trapFocusHandlers, HeaderDrawer, reset(), ThemeDrawer (+5 more)

### Community 3 - "CartItemsComponent"
Cohesion: 0.08
Nodes (13): CartDiscount, CartItemsComponent, ProductRecommendations, hydrate(), hydrateSection(), buildSectionRenderingURL(), buildSectionSelector(), containsShadowRoot() (+5 more)

### Community 4 - "standard-events.d.ts"
Cohesion: 0.05
Nodes (38): CartAjaxLine, CartAjaxResponse, CartDiscountUpdatePayloadDetail, CartDiscountUpdateResult, CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdatePayload, CartLinesUpdatePayloadDetail (+30 more)

### Community 5 - "ProductFormComponent"
Cohesion: 0.11
Nodes (5): AddToCartComponent, ProductFormComponent, CartLinesUpdateEvent, normalizeVariantId(), resolveVariantId()

### Community 6 - "PaginatedList"
Cohesion: 0.12
Nodes (6): BlogPostsList, FlyToCart, JumboText, PaginatedList, Scheduler, yieldToMainThread()

### Community 7 - "popover-polyfill.js"
Cohesion: 0.16
Nodes (29): apply(), checkPopoverValidity(), closeAllOpenPopovers(), closeAllOpenPopoversInList(), focusDelegate(), getPopoverVisibilityState(), getRootNode(), getStackPosition() (+21 more)

### Community 8 - "utilities.js"
Cohesion: 0.10
Nodes (18): MegaMenuHoverEvent, SQUEEZE_QUERY, calculateHeaderGroupHeight(), changeMetaThemeColor(), isClickedOutside(), isPointWithinElement(), isTouchDevice(), onDocumentLoaded() (+10 more)

### Community 10 - "standard-actions.d.ts"
Cohesion: 0.07
Nodes (27): ActionArgs, ActionConfiguration, ActionFunction, CartCost, CartDiscountCode, CartLine, CartLineInput, CartMutationUserError (+19 more)

### Community 13 - "LocalizationFormComponent"
Cohesion: 0.12
Nodes (4): DrawerLocalizationComponent, DropdownLocalizationComponent, LocalizationFormComponent, normalizeString()

### Community 15 - "QuantitySelectorComponent"
Cohesion: 0.16
Nodes (3): CartQuantitySelectorComponent, QuantitySelectorComponent, parseIntOrDefault()

### Community 16 - "HeaderMenu"
Cohesion: 0.15
Nodes (3): findMenuItem(), findSubmenu(), HeaderMenu

### Community 17 - "slideshow.js"
Cohesion: 0.17
Nodes (10): scrollIntoView(), isLowPowerDevice(), prefersReducedMotion(), preloadImage(), shouldDisableCrossDocumentViewTransitions(), startViewTransition(), supportsViewTransitions(), throttle() (+2 more)

### Community 18 - "QuickAddComponent"
Cohesion: 0.12
Nodes (3): QuickAddComponent, QuickAddDialog, getIOSVersion()

### Community 21 - "global.d.ts"
Cohesion: 0.09
Nodes (15): CartDiscountUpdateResultDetail, CartErrorPayloadDetail, CartLinesUpdateResultDetail, LoadCallback, ModelViewer, NavigationActivation, NavigationHistoryEntry, Navigator (+7 more)

### Community 22 - "morph.js"
Cohesion: 0.20
Nodes (19): attributesEqual(), collectHydrationTargets(), copyAttributes(), getNodeKey(), morphHydrationByKey(), PRESERVED_ATTRIBUTES, PRESERVED_ATTRIBUTES_SET, recreateAppBlockScripts() (+11 more)

### Community 26 - "qr-code-generator.js"
Cohesion: 0.12
Nodes (7): getTypeNumber(), getUTF8Length(), onMakeImage(), QRCode(), QRErrorCorrectLevel, QRMaskPattern, QRMode

### Community 27 - "theme-drawer.js"
Cohesion: 0.22
Nodes (8): getScrollContainer(), getScrollTop(), originalPushState, restoreSavedScrollTop(), saveScrollPosition(), scrollTo(), DrawerCloseEvent, DrawerOpenEvent

### Community 28 - "onAnimationEnd"
Cohesion: 0.19
Nodes (7): DialogCloseEvent, DialogOpenEvent, clamp(), isMobileBreakpoint(), mediaQueryLarge, onAnimationEnd(), preventDefault()

### Community 29 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, checkJs, noImplicitAny, noUncheckedIndexedAccess, paths, strictNullChecks, target (+7 more)

### Community 31 - "component-cart-items.js"
Cohesion: 0.22
Nodes (6): CartNote, ANIMATION_OPTIONS, cartPerformance, SearchPageInputComponent, debounce(), fetchConfig()

### Community 33 - "Scroller"
Cohesion: 0.19
Nodes (3): calculatePaddingStart(), getScrollAxis(), Scroller

### Community 39 - "ShopifyStandardEvent"
Cohesion: 0.15
Nodes (8): CartDiscountUpdateEvent, CartDiscountUpdatePayload, CartLinesUpdateEventImpl, ProductSelectEvent, ProductSelectPayload, ProductViewEvent, ProductViewPayload, ShopifyStandardEvent

### Community 43 - "product-card.js"
Cohesion: 0.20
Nodes (4): ProductCardLink, SwatchesVariantPickerComponent, CollectionComponent, ProductComponent

### Community 44 - "HeaderComponent"
Cohesion: 0.27
Nodes (3): HeaderComponent, getIntersectionRoot(), getScrollEventTarget()

### Community 45 - "theme-editor.js"
Cohesion: 0.18
Nodes (4): carouselState, isIOS, layeredSlideshowState, slideshowState

### Community 46 - "Horizon"
Cohesion: 0.18
Nodes (10): Contributing, Developer tools, Getting started, Horizon, License, Shopify CLI, Shopify/theme-check-action, Shopify Theme Store development (+2 more)

### Community 48 - "variant-picker.js"
Cohesion: 0.22
Nodes (5): DeclarativeShadowElement, MORPH_OPTIONS, OverflowMinimumEvent, getViewParameterValue(), ResizeNotifier

### Community 51 - "collection-links.js"
Cohesion: 0.31
Nodes (4): SlideshowSelectEvent, center(), closest(), getVisibleElements()

### Community 61 - "view-event-elements.d.ts"
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

- **Why does `Component` connect `component.js` to `facets.js`, `ThemeDrawer`, `CartItemsComponent`, `PaginatedList`, `utilities.js`, `product-card.js`, `QuantitySelectorComponent`, `variant-picker.js`, `slideshow.js`, `collection-links.js`, `morph.js`, `local-pickup.js`, `theme-drawer.js`, `onAnimationEnd`, `view-event-elements.d.ts`, `component-cart-items.js`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `LayeredSlideshowComponent` connect `LayeredSlideshowComponent` to `onAnimationEnd`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `morph()` connect `morph` to `component.js`, `ProductInventory`, `CartItemsComponent`, `StickyAddToCartComponent`, `ProductFormComponent`, `ProductCard`, `product-card.js`, `PredictiveSearchComponent`, `variant-picker.js`, `QuickAddComponent`, `morph.js`, `local-pickup.js`, `onAnimationEnd`, `component-cart-items.js`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `BlogPostsList`, `CartNote`, `trapFocusHandlers` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `facets.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05472636815920398 - nodes in this community are weakly interconnected._
- **Should `component.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06988120195667366 - nodes in this community are weakly interconnected._
- **Should `ThemeDrawer` be split into smaller, more focused modules?**
  _Cohesion score 0.07197763801537387 - nodes in this community are weakly interconnected._