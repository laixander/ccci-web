<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Compliance & Audits'
})

const audits = [
  { id: 1, title: 'DICT ISSP Submission', type: 'Regulatory', deadline: '2026-09-30', status: 'In Progress', progress: 75 },
  { id: 2, title: 'Annual ISO 27001 Audit', type: 'Security', deadline: '2026-11-15', status: 'Not Started', progress: 0 },
  { id: 3, title: 'Data Privacy Impact Assessment', type: 'Privacy', deadline: '2026-08-30', status: 'Under Review', progress: 90 },
  { id: 4, title: 'Network Penetration Testing', type: 'Security', deadline: '2026-07-01', status: 'Completed', progress: 100 },
]

const columns: TableColumn<typeof audits[0]>[] = [
  { accessorKey: 'title', header: 'Audit / Compliance Requirement' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'deadline', header: 'Deadline' },
  { accessorKey: 'progress', header: 'Progress' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'success'
    case 'In Progress': return 'primary'
    case 'Under Review': return 'warning'
    case 'Not Started': return 'neutral'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Compliance & Audits</h1>
        <p class="text-muted mt-1">Track regulatory submissions, security audits, and privacy assessments.</p>
      </div>
      <UButton icon="i-lucide-file-check" color="primary">New Assessment</UButton>
    </div>

    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput icon="i-lucide-search" placeholder="Search compliance items..." class="w-full sm:max-w-sm" />
          <USelect :items="['All Types', 'Regulatory', 'Security', 'Privacy']" class="w-full sm:w-40" />
        </div>
      </template>
      <UTable :data="audits" :columns="columns">
        <template #title-cell="{ row }">
          <span class="font-medium text-highlighted">{{ row.original.title }}</span>
        </template>
        <template #progress-cell="{ row }">
          <div class="flex items-center gap-2">
            <UProgress :value="row.original.progress" class="w-24" :color="row.original.progress === 100 ? 'success' : 'primary'" />
            <span class="text-xs text-muted">{{ row.original.progress }}%</span>
          </div>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="sm">{{ row.original.status }}</UBadge>
        </template>
        <template #actions-cell>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-right" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
