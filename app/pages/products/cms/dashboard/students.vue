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
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Student Information System</h1>
        <p class="text-muted text-sm mt-1">Manage {{ students.length }} student records</p>
      </div>
      <UButton icon="i-lucide-user-plus" label="Add Student" @click="showAddModal = true" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-highlighted">4,823</p>
        <p class="text-xs text-muted mt-1">Total Students</p>
      </UCard>
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-success">4,190</p>
        <p class="text-xs text-muted mt-1">Currently Enrolled</p>
      </UCard>
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-error">97</p>
        <p class="text-xs text-muted mt-1">At-Risk (GPA &lt; 2.75)</p>
      </UCard>
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-warning">142</p>
        <p class="text-xs text-muted mt-1">New Applicants</p>
      </UCard>
    </div>

    <!-- Filters -->
    <UCard :ui="{ body: 'p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search by name or ID…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedDept" :items="departments" class="w-44" />
        <USelect v-model="selectedYear" :items="yearLevels" class="w-36" />
        <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} results</span>
      </div>
    </UCard>

    <!-- Table -->
    <UCard :ui="{ body: 'p-0' }">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Student</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Dept. / Year</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">GPA</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Email</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="s in filtered" :key="s.id" class="hover:bg-muted/30 transition-colors cursor-pointer" @click="viewStudent(s)">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="s.initials" size="sm" :color="s.avatarColor" />
                  <div>
                    <p class="font-medium text-highlighted">{{ s.name }}</p>
                    <p class="text-xs text-dimmed">{{ s.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="text-muted">{{ s.dept }}</p>
                <p class="text-xs text-dimmed">{{ s.year }}</p>
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[s.status]">
                  {{ s.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <span :class="['font-bold text-sm', gpaColor(s.gpa)]">{{ s.gpa }}</span>
              </td>
              <td class="px-4 py-4 text-muted text-xs">{{ s.email }}</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1" @click.stop>
                  <UButton icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" @click="viewStudent(s)" />
                  <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filtered.length === 0" class="py-16 text-center">
          <UIcon name="i-lucide-user-round" class="size-10 text-muted mx-auto mb-3" />
          <p class="text-muted font-medium">No students found</p>
        </div>
      </div>
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
