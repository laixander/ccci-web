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
        @click="showAddModal = true"
      />
    </div>

    <!-- Filters -->
    <UCard :ui="{ body: 'p-4' }">
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
    <UCard :ui="{ body: 'p-0' }">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Employee</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Role</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Department</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Joined</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Contact</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr
              v-for="emp in filtered"
              :key="emp.id"
              class="hover:bg-muted/30 transition-colors cursor-pointer"
              @click="viewEmployee(emp)"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="emp.initials" size="sm" :color="emp.avatarColor" />
                  <div>
                    <p class="font-medium text-highlighted">{{ emp.name }}</p>
                    <p class="text-xs text-dimmed">{{ emp.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-muted">{{ emp.role }}</td>
              <td class="px-4 py-4">
                <UBadge :label="emp.dept" color="neutral" variant="subtle" size="sm" />
              </td>
              <td class="px-4 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="statusConfig[emp.status]?.class"
                >
                  {{ emp.status }}
                </span>
              </td>
              <td class="px-4 py-4 text-muted text-xs">{{ emp.joined }}</td>
              <td class="px-4 py-4 text-muted text-xs">{{ emp.email }}</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1" @click.stop>
                  <UButton icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" @click="viewEmployee(emp)" />
                  <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" />
                  <UButton icon="i-lucide-more-horizontal" size="xs" color="neutral" variant="ghost" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filtered.length === 0" class="py-16 text-center">
          <UIcon name="i-lucide-users" class="size-10 text-muted mx-auto mb-3" />
          <p class="text-muted font-medium">No employees found</p>
          <p class="text-dimmed text-sm mt-1">Try adjusting your search or filters</p>
        </div>
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
