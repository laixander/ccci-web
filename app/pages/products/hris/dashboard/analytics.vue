<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const colorMode = useColorMode()

const kpis = [
  { label: 'Total Headcount', value: 342, prev: 330, prefix: '', suffix: '', icon: 'i-lucide-users', color: 'text-primary', bg: 'bg-primary/10', format: '' },
  { label: 'Monthly Payroll Cost', value: 287450, prev: 275000, prefix: '₱', suffix: '', icon: 'i-lucide-banknote', color: 'text-success', bg: 'bg-success/10', format: 'k' },
  { label: 'Turnover Rate', value: 3.2, prev: 4.1, prefix: '', suffix: '%', icon: 'i-lucide-trending-down', color: 'text-warning', bg: 'bg-warning/10', format: '' },
  { label: 'Time-to-Hire', value: 31, prev: 38, prefix: '', suffix: ' days', icon: 'i-lucide-clock', color: 'text-info', bg: 'bg-info/10', format: '' },
]

function formatValue(kpi: typeof kpis[0]) {
  if (kpi.format === 'k') return kpi.prefix + (kpi.value / 1000).toFixed(0) + 'k'
  return kpi.prefix + kpi.value + kpi.suffix
}

function pctChange(cur: number, prev: number) {
  const pct = ((cur - prev) / prev * 100)
  return (pct > 0 ? '+' : '') + pct.toFixed(1) + '%'
}

function isImprovement(kpi: typeof kpis[0]) {
  if (kpi.label === 'Turnover Rate' || kpi.label === 'Time-to-Hire') return kpi.value < kpi.prev
  return kpi.value > kpi.prev
}

const headcountTrend = [
  { month: 'Mar', value: 318 }, { month: 'Apr', value: 322 }, { month: 'May', value: 328 },
  { month: 'Jun', value: 330 }, { month: 'Jul', value: 338 }, { month: 'Aug', value: 342 },
]
const maxHC = Math.max(...headcountTrend.map(d => d.value))
const minHC = Math.min(...headcountTrend.map(d => d.value))

function barHeight(val: number) {
  return ((val - minHC + 5) / (maxHC - minHC + 10)) * 100
}

const deptHeadcount = [
  { dept: 'Engineering', count: 98, color: 'bg-primary' },
  { dept: 'Sales', count: 72, color: 'bg-info' },
  { dept: 'Marketing', count: 55, color: 'bg-warning' },
  { dept: 'Operations', count: 64, color: 'bg-success' },
  { dept: 'HR & Admin', count: 53, color: 'bg-error' },
]
const totalDept = deptHeadcount.reduce((s, d) => s + d.count, 0)

const payrollTrend = [
  { month: 'Mar', value: 260 }, { month: 'Apr', value: 268 }, { month: 'May', value: 271 },
  { month: 'Jun', value: 278 }, { month: 'Jul', value: 284 }, { month: 'Aug', value: 287 },
]
const maxPR = Math.max(...payrollTrend.map(d => d.value))

const turnoverByMonth = [
  { month: 'Mar', sep: 3, new: 8 }, { month: 'Apr', sep: 2, new: 6 },
  { month: 'May', sep: 4, new: 9 }, { month: 'Jun', sep: 1, new: 5 },
  { month: 'Jul', sep: 2, new: 10 }, { month: 'Aug', sep: 0, new: 4 },
]

