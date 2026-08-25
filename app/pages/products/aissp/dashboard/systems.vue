<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Information Systems'
})

const systems = [
  { id: 1, name: 'Human Resource Information System (HRIS)', category: 'Core Operations', status: 'Deployed', budget: '₱12M', targetDate: 'Q1 2025' },
  { id: 2, name: 'Financial Management System (FMS)', category: 'Finance', status: 'Deployed', budget: '₱25M', targetDate: 'Q4 2024' },
  { id: 3, name: 'Cloud Document Repository', category: 'Infrastructure', status: 'Under Development', budget: '₱8M', targetDate: 'Q3 2026' },
  { id: 4, name: 'Legacy Payroll System', category: 'Core Operations', status: 'Retiring', budget: '₱2M', targetDate: 'Q4 2026' },
  { id: 5, name: 'Citizen Portal Mobile App', category: 'Public Service', status: 'Proposed', budget: '₱15M', targetDate: 'Q1 2027' },
]

const columns: TableColumn<typeof systems[0]>[] = [
  { accessorKey: 'name', header: 'System Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'budget', header: 'Allocated Budget' },
  { accessorKey: 'targetDate', header: 'Target/Deploy Date' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Deployed': return 'success'
    case 'Under Development': return 'info'
    case 'Proposed': return 'warning'
    case 'Retiring': return 'error'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Information Systems</h1>
        <p class="text-muted mt-1">Track and manage your organization's ICT systems portfolio.</p>
      </div>
      <UButton icon="i-lucide-plus" color="primary">Add System</UButton>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search systems..." class="w-full sm:max-w-sm" />
          <div class="flex gap-2 w-full sm:w-auto">
            <USelect :items="['All Categories', 'Core Operations', 'Finance', 'Infrastructure', 'Public Service']" class="w-full sm:w-40" />
            <USelect :items="['All Statuses', 'Deployed', 'Under Development', 'Proposed', 'Retiring']" class="w-full sm:w-40" />
          </div>
        </div>
      </template>
      <UTable class="scrollbar" :data="systems" :columns="columns">
        <template #name-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.name }}</span>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-edit" />
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
