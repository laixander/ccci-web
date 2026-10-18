---
name: mockup-screen
description: >
  Conventions and patterns for creating CCCI product mockup screen components
  in `app/components/mockup/screen/<product>/`. Ensures consistent structure,
  NuxtUI component usage, v-for patterns, TypeScript data modeling, and visual
  design across all product mockups.
  Activate whenever scaffolding, reviewing, or extending a mockup screen.
---

# Mockup Screen — Authoring Guide

## 1. File Location & Naming

Every mockup screen lives at:

```
app/components/mockup/screen/<product>/<ScreenName>.vue
```

- `<product>` — lowercase short product code: `aissp`, `cms`, `elib`, `fms`, `hris`, `lms`, etc.
- `<ScreenName>` — PascalCase feature name: `Dashboard`, `Payroll`, `Enrollment`, `Budgeting`, etc.

Auto-import name follows Nuxt convention: `MockupScreen<Product><ScreenName>`
e.g. `MockupScreenHrisPayroll`, `MockupScreenFmsBudgeting`

---

## 2. Frame Components

### 2.1 BrowserFrame — `MockupBrowserFrame`

Use for desktop/web app screens.

```vue
<MockupBrowserFrame url="app.<product>.ccci.com.ph/<route>" title="<Screen Title>">
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

**What it renders automatically:**
- macOS-style title bar with traffic-light dots + URL pill
- App Header (`v-if="title"`) with:
  - Primary square badge (logo or icon)
  - Screen title in bold
  - `UButton` ellipsis action button (`i-lucide-ellipsis-vertical`)

**When to use the `icon` prop:**
Use `icon` when the screen has a distinctive action identity — e.g. drag/sort screens (`i-lucide-arrow-up-down`), security screens (`i-lucide-shield-check`).

### 2.2 MobileFrame — `MockupMobileFrame`

Use for mobile/app screens only (e.g. eLib mobile shelf).

```vue
<MockupMobileFrame>
  <!-- content -->
</MockupMobileFrame>
```

No props. Renders a phone-shaped container.

---

## 3. Content Structure

The immediate child of the frame is always a single `<div>` with the content padding and flex layout:

```vue
<MockupBrowserFrame url="..." title="...">
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

## 4. The Golden Rules

1. **Always use a NuxtUI component** for every UI element — lists, tables, badges, buttons, inputs, progress bars, alerts. Never roll custom HTML where a NuxtUI component exists.
2. **Always use `v-for`** (with a typed interface) when rendering repeated items — cards, rows, badges, stat blocks, table data. Hard-coded copies are only acceptable for 2-3 non-repeating items (e.g., a 3-metric row where each metric has unique emphasis).
3. **Always type your data** with a TypeScript `interface` in `<script setup lang="ts">`. No `any[]`, no inline object literals without a type.
4. **Prefer `<template>` before `<script>`** — put the template first, script second.

---

## 5. NuxtUI Component Patterns

### 5.1 `UCard` — List rows & stat cards

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

### 5.2 `UBadge` — Status & labels

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
| Warning / Endorsed | `'warning'` |
| Error / Overdue / Denied | `'error'` |
| Neutral / Draft / New | `'neutral'` |
| Primary / Open / Highlighted | `'primary'` |

### 5.3 `UTable` — Tabular data

```vue
<UTable :data="items" :columns="columns" :ui="tableUi" />
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
    accessorKey: 'fieldName',
    header: 'COLUMN HEADER',
    meta: { class: { td: 'font-mono text-highlighted' } },
  },
]
```

### 5.4 `UProgress` — Progress bars

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

### 5.5 `UButton` — Actions

```vue
<UButton label="Generate" icon="i-lucide-plus" color="primary" size="lg" />
<UButton label="Export CSV" color="neutral" variant="outline" size="sm" class="font-mono" />
<UButton label="Cancel" color="neutral" variant="ghost" size="sm" />
```

### 5.6 `USelect` — Filters & dropdowns

```vue
<USelect :items="['All', 'Active', 'Inactive']" model-value="All" size="lg" color="neutral" variant="soft" />
```

### 5.7 `UAlert` — Status banners / callouts

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

### 5.8 `UIcon` — Icons

Always use Lucide: `i-lucide-*`. In mockup content, icons inside coloured circular badges:

```vue
<div class="size-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-2xs bg-emerald-500">
  <UIcon name="i-lucide-check" class="size-3.5" />
</div>
```

---

## 6. Typography & Spacing Tokens

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

## 7. Data Modeling Pattern

Always define a TypeScript `interface` and then declare static sample data.

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
- Use realistic-looking sample data (real-sounding names, typical amounts, plausible statuses).
- 3-6 items per list is ideal for mockup fidelity.

---

## 8. Common Section Patterns

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
  <span class="font-mono text-lg font-bold text-primary tracking-tight">P0,000.00</span>
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

## 9. Full Annotated Template

```vue
<template>
  <MockupBrowserFrame url="app.<product>.ccci.com.ph/<route>" title="<Screen Title>">
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Section 1: Header Row -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[14px] text-highlighted">Section Label</span>
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

## 10. Anti-Patterns to Avoid

| Don't | Do instead |
|---|---|
| Wrap content in `<main>` | Use `<div class="p-5 ...">` directly inside frame slot |
| Hard-code 4+ repeated items as individual elements | Use `v-for` with a typed data array |
| Use `string` type for badge/progress `color` prop | Use typed union: `'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'` |
| Use `any[]` for data arrays | Define a proper `interface` |
| Inline custom `<style>` or arbitrary colors | Use Tailwind semantic tokens (`text-muted`, `text-highlighted`, `bg-elevated`, `border-default`) |
| Use raw `<div>` for list rows | Use `UCard` with `:ui` body config |
| Roll custom badge spans | Use `UBadge` with `:color` and `variant="subtle"` |
| Put `<script>` before `<template>` in new screens | `<template>` first, `<script setup lang="ts">` second |
| Omit `v-if` guard on lists | Add `v-if="items?.length"` before the `v-for` container |

---

## 11. Checklist Before Shipping a Mockup

- [ ] File lives in `app/components/mockup/screen/<product>/<Name>.vue`
- [ ] Root element is `<MockupBrowserFrame url="..." title="...">` (or `MockupMobileFrame`)
- [ ] Content child is `<div class="p-5 flex-1 flex flex-col ...">` — no extra wrappers
- [ ] Every list uses `v-for` with a typed interface — no hard-coded duplicates
- [ ] All colour values for `UBadge`/`UProgress` `:color` are typed unions, not `string`
- [ ] Sample data is realistic (3-6 items, plausible names/amounts)
- [ ] `<template>` is declared before `<script setup lang="ts">`
- [ ] No inline `<style>` or arbitrary hex colors — only Tailwind tokens + semantic classes
- [ ] Only Lucide icons used (`i-lucide-*`)
