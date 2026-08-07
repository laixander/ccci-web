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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/dashboard</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <!-- Logo -->
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-users" class="size-3.5 text-white" />
          </div>
        </div>
        <!-- Nav icons -->
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <!-- User avatar -->
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="SC" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Good morning, Sarah 👋</p>
            <p class="text-[9px] text-dimmed mt-0.5">August 7, 2026 · 9 employees need attention</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-4 text-muted" />
              <span class="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
            </div>
            <UButton size="xs" label="Run Payroll" icon="i-lucide-play" color="primary" />
          </div>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- KPI cards -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="kpi in kpiCards"
              :key="kpi.label"
              class="rounded-lg border border-default bg-elevated p-2.5"
            >
              <div class="flex items-center justify-between mb-1.5">
                <p class="text-[9.5px] text-muted font-medium">{{ kpi.label }}</p>
                <UIcon :name="kpi.icon" class="size-3.5" :class="kpi.iconColor" />
              </div>
              <p class="text-sm font-bold text-highlighted">{{ kpi.value }}</p>
              <p class="text-[9px] mt-0.5" :class="kpi.changeColor">{{ kpi.change }}</p>
            </div>
          </div>

          <!-- Employee table + mini chart row -->
          <div class="grid grid-cols-5 gap-2">
            <!-- Employee table -->
            <div class="col-span-3 rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-2 border-b border-default">
                <p class="text-[10px] font-semibold text-highlighted">Recent Activity</p>
                <span class="text-[9px] text-primary cursor-default">View all &rarr;</span>
              </div>
              <table class="w-full">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Employee</th>
                    <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Dept</th>
                    <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="emp in employees"
                    :key="emp.name"
                    class="border-b border-default last:border-0"
                  >
                    <td class="px-3 py-1.5">
                      <div class="flex items-center gap-1.5">
                        <UAvatar :text="emp.initials" size="2xs" :color="emp.avatarColor" />
                        <span class="text-[10px] text-highlighted font-medium">{{ emp.name }}</span>
                      </div>
                    </td>
                    <td class="px-2 py-1.5 text-[10px] text-muted">{{ emp.dept }}</td>
                    <td class="px-2 py-1.5">
                      <span
                        class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-medium"
                        :class="emp.statusClass"
                      >{{ emp.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Payroll summary card -->
            <div class="col-span-2 rounded-lg border border-default bg-elevated p-3 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-semibold text-highlighted">Payroll Summary</p>
                <span class="text-[9px] text-dimmed">Aug 2026</span>
              </div>
              <!-- Donut visual -->
              <div class="flex items-center justify-center my-1">
                <div
                  class="size-14 rounded-full flex items-center justify-center"
                  :style="donutStyle"
                >
                  <div class="size-10 rounded-full bg-elevated flex items-center justify-center">
                    <span class="text-[9px] font-bold text-highlighted">72%</span>
                  </div>
                </div>
              </div>
              <div class="space-y-1">
                <div v-for="item in payrollBreakdown" :key="item.label" class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full" :class="item.dotClass" />
                    <span class="text-[9.5px] text-muted">{{ item.label }}</span>
                  </div>
                  <span class="text-[9.5px] font-semibold text-highlighted">{{ item.value }}</span>
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
    background: `conic-gradient(#3b82f6 0% 72%, ${neutral} 72% 85%, #1d4ed8 85% 100%)`,
  }
})

const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'Employees', icon: 'i-lucide-users', active: false },
  { label: 'Payroll', icon: 'i-lucide-banknote', active: false },
  { label: 'Time & Attendance', icon: 'i-lucide-clock', active: false },
  { label: 'Recruitment', icon: 'i-lucide-user-plus', active: false },
  { label: 'Performance', icon: 'i-lucide-trending-up', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const kpiCards = [
  { label: 'Total Employees', value: '342', icon: 'i-lucide-users', iconColor: 'text-primary', change: '↑ 12 this month', changeColor: 'text-success' },
  { label: 'On Leave Today', value: '18', icon: 'i-lucide-plane-takeoff', iconColor: 'text-warning', change: '↓ 3 from yesterday', changeColor: 'text-muted' },
  { label: 'Payroll Due', value: '$287k', icon: 'i-lucide-banknote', iconColor: 'text-primary', change: '↑ 4.2% vs last mo.', changeColor: 'text-muted' },
  { label: 'Open Positions', value: '9', icon: 'i-lucide-briefcase', iconColor: 'text-info', change: '3 interviews today', changeColor: 'text-info' },
]

const employees = [
  { name: 'James Reyes', initials: 'JR', dept: 'Engineering', status: 'Active', statusClass: 'bg-success/10 text-success', avatarColor: 'primary' as const },
  { name: 'Mia Santos', initials: 'MS', dept: 'Marketing', status: 'On Leave', statusClass: 'bg-warning/10 text-warning', avatarColor: 'secondary' as const },
  { name: 'Carlos Wu', initials: 'CW', dept: 'Sales', status: 'Active', statusClass: 'bg-success/10 text-success', avatarColor: 'neutral' as const },
  { name: 'Priya Lal', initials: 'PL', dept: 'HR', status: 'Active', statusClass: 'bg-success/10 text-success', avatarColor: 'primary' as const },
]

const payrollBreakdown = [
  { label: 'Net Salaries', value: '$207k', dotClass: 'bg-primary' },
  { label: 'Tax & Gov\'t', value: '$54k', dotClass: 'bg-neutral-300 dark:bg-neutral-600' },
  { label: 'Benefits', value: '$26k', dotClass: 'bg-blue-700' },
]
</script>
