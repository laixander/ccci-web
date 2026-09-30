<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const today = new Date()
const dateStr = today.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Present Today',  value: '318', icon: 'i-lucide-check-circle',    color: 'text-success', bg: 'bg-success/10' },
  { label: 'On Leave',       value: '18',  icon: 'i-lucide-plane-takeoff',   color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Late Arrivals',  value: '7',   icon: 'i-lucide-alarm-clock',     color: 'text-error',   bg: 'bg-error/10'   },
  { label: 'WFH Today',      value: '45',  icon: 'i-lucide-home',            color: 'text-info',    bg: 'bg-info/10'    },
]

// ── Attendance log ─────────────────────────────────────────────────────────────
const attendanceLog = ref([
  { id: 'E001', name: 'James Reyes',    initials: 'JR', dept: 'Engineering', timeIn: '08:52', timeOut: '17:05', hoursWorked: '8h 13m', status: 'Present', type: 'Office', geoTagged: true,  color: 'primary'   as const },
  { id: 'E002', name: 'Mia Santos',     initials: 'MS', dept: 'Marketing',   timeIn: '—',     timeOut: '—',     hoursWorked: '—',      status: 'On Leave', type: '—',     geoTagged: false, color: 'secondary' as const },
  { id: 'E003', name: 'Carlos Wu',      initials: 'CW', dept: 'Sales',       timeIn: '09:15', timeOut: '18:00', hoursWorked: '8h 45m', status: 'Late',    type: 'Office', geoTagged: true,  color: 'neutral'   as const },
  { id: 'E004', name: 'Priya Lal',      initials: 'PL', dept: 'HR & Admin',  timeIn: '08:30', timeOut: '17:30', hoursWorked: '9h 00m', status: 'Present', type: 'WFH',    geoTagged: true,  color: 'primary'   as const },
  { id: 'E005', name: 'Ryan Cruz',      initials: 'RC', dept: 'Engineering', timeIn: '09:01', timeOut: '—',     hoursWorked: '—',      status: 'Present', type: 'Office', geoTagged: true,  color: 'success'   as const },
  { id: 'E006', name: 'Ana Dela Cruz',  initials: 'AD', dept: 'Operations',  timeIn: '08:45', timeOut: '—',     hoursWorked: '—',      status: 'Present', type: 'WFH',    geoTagged: true,  color: 'warning'   as const },
  { id: 'E007', name: 'Ben Torres',     initials: 'BT', dept: 'Sales',       timeIn: '10:05', timeOut: '—',     hoursWorked: '—',      status: 'Late',    type: 'Office', geoTagged: false, color: 'secondary' as const },
  { id: 'E008', name: 'Lena Park',      initials: 'LP', dept: 'Marketing',   timeIn: '08:00', timeOut: '16:00', hoursWorked: '8h 00m', status: 'Present', type: 'Office', geoTagged: true,  color: 'error'     as const },
])

const statusConfig: Record<string, string> = {
  'Present':  'bg-success/10 text-success',
  'On Leave': 'bg-warning/10 text-warning',
  'Late':     'bg-error/10 text-error',
  'Absent':   'bg-muted text-dimmed',
}

const logColumns = [
  { accessorKey: 'employee',     header: 'Employee'      },
  { accessorKey: 'timeIn',       header: 'Time In'       },
  { accessorKey: 'timeOut',      header: 'Time Out'      },
  { accessorKey: 'hoursWorked',  header: 'Hours Worked'  },
  { accessorKey: 'type',         header: 'Type'          },
  { accessorKey: 'geoTagged',    header: 'Geo-Tag'       },
  { accessorKey: 'status',       header: 'Status'        },
]

// ── Shifts ────────────────────────────────────────────────────────────────────
const shifts = [
  { label: 'Morning Shift',  time: '6:00 AM – 2:00 PM',   employees: 120, color: 'text-warning', bg: 'bg-warning/10', utilization: 95 },
  { label: 'Regular Shift',  time: '8:00 AM – 5:00 PM',   employees: 185, color: 'text-primary', bg: 'bg-primary/10', utilization: 88 },
  { label: 'Evening Shift',  time: '2:00 PM – 10:00 PM',  employees: 37,  color: 'text-info',    bg: 'bg-info/10',    utilization: 72 },
]

