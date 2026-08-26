<script setup lang="ts">
import { Bar, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, LineElement, PointElement, ArcElement,
  CategoryScale, LinearScale, Filler,
)

definePageMeta({ layout: 'dashboard' })

const selectedPeriod = ref('SY 2025–2026')
const periods = ['SY 2025–2026', 'SY 2024–2025', 'SY 2023–2024']

const summaryCards = [
  { label: 'Total Assessed', value: '3,842', icon: 'i-lucide-clipboard-list', color: 'text-primary', bg: 'bg-primary/10', change: '↑ 14.2% vs last year' },
  { label: 'Overall Pass Rate', value: '87.3%', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', change: '↑ 3.1 pts vs last year' },
  { label: 'Avg Overall Score', value: '79.4', icon: 'i-lucide-bar-chart-2', color: 'text-info', bg: 'bg-info/10', change: '↑ 2.8 pts vs last year' },
  { label: 'At-Risk Individuals', value: '312', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', change: '↓ 58 vs last year' },
]

const gradeData = [
  { grade: 'Grade 7', assessed: 320, passRate: 72, avgScore: 71 },
  { grade: 'Grade 8', assessed: 310, passRate: 78, avgScore: 75 },
  { grade: 'Grade 9', assessed: 295, passRate: 81, avgScore: 78 },
  { grade: 'Grade 10', assessed: 340, passRate: 87, avgScore: 82 },
  { grade: 'Grade 11', assessed: 280, passRate: 85, avgScore: 80 },
  { grade: 'Grade 12', assessed: 265, passRate: 91, avgScore: 86 },
]

// ── Chart.js: Horizontal Bar — Fitness Category Scores ──────────────────
const categoryBarData = computed(() => ({
  labels: ['Cardiovascular', 'Flexibility', 'Strength', 'Endurance', 'Body Composition'],
  datasets: [{
    label: 'Avg Score',
    data: [82, 74, 68, 79, 71],
    backgroundColor: [
      'rgba(239,68,68,0.80)',    // red — Cardiovascular
      'rgba(234,179,8,0.80)',    // amber — Flexibility
      'rgba(14,165,233,0.80)',   // sky — Strength
      'rgba(34,197,94,0.80)',    // green — Endurance
      'rgba(139,92,246,0.80)',   // violet — Body Comp
    ],
    hoverBackgroundColor: [
      'rgba(239,68,68,1)',
      'rgba(234,179,8,1)',
      'rgba(14,165,233,1)',
      'rgba(34,197,94,1)',
      'rgba(139,92,246,1)',
    ],
    borderRadius: 4,
    borderSkipped: false,
  }],
}))

const categoryBarOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.parsed.x}%`,
      },
    },
  },
  scales: {
    x: {
      min: 0,
      max: 100,
      border: { color: 'rgba(156,163,175,0.15)' },
      grid: { color: 'rgba(156,163,175,0.15)' },
      ticks: { color: 'rgba(107,114,128,0.9)', callback: (v: any) => `${v}%` },
    },
    y: {
      grid: { display: false },
      ticks: { color: 'rgba(107,114,128,0.9)', font: { weight: 500 } },
    },
  },
}

// ── Chart.js: Line — Pass Rate + Avg Score by Grade Level ────────────────
const gradeLineData = computed(() => ({
  labels: ['Gr 7', 'Gr 8', 'Gr 9', 'Gr 10', 'Gr 11', 'Gr 12'],
  datasets: [
    {
      label: 'Pass Rate (%)',
      data: [72, 78, 81, 87, 85, 91],
      borderColor: 'rgba(239,68,68,1)',
      backgroundColor: 'rgba(239,68,68,0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(239,68,68,1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: 'Avg Score',
      data: [71, 75, 78, 82, 80, 86],
      borderColor: 'rgba(34,197,94,1)',
      backgroundColor: 'rgba(34,197,94,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(34,197,94,1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
}))

const gradeLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: 'rgba(107,114,128,1)',
        boxWidth: 8,
        boxHeight: 8,
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle' as const,
        generateLabels: (chart: any) => {
          const defaultLabels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart)
          return defaultLabels.map((label: any) => {
            label.lineWidth = 0
            return label
          })
        },
      },
      position: 'bottom' as const,
    },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    y: {
      min: 55,
      max: 100,
      border: { color: 'rgba(156,163,175,0.15)' },
      grid: { color: 'rgba(156,163,175,0.15)' },
      ticks: { stepSize: 15, color: 'rgba(107,114,128,0.9)', callback: (v: any) => `${v}%` },
    },
    x: {
      border: { color: 'rgba(156,163,175,0.15)' },
      grid: { display: false },
      ticks: { color: 'rgba(107,114,128,0.9)', font: { weight: 500 } },
    },
  },
}

const totalAssessed = 3842

const healthDistribution = [
  {
    label: 'Excellent',
    value: 31,
    count: Math.round(3842 * 0.31),
    trend: '+4.2%',
    trendUp: true,
    icon: 'i-lucide-star',
    color: 'text-success',
    bg: 'bg-success/10',
    ring: 'ring-success/20',
    description: 'Consistently above national fitness benchmarks across all test categories.',
    action: null,
  },
  {
    label: 'Good',
    value: 44,
    count: Math.round(3842 * 0.44),
    trend: '+1.1%',
    trendUp: true,
    icon: 'i-lucide-check-circle',
    color: 'text-primary',
    bg: 'bg-primary/10',
    ring: 'ring-primary/20',
    description: 'Meeting fitness standards with room for targeted improvement in 1–2 categories.',
    action: null,
  },
  {
    label: 'At Risk',
    value: 18,
    count: Math.round(3842 * 0.18),
    trend: '-2.8%',
    trendUp: false,
    icon: 'i-lucide-alert-triangle',
    color: 'text-warning',
    bg: 'bg-warning/10',
    ring: 'ring-warning/20',
    description: 'Below passing threshold in 2+ categories. Recommended for intervention program.',
    action: { label: 'View At-Risk', to: '/products/hkas/dashboard/records' },
  },
  {
    label: 'Critical',
    value: 7,
    count: Math.round(3842 * 0.07),
    trend: '-1.4%',
    trendUp: false,
    icon: 'i-lucide-shield-alert',
    color: 'text-error',
    bg: 'bg-error/10',
    ring: 'ring-error/20',
    description: 'Significantly below safe health thresholds. Requires immediate medical or PE faculty review.',
    action: { label: 'Review Now', to: '/products/hkas/dashboard/records' },
  },
]

const columns = [
  { accessorKey: 'grade', header: 'Grade Level' },
  { accessorKey: 'assessed', header: 'Assessed' },
  { accessorKey: 'passRate', header: 'Pass Rate' },
  { accessorKey: 'avgScore', header: 'Avg Score' },
  { accessorKey: 'trend', header: 'Trend' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Fitness Analytics</h1>
        <p class="text-muted text-sm mt-1">Population-level fitness insights and cohort comparisons</p>
      </div>
      <div class="flex items-center gap-2">
        <USelect v-model="selectedPeriod" :items="periods" class="w-44" />
        <UButton icon="i-lucide-download" label="Export" color="neutral" variant="outline" size="sm" />
      </div>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="card in summaryCards" :key="card.label">
        <div class="flex items-center gap-3 mb-3">
          <div :class="['size-10 rounded-xl flex items-center justify-center', card.bg]">
            <UIcon :name="card.icon" :class="['size-5', card.color]" />
          </div>
        </div>
        <p class="text-2xl font-extrabold text-highlighted">{{ card.value }}</p>
        <p class="text-muted text-xs mt-1">{{ card.label }}</p>
        <p class="text-xs mt-1 text-success font-medium">{{ card.change }}</p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Charts column (2/3) -->
      <div class="lg:col-span-2 space-y-4">

        <!-- Line chart: Pass Rate + Avg Score by Grade -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Pass Rate &amp; Avg Score by Grade Level</h2>
              <UBadge :label="selectedPeriod" color="neutral" variant="outline" size="sm" />
            </div>
          </template>
          <div class="h-64">
            <Line :data="gradeLineData" :options="gradeLineOptions" />
          </div>
        </UCard>

        <!-- Horizontal Bar: Avg Score by Fitness Category -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-highlighted">Average Score by Fitness Category</h2>
          </template>
          <div class="h-56">
            <Bar :data="categoryBarData" :options="categoryBarOptions" />
          </div>
        </UCard>

        <!-- Grade data summary table (compact) -->
        <UCard title="Grade-Level Summary" :ui="{ body: 'p-0 sm:p-0' }">
          <UTable
            :data="gradeData"
            :columns="columns"
            class="w-full text-sm"
            :ui="{
              th: 'text-left px-4 py-3 text-xs text-dimmed font-semibold uppercase tracking-wider',
              td: 'px-4 py-3',
              tr: 'hover:bg-muted/30 transition-colors'
            }"
          >
            <template #grade-cell="{ row }">
              <span class="font-medium text-highlighted">{{ row.original.grade }}</span>
            </template>
            <template #assessed-cell="{ row }">
              <span class="text-muted">{{ row.original.assessed }}</span>
            </template>
            <template #passRate-cell="{ row }">
              <span class="text-sm font-semibold text-highlighted">{{ row.original.passRate }}%</span>
            </template>
            <template #avgScore-cell="{ row }">
              <span class="font-bold text-primary">{{ row.original.avgScore }}</span>
            </template>
            <template #trend-cell>
              <UIcon name="i-lucide-trending-up" class="size-4 text-success" />
            </template>
            <template #empty>
              <div class="py-10 flex flex-col items-center justify-center">
                <UEmpty icon="i-lucide-bar-chart-2" title="No analytics data" description="Run assessments to generate analytics" />
              </div>
            </template>
          </UTable>
        </UCard>
      </div>

      <!-- Health distribution -->
      <div>
        <UCard class="h-full" title="Health Status Distribution">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h2 class="font-semibold text-highlighted">Health Status Distribution</h2>
                <!-- Total summary -->
                <div class="flex items-center gap-2">
                  <p class="text-2xl font-extrabold text-primary">{{ totalAssessed.toLocaleString() }}</p>
                  <p class="text-[10px] text-dimmed uppercase tracking-wide font-semibold">Total Assessed</p>
                </div>
              </div>
              <UBadge label="SY 2025–2026" color="neutral" variant="outline" size="sm" />
            </div>
          </template>
          <div class="space-y-3">
            <div
              v-for="item in healthDistribution"
              :key="item.label"
              :class="['rounded-xl p-3.5 ring-1', item.bg, item.ring]"
            >
              <!-- Top row: icon + label + trend -->
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div :class="['size-7 rounded-lg flex items-center justify-center', item.bg]">
                    <UIcon :name="item.icon" :class="['size-4', item.color]" />
                  </div>
                  <span class="font-semibold text-sm text-highlighted">{{ item.label }}</span>
                </div>
                <span
                  :class="[
                    'inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full',
                    item.trendUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                  ]"
                >
                  <UIcon :name="item.trendUp ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" class="size-3" />
                  {{ item.trend }} vs last year
                </span>
              </div>

              <!-- Percentage + count -->
              <div class="flex items-end justify-between mb-2">
                <p :class="['text-3xl font-extrabold leading-none', item.color]">{{ item.value }}%</p>
                <p class="text-xs text-dimmed font-medium">{{ item.count.toLocaleString() }} individuals</p>
              </div>

              <!-- Progress bar -->
              <div class="bg-black/10 dark:bg-white/10 rounded-full h-1.5 mb-2">
                <div
                  class="h-1.5 rounded-full transition-all duration-500"
                  :class="item.color.replace('text-', 'bg-')"
                  :style="{ width: item.value + '%' }"
                />
              </div>

              <!-- Description -->
              <p class="text-xs text-muted leading-relaxed">{{ item.description }}</p>

              <!-- Action link -->
              <div v-if="item.action" class="mt-2.5">
                <NuxtLink
                  :to="item.action.to"
                  :class="['inline-flex items-center gap-1 text-xs font-semibold', item.color, 'hover:underline']"
                >
                  {{ item.action.label }}
                  <UIcon name="i-lucide-arrow-right" class="size-3" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
