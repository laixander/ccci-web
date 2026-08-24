<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Analytics'
})

const regions = [
  { name: 'Asia Pacific', value: 65, percentage: '45%' },
  { name: 'North America', value: 32, percentage: '22%' },
  { name: 'Europe', value: 28, percentage: '19%' },
  { name: 'Latin America', value: 12, percentage: '9%' },
  { name: 'Middle East & Africa', value: 5, percentage: '5%' },
]

const mobilityTrends = [
  { term: 'Fall 2024', in: 30, out: 25 },
  { term: 'Spring 2025', in: 35, out: 28 },
  { term: 'Fall 2025', in: 40, out: 32 },
  { term: 'Spring 2026', in: 42, out: 35 },
  { term: 'Fall 2026 (Proj)', in: 45, out: 39 },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Global Analytics</h1>
        <p class="text-muted mt-1">Visualize your international footprint and engagement metrics.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-download" color="neutral" variant="outline">Export Report</UButton>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Partnerships by Region</h3>
        </template>
        <div class="space-y-4">
          <div v-for="region in regions" :key="region.name" class="space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-highlighted">{{ region.name }}</span>
              <span class="text-muted">{{ region.value }} partners ({{ region.percentage }})</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div class="bg-primary h-2 rounded-full" :style="{ width: region.percentage }" />
            </div>
          </div>
        </div>
      </UCard>
      
      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Mobility Trends (YoY)</h3>
        </template>
        <div class="space-y-4">
          <div v-for="trend in mobilityTrends" :key="trend.term" class="flex items-center gap-4">
            <span class="w-24 text-sm font-medium text-muted shrink-0">{{ trend.term }}</span>
            <div class="flex-1 space-y-1">
              <div class="flex items-center gap-2">
                <div class="bg-success/80 h-2 rounded-sm" :style="{ width: trend.in + '%' }" />
                <span class="text-xs font-mono text-dimmed">{{ trend.in }} In</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="bg-primary/80 h-2 rounded-sm" :style="{ width: trend.out + '%' }" />
                <span class="text-xs font-mono text-dimmed">{{ trend.out }} Out</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
