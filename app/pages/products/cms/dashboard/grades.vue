<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const stats = [
  { label: 'Faculty Submitted', value: '214', total: 218, icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Pending Submission', value: '4', total: 218, icon: 'i-lucide-clock', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Avg Class GPA', value: '1.92', total: null, icon: 'i-lucide-award', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Failing Students', value: '97', total: null, icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10' },
]

const grades = ref([
  { id: '2024-00142', name: 'Maria Santos', initials: 'MS', subject: 'NCM 312 – Med-Surg Nursing', faculty: 'Prof. Reyes', midterm: '1.25', final: '1.50', gpa: '1.38', remarks: 'Passed', avatarColor: 'primary' as const },
  { id: '2023-00891', name: 'James Reyes', initials: 'JR', subject: 'CE 401 – Structural Engineering', faculty: 'Prof. Santos', midterm: '1.75', final: '1.50', gpa: '1.63', remarks: 'Passed', avatarColor: 'neutral' as const },
  { id: '2025-00034', name: 'Ana Dela Cruz', initials: 'AD', subject: 'BMGT 201 – Business Ethics', faculty: 'Prof. Cruz', midterm: '2.25', final: '2.00', gpa: '2.13', remarks: 'Passed', avatarColor: 'warning' as const },
  { id: '2022-01204', name: 'Ryan Cruz', initials: 'RC', subject: 'CE 401 – Structural Engineering', faculty: 'Prof. Santos', midterm: '3.00', final: '3.00', gpa: '3.00', remarks: 'Passed', avatarColor: 'error' as const },
  { id: '2024-00509', name: 'Carlos Wu', initials: 'CW', subject: 'CS 301 – Algorithms', faculty: 'Prof. Park', midterm: '1.50', final: '1.75', gpa: '1.63', remarks: 'Passed', avatarColor: 'info' as const },
  { id: '2026-00012', name: 'Priya Lal', initials: 'PL', subject: 'HUM 101 – Philippine Literature', faculty: 'Prof. Lim', midterm: '2.00', final: '5.00', gpa: '5.00', remarks: 'Failed', avatarColor: 'success' as const },
])

const remarksConfig: Record<string, string> = {
  'Passed': 'bg-success/10 text-success',
  'Failed': 'bg-error/10 text-error',
  'Inc': 'bg-warning/10 text-warning',
  'Dropped': 'bg-muted/30 text-muted',
}

function gpaColor(gpa: string) {
  const v = parseFloat(gpa)
  if (v <= 1.75) return 'text-success'
  if (v <= 3.0) return 'text-highlighted'
  return 'text-error'
}

const activeCycle = { name: '1st Semester A.Y. 2026–27 — Grade Submission', deadline: 'August 10, 2026', progress: 98 }

const gpaDistribution = [
  { range: '1.00 – 1.75', count: 1240, pct: 26, color: 'bg-success' },
  { range: '1.76 – 2.50', count: 1856, pct: 39, color: 'bg-primary' },
  { range: '2.51 – 3.00', count: 1140, pct: 24, color: 'bg-warning' },
  { range: '5.00 (Failed)', count: 97, pct: 2, color: 'bg-error' },
  { range: 'Inc / Dropped', count: 430, pct: 9, color: 'bg-muted' },
]

const search = ref('')
const filtered = computed(() => grades.value.filter(g => !search.value || g.name.toLowerCase().includes(search.value.toLowerCase())))

const showGradeModal = ref(false)

const remarksColorMap: Record<string, any> = {
  'Passed': 'success',
  'Failed': 'error',
  'Inc': 'warning',
  'Dropped': 'neutral',
}

