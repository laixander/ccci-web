<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const reports = [
  { id: 'RPT-001', title: 'DOLE Q2 2026 OSH Annual Report', type: 'DOLE Compliance', period: 'Apr–Jun 2026', generated: 'Aug 28, 2026', status: 'ready', statusBadge: 'bg-success/10 text-success', icon: 'i-lucide-file-text' },
  { id: 'RPT-002', title: 'ISO 45001 Internal Audit Report', type: 'ISO 45001', period: 'H1 2026', generated: 'Aug 20, 2026', status: 'ready', statusBadge: 'bg-success/10 text-success', icon: 'i-lucide-shield-check' },
  { id: 'RPT-003', title: 'Monthly Incident Summary — Aug 2026', type: 'Monthly Summary', period: 'August 2026', generated: 'Aug 28, 2026', status: 'ready', statusBadge: 'bg-success/10 text-success', icon: 'i-lucide-bar-chart-2' },
  { id: 'RPT-004', title: 'CAPA Status Report — Q3 2026', type: 'CAPA Report', period: 'Jul–Sep 2026', generated: 'Generating...', status: 'generating', statusBadge: 'bg-info/10 text-info', icon: 'i-lucide-clipboard-check' },
  { id: 'RPT-005', title: 'DOLE Q3 2026 OSH Annual Report', type: 'DOLE Compliance', period: 'Jul–Sep 2026', generated: 'Due: Sep 30', status: 'scheduled', statusBadge: 'bg-warning/10 text-warning', icon: 'i-lucide-file-text' },
]

const complianceItems = [
  { label: 'DOLE OSH Standards (RA 11058)', pct: 94, color: 'bg-success' },
  { label: 'ISO 45001:2018 Requirements', pct: 87, color: 'bg-primary' },
  { label: 'CAPA Completion Rate', pct: 82, color: 'bg-info' },
  { label: 'Incident Reporting Timeliness', pct: 96, color: 'bg-success' },
  { label: 'Safety Training Compliance', pct: 78, color: 'bg-warning' },
]

const selectedReportType = ref('All')
const reportTypes = ['All', 'DOLE Compliance', 'ISO 45001', 'Monthly Summary', 'CAPA Report']

const filtered = computed(() =>
  selectedReportType.value === 'All' ? reports : reports.filter(r => r.type === selectedReportType.value)
)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">DOLE & ISO Reports</h1>
        <p class="text-muted text-sm mt-1">Compliance reports, regulatory submissions, and audit-ready documents</p>
      </div>
      <UButton label="Generate Report" icon="i-lucide-file-plus" color="primary" size="sm" />
    </div>

    <!-- Compliance meters -->
    <UCard>
      <template #header>
        <h2 class="font-semibold text-highlighted">Compliance Scorecard</h2>
      </template>
      <div class="space-y-4">
        <div v-for="item in complianceItems" :key="item.label">
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-sm text-muted">{{ item.label }}</span>
            <span :class="['text-sm font-bold', item.pct >= 90 ? 'text-success' : item.pct >= 75 ? 'text-warning' : 'text-error']">{{ item.pct }}%</span>
          </div>
          <div class="bg-muted rounded-full h-2">
            <div :class="['h-2 rounded-full transition-all', item.color]" :style="{ width: item.pct + '%' }" />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Report list -->
    <div class="flex items-center gap-3">
      <p class="text-sm text-muted">Filter by type:</p>
      <USelect v-model="selectedReportType" :items="reportTypes" class="w-48" size="sm" />
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div v-for="report in filtered" :key="report.id" class="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
          <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon :name="report.icon" class="size-5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-xs text-dimmed font-mono">{{ report.id }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-semibold bg-muted text-muted">{{ report.type }}</span>
              <span :class="['text-xs px-2 py-0.5 rounded-full font-semibold', report.statusBadge]">{{ report.status }}</span>
            </div>
            <p class="text-sm font-semibold text-highlighted">{{ report.title }}</p>
            <p class="text-xs text-muted">Period: {{ report.period }} · {{ report.generated }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UButton v-if="report.status === 'ready'" icon="i-lucide-download" label="Download" size="xs" color="neutral" variant="outline" />
            <UButton v-else-if="report.status === 'generating'" label="Generating..." size="xs" color="neutral" variant="ghost" :loading="true" />
            <UButton v-else label="Schedule" size="xs" color="primary" variant="outline" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
