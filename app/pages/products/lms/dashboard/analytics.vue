<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

definePageMeta({
  layout: 'dashboard'
})

const kpis = [
  { label: 'Total Learners', value: 1240, prev: 1092, prefix: '', suffix: '', icon: 'i-lucide-users', color: 'text-primary', bg: 'bg-primary/10', format: '' },
  { label: 'Avg Completion Rate', value: 74, prev: 71, prefix: '', suffix: '%', icon: 'i-lucide-line-chart', color: 'text-success', bg: 'bg-success/10', format: '' },
  { label: 'Avg Time-to-Complete', value: 12, prev: 15, prefix: '', suffix: ' days', icon: 'i-lucide-clock', color: 'text-info', bg: 'bg-info/10', format: '' },
  { label: 'Certificates Issued', value: 312, prev: 265, prefix: '', suffix: '', icon: 'i-lucide-award', color: 'text-warning', bg: 'bg-warning/10', format: '' },
]

function formatValue(kpi: typeof kpis[0]) {
  return kpi.prefix + kpi.value + kpi.suffix
}

function pctChange(cur: number, prev: number) {
  const pct = ((cur - prev) / prev * 100)
  return (pct > 0 ? '+' : '') + pct.toFixed(1) + '%'
}

function isImprovement(kpi: typeof kpis[0]) {
  if (kpi.label === 'Avg Time-to-Complete') return kpi.value < kpi.prev
  return kpi.value > kpi.prev
}

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

const categoryBreakdown = [
  { cat: 'Compliance', learners: 342, color: 'bg-primary' },
  { cat: 'Technical', learners: 406, color: 'bg-info' },
  { cat: 'Leadership', learners: 154, color: 'bg-warning' },
  { cat: 'Soft Skills', learners: 98, color: 'bg-success' },
  { cat: 'Onboarding', learners: 240, color: 'bg-error' },
]
const totalLearners = categoryBreakdown.reduce((s, c) => s + c.learners, 0)

const topCourses = [
  { title: 'Q3 Compliance Training', completion: 92, learners: 342, initials: 'QC', color: 'primary' as const },
  { title: 'New Employee Onboarding', completion: 97, learners: 48, initials: 'NE', color: 'success' as const },
  { title: 'Project Management Pro', completion: 85, learners: 56, initials: 'PM', color: 'warning' as const },
  { title: 'Effective Communication', completion: 81, learners: 88, initials: 'EC', color: 'info' as const },
]

const leaderboard = [
  { name: 'Maria Santos', initials: 'MS', courses: 4, hours: 32, score: 94, color: 'primary' as const },
  { name: 'Ana Dela Cruz', initials: 'AD', courses: 3, hours: 28, score: 91, color: 'warning' as const },
  { name: 'James Reyes', initials: 'JR', courses: 3, hours: 26, score: 88, color: 'neutral' as const },
  { name: 'Priya Lal', initials: 'PL', courses: 2, hours: 18, score: 85, color: 'success' as const },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">LMS Analytics</h1>
        <p class="text-muted text-sm mt-1">Real-time insights into your learning programs</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-calendar" label="Aug 2026" color="neutral" variant="outline" size="sm" trailing-icon="i-lucide-chevron-down" />
        <UButton icon="i-lucide-download" label="Export" color="neutral" variant="outline" size="sm" />
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard v-for="kpi in kpis" :key="kpi.label" :ui="{ body: 'p-5' }" class="hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-3">
          <div :class="['size-9 rounded-lg flex items-center justify-center', kpi.bg]">
            <UIcon :name="kpi.icon" :class="['size-4', kpi.color]" />
          </div>
          <span :class="['text-xs font-bold px-1.5 py-0.5 rounded', isImprovement(kpi) ? 'text-success bg-success/10' : 'text-error bg-error/10']">
            {{ pctChange(kpi.value, kpi.prev) }}
          </span>
        </div>
        <p class="text-2xl font-bold text-highlighted">{{ formatValue(kpi) }}</p>
        <p class="text-xs text-muted mt-1">{{ kpi.label }}</p>
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
        <div class="h-48 w-full mt-2">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </UCard>

      <!-- Category Breakdown -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-5">By Category</h2>
        <div class="space-y-3">
          <div v-for="cat in categoryBreakdown" :key="cat.cat" class="space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">{{ cat.cat }}</span>
              <span class="font-semibold text-highlighted">{{ cat.learners }} <span class="text-xs text-dimmed">({{ Math.round(cat.learners / totalLearners * 100) }}%)</span></span>
            </div>
            <div class="bg-muted/50 rounded-full h-1.5">
              <div :class="['h-1.5 rounded-full transition-all duration-500', cat.color]" :style="{ width: (cat.learners / totalLearners * 100) + '%' }" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Courses by Completion -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-semibold text-highlighted">Top Courses by Completion</h2>
        </div>
        <div class="space-y-4">
          <div v-for="(course, i) in topCourses" :key="course.title" class="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-default">
            <div class="relative">
              <UAvatar :text="course.initials" size="lg" :color="course.color" />
              <span class="absolute -top-1 -right-1 size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">#{{ i + 1 }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-highlighted text-sm truncate">{{ course.title }}</p>
              <p class="text-xs text-muted">{{ course.learners }} learners</p>
              <div class="flex items-center gap-2 mt-1.5">
                <div class="flex-1 bg-muted/50 rounded-full h-1.5">
                  <div class="h-1.5 rounded-full bg-success transition-all duration-500" :style="{ width: course.completion + '%' }" />
                </div>
                <span class="text-xs font-bold text-success">{{ course.completion }}%</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Learner Leaderboard -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-semibold text-highlighted">Learner Leaderboard</h2>
          <UButton label="View All" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" to="/products/lms/dashboard/progress" />
        </div>
        <div class="space-y-3">
          <div
            v-for="(learner, i) in leaderboard"
            :key="learner.name"
            class="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-default hover:shadow-sm transition-shadow"
          >
            <div class="relative">
              <UAvatar :text="learner.initials" size="md" :color="learner.color" />
              <span :class="['absolute -top-1 -right-1 size-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center', i === 0 ? 'bg-warning' : i === 1 ? 'bg-neutral-400' : 'bg-amber-600']">#{{ i + 1 }}</span>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-highlighted text-sm">{{ learner.name }}</p>
              <p class="text-xs text-muted">{{ learner.courses }} courses · {{ learner.hours }}h</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-highlighted">{{ learner.score }}%</p>
              <p class="text-xs text-dimmed">avg score</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
