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
  { label: 'Total Documents', value: '14,823', icon: 'i-lucide-file-text', iconColor: 'text-primary', change: '↑ 242 this week', changeColor: 'text-success', bg: 'bg-primary/5' },
  { label: 'Pending Approvals', value: '34', icon: 'i-lucide-clock', iconColor: 'text-warning', change: '5 urgent', changeColor: 'text-error', bg: 'bg-warning/5' },
  { label: 'Storage Used', value: '458 GB', icon: 'i-lucide-hard-drive', iconColor: 'text-info', change: '45.8% of 1TB', changeColor: 'text-muted', bg: 'bg-info/5' },
  { label: 'Active Users', value: '128', icon: 'i-lucide-users', iconColor: 'text-success', change: '↑ 12 this month', changeColor: 'text-success', bg: 'bg-success/5' },
  { label: 'Shared Externally', value: '87', icon: 'i-lucide-share-2', iconColor: 'text-primary', change: 'Links active', changeColor: 'text-muted', bg: 'bg-primary/5' },
  { label: 'Compliance Flags', value: '2', icon: 'i-lucide-alert-triangle', iconColor: 'text-error', change: 'Requires review', changeColor: 'text-error', bg: 'bg-error/5' },
]

const recentActivity = [
  { icon: 'i-lucide-file-plus', color: 'text-success', bg: 'bg-success/10', message: 'Q3 Financial Report uploaded', sub: 'Uploaded by Jane Doe · Finance', time: '10m ago' },
  { icon: 'i-lucide-check-circle', color: 'text-primary', bg: 'bg-primary/10', message: 'Vendor Contract Approved', sub: 'Approved by John Smith · Legal', time: '1h ago' },
  { icon: 'i-lucide-edit', color: 'text-warning', bg: 'bg-warning/10', message: 'Employee Handbook v2.1 updated', sub: 'Updated by HR Dept', time: '3h ago' },
  { icon: 'i-lucide-share-2', color: 'text-info', bg: 'bg-info/10', message: 'Marketing Assets shared externally', sub: 'Link created by Marketing Team', time: '5h ago' },
  { icon: 'i-lucide-trash-2', color: 'text-error', bg: 'bg-error/10', message: 'Old server logs archived', sub: 'System action', time: 'Yesterday' },
]

const quickLinks = [
  { label: 'Upload File', icon: 'i-lucide-upload-cloud', to: '#', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'My Approvals', icon: 'i-lucide-check-square', to: '#', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Browse Folders', icon: 'i-lucide-folder', to: '#', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Search', icon: 'i-lucide-search', to: '#', color: 'text-info', bg: 'bg-info/10' },
]

const pendingTasks = [
  { label: 'Review NDA - Acme Corp', date: 'Due Today', dot: 'bg-error' },
  { label: 'Approve Leave Request (Jane Doe)', date: 'Due Tomorrow', dot: 'bg-warning' },
  { label: 'Sign Q2 Board Minutes', date: 'Due Friday', dot: 'bg-primary' },
  { label: 'Review IT Security Policy Updates', date: 'Next Week', dot: 'bg-success' },
]

const documentsByDepartment = [
  { dept: 'Finance', count: 4250, pct: 28 },
  { dept: 'HR', count: 3100, pct: 21 },
  { dept: 'Legal', count: 2800, pct: 19 },
  { dept: 'Operations', count: 2100, pct: 14 },
  { dept: 'Marketing', count: 1500, pct: 10 },
  { dept: 'IT', count: 1073, pct: 8 },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">{{ greeting }}, Alex 👋</h1>
        <p class="text-muted text-sm mt-1">Here is the latest activity in your document repository.</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton icon="i-lucide-search" label="Advanced Search" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-upload" label="Upload Document" size="sm" />
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

        <!-- Pending Tasks -->
        <UCard :ui="{ body: 'p-5' }">
          <h2 class="font-semibold text-highlighted mb-4">Pending Actions</h2>
          <div class="space-y-3">
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
    <UCard :ui="{ body: 'p-5' }">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-semibold text-highlighted">Storage by Department</h2>
        <UButton label="Storage Analytics" variant="ghost" size="xs" color="neutral" trailing-icon="i-lucide-arrow-right" to="#" />
      </div>
      <div class="space-y-3">
        <div v-for="dept in documentsByDepartment" :key="dept.dept" class="flex items-center gap-4">
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
