<template>
  <!-- Browser chrome frame -->
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.docucore.io/documents</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-folder-open" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="AJ" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">All Documents</p>
            <p class="text-[9px] text-dimmed mt-0.5">14,823 files · 2 folders</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-search" class="size-3 text-dimmed" />
              <span class="text-[9px] text-dimmed">Search documents…</span>
            </div>
            <UButton size="xs" label="Upload" icon="i-lucide-upload-cloud" color="primary" />
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-2 px-4 py-1.5 border-b border-default">
          <span v-for="type in fileTypes" :key="type.label" :class="['text-[9px] px-2 py-0.5 rounded-full cursor-default font-medium', type.active ? 'bg-primary/10 text-primary' : 'text-muted']">
            {{ type.label }}
          </span>
        </div>

        <!-- Document table -->
        <div class="flex-1 overflow-y-auto scrollbar">
          <table class="w-full">
            <thead>
              <tr class="border-b border-default bg-elevated">
                <th class="text-left px-4 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Name</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Owner</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Modified</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in documents" :key="doc.name" class="border-b border-default last:border-0 hover:bg-muted/20">
                <td class="px-4 py-2">
                  <div class="flex items-center gap-2">
                    <UIcon :name="doc.icon" :class="['size-4 flex-shrink-0', doc.iconColor]" />
                    <div>
                      <p class="text-[10px] font-medium text-highlighted truncate max-w-[110px]">{{ doc.name }}</p>
                      <p class="text-[8.5px] text-dimmed">{{ doc.size }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-2 py-2 text-[9.5px] text-muted">{{ doc.owner }}</td>
                <td class="px-2 py-2 text-[9.5px] text-muted">{{ doc.modified }}</td>
                <td class="px-2 py-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium" :class="doc.statusClass">{{ doc.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Documents', icon: 'i-lucide-files', active: true },
  { label: 'Shared', icon: 'i-lucide-users', active: false },
  { label: 'Starred', icon: 'i-lucide-star', active: false },
  { label: 'Approvals', icon: 'i-lucide-check-circle', active: false },
  { label: 'Signatures', icon: 'i-lucide-pen-tool', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const fileTypes = [
  { label: 'All', active: true },
  { label: 'PDF', active: false },
  { label: 'Word', active: false },
  { label: 'Excel', active: false },
  { label: 'Folders', active: false },
]

const documents = [
  { name: 'Q3 Financial Report', icon: 'i-lucide-file-text', iconColor: 'text-error', size: '2.4 MB', owner: 'Jane Doe', modified: 'Oct 12', status: 'Final', statusClass: 'bg-success/10 text-success' },
  { name: 'Employee Handbook 2026', icon: 'i-lucide-file-text', iconColor: 'text-primary', size: '1.1 MB', owner: 'HR Dept', modified: 'Sep 28', status: 'Draft', statusClass: 'bg-warning/10 text-warning' },
  { name: 'Q4 Budget Projections', icon: 'i-lucide-file-spreadsheet', iconColor: 'text-success', size: '856 KB', owner: 'Finance', modified: 'Oct 15', status: 'In Review', statusClass: 'bg-info/10 text-info' },
  { name: 'Vendor Contract – Acme', icon: 'i-lucide-file-text', iconColor: 'text-error', size: '3.2 MB', owner: 'Legal', modified: 'Oct 20', status: 'Signed', statusClass: 'bg-primary/10 text-primary' },
  { name: 'Marketing Assets', icon: 'i-lucide-folder', iconColor: 'text-warning', size: '--', owner: 'Marketing', modified: 'Oct 01', status: '--', statusClass: 'text-muted' },
]
</script>
