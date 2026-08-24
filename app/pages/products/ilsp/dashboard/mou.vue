<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'MOUs & Agreements'
})

const columns = [
  { accessorKey: 'title', header: 'Agreement Title' },
  { accessorKey: 'partner', header: 'Partner Institution' },
  { accessorKey: 'type', header: 'Agreement Type' },
  { accessorKey: 'signed', header: 'Signed Date' },
  { accessorKey: 'expiry', header: 'Expiry Date' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'actions' }
]

const agreements = [
  { id: 1, title: 'Joint Research on AI Ethics', partner: 'National University of Singapore', type: 'Research Collaboration', signed: '2023-01-15', expiry: '2028-01-14', status: 'Active' },
  { id: 2, title: 'Undergraduate Exchange Program', partner: 'University of Tokyo', type: 'Student Exchange', signed: '2022-08-01', expiry: '2027-07-31', status: 'Active' },
  { id: 3, title: 'Cybersecurity Innovation Lab', partner: 'Microsoft Research Asia', type: 'Industry Partnership', signed: '2021-10-01', expiry: '2026-09-30', status: 'Expiring Soon' },
  { id: 4, title: 'Faculty Visiting Scholar MOA', partner: 'Stanford University', type: 'Faculty Exchange', signed: '2024-03-10', expiry: '2029-03-09', status: 'Active' },
  { id: 5, title: 'Dual Degree Program in Engineering', partner: 'University of Melbourne', type: 'Academic Articulation', signed: '2019-05-20', expiry: '2024-05-19', status: 'Expired' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Expiring Soon': return 'warning'
    case 'Expired': return 'error'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">MOUs & Agreements</h1>
        <p class="text-muted mt-1">Track agreement lifecycles and expiration dates.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-file-plus" color="primary">New Agreement</UButton>
      </div>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search agreements..." class="w-full sm:max-w-sm" />
          <USelect :items="['All Statuses', 'Active', 'Expiring Soon', 'Expired']" class="w-full sm:w-48" />
        </div>
      </template>
      <UTable :data="agreements" :columns="columns">
        <template #title-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.title }}</span>
        </template>
        <template #partner-cell="{ row }">
          <div class="flex items-center gap-2 text-muted">
            <UIcon name="i-lucide-building-2" class="size-4" />
            <span>{{ row.original.partner }}</span>
          </div>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-download" />
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
