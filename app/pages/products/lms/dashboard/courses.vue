<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const search = ref('')
const selectedCategory = ref('All')
const selectedStatus = ref('All')

const categories = ['All', 'Compliance', 'Leadership', 'Technical', 'Soft Skills', 'Onboarding']
const statuses = ['All', 'Published', 'Draft', 'Archived']

const courses = ref([
  { id: 'C001', title: 'JavaScript Fundamentals', category: 'Technical', status: 'Published', learners: 214, completion: 68, modules: 10, duration: '8h', instructor: 'Alex Rivera', updated: 'Aug 10' },
  { id: 'C002', title: 'Q3 Compliance Training', category: 'Compliance', status: 'Published', learners: 342, completion: 92, modules: 5, duration: '3h', instructor: 'Sarah Chen', updated: 'Aug 5' },
  { id: 'C003', title: 'Leadership Essentials', category: 'Leadership', status: 'Published', learners: 98, completion: 71, modules: 8, duration: '6h', instructor: 'Mark Torres', updated: 'Jul 28' },
  { id: 'C004', title: 'Project Management Pro', category: 'Leadership', status: 'Published', learners: 56, completion: 85, modules: 12, duration: '10h', instructor: 'Maria Santos', updated: 'Jul 20' },
  { id: 'C005', title: 'Data Literacy Bootcamp', category: 'Technical', status: 'Published', learners: 130, completion: 55, modules: 7, duration: '5h', instructor: 'James Reyes', updated: 'Aug 1' },
  { id: 'C006', title: 'Effective Communication', category: 'Soft Skills', status: 'Draft', learners: 0, completion: 0, modules: 6, duration: '4h', instructor: 'Priya Lal', updated: 'Aug 12' },
  { id: 'C007', title: 'New Employee Onboarding', category: 'Onboarding', status: 'Published', learners: 48, completion: 97, modules: 4, duration: '2h', instructor: 'HR Team', updated: 'Aug 8' },
  { id: 'C008', title: 'AI for Business', category: 'Technical', status: 'Published', learners: 62, completion: 40, modules: 9, duration: '7h', instructor: 'Alex Rivera', updated: 'Aug 13' },
  { id: 'C009', title: 'Excel Advanced Techniques', category: 'Technical', status: 'Archived', learners: 188, completion: 76, modules: 8, duration: '6h', instructor: 'Carlos Wu', updated: 'Jun 15' },
])

const statusConfig: Record<string, string> = {
  'Published': 'bg-success/10 text-success',
  'Draft': 'bg-warning/10 text-warning',
  'Archived': 'bg-muted/30 text-muted',
}

const filtered = computed(() => {
  return courses.value.filter((c) => {
    const matchSearch = !search.value || c.title.toLowerCase().includes(search.value.toLowerCase()) || c.instructor.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory = selectedCategory.value === 'All' || c.category === selectedCategory.value
    const matchStatus = selectedStatus.value === 'All' || c.status === selectedStatus.value
    return matchSearch && matchCategory && matchStatus
  })
})

const showCreateModal = ref(false)
const selectedCourse = ref<typeof courses.value[0] | null>(null)
const showDetailModal = ref(false)

function viewCourse(course: typeof courses.value[0]) {
  selectedCourse.value = course
  showDetailModal.value = true
}

function completionColor(pct: number): 'success' | 'primary' | 'warning' {
  if (pct >= 80) return 'success'
  if (pct >= 50) return 'primary'
  return 'warning'
}

