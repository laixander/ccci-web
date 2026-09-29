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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/employees</span>
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

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Employees</p>
            <p class="text-[9px] text-dimmed mt-0.5">Manage your 342 team members</p>
          </div>
          <UButton size="xs" label="Add Employee" icon="i-lucide-user-plus" color="primary" />
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-4 py-3 space-y-3">
          <!-- Stat strip -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="s in statCards"
              :key="s.label"
              class="rounded-lg border border-default bg-elevated p-2.5"
            >
              <div class="flex items-center gap-1.5 mb-1">
                <UIcon :name="s.icon" class="size-3 text-muted" />
                <p class="text-[9px] text-muted">{{ s.label }}</p>
              </div>
              <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
              <p class="text-[8.5px] mt-0.5" :class="s.subtleClass">{{ s.sub }}</p>
            </div>
          </div>

          <!-- Filters bar -->
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1.5 bg-muted rounded-md px-2 py-1 flex-1">
              <UIcon name="i-lucide-search" class="size-2.5 text-dimmed" />
              <span class="text-[9px] text-dimmed">Search employees…</span>
            </div>
            <div class="bg-muted rounded-md px-2 py-1 flex items-center gap-1">
              <UIcon name="i-lucide-filter" class="size-2.5 text-dimmed" />
              <span class="text-[9px] text-dimmed">All Departments</span>
            </div>
            <div class="bg-muted rounded-md px-2 py-1 flex items-center gap-1">
              <span class="text-[9px] text-dimmed">All Statuses</span>
            </div>
            <span class="text-[9px] text-muted ml-auto">8 results</span>
          </div>

          <!-- Employee table -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-default bg-muted/40">
                  <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-semibold uppercase tracking-wide">Employee</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-semibold uppercase tracking-wide">Department</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-semibold uppercase tracking-wide">Status</th>
                  <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-semibold uppercase tracking-wide">Joined</th>
                  <th class="text-left px-3 py-1.5 text-[9px] text-dimmed font-semibold uppercase tracking-wide">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="emp in employees"
                  :key="emp.id"
                  class="border-b border-default last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td class="px-3 py-1.5">
                    <div class="flex items-center gap-1.5">
                      <UAvatar :text="emp.initials" size="2xs" :color="emp.avatarColor" />
                      <div>
                        <p class="text-[10px] text-highlighted font-medium leading-tight">{{ emp.name }}</p>
                        <p class="text-[8.5px] text-dimmed leading-tight">{{ emp.id }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-2 py-1.5">
                    <span class="text-[9px] bg-muted text-muted rounded px-1.5 py-0.5">{{ emp.dept }}</span>
                  </td>
                  <td class="px-2 py-1.5">
                    <span
                      class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium"
                      :class="statusConfig[emp.status]"
                    >{{ emp.status }}</span>
                  </td>
                  <td class="px-2 py-1.5 text-[9px] text-muted">{{ emp.joined }}</td>
                  <td class="px-3 py-1.5 text-[9px] text-muted">{{ emp.email }}</td>
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
  { label: 'Dashboard',   icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Employees',   icon: 'i-lucide-users',            active: true  },
  { label: 'Payroll',     icon: 'i-lucide-banknote',         active: false },
  { label: 'Time & Att.', icon: 'i-lucide-clock',            active: false },
  { label: 'Recruitment', icon: 'i-lucide-user-plus',        active: false },
  { label: 'Performance', icon: 'i-lucide-trending-up',      active: false },
  { label: 'Analytics',   icon: 'i-lucide-bar-chart-2',      active: false },
  { label: 'Settings',    icon: 'i-lucide-settings',         active: false },
]

const statCards = [
  { label: 'Total Employees', value: '342', sub: '+3 this month',    subtleClass: 'text-success', icon: 'i-lucide-users'         },
  { label: 'Active',          value: '298', sub: '87% of workforce', subtleClass: 'text-muted',   icon: 'i-lucide-check-circle'  },
  { label: 'On Leave',        value: '26',  sub: '8 approved today', subtleClass: 'text-warning',  icon: 'i-lucide-calendar'      },
  { label: 'Probationary',    value: '18',  sub: '4 ending soon',    subtleClass: 'text-info',     icon: 'i-lucide-clock'         },
]

const statusConfig: Record<string, string> = {
  'Active':      'bg-success/10 text-success',
  'On Leave':    'bg-warning/10 text-warning',
  'Probation':   'bg-info/10 text-info',
  'Offboarding': 'bg-error/10 text-error',
}

const employees = [
  { id: 'E001', name: 'James Reyes',   initials: 'JR', dept: 'Engineering', status: 'Active',    joined: 'Jan 2022', email: 'james.reyes@company.com',  avatarColor: 'primary'   as const },
  { id: 'E002', name: 'Mia Santos',    initials: 'MS', dept: 'Marketing',   status: 'On Leave',  joined: 'Mar 2021', email: 'mia.santos@company.com',   avatarColor: 'secondary' as const },
  { id: 'E003', name: 'Carlos Wu',     initials: 'CW', dept: 'Sales',       status: 'Active',    joined: 'Jun 2023', email: 'carlos.wu@company.com',    avatarColor: 'neutral'   as const },
  { id: 'E004', name: 'Priya Lal',     initials: 'PL', dept: 'HR & Admin',  status: 'Active',    joined: 'Nov 2020', email: 'priya.lal@company.com',    avatarColor: 'primary'   as const },
  { id: 'E005', name: 'Ryan Cruz',     initials: 'RC', dept: 'Engineering', status: 'Probation', joined: 'Jul 2026', email: 'ryan.cruz@company.com',    avatarColor: 'success'   as const },
  { id: 'E006', name: 'Ana Dela Cruz', initials: 'AD', dept: 'Operations',  status: 'Active',    joined: 'Feb 2022', email: 'ana.delacruz@company.com', avatarColor: 'warning'   as const },
]
</script>
