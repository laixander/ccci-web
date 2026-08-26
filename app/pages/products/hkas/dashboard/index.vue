<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

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
  { label: 'Assessed Today', value: '128', icon: 'i-lucide-clipboard-list', iconColor: 'text-primary', change: '↑ 14 vs yesterday', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'Pass Rate', value: '87.3%', icon: 'i-lucide-check-circle', iconColor: 'text-success', change: '↑ 3.1% this term', changeColor: 'text-success', bg: 'bg-success/5' },
  { label: 'Avg VO₂ Max', value: '44.2', icon: 'i-lucide-wind', iconColor: 'text-info', change: '↑ 0.8 vs last quarter', changeColor: 'text-success', bg: 'bg-info/5' },
  { label: 'Active Programs', value: '12', icon: 'i-lucide-trophy', iconColor: 'text-warning', change: 'Current term', changeColor: 'text-muted', bg: 'bg-warning/5' },
  { label: 'At-Risk Individuals', value: '24', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: '↓ 6 vs last month', changeColor: 'text-success', bg: 'bg-error/5' },
  { label: 'Enrolled Subjects', value: '38', icon: 'i-lucide-book-open', iconColor: 'text-primary', change: 'SY 2025–2026', changeColor: 'text-muted', bg: 'bg-primary/5' },
]

const recentActivity = [
  { icon: 'i-lucide-clipboard-list', color: 'text-primary', bg: 'bg-primary/10', message: 'Grade 10-A completed fitness assessment', sub: '38 students · Avg score 82%', time: '10m ago' },
  { icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', message: 'Carlo Bautista flagged as at-risk', sub: 'BMI: 27.8 · Cardio score: 32%', time: '1h ago' },
  { icon: 'i-lucide-heart-pulse', color: 'text-success', bg: 'bg-success/10', message: 'Corporate wellness challenge launched', sub: '3,000 employees enrolled', time: '3h ago' },
  { icon: 'i-lucide-trophy', color: 'text-warning', bg: 'bg-warning/10', message: 'Varsity swimming team log updated', sub: '12 athletes · Training week 8', time: '5h ago' },
  { icon: 'i-lucide-file-bar-chart', color: 'text-info', bg: 'bg-info/10', message: 'Q2 CHED PE report generated', sub: 'Ready for submission', time: '8h ago' },
]

const quickLinks = [
  { label: 'Start Assessment', icon: 'i-lucide-play-circle', to: '/products/hkas/dashboard/fitness-tests', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'View At-Risk', icon: 'i-lucide-alert-triangle', to: '/products/hkas/dashboard/records', color: 'text-error', bg: 'bg-error/10' },
  { label: 'Generate Report', icon: 'i-lucide-file-bar-chart', to: '/products/hkas/dashboard/reports', color: 'text-info', bg: 'bg-info/10' },
  { label: 'View Analytics', icon: 'i-lucide-bar-chart-2', to: '/products/hkas/dashboard/analytics', color: 'text-warning', bg: 'bg-warning/10' },
]

const upcomingEvents = [
  { label: 'Grade 11 fitness testing day', date: 'Aug 28', icon: 'i-lucide-clipboard-list', color: 'text-primary', dot: 'bg-primary' },
  { label: 'Wellness challenge check-in deadline', date: 'Sep 1', icon: 'i-lucide-heart-pulse', color: 'text-success', dot: 'bg-success' },
  { label: 'Q2 CHED PE report submission', date: 'Sep 5', icon: 'i-lucide-file-bar-chart', color: 'text-info', dot: 'bg-info' },
  { label: 'Varsity team performance review', date: 'Sep 10', icon: 'i-lucide-trophy', color: 'text-warning', dot: 'bg-warning' },
]

const fitnessBreakdown = [
  { label: 'Cardiovascular', pct: 82 },
  { label: 'Flexibility', pct: 74 },
  { label: 'Strength', pct: 68 },
  { label: 'Endurance', pct: 79 },
  { label: 'Body Composition', pct: 71 },
]

const radarData = computed(() => ({
  labels: fitnessBreakdown.map(f => f.label),
  datasets: [{
    label: 'Avg Score',
    data: fitnessBreakdown.map(f => f.pct),
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderColor: 'rgba(239,68,68,0.9)',
    pointBackgroundColor: 'rgba(239,68,68,1)',
    pointBorderColor: '#fff',
    pointRadius: 5,
    pointHoverRadius: 7,
    borderWidth: 2.5,
  }],
}))

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.parsed.r}%` } },
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        color: 'rgba(156,163,175,0.9)',
        backdropColor: 'transparent',
        font: { size: 10 },
      },
      grid: { color: 'rgba(156,163,175,0.2)' },
      angleLines: { color: 'rgba(156,163,175,0.2)' },
      pointLabels: { color: 'rgba(107,114,128,1)', font: { size: 11, weight: 500 } },
    },
  },
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Coach Reyes 👋</h1>
        <p class="text-muted text-sm mt-1">Here's what's happening with your fitness programs today.</p>
      </div>
      <UButton label="Start Assessment" icon="i-lucide-play-circle" color="primary" size="sm" />
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
              <UButton label="View all" size="xs" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" />
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

        <!-- Fitness Breakdown — Radar Chart -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Fitness Score Profile</h2>
              <NuxtLink to="/products/hkas/dashboard/analytics" class="text-xs text-primary hover:underline flex items-center gap-1">
                Full analytics <UIcon name="i-lucide-arrow-right" class="size-3" />
              </NuxtLink>
            </div>
          </template>
          <div class="h-64">
            <Radar :data="radarData" :options="radarOptions" />
          </div>
          <!-- Legend row -->
          <div class="flex flex-wrap gap-3 mt-4 pt-4 border-t border-default">
            <div v-for="item in fitnessBreakdown" :key="item.label" class="flex items-center gap-1.5 text-xs text-muted">
              <span class="size-2 rounded-full bg-primary" />
              {{ item.label }}: <span class="font-semibold text-highlighted">{{ item.pct }}%</span>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right column -->
      <div class="space-y-6">
        <!-- Quick Links -->
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
