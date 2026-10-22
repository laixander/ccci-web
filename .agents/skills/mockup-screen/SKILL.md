---
name: mockup-screen
description: >
  Conventions and patterns for creating CCCI product mockup screen components
  in `app/components/mockup/screen/<product>/`. Ensures consistent structure,
  NuxtUI component usage, v-for patterns, TypeScript data modeling, floating tags,
  and visual design across all product mockups.
  Activate whenever scaffolding, reviewing, or extending a mockup screen.
---

# Mockup Screen — Authoring Guide

## 1. File Location & Naming

Every mockup screen lives at:

```
app/components/mockup/screen/<product>/<ScreenName>.vue
```

- `<product>` — lowercase short product code for all 12 platform modules:
  - `aissp` — Automated ISSP Creator
  - `ams` — Asset Management System
  - `cms` — CampusCore (Campus Management)
  - `dms` — Document Management System
  - `eis` — Executive Information System
  - `elib` — eLibrary System
  - `fms` — Financial Management System
  - `hkas` — Housekeeping & Asset Scheduling
  - `hris` — PeopleCore (HR & Payroll)
  - `ilsp` — International Linkages & Student Programs
  - `irs` — Incident Reporting System
  - `lms` — LearnCore (Learning Management)
- `<ScreenName>` — PascalCase feature name: `Dashboard`, `Payroll`, `Enrollment`, `Budgeting`, `Inventory`, etc.

Auto-import name follows Nuxt convention: `MockupScreen<Product><ScreenName>`
e.g. `MockupScreenHrisPayroll`, `MockupScreenFmsBudgeting`, `MockupScreenAmsInventory`

---

## 2. Frame Components

### 2.1 BrowserFrame — `MockupBrowserFrame`

Use for desktop/web app screens.

```vue
<MockupBrowserFrame
  url="app.<product>.ccci.com.ph/<route>"
  title="<Screen Title>"
  :floating-tags="floatingTags"
>
  <!-- content -->
</MockupBrowserFrame>
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `url` | `string` | `'example.com'` | Fake URL shown in the address bar |
| `title` | `string` | — | Screen/page title shown in the App Header |
| `logoLetter` | `string` | `'C'` | Single letter inside the primary icon badge |
| `icon` | `string` | — | `i-lucide-*` icon inside the badge (overrides `logoLetter`) |
| `floatingTags` | `MockupFloatingTag[]` | — | Floating status/metric cards rendered with staggered ambient float animation |

**Slots:**

| Slot | Description |
|---|---|
| `default` | Main screen body content |
| `tags` | Overrides the default floating tags container |
| `header` | Overrides the entire app header row |
| `logo` | Overrides the square logo badge inside the header |

**What it renders automatically:**
- macOS-style title bar with traffic-light dots + URL pill
- App Header (`v-if="title"`) with:
  - Primary square badge (logo or icon)
  - Screen title in bold
  - `UButton` ellipsis action button (`i-lucide-ellipsis-vertical`)
- Ambient floating cards (`v-if="floatingTags?.length"`) layered above and around the frame

**When to use the `icon` prop:**
Use `icon` when the screen has a distinctive action identity — e.g. drag/sort screens (`i-lucide-arrow-up-down`), security screens (`i-lucide-shield-check`), teaching screens (`i-lucide-graduation-cap`).

### 2.2 MobileFrame — `MockupMobileFrame`

Use for mobile/app screens only (e.g. eLib mobile shelf).

```vue
<MockupMobileFrame :floating-tags="floatingTags">
  <!-- content -->
</MockupMobileFrame>
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `floatingTags` | `MockupFloatingTag[]` | — | Floating status/metric cards rendered with staggered ambient float animation |

Renders a sleek phone-shaped container with rounded-4xl borders and subtle shadow.

---

## 3. Floating Tags — `MockupFloatingTag`

Floating tags provide depth, elevation, and live context to mockup screens. They render as glassmorphic cards (`backdrop-blur-md bg-white/20 dark:bg-elevated/20 shadow-xl`) floating outside the frame container.

### 3.1 Type Import & Interface

```ts
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'
```

The underlying interface:

