<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedCategory = ref('All Categories')
const categories = ['All Categories', 'Hardware', 'Software', 'Furniture', 'Vehicles']

const assets = ref([
  { id: 'AST-1001', name: 'MacBook Pro 16"', category: 'Hardware', assignee: 'John Doe', status: 'Deployed', value: '₱125,000', purchased: '2025-05-12' },
  { id: 'AST-1002', name: 'Dell XPS 15', category: 'Hardware', assignee: 'Jane Smith', status: 'Deployed', value: '₱95,000', purchased: '2025-06-01' },
  { id: 'AST-1003', name: 'Adobe Creative Cloud', category: 'Software', assignee: 'Marketing Team', status: 'Active', value: '₱45,000/yr', purchased: '2026-01-15' },
  { id: 'AST-1004', name: 'Ergonomic Chair', category: 'Furniture', assignee: 'Unassigned', status: 'In Storage', value: '₱15,000', purchased: '2024-11-20' },
  { id: 'AST-1005', name: 'Toyota Hiace', category: 'Vehicles', assignee: 'Logistics Team', status: 'Maintenance', value: '₱1,800,000', purchased: '2023-08-10' },
  { id: 'AST-1006', name: 'Lenovo ThinkPad', category: 'Hardware', assignee: 'Unassigned', status: 'Available', value: '₱75,000', purchased: '2026-03-01' },
])

const statusConfig: Record<string, { label: string, class: string }> = {
  'Deployed': { label: 'Deployed', class: 'bg-success/10 text-success' },
  'Active': { label: 'Active', class: 'bg-success/10 text-success' },
  'In Storage': { label: 'In Storage', class: 'bg-muted/10 text-muted' },
  'Maintenance': { label: 'Maintenance', class: 'bg-warning/10 text-warning' },
  'Available': { label: 'Available', class: 'bg-primary/10 text-primary' },
}

const filtered = computed(() => {
  return assets.value.filter(a => {
    const matchSearch = !search.value || a.name.toLowerCase().includes(search.value.toLowerCase()) || a.id.toLowerCase().includes(search.value.toLowerCase())
    const matchCat = selectedCategory.value === 'All Categories' || a.category === selectedCategory.value
    return matchSearch && matchCat
  })
})

const columns = [
  { accessorKey: 'id', header: 'Asset ID' },
  { accessorKey: 'name', header: 'Asset Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'assignee', header: 'Assignee' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'purchased', header: 'Purchase Date' },
  { id: 'actions' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">All Assets</h1>
        <p class="text-muted text-sm mt-1">Manage and track all corporate assets.</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add Asset" size="sm" />
    </div>

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search by name or ID..." icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedCategory" :items="categories" class="w-44" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} items</span>
      </div>
    </UCard>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="filtered" :columns="columns" class="scrollbar w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }">
        <template #id-cell="{ row }"><span class="font-mono text-xs text-muted">{{ row.original.id }}</span></template>
        <template #name-cell="{ row }"><span class="font-medium text-highlighted">{{ row.original.name }}</span></template>
        <template #status-cell="{ row }">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]?.class">
            {{ row.original.status }}
          </span>
        </template>
        <template #actions-cell>
          <div class="flex items-center justify-end gap-2">
            <UButton icon="i-lucide-edit-3" color="neutral" variant="ghost" size="xs" />
            <UButton icon="i-lucide-more-horizontal" color="neutral" variant="ghost" size="xs" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
