---
name: product-landing-page
description: >
  Layout and design consistency guide for building new CCCI product landing
  pages. Extracted from the existing pages: CMS (CampusCore), LMS (LearnCore),
  HRIS (PeopleCore), AISSP, eLibrary System, FMS, DMS, AMS, ILSP (LinkagesCore),
  EIS, HKAS, and IRS.
  Use this skill whenever you are scaffolding or reviewing a product page under
  `app/pages/products/<product>/index.vue`.
---

# Product Landing Page — Layout & Design Skill

## 1. File Location & Page Meta

Every product page lives at:

```
app/pages/products/<product>/index.vue
```

Always declare the `product` layout and an SEO meta call at the top of
`<script setup>`:

```vue
<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreen<Product>ModuleA,
  MockupScreen<Product>ModuleB,
  // …one per featureDetails entry
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: '<Product Full Name> — <Short Tagline> | CCCI',
  description: '<One-sentence value proposition>.',
})
```

> **Note:** `useSeoMeta` is optional but preferred; add it when the product has
> a clear search keyword target.

---

## 2. Scroll Reveal — `useScrollReveal`

Every section that needs an entrance animation uses the `useScrollReveal`
composable. Declare all reveal refs **after** `definePageMeta`/`useSeoMeta`
and **before** the data blocks:

```ts
// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl,  isVisible: modulesVisible  } = useScrollReveal({ threshold: 0.3, delay: 300 })
// Add one per bonus section (addOnsEl, aiEl, howItWorksEl, cycleEl, …)
```

**How to wire a ref to a section:**

```vue
<UPageSection
  ref="featuresEl"
  class="section-reveal"
  :class="{ 'is-visible': featuresVisible }"
  …
/>
```

**Standard defaults** — always use `threshold: 0.3, delay: 300` unless there
is a specific reason to change them.

**`ProductFeature` and `ProductCTA` are self-contained** — they manage their
own `useScrollReveal` internally. Do **not** wrap them with an extra reveal ref
on the page.

### Reveal utility classes

| Class | Effect |
|---|---|
| `reveal-up` | Fades in while translating upward |
| `reveal-down` | Fades in while translating downward |
| `reveal-left` | Fades in from the left |
| `reveal-right` | Fades in from the right |
| `reveal-fade` | Fades in without translation |
| `reveal-delay-100` | 100 ms animation delay |
| `reveal-delay-150` | 150 ms animation delay |
| `reveal-delay-200` | 200 ms animation delay |
| `reveal-delay-300` | 300 ms animation delay |
| `reveal-delay-400` | 400 ms animation delay |
| `reveal-delay-500` | 500 ms animation delay |
| `reveal-delay-600` | 600 ms animation delay |
| `section-reveal` | Base class; hides the element until `is-visible` is added |
| `is-visible` | Triggers all nested `reveal-*` animations |

---

## 3. Script Data — Canonical Structure

Organise all reactive data in two logical blocks, separated by banner comments:

```ts
// ─── Navigation & UI Data ─────────────────────────────────────────────────────

// ─── Page Content Data ────────────────────────────────────────────────────────
```

### 3.1 `heroLinks` — two buttons

```ts
const heroLinks = [
  {
    label: 'Primary CTA',       // e.g. 'Request a Demo', 'Start Free Trial'
    to: '#pricing',             // optional anchor or route
    trailingIcon: 'i-lucide-<icon>',
    class: 'hero-cta-shadow',   // always present on the primary button
  },
  {
    label: 'Secondary CTA',     // e.g. 'Watch Demo', 'Explore Features'
    color: 'neutral' as const,
    variant: 'soft' as const,
    icon: 'i-lucide-play-circle',
  },
]
```

### 3.2 `ctaLinks` — two buttons (bottom CTA section)

```ts
const ctaLinks = [
  {
    label: 'Primary CTA',
    icon: 'i-lucide-<icon>',
    class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75',
    size: 'lg' as const, // always include for visual weight
  },
  {
    label: 'Secondary CTA',
    color: 'neutral' as const,
    variant: 'soft' as const,
    trailingIcon: 'i-lucide-<icon>',
    size: 'lg' as const,
  },
]
```

