<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const search = ref('')
const selectedType = ref('All Types')

const fileTypes = ['All Types', 'PDF', 'Word', 'Excel', 'Image', 'Folder']

const documents = ref([
  { id: 'DOC-101', name: 'Q3 Financial Report', type: 'PDF', owner: 'Jane Doe', size: '2.4 MB', modified: 'Oct 12, 2026', status: 'Final', icon: 'i-lucide-file-text', iconColor: 'text-error' },
  { id: 'DOC-102', name: 'Employee Handbook 2026', type: 'Word', owner: 'HR Dept', size: '1.1 MB', modified: 'Sep 28, 2026', status: 'Draft', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
  { id: 'DOC-103', name: 'Q4 Budget Projections', type: 'Excel', owner: 'Finance Team', size: '856 KB', modified: 'Oct 15, 2026', status: 'In Review', icon: 'i-lucide-file-spreadsheet', iconColor: 'text-success' },
  { id: 'DOC-104', name: 'Marketing Assets', type: 'Folder', owner: 'Marketing Team', size: '--', modified: 'Oct 01, 2026', status: '--', icon: 'i-lucide-folder', iconColor: 'text-warning' },
  { id: 'DOC-105', name: 'Vendor Contract - Acme Corp', type: 'PDF', owner: 'Legal Dept', size: '3.2 MB', modified: 'Oct 20, 2026', status: 'Signed', icon: 'i-lucide-file-text', iconColor: 'text-error' },
  { id: 'DOC-106', name: 'Office Layout Diagram', type: 'Image', owner: 'Facilities', size: '5.6 MB', modified: 'Aug 10, 2026', status: 'Final', icon: 'i-lucide-image', iconColor: 'text-info' },
  { id: 'DOC-107', name: 'Project Alpha Requirements', type: 'Word', owner: 'Product Team', size: '1.4 MB', modified: 'Oct 22, 2026', status: 'Draft', icon: 'i-lucide-file-text', iconColor: 'text-primary' },
])

const statusConfig: Record<string, { label: string, class: string }> = {
  'Final': { label: 'Final', class: 'bg-success/10 text-success' },
  'Draft': { label: 'Draft', class: 'bg-warning/10 text-warning' },
  'In Review': { label: 'In Review', class: 'bg-info/10 text-info' },
  'Signed': { label: 'Signed', class: 'bg-primary/10 text-primary' },
  '--': { label: '--', class: 'text-muted' },
}

const filtered = computed(() => {
  return documents.value.filter((doc) => {
    const matchSearch = !search.value || doc.name.toLowerCase().includes(search.value.toLowerCase()) || doc.owner.toLowerCase().includes(search.value.toLowerCase())
    const matchType = selectedType.value === 'All Types' || doc.type === selectedType.value
    return matchSearch && matchType
  })
})

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'size', header: 'Size' },
  { accessorKey: 'modified', header: 'Last Modified' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]

const showUploadModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">All Documents</h1>
        <p class="text-muted text-sm mt-1">Browse and manage all files in the repository</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton icon="i-lucide-folder-plus" label="New Folder" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-upload-cloud" label="Upload File" size="sm" @click="showUploadModal = true" />
      </div>
    </div>

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput
          v-model="search"
          placeholder="Search documents…"
          icon="i-lucide-search"
          class="flex-1 min-w-48"
        />
        <USelect
          v-model="selectedType"
          :items="fileTypes"
          class="w-44"
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
            <span class="px-1">Name</span>
          </template>
          <template #name-cell="{ row }">
            <div class="flex items-center gap-3 px-1">
              <UIcon :name="row.original.icon" :class="['size-5 shrink-0', row.original.iconColor]" />
              <div>
                <p class="font-medium text-highlighted">{{ row.original.name }}</p>
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

          <template #status-cell="{ row }">
            <span
              v-if="row.original.status !== '--'"
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
              :class="statusConfig[row.original.status]?.class"
            >
              {{ row.original.status }}
            </span>
            <span v-else class="text-muted text-xs">--</span>
          </template>

          <template #actions-cell>
            <div class="flex items-center justify-end gap-2">
              <UButton icon="i-lucide-download" color="neutral" variant="ghost" size="xs" aria-label="Download" />
              <UButton icon="i-lucide-more-horizontal" color="neutral" variant="ghost" size="xs" aria-label="More options" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>