const topPerformers = [
  { name: 'James Reyes', dept: 'Engineering', score: 4.8, initials: 'JR', color: 'primary' as const },
  { name: 'Ana Dela Cruz', dept: 'Operations', score: 4.6, initials: 'AD', color: 'warning' as const },
  { name: 'Carlos Wu', dept: 'Sales', score: 4.5, initials: 'CW', color: 'neutral' as const },
  { name: 'Mia Santos', dept: 'Marketing', score: 4.3, initials: 'MS', color: 'secondary' as const },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">HR Analytics</h1>
        <p class="text-muted text-sm mt-1">Real-time insights across your entire workforce</p>
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
      <!-- Headcount Trend -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-semibold text-highlighted">Headcount Trend</h2>
            <p class="text-xs text-muted mt-0.5">Last 6 months</p>
          </div>
          <UBadge label="+12 this month" color="success" variant="subtle" />
        </div>
        <!-- Bar chart -->
        <div class="flex items-end gap-3 h-36">
          <div
            v-for="d in headcountTrend"
            :key="d.month"
            class="flex-1 flex flex-col items-center gap-1"
          >
            <span class="text-xs font-bold text-highlighted">{{ d.value }}</span>
            <div
              class="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
              :style="{ height: barHeight(d.value) + '%' }"
            />
            <span class="text-xs text-dimmed">{{ d.month }}</span>
          </div>
        </div>
      </UCard>

      <!-- Dept Breakdown -->
      <UCard :ui="{ body: 'p-5' }">
        <h2 class="font-semibold text-highlighted mb-5">By Department</h2>
        <div class="space-y-3">
          <div v-for="dept in deptHeadcount" :key="dept.dept" class="space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">{{ dept.dept }}</span>
              <span class="font-semibold text-highlighted">{{ dept.count }} <span class="text-xs text-dimmed">({{ Math.round(dept.count / totalDept * 100) }}%)</span></span>
            </div>
            <div class="bg-muted/50 rounded-full h-1.5">
              <div :class="['h-1.5 rounded-full transition-all duration-500', dept.color]" :style="{ width: (dept.count / totalDept * 100) + '%' }" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Second row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Payroll Trend -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-semibold text-highlighted">Payroll Cost Trend</h2>
            <p class="text-xs text-muted mt-0.5">₱k per month</p>
          </div>
        </div>
        <!-- Line chart simulation with bars -->
        <div class="flex items-end gap-3 h-28">
          <div
            v-for="d in payrollTrend"
            :key="d.month"
            class="flex-1 flex flex-col items-center gap-1"
          >
            <span class="text-xs font-bold text-highlighted">{{ d.value }}k</span>
            <div
              class="w-full rounded-t-md bg-success/70 hover:bg-success transition-colors"
              :style="{ height: (d.value / maxPR * 100) + '%' }"
            />
            <span class="text-xs text-dimmed">{{ d.month }}</span>
          </div>
        </div>
      </UCard>

      <!-- Attrition vs Hiring -->
      <UCard :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-semibold text-highlighted">Hiring vs Attrition</h2>
            <p class="text-xs text-muted mt-0.5">Last 6 months</p>
          </div>
          <div class="flex gap-4 text-xs">
            <span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-success inline-block" /> New hires</span>
            <span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-error inline-block" /> Separations</span>
          </div>
        </div>
        <div class="flex items-end gap-3 h-28">
          <div
            v-for="d in turnoverByMonth"
            :key="d.month"
            class="flex-1 flex flex-col items-end gap-0.5"
          >
            <div class="w-full flex gap-0.5 items-end justify-center">
              <div class="flex-1 bg-success/70 hover:bg-success rounded-t-sm transition-colors" :style="{ height: (d.new * 8) + 'px' }" />
              <div class="flex-1 bg-error/70 hover:bg-error rounded-t-sm transition-colors" :style="{ height: (d.sep * 8) + 'px' }" />
            </div>
            <span class="text-xs text-dimmed">{{ d.month }}</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Top Performers -->
    <UCard :ui="{ body: 'p-5' }">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-highlighted">Top Performers — Q3 2026</h2>
        <UButton label="Full Report" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" to="/products/hris/dashboard/performance" />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(emp, i) in topPerformers"
          :key="emp.name"
          class="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-default hover:shadow-sm transition-shadow"
        >
          <div class="relative">
            <UAvatar :text="emp.initials" size="lg" :color="emp.color" />
            <span class="absolute -top-1 -right-1 size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">#{{ i + 1 }}</span>
          </div>
          <div>
            <p class="font-semibold text-highlighted text-sm">{{ emp.name }}</p>
            <p class="text-xs text-muted">{{ emp.dept }}</p>
            <div class="flex gap-0.5 mt-1">
              <UIcon v-for="j in 5" :key="j" name="i-lucide-star" :class="['size-3', j <= Math.round(emp.score) ? 'text-warning' : 'text-muted']" />
              <span class="text-xs text-highlighted font-bold ml-1">{{ emp.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