```ts
export interface MockupFloatingTag {
  id?: string
  title: string
  subtitle: string
  icon: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  positionClass?: string     // Custom positioning (defaults to 3-point layout)
  animationClass?: string    // Custom float animation (defaults to animate-float-1..3)
  badge?: {
    label: string
    color?: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  }
  pulse?: boolean            // Renders a pulsing live-status dot
}
```

### 3.2 Canonical 3-Tag Setup

Providing 2–3 floating tags triggers the built-in default responsive positioning and staggered animations:

| Index | Default Position | Animation | Purpose |
|---|---|---|---|
| `0` | `-top-3.5 -right-3 sm:-right-4` | `animate-float-1` | Live status or headline metric (often `pulse: true`) |
| `1` | `-bottom-3.5 -left-3 sm:-left-4` | `animate-float-2` | Process step, approval, or verification status |
| `2` | `top-1/2 -right-4 sm:-right-6 -translate-y-1/2` | `animate-float-3` | System sync, compliance, or secondary counter |

```ts
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'live-sync',
    title: 'RFID Gateway',
    subtitle: '99.8% Live Sync',
    icon: 'i-lucide-radio',
    color: 'success',
    pulse: true,
  },
  {
    id: 'assets-count',
    title: '5,234 Active Assets',
    subtitle: '4 Campus Nodes',
    icon: 'i-lucide-boxes',
    color: 'primary',
    badge: { label: 'VERIFIED', color: 'primary' },
  },
  {
    id: 'maintenance',
    title: 'Auto-Maintenance',
    subtitle: '3 Work Orders',
    icon: 'i-lucide-wrench',
    color: 'warning',
    badge: { label: 'DUE', color: 'warning' },
  },
]
```

---

## 4. Content Structure

The immediate child of the frame is always a single `<div>` with content padding and flex layout:

```vue
<MockupBrowserFrame url="..." title="..." :floating-tags="floatingTags">
  <div class="p-5 flex-1 flex flex-col <gap> <justify>">
    <!-- sections -->
  </div>
</MockupBrowserFrame>
```

**Standard gap classes:**

| Layout | Classes |
|---|---|
| Tall, evenly spaced | `flex flex-col justify-between gap-5` |
| Stacked sections, medium gap | `flex flex-col gap-4` |
| Dense list-heavy | `flex flex-col gap-3` |
| Large whitespace | `flex flex-col gap-6` |
| Vertically centred | `flex flex-col justify-center gap-3.5` |

> **Never** use `<main>` or extra wrapper elements inside the frame slot. Content goes directly in the `<div class="p-5 ...">`.

---

## 5. The Golden Rules

1. **Always use a NuxtUI component** for every UI element — lists, tables, badges, buttons, inputs, progress bars, alerts. Never roll custom HTML where a NuxtUI component exists.
2. **Always include 2–3 `MockupFloatingTag` cards** to give the mockup visual depth and live system context.
3. **Always use `v-for`** (with a typed interface) when rendering repeated items — cards, rows, badges, stat blocks, table data. Hard-coded copies are only acceptable for 2-3 non-repeating items (e.g., a 3-metric row where each metric has unique emphasis).
4. **Always type your data** with a TypeScript `interface` in `<script setup lang="ts">`. No `any[]`, no inline object literals without a type.
5. **Prefer `<template>` before `<script>`** — put the template first, script second.

---

## 6. NuxtUI Component Patterns

### 6.1 `UCard` — List rows & stat cards

```vue
<UCard
  v-for="item in items"
  :key="item.id"
  variant="outline"
  :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
  class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
>
  <!-- left slot -->
  <!-- right slot -->
</UCard>
```

**Stat / summary card:**
```vue
<UCard
  v-for="stat in stats"
  :key="stat.label"
  variant="outline"
  :ui="{ body: 'p-3 sm:p-3.5 flex flex-col items-center justify-center gap-1' }"
  class="rounded-xl shadow-xs"
>
  <span class="text-[11px] font-mono text-muted">{{ stat.label }}</span>
  <span class="text-base font-bold font-mono text-highlighted tracking-tight leading-none">{{ stat.value }}</span>
</UCard>
```

