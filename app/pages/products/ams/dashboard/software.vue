<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const software = ref([
  { name: 'Adobe Creative Cloud', type: 'Subscription', licenses: 25, assigned: 25, cost: '₱45,000/yr', renewal: '2027-01-15' },
  { name: 'Microsoft 365 E3', type: 'Subscription', licenses: 150, assigned: 142, cost: '₱18,000/yr', renewal: '2026-11-01' },
  { name: 'Figma Organization', type: 'Subscription', licenses: 15, assigned: 10, cost: '₱25,000/yr', renewal: '2026-09-30' },
  { name: 'JetBrains All Products', type: 'Subscription', licenses: 20, assigned: 20, cost: '₱35,000/yr', renewal: '2026-12-15' },
  { name: 'AWS Reserved Instances', type: 'Cloud', licenses: 'N/A', assigned: 'N/A', cost: '₱500,000/yr', renewal: '2027-06-01' },
])
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Software Licenses</h1>
        <p class="text-muted text-sm mt-1">Manage subscriptions and software licenses.</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add License" size="sm" />
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="software" class="scrollbar w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }" />
    </UCard>
  </div>
</template>