> **Note:** `size: 'lg' as const` should be included on **both** ctaLinks
> buttons for consistent visual weight in the CTA section.

### 3.3 `modules` — platform/hub navigation items

```ts
const modules = [
  { title: 'Module Name', icon: 'i-lucide-<icon>', to: '#section-id' },
  // 5–8 items; anchors must match the corresponding featureDetails id
]
```

### 3.4 `checklist` — hero trust indicators (exactly 3 items)

```ts
const checklist = [
  'Short feature proof point 1',
  'Short feature proof point 2',
  'Short feature proof point 3',
]
```

### 3.5 `features` — core "Why Choose Us" cards (exactly 4)

```ts
const features = [
  {
    title: 'Feature Title',
    description: 'One-sentence benefit.',
    icon: 'i-lucide-<icon>',
  },
  // × 4 total
]
```

> **Note:** `orientation` is NOT needed in the `features` data object; the
> `UPageSection` with the `#features` slot passes it to `UPageFeature` directly.

### 3.6 `featureDetails` — per-module deep-dives

```ts
const featureDetails = [
  {
    id: 'section-id',                      // matches modules[n].to anchor (without #)
    title: 'Module Name',
    description: 'Short punchy subtitle.', // rendered in text-primary via ProductFeature
    features: [
      { description: 'Bullet point.', icon: 'i-lucide-check' },
      { description: 'Bullet point.', icon: 'i-lucide-check' },
      { description: 'Bullet point.', icon: 'i-lucide-check' },
      // 3–4 bullets per module
    ],
    orientation: 'horizontal' as const,
    reverse: false,                         // alternates: false → true → false → true
    component: MockupScreen<Product><ModuleName>,
  },
  // Always alternate reverse strictly
]
```

### 3.7 Optional secondary feature grids

Used for flagship, add-on, platform, or security sections:

```ts
const <sectionName>Features = [
  {
    title: 'Card Title',
    description: 'Card body.',
    icon: 'i-lucide-<icon>',
    orientation: 'vertical' as const,
  },
  // × 4 (or 5 for add-on step cards)
]
```

### 3.8 Optional `ProductTimeline` steps

```ts
const <timelineName>Steps = [
  {
    value: 'step-key',
    step: '01',           // zero-padded number
    phase: 'Phase Label',
    title: 'Step Title',
    description: 'One sentence.',
    icon: 'i-lucide-<icon>',
    deliverable: 'Output Name',
  },
  // 4–5 steps total
]
```

---

## 4. Template — Canonical Section Order

```
1. ProductHero            ← always first; self-contained reveal
2. Core features grid     ← UPageSection id="why-choose-us" + useScrollReveal ref
3. Hub diagram            ← UPageSection id="platform" + useScrollReveal ref
4. Feature details        ← <ProductFeature> v-for (self-contained reveal)
5. Bonus section(s)       ← 0–2 extra UPageSections, each with a useScrollReveal ref
6. CTA                    ← always last; ProductCTA is self-contained
```

> **Critical:** The core features section uses `id="why-choose-us"` and the hub
> diagram uses `id="platform"`. These IDs are tracked by the `useProductNav`
> composable scroll spy — do **not** use `id="features"` for the core features
> grid.

---

## 5. Template — Component Patterns

### 5.1 Hero (`ProductHero`)

`ProductHero` manages its own reveal internally — no page-level ref needed.

```vue
<ProductHero
  badge="<Badge Text>"
  background-image="/<hero-image-filename>"
  :links="heroLinks"
  :checklist="checklist"
  :modules="modules"
>
  <template #title>
    Short headline,<br>two lines max.
  </template>
  <template #description>
    The <strong>Full Product Name</strong> one-sentence value prop — built by
    <strong>Centralized Cloud Computing International</strong>.
  </template>
</ProductHero>
```

**Badge format rules:**

| Product type | Format | Example |
|---|---|---|
| Branded product (named system) | `"Introducing <ProductName> 2.0"` | `"Introducing PeopleCore 2.0"` |
| Standalone tool / non-branded | Category · descriptor | `"DICT-aligned · Automated ISSP Creator"` |
| Non-branded system with abbreviation | `"<ABBR> · <Full Name>"` | `"DMS · Document Management System"` |