**Soft banner / hero card:**
```vue
<UCard
  variant="soft"
  :ui="{ body: 'sm:p-5 text-white flex items-center justify-between' }"
  class="bg-gradient-to-r from-primary-500 to-primary-900 rounded-xl"
>
  <!-- content -->
</UCard>
```

### 6.2 `UBadge` — Status & labels

```vue
<UBadge
  :label="item.status"
  :color="item.badgeColor"
  variant="subtle"
  size="xs"
  class="font-bold tracking-wider"
/>
```

**Color map (always use typed union in interface):**

| Status | Color |
|---|---|
| Done / Active / Success / Approved / Generated | `'success'` |
| Pending / For Review / Info | `'info'` |
| Warning / Endorsed / Due | `'warning'` |
| Error / Overdue / Denied / Critical | `'error'` |
| Neutral / Draft / New / Archived | `'neutral'` |
| Primary / Open / Highlighted / Verified | `'primary'` |

### 6.3 `UTable` — Tabular data

Nuxt UI v4 `UTable` supports typed columns and per-column cell slots formatted as `#[columnKey]-cell="{ row }"`, where raw item data is accessed via `row.original`:

```vue
<UTable
  :data="items"
  :columns="columns"
  :ui="tableUi"
>
  <!-- Custom cell slot for 'name' column -->
  <template #name-cell="{ row }">
    <div class="flex items-center gap-2">
      <div class="size-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
        <UIcon :name="row.original.icon" class="size-3.5 text-primary" />
      </div>
      <span class="font-medium text-[12.5px] text-highlighted">{{ row.original.name }}</span>
    </div>
  </template>

  <!-- Custom cell slot for 'status' column -->
  <template #status-cell="{ row }">
    <UBadge
      :label="row.original.status"
      :color="row.original.color"
      variant="subtle"
      size="xs"
      class="uppercase tracking-widest font-bold px-2"
    />
  </template>
</UTable>
```

**Standard `tableUi`:**
```ts
const tableUi = {
  root: 'overflow-x-auto',
  th: 'pb-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted px-3 first:ps-0 last:pe-0 border-b border-default text-left',
  td: 'py-3 text-[12.5px] px-3 first:ps-0 last:pe-0 border-b border-default/60',
}
```

**Column definition with typed data:**
```ts
import type { TableColumn } from '@nuxt/ui'

const columns: TableColumn<MyType>[] = [
  {
    accessorKey: 'name',
    header: 'ITEM / RESOURCE',
    meta: { class: { td: 'font-mono text-highlighted' } },
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
  },
]
```

### 6.4 `UProgress` — Progress bars

```vue
<UProgress :model-value="item.value" :color="item.color" size="md" class="flex-1" />
```

**Progress with label (analytics pattern):**
```vue
<div v-for="item in items" :key="item.name" class="flex items-center gap-3">
  <span class="text-[10px] text-muted w-16 shrink-0">{{ item.name }}</span>
  <UProgress :model-value="item.value" color="primary" class="flex-1" />
  <span class="text-[10px] font-semibold text-highlighted w-6 text-right">{{ item.count }}</span>
</div>
```

### 6.5 `UButton` — Actions

```vue
<UButton label="Generate" icon="i-lucide-plus" color="primary" size="lg" />
<UButton label="Export CSV" color="neutral" variant="outline" size="sm" class="font-mono" />
<UButton label="View all" color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-chevron-right" />
<UButton label="Cancel" color="neutral" variant="ghost" size="sm" />
```

### 6.6 `USelect` — Filters & dropdowns

```vue
<USelect :items="['All', 'Active', 'Inactive']" model-value="All" size="lg" color="neutral" variant="soft" />
```

### 6.7 `UAlert` — Status banners / callouts

```vue
<UAlert
  variant="subtle"
  title="Status message"
  :ui="{
    root: 'rounded-xl',
    wrapper: 'flex-row items-center justify-between',
    title: 'font-mono text-xs font-semibold text-primary',
    actions: 'mt-0',
  }"
>
  <template #actions>
    <UBadge label="SYNCED" color="primary" variant="subtle" size="sm" class="font-bold tracking-wider uppercase rounded-full" />
  </template>
</UAlert>
```

### 6.8 `UIcon` — Icons

Always use Lucide: `i-lucide-*`. In mockup content, icons inside coloured circular or rounded badges:

