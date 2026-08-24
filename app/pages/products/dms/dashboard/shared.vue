<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const search = ref('')

const documents = ref([
  { id: 'SHR-001', name: 'Client Onboarding Presentation', owner: 'Marketing Team', permission: 'View Only', sharedBy: 'Sarah Jenkins', sharedDate: 'Oct 23, 2026', icon: 'i-lucide-file-presentation', iconColor: 'text-warning' },
  { id: 'SHR-002', name: 'Q4 Product Roadmap', owner: 'Product Team', permission: 'Can Edit', sharedBy: 'Michael Chen', sharedDate: 'Oct 22, 2026', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
  { id: 'SHR-003', name: 'Software Architecture Specs', owner: 'Engineering', permission: 'Can Edit', sharedBy: 'Elena Rodriguez', sharedDate: 'Oct 20, 2026', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
  { id: 'SHR-004', name: 'Q3 Financials Summary', owner: 'Finance', permission: 'View Only', sharedBy: 'Jane Doe', sharedDate: 'Oct 15, 2026', icon: 'i-lucide-file-spreadsheet', iconColor: 'text-success' },
])

const filtered = computed(() => {
  return documents.value.filter((doc) => {
    return !search.value || doc.name.toLowerCase().includes(search.value.toLowerCase()) || doc.sharedBy.toLowerCase().includes(search.value.toLowerCase())
  })
})

const columns = [
  { accessorKey: 'name', header: 'Document Name' },
  { accessorKey: 'sharedBy', header: 'Shared By' },
  { accessorKey: 'permission', header: 'Permission' },
  { accessorKey: 'sharedDate', header: 'Date Shared' },
  { id: 'actions' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Shared with Me</h1>
        <p class="text-muted text-sm mt-1">Documents that other users have shared with you</p>
      </div>
    </div>

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput
          v-model="search"
          placeholder="Search shared documents…"
          icon="i-lucide-search"
          class="flex-1 max-w-md"
        />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} items</span>
      </div>
    </UCard>

    <!-- Documents Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="overflow-x-auto">
        <UTable
          :data="filtered"
          :columns="columns"
          class="w-full text-sm"
          :ui="{
            th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
            td: 'px-4 py-4',
            tr: 'hover:bg-muted/30 transition-colors cursor-pointer'
          }"
        >
          <template #name-header>
            <span class="px-1">Document Name</span>
          </template>
          <template #name-cell="{ row }">
            <div class="flex items-center gap-3 px-1">
              <UIcon :name="row.original.icon" :class="['size-5 shrink-0', row.original.iconColor]" />
              <div>
                <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                <p class="text-xs text-dimmed">Owned by {{ row.original.owner }}</p>
              </div>
            </div>
          </template>

          <template #sharedBy-cell="{ row }">
            <div class="flex items-center gap-2">
              <UAvatar :text="row.original.sharedBy.substring(0,2)" size="xs" color="neutral" />
              <span class="text-muted">{{ row.original.sharedBy }}</span>
            </div>
          </template>

          <template #permission-cell="{ row }">
            <UBadge 
              :label="row.original.permission" 
              :color="row.original.permission === 'Can Edit' ? 'primary' : 'neutral'" 
              variant="subtle" 
              size="sm" 
            />
          </template>

          <template #sharedDate-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.sharedDate }}</span>
          </template>

          <template #actions-cell>
            <div class="flex items-center justify-end gap-2">
              <UButton icon="i-lucide-external-link" color="neutral" variant="ghost" size="xs" aria-label="Open" />
              <UButton icon="i-lucide-more-horizontal" color="neutral" variant="ghost" size="xs" aria-label="More options" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>
