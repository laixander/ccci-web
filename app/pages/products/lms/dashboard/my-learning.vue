<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const user = {
  name: 'Alex Rivera',
  initials: 'AR',
  role: 'Software Engineer',
  dept: 'Engineering',
  id: 'L042',
  email: 'alex.rivera@company.com',
  joined: 'January 2024',
  avatar: 'primary' as const,
  completedCourses: 3,
  totalCourses: 5,
  totalHours: 24,
  certificates: 2,
}

const activeTab = ref('courses')
const tabs = [
  { label: 'My Courses', slot: 'courses' },
  { label: 'Certificates', slot: 'certificates' },
  { label: 'Assessments', slot: 'assessments' },
]

const myCourses = [
  { id: 'C001', title: 'JavaScript Fundamentals', category: 'Technical', pct: 82, modules: 10, completedModules: 8, status: 'In Progress', lastAccessed: 'Today' },
  { id: 'C002', title: 'Q3 Compliance Training', category: 'Compliance', pct: 100, modules: 5, completedModules: 5, status: 'Completed', lastAccessed: 'Aug 5' },
  { id: 'C003', title: 'Leadership Essentials', category: 'Leadership', pct: 60, modules: 8, completedModules: 5, status: 'In Progress', lastAccessed: '2 days ago' },
  { id: 'C007', title: 'New Employee Onboarding', category: 'Onboarding', pct: 100, modules: 4, completedModules: 4, status: 'Completed', lastAccessed: 'Mar 2024' },
  { id: 'C008', title: 'AI for Business', category: 'Technical', pct: 15, modules: 9, completedModules: 1, status: 'Not Started', lastAccessed: 'Never' },
]

const myCertificates = [
  { id: 'CERT-0302', course: 'Q3 Compliance Training', issued: 'Aug 5, 2026', expiry: 'Aug 5, 2027', status: 'Active' },
  { id: 'CERT-0188', course: 'New Employee Onboarding', issued: 'Jan 20, 2024', expiry: 'N/A', status: 'Active' },
]

const myAssessments = ref([
  { title: 'JS Fundamentals – Final Quiz', course: 'JavaScript Fundamentals', score: null, maxScore: 100, status: 'Pending', due: 'Aug 20' },
  { title: 'Q3 Compliance Knowledge Check', course: 'Q3 Compliance Training', score: 94, maxScore: 100, status: 'Passed', due: 'Aug 5' },
  { title: 'Leadership Case Study', course: 'Leadership Essentials', score: null, maxScore: 100, status: 'In Progress', due: 'Aug 25' },
])

const certStatusConfig: Record<string, string> = {
  'Active': 'bg-success/10 text-success',
}

const courseStatusConfig: Record<string, string> = {
  'Completed': 'bg-success/10 text-success',
  'In Progress': 'bg-primary/10 text-primary',
  'Not Started': 'bg-muted/30 text-muted',
}