```vue
<div class="size-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-2xs bg-emerald-500">
  <UIcon name="i-lucide-check" class="size-3.5" />
</div>
```

---

## 7. Typography & Spacing Tokens

| Purpose | Class |
|---|---|
| Screen section heading | `font-bold text-[14px] text-highlighted` |
| Sub-label / description | `text-[11px] text-muted` |
| Mono reference / ID | `font-mono text-[11px] text-muted font-medium` |
| Big stat number | `text-[40px] font-black text-highlighted leading-none tracking-tight` |
| KPI value | `text-[20px] font-black text-highlighted leading-none` |
| KPI trend | `text-[9px] font-semibold text-success` / `text-error` |
| Card item label | `font-bold text-[13px] text-highlighted` |
| Body text | `text-[12px] text-highlighted` |
| Section badge / tag | `text-[9px] text-muted uppercase tracking-widest font-bold` |

---

## 8. Data Modeling Pattern

Always define TypeScript interfaces and declare static sample data.

```ts
interface MyItem {
  id: string
  label: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const items: MyItem[] = [
  { id: '1', label: 'Item A', status: 'Active',  color: 'success' },
  { id: '2', label: 'Item B', status: 'Pending', color: 'info'    },
  { id: '3', label: 'Item C', status: 'Denied',  color: 'error'   },
]
```

**Rules:**
- `badgeColor` / `color` props must be typed with a union — never `string`.
- Use realistic-sounding sample data (real names, plausible IDs, typical amounts, credible statuses).
- 3–6 items per list is ideal for mockup fidelity.

---

## 9. Common Section Patterns

### Section header row

```vue
<div class="flex items-center justify-between">
  <span class="font-bold text-[14px] text-highlighted">Section Title</span>
  <div class="flex items-center gap-2">
    <UButton label="Action" icon="i-lucide-plus" color="primary" size="lg" />
    <USelect :items="['All', 'Active']" model-value="All" size="lg" color="neutral" variant="soft" />
  </div>
</div>
```

### KPI / metric grid

```vue
<div class="grid grid-cols-4 gap-3">
  <UCard v-for="kpi in kpis" :key="kpi.label" variant="outline" :ui="{ body: 'sm:p-3 flex flex-col gap-1' }" class="rounded-xl shadow-sm">
    <p class="text-[9px] text-muted uppercase tracking-widest">{{ kpi.label }}</p>
    <p class="text-[20px] font-black text-highlighted leading-none">{{ kpi.value }}</p>
    <p class="text-[9px] font-semibold mt-0.5" :class="kpi.up ? 'text-success' : 'text-error'">{{ kpi.trend }}</p>
  </UCard>
</div>
```

### Action footer bar

```vue
<div class="flex items-center gap-2.5 pt-1">
  <UButton label="Primary Action" color="primary" size="sm" />
  <UButton label="Secondary" color="neutral" variant="outline" size="sm" class="font-mono" />
  <span class="text-[10px] text-muted font-mono ml-auto">N items</span>
</div>
```

### Amount / total banner

```vue
<div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-center justify-between">
  <span class="font-mono text-xs font-semibold text-primary tracking-wide">Total Amount</span>
  <span class="font-mono text-lg font-bold text-primary tracking-tight">₱0,000.00</span>
</div>
```

### Progress analytics section

```vue
<UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3' }" class="rounded-xl">
  <p class="text-[11px] font-bold text-highlighted mb-1">Section Label</p>
  <div v-for="item in items" :key="item.name" class="flex items-center gap-3">
    <span class="text-[10px] text-muted w-16 shrink-0">{{ item.name }}</span>
    <UProgress :model-value="item.value" color="primary" class="flex-1" />
    <span class="text-[10px] font-semibold text-highlighted w-6 text-right">{{ item.count }}</span>
  </div>
</UCard>
```

---

## 10. Full Annotated Template

