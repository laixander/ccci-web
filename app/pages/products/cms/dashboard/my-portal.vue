<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

// Simulate current student/staff
const user = {
  name: 'Maria Santos',
  initials: 'MS',
  role: 'BS Nursing, 3rd Year',
  dept: 'College of Nursing',
  id: '2024-00142',
  email: 'maria.santos@campus.edu',
  phone: '+63 917 123 4567',
  enrolled: 'August 2022',
  avatar: 'primary' as const,
  gpa: '1.45',
  units: 78,
  totalUnits: 180,
}

const activeTab = ref('overview')
const tabs = [
  { label: 'My Profile', slot: 'overview' },
  { label: 'My Grades', slot: 'grades' },
  { label: 'My Finances', slot: 'finances' },
]

const mySubjects = [
  { code: 'NCM 312', title: 'Med-Surg Nursing', units: 5, faculty: 'Prof. Reyes', schedule: 'MWF 8:00-9:30 AM', room: 'SN 301', midterm: '1.25', final: '—', status: 'Ongoing' },
  { code: 'NCM 313', title: 'OB-GYN Nursing', units: 5, faculty: 'Prof. Cruz', schedule: 'TTH 10:00-11:30 AM', room: 'SN 204', midterm: '1.50', final: '—', status: 'Ongoing' },
  { code: 'NCM 305', title: 'Community Health Nursing', units: 3, faculty: 'Prof. Santos', schedule: 'MWF 1:00-2:00 PM', room: 'SN 105', midterm: '1.25', final: '1.25', status: 'Completed' },
  { code: 'NSG 400', title: 'Nursing Research', units: 3, faculty: 'Prof. Lim', schedule: 'TTH 3:00-4:30 PM', room: 'SN 402', midterm: '1.75', final: '—', status: 'Ongoing' },
  { code: 'PE 301', title: 'Physical Education 3', units: 2, faculty: 'Coach Torres', schedule: 'WF 4:30-6:00 PM', room: 'Gym B', midterm: '1.00', final: '1.00', status: 'Completed' },
]

const myPayments = [
  { or: 'OR-2026-08142', description: '1st Semester Tuition', amount: '₱28,500', date: 'Aug 13, 2026', method: 'Online Banking', status: 'Paid' },
  { or: 'OR-2026-04071', description: '2nd Semester Tuition', amount: '₱27,000', date: 'Jan 8, 2026', method: 'GCash', status: 'Paid' },
  { or: 'OR-2026-01011', description: 'Misc. Fees (1st Sem)', amount: '₱2,800', date: 'Aug 15, 2025', method: 'Cash', status: 'Paid' },
]

const paymentStatusConfig: Record<string, string> = {
  'Paid': 'bg-success/10 text-success',
  'Pending': 'bg-warning/10 text-warning',
  'Overdue': 'bg-error/10 text-error',
}

const subjectStatusConfig: Record<string, string> = {
  'Ongoing': 'bg-primary/10 text-primary',
  'Completed': 'bg-success/10 text-success',
}

const profileEditing = ref(false)
const progressPct = Math.round((user.units / user.totalUnits) * 100)

const subjectColumns = [
  { accessorKey: 'subject', label: 'Subject' },
  { accessorKey: 'units', label: 'Units' },
  { accessorKey: 'faculty', label: 'Faculty' },
  { accessorKey: 'midterm', label: 'Midterm' },
  { accessorKey: 'final', label: 'Final' },
  { accessorKey: 'status', label: 'Status' }
]