// ── Leave requests ─────────────────────────────────────────────────────────────
const leaveRequests = ref([
  { name: 'Lena Park',     initials: 'LP', type: 'Vacation',    from: 'Oct 6',  to: 'Oct 10', days: 5, reason: 'Family trip',        status: 'Pending',  color: 'error'     as const },
  { name: 'Ben Torres',    initials: 'BT', type: 'Sick Leave',  from: 'Oct 3',  to: 'Oct 3',  days: 1, reason: 'Medical appointment', status: 'Pending',  color: 'secondary' as const },
  { name: 'Ryan Cruz',     initials: 'RC', type: 'Emergency',   from: 'Sep 30', to: 'Sep 30', days: 1, reason: 'Family emergency',    status: 'Approved', color: 'success'   as const },
])

function approveLeave(idx: number) { const r = leaveRequests.value[idx]; if (r) r.status = 'Approved' }
function rejectLeave(idx: number)  { const r = leaveRequests.value[idx]; if (r) r.status = 'Rejected'  }

// ── Weekly overtime ───────────────────────────────────────────────────────────
const overtimeLog = ref([
  { name: 'James Reyes',   initials: 'JR', color: 'primary'   as const, hours: '4.5h', approved: true  },
  { name: 'Ana Dela Cruz', initials: 'AD', color: 'warning'   as const, hours: '2.0h', approved: false },
  { name: 'Carlos Wu',     initials: 'CW', color: 'neutral'   as const, hours: '3.0h', approved: true  },
])

