<template>
  <MockupBrowserFrame
    url="irs.ccci.com.ph/dashboard"
    title="Response dashboard"
    icon="i-lucide-layout-dashboard"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Response dashboard</span>
          <p class="text-[10px] text-muted mt-0.5">Campus-wide · Live Emergency Oversight</p>
        </div>
        <UBadge
          label="Live Monitor"
          color="success"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider uppercase"
        />
      </div>

      <!-- Stat tiles (2) -->
      <div class="grid grid-cols-2 gap-3">
        <UCard
          v-for="stat in statTiles"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-3 sm:p-3.5 flex flex-col items-center justify-center gap-1' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[10px] font-mono text-muted uppercase">{{ stat.label }}</span>
          <span :class="['text-2xl font-black font-mono leading-none tracking-tight', stat.valueColor]">{{ stat.value }}</span>
          <span class="text-[9px] text-muted">{{ stat.subLabel }}</span>
        </UCard>
      </div>

      <!-- Live reports list header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Live reports</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Live reports items -->
      <div v-if="liveReports?.length" class="flex flex-col gap-2">
        <UCard
          v-for="report in liveReports"
          :key="report.report"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center shrink-0', report.iconBg]">
              <UIcon :name="report.icon" :class="['size-3.5', report.iconColor]" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ report.report }}</p>
              <p class="text-[10px] text-muted font-mono">{{ report.time }}</p>
            </div>
          </div>
          <UBadge
            :label="report.status"
            :color="report.color"
            variant="subtle"
            size="xs"
            class="font-bold tracking-wider uppercase"
          />
        </UCard>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-activity" class="size-3.5 text-success" />
          Synchronized with 3 Campus Stations
        </span>
        <span>Auto-refresh 5s</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'command-center',
    title: 'Command Center',
    subtitle: 'Campus-wide Real Time',
    icon: 'i-lucide-activity',
    color: 'success',
    pulse: true,
  },
  {
    id: 'open-incidents',
    title: 'Active Reports',
    subtitle: '3 Open · 1 Urgent',
    icon: 'i-lucide-alert-triangle',
    color: 'error',
    badge: { label: 'URGENT', color: 'error' },
  },
  {
    id: 'patrol-online',
    title: 'Duty Roster',
    subtitle: '12 Officers Active',
    icon: 'i-lucide-shield-check',
    color: 'primary',
    badge: { label: 'ACTIVE', color: 'primary' },
  },
]

// ─── Data Interface ───────────────────────────────────────────────────────────
interface StatTile {
  label: string
  value: string
  subLabel: string
  valueColor: string
}

interface LiveReport {
  status: string
  report: string
  time: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const statTiles: StatTile[] = [
  {
    label: 'Open',
    value: '3',
    subLabel: '1 urgent',
    valueColor: 'text-error',
  },
  {
    label: 'Resolved today',
    value: '4',
    subLabel: 'On track',
    valueColor: 'text-success',
  },
]

const liveReports: LiveReport[] = [
  {
    status: 'Urgent',
    report: 'Medical emergency — Library Bldg',
    time: 'Now',
    icon: 'i-lucide-heart-pulse',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    color: 'error',
  },
  {
    status: 'In progress',
    report: 'Suspicious person — Lot C',
    time: '6m ago',
    icon: 'i-lucide-user-x',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    color: 'warning',
  },
  {
    status: 'Resolved',
    report: 'Fire alarm — Dorm 2',
    time: '28m ago',
    icon: 'i-lucide-flame',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    color: 'success',
  },
]
</script>