const gradeColumns = [
  { accessorKey: 'student', label: 'Student' },
  { accessorKey: 'subject', label: 'Subject' },
  { accessorKey: 'midterm', label: 'Midterm' },
  { accessorKey: 'final', label: 'Final' },
  { accessorKey: 'gpa', label: 'GPA' },
  { accessorKey: 'remarks', label: 'Remarks' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Grades & Academic Records</h1>
        <p class="text-muted text-sm mt-1">Digitized grading, transcripts, and automatic GPA computation</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-download" label="Export TOR" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-pencil" label="Post Grades" size="sm" @click="showGradeModal = true" />
      </div>
    </div>

    <!-- Active Cycle Banner -->
    <UCard :ui="{ root: 'ring-primary/30 bg-primary/5 shadow-sm' }">
      <div class="flex items-center gap-5">
        <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <UIcon name="i-lucide-award" class="size-6 text-primary" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h2 class="font-bold text-highlighted">{{ activeCycle.name }}</h2>
            <UBadge label="Closed" color="neutral" variant="subtle" size="sm" />
          </div>
          <p class="text-sm text-muted mb-3">Deadline: {{ activeCycle.deadline }} · {{ activeCycle.progress }}% of faculty submitted</p>
          <UProgress :model-value="activeCycle.progress" color="success" class="w-full max-w-sm" />
        </div>
        <UButton label="Send Reminder" icon="i-lucide-bell" color="warning" variant="outline" size="sm" />
      </div>
    </UCard>

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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- GPA Distribution -->
      <UCard :ui="{ root: 'shadow-sm' }">
        <h2 class="font-semibold text-highlighted">GPA Distribution</h2>
        <div class="space-y-4 pt-4 sm:pt-6">
          <div v-for="d in gpaDistribution" :key="d.range" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-muted">{{ d.range }}</span>
              <span class="flex items-center gap-2">
                <span class="font-semibold text-highlighted">{{ d.count.toLocaleString() }}</span> 
                <UBadge size="sm" variant="soft" color="neutral">{{ d.pct }}%</UBadge>
              </span>
            </div>
            <UProgress :model-value="d.pct" :color="(d.color.replace('bg-', '') as any)" />
          </div>
        </div>
      </UCard>

      <!-- Grades Table -->
      <UCard class="lg:col-span-2" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
        <div class="flex items-center justify-between px-5 py-4 border-b border-default">
          <h2 class="font-semibold text-highlighted">Student Grade Records</h2>
          <UInput v-model="search" placeholder="Search…" icon="i-lucide-search" size="sm" class="w-48" />
        </div>
        <UTable class="scrollbar" :data="filtered" :columns="gradeColumns">
          <template #student-cell="{ row }">
            <div class="flex items-center gap-3">
              <UAvatar :text="row.original.initials" size="sm" :color="row.original.avatarColor" />
              <div>
                <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                <p class="text-xs text-dimmed">{{ row.original.id }}</p>
              </div>
            </div>
          </template>
          <template #subject-cell="{ row }">
            <p class="text-muted text-xs">{{ row.original.subject }}</p>
            <p class="text-dimmed text-xs">{{ row.original.faculty }}</p>
          </template>
          <template #midterm-cell="{ row }">
            <span class="font-semibold text-highlighted">{{ row.original.midterm }}</span>
          </template>
          <template #final-cell="{ row }">
            <span class="font-semibold text-highlighted">{{ row.original.final }}</span>
          </template>
          <template #gpa-cell="{ row }">
            <span :class="['font-bold', gpaColor(row.original.gpa)]">{{ row.original.gpa }}</span>
          </template>
          <template #remarks-cell="{ row }">
            <UBadge :label="row.original.remarks" :color="remarksColorMap[row.original.remarks]" variant="subtle" size="sm" />
          </template>
          <template #empty>
            <UEmpty title="No grade records found" icon="i-lucide-award" />
          </template>
        </UTable>
      </UCard>
    </div>

    <!-- Post Grades Modal -->
    <UModal v-model:open="showGradeModal" title="Post Grades" description="Enter grades for a subject class">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Subject Code">
            <UInput placeholder="e.g. NCM 312" class="w-full" />
          </UFormField>
          <UFormField label="Student ID">
            <UInput placeholder="e.g. 2024-00142" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Midterm Grade">
              <UInput type="number" step="0.25" placeholder="1.00 – 5.00" class="w-full" />
            </UFormField>
            <UFormField label="Final Grade">
              <UInput type="number" step="0.25" placeholder="1.00 – 5.00" class="w-full" />
            </UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showGradeModal = false" />
        <UButton label="Post Grade" icon="i-lucide-award" @click="showGradeModal = false" />
      </template>
    </UModal>
  </div>
</template>
