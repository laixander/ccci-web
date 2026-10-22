<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/themes"
    title="Themes & visuals"
    icon="i-lucide-palette"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Themes & visuals</span>
          <p class="text-[10px] text-muted mt-0.5">Report styling · Custom brand palettes, visual widgets & layouts</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Live Preview"
            icon="i-lucide-eye"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="New Theme"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Active Brand Palette Swatches -->
      <div class="flex items-center justify-between p-3 rounded-xl border border-default bg-elevated/40">
        <div class="flex items-center gap-2.5">
          <div class="flex -space-x-1.5 overflow-hidden">
            <span class="size-6 rounded-full bg-primary ring-2 ring-default shrink-0" />
            <span class="size-6 rounded-full bg-amber-500 ring-2 ring-default shrink-0" />
            <span class="size-6 rounded-full bg-emerald-500 ring-2 ring-default shrink-0" />
            <span class="size-6 rounded-full bg-slate-600 ring-2 ring-default shrink-0" />
          </div>
          <div>
            <p class="text-[11.5px] font-bold text-highlighted leading-tight">University Brand Palette</p>
            <p class="text-[9.5px] text-muted font-mono">Primary · Accent · Success · Charcoal</p>
          </div>
        </div>
        <UBadge
          label="Active"
          color="success"
          variant="subtle"
          size="xs"
          class="font-bold uppercase tracking-wider"
        />
      </div>

      <!-- Library Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[12px] text-highlighted">Library (Themes & custom charts)</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Theme & Visual Items -->
      <div v-if="items?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in items"
          :key="item.name"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', item.iconBg]">
              <UIcon :name="item.icon" :class="['size-4', item.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ item.name }}</p>
                <UBadge
                  :label="item.type"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                  class="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0"
                />
              </div>
              <p class="text-[10.5px] text-muted truncate mt-0.5">{{ item.detail }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <UBadge
              :label="item.status"
              :color="item.statusColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Footer Info Strip -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <span class="size-1.5 rounded-full bg-success" />
          Full CSS custom properties & white-label ready
        </span>
        <span class="hidden sm:inline">Supports Light & Dark Modes</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'brand-check',
    title: 'Brand Integrity',
    subtitle: '100% Institutional Match',
    icon: 'i-lucide-palette',
    color: 'success',
    pulse: true,
  },
  {
    id: 'visual-types',
    title: 'Bespoke Visuals',
    subtitle: 'Funnels, Waterfalls & Maps',
    icon: 'i-lucide-sparkles',
    color: 'primary',
    badge: { label: 'INTERACTIVE', color: 'primary' },
  },
  {
    id: 'export-theme',
    title: 'Vector Rendering',
    subtitle: 'Slide & Board-Deck Ready',
    icon: 'i-lucide-presentation',
    color: 'info',
  },
]

// ─── Themes & Visuals Data ────────────────────────────────────────────────────
interface VisualItem {
  type: 'Theme' | 'Visual'
  name: string
  detail: string
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconBg: string
  iconColor: string
}

const items: VisualItem[] = [
  {
    type: 'Theme',
    name: 'University brand theme',
    detail: 'Institution seal watermark, official typography & primary blue palette',
    status: 'Applied',
    statusColor: 'success',
    icon: 'i-lucide-palette',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    type: 'Visual',
    name: 'Enrollment funnel',
    detail: 'Applicant inquiry → Admission → Assessment → Payment drop-off rates',
    status: 'Custom',
    statusColor: 'primary',
    icon: 'i-lucide-filter',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    type: 'Visual',
    name: 'Budget waterfall',
    detail: 'Appropriation adjustments, actual spending variances & remaining balance',
    status: 'Custom',
    statusColor: 'primary',
    icon: 'i-lucide-bar-chart-2',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    type: 'Theme',
    name: 'Board presentation',
    detail: 'High-contrast projector mode with widescreen 16:9 executive cards',
    status: 'Draft',
    statusColor: 'neutral',
    icon: 'i-lucide-presentation',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
]
</script>
