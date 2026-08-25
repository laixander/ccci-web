<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Reports'
})

const reports = [
  { id: 1, name: 'Income Statement', period: 'July 2026', generated: '2026-08-01', format: 'PDF', status: 'Ready' },
  { id: 2, name: 'Balance Sheet', period: 'July 2026', generated: '2026-08-01', format: 'Excel', status: 'Ready' },
  { id: 3, name: 'Cash Flow Statement', period: 'Q2 2026', generated: '2026-07-15', format: 'PDF', status: 'Ready' },
  { id: 4, name: 'Trial Balance', period: 'YTD 2026', generated: '2026-08-24', format: 'Excel', status: 'Processing' },
]

const columns: TableColumn<typeof reports[0]>[] = [
  { accessorKey: 'name', header: 'Report Name' },
  { accessorKey: 'period', header: 'Period' },
  { accessorKey: 'generated', header: 'Generated On' },
  { accessorKey: 'format', header: 'Format' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Financial Reports</h1>
        <p class="text-muted mt-1">Generate and export standard financial statements.</p>
      </div>
      <UButton icon="i-lucide-file-text" color="primary">Generate New Report</UButton>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search reports..." class="w-full sm:max-w-sm" />
          <USelect :items="['All Formats', 'PDF', 'Excel', 'CSV']" class="w-full sm:w-40" />
        </div>
      </template>
      <UTable class="scrollbar" :data="reports" :columns="columns">
        <template #name-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.name }}</span>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="row.original.status === 'Ready' ? 'success' : 'warning'" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-download" :disabled="row.original.status !== 'Ready'" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
