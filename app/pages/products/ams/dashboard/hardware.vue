<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const items = ref([
  { model: 'MacBook Pro 16" M2', type: 'Laptop', count: 45, deployed: 40, stock: 5, warranty: 'Active' },
  { model: 'Dell XPS 15', type: 'Laptop', count: 30, deployed: 30, stock: 0, warranty: 'Active' },
  { model: 'Dell UltraSharp 27"', type: 'Monitor', count: 120, deployed: 110, stock: 10, warranty: 'Expired' },
  { model: 'iPad Pro 11"', type: 'Tablet', count: 15, deployed: 12, stock: 3, warranty: 'Active' },
  { model: 'Cisco Switch 48-port', type: 'Networking', count: 8, deployed: 8, stock: 0, warranty: 'Active' },
])
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Hardware Inventory</h1>
        <p class="text-muted text-sm mt-1">Detailed tracking of IT hardware.</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add Hardware" size="sm" />
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="items" class="w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }" />
    </UCard>
  </div>
</template>
