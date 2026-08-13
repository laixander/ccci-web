<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const stats = [
  { label: 'Total Enrollees', value: '4,190', icon: 'i-lucide-clipboard-list', color: 'text-primary', bg: 'bg-primary/10', change: '86.9% of students' },
  { label: 'Pending Assessment', value: '312', icon: 'i-lucide-clock', color: 'text-warning', bg: 'bg-warning/10', change: 'Awaiting payment' },
  { label: 'Fully Enrolled', value: '3,878', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', change: '92.6% of enrollees' },
  { label: 'Withdrawn', value: '58', icon: 'i-lucide-x-circle', color: 'text-error', bg: 'bg-error/10', change: '↑ 12 vs last sem.' },
]

const enrollments = ref([
  { id: '2024-00142', name: 'Maria Santos', initials: 'MS', dept: 'Nursing', year: '3rd Year', subjects: 6, units: 21, tuition: '₱28,500', status: 'Enrolled', avatarColor: 'primary' as const },
  { id: '2023-00891', name: 'James Reyes', initials: 'JR', dept: 'Engineering', year: '4th Year', subjects: 5, units: 18, tuition: '₱32,000', status: 'Enrolled', avatarColor: 'neutral' as const },
  { id: '2025-00034', name: 'Ana Dela Cruz', initials: 'AD', dept: 'Business', year: '2nd Year', subjects: 7, units: 24, tuition: '₱22,000', status: 'Pending Payment', avatarColor: 'warning' as const },
  { id: '2024-00509', name: 'Carlos Wu', initials: 'CW', dept: 'IT & CS', year: '3rd Year', subjects: 6, units: 21, tuition: '₱25,500', status: 'Enrolled', avatarColor: 'info' as const },
  { id: '2026-00012', name: 'Priya Lal', initials: 'PL', dept: 'Arts & Sciences', year: '1st Year', subjects: 8, units: 27, tuition: '₱18,000', status: 'For Assessment', avatarColor: 'success' as const },
  { id: '2022-01204', name: 'Ryan Cruz', initials: 'RC', dept: 'Engineering', year: '4th Year', subjects: 4, units: 15, tuition: '₱28,000', status: 'Enrolled', avatarColor: 'error' as const },
])

const statusConfig: Record<string, string> = {
  'Enrolled': 'bg-success/10 text-success',
  'Pending Payment': 'bg-warning/10 text-warning',
  'For Assessment': 'bg-info/10 text-info',
  'Withdrawn': 'bg-error/10 text-error',
}

const enrollmentByDept = [
  { dept: 'Engineering', count: 1024, pct: 21, color: 'bg-primary' },
  { dept: 'Business', count: 988, pct: 20, color: 'bg-info' },
  { dept: 'Education', count: 856, pct: 18, color: 'bg-warning' },
  { dept: 'Nursing', count: 742, pct: 15, color: 'bg-success' },
  { dept: 'IT & CS', count: 688, pct: 14, color: 'bg-error' },
]

const semesterProgress = { current: 'A.Y. 2026–27, 1st Semester', enrollPct: 87, deadline: 'Aug 20, 2026' }

const search = ref('')
const filtered = computed(() =>
  enrollments.value.filter(e => !search.value || e.name.toLowerCase().includes(search.value.toLowerCase()) || e.id.includes(search.value))
)

const showEnrollModal = ref(false)
const departments = ['Engineering', 'Business', 'Education', 'Nursing', 'IT & CS', 'Arts & Sciences']
const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year']
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Online Enrollment Management</h1>
        <p class="text-muted text-sm mt-1">Streamline subject selection, scheduling, and payment in one flow</p>
      </div>
      <UButton icon="i-lucide-user-plus" label="Enroll Student" @click="showEnrollModal = true" />
    </div>

    <!-- Active Semester Banner -->
    <UCard :ui="{ body: 'p-5' }" class="border-primary/30 bg-primary/5">
      <div class="flex items-center gap-5">
        <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <UIcon name="i-lucide-clipboard-list" class="size-6 text-primary" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h2 class="font-bold text-highlighted">{{ semesterProgress.current }}</h2>
            <UBadge label="Enrollment Open" color="success" variant="subtle" size="sm" />
          </div>
          <p class="text-sm text-muted mb-3">Deadline: {{ semesterProgress.deadline }} · {{ semesterProgress.enrollPct }}% of students enrolled</p>
          <div class="bg-muted/50 rounded-full h-2 w-full max-w-sm">
            <div class="bg-primary h-2 rounded-full transition-all duration-500" :style="{ width: semesterProgress.enrollPct + '%' }" />
          </div>
        </div>
        <UButton label="Send Reminder" icon="i-lucide-bell" color="neutral" variant="outline" size="sm" />
      </div>
    </UCard>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" :ui="{ body: 'p-5' }" class="hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ stat.value }}</p>
            <p class="text-xs text-muted">{{ stat.label }}</p>
          </div>
        </div>
        <p class="text-xs text-dimmed mt-2">{{ stat.change }}</p>
      </UCard>
    </div>

    <!-- Charts + Table row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Dept Breakdown -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-5">By Department</h2>
        <div class="space-y-3">
          <div v-for="dept in enrollmentByDept" :key="dept.dept" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-muted">{{ dept.dept }}</span>
              <span class="font-semibold text-highlighted">{{ dept.count.toLocaleString() }} <span class="text-xs text-dimmed">({{ dept.pct }}%)</span></span>
            </div>
            <div class="bg-muted/50 rounded-full h-1.5">
              <div :class="['h-1.5 rounded-full transition-all duration-500', dept.color]" :style="{ width: dept.pct + '%' }" />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Enrollment Table -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-0' }">
        <div class="flex items-center justify-between px-5 py-4 border-b border-default">
          <h2 class="font-semibold text-highlighted">Recent Enrollments</h2>
          <UInput v-model="search" placeholder="Search…" icon="i-lucide-search" size="sm" class="w-48" />
        </div>
        <div class="divide-y divide-default">
          <div v-for="e in filtered" :key="e.id" class="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
            <UAvatar :text="e.initials" size="sm" :color="e.avatarColor" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">{{ e.name }}</p>
              <p class="text-xs text-muted">{{ e.dept }} · {{ e.year }} · {{ e.units }} units</p>
            </div>
            <p class="text-sm font-semibold text-highlighted hidden md:block">{{ e.tuition }}</p>
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0" :class="statusConfig[e.status]">
              {{ e.status }}
            </span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Enroll Student Modal -->
    <UModal v-model:open="showEnrollModal" title="Enroll Student" description="Process a student's enrollment for the current semester">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Student ID / Name">
            <UInput placeholder="Search by ID or name…" icon="i-lucide-search" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Department"><USelect :items="departments" class="w-full" /></UFormField>
            <UFormField label="Year Level"><USelect :items="yearLevels" class="w-full" /></UFormField>
          </div>
          <UFormField label="Subjects (comma-separated)">
            <UInput placeholder="e.g. MATH101, ENG102" class="w-full" />
          </UFormField>
          <UFormField label="Payment Mode">
            <USelect :items="['Full Payment', 'Installment', 'Scholarship', 'Loan']" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showEnrollModal = false" />
        <UButton label="Process Enrollment" icon="i-lucide-clipboard-list" @click="showEnrollModal = false" />
      </template>
    </UModal>
  </div>
</template>