**Rules:**
- The `#title` slot always uses `<br>` to create a two-line headline.
- Always credit CCCI inside `#description` with `<strong>`.
- The background image has a built-in `hero-bg-reveal` / `hero-bg-visible` CSS
  fade + scale animation; do not override it.

### 5.2 Core Features Grid

```vue
<UPageSection
  id="why-choose-us"
  ref="featuresEl"
  class="section-reveal"
  :class="{ 'is-visible': featuresVisible }"
  headline="Why Choose Us"
  title="<Memorable section headline>"
  description="<Supporting context sentence.>"
  :ui="{
    root: 'min-h-screen flex flex-col justify-center',
    features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10',
    headline: 'reveal-down',
    title: 'reveal-up reveal-delay-150',
    description: 'reveal-up reveal-delay-300',
  }"
>
  <template #features>
    <UPageFeature
      v-for="(feature, i) in features"
      :key="feature.title"
      v-bind="feature"
      class="reveal-up"
      :style="{ animationDelay: `${400 + i * 100}ms` }"
    />
  </template>
</UPageSection>
```

**Rules:**
- `id="why-choose-us"` is fixed across all pages (tracked by `useProductNav`).
- `headline` is typically `"Why Choose Us"` or a short product category name.
- Always use the `#features` slot with staggered `animationDelay` — do **not**
  pass `:features` prop directly anymore.
- `root: 'min-h-screen flex flex-col justify-center'` is required on every
  full-viewport section.

### 5.3 Hub Diagram ("The Platform")

```vue
<UPageSection
  id="platform"
  ref="modulesEl"
  class="section-reveal"
  :class="{ 'is-visible': modulesVisible }"
  headline="The Platform"
  title="<N> <modules/portals/areas>. One <descriptor>."
  description="<Platform overview sentence.>"
  orientation="horizontal"
  :ui="{
    root: 'min-h-screen flex flex-col justify-center',
    features: 'grid grid-cols-2 gap-4',
    headline: 'reveal-down',
    title: 'reveal-up reveal-delay-150',
    description: 'reveal-up reveal-delay-300',
  }"
>
  <template #features>
    <UPageFeature
      v-for="(module, index) in modules"
      :key="index"
      :title="module.title"
      icon="i-lucide-check"
      class="reveal-up"
      :style="{ animationDelay: `${400 + index * 60}ms` }"
    />
  </template>
  <HubDiagram
    center-label="<PRODUCT> CORE"
    :nodes="modules"
    class="reveal-right reveal-delay-400"
  />
</UPageSection>
```

**Rules:**
- `id="platform"` is fixed across all pages (tracked by `useProductNav`).
- `orientation="horizontal"` is always set.
- `HubDiagram` always gets `center-label` (ALL-CAPS abbreviation + ` CORE`)
  and `:nodes="modules"`.
- Add `class="reveal-right reveal-delay-400"` to `HubDiagram`.
- Module features use a tighter stagger: `400 + index * 60ms`.

### 5.4 Feature Details — `<ProductFeature>`

Feature details now use the dedicated `ProductFeature` component, which manages
scroll reveal, staggered bullet animations, and direction-aware mockup slides
internally. Pass raw feature data — **no** `.map()` needed.

```vue
<ProductFeature
  v-for="(feature, index) in featureDetails"
  :key="index"
  :id="feature.id"
  :title="feature.title"
  :description="feature.description"
  :features="feature.features"
  :orientation="feature.orientation"
  :reverse="feature.reverse"
>
  <component :is="feature.component" />
</ProductFeature>
```

**Rules:**
- Do **not** use `<UPageSection>` for feature detail rows anymore.
- Do **not** pass `.map(f => ({ ...f, ui: { leading: 'p-0' } }))` — the
  component handles icon padding internally.
- `reverse` still must alternate strictly: `false → true → false → true`.
- The default slot receives the mockup component.

### 5.5 Secondary Feature Grid (UPageGrid / UPageCard)

Use for flagship, security, platform, or add-on sections.