const assessmentStatusConfig: Record<string, string> = {
  'Passed': 'bg-success/10 text-success',
  'Failed': 'bg-error/10 text-error',
  'Pending': 'bg-warning/10 text-warning',
  'In Progress': 'bg-primary/10 text-primary',
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">My Learning</h1>
        <p class="text-muted text-sm mt-1">Track your learning journey, certificates, and assessments</p>
      </div>
    </div>

    <!-- Profile Card -->
    <UCard :ui="{ body: 'p-6' }">
      <div class="flex items-center gap-6">
        <UAvatar :text="user.initials" size="2xl" :color="user.avatar" />
        <div class="flex-1">
          <h2 class="text-xl font-bold text-highlighted">{{ user.name }}</h2>
          <p class="text-muted">{{ user.role }} · {{ user.dept }}</p>
          <div class="flex gap-4 mt-2 text-sm text-dimmed">
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-id-card" class="size-3.5" /> {{ user.id }}</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-calendar" class="size-3.5" /> Joined {{ user.joined }}</span>
          </div>
        </div>
        <!-- Learning stats -->
        <div class="flex gap-6 text-center">
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ user.completedCourses }}</p>
            <p class="text-xs text-muted">Completed</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ user.totalHours }}h</p>
            <p class="text-xs text-muted">Learning Time</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ user.certificates }}</p>
            <p class="text-xs text-muted">Certificates</p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Tabs -->
    <UTabs :items="tabs" color="primary">

      <!-- My Courses Tab -->
      <template #courses>
        <div class="pt-4 space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UCard
              v-for="course in myCourses"
              :key="course.id"
              :ui="{ body: 'p-5' }"
              class="hover:shadow-md transition-shadow cursor-pointer"
            >
              <div class="flex items-start gap-4">
                <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-book-open" class="size-6 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-3 mb-1">
                    <p class="font-semibold text-highlighted truncate">{{ course.title }}</p>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0" :class="courseStatusConfig[course.status]">
                      {{ course.status }}
                    </span>
                  </div>
                  <p class="text-xs text-muted mb-3">{{ course.completedModules }} / {{ course.modules }} modules · Last accessed: {{ course.lastAccessed }}</p>
                  <div class="flex items-center gap-3">
                    <div class="flex-1 bg-muted/50 rounded-full h-2">
                      <div
                        class="h-2 rounded-full transition-all duration-500"
                        :class="course.pct === 100 ? 'bg-success' : course.pct > 0 ? 'bg-primary' : 'bg-muted'"
                        :style="{ width: course.pct + '%' }"
                      />
                    </div>
                    <span class="text-xs font-bold text-highlighted w-8 text-right">{{ course.pct }}%</span>
                  </div>
                </div>
                <UButton
                  :label="course.pct === 100 ? 'Review' : course.pct === 0 ? 'Start' : 'Continue'"
                  :icon="course.pct === 100 ? 'i-lucide-rotate-ccw' : 'i-lucide-play'"
                  size="sm"
                  :color="course.pct === 100 ? 'neutral' : 'primary'"
                  :variant="course.pct === 100 ? 'outline' : 'solid'"
                />
              </div>
            </UCard>
          </div>
        </div>
      </template>

      <!-- Certificates Tab -->
      <template #certificates>
        <div class="pt-4 space-y-4">
          <div v-if="myCertificates.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard
              v-for="cert in myCertificates"
              :key="cert.id"
              :ui="{ body: 'p-6' }"
              class="border-warning/20 bg-warning/5 hover:shadow-md transition-shadow"
            >
              <div class="flex items-start gap-4">
                <div class="size-14 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-award" class="size-8 text-warning" />
                </div>
                <div class="flex-1">
                  <p class="font-bold text-highlighted">{{ cert.course }}</p>
                  <p class="text-xs text-dimmed mt-1">{{ cert.id }}</p>
                  <div class="flex gap-4 mt-3 text-xs text-muted">
                    <span>Issued: {{ cert.issued }}</span>
                    <span v-if="cert.expiry !== 'N/A'">Expires: {{ cert.expiry }}</span>
                  </div>
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-3" :class="certStatusConfig[cert.status]">
                    {{ cert.status }}
                  </span>
                </div>
              </div>
              <div class="flex gap-2 mt-4 pt-4 border-t border-default">
                <UButton icon="i-lucide-download" label="Download" size="sm" color="neutral" variant="outline" class="flex-1" />
                <UButton icon="i-lucide-share-2" label="Share" size="sm" color="neutral" variant="outline" class="flex-1" />
              </div>
            </UCard>
          </div>
          <div v-else class="py-16 text-center">
            <UIcon name="i-lucide-award" class="size-12 text-muted mx-auto mb-3" />
            <p class="text-muted font-medium">No certificates yet</p>
            <p class="text-dimmed text-sm mt-1">Complete a course to earn your first certificate</p>
          </div>
        </div>
      </template>

      <!-- Assessments Tab -->
      <template #assessments>
        <div class="pt-4">
          <UCard :ui="{ body: 'p-0' }">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-default">
                    <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Assessment</th>
                    <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Score</th>
                    <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Due</th>
                    <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
                    <th class="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody class="divide-y divide-default">
                  <tr v-for="a in myAssessments" :key="a.title" class="hover:bg-muted/30 transition-colors">
                    <td class="px-5 py-4">
                      <p class="font-medium text-highlighted">{{ a.title }}</p>
                      <p class="text-xs text-dimmed">{{ a.course }}</p>
                    </td>
                    <td class="px-4 py-4 text-highlighted font-semibold">
                      <span v-if="a.score !== null">{{ a.score }} / {{ a.maxScore }}</span>
                      <span v-else class="text-muted">—</span>
                    </td>
                    <td class="px-4 py-4 text-muted text-xs">{{ a.due }}</td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="assessmentStatusConfig[a.status]">
                        {{ a.status }}
                      </span>
                    </td>
                    <td class="px-4 py-4">
                      <UButton
                        :label="a.status === 'Passed' ? 'View' : 'Start'"
                        size="xs"
                        :color="a.status === 'Passed' ? 'neutral' : 'primary'"
                        :variant="a.status === 'Passed' ? 'outline' : 'solid'"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>
  </div>
</template>
