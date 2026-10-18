<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/reports" title="Reports & Analytics">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Section Header -->
      <div class="flex items-center justify-between">
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
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-2 gap-3">
        <UCard
          v-for="stat in stats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-3.5 sm:p-3.5 flex flex-col gap-1' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] text-muted uppercase tracking-widest font-bold">{{ stat.label }}</span>
          <span class="text-[20px] font-black text-highlighted leading-none tracking-tight">{{ stat.value }}</span>
          <span class="text-[9px] text-muted">{{ stat.note }}</span>
        </UCard>
      </div>

      <!-- Available Reports List -->
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Available Reports</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">View all →</span>
        </div>
        <div v-if="reports?.length" class="flex flex-col gap-2">
          <UCard
            v-for="rep in reports"
            :key="rep.report"
            variant="outline"
            :ui="{ body: 'px-3.5 py-3 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UBadge
                :label="rep.tag"
                :color="rep.color"
                variant="subtle"
                size="xs"
                class="font-mono font-bold tracking-wider"
              />
              <span class="font-medium text-[12px] text-highlighted">{{ rep.report }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[11px] font-mono text-muted">{{ rep.frequency }}</span>
              <UIcon name="i-lucide-file-text" class="size-3.5 text-dimmed" />
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
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

const stats: StatCard[] = [
  { label: 'Total Value', value: '₱84M', note: 'Current book value' },
  { label: 'Utilization', value: '78%', note: 'Reserved & deployed assets' },
]

const reports: ReportItem[] = [
  { tag: 'Finance', report: 'Depreciation schedule', frequency: 'Monthly', color: 'primary' },
  { tag: 'Ops', report: 'Asset utilization', frequency: 'Weekly', color: 'info' },
  { tag: 'Audit', report: 'Assignment history', frequency: 'On demand', color: 'neutral' },
]
</script>