```vue
<UPageSection
  ref="<sectionEl>"
  class="section-reveal"
  :class="{ 'is-visible': <sectionVisible> }"
  id="<section-id>"
  orientation="horizontal"
  headline="<Section Label>"
  title="<Section Title>"
  description="<Section description.>"
  :ui="{
    root: 'min-h-screen flex flex-col justify-center',
    headline: 'reveal-down',
    title: 'reveal-up reveal-delay-150',
    description: 'reveal-up reveal-delay-300',
  }"
>
  <!-- Optional: tag pills (placed in #features slot when orientation="horizontal") -->
  <template #features>
    <div class="flex flex-wrap gap-2">
      <UBadge
        v-for="tag in <tagArray>"
        :key="tag"
        variant="soft"
        color="primary"
        size="lg"
      >{{ tag }}</UBadge>
    </div>
  </template>

  <UPageGrid class="lg:grid-cols-2">
    <UPageCard
      v-for="(feature, index) in <featuresArray>"
      :key="feature.title"
      v-bind="feature"
      :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
      spotlight
      class="reveal-up"
      :style="{ animationDelay: `${400 + index * 80}ms` }"
    />
  </UPageGrid>
</UPageSection>
```

**Grid column variants:**

| Cards | Grid class |
|---|---|
| 4 items | `lg:grid-cols-2` |
| 3 items (deployment-style) | `lg:grid-cols-3` |
| 5 items (add-on steps) | `sm:grid-cols-2 lg:grid-cols-5` (or `lg:grid-cols-3`) |

**Rules:**
- `spotlight` is always present on `UPageCard`.
- `leadingIcon` ui override is always `'text-primary p-2 rounded-lg size-8'`.
- Always stagger cards: `400 + index * 80ms`.

### 5.5a Deployment-style cards with `#headline` slot

When cards need a small label badge above the title (e.g., DMS deployment section):

```vue
<UPageGrid class="lg:grid-cols-3">
  <UPageCard
    v-for="(feat, index) in deploymentFeatures"
    :key="feat.title"
    :title="feat.title"
    :description="feat.description"
    :icon="feat.icon"
    :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
    spotlight
    class="reveal-up"
    :style="{ animationDelay: `${400 + index * 80}ms` }"
  >
    <template #headline>
      <span class="text-[10px] font-bold uppercase tracking-widest text-muted">{{ feat.label }}</span>
    </template>
  </UPageCard>
</UPageGrid>
```

The data shape for these cards includes an extra `label` field:

```ts
const deploymentFeatures = [
  {
    title: 'Any backend you choose',
    description: 'File system, S3-compatible cloud storage, or on-premise Minio.',
    icon: 'i-lucide-hard-drive',
    label: 'Storage',
  },
  // 3 items total
]
```

### 5.6 Custom Icon Leading for Add-on Cards

When add-on cards use a custom leading (not `leadingIcon`), render it via the
`#leading` slot:

```vue
<UPageCard … spotlight spotlight-color="primary" class="reveal-up" :style="{ animationDelay: `${400 + index * 80}ms` }">
  <template #leading>
    <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      <UIcon :name="feat.icon" class="size-5 text-primary" />
    </div>
  </template>
</UPageCard>
```

### 5.7 Timeline Section ("How It Works" / Financial Cycle)

Wrap `ProductTimeline` in a plain `<div>` inside the section to prevent layout
conflicts. Add the full reveal UI set.

```vue
<UPageSection
  ref="<timelineEl>"
  class="section-reveal"
  :class="{ 'is-visible': <timelineVisible> }"
  :headline="<obj>.headline"
  :title="<obj>.title"
  :description="<obj>.description"
  :ui="{
    root: 'min-h-screen flex flex-col justify-center',
    headline: 'reveal-down',
    title: 'reveal-up reveal-delay-150',
    description: 'reveal-up reveal-delay-300',
  }"
>
  <div>
    <ProductTimeline :items="<timelineSteps>" />
  </div>
</UPageSection>
```

**`ProductTimeline` entrance reveal** is self-contained — each card uses an
`IntersectionObserver` (threshold 0.15, rootMargin `-40px`) that sets a
`revealedSteps` set per card index. Cards and their content animate in
independently once they enter the viewport.

