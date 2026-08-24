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
        <span class="text-dimmed text-[10px]">app.linkagescore.io/dashboard</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-globe" class="size-3.5 text-white" />
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
          <UAvatar text="LD" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Good morning, Director 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">Aug 24, 2026 · 4 MOUs expiring soon</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="New Partnership" icon="i-lucide-plus" color="primary" />
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

          <!-- Activity + globe stat -->
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

            <!-- Stats breakdown -->
            <div class="col-span-2 flex flex-col gap-2">
              <div class="rounded-lg border border-default bg-elevated p-3 flex-1 flex flex-col items-center justify-center">
                <UIcon name="i-lucide-globe" class="size-10 text-primary mb-2 opacity-80" />
                <p class="text-[10px] font-semibold text-highlighted mb-1">Global Footprint</p>
                <p class="text-[9px] text-muted text-center">Active partnerships in <span class="font-bold text-highlighted">42 countries</span> across 5 continents.</p>
              </div>
              <div class="rounded-lg border border-default bg-elevated p-2.5">
                <p class="text-[10px] font-semibold text-highlighted mb-1.5">Action Items</p>
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
  { label: 'Institutions', icon: 'i-lucide-building-2', active: false },
  { label: 'MOUs', icon: 'i-lucide-file-text', active: false },
  { label: 'Mobility', icon: 'i-lucide-plane', active: false },
  { label: 'Grants', icon: 'i-lucide-badge-dollar-sign', active: false },
  { label: 'Analytics', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Active Partners', value: '142', icon: 'i-lucide-building', iconColor: 'text-primary', change: '↑ 12 this year', changeColor: 'text-success' },
  { label: 'Active MOUs', value: '186', icon: 'i-lucide-file-signature', iconColor: 'text-info', change: '4 expiring soon', changeColor: 'text-warning' },
  { label: 'Exchange Students', value: '84', icon: 'i-lucide-users', iconColor: 'text-success', change: '45 In / 39 Out', changeColor: 'text-muted' },
  { label: 'Grant Funding', value: '$2.4M', icon: 'i-lucide-badge-dollar-sign', iconColor: 'text-warning', change: '↑ 15% YoY', changeColor: 'text-success' },
]

const recentActivity = [
  { icon: 'i-lucide-file-check', color: 'text-success', bg: 'bg-success/10', title: 'MOU signed with Univ. of Tokyo', sub: 'Research Collaboration', time: '2h' },
  { icon: 'i-lucide-plane', color: 'text-primary', bg: 'bg-primary/10', title: '12 Outbound applications received', sub: 'Fall 2026 Semester', time: '5h' },
  { icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', title: 'MOU with UNSW expiring in 30 days', sub: 'Action required', time: '1d' },
  { icon: 'i-lucide-badge-dollar-sign', color: 'text-info', bg: 'bg-info/10', title: 'Erasmus+ Grant approved', sub: 'Faculty Mobility Program', time: '2d' },
]

const pendingTasks = [
  { label: 'Review MOU Draft - NUS', dot: 'bg-error' },
  { label: 'Approve Inbound Visas (x5)', dot: 'bg-warning' },
  { label: 'Submit CHED Linkages Report', dot: 'bg-primary' },
]
</script>
