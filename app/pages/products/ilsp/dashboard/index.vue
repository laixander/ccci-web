<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Dashboard'
})

const recentActivity = [
  { icon: 'i-lucide-file-check', color: 'text-success', bg: 'bg-success/10', title: 'MOU signed with Univ. of Tokyo', sub: 'Research Collaboration', time: '2h ago' },
  { icon: 'i-lucide-plane', color: 'text-primary', bg: 'bg-primary/10', title: '12 Outbound applications received', sub: 'Fall 2026 Semester', time: '5h ago' },
  { icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', title: 'MOU with UNSW expiring in 30 days', sub: 'Action required', time: '1d ago' },
  { icon: 'i-lucide-badge-dollar-sign', color: 'text-info', bg: 'bg-info/10', title: 'Erasmus+ Grant approved', sub: 'Faculty Mobility Program', time: '2d ago' },
  { icon: 'i-lucide-building-2', color: 'text-purple-500', bg: 'bg-purple-500/10', title: 'New partnership inquiry: Stanford Univ', sub: 'Initial contact made', time: '3d ago' },
]

const actionItems = [
  { icon: 'i-lucide-alert-circle', color: 'text-warning', title: 'MOU Renewal: UNSW', desc: 'Expires in 30 days. Needs review.' },
  { icon: 'i-lucide-file-text', color: 'text-error', title: 'Missing Visas', desc: '5 inbound students missing documents.' },
  { icon: 'i-lucide-check-circle', color: 'text-primary', title: 'CHED Report Due', desc: 'Submit annual linkages report by Friday.' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">Dashboard overview</h1>
      <p class="text-muted mt-1">Welcome back. Here's what's happening with your international programs today.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Active Partnerships</p>
        <p class="text-3xl font-bold text-highlighted">142</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +12 this year
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Expiring MOUs (30d)</p>
        <p class="text-3xl font-bold text-warning">4</p>
        <p class="text-xs text-muted mt-2">Requires immediate action</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Exchange Students</p>
        <p class="text-3xl font-bold text-highlighted">84</p>
        <p class="text-xs text-muted mt-2">45 Inbound / 39 Outbound</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Grant Value</p>
        <p class="text-3xl font-bold text-highlighted">$2.4M</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +15% YoY
        </p>
      </UCard>
    </div>

    <!-- Main Content Area -->
    <div class="grid lg:grid-cols-3 gap-6">
      <UCard class="lg:col-span-2" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-highlighted">Recent Activity</h3>
            <UButton color="neutral" variant="ghost" size="sm">View All</UButton>
          </div>
        </template>
        <div class="divide-y divide-default">
          <div v-for="item in recentActivity" :key="item.title" class="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
            <div :class="['size-10 rounded-full flex items-center justify-center flex-shrink-0', item.bg]">
              <UIcon :name="item.icon" :class="['size-5', item.color]" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-highlighted truncate">{{ item.title }}</p>
              <p class="text-xs text-muted truncate">{{ item.sub }}</p>
            </div>
            <span class="text-xs font-medium text-dimmed whitespace-nowrap">{{ item.time }}</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-highlighted">Action Items</h3>
          </div>
        </template>
        <div class="space-y-5">
          <div v-for="item in actionItems" :key="item.title" class="flex gap-3">
            <UIcon :name="item.icon" :class="['size-5 shrink-0', item.color]" />
            <div>
              <p class="text-sm font-medium text-highlighted">{{ item.title }}</p>
              <p class="text-xs text-muted mt-0.5">{{ item.desc }}</p>
            </div>
          </div>
          <UButton block color="neutral" variant="outline" class="mt-2">View All Tasks</UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
