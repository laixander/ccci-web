<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const tasks = ref([
  { id: 'MT-001', asset: 'Toyota Hiace (AST-1005)', type: 'Preventive', scheduledDate: '2026-08-30', status: 'Scheduled', cost: '₱15,000', vendor: 'Toyota Alabang' },
  { id: 'MT-002', asset: 'Server Rack A (AST-2001)', type: 'Repair', scheduledDate: '2026-08-25', status: 'In Progress', cost: '₱45,000', vendor: 'Cisco Support' },
  { id: 'MT-003', asset: 'Aircon Unit 3 (AST-3012)', type: 'Routine', scheduledDate: '2026-08-15', status: 'Completed', cost: '₱3,500', vendor: 'CoolBreeze HVAC' },
  { id: 'MT-004', asset: 'Generator (AST-4001)', type: 'Inspection', scheduledDate: '2026-09-10', status: 'Scheduled', cost: '₱8,000', vendor: 'PowerGen Inc' },
])

const columns = [
  { accessorKey: 'id', header: 'Task ID' },
  { accessorKey: 'asset', header: 'Asset' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'scheduledDate', header: 'Date' },
  { accessorKey: 'vendor', header: 'Vendor' },
  { accessorKey: 'cost', header: 'Est. Cost' },
  { accessorKey: 'status', header: 'Status' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Maintenance Log</h1>
        <p class="text-muted text-sm mt-1">Track scheduled and completed maintenance.</p>
      </div>
      <UButton icon="i-lucide-plus" label="Log Maintenance" size="sm" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard :ui="{ root: 'shadow-sm' }">
        <p class="text-sm font-medium text-muted">Upcoming Tasks</p>
        <p class="text-3xl font-bold text-highlighted mt-2">12</p>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm' }">
        <p class="text-sm font-medium text-muted">In Progress</p>
        <p class="text-3xl font-bold text-warning mt-2">3</p>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm' }">
        <p class="text-sm font-medium text-muted">MTD Expense</p>
        <p class="text-3xl font-bold text-error mt-2">₱142,500</p>
      </UCard>
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="tasks" :columns="columns" class="w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }">
        <template #status-cell="{ row }">
          <span v-if="row.original.status === 'Completed'" class="text-success text-xs font-medium bg-success/10 px-2 py-1 rounded-full">{{ row.original.status }}</span>
          <span v-else-if="row.original.status === 'In Progress'" class="text-warning text-xs font-medium bg-warning/10 px-2 py-1 rounded-full">{{ row.original.status }}</span>
          <span v-else class="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">{{ row.original.status }}</span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
