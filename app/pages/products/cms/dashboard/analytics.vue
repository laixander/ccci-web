<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

definePageMeta({ layout: 'dashboard' })

const kpis = [
  { label: 'Total Students', value: 4823, prev: 4681, prefix: '', suffix: '', icon: 'i-lucide-user-round', color: 'text-primary', bg: 'bg-primary/10', format: '' },
  { label: 'Enrollment Rate', value: 86.9, prev: 84.2, prefix: '', suffix: '%', icon: 'i-lucide-clipboard-list', color: 'text-success', bg: 'bg-success/10', format: '' },
  { label: 'Avg GPA', value: 1.92, prev: 1.97, prefix: '', suffix: '', icon: 'i-lucide-award', color: 'text-warning', bg: 'bg-warning/10', format: '' },
  { label: 'Collection Rate', value: 86.8, prev: 82.1, prefix: '', suffix: '%', icon: 'i-lucide-banknote', color: 'text-info', bg: 'bg-info/10', format: '' },
]

function formatValue(kpi: typeof kpis[0]) {
  return kpi.prefix + kpi.value + kpi.suffix
}

function pctChange(cur: number, prev: number) {
  const pct = ((cur - prev) / prev * 100)
  return (pct > 0 ? '+' : '') + pct.toFixed(1) + '%'
}

function isImprovement(kpi: typeof kpis[0]) {
  if (kpi.label === 'Avg GPA') return kpi.value < kpi.prev // lower GPA value = better
  return kpi.value > kpi.prev
}

const enrollmentTrend = [
  { sem: 'S2 AY23', value: 3920 }, { sem: 'S1 AY24', value: 4120 },
  { sem: 'S2 AY24', value: 4055 }, { sem: 'S1 AY25', value: 4380 },
  { sem: 'S2 AY25', value: 4310 }, { sem: 'S1 AY26', value: 4190 },
]

const enrollmentChartData = computed(() => ({
  labels: enrollmentTrend.map(d => d.sem),
  datasets: [{
    label: 'Students',
    data: enrollmentTrend.map(d => d.value),
    backgroundColor: '#3b82f6',
    hoverBackgroundColor: '#2563eb',
    borderRadius: 6,
  }]
}))

const deptBreakdown = [
  { dept: 'Engineering', count: 1024, color: 'bg-primary' },
  { dept: 'Business', count: 988, color: 'bg-info' },
  { dept: 'Education', count: 856, color: 'bg-warning' },
  { dept: 'Nursing', count: 742, color: 'bg-success' },
  { dept: 'IT & CS', count: 688, color: 'bg-error' },
  { dept: 'Arts & Sciences', count: 592, color: 'bg-secondary' },
]
const totalDept = deptBreakdown.reduce((s, d) => s + d.count, 0)

const collectionTrend = [
  { month: 'Mar', value: 3.2 }, { month: 'Apr', value: 4.1 }, { month: 'May', value: 5.8 },
  { month: 'Jun', value: 2.4 }, { month: 'Jul', value: 6.3 }, { month: 'Aug', value: 18.4 },
]

const collectionChartData = computed(() => ({
  labels: collectionTrend.map(d => d.month),
  datasets: [{
    label: 'Collection (₱M)',
    data: collectionTrend.map(d => d.value),
    backgroundColor: '#10b981',
    hoverBackgroundColor: '#059669',
    borderRadius: 6,
  }]
}))

const getChartOptions = (callback: any, min?: number) => ({
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
      callbacks: { label: callback }
    }
  },
  scales: {
    y: { display: false, min: min },
    x: { grid: { display: false }, border: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } }
  }
})

const enrollmentChartOptions = getChartOptions((context: any) => context.parsed.y + ' students', Math.min(...enrollmentTrend.map(d => d.value)) - 200)
const collectionChartOptions = getChartOptions((context: any) => '₱' + context.parsed.y + 'M', 0)

