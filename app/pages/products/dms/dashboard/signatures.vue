<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const tabs = computed(() => [
  {
    label: 'Requires My Signature',
    slot: 'my-signatures',
    badge: {
      label: String(mySignatures.value.length),
      color: 'warning' as const,
      variant: 'soft' as const,
      size: 'sm' as const
    }
  },
  {
    label: 'Waiting for Others',
    slot: 'waiting',
    badge: {
      label: String(waitingForOthers.value.length),
      color: 'success' as const,
      variant: 'soft' as const,
      size: 'sm' as const
    }
  }
])

const mySignatures = ref([
  { id: 'SIG-892', document: 'Employee Contract - John Smith.pdf', sender: 'HR Dept', sentOn: 'Yesterday', due: 'Oct 25', status: 'Pending' },
  { id: 'SIG-893', document: 'NDA - TechFlow Solutions.pdf', sender: 'Legal Dept', sentOn: '2 days ago', due: 'Oct 26', status: 'Viewed' },
])

const waitingForOthers = ref([
  { id: 'SIG-890', document: 'Q3 Board Minutes.pdf', signatories: 'Alice (Signed), Bob (Pending)', sentOn: 'Oct 20', due: 'Oct 30', status: 'Partially Signed' },
])

const columnsMySigs = [
  { accessorKey: 'document', header: 'Document' },
  { accessorKey: 'sender', header: 'Sender' },
  { accessorKey: 'sentOn', header: 'Sent On' },
  { accessorKey: 'due', header: 'Due Date' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]

const columnsWaiting = [
  { accessorKey: 'document', header: 'Document' },
  { accessorKey: 'signatories', header: 'Signatories Status' },
  { accessorKey: 'sentOn', header: 'Sent On' },
  { accessorKey: 'due', header: 'Due Date' },
  { accessorKey: 'status', header: 'Overall Status' },
  { id: 'actions' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Signatures</h1>
        <p class="text-muted text-sm mt-1">Manage e-signature requests</p>
      </div>
      <UButton icon="i-lucide-pen-tool" label="Request Signature" size="sm" />
    </div>

    <!-- Tabs -->
    <UTabs :items="tabs" class="w-full">
      <template #default="{ item }">
        <div class="flex items-center gap-2 relative truncate">
          <span class="truncate">{{ item.label }}</span>
        </div>
      </template>

      <!-- My Signatures Content -->
      <template #my-signatures>
        <UCard :ui="{ root: 'shadow-sm mt-4', body: 'p-0 sm:p-0' }">
          <div class="overflow-x-auto">
            <UTable
              :data="mySignatures"
              :columns="columnsMySigs"
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
                  <UIcon name="i-lucide-file-signature" class="size-5 shrink-0 text-primary" />
                  <div>
                    <p class="font-medium text-highlighted">{{ row.original.document }}</p>
                    <p class="text-xs text-dimmed">{{ row.original.id }}</p>
                  </div>
                </div>
              </template>

              <template #sender-cell="{ row }">
                <span class="text-sm">{{ row.original.sender }}</span>
              </template>

              <template #sentOn-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.sentOn }}</span>
              </template>

              <template #due-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.due }}</span>
              </template>

              <template #status-cell="{ row }">
                <UBadge 
                  :label="row.original.status" 
                  :color="row.original.status === 'Viewed' ? 'info' : 'warning'" 
                  variant="subtle" 
                  size="sm" 
                />
              </template>

              <template #actions-cell>
                <div class="flex items-center justify-end gap-2">
                  <UButton icon="i-lucide-pen-tool" color="primary" size="xs" label="Sign Now" />
                </div>
              </template>
            </UTable>
          </div>
        </UCard>
      </template>

      <!-- Waiting For Others Content -->
      <template #waiting>
        <UCard :ui="{ root: 'shadow-sm mt-4', body: 'p-0 sm:p-0' }">
          <div class="overflow-x-auto">
            <UTable
              :data="waitingForOthers"
              :columns="columnsWaiting"
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
                  <UIcon name="i-lucide-file-signature" class="size-5 shrink-0 text-muted" />
                  <div>
                    <p class="font-medium text-highlighted">{{ row.original.document }}</p>
                    <p class="text-xs text-dimmed">{{ row.original.id }}</p>
                  </div>
                </div>
              </template>

              <template #signatories-cell="{ row }">
                <span class="text-sm text-muted">{{ row.original.signatories }}</span>
              </template>

              <template #sentOn-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.sentOn }}</span>
              </template>
              
              <template #due-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.due }}</span>
              </template>

              <template #status-cell="{ row }">
                <UBadge 
                  :label="row.original.status" 
                  color="warning" 
                  variant="subtle" 
                  size="sm" 
                />
              </template>

              <template #actions-cell>
                <div class="flex items-center justify-end gap-2">
                  <UButton icon="i-lucide-bell" color="neutral" variant="ghost" size="xs" label="Remind" />
                </div>
              </template>
            </UTable>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
