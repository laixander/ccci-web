<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'KPI Tracker'
})

const kpis = [
  { id: 1, name: 'Revenue Growth', module: 'Finance', target: '15%', actual: '12%', status: 'On Track', trend: 'up' },
  { id: 2, name: 'Employee Turnover Rate', module: 'HRIS', target: '< 5%', actual: '4.2%', status: 'On Track', trend: 'down' },
  { id: 3, name: 'Student Enrollment', module: 'CMS', target: '9,000', actual: '8,420', status: 'At Risk', trend: 'down' },
  { id: 4, name: 'Training Completion Rate', module: 'LMS', target: '90%', actual: '87%', status: 'At Risk', trend: 'up' },
  { id: 5, name: 'ICT Compliance Score', module: 'AISSP', target: '95%', actual: '94%', status: 'On Track', trend: 'up' },
  { id: 6, name: 'Asset Utilization Rate', module: 'AMS', target: '85%', actual: '91%', status: 'Exceeded', trend: 'up' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Exceeded': return 'success'
    case 'On Track': return 'primary'
    case 'At Risk': return 'warning'
    case 'Off Track': return 'error'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">KPI Tracker</h1>
        <p class="text-muted mt-1">Monitor strategic Key Performance Indicators across all modules.</p>
      </div>
      <UButton icon="i-lucide-plus" color="primary">Add KPI</UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">KPIs Exceeded</p>
        <p class="text-3xl font-bold text-success">1</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">KPIs On Track</p>
        <p class="text-3xl font-bold text-primary">3</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">KPIs At Risk</p>
        <p class="text-3xl font-bold text-warning">2</p>
      </UCard>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search KPIs..." class="w-full sm:max-w-sm" />
          <USelect :items="['All Modules', 'Finance', 'HRIS', 'CMS', 'LMS', 'AISSP', 'AMS']" class="w-full sm:w-40" />
        </div>
      </template>
      <div class="divide-y divide-default">
        <div v-for="kpi in kpis" :key="kpi.id" class="flex items-center gap-4 px-4 py-4 hover:bg-muted/30 transition-colors">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-highlighted text-sm">{{ kpi.name }}</p>
            <p class="text-xs text-muted mt-0.5">{{ kpi.module }}</p>
          </div>
          <div class="text-center hidden sm:block">
            <p class="text-xs text-muted">Target</p>
            <p class="text-sm font-semibold text-highlighted">{{ kpi.target }}</p>
          </div>
          <div class="text-center hidden sm:block">
            <p class="text-xs text-muted">Actual</p>
            <p class="text-sm font-semibold text-highlighted">{{ kpi.actual }}</p>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              :name="kpi.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
              :class="kpi.trend === 'up' ? 'text-success' : 'text-error'"
              class="size-4"
            />
            <UBadge :color="getStatusColor(kpi.status)" variant="subtle" size="sm">{{ kpi.status }}</UBadge>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
