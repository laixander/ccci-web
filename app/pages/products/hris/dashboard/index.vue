<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const now = new Date()
const greeting = computed(() => {
  const h = now.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
})

const kpiCards = [
  { label: 'Total Employees', value: '342', icon: 'i-lucide-users', iconColor: 'text-primary', change: '↑ 12 this month', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'On Leave Today', value: '18', icon: 'i-lucide-plane-takeoff', iconColor: 'text-warning', change: '↓ 3 from yesterday', changeColor: 'text-muted', bg: 'bg-warning/5' },
  { label: 'Payroll Due', value: '₱287k', icon: 'i-lucide-banknote', iconColor: 'text-success', change: '↑ 4.2% vs last mo.', changeColor: 'text-muted', bg: 'bg-success/5' },
  { label: 'Open Positions', value: '9', icon: 'i-lucide-briefcase', iconColor: 'text-info', change: '3 interviews today', changeColor: 'text-info', bg: 'bg-info/5' },
  { label: 'Attendance Rate', value: '94.7%', icon: 'i-lucide-clock', iconColor: 'text-primary', change: '↑ 1.2% vs last week', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'Avg Performance', value: '4.2/5', icon: 'i-lucide-trending-up', iconColor: 'text-warning', change: 'Q3 2026 cycle', changeColor: 'text-muted', bg: 'bg-warning/5' },
]

const recentActivity = [
  { type: 'leave', icon: 'i-lucide-plane-takeoff', color: 'text-warning', bg: 'bg-warning/10', message: 'Mia Santos submitted a leave request', sub: 'Vacation · Aug 15–20', time: '2m ago' },
  { type: 'hire', icon: 'i-lucide-user-plus', color: 'text-success', bg: 'bg-success/10', message: 'Carlos Mendoza accepted offer — Senior Dev', sub: 'Engineering · Start Sep 1', time: '1h ago' },
  { type: 'payroll', icon: 'i-lucide-banknote', color: 'text-primary', bg: 'bg-primary/10', message: 'August payroll run completed', sub: '342 employees · ₱287,450', time: '3h ago' },
  { type: 'review', icon: 'i-lucide-star', color: 'text-warning', bg: 'bg-warning/10', message: 'Q3 performance review cycle started', sub: '48 reviews pending', time: '5h ago' },
  { type: 'attendance', icon: 'i-lucide-clock', color: 'text-info', bg: 'bg-info/10', message: 'Late arrivals flagged for today', sub: '7 employees · Compliance alert', time: '8h ago' },
]

const quickLinks = [
  { label: 'Run Payroll', icon: 'i-lucide-play-circle', to: '/products/hris/dashboard/payroll', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Add Employee', icon: 'i-lucide-user-plus', to: '/products/hris/dashboard/employees', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Approve Leaves', icon: 'i-lucide-calendar-check', to: '/products/hris/dashboard/attendance', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'View Reports', icon: 'i-lucide-bar-chart-2', to: '/products/hris/dashboard/analytics', color: 'text-info', bg: 'bg-info/10' },
]

const upcomingEvents = [
  { label: 'Payroll processing deadline', date: 'Aug 14', icon: 'i-lucide-banknote', color: 'text-error', dot: 'bg-error' },
  { label: 'Team all-hands meeting', date: 'Aug 15', icon: 'i-lucide-users', color: 'text-primary', dot: 'bg-primary' },
  { label: 'Q3 performance reviews due', date: 'Sep 1', icon: 'i-lucide-star', color: 'text-warning', dot: 'bg-warning' },
  { label: 'Carlos Mendoza start date', date: 'Sep 1', icon: 'i-lucide-user-plus', color: 'text-success', dot: 'bg-success' },
]

const headcountByDept = [
  { dept: 'Engineering', count: 98, pct: 29 },
  { dept: 'Sales', count: 72, pct: 21 },
  { dept: 'Marketing', count: 55, pct: 16 },
  { dept: 'Operations', count: 64, pct: 19 },
  { dept: 'HR & Admin', count: 53, pct: 15 },
]

