<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Simulate current user
const user = {
  name: 'Sarah Chen',
  initials: 'SC',
  role: 'VP of HR',
  dept: 'HR & Admin',
  id: 'E010',
  email: 'sarah.chen@company.com',
  phone: '+63 917 888 9999',
  joined: 'March 2019',
  avatar: 'primary' as const,
  leaveBalance: {
    vacation: { used: 5, total: 15 },
    sick: { used: 2, total: 10 },
    emergency: { used: 0, total: 3 },
  }
}

const activeTab = ref('overview')
const tabs = [
  { label: 'My Profile', slot: 'overview' },
  { label: 'My Payslips', slot: 'payslips' },
  { label: 'Leave', slot: 'leave' },
]

const payslips = [
  { month: 'August 2026', gross: '₱120,000', net: '₱101,500', date: 'Aug 30', status: 'Paid' },
  { month: 'July 2026', gross: '₱120,000', net: '₱101,500', date: 'Jul 30', status: 'Paid' },
  { month: 'June 2026', gross: '₱115,000', net: '₱97,000', date: 'Jun 30', status: 'Paid' },
  { month: 'May 2026', gross: '₱115,000', net: '₱97,000', date: 'May 30', status: 'Paid' },
]

const payslipColumns = [
  { accessorKey: 'month', header: 'Period', meta: { class: { td: 'font-medium text-highlighted' } } },
  { accessorKey: 'gross', header: 'Gross Pay', meta: { class: { th: 'text-right', td: 'text-right text-highlighted' } } },
  { accessorKey: 'net', header: 'Net Pay', meta: { class: { th: 'text-right', td: 'text-right font-bold text-success' } } },
  { accessorKey: 'date', header: 'Paid On', meta: { class: { td: 'text-muted' } } },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', meta: { class: { th: 'text-right', td: 'text-right' } } }
]

const leaveHistory = ref([
  { type: 'Vacation Leave', from: 'Jul 1', to: 'Jul 3', days: 3, status: 'Approved', applied: 'Jun 20' },
  { type: 'Sick Leave', from: 'May 22', to: 'May 23', days: 2, status: 'Approved', applied: 'May 22' },
  { type: 'Emergency Leave', from: 'Mar 5', to: 'Mar 5', days: 1, status: 'Approved', applied: 'Mar 5' },
])

const leaveHistoryColumns = [
  { accessorKey: 'type', header: 'Type', meta: { class: { td: 'font-medium text-highlighted' } } },
  { id: 'dates', header: 'Dates', meta: { class: { td: 'text-muted text-xs' } } },
  { accessorKey: 'days', header: 'Days', meta: { class: { td: 'text-highlighted' } } },
  { accessorKey: 'applied', header: 'Applied', meta: { class: { td: 'text-muted text-xs' } } },
  { accessorKey: 'status', header: 'Status' }
]

const showLeaveModal = ref(false)
const leaveForm = reactive({
  type: 'Vacation Leave',
  from: '',
  to: '',
  reason: '',
})

const leaveTypes = ['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']

function submitLeave() {
  leaveHistory.value.unshift({
    type: leaveForm.type,
    from: leaveForm.from,
    to: leaveForm.to,
    days: 1,
    status: 'Pending',
    applied: 'Today',
  })
  showLeaveModal.value = false
  leaveForm.from = ''
  leaveForm.to = ''
  leaveForm.reason = ''
}

