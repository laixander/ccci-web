<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const documents = ref([
  { id: 'DOC-102', name: 'Employee Handbook 2026', owner: 'HR Dept', size: '1.1 MB', modified: 'Sep 28, 2026', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
  { id: 'DOC-107', name: 'Project Alpha Requirements', owner: 'Product Team', size: '1.4 MB', modified: 'Oct 22, 2026', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
  { id: 'SHR-002', name: 'Q4 Product Roadmap', owner: 'Product Team', size: '3.5 MB', modified: 'Oct 22, 2026', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
])

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'size', header: 'Size' },
  { accessorKey: 'modified', header: 'Last Modified' },
  { id: 'actions' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Starred Documents</h1>
        <p class="text-muted text-sm mt-1">Quick access to your most important files</p>
      </div>
    </div>

    <div v-if="documents.length === 0" class="text-center py-20 bg-muted/20 rounded-xl border border-default border-dashed">
      <UIcon name="i-lucide-star" class="size-12 text-dimmed mx-auto mb-3" />
      <h3 class="text-lg font-medium text-highlighted">No starred documents</h3>
      <p class="text-muted text-sm mt-1">Star frequently used documents to easily find them here.</p>
    </div>

    <!-- Documents Table -->
    <UCard v-else :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="overflow-x-auto">
        <UTable
          :data="documents"
          :columns="columns"
          class="w-full text-sm"
          :ui="{
            th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
            td: 'px-4 py-4',
            tr: 'hover:bg-muted/30 transition-colors cursor-pointer'
          }"
        >
          <template #name-header>
            <span class="px-1">Name</span>
          </template>
          <template #name-cell="{ row }">
            <div class="flex items-center gap-3 px-1">
              <UIcon :name="row.original.icon" :class="['size-5 shrink-0', row.original.iconColor]" />
              <div>
                <p class="font-medium text-highlighted flex items-center gap-2">
                  {{ row.original.name }}
                  <UIcon name="i-lucide-star" class="size-3.5 text-warning fill-warning" />
                </p>
                <p class="text-xs text-dimmed">{{ row.original.id }}</p>
              </div>
            </div>
          </template>

          <template #owner-cell="{ row }">
            <span class="text-muted">{{ row.original.owner }}</span>
          </template>

          <template #size-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.size }}</span>
          </template>

          <template #modified-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.modified }}</span>
          </template>

          <template #actions-cell>
            <div class="flex items-center justify-end gap-2">
              <UButton icon="i-lucide-star-off" color="neutral" variant="ghost" size="xs" aria-label="Unstar" />
              <UButton icon="i-lucide-more-horizontal" color="neutral" variant="ghost" size="xs" aria-label="More options" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>
