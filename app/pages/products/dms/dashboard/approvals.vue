<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const tabs = computed(() => [
  {
    label: 'Pending',
    slot: 'pending',
    badge: {
      label: String(pendingApprovals.value.length),
      color: 'warning' as const,
      variant: 'soft' as const,
      size: 'sm' as const
    }
  },
  {
    label: 'Completed',
    slot: 'completed',
    badge: {
      label: String(completedApprovals.value.length),
      color: 'success' as const,
      variant: 'soft' as const,
      size: 'sm' as const
    }
  }
])

const pendingApprovals = ref([
  { id: 'APP-045', document: 'Q3 Financial Report.pdf', requester: 'Jane Doe', dept: 'Finance', submitted: '2 hours ago', due: 'Today', urgency: 'High' },
  { id: 'APP-046', document: 'Vendor Contract - Acme Corp.pdf', requester: 'Legal Dept', dept: 'Legal', submitted: '1 day ago', due: 'Tomorrow', urgency: 'Normal' },
  { id: 'APP-047', document: 'Employee Handbook v2.docx', requester: 'HR Team', dept: 'HR', submitted: '2 days ago', due: 'Oct 28', urgency: 'Low' },
])

const completedApprovals = ref([
  { id: 'APP-044', document: 'Software Architecture Specs.pdf', requester: 'Engineering', dept: 'Engineering', submitted: 'Oct 20', completed: 'Oct 21', status: 'Approved' },
  { id: 'APP-043', document: 'Marketing Assets.zip', requester: 'Marketing Team', dept: 'Marketing', submitted: 'Oct 18', completed: 'Oct 19', status: 'Rejected' },
])

const columnsPending = [
  { accessorKey: 'document', header: 'Document' },
  { accessorKey: 'requester', header: 'Requester' },
  { accessorKey: 'submitted', header: 'Submitted' },
  { accessorKey: 'due', header: 'Due Date' },
  { accessorKey: 'urgency', header: 'Urgency' },
  { id: 'actions' }
]

const columnsCompleted = [
  { accessorKey: 'document', header: 'Document' },
  { accessorKey: 'requester', header: 'Requester' },
  { accessorKey: 'submitted', header: 'Submitted' },
  { accessorKey: 'completed', header: 'Completed On' },
  { accessorKey: 'status', header: 'Status' },
]

const urgencyConfig: Record<string, { color: 'error' | 'primary' | 'neutral' }> = {
  'High': { color: 'error' },
  'Normal': { color: 'primary' },
  'Low': { color: 'neutral' },
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">My Approvals</h1>
        <p class="text-muted text-sm mt-1">Review and action documents pending your approval</p>
      </div>
    </div>

    <!-- Tabs -->
    <UTabs :items="tabs" class="w-full">
      <template #default="{ item }">
        <div class="flex items-center gap-2 relative truncate">
          <span class="truncate">{{ item.label }}</span>
        </div>
      </template>

      <!-- Pending Tab Content -->
      <template #pending>
        <UCard :ui="{ root: 'shadow-sm mt-4', body: 'p-0 sm:p-0' }">
          <div class="overflow-x-auto">
            <UTable
              :data="pendingApprovals"
              :columns="columnsPending"
              class="w-full text-sm"
              :ui="{
                th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
                td: 'px-4 py-4',
                tr: 'hover:bg-muted/30 transition-colors'
              }"
            >
              <template #document-header>
                <span class="px-1">Document</span>
              </template>
              <template #document-cell="{ row }">
                <div class="flex items-center gap-3 px-1">
                  <UIcon name="i-lucide-file-text" class="size-5 shrink-0 text-primary" />
                  <div>
                    <p class="font-medium text-highlighted">{{ row.original.document }}</p>
                    <p class="text-xs text-dimmed">{{ row.original.id }}</p>
                  </div>
                </div>
              </template>

              <template #requester-cell="{ row }">
                <div>
                  <p class="text-sm">{{ row.original.requester }}</p>
                  <p class="text-xs text-muted">{{ row.original.dept }}</p>
                </div>
              </template>

              <template #submitted-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.submitted }}</span>
              </template>

              <template #due-cell="{ row }">
                <span class="text-muted text-xs font-medium" :class="{'text-error': row.original.due === 'Today'}">{{ row.original.due }}</span>
              </template>

              <template #urgency-cell="{ row }">
                <UBadge 
                  :label="row.original.urgency" 
                  :color="urgencyConfig[row.original.urgency]?.color" 
                  variant="subtle" 
                  size="sm" 
                />
              </template>

              <template #actions-cell>
                <div class="flex items-center justify-end gap-2">
                  <UButton icon="i-lucide-check" color="success" variant="soft" size="xs" label="Approve" />
                  <UButton icon="i-lucide-x" color="error" variant="soft" size="xs" label="Reject" />
                  <UButton icon="i-lucide-eye" color="neutral" variant="ghost" size="xs" aria-label="View Document" />
                </div>
              </template>
            </UTable>
          </div>
        </UCard>
      </template>

      <!-- Completed Tab Content -->
      <template #completed>
        <UCard :ui="{ root: 'shadow-sm mt-4', body: 'p-0 sm:p-0' }">
          <div class="overflow-x-auto">
            <UTable
              :data="completedApprovals"
              :columns="columnsCompleted"
              class="w-full text-sm"
              :ui="{
                th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
                td: 'px-4 py-4',
                tr: 'hover:bg-muted/30 transition-colors'
              }"
            >
              <template #document-header>
                <span class="px-1">Document</span>
              </template>
              <template #document-cell="{ row }">
                <div class="flex items-center gap-3 px-1">
                  <UIcon name="i-lucide-file-text" class="size-5 shrink-0 text-muted" />
                  <div>
                    <p class="font-medium text-highlighted">{{ row.original.document }}</p>
                    <p class="text-xs text-dimmed">{{ row.original.id }}</p>
                  </div>
                </div>
              </template>

              <template #requester-cell="{ row }">
                <div>
                  <p class="text-sm">{{ row.original.requester }}</p>
                  <p class="text-xs text-muted">{{ row.original.dept }}</p>
                </div>
              </template>

              <template #submitted-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.submitted }}</span>
              </template>
              
              <template #completed-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.completed }}</span>
              </template>

              <template #status-cell="{ row }">
                <UBadge 
                  :label="row.original.status" 
                  :color="row.original.status === 'Approved' ? 'success' : 'error'" 
                  variant="subtle" 
                  size="sm" 
                />
              </template>
            </UTable>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