const colorMode = useColorMode()
const donutStyle = computed(() => {
  const isDark = colorMode.value === 'dark'
  const neutral = isDark ? '#374151' : '#e5e7eb'
  return {
    background: `conic-gradient(#3b82f6 0% 72%, ${neutral} 72% 85%, #1d4ed8 85% 100%)`,
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Sarah 👋</h1>
        <p class="text-muted text-sm mt-1">
          Here's what's happening across your organization today.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          icon="i-lucide-download"
          label="Export Report"
          color="neutral"
          variant="outline"
          size="sm"
        />
        <UButton
          icon="i-lucide-play"
          label="Run Payroll"
          size="sm"
          to="/products/hris/dashboard/payroll"
        />
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <UCard
        v-for="kpi in kpiCards"
        :key="kpi.label"
        :ui="{ root: 'shadow-sm hover:shadow-md transition-shadow duration-200', body: 'sm:p-4' }"
      >
        <div class="flex items-center justify-between mb-3">
          <div :class="['size-9 rounded-lg flex items-center justify-center', kpi.bg]">
            <UIcon :name="kpi.icon" :class="['size-4', kpi.iconColor]" />
          </div>
        </div>
        <p class="text-2xl font-bold text-highlighted leading-none mb-1">{{ kpi.value }}</p>
        <p class="text-xs text-muted font-medium mb-2">{{ kpi.label }}</p>
        <p :class="['text-xs', kpi.changeColor]">{{ kpi.change }}</p>
      </UCard>
    </div>

    <!-- Main content row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Recent Activity (2/3 width) -->
      <UCard class="lg:col-span-2" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-highlighted">Recent Activity</h2>
            <UButton label="View all" variant="ghost" size="xs" trailing-icon="i-lucide-arrow-right" />
          </div>
        </template>
        <div class="divide-y divide-default">
          <div
            v-for="item in recentActivity"
            :key="item.message"
            class="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
          >
            <div :class="['size-9 rounded-full flex items-center justify-center flex-shrink-0', item.bg]">
              <UIcon :name="item.icon" :class="['size-4', item.color]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted">{{ item.message }}</p>
              <p class="text-xs text-muted mt-0.5">{{ item.sub }}</p>
            </div>
            <span class="text-xs text-dimmed whitespace-nowrap flex-shrink-0">{{ item.time }}</span>
          </div>
        </div>
      </UCard>

      <!-- Right column -->
      <div class="space-y-4">
        <!-- Quick Actions -->
        <UCard :ui="{ root: 'shadow-sm' }">
          <h2 class="font-semibold text-highlighted">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-2 mt-4 sm:mt-6">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.label"
              :to="link.to"
              :class="['flex flex-col items-center gap-2 p-3 rounded-lg transition-all hover:scale-105', link.bg]"
            >
              <div :class="['size-8 rounded-md flex items-center justify-center', link.bg]">
                <UIcon :name="link.icon" :class="['size-5', link.color]" />
              </div>
              <span :class="['text-xs font-medium text-center', link.color]">{{ link.label }}</span>
            </NuxtLink>
          </div>
        </UCard>

        <!-- Upcoming Events -->
        <UCard :ui="{ root: 'shadow-sm' }">
          <h2 class="font-semibold text-highlighted">Upcoming</h2>
          <div class="space-y-3 mt-4 sm:mt-6">
            <div
              v-for="event in upcomingEvents"
              :key="event.label"
              class="flex items-center gap-3"
            >
              <span :class="['size-2 rounded-full flex-shrink-0', event.dot]" />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-highlighted truncate">{{ event.label }}</p>
              </div>
              <span class="text-xs text-dimmed whitespace-nowrap">{{ event.date }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Headcount by Department -->
    <UCard :ui="{ root: 'shadow-sm' }">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-highlighted">Headcount by Department</h2>
        <UButton label="Full Analytics" variant="ghost" size="xs" trailing-icon="i-lucide-arrow-right" to="/products/hris/dashboard/analytics" />
      </div>
      <div class="space-y-3 mt-4 sm:mt-6">
        <div v-for="dept in headcountByDept" :key="dept.dept" class="flex items-center gap-4">
          <span class="text-sm text-muted w-28 flex-shrink-0">{{ dept.dept }}</span>
          <UProgress :model-value="dept.pct" :max="100" class="flex-1" />
          <span class="text-sm font-semibold text-highlighted w-8 text-right">{{ dept.count }}</span>
          <span class="text-xs text-dimmed w-8">{{ dept.pct }}%</span>
        </div>
      </div>
    </UCard>
  </div>
</template>