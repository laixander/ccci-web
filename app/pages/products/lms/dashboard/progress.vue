<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const search = ref('')
const selectedCourse = ref('All')

const courseOptions = ['All', 'JavaScript Fundamentals', 'Q3 Compliance Training', 'Leadership Essentials', 'Data Literacy Bootcamp', 'New Employee Onboarding']

const kpis = [
  { label: 'Active Learners', value: '1,240', icon: 'i-lucide-users', color: 'text-primary', bg: 'bg-primary/10', change: '↑ 48 this week', changeColor: 'text-success' },
  { label: 'Avg Completion', value: '74%', icon: 'i-lucide-line-chart', color: 'text-success', bg: 'bg-success/10', change: '↑ 3.2% vs last mo.', changeColor: 'text-success' },
  { label: 'At-Risk Learners', value: '43', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', change: 'No activity 7+ days', changeColor: 'text-error' },
  { label: 'Avg Time on Platform', value: '2.4h/wk', icon: 'i-lucide-clock', color: 'text-info', bg: 'bg-info/10', change: '↑ 12min vs last wk.', changeColor: 'text-success' },
]

const learners = ref([
  { id: 'L001', name: 'Maria Santos', initials: 'MS', course: 'JavaScript Fundamentals', pct: 82, lastActive: 'Today', status: 'On Track', avatarColor: 'primary' as const },
  { id: 'L002', name: 'James Reyes', initials: 'JR', course: 'Leadership Essentials', pct: 60, lastActive: 'Yesterday', status: 'On Track', avatarColor: 'neutral' as const },
  { id: 'L003', name: 'Ana Dela Cruz', initials: 'AD', course: 'Q3 Compliance Training', pct: 95, lastActive: 'Today', status: 'Completed', avatarColor: 'warning' as const },
  { id: 'L004', name: 'Carlos Wu', initials: 'CW', course: 'Data Literacy Bootcamp', pct: 28, lastActive: '9 days ago', status: 'At Risk', avatarColor: 'secondary' as const },
  { id: 'L005', name: 'Priya Lal', initials: 'PL', course: 'New Employee Onboarding', pct: 100, lastActive: 'Aug 8', status: 'Completed', avatarColor: 'success' as const },
  { id: 'L006', name: 'Ryan Cruz', initials: 'RC', course: 'JavaScript Fundamentals', pct: 15, lastActive: '12 days ago', status: 'At Risk', avatarColor: 'error' as const },
  { id: 'L007', name: 'Ben Torres', initials: 'BT', course: 'Leadership Essentials', pct: 72, lastActive: '2 days ago', status: 'On Track', avatarColor: 'info' as const },
  { id: 'L008', name: 'Lena Park', initials: 'LP', course: 'Q3 Compliance Training', pct: 100, lastActive: 'Aug 5', status: 'Completed', avatarColor: 'primary' as const },
])

const statusConfig: Record<string, string> = {
  'On Track': 'bg-success/10 text-success',
  'Completed': 'bg-primary/10 text-primary',
  'At Risk': 'bg-error/10 text-error',
}

const filtered = computed(() => {
  return learners.value.filter((l) => {
    const matchSearch = !search.value || l.name.toLowerCase().includes(search.value.toLowerCase())
    const matchCourse = selectedCourse.value === 'All' || l.course === selectedCourse.value
    return matchSearch && matchCourse
  })
})

const enrollmentTrend = [
  { month: 'Mar', value: 180 }, { month: 'Apr', value: 210 }, { month: 'May', value: 260 },
  { month: 'Jun', value: 295 }, { month: 'Jul', value: 330 }, { month: 'Aug', value: 385 },
]
const maxEnroll = Math.max(...enrollmentTrend.map(d => d.value))

const atRiskLearners = computed(() => learners.value.filter(l => l.status === 'At Risk'))
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Progress Tracking</h1>
        <p class="text-muted text-sm mt-1">Monitor learner engagement and course completion rates in real-time</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-calendar" label="Aug 2026" color="neutral" variant="outline" size="sm" trailing-icon="i-lucide-chevron-down" />
        <UButton icon="i-lucide-download" label="Export" color="neutral" variant="outline" size="sm" />
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="kpi in kpis" :key="kpi.label" :ui="{ body: 'p-5' }" class="hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center flex-shrink-0', kpi.bg]">
            <UIcon :name="kpi.icon" :class="['size-5', kpi.color]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-highlighted">{{ kpi.value }}</p>
            <p class="text-xs text-muted">{{ kpi.label }}</p>
          </div>
        </div>
        <p :class="['text-xs mt-2', kpi.changeColor]">{{ kpi.change }}</p>
      </UCard>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Enrollment Trend -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-semibold text-highlighted">Enrollment Trend</h2>
            <p class="text-xs text-muted mt-0.5">New enrollments per month</p>
          </div>
          <UBadge label="+55 this month" color="success" variant="subtle" />
        </div>
        <div class="flex items-end gap-3 h-36">
          <div v-for="d in enrollmentTrend" :key="d.month" class="flex-1 flex flex-col items-center gap-1">
            <span class="text-xs font-bold text-highlighted">{{ d.value }}</span>
            <div
              class="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
              :style="{ height: (d.value / maxEnroll * 100) + '%' }"
            />
            <span class="text-xs text-dimmed">{{ d.month }}</span>
          </div>
        </div>
      </UCard>

      <!-- At-Risk Learners -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-highlighted">At-Risk Learners</h2>
          <UBadge :label="`${atRiskLearners.length}`" color="error" variant="subtle" />
        </div>
        <div class="space-y-3">
          <div v-for="learner in atRiskLearners" :key="learner.id" class="flex items-center gap-3 p-3 rounded-lg bg-error/5 border border-error/10">
            <UAvatar :text="learner.initials" size="sm" :color="learner.avatarColor" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">{{ learner.name }}</p>
              <p class="text-xs text-error">{{ learner.lastActive }}</p>
            </div>
            <span class="text-xs font-bold text-error">{{ learner.pct }}%</span>
          </div>
          <UButton label="Send Nudge to All" icon="i-lucide-send" size="sm" color="neutral" variant="outline" class="w-full" />
        </div>
      </UCard>
    </div>

    <!-- Filters -->
    <UCard :ui="{ body: 'p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search learners…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedCourse" :items="courseOptions" class="w-64" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} learners</span>
      </div>
    </UCard>

    <!-- Learner Progress Table -->
    <UCard :ui="{ body: 'p-0' }">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-default">
              <th class="text-left px-5 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Learner</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Course</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Progress</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Last Active</th>
              <th class="text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody class="divide-y divide-default">
            <tr v-for="l in filtered" :key="l.id" class="hover:bg-muted/30 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="l.initials" size="sm" :color="l.avatarColor" />
                  <div>
                    <p class="font-medium text-highlighted">{{ l.name }}</p>
                    <p class="text-xs text-dimmed">{{ l.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-muted">{{ l.course }}</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-muted/50 rounded-full h-1.5">
                    <div
                      class="h-1.5 rounded-full transition-all duration-500"
                      :class="l.pct >= 80 ? 'bg-success' : l.pct >= 50 ? 'bg-primary' : 'bg-warning'"
                      :style="{ width: l.pct + '%' }"
                    />
                  </div>
                  <span class="text-xs font-semibold text-highlighted">{{ l.pct }}%</span>
                </div>
              </td>
              <td class="px-4 py-4 text-muted text-xs">{{ l.lastActive }}</td>
              <td class="px-4 py-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[l.status]">
                  {{ l.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <UButton icon="i-lucide-send" size="xs" color="neutral" variant="ghost" />
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filtered.length === 0" class="py-16 text-center">
          <UIcon name="i-lucide-users" class="size-10 text-muted mx-auto mb-3" />
          <p class="text-muted font-medium">No learners found</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
