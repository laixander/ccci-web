<template>
  <MockupBrowserFrame
    url="irs.ccci.com.ph/dispatch"
    title="Dispatch queue"
    icon="i-lucide-radio"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Dispatch queue</span>
          <p class="text-[10px] text-muted mt-0.5">Just now · Real-time Routing Matrix</p>
        </div>
        <UBadge
          label="Live Stream"
          color="error"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider uppercase"
        />
      </div>

      <!-- Quick KPI Strip -->
      <div class="grid grid-cols-3 gap-2">
        <UCard
          variant="outline"
          :ui="{ body: 'p-2.5 flex flex-col items-center justify-center gap-0.5' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] font-mono text-muted uppercase">Open</span>
          <span class="text-sm font-bold font-mono text-error">3 <span class="text-[9px] font-normal text-muted">(1 urgent)</span></span>
        </UCard>
        <UCard
          variant="outline"
          :ui="{ body: 'p-2.5 flex flex-col items-center justify-center gap-0.5' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] font-mono text-muted uppercase">Avg. Response</span>
          <span class="text-sm font-bold font-mono text-highlighted">1m 40s</span>
        </UCard>
        <UCard
          variant="outline"
          :ui="{ body: 'p-2.5 flex flex-col items-center justify-center gap-0.5' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] font-mono text-muted uppercase">Responders</span>
          <span class="text-sm font-bold font-mono text-success">12 On Duty</span>
        </UCard>
      </div>

      <!-- Incoming queue header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Incoming</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Queue items -->
      <div v-if="dispatchQueue?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in dispatchQueue"
          :key="item.item"
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
          <span class="size-1.5 rounded-full bg-success animate-pulse" />
          Auto-assigned to nearest team within 300m
        </span>
        <span>Low Latency</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'dispatch-active',
    title: 'Dispatch Engine',
    subtitle: '12 Responders Online',
    icon: 'i-lucide-radio',
    color: 'success',
    pulse: true,
  },
  {
    id: 'auto-ack',
    title: 'Instant Broadcast',
    subtitle: 'Team B Acknowledged',
    icon: 'i-lucide-check-circle',
    color: 'primary',
    badge: { label: 'ACCEPTED', color: 'primary' },
  },
  {
    id: 'resp-rate',
    title: 'Avg Response',
    subtitle: '1m 40s Campus-wide',
    icon: 'i-lucide-timer',
    color: 'warning',
    badge: { label: 'NORMAL', color: 'warning' },
  },
]

// ─── Data Interface ───────────────────────────────────────────────────────────
interface DispatchItem {
  tag: string
  item: string
  status: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const dispatchQueue: DispatchItem[] = [
  {
    tag: 'Urgent',
    item: 'Medical — Library Bldg',
    status: 'Sent',
    icon: 'i-lucide-alert-circle',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    color: 'error',
  },
  {
    tag: 'Assigned',
    item: 'Security Team B',
    status: 'Accepted',
    icon: 'i-lucide-user-check',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    color: 'success',
  },
  {
    tag: 'Notified',
    item: 'Campus clinic',
    status: 'Sent',
    icon: 'i-lucide-heart-pulse',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    color: 'info',
  },
  {
    tag: 'Update',
    item: 'Student notified',
    status: 'Now',
    icon: 'i-lucide-bell',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    color: 'primary',
  },
]
</script>
