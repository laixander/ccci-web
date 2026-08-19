<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const today = new Date()
const dateStr = today.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const stats = [
  { label: 'Present Today', value: '318', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10' },
  { label: 'On Leave', value: '18', icon: 'i-lucide-plane-takeoff', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Late Arrivals', value: '7', icon: 'i-lucide-alarm-clock', color: 'text-error', bg: 'bg-error/10' },
  { label: 'WFH Today', value: '45', icon: 'i-lucide-home', color: 'text-info', bg: 'bg-info/10' },
]

const attendanceLog = ref([
  { name: 'James Reyes', initials: 'JR', dept: 'Engineering', timeIn: '08:52', timeOut: '—', status: 'Present', type: 'Office', color: 'primary' as const },
  { name: 'Mia Santos', initials: 'MS', dept: 'Marketing', timeIn: '—', timeOut: '—', status: 'On Leave', type: '—', color: 'secondary' as const },
  { name: 'Carlos Wu', initials: 'CW', dept: 'Sales', timeIn: '09:15', timeOut: '—', status: 'Late', type: 'Office', color: 'neutral' as const },
  { name: 'Priya Lal', initials: 'PL', dept: 'HR & Admin', timeIn: '08:30', timeOut: '—', status: 'Present', type: 'WFH', color: 'primary' as const },
  { name: 'Ryan Cruz', initials: 'RC', dept: 'Engineering', timeIn: '09:01', timeOut: '—', status: 'Present', type: 'Office', color: 'success' as const },
  { name: 'Ana Dela Cruz', initials: 'AD', dept: 'Operations', timeIn: '08:45', timeOut: '—', status: 'Present', type: 'WFH', color: 'warning' as const },
  { name: 'Ben Torres', initials: 'BT', dept: 'Sales', timeIn: '10:05', timeOut: '—', status: 'Late', type: 'Office', color: 'secondary' as const },
])

const statusConfig: Record<string, string> = {
  'Present': 'bg-success/10 text-success',
  'On Leave': 'bg-warning/10 text-warning',
  'Late': 'bg-error/10 text-error',
  'Absent': 'bg-muted text-dimmed',
}

const leaveRequests = ref([
  { name: 'Lena Park', initials: 'LP', type: 'Vacation', from: 'Aug 15', to: 'Aug 20', days: 4, reason: 'Family trip', status: 'Pending', color: 'error' as const },
  { name: 'Ben Torres', initials: 'BT', type: 'Sick Leave', from: 'Aug 14', to: 'Aug 14', days: 1, reason: 'Medical appointment', status: 'Pending', color: 'secondary' as const },
  { name: 'Ryan Cruz', initials: 'RC', type: 'Emergency', from: 'Aug 13', to: 'Aug 13', days: 1, reason: 'Family emergency', status: 'Approved', color: 'success' as const },
])

const shifts = [
  { label: 'Morning Shift', time: '6:00 AM – 2:00 PM', employees: 120, color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Regular Shift', time: '8:00 AM – 5:00 PM', employees: 185, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Evening Shift', time: '2:00 PM – 10:00 PM', employees: 37, color: 'text-info', bg: 'bg-info/10' },
]

const logColumns = [
  { accessorKey: 'employee', header: 'Employee' },
  { accessorKey: 'timeIn', header: 'Time In' },
  { accessorKey: 'timeOut', header: 'Time Out' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'status', header: 'Status' }
]

function approveLeave(idx: number) {
  const req = leaveRequests.value[idx]
  if (req) req.status = 'Approved'
}
function rejectLeave(idx: number) {
  const req = leaveRequests.value[idx]
  if (req) req.status = 'Rejected'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Time & Attendance</h1>
        <p class="text-muted text-sm mt-1">{{ dateStr }}</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-calendar-plus" label="Add Shift" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-download" label="Export Log" color="neutral" variant="outline" size="sm" />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }" variant="subtle">
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
      <!-- Attendance Log -->
      <UCard class="lg:col-span-2" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }" variant="subtle">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Today's Attendance Log</h2>
            <UBadge color="success" variant="subtle" :ui="{ base: 'flex items-center gap-2' }">
              <span class="relative flex size-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span class="relative inline-flex size-2 rounded-full bg-success"></span>
              </span> Live
            </UBadge>
          </div>
        </template>
        <div class="overflow-x-auto">
          <UTable
            :data="attendanceLog"
            :columns="logColumns"
            class="w-full text-sm"
            :ui="{
              th: 'text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider',
              td: 'px-4 py-3.5',
              tr: 'hover:bg-muted/30 transition-colors'
            }"
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
            <template #type-cell="{ row }">
              <UBadge v-if="row.original.type !== '—'" :label="row.original.type" color="neutral" variant="subtle" size="sm" />
              <span v-else class="text-dimmed">—</span>
            </template>
            <template #status-cell="{ row }">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]">{{ row.original.status }}</span>
            </template>

            <template #empty>
              <div class="py-16 flex flex-col items-center justify-center">
                <UEmpty icon="i-lucide-calendar" title="No attendance records" description="No logs available for today." />
              </div>
            </template>
          </UTable>
        </div>
      </UCard>

      <!-- Right column -->
      <div class="space-y-4">
        <!-- Shift Overview -->
        <UCard variant="subtle" :ui="{ root: 'shadow-sm' }">
          <h2 class="font-semibold text-highlighted mb-4">Shift Schedule</h2>
          <div class="space-y-3">
            <div v-for="shift in shifts" :key="shift.label" class="flex items-center gap-3">
              <div :class="['size-9 rounded-lg flex items-center justify-center flex-shrink-0', shift.bg]">
                <UIcon name="i-lucide-clock" :class="['size-4', shift.color]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-highlighted">{{ shift.label }}</p>
                <p class="text-xs text-muted">{{ shift.time }}</p>
              </div>
              <UBadge :label="String(shift.employees)" color="neutral" variant="subtle" size="sm" />
            </div>
          </div>
        </UCard>

        <!-- Leave Requests -->
        <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Leave Requests</h2>
              <UBadge :label="String(leaveRequests.filter(l => l.status === 'Pending').length) + ' pending'" color="warning" variant="subtle" size="sm" />
            </div>
          </template>
          <div class="divide-y divide-default">
            <div v-for="(req, idx) in leaveRequests" :key="req.name" class="p-4 sm:p-6">
              <div class="flex items-start gap-3 mb-2">
                <UAvatar :text="req.initials" size="sm" :color="req.color" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-highlighted">{{ req.name }}</p>
                  <p class="text-xs text-muted">{{ req.type }} · {{ req.from }}<span v-if="req.from !== req.to"> – {{ req.to }}</span> ({{ req.days }}d)</p>
                  <p class="text-xs text-dimmed mt-0.5 italic">"{{ req.reason }}"</p>
                </div>
              </div>
              <div class="flex items-center justify-between mt-2 bg-muted/50 p-2 sm:p-3 rounded-lg">
                <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', req.status === 'Approved' ? 'bg-success/10 text-success' : req.status === 'Rejected' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning']">
                  {{ req.status }}
                </span>
                <div v-if="req.status === 'Pending'" class="flex gap-2">
                  <UButton size="xs" color="success" variant="subtle" icon="i-lucide-check" @click="approveLeave(idx)" />
                  <UButton size="xs" color="error" variant="subtle" icon="i-lucide-x" @click="rejectLeave(idx)" />
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
