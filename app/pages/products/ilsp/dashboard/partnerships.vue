<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Institutions'
})

const columns = [
  { accessorKey: 'name', header: 'Institution Name' },
  { accessorKey: 'region', header: 'Region' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'mous', header: 'Active MOUs' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'actions' }
]

const partners = [
  { id: 1, name: 'National University of Singapore', avatar: 'NUS', country: 'Singapore', flag: '🇸🇬', type: 'Academic', mous: 3, status: 'Active' },
  { id: 2, name: 'University of Tokyo', avatar: 'UT', country: 'Japan', flag: '🇯🇵', type: 'Academic', mous: 1, status: 'Active' },
  { id: 3, name: 'Stanford University', avatar: 'SU', country: 'United States', flag: '🇺🇸', type: 'Academic', mous: 2, status: 'Active' },
  { id: 4, name: 'Microsoft Research Asia', avatar: 'MS', country: 'China', flag: '🇨🇳', type: 'Industry', mous: 1, status: 'Expiring Soon' },
  { id: 5, name: 'University of Melbourne', avatar: 'UM', country: 'Australia', flag: '🇦🇺', type: 'Academic', mous: 0, status: 'Inactive' },
  { id: 6, name: 'Tsinghua University', avatar: 'TU', country: 'China', flag: '🇨🇳', type: 'Academic', mous: 4, status: 'Active' },
  { id: 7, name: 'IBM Global Research', avatar: 'IBM', country: 'United States', flag: '🇺🇸', type: 'Industry', mous: 1, status: 'Active' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Expiring Soon': return 'warning'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Partner Institutions</h1>
        <p class="text-muted mt-1">Manage your global network of academic and industry partners.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-filter" color="neutral" variant="outline">Filter</UButton>
        <UButton icon="i-lucide-plus" color="primary">Add Partner</UButton>
      </div>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <div class="p-4 border-b border-default flex items-center justify-between">
        <UInput icon="i-lucide-search" placeholder="Search institutions..." class="w-full max-w-sm" />
      </div>
      <UTable class="scrollbar" :data="partners" :columns="columns">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :text="row.original.avatar" size="sm" color="primary" variant="soft" />
            <span class="font-medium text-highlighted">{{ row.original.name }}</span>
          </div>
        </template>
        <template #region-cell="{ row }">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ row.original.flag }}</span>
            <span class="text-muted">{{ row.original.country }}</span>
          </div>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end">
            <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
