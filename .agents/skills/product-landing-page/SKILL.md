---
name: product-landing-page
description: >
  Layout and design consistency guide for building new CCCI product landing
  pages. Extracted from the six existing pages: CMS (CampusCore), LMS
  (LearnCore), HRIS (PeopleCore), AISSP, eLibrary System, and FMS.
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
| `reveal-delay-150` | 150 ms animation delay |
| `reveal-delay-300` | 300 ms animation delay |
| `reveal-delay-400` | 400 ms animation delay |
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
    size: 'lg' as const, // optional — used when buttons need more visual weight
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
    orientation: 'vertical' as const,  // always vertical
  },
  // × 4 total — do NOT include `orientation` in the data; pass it here
]
```

> **Note:** `orientation` is NOT needed in the data object when the component
> renders it via `UPageFeature` directly. Keep it only if you spread the object
> into a component that requires it.

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
2. Core features grid     ← UPageSection id="features" + useScrollReveal ref
3. Hub diagram            ← UPageSection "The Platform" + useScrollReveal ref
4. Feature details        ← <ProductFeature> v-for (self-contained reveal)
5. Bonus section(s)       ← 0–2 extra UPageSections, each with a useScrollReveal ref
6. CTA                    ← always last; ProductCTA is self-contained
```

---

## 5. Template — Component Patterns

### 5.1 Hero (`ProductHero`)

`ProductHero` manages its own reveal internally — no page-level ref needed.

```vue
<ProductHero
  badge="Introducing <ProductName> 2.0"
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

**Rules:**
- `badge` format: `"Introducing <ProductName> 2.0"` for branded products, or a
  category descriptor like `"DICT-aligned · Automated ISSP Creator"`.
- The `#title` slot always uses `<br>` to create a two-line headline.
- Always credit CCCI inside `#description` with `<strong>`.
- The background image has a built-in `hero-bg-reveal` / `hero-bg-visible` CSS
  fade + scale animation; do not override it.

### 5.2 Core Features Grid

```vue
<UPageSection
  id="features"
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
- `id="features"` is fixed across all pages.
- `headline` is typically `"Why Choose Us"` or a short product category name.
- Always use the `#features` slot with staggered `animationDelay` — do **not**
  pass `:features` prop directly anymore.
- `root: 'min-h-screen flex flex-col justify-center'` is required on every
  full-viewport section.

### 5.3 Hub Diagram ("The Platform")

```vue
<UPageSection
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

**Rules:**
- `spotlight` is always present on `UPageCard`.
- `leadingIcon` ui override is always `'text-primary p-2 rounded-lg size-8'`.
- Grid is `lg:grid-cols-2` for 4-item grids; `sm:grid-cols-2 lg:grid-cols-5`
  for 5-item add-on grids.
- Always stagger cards: `400 + index * 80ms`.

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

## 6. Naming Conventions

| Concept | Convention | Example |
|---|---|---|
| Page file | `app/pages/products/<product>/index.vue` | `app/pages/products/fms/index.vue` |
| Mockup component import | `MockupScreen<Product><Module>` | `MockupScreenHrisPayroll` |
| Section anchor id | kebab-case, matches `modules[n].to` | `id="employee-records"` |
| Scroll reveal ref | `<sectionName>El` / `<sectionName>Visible` | `featuresEl`, `featuresVisible` |
| Center label in HubDiagram | `"<ABBR> CORE"` | `"HR CORE"` |
| Hero badge (branded product) | `"Introducing <ProductName> 2.0"` | `"Introducing PeopleCore 2.0"` |
| Hero badge (standalone tool) | Category · descriptor | `"DICT-aligned · Automated ISSP Creator"` |

---

## 7. Icon Usage Guidelines

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

---

## 8. Section Checklist for New Pages

Before shipping a new product landing page, verify:

- [ ] `definePageMeta({ layout: 'product' })` declared
- [ ] `useSeoMeta` title and description filled in
- [ ] `useScrollReveal` refs declared for every UPageSection that needs reveal
- [ ] `heroLinks` has 2 buttons; primary has `class: 'hero-cta-shadow'`
- [ ] `ctaLinks` has 2 buttons; primary uses the correct dark-mode class
- [ ] `checklist` has exactly 3 items
- [ ] `features` has exactly 4 items
- [ ] Core features grid uses `#features` slot with staggered `animationDelay`
- [ ] Core features grid `UPageSection` has `root: 'min-h-screen flex flex-col justify-center'`
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

---

## 9. Full Minimal Template

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
  { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75' },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone' },
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
    badge="Introducing <ProductName> 2.0"
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
    id="features"
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
