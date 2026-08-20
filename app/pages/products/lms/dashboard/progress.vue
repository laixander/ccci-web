<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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

const chartData = computed(() => ({
  labels: enrollmentTrend.map(d => d.month),
  datasets: [{
    label: 'New Enrollments',
    data: enrollmentTrend.map(d => d.value),
    backgroundColor: '#10b981',
    hoverBackgroundColor: '#059669',
    borderRadius: 6,
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          return context.parsed.y + ' enrollments';
        }
      }
    }
  },
  scales: {
    y: {
      display: false,
      beginAtZero: true
    },
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#64748b', font: { size: 12 } }
    }
  }
}

const atRiskLearners = computed(() => learners.value.filter(l => l.status === 'At Risk'))

const learnerColumns = [
  { id: 'learner', header: 'Learner' },
  { accessorKey: 'course', header: 'Course', meta: { class: { td: 'text-muted' } } },
  { id: 'progress', header: 'Progress' },
  { accessorKey: 'lastActive', header: 'Last Active', meta: { class: { td: 'text-muted text-xs' } } },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', meta: { class: { th: 'text-right', td: 'text-right' } } },
]
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
      <UCard v-for="kpi in kpis" :key="kpi.label" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
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
      <UCard :ui="{ root: 'shadow-sm lg:col-span-2' }">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold text-highlighted">Enrollment Trend</h2>
            <p class="text-xs text-muted mt-0.5">New enrollments per month</p>
          </div>
          <UBadge label="+55 this month" color="success" variant="subtle" />
        </div>
        <div class="h-48 w-full mt-4 sm:mt-6">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </UCard>

      <!-- At-Risk Learners -->
      <UCard :ui="{ root: 'shadow-sm' }">
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-highlighted">At-Risk Learners</h2>
          <UBadge :label="`${atRiskLearners.length}`" color="error" variant="subtle" />
        </div>
        <div class="space-y-3 mt-4 sm:mt-6">
          <div v-for="learner in atRiskLearners" :key="learner.id" class="flex items-center gap-3 p-3 rounded-lg bg-error/5 border border-error/10">
            <UAvatar :text="learner.initials" size="sm" :color="learner.avatarColor" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">{{ learner.name }}</p>
              <p class="text-xs text-error">{{ learner.lastActive }}</p>
            </div>
            <span class="text-xs font-bold text-error">{{ learner.pct }}%</span>
          </div>
          <UButton block label="Send Nudge to All" icon="i-lucide-send" size="sm" color="neutral" variant="outline" />
        </div>
      </UCard>
    </div>

    <!-- Filters -->
    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
      <div class="flex flex-wrap gap-3 items-center">
        <UInput v-model="search" placeholder="Search learners…" icon="i-lucide-search" class="flex-1 min-w-48" />
        <USelect v-model="selectedCourse" :items="courseOptions" class="w-64" />
        <span class="text-sm text-muted ml-auto">{{ filtered.length }} learners</span>
      </div>
    </UCard>

    <!-- Learner Progress Table -->
    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="overflow-x-auto">
        <UTable :data="filtered" :columns="learnerColumns" class="w-full">
          <template #learner-cell="{ row }">
            <div class="flex items-center gap-3">
              <UAvatar :text="row.original.initials" size="sm" :color="row.original.avatarColor" />
              <div>
                <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                <p class="text-xs text-dimmed">{{ row.original.id }}</p>
              </div>
            </div>
          </template>
          <template #progress-cell="{ row }">
            <div class="flex items-center gap-2">
              <UProgress
                :model-value="row.original.pct"
                :color="row.original.pct >= 80 ? 'success' : row.original.pct >= 50 ? 'primary' : 'warning'"
                class="w-24"
              />
              <span class="text-xs font-semibold text-highlighted">{{ row.original.pct }}%</span>
            </div>
          </template>
          <template #status-cell="{ row }">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="statusConfig[row.original.status]">{{ row.original.status }}</span>
          </template>
          <template #actions-cell="{ row }">
            <UTooltip text="Send Nudge">
              <UButton icon="i-lucide-send" size="xs" color="neutral" variant="ghost" />
            </UTooltip>
          </template>
          <template #empty>
            <UEmpty icon="i-lucide-users" title="No learners found" description="Try adjusting your search or filters." />
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>
