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
        <span class="text-dimmed text-[10px]">app.assetcore.io/assets</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-boxes" class="size-3.5 text-white" />
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
          <UAvatar text="SA" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">All Assets</p>
            <p class="text-[9px] text-dimmed mt-0.5">5,234 total assets</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-search" class="size-3 text-dimmed" />
              <span class="text-[9px] text-dimmed">Search by name or ID…</span>
            </div>
            <UButton size="xs" label="Add Asset" icon="i-lucide-plus" color="primary" />
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-2 px-4 py-1.5 border-b border-default">
          <span v-for="cat in filterCats" :key="cat.label" :class="['text-[9px] px-2 py-0.5 rounded-full cursor-default font-medium', cat.active ? 'bg-primary/10 text-primary' : 'text-muted']">
            {{ cat.label }}
          </span>
        </div>

        <!-- Asset table -->
        <div class="flex-1 overflow-y-auto scrollbar">
          <table class="w-full">
            <thead>
              <tr class="border-b border-default bg-elevated">
                <th class="text-left px-4 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Asset</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Category</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Assignee</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in assets" :key="asset.id" class="border-b border-default last:border-0 hover:bg-muted/20">
                <td class="px-4 py-2">
                  <div class="flex items-center gap-2">
                    <div :class="['size-6 rounded-md flex items-center justify-center flex-shrink-0', asset.iconBg]">
                      <UIcon :name="asset.icon" :class="['size-3.5', asset.iconColor]" />
                    </div>
                    <div>
                      <p class="text-[10px] font-medium text-highlighted">{{ asset.name }}</p>
                      <p class="text-[8.5px] text-dimmed font-mono">{{ asset.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-2 py-2 text-[9.5px] text-muted">{{ asset.category }}</td>
                <td class="px-2 py-2 text-[9.5px] text-muted">{{ asset.assignee }}</td>
                <td class="px-2 py-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium" :class="asset.statusClass">{{ asset.status }}</span>
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
  { label: 'All Assets', icon: 'i-lucide-box', active: true },
  { label: 'Assigned', icon: 'i-lucide-user-check', active: false },
  { label: 'Maintenance', icon: 'i-lucide-wrench', active: false },
  { label: 'Hardware', icon: 'i-lucide-laptop', active: false },
  { label: 'Analytics', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const filterCats = [
  { label: 'All', active: true },
  { label: 'Hardware', active: false },
  { label: 'Software', active: false },
  { label: 'Furniture', active: false },
  { label: 'Vehicles', active: false },
]

const assets = [
  { id: 'AST-1001', name: 'MacBook Pro 16"', category: 'Hardware', assignee: 'John Doe', status: 'Deployed', statusClass: 'bg-success/10 text-success', icon: 'i-lucide-laptop', iconColor: 'text-primary', iconBg: 'bg-primary/10' },
  { id: 'AST-1002', name: 'Dell XPS 15', category: 'Hardware', assignee: 'Jane Smith', status: 'Deployed', statusClass: 'bg-success/10 text-success', icon: 'i-lucide-laptop', iconColor: 'text-primary', iconBg: 'bg-primary/10' },
  { id: 'AST-1003', name: 'Adobe Creative Cloud', category: 'Software', assignee: 'Marketing Team', status: 'Active', statusClass: 'bg-info/10 text-info', icon: 'i-lucide-code', iconColor: 'text-info', iconBg: 'bg-info/10' },
  { id: 'AST-1004', name: 'Ergonomic Chair', category: 'Furniture', assignee: 'Unassigned', status: 'In Storage', statusClass: 'bg-muted/50 text-muted', icon: 'i-lucide-armchair', iconColor: 'text-muted', iconBg: 'bg-muted/20' },
  { id: 'AST-1005', name: 'Toyota Hiace', category: 'Vehicles', assignee: 'Logistics Team', status: 'Maintenance', statusClass: 'bg-warning/10 text-warning', icon: 'i-lucide-car', iconColor: 'text-warning', iconBg: 'bg-warning/10' },
]
</script>
