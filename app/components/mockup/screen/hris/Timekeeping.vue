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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/timekeeping</span>
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
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
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
            <p class="text-[11px] font-bold text-highlighted">Timekeeping</p>
            <p class="text-[9px] text-dimmed mt-0.5">Monday, September 30, 2026</p>
          </div>
          <div class="flex items-center gap-1.5">
            <UButton size="xs" label="Add Shift" icon="i-lucide-calendar-plus" color="neutral" variant="outline" />
            <UButton size="xs" label="Export"    icon="i-lucide-download"       color="neutral" variant="outline" />
          </div>
        </div>

        <div class="flex flex-1 overflow-hidden">
          <!-- Left: attendance table -->
          <div class="flex-1 overflow-y-auto scrollbar px-3 py-2.5 space-y-2.5">
            <!-- Stat strip -->
            <div class="grid grid-cols-4 gap-1.5">
              <div v-for="s in statCards" :key="s.label" class="rounded-lg border border-default bg-elevated p-2">
                <div class="flex items-center gap-1 mb-1">
                  <UIcon :name="s.icon" class="size-2.5 text-muted" />
                  <p class="text-[8.5px] text-muted">{{ s.label }}</p>
                </div>
                <p class="text-sm font-bold text-highlighted">{{ s.value }}</p>
              </div>
            </div>

            <!-- Table header -->
            <div class="rounded-lg border border-default bg-elevated overflow-hidden">
              <div class="flex items-center justify-between px-3 py-1.5 border-b border-default bg-muted/30">
                <p class="text-[9.5px] font-semibold text-highlighted">Today's Log</p>
                <div class="flex items-center gap-1.5">
                  <span class="relative flex size-1.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span class="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  <span class="text-[8.5px] text-success font-medium">Live</span>
                </div>
              </div>
              <table class="w-full">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left px-3 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Employee</th>
                    <th class="text-left px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Time In</th>
                    <th class="text-left px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Hrs</th>
                    <th class="text-left px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Geo</th>
                    <th class="text-left px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="emp in attendanceLogs"
                    :key="emp.name"
                    class="border-b border-default last:border-0 hover:bg-muted/20"
                  >
                    <td class="px-3 py-1.5">
                      <div class="flex items-center gap-1.5">
                        <UAvatar :text="emp.initials" size="2xs" :color="emp.avatarColor" />
                        <div>
                          <p class="text-[10px] font-medium text-highlighted leading-tight">{{ emp.name }}</p>
                          <p class="text-[8px] text-dimmed leading-tight">{{ emp.dept }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-2 py-1.5 font-mono text-[9px]" :class="emp.timeIn === '—' ? 'text-dimmed' : 'text-highlighted'">{{ emp.timeIn }}</td>
                    <td class="px-2 py-1.5 font-mono text-[9px] text-info">{{ emp.hours }}</td>
                    <td class="px-2 py-1.5">
                      <span v-if="emp.geoTagged" class="text-[8.5px] text-success flex items-center gap-0.5">
                        <UIcon name="i-lucide-map-pin" class="size-2.5" />OK
                      </span>
                      <span v-else class="text-[8.5px] text-dimmed">—</span>
                    </td>
                    <td class="px-2 py-1.5">
                      <span
                        class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium"
                        :class="statusConfig[emp.status]"
                      >{{ emp.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right panel: shifts + leave -->
          <div class="w-[38%] border-l border-default flex-shrink-0 overflow-y-auto scrollbar px-3 py-2.5 space-y-2.5">
            <!-- Shift schedule -->
            <div class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9.5px] font-semibold text-highlighted mb-2">Shift Schedule</p>
              <div class="space-y-2">
                <div v-for="shift in shifts" :key="shift.label">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div :class="['size-5 rounded flex items-center justify-center flex-shrink-0', shift.bg]">
                      <UIcon name="i-lucide-clock" :class="['size-3', shift.color]" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-[9px] font-medium text-highlighted truncate">{{ shift.label }}</p>
                      <p class="text-[8px] text-muted">{{ shift.time }}</p>
                    </div>
                    <span class="text-[8.5px] text-muted bg-muted rounded px-1">{{ shift.employees }}</span>
                  </div>
                  <div class="flex items-center gap-1 pl-6">
                    <div class="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div class="h-full rounded-full bg-primary/50" :style="`width:${shift.util}%`" />
                    </div>
                    <span class="text-[7.5px] text-dimmed">{{ shift.util }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Leave requests -->
            <div class="rounded-lg border border-default bg-elevated p-2.5">
              <div class="flex items-center justify-between mb-2">
                <p class="text-[9.5px] font-semibold text-highlighted">Leave Requests</p>
                <span class="text-[8px] bg-warning/10 text-warning rounded-full px-1.5 py-0.5">2 Pending</span>
              </div>
              <div class="space-y-2">
                <div v-for="req in leaveRequests" :key="req.name" class="flex items-start gap-2 pb-2 border-b border-default last:border-0 last:pb-0">
                  <UAvatar :text="req.initials" size="2xs" :color="req.color" class="mt-0.5" />
                  <div class="flex-1 min-w-0">
                    <p class="text-[9px] font-medium text-highlighted">{{ req.name }}</p>
                    <p class="text-[8px] text-muted">{{ req.type }} · {{ req.days }}d</p>
                  </div>
                  <span
                    class="text-[8px] font-medium px-1.5 py-0.5 rounded-full shrink-0"
                    :class="req.status === 'Approved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'"
                  >{{ req.status }}</span>
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
  { label: 'Dashboard',    icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Employees',    icon: 'i-lucide-users',            active: false },
  { label: 'Timekeeping',  icon: 'i-lucide-clock',            active: true  },
  { label: 'Payroll',      icon: 'i-lucide-banknote',         active: false },
  { label: 'Recruitment',  icon: 'i-lucide-user-plus',        active: false },
  { label: 'Learning',     icon: 'i-lucide-book-open',        active: false },
  { label: 'Performance',  icon: 'i-lucide-trending-up',      active: false },
  { label: 'Self-Service', icon: 'i-lucide-user-cog',         active: false },
  { label: 'Analytics',    icon: 'i-lucide-bar-chart-2',      active: false },
]

const statCards = [
  { label: 'Present',     value: '318', icon: 'i-lucide-check-circle'  },
  { label: 'On Leave',    value: '18',  icon: 'i-lucide-plane-takeoff' },
  { label: 'Late',        value: '7',   icon: 'i-lucide-alarm-clock'   },
  { label: 'WFH',         value: '45',  icon: 'i-lucide-home'          },
]

const statusConfig: Record<string, string> = {
  'Present':  'bg-success/10 text-success',
  'On Leave': 'bg-warning/10 text-warning',
  'Late':     'bg-error/10 text-error',
  'Absent':   'bg-muted text-dimmed',
}

const attendanceLogs = [
  { name: 'James Reyes',   initials: 'JR', dept: 'Engineering', timeIn: '08:52', hours: '8h 13m', status: 'Present',  geoTagged: true,  avatarColor: 'primary'   as const },
  { name: 'Mia Santos',    initials: 'MS', dept: 'Marketing',   timeIn: '—',     hours: '—',      status: 'On Leave', geoTagged: false, avatarColor: 'secondary' as const },
  { name: 'Carlos Wu',     initials: 'CW', dept: 'Sales',       timeIn: '09:15', hours: '8h 45m', status: 'Late',     geoTagged: true,  avatarColor: 'neutral'   as const },
  { name: 'Priya Lal',     initials: 'PL', dept: 'HR & Admin',  timeIn: '08:30', hours: '9h 00m', status: 'Present',  geoTagged: true,  avatarColor: 'primary'   as const },
  { name: 'Ryan Cruz',     initials: 'RC', dept: 'Engineering', timeIn: '09:01', hours: '—',      status: 'Present',  geoTagged: true,  avatarColor: 'success'   as const },
  { name: 'Ben Torres',    initials: 'BT', dept: 'Sales',       timeIn: '10:05', hours: '—',      status: 'Late',     geoTagged: false, avatarColor: 'secondary' as const },
]

const shifts = [
  { label: 'Morning Shift', time: '6 AM – 2 PM',  employees: 120, color: 'text-warning', bg: 'bg-warning/10', util: 95 },
  { label: 'Regular Shift', time: '8 AM – 5 PM',  employees: 185, color: 'text-primary', bg: 'bg-primary/10', util: 88 },
  { label: 'Evening Shift', time: '2 PM – 10 PM', employees: 37,  color: 'text-info',    bg: 'bg-info/10',    util: 72 },
]

const leaveRequests = [
  { name: 'Lena Park',  initials: 'LP', type: 'Vacation',   days: 5, status: 'Pending',  color: 'error'     as const },
  { name: 'Ben Torres', initials: 'BT', type: 'Sick Leave', days: 1, status: 'Pending',  color: 'secondary' as const },
  { name: 'Ryan Cruz',  initials: 'RC', type: 'Emergency',  days: 1, status: 'Approved', color: 'success'   as const },
]
</script>
