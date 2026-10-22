<template>
  <MockupBrowserFrame
    url="irs.ccci.com.ph/app"
    title="IRS Mobile"
    icon="i-lucide-smartphone"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">IRS Mobile</span>
          <p class="text-[10px] text-muted mt-0.5">Student view · Campus Safety Gateway</p>
        </div>
        <UBadge
          label="Online"
          color="success"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider uppercase"
        />
      </div>

      <!-- Quick Action Alert Banner -->
      <UCard
        variant="soft"
        :ui="{ body: 'p-3.5 flex items-center justify-between gap-3' }"
        class="bg-gradient-to-r from-error/15 via-error/10 to-transparent border border-error/25 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-lg bg-error/20 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-alert-triangle" class="size-5 text-error" />
          </div>
          <div>
            <p class="text-[12px] font-bold text-highlighted">Need Immediate Assistance?</p>
            <p class="text-[10px] text-muted">Tap to broadcast instant alert with GPS to campus security</p>
          </div>
        </div>
        <UButton
          label="SOS Alert"
          color="error"
          size="xs"
          class="font-bold shrink-0"
        />
      </UCard>

      <!-- Quick actions header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Quick actions</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Action rows -->
      <div v-if="quickActions?.length" class="flex flex-col gap-2">
        <UCard
          v-for="action in quickActions"
          :key="action.tag"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center shrink-0', action.iconBg]">
              <UIcon :name="action.icon" :class="['size-3.5', action.iconColor]" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ action.action }}</p>
              <p class="text-[10px] text-muted uppercase tracking-wider font-mono">{{ action.tag }}</p>
            </div>
          </div>
          <UBadge
            :label="action.status"
            :color="action.color"
            variant="subtle"
            size="xs"
            class="font-bold tracking-wider"
          />
        </UCard>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <span class="size-1.5 rounded-full bg-success" />
          No mobile load or text plan required
        </span>
        <span>Android & iOS</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'app-ready',
    title: 'IRS Mobile',
    subtitle: 'v2.4 · Android & iOS',
    icon: 'i-lucide-smartphone',
    color: 'primary',
    badge: { label: 'ONLINE', color: 'primary' },
  },
  {
    id: 'zero-data',
    title: 'Zero Data Cost',
    subtitle: 'Campus WiFi & Mesh Direct',
    icon: 'i-lucide-wifi',
    color: 'success',
    pulse: true,
  },
  {
    id: 'sos-ready',
    title: 'One-Tap SOS',
    subtitle: 'Direct to Campus Security',
    icon: 'i-lucide-bell-ring',
    color: 'warning',
    badge: { label: 'ARMED', color: 'warning' },
  },
]

// ─── Data Interface ───────────────────────────────────────────────────────────
interface QuickActionItem {
  tag: string
  action: string
  status: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const quickActions: QuickActionItem[] = [
  {
    tag: 'Report',
    action: 'Report an emergency',
    status: '1 tap',
    icon: 'i-lucide-triangle-alert',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    color: 'error',
  },
  {
    tag: 'Camera',
    action: 'Attach photo or video',
    status: 'Ready',
    icon: 'i-lucide-camera',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    color: 'info',
  },
  {
    tag: 'Location',
    action: 'Share my location',
    status: 'On',
    icon: 'i-lucide-map-pin',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    color: 'success',
  },
  {
    tag: 'Status',
    action: 'Track my report',
    status: 'Live',
    icon: 'i-lucide-activity',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    color: 'primary',
  },
]
</script>
