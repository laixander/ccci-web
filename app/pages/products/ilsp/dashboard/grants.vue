<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Grants & Funding'
})

const columns = [
  { accessorKey: 'title', header: 'Grant Title' },
  { accessorKey: 'funder', header: 'Funding Agency' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'deadline', header: 'Application Deadline' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]

const grants = [
  { id: 1, title: 'Global Faculty Exchange Grant', funder: 'Erasmus+', amount: '€50,000', deadline: '2026-10-15', status: 'Approved' },
  { id: 2, title: 'ASEAN Research Collaboration', funder: 'ASEAN University Network', amount: '$120,000', deadline: '2026-09-30', status: 'Under Review' },
  { id: 3, title: 'Joint STEM Scholarship', funder: 'US Embassy', amount: '$75,000', deadline: '2026-11-01', status: 'Drafting' },
  { id: 4, title: 'Sustainable Cities Initiative', funder: 'JICA', amount: '¥10,000,000', deadline: '2026-08-15', status: 'Rejected' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return 'success'
    case 'Under Review': return 'warning'
    case 'Drafting': return 'primary'
    case 'Rejected': return 'error'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Grants & Funding</h1>
        <p class="text-muted mt-1">Track international research grants and joint scholarships.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-plus" color="primary">Add Grant</UButton>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Active Funding</p>
        <p class="text-2xl font-bold text-highlighted">$2.4M</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Pending Applications</p>
        <p class="text-2xl font-bold text-warning">3</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Success Rate</p>
        <p class="text-2xl font-bold text-success">68%</p>
      </UCard>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <UTable :data="grants" :columns="columns">
        <template #title-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.title }}</span>
        </template>
        <template #funder-cell="{ row }">
          <span class="text-muted">{{ row.original.funder }}</span>
        </template>
        <template #amount-cell="{ row }">
          <span class="font-mono text-sm">{{ row.original.amount }}</span>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-edit-2" />
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
