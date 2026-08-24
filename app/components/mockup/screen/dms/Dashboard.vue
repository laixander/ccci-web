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
        <span class="text-dimmed text-[10px]">app.docucore.io/dashboard</span>
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
            <p class="text-[11px] font-bold text-highlighted">Good morning, Alex 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">Aug 24, 2026 · 5 documents need your attention</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="Upload" icon="i-lucide-upload-cloud" color="primary" />
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

          <!-- Activity + storage row -->
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
                    <p class="text-[9px] text-dimmed truncate">{{ item.sub }}</p>
                  </div>
                  <span class="text-[8.5px] text-dimmed whitespace-nowrap">{{ item.time }}</span>
                </div>
              </div>
            </div>

            <!-- Storage + pending -->
            <div class="col-span-2 flex flex-col gap-2">
              <!-- Storage -->
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Storage Usage</p>
                <div class="flex items-center justify-center my-1">
                  <div class="size-14 rounded-full flex items-center justify-center" :style="donutStyle">
                    <div class="size-10 rounded-full bg-elevated flex items-center justify-center">
                      <span class="text-[9px] font-bold text-highlighted">45%</span>
                    </div>
                  </div>
                </div>
                <p class="text-[9px] text-center text-muted mt-1">458 GB of 1 TB used</p>
              </div>
              <!-- Pending tasks -->
              <div class="rounded-lg border border-default bg-elevated p-2.5">
                <p class="text-[10px] font-semibold text-highlighted mb-2">Pending Actions</p>
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
const colorMode = useColorMode()

const donutStyle = computed(() => {
  const isDark = colorMode.value === 'dark'
  const neutral = isDark ? '#374151' : '#e5e7eb'
  return {
    background: `conic-gradient(var(--ui-primary) 0% 45%, ${neutral} 45% 100%)`,
  }
})

const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'Documents', icon: 'i-lucide-files', active: false },
  { label: 'Shared', icon: 'i-lucide-users', active: false },
  { label: 'Starred', icon: 'i-lucide-star', active: false },
  { label: 'Approvals', icon: 'i-lucide-check-circle', active: false },
  { label: 'Signatures', icon: 'i-lucide-pen-tool', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Documents', value: '14,823', icon: 'i-lucide-file-text', iconColor: 'text-primary', change: '↑ 242 this week', changeColor: 'text-success' },
  { label: 'Pending Approvals', value: '34', icon: 'i-lucide-clock', iconColor: 'text-warning', change: '5 urgent', changeColor: 'text-error' },
  { label: 'Storage Used', value: '458 GB', icon: 'i-lucide-hard-drive', iconColor: 'text-info', change: '45.8% of 1 TB', changeColor: 'text-muted' },
  { label: 'Active Users', value: '128', icon: 'i-lucide-users', iconColor: 'text-success', change: '↑ 12 this month', changeColor: 'text-success' },
]

const recentActivity = [
  { icon: 'i-lucide-file-plus', color: 'text-success', bg: 'bg-success/10', title: 'Q3 Financial Report uploaded', sub: 'Jane Doe · Finance', time: '10m' },
  { icon: 'i-lucide-check-circle', color: 'text-primary', bg: 'bg-primary/10', title: 'Vendor Contract Approved', sub: 'John Smith · Legal', time: '1h' },
  { icon: 'i-lucide-edit', color: 'text-warning', bg: 'bg-warning/10', title: 'Handbook v2.1 updated', sub: 'HR Dept', time: '3h' },
  { icon: 'i-lucide-share-2', color: 'text-info', bg: 'bg-info/10', title: 'Marketing Assets shared', sub: 'Marketing Team', time: '5h' },
]

const pendingTasks = [
  { label: 'Review NDA - Acme Corp', dot: 'bg-error' },
  { label: 'Sign Q2 Board Minutes', dot: 'bg-primary' },
  { label: 'Approve Leave Request', dot: 'bg-warning' },
]
</script>
