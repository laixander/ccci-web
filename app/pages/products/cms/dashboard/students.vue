<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedDept = ref('All')
const selectedStatus = ref('All')
const selectedYear = ref('All')

const departments = ['All', 'Engineering', 'Business', 'Education', 'Nursing', 'IT & CS', 'Arts & Sciences']
const statuses = ['All', 'Regular', 'Irregular', 'Transferee', 'Returnee', 'Probationary']
const yearLevels = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']

const students = ref([
  { id: '2024-00142', name: 'Maria Santos', initials: 'MS', dept: 'Nursing', year: '3rd Year', status: 'Regular', gpa: '1.45', email: 'maria.santos@campus.edu', phone: '+63 917 123 4567', enrolled: 'Aug 2022', avatarColor: 'primary' as const },
  { id: '2023-00891', name: 'James Reyes', initials: 'JR', dept: 'Engineering', year: '4th Year', status: 'Regular', gpa: '1.72', email: 'james.reyes@campus.edu', phone: '+63 918 234 5678', enrolled: 'Aug 2021', avatarColor: 'neutral' as const },
  { id: '2025-00034', name: 'Ana Dela Cruz', initials: 'AD', dept: 'Business', year: '2nd Year', status: 'Irregular', gpa: '2.10', email: 'ana.delacruz@campus.edu', phone: '+63 919 345 6789', enrolled: 'Aug 2023', avatarColor: 'warning' as const },
  { id: '2024-00509', name: 'Carlos Wu', initials: 'CW', dept: 'IT & CS', year: '3rd Year', status: 'Regular', gpa: '1.58', email: 'carlos.wu@campus.edu', phone: '+63 912 456 7890', enrolled: 'Aug 2022', avatarColor: 'info' as const },
  { id: '2026-00012', name: 'Priya Lal', initials: 'PL', dept: 'Arts & Sciences', year: '1st Year', status: 'Regular', gpa: '1.90', email: 'priya.lal@campus.edu', phone: '+63 915 567 8901', enrolled: 'Aug 2024', avatarColor: 'success' as const },
  { id: '2022-01204', name: 'Ryan Cruz', initials: 'RC', dept: 'Engineering', year: '4th Year', status: 'Probationary', gpa: '2.85', email: 'ryan.cruz@campus.edu', phone: '+63 917 678 9012', enrolled: 'Aug 2020', avatarColor: 'error' as const },
  { id: '2025-00198', name: 'Lena Park', initials: 'LP', dept: 'Education', year: '2nd Year', status: 'Transferee', gpa: '1.65', email: 'lena.park@campus.edu', phone: '+63 918 789 0123', enrolled: 'Aug 2023', avatarColor: 'secondary' as const },
  { id: '2023-00455', name: 'Ben Torres', initials: 'BT', dept: 'Business', year: '3rd Year', status: 'Regular', gpa: '2.05', email: 'ben.torres@campus.edu', phone: '+63 919 890 1234', enrolled: 'Aug 2021', avatarColor: 'primary' as const },
])

const statusConfig: Record<string, string> = {
  'Regular': 'bg-success/10 text-success',
  'Irregular': 'bg-warning/10 text-warning',
  'Transferee': 'bg-info/10 text-info',
  'Returnee': 'bg-primary/10 text-primary',
  'Probationary': 'bg-error/10 text-error',
}

const filtered = computed(() =>
  students.value.filter(s => {
    const matchSearch = !search.value || s.name.toLowerCase().includes(search.value.toLowerCase()) || s.id.includes(search.value)
    const matchDept = selectedDept.value === 'All' || s.dept === selectedDept.value
    const matchStatus = selectedStatus.value === 'All' || s.status === selectedStatus.value
    const matchYear = selectedYear.value === 'All' || s.year === selectedYear.value
    return matchSearch && matchDept && matchStatus && matchYear
  })
)

const selectedStudent = ref<typeof students.value[0] | null>(null)
const showDetailModal = ref(false)
const showAddModal = ref(false)

function viewStudent(s: typeof students.value[0]) {
  selectedStudent.value = s
  showDetailModal.value = true
}

function gpaColor(gpa: string) {
  const v = parseFloat(gpa)
  if (v <= 1.75) return 'text-success'
  if (v <= 2.50) return 'text-highlighted'
  return 'text-error'
}

const statusColorMap: Record<string, any> = {
  'Regular': 'success',
  'Irregular': 'warning',
  'Transferee': 'info',
  'Returnee': 'primary',
  'Probationary': 'error',
}