```vue
<template>
  <MockupBrowserFrame
    url="app.<product>.ccci.com.ph/<route>"
    title="<Screen Title>"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Section 1: Header Row -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[14px] text-highlighted">Section Label</span>
        <UButton label="New Entry" icon="i-lucide-plus" color="primary" size="xs" />
      </div>

      <!-- Section 2: Repeated List (v-for required) -->
      <div v-if="items?.length" class="flex flex-col gap-3">
        <UCard
          v-for="item in items"
          :key="item.id"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <span class="font-semibold text-[12px] text-highlighted">{{ item.label }}</span>
          </div>
          <UBadge :label="item.status" :color="item.color" variant="subtle" size="xs" class="font-bold tracking-wider" />
        </UCard>
      </div>

      <!-- Section 3: Footer Actions -->
      <div class="flex items-center gap-2 pt-1">
        <UButton label="Primary Action" color="primary" size="sm" />
        <UButton label="Secondary" color="neutral" variant="outline" size="sm" />
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'status',
    title: 'Live Monitor',
    subtitle: '99.9% Uptime · Synchronized',
    icon: 'i-lucide-activity',
    color: 'success',
    pulse: true,
  },
  {
    id: 'verified',
    title: 'Records Verified',
    subtitle: 'ISO 27001 Compliant',
    icon: 'i-lucide-shield-check',
    color: 'primary',
    badge: { label: 'VERIFIED', color: 'primary' },
  },
  {
    id: 'alerts',
    title: 'Auto-Routing',
    subtitle: '2 Items Pending Review',
    icon: 'i-lucide-clock',
    color: 'warning',
    badge: { label: 'PENDING', color: 'warning' },
  },
]

// ─── List Data ────────────────────────────────────────────────────────────────
interface ListItem {
  id: string
  label: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const items: ListItem[] = [
  { id: '1', label: 'Item Alpha', status: 'Active',  color: 'success' },
  { id: '2', label: 'Item Beta',  status: 'Pending', color: 'info'    },
  { id: '3', label: 'Item Gamma', status: 'Denied',  color: 'error'   },
]
</script>
```

---

## 11. Anti-Patterns to Avoid

| Don't | Do instead |
|---|---|
| Wrap content in `<main>` | Use `<div class="p-5 ...">` directly inside frame slot |
| Omit `floatingTags` on primary product screens | Always provide 2–3 `MockupFloatingTag` objects with realistic context |
| Hardcode browser window borders or traffic-light dots | Use `<MockupBrowserFrame>` or `<MockupMobileFrame>` |
| Hardcode 4+ repeated items as individual elements | Use `v-for` with a typed data array |
| Use `string` type for badge/progress/tag `color` prop | Use typed union: `'success' \| 'info' \| 'warning' \| 'error' \| 'primary' \| 'neutral'` |
| Use `any[]` for data arrays | Define a proper `interface` |
| Inline custom `<style>` or arbitrary hex colors | Use Tailwind semantic tokens (`text-muted`, `text-highlighted`, `bg-elevated`, `border-default`) |
| Use raw `<div>` for list rows | Use `UCard` with `:ui` body config |
| Roll custom badge spans | Use `UBadge` with `:color` and `variant="subtle"` |
| Put `<script>` before `<template>` in new screens | `<template>` first, `<script setup lang="ts">` second |
| Omit `v-if` guard on lists | Add `v-if="items?.length"` before the `v-for` container |

---

## 12. Checklist Before Shipping a Mockup

- [ ] File lives in `app/components/mockup/screen/<product>/<Name>.vue`
- [ ] Root element is `<MockupBrowserFrame url="..." title="..." :floating-tags="floatingTags">` (or `<MockupMobileFrame :floating-tags="floatingTags">`)
- [ ] 2–3 `floatingTags` defined using `MockupFloatingTag` imported from `~/components/mockup/BrowserFrame.vue`
- [ ] Content child is `<div class="p-5 flex-1 flex flex-col ...">` — no extra wrappers
- [ ] Every list uses `v-for` with a typed interface — no hard-coded duplicates
- [ ] All colour values for `UBadge`/`UProgress`/`MockupFloatingTag` `:color` are typed unions, not `string`
- [ ] Sample data is realistic (3–6 items, plausible names/amounts)
- [ ] `<template>` is declared before `<script setup lang="ts">`
- [ ] No inline `<style>` or arbitrary hex colors — only Tailwind tokens + semantic classes
- [ ] Only Lucide icons used (`i-lucide-*`)
