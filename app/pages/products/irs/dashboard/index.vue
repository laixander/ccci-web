<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const now = new Date()
const greeting = computed(() => {
  const h = now.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
})

const kpiCards = [
  { label: 'Open Incidents', value: '12', icon: 'i-lucide-triangle-alert', iconColor: 'text-primary', change: '↑ 3 vs last week', changeColor: 'text-error', bg: 'bg-primary/5' },
  { label: 'Critical', value: '3', icon: 'i-lucide-flame', iconColor: 'text-error', change: '↑ 1 vs last week', changeColor: 'text-error', bg: 'bg-error/5' },
  { label: 'Near-Misses', value: '8', icon: 'i-lucide-alert-circle', iconColor: 'text-warning', change: '↓ 2 vs last week', changeColor: 'text-success', bg: 'bg-warning/5' },
  { label: 'Resolved (30d)', value: '48', icon: 'i-lucide-check-circle', iconColor: 'text-success', change: '↑ 12 vs last month', changeColor: 'text-success', bg: 'bg-success/5' },
  { label: 'Avg Close Time', value: '2.4d', icon: 'i-lucide-clock', iconColor: 'text-info', change: '↓ 0.6d vs last month', changeColor: 'text-success', bg: 'bg-info/5' },
  { label: 'CAPA Overdue', value: '5', icon: 'i-lucide-clipboard-x', iconColor: 'text-warning', change: '↑ 2 vs last week', changeColor: 'text-error', bg: 'bg-warning/5' },
]

const recentActivity = [
  { icon: 'i-lucide-flame', color: 'text-error', bg: 'bg-error/10', message: 'Chemical spill reported — R&D Building Lab 2', sub: 'Reported by: J. Santos · Critical severity', time: '5m ago' },
  { icon: 'i-lucide-truck', color: 'text-warning', bg: 'bg-warning/10', message: 'Forklift near-miss logged — Warehouse Bay 3', sub: 'Reported by: A. Cruz · CAPA assigned', time: '2h ago' },
  { icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', message: 'Electrical hazard incident closed — Floor 4', sub: 'Root cause: Faulty wiring · Corrective action verified', time: '5h ago' },
  { icon: 'i-lucide-clipboard-check', color: 'text-primary', bg: 'bg-primary/10', message: 'Monthly safety audit completed — Main Plant', sub: 'Score: 94/100 · 2 minor findings', time: '1d ago' },
  { icon: 'i-lucide-file-text', color: 'text-info', bg: 'bg-info/10', message: 'DOLE Q2 safety report generated', sub: 'Ready for submission', time: '2d ago' },
]

const quickLinks = [
  { label: 'Report Incident', icon: 'i-lucide-plus-circle', to: '/products/irs/dashboard/report', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'View Critical', icon: 'i-lucide-flame', to: '/products/irs/dashboard/incidents', color: 'text-error', bg: 'bg-error/10' },
  { label: 'CAPA Tracker', icon: 'i-lucide-clipboard-check', to: '/products/irs/dashboard/capa', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', to: '/products/irs/dashboard/analytics', color: 'text-info', bg: 'bg-info/10' },
]

const upcomingEvents = [
  { label: 'Monthly safety walkthrough — Plant A', date: 'Sep 2', dot: 'bg-primary' },
  { label: 'CAPA due — Forklift near-miss RCA', date: 'Sep 5', dot: 'bg-warning' },
  { label: 'DOLE inspection — Q3 compliance', date: 'Sep 10', dot: 'bg-info' },
  { label: 'ISO 45001 internal audit', date: 'Sep 15', dot: 'bg-success' },
]

const incidentsByType = [
  { label: 'Slip & Fall', count: 18, pct: 34, color: 'bg-primary' },
  { label: 'Near-Miss', count: 15, pct: 28, color: 'bg-warning' },
  { label: 'Equipment', count: 12, pct: 22, color: 'bg-error' },
  { label: 'Chemical', count: 8, pct: 16, color: 'bg-info' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Safety Officer Reyes 👷</h1>
        <p class="text-muted text-sm mt-1">Here's your workplace safety overview for today.</p>
      </div>
      <UButton label="Report Incident" icon="i-lucide-plus-circle" color="primary" size="sm" to="/products/irs/dashboard/report" />
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <UCard v-for="card in kpiCards" :key="card.label" class="relative overflow-hidden">
        <div :class="['absolute inset-0 opacity-50', card.bg]" />
        <div class="relative">
          <div class="flex items-center justify-between mb-3">
            <div :class="['size-9 rounded-lg flex items-center justify-center', card.bg]">
              <UIcon :name="card.icon" :class="['size-5', card.iconColor]" />
            </div>
          </div>
          <p class="text-2xl font-extrabold text-highlighted">{{ card.value }}</p>
          <p class="text-muted text-xs mt-1">{{ card.label }}</p>
          <p :class="['text-xs mt-1 font-medium', card.changeColor]">{{ card.change }}</p>
        </div>
      </UCard>
    </div>

    <!-- Main content grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Recent Activity</h2>
              <UButton label="View all" size="xs" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" to="/products/irs/dashboard/incidents" />
            </div>
          </template>
          <div class="space-y-4">
            <div v-for="item in recentActivity" :key="item.message" class="flex items-start gap-3">
              <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5', item.bg]">
                <UIcon :name="item.icon" :class="['size-4', item.color]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-highlighted">{{ item.message }}</p>
                <p class="text-xs text-muted mt-0.5">{{ item.sub }}</p>
              </div>
              <span class="text-xs text-dimmed shrink-0">{{ item.time }}</span>
            </div>
          </div>
        </UCard>

        <!-- Incidents by Type -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Incidents by Type (Last 30 Days)</h2>
              <NuxtLink to="/products/irs/dashboard/analytics" class="text-xs text-primary hover:underline flex items-center gap-1">
                Full analytics <UIcon name="i-lucide-arrow-right" class="size-3" />
              </NuxtLink>
            </div>
          </template>
          <div class="space-y-4">
            <div v-for="item in incidentsByType" :key="item.label">
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-sm text-muted">{{ item.label }}</span>
                <span class="text-sm font-semibold text-highlighted">{{ item.count }}</span>
              </div>
              <div class="bg-muted rounded-full h-2">
                <div :class="['h-2 rounded-full transition-all', item.color]" :style="{ width: item.pct + '%' }" />
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right column -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <UCard title="Quick Actions">
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.label"
              :to="link.to"
              :class="['flex flex-col items-center gap-2 p-3 rounded-xl transition-colors hover:bg-muted/50', link.bg]"
            >
              <div :class="['size-10 rounded-xl flex items-center justify-center', link.bg]">
                <UIcon :name="link.icon" :class="['size-5', link.color]" />
              </div>
              <span class="text-xs font-medium text-highlighted text-center">{{ link.label }}</span>
            </NuxtLink>
          </div>
        </UCard>

        <!-- Upcoming Events -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-highlighted">Upcoming Events</h2>
          </template>
          <div class="space-y-3">
            <div v-for="event in upcomingEvents" :key="event.label" class="flex items-center gap-3">
              <div :class="['size-1.5 rounded-full shrink-0', event.dot]" />
              <div class="flex-1 min-w-0">
                <p class="text-sm text-highlighted truncate">{{ event.label }}</p>
              </div>
              <span class="text-xs text-dimmed shrink-0 font-medium">{{ event.date }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
