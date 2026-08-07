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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/payroll</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-users" class="size-3.5 text-white" />
          </div>
        </div>
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
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="SC" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main payroll content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Payroll — August 2026</p>
            <p class="text-[9px] text-dimmed mt-0.5">342 employees · Due August 31</p>
          </div>
          <div class="flex items-center gap-2">
            <UButton size="xs" label="Export" icon="i-lucide-download" color="neutral" variant="outline" />
            <UButton size="xs" label="Run Payroll" icon="i-lucide-play" color="primary" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- Summary strip -->
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="s in summaryCards"
              :key="s.label"
              class="rounded-lg border border-default bg-elevated p-2.5"
            >
              <p class="text-[9px] text-muted mb-1">{{ s.label }}</p>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
              <p class="text-[8.5px] mt-0.5" :class="s.subtleClass">{{ s.sub }}</p>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="rounded-lg border border-default bg-elevated p-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-[10px] font-semibold text-highlighted">Payroll Run Progress</p>
              <span class="text-[9px] text-primary font-medium">72% processed</span>
            </div>
            <div class="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div class="h-full rounded-full bg-primary transition-all" style="width: 72%" />
            </div>
            <div class="flex justify-between mt-1.5">
              <span class="text-[8.5px] text-dimmed">247 of 342 employees</span>
              <span class="text-[8.5px] text-warning">95 pending approval</span>
            </div>
          </div>

          <!-- Employee payroll table -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-2 border-b border-default">
              <p class="text-[10px] font-semibold text-highlighted">Employee Pay Details</p>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1">
                  <UIcon name="i-lucide-search" class="size-2.5 text-dimmed" />
                  <span class="text-[9px] text-dimmed">Search...</span>
                </div>
              </div>
            </div>
            <table class="w-full">
              <thead>
                <tr class="border-b border-default">
                  <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Employee</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Department</th>
                  <th class="text-right px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Gross</th>
                  <th class="text-right px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Deductions</th>
                  <th class="text-right px-3 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Net Pay</th>
                  <th class="text-center px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in payrollRows"
                  :key="row.name"
                  class="border-b border-default last:border-0"
                >
                  <td class="px-3 py-1.5">
                    <div class="flex items-center gap-1.5">
                      <UAvatar :text="row.initials" size="2xs" :color="row.avatarColor" />
                      <span class="text-[10px] text-highlighted font-medium">{{ row.name }}</span>
                    </div>
                  </td>
                  <td class="px-2 py-1.5 text-[10px] text-muted">{{ row.dept }}</td>
                  <td class="px-2 py-1.5 text-[10px] text-highlighted text-right">{{ row.gross }}</td>
                  <td class="px-2 py-1.5 text-[10px] text-error text-right">{{ row.deductions }}</td>
                  <td class="px-3 py-1.5 text-[10px] font-semibold text-highlighted text-right">{{ row.net }}</td>
                  <td class="px-2 py-1.5 text-center">
                    <span
                      class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium"
                      :class="row.statusClass"
                    >{{ row.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Employees', icon: 'i-lucide-users', active: false },
  { label: 'Payroll', icon: 'i-lucide-banknote', active: true },
  { label: 'Time & Attendance', icon: 'i-lucide-clock', active: false },
  { label: 'Recruitment', icon: 'i-lucide-user-plus', active: false },
  { label: 'Performance', icon: 'i-lucide-trending-up', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const summaryCards = [
  { label: 'Total Gross Pay', value: '$347,200', sub: '+4.2% vs last month', subtleClass: 'text-success' },
  { label: 'Total Deductions', value: '$59,480', sub: 'Tax, SSS, PhilHealth', subtleClass: 'text-muted' },
  { label: 'Total Net Pay', value: '$287,720', sub: 'Ready to disburse', subtleClass: 'text-primary' },
]

const payrollRows = [
  { name: 'James Reyes', initials: 'JR', dept: 'Engineering', gross: '$9,500', deductions: '-$1,620', net: '$7,880', status: 'Processed', statusClass: 'bg-success/10 text-success', avatarColor: 'primary' as const },
  { name: 'Mia Santos', initials: 'MS', dept: 'Marketing', gross: '$7,200', deductions: '-$1,224', net: '$5,976', status: 'Processed', statusClass: 'bg-success/10 text-success', avatarColor: 'secondary' as const },
  { name: 'Carlos Wu', initials: 'CW', dept: 'Sales', gross: '$8,400', deductions: '-$1,428', net: '$6,972', status: 'Pending', statusClass: 'bg-warning/10 text-warning', avatarColor: 'neutral' as const },
  { name: 'Priya Lal', initials: 'PL', dept: 'HR', gross: '$6,800', deductions: '-$1,156', net: '$5,644', status: 'Pending', statusClass: 'bg-warning/10 text-warning', avatarColor: 'primary' as const },
  { name: 'Daniel Park', initials: 'DP', dept: 'Engineering', gross: '$10,200', deductions: '-$1,734', net: '$8,466', status: 'Processed', statusClass: 'bg-success/10 text-success', avatarColor: 'neutral' as const },
]
</script>
