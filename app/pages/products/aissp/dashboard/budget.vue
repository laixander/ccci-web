<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Budget & Procurement'
})

const budgetItems = [
  { id: 1, item: 'Cloud Server Hosting (AWS)', type: 'OPEX', amount: '₱4,500,000', status: 'Approved', procurementMode: 'Public Bidding' },
  { id: 2, item: 'Endpoint Security Software Licenses', type: 'OPEX', amount: '₱1,200,000', status: 'Pending Review', procurementMode: 'Direct Contracting' },
  { id: 3, item: 'New Data Center Racks', type: 'CAPEX', amount: '₱8,000,000', status: 'Approved', procurementMode: 'Public Bidding' },
  { id: 4, item: 'IT Staff Training & Certifications', type: 'OPEX', amount: '₱500,000', status: 'Draft', procurementMode: 'Small Value' },
]

const columns: TableColumn<typeof budgetItems[0]>[] = [
  { accessorKey: 'item', header: 'Budget Item' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'procurementMode', header: 'Procurement Mode' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return 'success'
    case 'Pending Review': return 'warning'
    case 'Draft': return 'neutral'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Budget & Procurement</h1>
        <p class="text-muted mt-1">Manage ICT resource allocation and track procurement timelines.</p>
      </div>
      <UButton icon="i-lucide-plus" color="primary">Add Budget Line</UButton>
    </div>

    <!-- Quick Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Approved Budget</p>
        <p class="text-2xl font-bold text-highlighted">₱124,500,000</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">CAPEX Total</p>
        <p class="text-2xl font-bold text-highlighted">₱80,000,000</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">OPEX Total</p>
        <p class="text-2xl font-bold text-highlighted">₱44,500,000</p>
      </UCard>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search budget items..." class="w-full sm:max-w-sm" />
          <USelect :items="['All Types', 'CAPEX', 'OPEX']" class="w-full sm:w-40" />
        </div>
      </template>
      <UTable :data="budgetItems" :columns="columns">
        <template #item-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.item }}</span>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
