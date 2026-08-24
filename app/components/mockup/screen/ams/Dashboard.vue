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
        <span class="text-dimmed text-[10px]">app.assetcore.io/dashboard</span>
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
            <p class="text-[11px] font-bold text-highlighted">Good morning, Admin 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">Aug 24, 2026 · 3 assets need attention</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="Add Asset" icon="i-lucide-plus" color="primary" />
          </div>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- KPI cards -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="kpi in kpiCards" :key="kpi.label" class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center justify-between mb-1.5">
                <p class="text-[9.5px] text-muted font-medium">{{ kpi.label }}</p>
                <UIcon :name="kpi.icon" class="size-3.5" :class="kpi.iconColor" />
              </div>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
              <p class="text-[9px] mt-0.5" :class="kpi.changeColor">{{ kpi.change }}</p>
            </div>
          </div>

          <!-- Activity + category breakdown -->
          <div class="grid grid-cols-5 gap-2">
            <!-- Recent activity -->
            <div class="col-span-3 rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 border-b border-default">
                <p class="text-[10px] font-semibold text-highlighted">Recent Activity</p>
                <span class="text-[9px] text-primary cursor-default">View all &rarr;</span>
              </div>
              <div class="divide-y divide-default">
                <div v-for="item in recentActivity" :key="item.title" class="flex items-center gap-2.5 px-3 py-2">
                  <div :class="['size-6 rounded-full flex items-center justify-center flex-shrink-0', item.bg]">
                    <UIcon :name="item.icon" :class="['size-3', item.color]" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-medium text-highlighted truncate">{{ item.title }}</p>
                    <p class="text-[9px] text-dimmed">{{ item.sub }}</p>
                  </div>
                  <span class="text-[8.5px] text-dimmed whitespace-nowrap">{{ item.time }}</span>
                </div>
              </div>
            </div>

            <!-- Category breakdown -->
            <div class="col-span-2 flex flex-col gap-2">
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Assets by Category</p>
                <div class="space-y-2">
                  <div v-for="cat in categories" :key="cat.name" class="flex items-center gap-2">
                    <span class="text-[9px] text-muted w-16 truncate">{{ cat.name }}</span>
                    <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-primary transition-all" :style="{ width: cat.pct + '%' }" />
                    </div>
                    <span class="text-[9px] text-dimmed w-6 text-right">{{ cat.count }}</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-default bg-elevated p-2.5">
                <p class="text-[10px] font-semibold text-highlighted mb-1.5">Pending Actions</p>
                <div class="space-y-1.5">
                  <div v-for="task in pendingTasks" :key="task.label" class="flex items-center gap-2">
                    <span :class="['size-1.5 rounded-full flex-shrink-0', task.dot]" />
                    <p class="text-[9px] text-highlighted truncate flex-1">{{ task.label }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'All Assets', icon: 'i-lucide-box', active: false },
  { label: 'Assigned', icon: 'i-lucide-user-check', active: false },
  { label: 'Maintenance', icon: 'i-lucide-wrench', active: false },
  { label: 'Hardware', icon: 'i-lucide-laptop', active: false },
  { label: 'Analytics', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Assets', value: '5,234', icon: 'i-lucide-boxes', iconColor: 'text-primary', change: '↑ 124 this month', changeColor: 'text-success' },
  { label: 'Maintenance Due', value: '18', icon: 'i-lucide-wrench', iconColor: 'text-warning', change: '3 critical', changeColor: 'text-error' },
  { label: 'Total Value', value: '₱12.4M', icon: 'i-lucide-circle-dollar-sign', iconColor: 'text-success', change: '↑ 2.1% YTD', changeColor: 'text-success' },
  { label: 'Active Alerts', value: '12', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: 'Requires review', changeColor: 'text-error' },
]

const recentActivity = [
  { icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', title: 'Laptop XPS-13 assigned to John', sub: 'IT Dept', time: '10m' },
  { icon: 'i-lucide-wrench', color: 'text-warning', bg: 'bg-warning/10', title: 'Printer PRN-001 maintenance', sub: 'Scheduled', time: '2h' },
  { icon: 'i-lucide-plus-circle', color: 'text-primary', bg: 'bg-primary/10', title: '20 monitors added to inventory', sub: 'Procurement', time: '5h' },
  { icon: 'i-lucide-arrow-right-left', color: 'text-info', bg: 'bg-info/10', title: 'Chairs relocated to 3rd Floor', sub: 'Facilities', time: 'Yesterday' },
]

const categories = [
  { name: 'Laptops', count: 1250, pct: 85 },
  { name: 'Monitors', count: 1500, pct: 95 },
  { name: 'Peripherals', count: 1800, pct: 100 },
  { name: 'Servers', count: 150, pct: 20 },
  { name: 'Furniture', count: 534, pct: 45 },
]

const pendingTasks = [
  { label: 'Approve IT Procurement', dot: 'bg-error' },
  { label: 'Renew Software Licenses', dot: 'bg-warning' },
  { label: 'Server Room Audit', dot: 'bg-primary' },
]
</script>
