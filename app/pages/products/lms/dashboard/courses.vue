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

function completionColor(pct: number) {
  if (pct >= 80) return 'bg-success'
  if (pct >= 50) return 'bg-primary'
  return 'bg-warning'
}
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
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-highlighted">{{ courses.filter(c => c.status === 'Published').length }}</p>
        <p class="text-xs text-muted mt-1">Published Courses</p>
      </UCard>
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-highlighted">{{ courses.reduce((s, c) => s + c.learners, 0).toLocaleString() }}</p>
        <p class="text-xs text-muted mt-1">Total Enrollments</p>
      </UCard>
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-highlighted">{{ Math.round(courses.filter(c => c.status === 'Published').reduce((s, c) => s + c.completion, 0) / courses.filter(c => c.status === 'Published').length) }}%</p>
        <p class="text-xs text-muted mt-1">Avg Completion Rate</p>
      </UCard>
      <UCard :ui="{ body: 'p-4' }">
        <p class="text-2xl font-bold text-highlighted">{{ courses.filter(c => c.status === 'Draft').length }}</p>
        <p class="text-xs text-muted mt-1">Courses in Draft</p>
      </UCard>
    </div>

    <!-- Filters -->
    <UCard :ui="{ body: 'p-4' }">
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
    <UCard :ui="{ body: 'p-0' }">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Course</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Category</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Learners</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Completion</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Instructor</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr
              v-for="course in filtered"
              :key="course.id"
              class="hover:bg-muted/30 transition-colors cursor-pointer"
              @click="viewCourse(course)"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-book-open" class="size-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium text-highlighted">{{ course.title }}</p>
                    <p class="text-xs text-dimmed">{{ course.modules }} modules · {{ course.duration }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <UBadge :label="course.category" color="neutral" variant="subtle" size="sm" />
              </td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[course.status]">
                  {{ course.status }}
                </span>
              </td>
              <td class="px-4 py-4 font-semibold text-highlighted">{{ course.learners.toLocaleString() }}</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-muted/50 rounded-full h-1.5 min-w-16">
                    <div
                      class="h-1.5 rounded-full transition-all duration-500"
                      :class="completionColor(course.completion)"
                      :style="{ width: course.completion + '%' }"
                    />
                  </div>
                  <span class="text-xs font-semibold text-highlighted w-8">{{ course.completion }}%</span>
                </div>
              </td>
              <td class="px-4 py-4 text-muted text-xs">{{ course.instructor }}</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1" @click.stop>
                  <UButton icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" @click="viewCourse(course)" />
                  <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" />
                  <UButton icon="i-lucide-more-horizontal" size="xs" color="neutral" variant="ghost" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filtered.length === 0" class="py-16 text-center">
          <UIcon name="i-lucide-book-open" class="size-10 text-muted mx-auto mb-3" />
          <p class="text-muted font-medium">No courses found</p>
          <p class="text-dimmed text-sm mt-1">Try adjusting your search or filters</p>
        </div>
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
