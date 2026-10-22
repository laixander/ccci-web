<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/etl"
    title="Pipelines"
    icon="i-lucide-workflow"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Pipelines</span>
          <p class="text-[10px] text-muted mt-0.5">3 jobs active · GUI-driven ETL, dynamic workflows & automated triggers</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Run All"
            icon="i-lucide-play"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="New Pipeline"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Pipeline Metrics -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in pipelineStats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-2.5 sm:p-3 flex flex-col gap-0.5' }"
          class="rounded-xl shadow-2xs"
        >
          <span class="text-[9.5px] font-mono uppercase tracking-wider text-muted">{{ stat.label }}</span>
          <span class="text-base font-bold font-mono text-highlighted tracking-tight leading-none">{{ stat.value }}</span>
          <span class="text-[9px] font-medium" :class="stat.subClass">{{ stat.sub }}</span>
        </UCard>
      </div>

      <!-- Jobs List Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[12px] text-highlighted">Jobs</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Jobs Rows -->
      <div v-if="jobs?.length" class="flex flex-col gap-2">
        <UCard
          v-for="job in jobs"
          :key="job.pipeline"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', job.iconBg]">
              <UIcon :name="job.icon" :class="['size-4', job.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ job.pipeline }}</p>
                <span class="text-[10px] text-muted font-mono">{{ job.time }}</span>
              </div>
              <p class="text-[10.5px] text-muted truncate mt-0.5">{{ job.detail }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <UBadge
              :label="job.status"
              :color="job.statusColor"
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
          Automated error handling with exponential backoff & team alerts
        </span>
        <span class="hidden sm:inline">Engine: EIS ETL v3.2</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'etl-dag',
    title: 'Visual Workflow Engine',
    subtitle: 'Zero Shell Scripts',
    icon: 'i-lucide-workflow',
    color: 'success',
    pulse: true,
  },
  {
    id: 'pipeline-health',
    title: 'Automated Pipeline Runs',
    subtitle: 'Daily 06:00 Sync Window',
    icon: 'i-lucide-clock',
    color: 'primary',
    badge: { label: 'SCHEDULED', color: 'primary' },
  },
  {
    id: 'auto-retry',
    title: 'Smart Self-Healing',
    subtitle: 'Exponential Backoff Active',
    icon: 'i-lucide-refresh-cw',
    color: 'warning',
  },
]

// ─── Pipeline Stats ───────────────────────────────────────────────────────────
interface StatItem {
  label: string
  value: string
  sub: string
  subClass: string
}

const pipelineStats: StatItem[] = [
  { label: 'Active Jobs', value: '3 Jobs', sub: '1 draft pending', subClass: 'text-muted' },
  { label: 'Success Rate', value: '98.4%', sub: 'Last 30 days', subClass: 'text-success' },
  { label: 'Avg Runtime', value: '42 sec', sub: 'Optimized batch', subClass: 'text-primary' },
  { label: 'Scheduler', value: 'Active', sub: 'Next: 18:00', subClass: 'text-success' },
]

// ─── Jobs Data ────────────────────────────────────────────────────────────────
interface JobItem {
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  pipeline: string
  time: string
  detail: string
  icon: string
  iconBg: string
  iconColor: string
}

const jobs: JobItem[] = [
  {
    status: 'Ran',
    statusColor: 'success',
    pipeline: 'Registrar → Warehouse',
    time: '06:00',
    detail: 'Completed in 34s · 18,240 student & enrollment records transformed',
    icon: 'i-lucide-database',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    status: 'Ran',
    statusColor: 'success',
    pipeline: 'Finance → Warehouse',
    time: '06:15',
    detail: 'Completed in 52s · 4,810 tuition, voucher & ledger items aggregated',
    icon: 'i-lucide-credit-card',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    status: 'Delayed',
    statusColor: 'warning',
    pipeline: 'HRIS sync',
    time: '06:30',
    detail: 'Ingestion timeout on REST endpoint · Auto-retry in 12m',
    icon: 'i-lucide-alert-triangle',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  {
    status: 'Draft',
    statusColor: 'neutral',
    pipeline: 'Scholarship import',
    time: '—',
    detail: 'Staging configuration ready · Awaiting schema sign-off',
    icon: 'i-lucide-file-input',
    iconBg: 'bg-muted',
    iconColor: 'text-muted',
  },
]
</script>