### 5.8 CTA (always last)

`ProductCTA` manages its own `useScrollReveal` internally — no page-level ref.

```vue
<UPageSection>
  <ProductCTA
    title="Ready to <action> your <domain>?"
    description="<Social proof or benefit sentence.>"
    :links="ctaLinks"
  />
</UPageSection>
```

**Rules:**
- `<UPageSection>` wrapper has **no props** (no id, headline, title, ref).
- `ProductCTA` title always starts with `"Ready to …"`.
- Include social proof ("Join 200+ schools…") or a time-to-value statement.
- CTA buttons automatically get staggered `reveal-up` with `450 + index * 100ms`.

---

## 6. `useProductNav` — Scroll Spy Navigation Integration

The `product` layout (`app/layouts/product.vue`) uses `useProductNav` to build
the sticky header nav with active section highlighting. **Every new product page
must be registered in two maps** inside
`app/composables/useProductNav.ts`:

### 6.1 `productBonusNavMap` — bonus section nav item

Register the product's bonus section (the section between feature details and
the CTA):

```ts
export const productBonusNavMap: Record<string, NavigationMenuItem> = {
  // …existing entries…
  <product>: { label: '<Bonus Section Label>', to: '#<bonus-section-id>' },
}
```

| Product key | Label | Anchor |
|---|---|---|
| `hris` | Add-on Modules | `#addons` |
| `cms` | Security & Settings | `#security-settings` |
| `lms` | AI Tutorial | `#ai-features` |
| `aissp` | Planning Flow | `#how-it-works` |
| `fms` | Financial Cycle | `#cycle` |
| `ams` | Asset Lifecycle | `#lifecycle` |
| `elib` | Architecture | `#platform-architecture` |
| `dms` | Deployment | `#deployment` |
| `ilsp` | Global Analytics | `#analytics` |
| `eis` | Data Pipelines | `#pipelines` |
| `hkas` | Wellness Dashboard | `#dashboard` |
| `irs` | Prevention Flow | `#flow` |

### 6.2 `productFeaturesMap` — per-module dropdown nav children

Register the product's feature modules with label, anchor, description, and
icon. These become the dropdown children under "Features" in the header nav:

```ts
export const productFeaturesMap: Record<string, NavigationMenuItem[]> = {
  // …existing entries…
  <product>: [
    { label: 'Module A', to: '#module-a', description: 'Short description', icon: 'i-lucide-<icon>' },
    { label: 'Module B', to: '#module-b', description: 'Short description', icon: 'i-lucide-<icon>' },
    // One entry per featureDetails module
  ],
}
```

**Rules:**
- Each `to` anchor must exactly match the corresponding `featureDetails[n].id`.
- Always use kebab-case IDs: `#employee-records`, `#ocr-transcribing`, etc.
- The `description` is a short phrase shown in the nav dropdown.
- Icons should match the ones used in `modules[]` on the page.

### 6.3 Tracked section IDs (auto-computed)

The composable auto-builds the scroll-spy list in this order:
1. `why-choose-us`
2. `platform`
3. All `productFeaturesMap[product]` anchors
4. The `productBonusNavMap[product]` anchor
5. `contact`

This means your section `id` attributes **must** exactly match the registered
anchors. The scroll progress bar and nav highlighting are driven by this list.

---

## 7. Naming Conventions

| Concept | Convention | Example |
|---|---|---|
| Page file | `app/pages/products/<product>/index.vue` | `app/pages/products/fms/index.vue` |
| Mockup component import | `MockupScreen<Product><Module>` | `MockupScreenHrisPayroll` |
| Core features section id | `why-choose-us` (fixed) | `id="why-choose-us"` |
| Hub diagram section id | `platform` (fixed) | `id="platform"` |
| Feature detail section id | kebab-case, matches `modules[n].to` | `id="employee-records"` |
| Scroll reveal ref | `<sectionName>El` / `<sectionName>Visible` | `featuresEl`, `featuresVisible` |
| Center label in HubDiagram | `"<ABBR> CORE"` | `"HR CORE"` |
| Hero badge (branded product) | `"Introducing <ProductName> 2.0"` | `"Introducing PeopleCore 2.0"` |
| Hero badge (standalone tool) | Category · descriptor | `"DICT-aligned · Automated ISSP Creator"` |
| Hero badge (system with abbreviation) | `"<ABBR> · <Full System Name>"` | `"DMS · Document Management System"` |

