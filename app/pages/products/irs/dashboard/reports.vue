<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const reports = [
  { id: 'TR-001', title: 'Monthly Incident Summary — August 2026', period: 'August 2026', generated: 'Aug 28, 2026', incidents: 53, resolved: 48, criticals: 5, change: '↓ 28%', changeUp: false },
  { id: 'TR-002', title: 'Monthly Incident Summary — July 2026', period: 'July 2026', generated: 'Jul 31, 2026', incidents: 61, resolved: 55, criticals: 8, change: '↑ 12%', changeUp: true },
  { id: 'TR-003', title: 'Q2 2026 Safety Trend Report', period: 'Apr–Jun 2026', generated: 'Jul 5, 2026', incidents: 178, resolved: 165, criticals: 18, change: '↓ 8%', changeUp: false },
  { id: 'TR-004', title: 'Q1 2026 Safety Trend Report', period: 'Jan–Mar 2026', generated: 'Apr 3, 2026', incidents: 192, resolved: 175, criticals: 22, change: 'Baseline', changeUp: false },
]

const trends = [
  { label: 'Incidents down this month', icon: 'i-lucide-trending-down', color: 'text-success', bg: 'bg-success/10', text: 'Total reported incidents fell by 28% compared to July. Near-misses also declined by 20%.' },
  { label: 'Chemical hazard spike in R&D', icon: 'i-lucide-flask-conical', color: 'text-error', bg: 'bg-error/10', text: 'R&D Building accounts for 3 of 5 critical incidents this month. Review lab chemical handling protocols.' },
  { label: 'CAPA completion improving', icon: 'i-lucide-clipboard-check', color: 'text-primary', bg: 'bg-primary/10', text: 'CAPA completion rate reached 82%, up from 75% in July. 2 overdue actions remain from August batch.' },
  { label: 'Warehouse A remains highest-risk zone', icon: 'i-lucide-map-pin', color: 'text-warning', bg: 'bg-warning/10', text: 'Warehouse A contributed 42% of all incidents. Forklift pedestrian conflict is the top hazard type.' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Trend Reports</h1>
        <p class="text-muted text-sm mt-1">Monthly and quarterly safety performance reports with trend analysis</p>
      </div>
      <UButton label="Generate Report" icon="i-lucide-file-plus" color="primary" size="sm" />
    </div>

    <!-- Key insights -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-lightbulb" class="size-5 text-warning" />
          <h2 class="font-semibold text-highlighted">Key Safety Insights — August 2026</h2>
        </div>
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="trend in trends" :key="trend.label" :class="['rounded-xl p-4 flex gap-3', trend.bg]">
          <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', trend.bg]">
            <UIcon :name="trend.icon" :class="['size-4', trend.color]" />
          </div>
          <div>
            <p :class="['text-sm font-semibold mb-1', trend.color]">{{ trend.label }}</p>
            <p class="text-xs text-muted leading-relaxed">{{ trend.text }}</p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Reports table -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">Report Archive</h2>
      </template>
      <div class="divide-y divide-default">
        <div v-for="report in reports" :key="report.id" class="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
          <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-file-bar-chart" class="size-5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-highlighted">{{ report.title }}</p>
            <div class="flex items-center gap-4 mt-1 text-xs text-muted">
              <span>{{ report.period }}</span>
              <span>{{ report.incidents }} incidents</span>
              <span>{{ report.resolved }} resolved</span>
              <span :class="['font-semibold', report.changeUp ? 'text-error' : 'text-success']">{{ report.change }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton icon="i-lucide-eye" label="View" size="xs" color="neutral" variant="outline" />
            <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
