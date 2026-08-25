<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Mobility & Exchange'
})

const inboundColumns = [
  { accessorKey: 'name', header: 'Student' },
  { accessorKey: 'program', header: 'Program' },
  { accessorKey: 'origin', header: 'Home Institution' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'actions' }
]

const outboundColumns = [
  { accessorKey: 'name', header: 'Student' },
  { accessorKey: 'program', header: 'Program' },
  { accessorKey: 'dest', header: 'Host Institution' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'actions' }
]

const inboundStudents = [
  { id: 1, name: 'Elena Rodriguez', initials: 'ER', program: 'Erasmus+ Semester', origin: 'Univ. of Barcelona', status: 'Approved' },
  { id: 2, name: 'Kenji Sato', initials: 'KS', program: 'UTokyo Joint Research', origin: 'University of Tokyo', status: 'Pending Visa' },
  { id: 3, name: 'Lucas Meyer', initials: 'LM', program: 'Engineering Exchange', origin: 'TU Munich', status: 'Reviewing' },
]

const outboundStudents = [
  { id: 1, name: 'Miguel Santos', initials: 'MS', program: 'NUS Exchange', dest: 'National Univ. of Singapore', status: 'Reviewing' },
  { id: 2, name: 'Sarah Lee', initials: 'SL', program: 'Stanford Summer', dest: 'Stanford University', status: 'Incomplete' },
  { id: 3, name: 'Anna Cruz', initials: 'AC', program: 'Erasmus+ Semester', dest: 'Univ. of Barcelona', status: 'Approved' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return 'success'
    case 'Pending Visa': return 'warning'
    case 'Reviewing': return 'primary'
    case 'Incomplete': return 'error'
    default: return 'neutral'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Mobility & Exchange</h1>
        <p class="text-muted mt-1">Manage inbound and outbound student/faculty programs.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-plane-takeoff" color="primary">New Application</UButton>
      </div>
    </div>

    <div class="grid xl:grid-cols-2 gap-6">
      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-highlighted flex items-center gap-2">
              <UIcon name="i-lucide-plane-landing" class="size-5 text-primary" />
              Inbound Applications
            </h3>
            <UButton color="neutral" variant="ghost" size="sm">View All</UButton>
          </div>
        </template>
        <UTable class="scrollbar" :data="inboundStudents" :columns="inboundColumns">
          <template #name-cell="{ row }">
            <div class="flex items-center gap-3">
              <UAvatar :text="row.original.initials" size="xs" color="primary" variant="soft" />
              <span class="font-medium text-highlighted">{{ row.original.name }}</span>
            </div>
          </template>
          <template #origin-cell="{ row }">
            <span class="text-muted">{{ row.original.origin }}</span>
          </template>
          <template #status-cell="{ row }">
            <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="xs">{{ row.original.status }}</UBadge>
          </template>
          <template #actions-cell>
            <div class="flex justify-end">
              <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
            </div>
          </template>
        </UTable>
      </UCard>
      
      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-highlighted flex items-center gap-2">
              <UIcon name="i-lucide-plane-takeoff" class="size-5 text-primary" />
              Outbound Applications
            </h3>
            <UButton color="neutral" variant="ghost" size="sm">View All</UButton>
          </div>
        </template>
        <UTable class="scrollbar" :data="outboundStudents" :columns="outboundColumns">
          <template #name-cell="{ row }">
            <div class="flex items-center gap-3">
              <UAvatar :text="row.original.initials" size="xs" color="primary" variant="soft" />
              <span class="font-medium text-highlighted">{{ row.original.name }}</span>
            </div>
          </template>
          <template #dest-cell="{ row }">
            <span class="text-muted">{{ row.original.dest }}</span>
          </template>
          <template #status-cell="{ row }">
            <UBadge :color="getStatusColor(row.original.status)" variant="subtle" size="xs">{{ row.original.status }}</UBadge>
          </template>
          <template #actions-cell>
            <div class="flex justify-end">
              <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
            </div>
          </template>
        </UTable>
      </UCard>
    </div>
  </div>
</template>
