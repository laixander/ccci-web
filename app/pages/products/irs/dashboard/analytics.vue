<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, LineElement, PointElement,
  CategoryScale, LinearScale, Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Filler)

definePageMeta({ layout: 'dashboard' })

const selectedPeriod = ref('Aug 2026')
const periods = ['Aug 2026', 'Jul 2026', 'Jun 2026', 'Q2 2026', 'Q1 2026']

const summaryCards = [
  { label: 'Total Incidents (30d)', value: '53', icon: 'i-lucide-triangle-alert', color: 'text-primary', bg: 'bg-primary/10', change: '↓ 8 vs last month' },
  { label: 'Critical Incidents', value: '5', icon: 'i-lucide-flame', color: 'text-error', bg: 'bg-error/10', change: '↓ 3 vs last month' },
  { label: 'Avg Close Time', value: '2.4d', icon: 'i-lucide-clock', color: 'text-info', bg: 'bg-info/10', change: '↓ 0.6d vs last month' },
  { label: 'CAPA Completion', value: '82%', icon: 'i-lucide-clipboard-check', color: 'text-success', bg: 'bg-success/10', change: '↑ 7% vs last month' },
]

// Incidents per week line chart
const trendData = computed(() => ({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'Incidents Reported',
    data: [18, 14, 12, 9],
    borderColor: 'rgba(249,115,22,1)',
    backgroundColor: 'rgba(249,115,22,0.10)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: 'rgba(249,115,22,1)',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 5,
    pointHoverRadius: 7,
  }],
}))

const trendOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index' as const, intersect: false } },
  scales: {
    y: { min: 0, border: { color: 'rgba(156,163,175,0.15)' }, grid: { color: 'rgba(156,163,175,0.15)' }, ticks: { color: 'rgba(107,114,128,0.9)', stepSize: 5 } },
    x: { grid: { display: false }, ticks: { color: 'rgba(107,114,128,0.9)', font: { weight: 500 } } },
  },
}

// Incidents by type bar chart
const typeBarData = computed(() => ({
  labels: ['Slip & Fall', 'Near-Miss', 'Equipment', 'Chemical', 'Electrical', 'Ergonomic'],
  datasets: [{
    label: 'Count',
    data: [18, 15, 12, 8, 5, 4],
    backgroundColor: 'rgba(249,115,22,0.75)',
    hoverBackgroundColor: 'rgba(249,115,22,1)',
    borderRadius: 4,
    borderSkipped: false,
  }],
}))

const typeBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { min: 0, border: { color: 'rgba(156,163,175,0.15)' }, grid: { color: 'rgba(156,163,175,0.15)' }, ticks: { color: 'rgba(107,114,128,0.9)' } },
    x: { grid: { display: false }, ticks: { color: 'rgba(107,114,128,0.9)', font: { weight: 500 } } },
  },
}

const locationData = [
  { label: 'Warehouse A', count: 22, pct: 42, trend: 'up', trendLabel: '+4 vs last month' },
  { label: 'Production Floor', count: 14, pct: 26, trend: 'down', trendLabel: '↓ 3 vs last month' },
  { label: 'R&D Building', count: 8, pct: 15, trend: 'up', trendLabel: '+2 vs last month' },
  { label: 'Office Block B', count: 5, pct: 9, trend: 'down', trendLabel: '↓ 1 vs last month' },
  { label: 'Canteen / Lobby', count: 4, pct: 8, trend: 'neutral', trendLabel: 'Same as last month' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Analytics & Heatmaps</h1>
        <p class="text-muted text-sm mt-1">Incident trends, type breakdowns, and location risk analysis</p>
      </div>
      <div class="flex items-center gap-2">
        <USelect v-model="selectedPeriod" :items="periods" class="w-40" />
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- Trend line -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-highlighted">Incident Trend — {{ selectedPeriod }}</h2>
              <UBadge label="↓ 28% vs last month" color="success" variant="subtle" />
            </div>
          </template>
          <div class="h-56">
            <Line :data="trendData" :options="trendOptions" />
          </div>
        </UCard>

        <!-- Type bar chart -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-highlighted">Incidents by Type</h2>
          </template>
          <div class="h-52">
            <Bar :data="typeBarData" :options="typeBarOptions" />
          </div>
        </UCard>
      </div>

      <!-- Location heatmap (text) -->
      <div>
        <UCard class="h-full">
          <template #header>
            <div>
              <h2 class="font-semibold text-highlighted">Location Risk Heatmap</h2>
              <p class="text-xs text-muted mt-0.5">Incidents by site area</p>
            </div>
          </template>
          <div class="space-y-4">
            <div v-for="loc in locationData" :key="loc.label">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-sm text-muted">{{ loc.label }}</span>
                <div class="flex items-center gap-1.5">
                  <span class="text-sm font-semibold text-highlighted">{{ loc.count }}</span>
                  <UIcon :name="loc.trend === 'up' ? 'i-lucide-trending-up' : loc.trend === 'down' ? 'i-lucide-trending-down' : 'i-lucide-minus'" :class="loc.trend === 'up' ? 'size-3.5 text-error' : loc.trend === 'down' ? 'size-3.5 text-success' : 'size-3.5 text-muted'" />
                </div>
              </div>
              <div class="bg-muted rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all"
                  :class="loc.pct > 35 ? 'bg-error' : loc.pct > 20 ? 'bg-warning' : 'bg-primary'"
                  :style="{ width: loc.pct + '%' }"
                />
              </div>
              <p class="text-xs text-dimmed mt-0.5">{{ loc.trendLabel }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
