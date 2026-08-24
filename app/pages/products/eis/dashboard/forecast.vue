<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Forecasting'
})

const revenueForecasts = [
  { quarter: 'Q1 2026', actual: 198, projected: 195 },
  { quarter: 'Q2 2026', actual: 210, projected: 205 },
  { quarter: 'Q3 2026', actual: 224, projected: 215 },
  { quarter: 'Q4 2026 (Proj)', actual: null, projected: 230 },
  { quarter: 'Q1 2027 (Proj)', actual: null, projected: 245 },
]

const headcountForecasts = [
  { period: 'Current', value: 1250, percentage: 100 },
  { period: 'Q4 2026', value: 1290, percentage: 103 },
  { period: 'Q1 2027', value: 1340, percentage: 107 },
  { period: 'Q2 2027', value: 1400, percentage: 112 },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Forecasting</h1>
        <p class="text-muted mt-1">AI-powered predictive analytics for strategic decision-making.</p>
      </div>
      <UButton icon="i-lucide-download" color="neutral" variant="outline">Export Forecast</UButton>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Revenue Forecast (₱M)</h3>
        </template>
        <div class="space-y-4">
          <div v-for="row in revenueForecasts" :key="row.quarter" class="space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-highlighted">{{ row.quarter }}</span>
              <span class="text-muted">
                <span v-if="row.actual !== null">Actual: ₱{{ row.actual }}M &nbsp;|&nbsp;</span>
                Proj: ₱{{ row.projected }}M
              </span>
            </div>
            <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div v-if="row.actual !== null" class="bg-success h-2 rounded-full" :style="{ width: ((row.actual / 250) * 100) + '%' }" />
              <div v-else class="bg-primary/40 h-2 rounded-full" :style="{ width: ((row.projected / 250) * 100) + '%' }" />
            </div>
          </div>
          <p class="text-xs text-muted pt-1 flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-success inline-block" /> Actual
            <span class="size-2 rounded-full bg-primary/40 inline-block ml-2" /> Projected
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Headcount Forecast</h3>
        </template>
        <div class="space-y-4">
          <div v-for="row in headcountForecasts" :key="row.period" class="flex items-center gap-4">
            <span class="w-28 text-sm font-medium text-muted shrink-0">{{ row.period }}</span>
            <div class="flex-1 space-y-1">
              <div class="flex items-center gap-2">
                <div class="bg-primary/80 h-2 rounded-sm" :style="{ width: row.percentage + '%' }" />
                <span class="text-xs font-mono text-dimmed">{{ row.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
