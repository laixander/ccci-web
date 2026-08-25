<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const assignments = ref([
  { id: 'ASN-001', asset: 'MacBook Pro 16"', assetId: 'AST-1001', assignee: 'John Doe', department: 'Engineering', assignedDate: '2025-05-15', returnDate: '--', status: 'Active' },
  { id: 'ASN-002', asset: 'Dell XPS 15', assetId: 'AST-1002', assignee: 'Jane Smith', department: 'Design', assignedDate: '2025-06-05', returnDate: '--', status: 'Active' },
  { id: 'ASN-003', asset: 'iPhone 14 Pro', assetId: 'AST-1050', assignee: 'Mike Johnson', department: 'Sales', assignedDate: '2024-10-10', returnDate: '2025-10-10', status: 'Expiring Soon' },
  { id: 'ASN-004', asset: 'iPad Pro', assetId: 'AST-1065', assignee: 'Sarah Connor', department: 'Executive', assignedDate: '2023-01-15', returnDate: '2024-01-15', status: 'Overdue' },
])

const columns = [
  { accessorKey: 'asset', header: 'Asset' },
  { accessorKey: 'assignee', header: 'Assignee' },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'assignedDate', header: 'Assigned On' },
  { accessorKey: 'returnDate', header: 'Return By' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Assigned Assets</h1>
        <p class="text-muted text-sm mt-1">View assets currently assigned to personnel.</p>
      </div>
      <UButton icon="i-lucide-user-plus" label="Assign Asset" size="sm" />
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="assignments" :columns="columns" class="scrollbar w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }">
        <template #asset-cell="{ row }">
          <div>
            <p class="font-medium text-highlighted">{{ row.original.asset }}</p>
            <p class="text-xs text-muted font-mono">{{ row.original.assetId }}</p>
          </div>
        </template>
        <template #status-cell="{ row }">
          <span v-if="row.original.status === 'Active'" class="text-success text-xs font-medium bg-success/10 px-2 py-1 rounded-full">Active</span>
          <span v-else-if="row.original.status === 'Expiring Soon'" class="text-warning text-xs font-medium bg-warning/10 px-2 py-1 rounded-full">Expiring Soon</span>
          <span v-else class="text-error text-xs font-medium bg-error/10 px-2 py-1 rounded-full">Overdue</span>
        </template>
        <template #actions-cell>
          <div class="flex items-center justify-end gap-2">
            <UButton label="Revoke" color="error" variant="ghost" size="xs" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
