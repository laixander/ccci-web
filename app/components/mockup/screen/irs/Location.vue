<template>
  <MockupBrowserFrame
    url="irs.ccci.com.ph/report/8821/map"
    title="Location"
    icon="i-lucide-map-pin"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Location</span>
          <p class="text-[10px] text-muted mt-0.5">Library Bldg, 2nd floor · Incident #8821</p>
        </div>
        <UBadge
          label="Live GPS"
          color="primary"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider uppercase"
        />
      </div>

      <!-- Campus Map Radar Mockup -->
      <div class="relative rounded-xl border border-default/80 bg-elevated/40 p-4 overflow-hidden flex flex-col justify-between h-28">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 opacity-15 pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 16px 16px;" />
        
        <div class="flex items-center justify-between z-10">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-error animate-ping" />
            <span class="text-[11px] font-bold text-highlighted">Student Beacon</span>
          </div>
          <span class="text-[10px] font-mono text-muted">14.5995° N, 120.9842° E</span>
        </div>

        <div class="flex items-center justify-between z-10 pt-2 border-t border-default/40">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-navigation" class="size-4 text-warning" />
            <span class="text-[11px] font-medium text-highlighted">Security Patrol Unit 2</span>
          </div>
          <UBadge label="90s ETA · 120m" color="warning" variant="subtle" size="xs" />
        </div>
      </div>

      <!-- Position list header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Position</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Position items -->
      <div v-if="positionItems?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in positionItems"
          :key="item.tag"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center shrink-0', item.iconBg]">
              <UIcon :name="item.icon" :class="['size-3.5', item.iconColor]" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ item.item }}</p>
              <p class="text-[10px] text-muted uppercase tracking-wider font-mono">{{ item.tag }}</p>
            </div>
          </div>
          <UBadge
            :label="item.status"
            :color="item.color"
            variant="subtle"
            size="xs"
            class="font-bold tracking-wider"
          />
        </UCard>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-crosshair" class="size-3.5 text-primary" />
          Indoor beacon sync: Sector B-2
        </span>
        <span>Accuracy ~5m</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'gps-lock',
    title: 'Indoor Positioning',
    subtitle: 'Floor 2 · Sector B',
    icon: 'i-lucide-map-pin',
    color: 'primary',
    pulse: true,
  },
  {
    id: 'accuracy',
    title: 'Precision GPS',
    subtitle: 'Within ~5m Margin',
    icon: 'i-lucide-crosshair',
    color: 'success',
    badge: { label: 'LOCKED', color: 'success' },
  },
  {
    id: 'fastest-path',
    title: 'Auto-Routing',
    subtitle: 'Path to Stairwell 3',
    icon: 'i-lucide-navigation',
    color: 'info',
    badge: { label: 'OPTIMAL', color: 'info' },
  },
]

// ─── Data Interface ───────────────────────────────────────────────────────────
interface PositionItem {
  tag: string
  item: string
  status: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const positionItems: PositionItem[] = [
  {
    tag: 'Building',
    item: 'Library Bldg',
    status: 'Matched',
    icon: 'i-lucide-building',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    color: 'primary',
  },
  {
    tag: 'Floor',
    item: '2nd floor',
    status: 'Reported',
    icon: 'i-lucide-layers',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    color: 'info',
  },
  {
    tag: 'Accuracy',
    item: 'Within ~5 m',
    status: 'High',
    icon: 'i-lucide-crosshair',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    color: 'success',
  },
  {
    tag: 'Route',
    item: 'Nearest responder 90 s away',
    status: 'Live',
    icon: 'i-lucide-navigation',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    color: 'warning',
  },
]
</script>