// ── Modal ─────────────────────────────────────────────────────────────────────
const showDetailModal = ref(false)
const selectedLog = ref<typeof attendanceLog.value[0] | null>(null)
function viewLog(row: typeof attendanceLog.value[0]) {
  selectedLog.value = row
  showDetailModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Timekeeping</h1>
        <p class="text-muted text-sm mt-1">{{ dateStr }}</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-calendar-plus" label="Add Shift"   color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-download"       label="Export Log" color="neutral" variant="outline" size="sm" />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
            <p class="text-xs text-muted">{{ stat.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Attendance Log (2/3 width) -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Today's Timekeeping Log</h2>
            <UBadge color="success" variant="subtle" :ui="{ base: 'flex items-center gap-2' }">
              <span class="relative flex size-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span class="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Live
            </UBadge>
          </div>
        </template>
        <div class="overflow-x-auto">
          <UTable
            :data="attendanceLog"
            :columns="logColumns"
            class="scrollbar w-full text-sm"
            :ui="{
              th: 'text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider',
              td: 'px-4 py-3.5',
              tr: 'hover:bg-muted/30 transition-colors cursor-pointer'
            }"
            @select="(_, row) => viewLog(row.original)"
          >
            <template #employee-cell="{ row }">
              <div class="flex items-center gap-3">
                <UAvatar :text="row.original.initials" size="sm" :color="row.original.color" />
                <div>
                  <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                  <p class="text-xs text-dimmed">{{ row.original.dept }}</p>
                </div>
              </div>
            </template>
            <template #timeIn-cell="{ row }">
              <span class="font-mono text-sm" :class="row.original.timeIn === '—' ? 'text-dimmed' : 'text-highlighted'">{{ row.original.timeIn }}</span>
            </template>
            <template #timeOut-cell="{ row }">
              <span class="font-mono text-sm text-dimmed">{{ row.original.timeOut }}</span>
            </template>
            <template #hoursWorked-cell="{ row }">
              <span class="font-mono text-sm" :class="row.original.hoursWorked === '—' ? 'text-dimmed' : 'text-info'">{{ row.original.hoursWorked }}</span>
            </template>
            <template #type-cell="{ row }">
              <UBadge v-if="row.original.type !== '—'" :label="row.original.type" color="neutral" variant="subtle" size="sm" />
              <span v-else class="text-dimmed">—</span>
            </template>
            <template #geoTagged-cell="{ row }">
              <span v-if="row.original.geoTagged" class="inline-flex items-center gap-1 text-xs text-success">
                <UIcon name="i-lucide-map-pin" class="size-3.5" />Verified
              </span>
              <span v-else class="text-xs text-dimmed">—</span>
            </template>
            <template #status-cell="{ row }">
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="statusConfig[row.original.status]"
              >{{ row.original.status }}</span>
            </template>
            <template #empty>
              <div class="py-16 flex flex-col items-center justify-center">
                <UEmpty icon="i-lucide-clock" title="No timekeeping records" description="No logs available for today." />
              </div>
            </template>
          </UTable>
        </div>
      </UCard>

      <!-- Right column -->
      <div class="space-y-4">
        <!-- Shift Overview -->
        <UCard title="Shift Schedule">
          <div class="space-y-4">
            <div v-for="shift in shifts" :key="shift.label" class="space-y-1.5">
              <div class="flex items-center gap-3">
                <div :class="['size-9 rounded-lg flex items-center justify-center flex-shrink-0', shift.bg]">
                  <UIcon name="i-lucide-clock" :class="['size-4', shift.color]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-highlighted">{{ shift.label }}</p>
                  <p class="text-xs text-muted">{{ shift.time }}</p>
                </div>
                <UBadge :label="String(shift.employees)" color="neutral" variant="subtle" size="sm" />
              </div>
              <!-- Utilization bar -->
              <div class="flex items-center gap-2 pl-12">
                <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full bg-primary/60 transition-all" :style="`width: ${shift.utilization}%`" />
                </div>
                <span class="text-[10px] text-dimmed w-8 text-right">{{ shift.utilization }}%</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Weekly Overtime -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Overtime This Week</h2>
              <UBadge label="3 pending" color="warning" variant="subtle" />
            </div>
          </template>
          <div class="space-y-3">
            <div v-for="ot in overtimeLog" :key="ot.name" class="flex items-center gap-3">
              <UAvatar :text="ot.initials" size="sm" :color="ot.color" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-highlighted">{{ ot.name }}</p>
                <p class="text-xs text-muted font-mono">{{ ot.hours }} OT</p>
              </div>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-full"
                :class="ot.approved ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'"
              >{{ ot.approved ? 'Approved' : 'Pending' }}</span>
            </div>
          </div>
        </UCard>

        <!-- Leave Requests -->
        <UCard :ui="{ body: 'sm:p-4 space-y-3' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Leave Requests</h2>
              <UBadge :label="String(leaveRequests.filter(l => l.status === 'Pending').length)" color="warning" variant="subtle" />
            </div>
          </template>
          <UCard v-for="(req, idx) in leaveRequests" :key="req.name" :ui="{ body: 'sm:p-4 space-y-3' }">
            <div class="flex items-start gap-3">
              <UAvatar :text="req.initials" size="sm" :color="req.color" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-highlighted">{{ req.name }}</p>
                <p class="text-xs text-muted">{{ req.type }} · {{ req.from }}<span v-if="req.from !== req.to"> – {{ req.to }}</span> ({{ req.days }}d)</p>
                <p class="text-xs text-dimmed mt-0.5 italic">"{{ req.reason }}"</p>
              </div>
              <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', req.status === 'Approved' ? 'bg-success/10 text-success' : req.status === 'Rejected' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning']">
                {{ req.status }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <template v-if="req.status === 'Pending'">
                <UButton block label="Approve" size="sm" color="success" variant="subtle" icon="i-lucide-check" class="flex-1" @click="approveLeave(idx)" />
                <UButton block label="Reject"  size="sm" color="error"   variant="subtle" icon="i-lucide-x"     class="flex-1" @click="rejectLeave(idx)" />
              </template>
            </div>
          </UCard>
        </UCard>
      </div>
    </div>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedLog?.name || ''" description="Timekeeping Detail">
      <template #body>
        <div v-if="selectedLog" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedLog.initials" size="xl" :color="selectedLog.color" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedLog.name }}</p>
              <p class="text-muted">{{ selectedLog.dept }} · {{ selectedLog.id }}</p>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2"
                :class="statusConfig[selectedLog.status]"
              >{{ selectedLog.status }}</span>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Time In</p>
              <p class="text-highlighted font-mono font-medium">{{ selectedLog.timeIn }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Time Out</p>
              <p class="text-highlighted font-mono font-medium">{{ selectedLog.timeOut }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Hours Worked</p>
              <p class="text-highlighted font-mono font-medium">{{ selectedLog.hoursWorked }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Work Type</p>
              <p class="text-highlighted font-medium">{{ selectedLog.type }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Geo-Tag</p>
              <span v-if="selectedLog.geoTagged" class="inline-flex items-center gap-1 text-sm text-success font-medium">
                <UIcon name="i-lucide-map-pin" class="size-4" /> Location Verified
              </span>
              <span v-else class="text-muted text-sm">Not geo-tagged</span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false" />
      </template>
    </UModal>
  </div>
</template>
