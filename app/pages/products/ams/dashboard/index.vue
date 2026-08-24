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
  { label: 'Total Assets', value: '5,234', icon: 'i-lucide-boxes', iconColor: 'text-primary', change: '↑ 124 this month', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'Pending Maintenance', value: '18', icon: 'i-lucide-wrench', iconColor: 'text-warning', change: '3 critical', changeColor: 'text-error', bg: 'bg-warning/5' },
  { label: 'Assets Deployed', value: '4,102', icon: 'i-lucide-send', iconColor: 'text-info', change: '78.3% deployed', changeColor: 'text-muted', bg: 'bg-info/5' },
  { label: 'Active Alerts', value: '12', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: 'Requires review', changeColor: 'text-error', bg: 'bg-error/5' },
  { label: 'Total Value', value: '₱12.4M', icon: 'i-lucide-circle-dollar-sign', iconColor: 'text-success', change: '↑ 2.1% this year', changeColor: 'text-success', bg: 'bg-success/5' },
  { label: 'Audit Progress', value: '45%', icon: 'i-lucide-clipboard-check', iconColor: 'text-primary', change: 'Q3 Audit', changeColor: 'text-muted', bg: 'bg-primary/5' },
]

const recentActivity = [
  { icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', message: 'Laptop XPS-13 assigned to John Doe', sub: 'Assigned by IT Dept', time: '10m ago' },
  { icon: 'i-lucide-wrench', color: 'text-warning', bg: 'bg-warning/10', message: 'Printer PRN-001 maintenance started', sub: 'Scheduled maintenance', time: '2h ago' },
  { icon: 'i-lucide-plus-circle', color: 'text-primary', bg: 'bg-primary/10', message: '20 new monitors added to inventory', sub: 'Procurement', time: '5h ago' },
  { icon: 'i-lucide-arrow-right-left', color: 'text-info', bg: 'bg-info/10', message: 'Office Chairs relocated to 3rd Floor', sub: 'Facilities', time: 'Yesterday' },
  { icon: 'i-lucide-trash-2', color: 'text-error', bg: 'bg-error/10', message: 'Old servers decommissioned', sub: 'IT Operations', time: 'Yesterday' },
]

const quickLinks = [
  { label: 'Add Asset', icon: 'i-lucide-plus', to: '#', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Assign Asset', icon: 'i-lucide-user-plus', to: '#', color: 'text-info', bg: 'bg-info/10' },
  { label: 'Maintenance', icon: 'i-lucide-wrench', to: '#', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Scan Barcode', icon: 'i-lucide-scan-line', to: '#', color: 'text-success', bg: 'bg-success/10' },
]

const pendingTasks = [
  { label: 'Approve IT Procurement Request', date: 'Due Today', dot: 'bg-error' },
  { label: 'Perform Server Room Audit', date: 'Due Tomorrow', dot: 'bg-warning' },
  { label: 'Renew Software Licenses', date: 'Due Friday', dot: 'bg-primary' },
  { label: 'Schedule Fleet Maintenance', date: 'Next Week', dot: 'bg-success' },
]

const assetsByCategory = [
  { category: 'Laptops', count: 1250, pct: 24 },
  { category: 'Monitors', count: 1500, pct: 29 },
  { category: 'Peripherals', count: 1800, pct: 34 },
  { category: 'Servers', count: 150, pct: 3 },
  { category: 'Furniture', count: 534, pct: 10 },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Admin 👋</h1>
        <p class="text-muted text-sm mt-1">Here is the overview of your assets.</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton icon="i-lucide-search" label="Advanced Search" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-plus" label="Add Asset" size="sm" />
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <UCard
        v-for="kpi in kpiCards"
        :key="kpi.label"
        :ui="{ root: 'shadow-sm', body: 'sm:p-4' }"
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
      <!-- Recent Activity -->
      <UCard class="lg:col-span-2" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
        <div class="flex items-center justify-between px-5 py-4 border-b border-default">
          <h2 class="font-semibold text-highlighted">Recent Activity</h2>
          <UButton label="View all log" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" />
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

        <!-- Pending Tasks -->
        <UCard :ui="{ root: 'shadow-sm' }">
          <h2 class="font-semibold text-highlighted">Pending Actions</h2>
          <div class="space-y-3 mt-4 sm:mt-6">
            <div v-for="task in pendingTasks" :key="task.label" class="flex items-center gap-3">
              <span :class="['size-2 rounded-full flex-shrink-0', task.dot]" />
              <p class="text-xs font-medium text-highlighted flex-1 truncate">{{ task.label }}</p>
              <span class="text-xs text-dimmed whitespace-nowrap">{{ task.date }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Storage by Department -->
    <UCard :ui="{ root: 'shadow-sm' }">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-highlighted">Assets by Category</h2>
        <UButton label="Asset Analytics" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" to="#" />
      </div>
      <div class="space-y-3 mt-4 sm:mt-6">
        <div v-for="category in assetsByCategory" :key="category.category" class="flex items-center gap-4">
          <span class="text-sm text-muted w-32 flex-shrink-0">{{ category.category }}</span>
          <div class="flex-1 bg-muted/50 rounded-full h-2">
            <div class="bg-primary h-2 rounded-full transition-all duration-500" :style="{ width: category.pct + '%' }" />
          </div>
          <span class="text-sm font-semibold text-highlighted w-12 text-right">{{ category.count.toLocaleString() }}</span>
          <span class="text-xs text-dimmed w-8">{{ category.pct }}%</span>
        </div>
      </div>
    </UCard>
  </div>
</template>