---

## 8. Icon Usage Guidelines

- Use **Lucide icons** exclusively (`i-lucide-*`).
- Feature bullets always use `i-lucide-check`.

| Domain | Icon |
|---|---|
| Users / Employees | `i-lucide-users` |
| Payroll / Money | `i-lucide-banknote` |
| Time / Attendance | `i-lucide-clock` |
| Recruitment | `i-lucide-user-plus` |
| Learning | `i-lucide-book-open` |
| Analytics / Reports | `i-lucide-bar-chart-2` |
| Security / Access | `i-lucide-shield-check` |
| Settings / Config | `i-lucide-settings` |
| Scheduling | `i-lucide-calendar-clock` |
| Billing / Payments | `i-lucide-receipt-text` |
| Inventory | `i-lucide-shopping-cart` |
| AI features | `i-lucide-sparkles` |
| Demo / Calendar CTA | `i-lucide-calendar` |
| Phone / Sales CTA | `i-lucide-phone` |
| Play / Watch Demo | `i-lucide-play-circle` |
| Documents / Files | `i-lucide-file-text` |
| Search | `i-lucide-search` |
| OCR / Scanning | `i-lucide-scan-text` |
| Digital Signature | `i-lucide-pen-tool` |
| Versioning / History | `i-lucide-history` |
| Workflow / Routing | `i-lucide-workflow` |
| QR / Barcode | `i-lucide-qr-code` |
| Assets / Boxes | `i-lucide-boxes` |
| Maintenance / Repair | `i-lucide-wrench` |
| Partnerships / Globe | `i-lucide-globe` |
| Mobility / Travel | `i-lucide-plane` |

---

## 9. Section Checklist for New Pages

Before shipping a new product landing page, verify:

- [ ] `definePageMeta({ layout: 'product' })` declared
- [ ] `useSeoMeta` title and description filled in
- [ ] `useScrollReveal` refs declared for every UPageSection that needs reveal
- [ ] `heroLinks` has 2 buttons; primary has `class: 'hero-cta-shadow'`
- [ ] `ctaLinks` has 2 buttons; both have `size: 'lg' as const`; primary uses the correct dark-mode class
- [ ] `checklist` has exactly 3 items
- [ ] `features` has exactly 4 items (no `orientation` in the data object)
- [ ] Core features grid uses `id="why-choose-us"` (not `id="features"`)
- [ ] Core features grid uses `#features` slot with staggered `animationDelay`
- [ ] Core features grid `UPageSection` has `root: 'min-h-screen flex flex-col justify-center'`
- [ ] Hub diagram section uses `id="platform"`
- [ ] Hub diagram `UPageSection` has `root: 'min-h-screen flex flex-col justify-center'`
- [ ] `HubDiagram` has `class="reveal-right reveal-delay-400"` and correct `center-label`
- [ ] Feature details use `<ProductFeature>` (not raw `<UPageSection>`)
- [ ] `featureDetails` `reverse` strictly alternates `false → true → false → true`
- [ ] Each `featureDetails` id matches its `modules[n].to` anchor
- [ ] All bonus sections have a `useScrollReveal` ref and full reveal UI tokens
- [ ] Timeline sections wrap `<ProductTimeline>` in a plain `<div>`
- [ ] Final `<UPageSection>` (CTA wrapper) has **no props**
- [ ] All icons are Lucide (`i-lucide-*`)
- [ ] Mockup components imported from `#components`
- [ ] Product registered in `productBonusNavMap` in `useProductNav.ts`
- [ ] Product registered in `productFeaturesMap` in `useProductNav.ts`
- [ ] All `productFeaturesMap` anchors match `featureDetails[n].id` exactly

---

## 10. Full Minimal Template

