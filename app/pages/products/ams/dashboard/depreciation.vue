<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const items = ref([
  { asset: 'Toyota Hiace (AST-1005)', method: 'Straight Line', purchaseValue: '₱1,800,000', life: '5 Years', currentValue: '₱720,000', accumulated: '₱1,080,000' },
  { asset: 'MacBook Pro 16" (AST-1001)', method: 'Double Declining', purchaseValue: '₱125,000', life: '3 Years', currentValue: '₱45,000', accumulated: '₱80,000' },
  { asset: 'Server Rack A (AST-2001)', method: 'Straight Line', purchaseValue: '₱500,000', life: '7 Years', currentValue: '₱350,000', accumulated: '₱150,000' },
  { asset: 'Office Chairs Batch 1 (AST-501)', method: 'Straight Line', purchaseValue: '₱150,000', life: '10 Years', currentValue: '₱120,000', accumulated: '₱30,000' },
])
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Depreciation Reports</h1>
        <p class="text-muted text-sm mt-1">Calculate and track asset depreciation.</p>
      </div>
      <UButton icon="i-lucide-download" label="Export Schedule" size="sm" />
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard :ui="{ root: 'shadow-sm' }">
        <p class="text-sm font-medium text-muted">Total Initial Value</p>
        <p class="text-3xl font-bold text-highlighted mt-2">₱14.5M</p>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm' }">
        <p class="text-sm font-medium text-muted">Accumulated Depreciation</p>
        <p class="text-3xl font-bold text-warning mt-2">₱6.2M</p>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm' }">
        <p class="text-sm font-medium text-muted">Current Book Value</p>
        <p class="text-3xl font-bold text-success mt-2">₱8.3M</p>
      </UCard>
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="items" class="w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }" />
    </UCard>
  </div>
</template>
