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
  { label: 'Active Courses', value: '84', icon: 'i-lucide-book-open', iconColor: 'text-primary', change: '↑ 6 this month', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'Total Learners', value: '1,240', icon: 'i-lucide-users', iconColor: 'text-info', change: '↑ 48 this week', changeColor: 'text-success', bg: 'bg-info/5' },
  { label: 'Avg Completion', value: '74%', icon: 'i-lucide-line-chart', iconColor: 'text-success', change: '↑ 3.2% vs last mo.', changeColor: 'text-success', bg: 'bg-success/5' },
  { label: 'Certs Issued', value: '312', icon: 'i-lucide-award', iconColor: 'text-warning', change: '↑ 22 this month', changeColor: 'text-muted', bg: 'bg-warning/5' },
  { label: 'Live Sessions', value: '7', icon: 'i-lucide-video', iconColor: 'text-primary', change: '3 scheduled today', changeColor: 'text-info', bg: 'bg-primary/5' },
  { label: 'Avg Quiz Score', value: '82%', icon: 'i-lucide-check-circle', iconColor: 'text-success', change: '↑ 4pts vs last mo.', changeColor: 'text-success', bg: 'bg-success/5' },
]

const recentActivity = [
  { icon: 'i-lucide-user-plus', color: 'text-primary', bg: 'bg-primary/10', message: '12 new learners enrolled in "JavaScript Fundamentals"', sub: 'Course · Aug 13', time: '5m ago' },
  { icon: 'i-lucide-award', color: 'text-warning', bg: 'bg-warning/10', message: 'Maria Santos completed "Project Management Pro"', sub: 'Certificate issued automatically', time: '1h ago' },
  { icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', message: 'Q3 Compliance Assessment submissions closed', sub: '98% pass rate · 156 learners', time: '3h ago' },
  { icon: 'i-lucide-video', color: 'text-info', bg: 'bg-info/10', message: 'Live session "Advanced Excel" completed', sub: '34 attendees · Recording available', time: '5h ago' },
  { icon: 'i-lucide-book-open', color: 'text-primary', bg: 'bg-primary/10', message: 'New course "AI for Business" published', sub: 'By Admin · 8 modules', time: '8h ago' },
]

const quickLinks = [
  { label: 'Create Course', icon: 'i-lucide-plus-circle', to: '/products/lms/dashboard/courses', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Enroll Learner', icon: 'i-lucide-user-plus', to: '/products/lms/dashboard/progress', color: 'text-info', bg: 'bg-info/10' },
  { label: 'Schedule Session', icon: 'i-lucide-calendar-plus', to: '/products/lms/dashboard/classrooms', color: 'text-success', bg: 'bg-success/10' },
  { label: 'View Reports', icon: 'i-lucide-bar-chart-2', to: '/products/lms/dashboard/analytics', color: 'text-warning', bg: 'bg-warning/10' },
]

const upcomingEvents = [
  { label: 'Live: "Data Literacy Bootcamp"', date: 'Aug 14', dot: 'bg-primary' },
  { label: 'Assessment deadline: Q3 Compliance', date: 'Aug 15', dot: 'bg-error' },
  { label: 'New course release: "Leadership 101"', date: 'Aug 18', dot: 'bg-success' },
  { label: 'Cert renewal batch expires', date: 'Sep 1', dot: 'bg-warning' },
]

const completionByCategory = [
  { cat: 'Compliance', pct: 92 },
  { cat: 'Leadership', pct: 71 },
  { cat: 'Technical', pct: 68 },
  { cat: 'Soft Skills', pct: 85 },
  { cat: 'Onboarding', pct: 97 },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Alex 👋</h1>
        <p class="text-muted text-sm mt-1">
          Here's what's happening across your learning programs today.
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
          icon="i-lucide-plus"
          label="Create Course"
          size="sm"
          to="/products/lms/dashboard/courses"
        />
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
      <!-- Recent Activity (2/3 width) -->
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

    <!-- Course Completion by Category -->
    <UCard :ui="{ body: 'p-5' }">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-semibold text-highlighted">Completion Rate by Category</h2>
        <UButton label="Full Analytics" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" to="/products/lms/dashboard/analytics" />
      </div>
      <div class="space-y-3">
        <div v-for="cat in completionByCategory" :key="cat.cat" class="flex items-center gap-4">
          <span class="text-sm text-muted w-24 flex-shrink-0">{{ cat.cat }}</span>
          <div class="flex-1 bg-muted/50 rounded-full h-2">
            <div
              class="bg-primary h-2 rounded-full transition-all duration-500"
              :style="{ width: cat.pct + '%' }"
            />
          </div>
          <span class="text-sm font-semibold text-highlighted w-10 text-right">{{ cat.pct }}%</span>
        </div>
      </div>
    </UCard>
  </div>
</template>
