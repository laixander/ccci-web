<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const roles = ref([
  { id: 'R001', name: 'System Administrator', description: 'Full access to all documents, settings, and access control.', usersCount: 3, permissions: 'All Permissions' },
  { id: 'R002', name: 'Department Head', description: 'Can view, edit, and delete documents within their specific department.', usersCount: 12, permissions: 'Create, Read, Update, Delete (Local)' },
  { id: 'R003', name: 'Document Creator', description: 'Can upload and edit their own documents, and view shared documents.', usersCount: 45, permissions: 'Create, Read, Update (Own)' },
  { id: 'R004', name: 'Viewer', description: 'Read-only access to documents explicitly shared with them.', usersCount: 156, permissions: 'Read (Shared)' },
  { id: 'R005', name: 'External Auditor', description: 'Time-bound read-only access for compliance and auditing purposes.', usersCount: 2, permissions: 'Read (Audit Logs, Specific Folders)' },
])

const columns = [
  { accessorKey: 'name', header: 'Role Name' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'usersCount', header: 'Assigned Users' },
  { accessorKey: 'permissions', header: 'Permissions' },
  { id: 'actions' }
]

const showAddRoleModal = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Access Control</h1>
        <p class="text-muted text-sm mt-1">Manage roles, permissions, and security policies</p>
      </div>
      <UButton icon="i-lucide-plus" label="Create New Role" size="sm" @click="showAddRoleModal = true" />
    </div>

    <!-- Alert / Info -->
    <div class="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
      <UIcon name="i-lucide-shield-alert" class="size-5 text-primary shrink-0 mt-0.5" />
      <div>
        <h3 class="text-sm font-semibold text-highlighted">Strict Access Enforcement is Enabled</h3>
        <p class="text-xs text-muted mt-1">By default, users cannot access any document unless explicitly granted permission through their role or a direct share. Modifying roles will immediately affect active sessions.</p>
      </div>
    </div>

    <!-- Roles Table -->
    <UCard :ui="{ root: 'shadow-sm', header: 'p-4 sm:px-6', body: 'p-0 sm:p-0' }">
      <template #header>
        <h2 class="font-semibold text-highlighted">System Roles</h2>
      </template>
      
      <div class="overflow-x-auto">
        <UTable
          :data="roles"
          :columns="columns"
          class="scrollbar w-full text-sm"
          :ui="{
            th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
            td: 'px-4 py-4',
            tr: 'hover:bg-muted/30 transition-colors'
          }"
        >
          <template #name-header>
            <span class="px-1">Role Name</span>
          </template>
          <template #name-cell="{ row }">
            <div class="px-1">
              <p class="font-medium text-highlighted">{{ row.original.name }}</p>
              <p class="text-xs text-dimmed">{{ row.original.id }}</p>
            </div>
          </template>

          <template #description-cell="{ row }">
            <span class="text-muted text-sm block max-w-xs">{{ row.original.description }}</span>
          </template>

          <template #usersCount-cell="{ row }">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-users" class="size-4 text-dimmed" />
              <span class="text-sm font-medium">{{ row.original.usersCount }}</span>
            </div>
          </template>

          <template #permissions-cell="{ row }">
            <span class="text-xs text-muted">{{ row.original.permissions }}</span>
          </template>

          <template #actions-cell>
            <div class="flex items-center justify-end gap-2">
              <UButton icon="i-lucide-edit-3" color="neutral" variant="ghost" size="xs" aria-label="Edit Role" />
              <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="xs" aria-label="Delete Role" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>
