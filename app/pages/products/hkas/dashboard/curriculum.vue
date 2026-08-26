<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const search = ref('')
const selectedGrade = ref('All')
const selectedStatus = ref('All')

const grades = ['All', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
const statuses = ['All', 'Active', 'Completed', 'Draft', 'Archived']

const subjects = ref([
  { id: 'PE-001', subject: 'Physical Education 1', grade: 'Grade 7', teacher: 'Coach R. Santos', units: 2, topics: 8, enrolled: 42, completionRate: 65, status: 'Active', term: 'SY 2025–2026', icon: 'i-lucide-sport-shoe', color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'PE-002', subject: 'Physical Education 2', grade: 'Grade 8', teacher: 'Coach R. Santos', units: 2, topics: 9, enrolled: 38, completionRate: 72, status: 'Active', term: 'SY 2025–2026', icon: 'i-lucide-bike', color: 'text-success', bg: 'bg-success/10' },
  { id: 'PE-003', subject: 'Physical Education 3', grade: 'Grade 9', teacher: 'Coach A. Dela Cruz', units: 2, topics: 10, enrolled: 45, completionRate: 58, status: 'Active', term: 'SY 2025–2026', icon: 'i-lucide-person-standing', color: 'text-warning', bg: 'bg-warning/10' },
  { id: 'PE-004', subject: 'Physical Education 4', grade: 'Grade 10', teacher: 'Coach A. Dela Cruz', units: 2, topics: 10, enrolled: 40, completionRate: 85, status: 'Active', term: 'SY 2025–2026', icon: 'i-lucide-dumbbell', color: 'text-info', bg: 'bg-info/10' },
  { id: 'PE-005', subject: 'Health & Physical Education', grade: 'Grade 11', teacher: 'Coach M. Reyes', units: 3, topics: 12, enrolled: 36, completionRate: 100, status: 'Completed', term: 'SY 2024–2025', icon: 'i-lucide-heart-pulse', color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'PE-006', subject: 'Sports & Athletics', grade: 'Grade 12', teacher: 'Coach M. Reyes', units: 3, topics: 11, enrolled: 28, completionRate: 100, status: 'Completed', term: 'SY 2024–2025', icon: 'i-lucide-trophy', color: 'text-success', bg: 'bg-success/10' },
  { id: 'PE-007', subject: 'Dance & Movement', grade: 'Grade 9', teacher: 'Coach J. Flores', units: 2, topics: 6, enrolled: 0, completionRate: 0, status: 'Draft', term: 'SY 2025–2026', icon: 'i-lucide-music', color: 'text-warning', bg: 'bg-warning/10' },
])

const statusConfig: Record<string, string> = {
  Active: 'bg-success/10 text-success',
  Completed: 'bg-info/10 text-info',
  Draft: 'bg-warning/10 text-warning',
  Archived: 'bg-muted text-muted',
}

const filtered = computed(() =>
  subjects.value.filter(s => {
    const matchSearch = !search.value || s.subject.toLowerCase().includes(search.value.toLowerCase()) || s.teacher.toLowerCase().includes(search.value.toLowerCase())
    const matchGrade = selectedGrade.value === 'All' || s.grade === selectedGrade.value
    const matchStatus = selectedStatus.value === 'All' || s.status === selectedStatus.value
    return matchSearch && matchGrade && matchStatus
  })
)

const showAddModal = ref(false)
const selectedSubject = ref<typeof subjects.value[0] | null>(null)
const showDetailModal = ref(false)

function viewSubject(s: typeof subjects.value[0]) {
  selectedSubject.value = s
  showDetailModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">PE Curriculum</h1>
        <p class="text-muted text-sm mt-1">Manage Physical Education subjects, lesson plans, and CHED compliance</p>
      </div>
      <UButton icon="i-lucide-plus" label="Add Subject" size="sm" @click="showAddModal = true" />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 items-center">
      <UInput v-model="search" placeholder="Search subjects or teachers…" icon="i-lucide-search" class="flex-1 min-w-48" />
      <USelect v-model="selectedGrade" :items="grades" class="w-40" />
      <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
      <span class="text-sm text-muted">{{ filtered.length }} subjects</span>
    </div>

    <!-- Subject Cards Grid -->
    <div v-if="filtered.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <UCard
        v-for="s in filtered"
        :key="s.id"
        class="hover:ring-1 hover:ring-primary/30 transition-all cursor-pointer group"
        @click="viewSubject(s)"
      >
        <!-- Card Header -->
        <div class="flex items-start justify-between mb-4">
          <div :class="['size-11 rounded-xl flex items-center justify-center flex-shrink-0', s.bg]">
            <UIcon :name="s.icon" :class="['size-6', s.color]" />
          </div>
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[s.status]">
            {{ s.status }}
          </span>
        </div>

        <!-- Subject Info -->
        <h3 class="font-semibold text-highlighted text-base leading-snug group-hover:text-primary transition-colors">{{ s.subject }}</h3>
        <p class="text-xs text-dimmed mt-1">{{ s.id }} · {{ s.term }}</p>

        <div class="flex items-center gap-3 mt-3 text-xs text-muted">
          <span class="flex items-center gap-1"><UIcon name="i-lucide-user" class="size-3.5" />{{ s.teacher }}</span>
          <span class="flex items-center gap-1"><UIcon name="i-lucide-graduation-cap" class="size-3.5" />{{ s.grade }}</span>
        </div>

        <USeparator class="my-4" />

        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 mb-4">
          <div class="text-center">
            <p class="text-lg font-bold text-highlighted">{{ s.units }}</p>
            <p class="text-xs text-dimmed">Units</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-highlighted">{{ s.topics }}</p>
            <p class="text-xs text-dimmed">Topics</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-highlighted">{{ s.enrolled }}</p>
            <p class="text-xs text-dimmed">Enrolled</p>
          </div>
        </div>

        <!-- Completion progress -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs text-muted">Completion</span>
            <span class="text-xs font-semibold text-highlighted">{{ s.completionRate }}%</span>
          </div>
          <UProgress :model-value="s.completionRate" :color="s.completionRate === 100 ? 'success' : 'primary'" />
        </div>

        <!-- Actions -->
        <div class="flex gap-2 mt-4 pt-4 border-t border-default" @click.stop>
          <UButton block label="View" icon="i-lucide-eye" size="sm" color="neutral" variant="outline" class="flex-1" @click="viewSubject(s)" />
          <UButton block label="Edit" icon="i-lucide-pencil" size="sm" variant="ghost" color="neutral" class="flex-1" />
        </div>
      </UCard>
    </div>

    <!-- Empty state -->
    <div v-else class="py-20 flex flex-col items-center justify-center">
      <UEmpty icon="i-lucide-book-open" title="No PE subjects found" description="Try adjusting your filters or add a new subject" />
    </div>

    <!-- Subject Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedSubject?.subject || ''" :description="selectedSubject?.grade">
      <template #body>
        <div v-if="selectedSubject" class="space-y-5">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Subject ID</p><p class="text-highlighted font-medium">{{ selectedSubject.id }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">PE Teacher</p><p class="text-highlighted font-medium">{{ selectedSubject.teacher }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Units</p><p class="text-highlighted font-medium">{{ selectedSubject.units }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Topics</p><p class="text-highlighted font-medium">{{ selectedSubject.topics }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Students Enrolled</p><p class="text-highlighted font-medium">{{ selectedSubject.enrolled }}</p></div>
            <div><p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">School Year</p><p class="text-highlighted font-medium">{{ selectedSubject.term }}</p></div>
          </div>
          <USeparator />
          <div>
            <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-2">Completion Rate</p>
            <div class="flex items-center gap-3">
              <div class="flex-1"><UProgress :model-value="selectedSubject.completionRate" :color="selectedSubject.completionRate === 100 ? 'success' : 'primary'" /></div>
              <span class="font-bold text-highlighted">{{ selectedSubject.completionRate }}%</span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedSubject = null" />
        <UButton label="Edit Subject" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Add Subject Modal -->
    <UModal v-model:open="showAddModal" title="Add PE Subject" description="Create a new Physical Education curriculum entry">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Subject Name"><UInput placeholder="e.g. Physical Education 1" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Grade Level"><USelect :items="grades.slice(1)" class="w-full" /></UFormField>
            <UFormField label="Units"><UInput type="number" placeholder="e.g. 2" class="w-full" /></UFormField>
          </div>
          <UFormField label="PE Teacher"><UInput placeholder="e.g. Coach Santos" class="w-full" /></UFormField>
          <UFormField label="School Year"><UInput placeholder="e.g. SY 2025–2026" class="w-full" /></UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showAddModal = false" />
        <UButton label="Create Subject" icon="i-lucide-plus" @click="showAddModal = false" />
      </template>
    </UModal>
  </div>
</template>
