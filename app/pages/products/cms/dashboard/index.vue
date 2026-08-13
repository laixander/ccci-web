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
  { label: 'Total Students', value: '4,823', icon: 'i-lucide-user-round', iconColor: 'text-primary', change: '↑ 142 this semester', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'Enrolled This Sem.', value: '4,190', icon: 'i-lucide-clipboard-list', iconColor: 'text-info', change: '86.9% enrollment rate', changeColor: 'text-muted', bg: 'bg-info/5' },
  { label: 'Tuition Collected', value: '₱18.4M', icon: 'i-lucide-banknote', iconColor: 'text-success', change: '↑ 12% vs last sem.', changeColor: 'text-success', bg: 'bg-success/5' },
  { label: 'Faculty Members', value: '218', icon: 'i-lucide-user-check', iconColor: 'text-warning', change: '12 new this sem.', changeColor: 'text-muted', bg: 'bg-warning/5' },
  { label: 'Avg GPA', value: '1.85', icon: 'i-lucide-award', iconColor: 'text-primary', change: '↑ 0.05 vs last sem.', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'At-Risk Students', value: '97', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: 'GPA below 2.75', changeColor: 'text-error', bg: 'bg-error/5' },
]

const recentActivity = [
  { icon: 'i-lucide-clipboard-list', color: 'text-primary', bg: 'bg-primary/10', message: 'Online enrollment opened for 2nd Semester AY 2026-27', sub: 'All departments · Starts Aug 15', time: '2h ago' },
  { icon: 'i-lucide-banknote', color: 'text-success', bg: 'bg-success/10', message: '₱2.4M tuition payments processed today', sub: '312 students · Stripe & cash', time: '3h ago' },
  { icon: 'i-lucide-award', color: 'text-warning', bg: 'bg-warning/10', message: 'Grades submission deadline for 1st Sem closed', sub: '218 faculty · 98.6% submitted', time: '5h ago' },
  { icon: 'i-lucide-user-round', color: 'text-info', bg: 'bg-info/10', message: '28 new student admission applications received', sub: 'Freshmen · AY 2026–27', time: '8h ago' },
  { icon: 'i-lucide-bar-chart-2', color: 'text-primary', bg: 'bg-primary/10', message: 'CHED compliance report generated', sub: 'Q3 2026 · Ready for submission', time: 'Yesterday' },
]

const quickLinks = [
  { label: 'Enroll Student', icon: 'i-lucide-user-plus', to: '/products/cms/dashboard/enrollment', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Post Grades', icon: 'i-lucide-award', to: '/products/cms/dashboard/grades', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Process Payment', icon: 'i-lucide-banknote', to: '/products/cms/dashboard/finance', color: 'text-success', bg: 'bg-success/10' },
  { label: 'View Reports', icon: 'i-lucide-bar-chart-2', to: '/products/cms/dashboard/analytics', color: 'text-info', bg: 'bg-info/10' },
]

const upcomingEvents = [
  { label: 'Enrollment opens: 2nd Semester', date: 'Aug 15', dot: 'bg-primary' },
  { label: 'Tuition payment deadline', date: 'Aug 20', dot: 'bg-error' },
  { label: 'Faculty load submission due', date: 'Aug 22', dot: 'bg-warning' },
  { label: 'CHED accreditation visit', date: 'Sep 5', dot: 'bg-success' },
]

const enrollmentByDept = [
  { dept: 'Engineering', count: 1024, pct: 21 },
  { dept: 'Business', count: 988, pct: 20 },
  { dept: 'Education', count: 856, pct: 18 },
  { dept: 'Nursing', count: 742, pct: 15 },
  { dept: 'IT & CS', count: 688, pct: 14 },
  { dept: 'Arts & Sciences', count: 592, pct: 12 },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Carmen 👋</h1>
        <p class="text-muted text-sm mt-1">Here's what's happening across campus operations today.</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton icon="i-lucide-download" label="Export Report" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-clipboard-list" label="Open Enrollment" size="sm" to="/products/cms/dashboard/enrollment" />
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <UCard
        v-for="kpi in kpiCards"
        :key="kpi.label"
        :ui="{ body: 'p-4' }"
        class="hover:shadow-md transition-shadow duration-200"
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
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <UCard class="lg:col-span-2" :ui="{ body: 'p-0' }">
        <div class="flex items-center justify-between px-5 py-4 border-b border-default">
          <h2 class="font-semibold text-highlighted">Recent Activity</h2>
          <UButton label="View all" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" />
        </div>
        <div class="divide-y divide-default">
          <div
            v-for="item in recentActivity"
            :key="item.message"
            class="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
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
      <div class="space-y-6">
        <!-- Quick Actions -->
        <UCard :ui="{ body: 'p-5' }">
          <h2 class="font-semibold text-highlighted mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-2">
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
        <UCard :ui="{ body: 'p-5' }">
          <h2 class="font-semibold text-highlighted mb-4">Upcoming</h2>
          <div class="space-y-3">
            <div v-for="event in upcomingEvents" :key="event.label" class="flex items-center gap-3">
              <span :class="['size-2 rounded-full flex-shrink-0', event.dot]" />
              <p class="text-xs font-medium text-highlighted flex-1 truncate">{{ event.label }}</p>
              <span class="text-xs text-dimmed whitespace-nowrap">{{ event.date }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Enrollment by Department -->
    <UCard :ui="{ body: 'p-5' }">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-semibold text-highlighted">Enrollment by Department</h2>
        <UButton label="Full Analytics" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" to="/products/cms/dashboard/analytics" />
      </div>
      <div class="space-y-3">
        <div v-for="dept in enrollmentByDept" :key="dept.dept" class="flex items-center gap-4">
          <span class="text-sm text-muted w-32 flex-shrink-0">{{ dept.dept }}</span>
          <div class="flex-1 bg-muted/50 rounded-full h-2">
            <div class="bg-primary h-2 rounded-full transition-all duration-500" :style="{ width: dept.pct + '%' }" />
          </div>
          <span class="text-sm font-semibold text-highlighted w-12 text-right">{{ dept.count.toLocaleString() }}</span>
          <span class="text-xs text-dimmed w-8">{{ dept.pct }}%</span>
        </div>
      </div>
    </UCard>
  </div>
</template>
