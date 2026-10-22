<template>
  <MockupBrowserFrame
    url="ams.ccci.com.ph/reports"
    title="Reports & Analytics"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Section Header -->
      <!-- <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Quarterly Asset Reports</h3>
          <p class="text-[11px] text-muted">Depreciation schedules, utilization, and audit logs</p>
        </div>
        <UButton
          label="Export All"
          icon="i-lucide-download"
          color="neutral"
          variant="outline"
          size="xs"
          class="font-mono"
        />
      </div> -->

      <!-- Stat Cards -->
      <div class="grid grid-cols-2 gap-4">
        <UCard
          v-for="stat in stats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'sm:p-4 flex flex-col gap-1' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] text-muted uppercase tracking-widest font-bold">{{ stat.label }}</span>
          <span class="text-[20px] font-black text-highlighted leading-none tracking-tight">{{ stat.value }}</span>
          <!-- <span class="text-[9px] text-muted">{{ stat.note }}</span> -->
        </UCard>
      </div>

      <!-- Available Reports List -->
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Available Reports</span>
          <UButton
            label="View all"
            color="primary"
            variant="ghost"
            size="xs"
            trailing-icon="i-lucide-chevron-right"
          />
        </div>
        <div
          v-if="reports?.length"
          class="flex flex-col gap-4"
        >
          <UCard
            v-for="rep in reports"
            :key="rep.report"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UBadge
                :label="rep.tag"
                :color="rep.color"
                variant="subtle"
                size="xs"
                class="uppercase tracking-widest font-bold px-2"
              />
              <span class="font-medium text-[12.5px] text-highlighted">{{ rep.report }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[11px] font-mono text-muted">{{ rep.frequency }}</span>
              <UIcon
                name="i-lucide-file-text"
                class="size-3.5 text-dimmed"
              />
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

interface StatCard {
  label: string
  value: string
  note: string
}

interface ReportItem {
  tag: string
  report: string
  frequency: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'depreciation-engine',
    title: 'Depreciation Engine',
    subtitle: 'Automated Book Value',
    icon: 'i-lucide-trending-down',
    color: 'primary',
    pulse: true
  },
  {
    id: 'utilization-rate',
    title: '78% Utilization',
    subtitle: 'Optimized Fleet & IT',
    icon: 'i-lucide-pie-chart',
    color: 'success',
    badge: { label: 'OPTIMAL', color: 'success' }
  },
  {
    id: 'audit-export',
    title: 'Executive Audit',
    subtitle: 'One-Click Compliance',
    icon: 'i-lucide-file-spreadsheet',
    color: 'info',
    badge: { label: 'PDF / CSV', color: 'info' }
  }
]

const stats: StatCard[] = [
  { label: 'Total Value', value: '₱84M', note: 'Current book value' },
  { label: 'Utilization', value: '78%', note: 'Reserved & deployed assets' }
]

const reports: ReportItem[] = [
  { tag: 'Finance', report: 'Depreciation schedule', frequency: 'Monthly', color: 'primary' },
  { tag: 'Ops', report: 'Asset utilization', frequency: 'Weekly', color: 'info' },
  { tag: 'Audit', report: 'Assignment history', frequency: 'On demand', color: 'neutral' }
]
</script>