const stats = [
  { label: 'Total Students', value: '4,823', icon: 'i-lucide-users', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Currently Enrolled', value: '4,190', icon: 'i-lucide-user-check', color: 'text-success', bg: 'bg-success/10' },
  { label: 'At-Risk (GPA < 2.75)', value: '97', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10' },
  { label: 'New Applicants', value: '142', icon: 'i-lucide-user-plus', color: 'text-warning', bg: 'bg-warning/10' },
]

const columns = [
  { accessorKey: 'student', label: 'Student' },
  { accessorKey: 'dept', label: 'Dept. / Year' },
  { accessorKey: 'status', label: 'Status' },
  { accessorKey: 'gpa', label: 'GPA' },
  { accessorKey: 'email', label: 'Email' },
  { id: 'actions', meta: { class: { td: 'text-right' } } }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Student Information System</h1>
        <p class="text-muted text-sm mt-1">Manage {{ students.length }} student records</p>
      </div>
      <UButton icon="i-lucide-user-plus" label="Add Student" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
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

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search by name or ID…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedDept" :items="departments" class="w-44" />
        <USelect v-model="selectedYear" :items="yearLevels" class="w-36" />
        <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} results</span>
      </div>
    </UCard>

    <!-- Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <UTable class="scrollbar" :data="filtered" :columns="columns" @select="(_e, row) => viewStudent(row.original)">
        <template #student-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :text="row.original.initials" size="sm" :color="row.original.avatarColor" />
            <div>
              <p class="font-medium text-highlighted">{{ row.original.name }}</p>
              <p class="text-xs text-dimmed">{{ row.original.id }}</p>
            </div>
          </div>
        </template>
        <template #dept-cell="{ row }">
          <p class="text-muted">{{ row.original.dept }}</p>
          <p class="text-xs text-dimmed">{{ row.original.year }}</p>
        </template>
        <template #status-cell="{ row }">
          <UBadge :label="row.original.status" :color="statusColorMap[row.original.status]" variant="subtle" size="sm" />
        </template>
        <template #gpa-cell="{ row }">
          <span :class="['font-bold text-sm', gpaColor(row.original.gpa)]">{{ row.original.gpa }}</span>
        </template>
        <template #email-cell="{ row }">
          <span class="text-muted text-xs">{{ row.original.email }}</span>
        </template>
        <template #actions-cell="{ row }">
          <div @click.stop>
            <UDropdownMenu
              :items="[
                [
                  { label: 'View', icon: 'i-lucide-eye', onSelect: () => viewStudent(row.original) },
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
          <UEmpty title="No students found" icon="i-lucide-user-round" />
        </template>
      </UTable>
    </UCard>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedStudent?.name || ''" :description="`${selectedStudent?.dept} · ${selectedStudent?.year}`">
      <template #body>
        <div v-if="selectedStudent" class="space-y-5">
          <div class="flex items-center gap-4">
            <UAvatar :text="selectedStudent.initials" size="xl" :color="selectedStudent.avatarColor" />
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedStudent.name }}</p>
              <p class="text-muted">{{ selectedStudent.dept }} · {{ selectedStudent.year }}</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2" :class="statusConfig[selectedStudent.status]">
                {{ selectedStudent.status }}
              </span>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Student ID</p>
              <p class="text-highlighted font-medium">{{ selectedStudent.id }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">GPA</p>
              <p :class="['font-bold', gpaColor(selectedStudent.gpa)]">{{ selectedStudent.gpa }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Email</p>
              <p class="text-highlighted font-medium">{{ selectedStudent.email }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Phone</p>
              <p class="text-highlighted font-medium">{{ selectedStudent.phone }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Enrolled Since</p>
              <p class="text-highlighted font-medium">{{ selectedStudent.enrolled }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedStudent = null" />
        <UButton label="Edit Record" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Add Student Modal -->
    <UModal v-model:open="showAddModal" title="Add New Student" description="Enter the student's personal and academic information">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="First Name"><UInput placeholder="Maria" class="w-full" /></UFormField>
            <UFormField label="Last Name"><UInput placeholder="Santos" class="w-full" /></UFormField>
          </div>
          <UFormField label="Email"><UInput type="email" placeholder="student@campus.edu" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Department"><USelect :items="departments.slice(1)" class="w-full" /></UFormField>
            <UFormField label="Year Level"><USelect :items="yearLevels.slice(1)" class="w-full" /></UFormField>
          </div>
          <UFormField label="Status"><USelect :items="statuses.slice(1)" class="w-full" /></UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Add Student" icon="i-lucide-user-plus" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