```vue
<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreen<Product>ModuleA,
  MockupScreen<Product>ModuleB,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: '<Full Product Name> — <Tagline> | CCCI',
  description: '<Value proposition sentence>.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl,  isVisible: modulesVisible  } = useScrollReveal({ threshold: 0.3, delay: 300 })
// Add one per bonus section

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
  { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-play-circle' },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75', size: 'lg' as const },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const modules = [
  { title: 'Module A', icon: 'i-lucide-layers',       to: '#module-a' },
  { title: 'Module B', icon: 'i-lucide-shield-check', to: '#module-b' },
]

const checklist = [
  'Key differentiator 1',
  'Key differentiator 2',
  'Key differentiator 3',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  { title: 'Value 1', description: 'One sentence.', icon: 'i-lucide-zap' },
  { title: 'Value 2', description: 'One sentence.', icon: 'i-lucide-layers' },
  { title: 'Value 3', description: 'One sentence.', icon: 'i-lucide-shield-check' },
  { title: 'Value 4', description: 'One sentence.', icon: 'i-lucide-globe' },
]

const featureDetails = [
  {
    id: 'module-a',
    title: 'Module A',
    description: 'Punchy subtitle.',
    features: [
      { description: 'Bullet 1.', icon: 'i-lucide-check' },
      { description: 'Bullet 2.', icon: 'i-lucide-check' },
      { description: 'Bullet 3.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreen<Product>ModuleA,
  },
  {
    id: 'module-b',
    title: 'Module B',
    description: 'Punchy subtitle.',
    features: [
      { description: 'Bullet 1.', icon: 'i-lucide-check' },
      { description: 'Bullet 2.', icon: 'i-lucide-check' },
      { description: 'Bullet 3.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,  // ← alternates
    component: MockupScreen<Product>ModuleB,
  },
]
</script>

<template>
  <!-- Hero (self-contained reveal) -->
  <ProductHero
    badge="<ABBR> · <Full System Name>"
    background-image="/hero-<product>-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Headline,<br>second line.
    </template>
    <template #description>
      The <strong>Full Product Name</strong> value prop — built by
      <strong>Centralized Cloud Computing International</strong>.
    </template>
  </ProductHero>

  <!-- Core features grid -->
  <UPageSection
    id="why-choose-us"
    ref="featuresEl"
    class="section-reveal"
    :class="{ 'is-visible': featuresVisible }"
    headline="Why Choose Us"
    title="Section headline."
    description="Supporting sentence."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <template #features>
      <UPageFeature
        v-for="(feature, i) in features"
        :key="feature.title"
        v-bind="feature"
        class="reveal-up"
        :style="{ animationDelay: `${400 + i * 100}ms` }"
      />
    </template>
  </UPageSection>

  <!-- Hub diagram -->
  <UPageSection
    id="platform"
    ref="modulesEl"
    class="section-reveal"
    :class="{ 'is-visible': modulesVisible }"
    headline="The Platform"
    title="<N> modules. One connected system."
    description="Platform overview sentence."
    orientation="horizontal"
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      features: 'grid grid-cols-2 gap-4',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <template #features>
      <UPageFeature
        v-for="(module, index) in modules"
        :key="index"
        :title="module.title"
        icon="i-lucide-check"
        class="reveal-up"
        :style="{ animationDelay: `${400 + index * 60}ms` }"
      />
    </template>
    <HubDiagram
      center-label="<ABBR> CORE"
      :nodes="modules"
      class="reveal-right reveal-delay-400"
    />
  </UPageSection>

  <!-- Feature details (self-contained reveal via ProductFeature) -->
  <ProductFeature
    v-for="(feature, index) in featureDetails"
    :key="index"
    :id="feature.id"
    :title="feature.title"
    :description="feature.description"
    :features="feature.features"
    :orientation="feature.orientation"
    :reverse="feature.reverse"
  >
    <component :is="feature.component" />
  </ProductFeature>

  <!-- CTA (self-contained reveal via ProductCTA) -->
  <UPageSection>
    <ProductCTA
      title="Ready to <action> your <domain>?"
      description="<Social proof or benefit. One to two sentences.>"
      :links="ctaLinks"
    />
  </UPageSection>
</template>
```
