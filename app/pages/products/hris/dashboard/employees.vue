<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const search = ref('')
const selectedDept = ref('All')
const selectedStatus = ref('All')

const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'Operations', 'HR & Admin']
const statuses = ['All', 'Active', 'On Leave', 'Probation', 'Offboarding']

const employees = ref([
  { id: 'E001', name: 'James Reyes', initials: 'JR', role: 'Senior Engineer', dept: 'Engineering', status: 'Active', joined: 'Jan 2022', email: 'james.reyes@company.com', phone: '+63 917 123 4567', avatarColor: 'primary' as const },
  { id: 'E002', name: 'Mia Santos', initials: 'MS', role: 'Marketing Manager', dept: 'Marketing', status: 'On Leave', joined: 'Mar 2021', email: 'mia.santos@company.com', phone: '+63 918 234 5678', avatarColor: 'secondary' as const },
  { id: 'E003', name: 'Carlos Wu', initials: 'CW', role: 'Sales Lead', dept: 'Sales', status: 'Active', joined: 'Jun 2023', email: 'carlos.wu@company.com', phone: '+63 919 345 6789', avatarColor: 'neutral' as const },
  { id: 'E004', name: 'Priya Lal', initials: 'PL', role: 'HR Specialist', dept: 'HR & Admin', status: 'Active', joined: 'Nov 2020', email: 'priya.lal@company.com', phone: '+63 912 456 7890', avatarColor: 'primary' as const },
  { id: 'E005', name: 'Ryan Cruz', initials: 'RC', role: 'DevOps Engineer', dept: 'Engineering', status: 'Probation', joined: 'Jul 2026', email: 'ryan.cruz@company.com', phone: '+63 915 567 8901', avatarColor: 'success' as const },
  { id: 'E006', name: 'Ana Dela Cruz', initials: 'AD', role: 'Operations Analyst', dept: 'Operations', status: 'Active', joined: 'Feb 2022', email: 'ana.delacruz@company.com', phone: '+63 917 678 9012', avatarColor: 'warning' as const },
  { id: 'E007', name: 'Ben Torres', initials: 'BT', role: 'Account Executive', dept: 'Sales', status: 'Active', joined: 'Sep 2021', email: 'ben.torres@company.com', phone: '+63 918 789 0123', avatarColor: 'secondary' as const },
  { id: 'E008', name: 'Lena Park', initials: 'LP', role: 'Product Designer', dept: 'Marketing', status: 'Offboarding', joined: 'Apr 2020', email: 'lena.park@company.com', phone: '+63 919 890 1234', avatarColor: 'error' as const },
])

const statusConfig: Record<string, { label: string, class: string }> = {
  'Active': { label: 'Active', class: 'bg-success/10 text-success' },
  'On Leave': { label: 'On Leave', class: 'bg-warning/10 text-warning' },
  'Probation': { label: 'Probation', class: 'bg-info/10 text-info' },
  'Offboarding': { label: 'Offboarding', class: 'bg-error/10 text-error' },
}

const filtered = computed(() => {
  return employees.value.filter((e) => {
    const matchSearch = !search.value || e.name.toLowerCase().includes(search.value.toLowerCase()) || e.role.toLowerCase().includes(search.value.toLowerCase())
    const matchDept = selectedDept.value === 'All' || e.dept === selectedDept.value
    const matchStatus = selectedStatus.value === 'All' || e.status === selectedStatus.value
    return matchSearch && matchDept && matchStatus
  })
})

const showAddModal = ref(false)
const selectedEmployee = ref<typeof employees.value[0] | null>(null)
const showDetailModal = ref(false)

const columns = [
  { accessorKey: 'employee', header: 'Employee' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'dept', header: 'Department' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'joined', header: 'Joined' },
  { accessorKey: 'email', header: 'Contact' },
  { id: 'actions' }
]