const profileEditing = ref(false)
const profileForm = reactive({ ...user })
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Employee Self-Service</h1>
        <p class="text-muted text-sm mt-1">Manage your profile, payslips, and leave requests</p>
      </div>
    </div>

    <!-- Profile Card -->
    <UCard :ui="{ root: 'shadow-sm' }">
      <div class="flex items-center gap-6">
        <UAvatar :text="user.initials" size="3xl" :color="user.avatar" />
        <div class="flex-1">
          <h2 class="text-xl font-bold text-highlighted">{{ user.name }}</h2>
          <p class="text-muted">{{ user.role }} · {{ user.dept }}</p>
          <div class="flex gap-4 mt-2 text-sm text-dimmed">
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-id-card" class="size-3.5" /> {{ user.id }}</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-calendar" class="size-3.5" /> Joined {{ user.joined }}</span>
          </div>
        </div>
        <UButton icon="i-lucide-pencil" label="Edit Profile" color="neutral" variant="outline" size="sm" @click="profileEditing = true" />
      </div>
    </UCard>

    <!-- Tabs -->
    <UTabs :items="tabs" color="primary">

      <!-- My Profile Tab -->
      <template #overview>
        <div class="pt-4 space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Personal Info -->
            <UCard :ui="{ root: 'shadow-sm' }">
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

            <!-- Leave Balances -->
            <UCard :ui="{ root: 'shadow-sm' }">
              <h2 class="font-semibold text-highlighted">Leave Balances</h2>
              <div class="space-y-4 mt-4 sm:mt-6">
                <div v-for="(bal, type) in user.leaveBalance" :key="type" class="space-y-2">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-highlighted capitalize">{{ type.replace(/([A-Z])/g, ' $1').trim() }} Leave</p>
                    <span class="text-sm font-bold text-highlighted">{{ bal.total - bal.used }}<span class="text-dimmed font-normal"> / {{ bal.total }} days</span></span>
                  </div>
                  <UProgress
                    :model-value="((bal.total - bal.used) / bal.total) * 100"
                    :color="type === 'sick' ? 'error' : type === 'emergency' ? 'warning' : 'primary'"
                  />
                  <p class="text-xs text-dimmed">{{ bal.used }} used this year</p>
                </div>
                <UButton block icon="i-lucide-plus" label="File Leave Request" @click="showLeaveModal = true" />
              </div>
            </UCard>
          </div>
        </div>
      </template>

      <!-- Payslips Tab -->
      <template #payslips>
        <div class="pt-4">
          <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
            <div class="overflow-x-auto">
              <UTable :data="payslips" :columns="payslipColumns" class="w-full">
                <template #status-cell="{ row }">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">{{ row.original.status }}</span>
                </template>
                <template #actions-cell>
                  <UTooltip text="Download Payslip">
                    <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
                  </UTooltip>
                </template>
                <template #empty>
                  <UEmpty icon="i-lucide-file-text" title="No payslips found" description="You don't have any payslips yet." />
                </template>
              </UTable>
            </div>
          </UCard>
        </div>
      </template>

      <!-- Leave Tab -->
      <template #leave>
        <div class="pt-4 space-y-4">
          <div class="flex justify-end">
            <UButton icon="i-lucide-plus" label="File Leave Request" @click="showLeaveModal = true" />
          </div>
          <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
            <div class="overflow-x-auto">
              <UTable :data="leaveHistory" :columns="leaveHistoryColumns" class="w-full">
                <template #dates-cell="{ row }">
                  {{ row.original.from }}<span v-if="row.original.from !== row.original.to"> – {{ row.original.to }}</span>
                </template>
                <template #days-cell="{ row }">
                  {{ row.original.days }}d
                </template>
                <template #status-cell="{ row }">
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', row.original.status === 'Approved' ? 'bg-success/10 text-success' : row.original.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error']">
                    {{ row.original.status }}
                  </span>
                </template>
                <template #empty>
                  <UEmpty icon="i-lucide-calendar" title="No leave history" description="You haven't filed any leave requests yet." />
                </template>
              </UTable>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>

    <!-- Leave Request Modal -->
    <UModal v-model:open="showLeaveModal" title="File Leave Request" description="Submit a leave request for your manager's approval">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Leave Type">
            <USelect v-model="leaveForm.type" :items="leaveTypes" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="From">
              <UInput v-model="leaveForm.from" type="date" class="w-full" />
            </UFormField>
            <UFormField label="To">
              <UInput v-model="leaveForm.to" type="date" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Reason">
            <UTextarea v-model="leaveForm.reason" placeholder="Briefly describe your reason…" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showLeaveModal = false" />
        <UButton label="Submit Request" icon="i-lucide-send" @click="submitLeave" />
      </template>
    </UModal>

    <!-- Edit Profile Modal -->
    <UModal v-model:open="profileEditing" title="Edit Profile" description="Update your personal information">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Full Name">
              <UInput :model-value="user.name" class="w-full" />
            </UFormField>
            <UFormField label="Phone">
              <UInput :model-value="user.phone" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Email">
            <UInput :model-value="user.email" type="email" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="profileEditing = false" />
        <UButton label="Save Changes" icon="i-lucide-check" @click="profileEditing = false" />
      </template>
    </UModal>
  </div>
</template>