const courseColumns = [
  { id: 'course', header: 'Course' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'learners', header: 'Learners', meta: { class: { td: 'font-semibold text-highlighted' } } },
  { id: 'completion', header: 'Completion' },
  { accessorKey: 'instructor', header: 'Instructor', meta: { class: { td: 'text-muted text-xs' } } },
  { id: 'actions', meta: { class: { th: 'text-right', td: 'text-right' } } },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Courses</h1>
        <p class="text-muted text-sm mt-1">Manage your {{ courses.length }} learning courses</p>
      </div>
      <UButton
        icon="i-lucide-plus"
        label="Create Course"
        @click="showCreateModal = true"
      />
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-success/10">
            <UIcon name="i-lucide-check-circle-2" class="size-5 text-success" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ courses.filter(c => c.status === 'Published').length }}</p>
            <p class="text-xs text-muted mt-1">Published Courses</p>
          </div>
        </div>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-info/10">
            <UIcon name="i-lucide-users" class="size-5 text-info" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ courses.reduce((s, c) => s + c.learners, 0).toLocaleString() }}</p>
            <p class="text-xs text-muted mt-1">Total Enrollments</p>
          </div>
        </div>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
            <UIcon name="i-lucide-trending-up" class="size-5 text-primary" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ Math.round(courses.filter(c => c.status === 'Published').reduce((s, c) => s + c.completion, 0) / courses.filter(c => c.status === 'Published').length) }}%</p>
            <p class="text-xs text-muted mt-1">Avg Completion Rate</p>
          </div>
        </div>
      </UCard>
      <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-warning/10">
            <UIcon name="i-lucide-file-edit" class="size-5 text-warning" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ courses.filter(c => c.status === 'Draft').length }}</p>
            <p class="text-xs text-muted mt-1">Courses in Draft</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput
          v-model="search"
          placeholder="Search courses or instructor…"
          icon="i-lucide-search"
          class="flex-1 min-w-48"
        />
        <USelect v-model="selectedCategory" :items="categories" class="w-44" />
        <USelect v-model="selectedStatus" :items="statuses" class="w-36" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} results</span>
      </div>
    </UCard>

    <!-- Course Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="overflow-x-auto">
        <UTable :data="filtered" :columns="courseColumns" class="w-full" @select="(e, row) => viewCourse(row.original)">
          <template #course-cell="{ row }">
            <div class="flex items-center gap-3">
              <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-book-open" class="size-4 text-primary" />
              </div>
              <div>
                <p class="font-medium text-highlighted">{{ row.original.title }}</p>
                <p class="text-xs text-dimmed">{{ row.original.modules }} modules · {{ row.original.duration }}</p>
              </div>
            </div>
          </template>
          <template #category-cell="{ row }">
            <UBadge :label="row.original.category" color="neutral" variant="subtle" size="sm" />
          </template>
          <template #status-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]">{{ row.original.status }}</span>
          </template>
          <template #completion-cell="{ row }">
            <div class="flex items-center gap-2">
              <UProgress :model-value="row.original.completion" :color="completionColor(row.original.completion)" class="min-w-16" />
              <span class="text-xs font-semibold text-highlighted w-8">{{ row.original.completion }}%</span>
            </div>
          </template>
          <template #actions-cell="{ row }">
            <div class="flex items-center justify-end" @click.stop>
              <UDropdownMenu
                :items="[
                  { label: 'View', icon: 'i-lucide-eye', onSelect: () => viewCourse(row.original) },
                  { label: 'Edit', icon: 'i-lucide-pencil' }
                ]"
                size="sm"
                :content="{
                  align: 'end',
                  side: 'bottom',
                  sideOffset: 8
                }"
              >
                <UButton icon="i-lucide-more-vertical" size="xs" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </div>
          </template>
          <template #empty>
            <UEmpty icon="i-lucide-book-open" title="No courses found" description="Try adjusting your search or filters." />
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Course Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedCourse?.title || ''" :description="`${selectedCourse?.category} · ${selectedCourse?.modules} modules · ${selectedCourse?.duration}`">
      <template #body>
        <div v-if="selectedCourse" class="space-y-5">
          <div class="flex items-center gap-4">
            <div class="size-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UIcon name="i-lucide-book-open" class="size-8 text-primary" />
            </div>
            <div>
              <p class="text-xl font-bold text-highlighted">{{ selectedCourse.title }}</p>
              <p class="text-muted">{{ selectedCourse.instructor }}</p>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-2" :class="statusConfig[selectedCourse.status]">{{ selectedCourse.status }}</span>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Learners Enrolled</p>
              <p class="text-highlighted font-medium">{{ selectedCourse.learners.toLocaleString() }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Completion Rate</p>
              <p class="text-highlighted font-medium">{{ selectedCourse.completion }}%</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Modules</p>
              <p class="text-highlighted font-medium">{{ selectedCourse.modules }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Total Duration</p>
              <p class="text-highlighted font-medium">{{ selectedCourse.duration }}</p>
            </div>
            <div>
              <p class="text-dimmed text-xs uppercase tracking-wide font-semibold mb-1">Last Updated</p>
              <p class="text-highlighted font-medium">{{ selectedCourse.updated }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="showDetailModal = false; selectedCourse = null" />
        <UButton label="Edit Course" icon="i-lucide-pencil" />
      </template>
    </UModal>

    <!-- Create Course Modal -->
    <UModal v-model:open="showCreateModal" title="Create New Course" description="Fill in the details to build a new learning course">
      <template #body>
        <div class="space-y-4">
          <UFormField label="Course Title">
            <UInput placeholder="e.g. Advanced Leadership Skills" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Category">
              <USelect :items="categories.slice(1)" class="w-full" />
            </UFormField>
            <UFormField label="Duration">
              <UInput placeholder="e.g. 6h" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Instructor">
            <UInput placeholder="Instructor name" class="w-full" />
          </UFormField>
          <UFormField label="Description">
            <UTextarea placeholder="Brief course description…" class="w-full" />
          </UFormField>
          <UFormField label="Status">
            <USelect :items="statuses.slice(1)" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="showCreateModal = false" />
        <UButton label="Create Course" icon="i-lucide-plus" @click="showCreateModal = false" />
      </template>
    </UModal>
  </div>
</template>