function viewEmployee(emp: typeof employees.value[0]) {
  selectedEmployee.value = emp
  showDetailModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Employees</h1>
        <p class="text-muted text-sm mt-1">Manage your {{ employees.length }} team members</p>
      </div>
      <UButton
        icon="i-lucide-user-plus"
        label="Add Employee"
        size="sm"
        @click="showAddModal = true"
      />
    </div>

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput
          v-model="search"
          placeholder="Search employees…"
          icon="i-lucide-search"
          class="flex-1 min-w-48"
        />
        <USelect
          v-model="selectedDept"
          :items="departments"
          class="w-44"
        />
        <USelect
          v-model="selectedStatus"
          :items="statuses"
          class="w-36"
        />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} results</span>
      </div>
    </UCard>

    <!-- Employee Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="overflow-x-auto">
        <UTable
          :data="filtered"
          :columns="columns"
          class="w-full text-sm"
          :ui="{
            th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
            td: 'px-4 py-4',
            tr: 'hover:bg-muted/30 transition-colors cursor-pointer'
          }"
          @select="(e, row) => viewEmployee(row.original)"
        >
          <template #employee-header>
            <span class="px-1">Employee</span>
          </template>
          <template #employee-cell="{ row }">
            <div class="flex items-center gap-3 px-1">
              <UAvatar :text="row.original.initials" size="sm" :color="row.original.avatarColor" />
              <div>
                <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                <p class="text-xs text-dimmed">{{ row.original.id }}</p>
              </div>
            </div>
          </template>

          <template #role-cell="{ row }">
            <span class="text-muted">{{ row.original.role }}</span>
          </template>

          <template #dept-cell="{ row }">
            <UBadge :label="row.original.dept" color="neutral" variant="subtle" size="sm" />
          </template>

          <template #status-cell="{ row }">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
              :class="statusConfig[row.original.status]?.class"
            >
              {{ row.original.status }}
            </span>
          </template>

          <template #joined-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.joined }}</span>
          </template>

          <template #email-cell="{ row }">
            <span class="text-muted text-xs">{{ row.original.email }}</span>
          </template>

          <template #actions-cell="{ row }">
            <div @click.stop>
              <UDropdownMenu
                :items="[
                  [
                    { label: 'View', icon: 'i-lucide-eye', onSelect: () => viewEmployee(row.original) },
                    { label: 'Edit', icon: 'i-lucide-pencil' }
                  ]
                ]"
                :content="{
                  align: 'end',
                  side: 'bottom',
                  sideOffset: 8
                }"
                size="sm"
              >
                <UButton icon="i-lucide-more-vertical" size="xs" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </div>
          </template>

          <template #empty>
            <div class="py-16 flex flex-col items-center justify-center">
              <UEmpty icon="i-lucide-users" title="No employees found" description="Try adjusting your search or filters" />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Employee Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedEmployee?.name || ''" :description="selectedEmployee?.role">
      <template #body>
        <div v-if="selectedEmployee" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedEmployee.initials" size="xl" :color="selectedEmployee.avatarColor" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedEmployee.name }}</p>
              <p class="text-muted">{{ selectedEmployee.role }}</p>
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2"
                :class="statusConfig[selectedEmployee.status]?.class"
              >{{ selectedEmployee.status }}</span>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Employee ID</p>
              <p class="text-highlighted font-medium">{{ selectedEmployee.id }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Department</p>
              <p class="text-highlighted font-medium">{{ selectedEmployee.dept }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Email</p>
              <p class="text-highlighted font-medium">{{ selectedEmployee.email }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Phone</p>
              <p class="text-highlighted font-medium">{{ selectedEmployee.phone }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Date Joined</p>
              <p class="text-highlighted font-medium">{{ selectedEmployee.joined }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedEmployee = null" />
        <UButton label="Edit Employee" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Add Employee Modal -->
    <UModal v-model:open="showAddModal" title="Add New Employee" description="Fill in the details to onboard a new team member">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="First Name">
              <UInput placeholder="Juan" class="w-full" />
            </UFormField>
            <UFormField label="Last Name">
              <UInput placeholder="Dela Cruz" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Email">
            <UInput type="email" placeholder="juan@company.com" class="w-full" />
          </UFormField>
          <UFormField label="Role / Position">
            <UInput placeholder="e.g. Software Engineer" class="w-full" />
          </UFormField>
          <UFormField label="Department">
            <USelect :items="departments.slice(1)" class="w-full" />
          </UFormField>
          <UFormField label="Start Date">
            <UInput type="date" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Add Employee" icon="i-lucide-user-plus" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
