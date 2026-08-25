<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const roles = ref([
  { role: 'Administrator', users: 3, access: 'Full System Access' },
  { role: 'Asset Manager', users: 5, access: 'Manage Assets, Inventory, Reports' },
  { role: 'IT Support', users: 12, access: 'Manage Hardware, Software, Assignments' },
  { role: 'Employee', users: 245, access: 'View Assigned Assets, Request Assets' },
])
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Access Control</h1>
        <p class="text-muted text-sm mt-1">Manage user roles and permissions for AssetCore.</p>
      </div>
      <UButton icon="i-lucide-user-plus" label="Invite User" size="sm" />
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable :data="roles" class="scrollbar w-full text-sm" :ui="{ th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider', td: 'px-4 py-4', tr: 'hover:bg-muted/30 transition-colors' }" />
    </UCard>
  </div>
</template>
