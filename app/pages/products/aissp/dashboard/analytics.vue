<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Analytics'
})

const budgetDistribution = [
  { name: 'Cloud Infrastructure', value: 45, percentage: '45%' },
  { name: 'Software Licenses', value: 25, percentage: '25%' },
  { name: 'Hardware & Devices', value: 15, percentage: '15%' },
  { name: 'Cybersecurity', value: 10, percentage: '10%' },
  { name: 'Consulting & Services', value: 5, percentage: '5%' },
]

const lifecycleStages = [
  { stage: 'Proposed', count: 12, percentage: 20 },
  { stage: 'Under Development', count: 8, percentage: 15 },
  { stage: 'Testing / QA', count: 5, percentage: 10 },
  { stage: 'Deployed', count: 32, percentage: 50 },
  { stage: 'Retiring', count: 3, percentage: 5 },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">ICT Analytics</h1>
        <p class="text-muted mt-1">Visualize budget distribution and system lifecycle metrics.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-download" color="neutral" variant="outline">Export Report</UButton>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Budget Allocation by Category</h3>
        </template>
        <div class="space-y-4">
          <div v-for="item in budgetDistribution" :key="item.name" class="space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-highlighted">{{ item.name }}</span>
              <span class="text-muted">{{ item.percentage }}</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div class="bg-primary h-2 rounded-full" :style="{ width: item.percentage }" />
            </div>
          </div>
        </div>
      </UCard>
      
      <UCard>
        <template #header>
          <h3 class="font-semibold text-highlighted">Systems by Lifecycle Stage</h3>
        </template>
        <div class="space-y-4">
          <div v-for="stage in lifecycleStages" :key="stage.stage" class="flex items-center gap-4">
            <span class="w-32 text-sm font-medium text-muted shrink-0">{{ stage.stage }}</span>
            <div class="flex-1 space-y-1">
              <div class="flex items-center gap-2">
                <div class="bg-primary/80 h-2 rounded-sm" :style="{ width: stage.percentage + '%' }" />
                <span class="text-xs font-mono text-dimmed">{{ stage.count }} Systems</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