const atRiskStudents = [
  { name: 'Ryan Cruz', initials: 'RC', dept: 'Engineering', gpa: '3.00', color: 'error' as const },
  { name: 'Priya Lal (INC)', initials: 'PL', dept: 'Arts & Sciences', gpa: '5.00', color: 'warning' as const },
  { name: 'Ben Torres', initials: 'BT', dept: 'Business', gpa: '2.90', color: 'neutral' as const },
]

const complianceItems = [
  { label: 'CHED PSG Compliance', pct: 98, color: 'bg-success' },
  { label: 'Faculty Qualifications', pct: 94, color: 'bg-primary' },
  { label: 'Classroom Ratio', pct: 88, color: 'bg-warning' },
  { label: 'Library Holdings', pct: 76, color: 'bg-info' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Campus Analytics</h1>
        <p class="text-muted text-sm mt-1">Data-driven insights for academic leaders and administrators</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-calendar" label="A.Y. 2026–27, 1st Sem" color="neutral" variant="outline" size="sm" trailing-icon="i-lucide-chevron-down" />
        <UButton icon="i-lucide-download" label="CHED Report" color="neutral" variant="outline" size="sm" />
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
            <p class="text-xs text-muted mt-0.5">Students per semester</p>
          </div>
          <UBadge label="4,190 this sem." color="primary" variant="subtle" />
        </div>
        <div class="h-48 w-full mt-2">
          <Bar :data="enrollmentChartData" :options="enrollmentChartOptions" />
        </div>
      </UCard>

      <!-- Dept Breakdown -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-5">By Department</h2>
        <div class="space-y-3">
          <div v-for="dept in deptBreakdown" :key="dept.dept" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-muted text-xs">{{ dept.dept }}</span>
              <span class="font-semibold text-highlighted text-xs">{{ dept.count.toLocaleString() }} <span class="text-dimmed">({{ Math.round(dept.count / totalDept * 100) }}%)</span></span>
            </div>
            <div class="bg-muted/50 rounded-full h-1.5">
              <div :class="['h-1.5 rounded-full transition-all duration-500', dept.color]" :style="{ width: (dept.count / totalDept * 100) + '%' }" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Second row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Collection Trend -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-5">Tuition Collection</h2>
        <div class="h-40 w-full mt-2">
          <Bar :data="collectionChartData" :options="collectionChartOptions" />
        </div>
      </UCard>

      <!-- CHED Compliance -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-semibold text-highlighted">CHED Compliance</h2>
          <UBadge label="Accredited" color="success" variant="subtle" size="sm" />
        </div>
        <div class="space-y-4">
          <div v-for="item in complianceItems" :key="item.label" class="space-y-1.5">
            <div class="flex justify-between text-xs">
              <span class="text-muted">{{ item.label }}</span>
              <span class="font-bold text-highlighted">{{ item.pct }}%</span>
            </div>
            <div class="bg-muted/50 rounded-full h-1.5">
              <div :class="['h-1.5 rounded-full transition-all duration-500', item.color]" :style="{ width: item.pct + '%' }" />
            </div>
          </div>
        </div>
      </UCard>

      <!-- At-Risk Students -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-highlighted">At-Risk Students</h2>
          <UBadge label="97" color="error" variant="subtle" />
        </div>
        <div class="space-y-3">
          <div v-for="s in atRiskStudents" :key="s.name" class="flex items-center gap-3 p-3 rounded-lg bg-error/5 border border-error/10">
            <UAvatar :text="s.initials" size="sm" :color="s.color" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">{{ s.name }}</p>
              <p class="text-xs text-muted">{{ s.dept }}</p>
            </div>
            <span class="text-xs font-bold text-error">GPA {{ s.gpa }}</span>
          </div>
          <UButton label="View All 97" icon="i-lucide-arrow-right" size="sm" color="neutral" variant="outline" class="w-full" to="/products/cms/dashboard/students" />
        </div>
      </UCard>
    </div>
  </div>
</template>