const paymentColumns = [
  { accessorKey: 'or', label: 'OR No.' },
  { accessorKey: 'description', label: 'Description' },
  { accessorKey: 'amount', label: 'Amount' },
  { accessorKey: 'date', label: 'Date' },
  { accessorKey: 'method', label: 'Method' },
  { accessorKey: 'status', label: 'Status' },
  { id: 'actions', meta: { class: { td: 'text-right' } } }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">My Portal</h1>
        <p class="text-muted text-sm mt-1">View your grades, schedules, and account balance</p>
      </div>
    </div>

    <!-- Profile Card -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-6' }">
      <div class="flex items-center gap-6">
        <UAvatar :text="user.initials" size="2xl" :color="user.avatar" />
        <div class="flex-1">
          <h2 class="text-xl font-bold text-highlighted">{{ user.name }}</h2>
          <p class="text-muted">{{ user.role }}</p>
          <p class="text-dimmed text-sm">{{ user.dept }}</p>
          <div class="flex gap-4 mt-2 text-sm text-dimmed">
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-id-card" class="size-3.5" /> {{ user.id }}</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-calendar" class="size-3.5" /> Enrolled {{ user.enrolled }}</span>
          </div>
        </div>
        <!-- Academic Stats -->
        <div class="flex gap-6 text-center flex-shrink-0">
          <div>
            <p class="text-2xl font-bold text-success">{{ user.gpa }}</p>
            <p class="text-xs text-muted">Cum. GPA</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ user.units }}</p>
            <p class="text-xs text-muted">Units Earned</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-primary">{{ progressPct }}%</p>
            <p class="text-xs text-muted">Program Done</p>
          </div>
        </div>
        <UButton icon="i-lucide-pencil" label="Edit Profile" color="neutral" variant="outline" size="sm" @click="profileEditing = true" />
      </div>
      <!-- Program Progress -->
      <div class="mt-5 pt-5 border-t border-default">
        <div class="flex justify-between text-xs text-muted mb-2">
          <span>Program Progress</span>
          <span>{{ user.units }} / {{ user.totalUnits }} units</span>
        </div>
        <UProgress :model-value="progressPct" color="primary" />
      </div>
    </UCard>

    <!-- Tabs -->
    <UTabs :items="tabs" color="primary">

      <!-- My Profile Tab -->
      <template #overview>
        <div class="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard :ui="{ root: 'shadow-sm', body: 'p-6' }">
            <h2 class="font-semibold text-highlighted">Personal Information</h2>
            <div class="space-y-4 mt-4 sm:mt-6">
              <div>
                <p class="text-xs text-dimmed uppercase tracking-wide font-semibold mb-1">Full Name</p>
                <p class="text-highlighted font-medium">{{ user.name }}</p>
              </div>
              <USeparator />
              <div>
                <p class="text-xs text-dimmed uppercase tracking-wide font-semibold mb-1">Email Address</p>
                <p class="text-highlighted font-medium">{{ user.email }}</p>
              </div>
              <USeparator />
              <div>
                <p class="text-xs text-dimmed uppercase tracking-wide font-semibold mb-1">Phone</p>
                <p class="text-highlighted font-medium">{{ user.phone }}</p>
              </div>
              <USeparator />
              <div>
                <p class="text-xs text-dimmed uppercase tracking-wide font-semibold mb-1">Department</p>
                <p class="text-highlighted font-medium">{{ user.dept }}</p>
              </div>
            </div>
          </UCard>

          <UCard :ui="{ root: 'shadow-sm', body: 'p-6' }">
            <h2 class="font-semibold text-highlighted">Current Enrollment</h2>
            <div class="space-y-3 mt-4 sm:mt-6">
              <div v-for="subj in mySubjects.slice(0, 3)" :key="subj.code" class="flex items-start gap-3">
                <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UIcon name="i-lucide-book-open" class="size-4 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-highlighted truncate">{{ subj.title }}</p>
                  <p class="text-xs text-muted">{{ subj.code }} · {{ subj.schedule }}</p>
                </div>
                <UBadge :label="subj.status" :color="subj.status === 'Completed' ? 'success' : 'primary'" variant="subtle" size="sm" />
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <!-- My Grades Tab -->
      <template #grades>
        <div class="pt-4">
          <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
            <UTable class="scrollbar" :data="mySubjects" :columns="subjectColumns">
              <template #subject-cell="{ row }">
                <p class="font-medium text-highlighted">{{ row.original.title }}</p>
                <p class="text-xs text-dimmed">{{ row.original.code }} · {{ row.original.room }}</p>
              </template>
              <template #units-cell="{ row }">
                <span class="font-semibold text-highlighted">{{ row.original.units }}</span>
              </template>
              <template #faculty-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.faculty }}</span>
              </template>
              <template #midterm-cell="{ row }">
                <span class="font-semibold text-highlighted">{{ row.original.midterm }}</span>
              </template>
              <template #final-cell="{ row }">
                <span class="font-semibold text-highlighted">{{ row.original.final }}</span>
              </template>
              <template #status-cell="{ row }">
                <UBadge :label="row.original.status" :color="row.original.status === 'Completed' ? 'success' : 'primary'" variant="subtle" size="sm" />
              </template>
              <template #empty>
                <UEmpty title="No subjects found" icon="i-lucide-book-open" />
              </template>
            </UTable>
          </UCard>
        </div>
      </template>

      <!-- My Finances Tab -->
      <template #finances>
        <div class="pt-4">
          <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
            <UTable class="scrollbar" :data="myPayments" :columns="paymentColumns">
              <template #or-cell="{ row }">
                <span class="text-xs font-mono text-muted">{{ row.original.or }}</span>
              </template>
              <template #description-cell="{ row }">
                <span class="font-medium text-highlighted">{{ row.original.description }}</span>
              </template>
              <template #amount-cell="{ row }">
                <span class="font-bold text-success">{{ row.original.amount }}</span>
              </template>
              <template #date-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.date }}</span>
              </template>
              <template #method-cell="{ row }">
                <span class="text-muted text-xs">{{ row.original.method }}</span>
              </template>
              <template #status-cell="{ row }">
                <UBadge :label="row.original.status" :color="row.original.status === 'Paid' ? 'success' : 'warning'" variant="subtle" size="sm" />
              </template>
              <template #actions-cell="{ row }">
                <UTooltip text="Download OR">
                  <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
                </UTooltip>
              </template>
              <template #empty>
                <UEmpty title="No transactions found" icon="i-lucide-banknote" />
              </template>
            </UTable>
          </UCard>
        </div>
      </template>
    </UTabs>

    <!-- Edit Profile Modal -->
    <UModal v-model:open="profileEditing" title="Edit Profile" description="Update your contact information">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Full Name"><UInput :model-value="user.name" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Email"><UInput :model-value="user.email" type="email" class="w-full" /></UFormField>
            <UFormField label="Phone"><UInput :model-value="user.phone" class="w-full" /></UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="profileEditing = false" />
        <UButton label="Save Changes" icon="i-lucide-check" @click="profileEditing = false" />
      </template>
    </UModal>
  </div>
</template>
