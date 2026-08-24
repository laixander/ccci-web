<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Dashboard'
})

const recentActivity = [
  { icon: 'i-lucide-trending-up', color: 'text-success', bg: 'bg-success/10', title: 'Revenue target exceeded by 12%', sub: 'Q3 2026 Financial Performance', time: '1h ago' },
  { icon: 'i-lucide-users', color: 'text-primary', bg: 'bg-primary/10', title: 'Headcount reached 1,250 employees', sub: 'HRIS — All Subsidiaries', time: '4h ago' },
  { icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', title: 'Enrollment dropped 8% vs last year', sub: 'CMS — Academic Division', time: '1d ago' },
  { icon: 'i-lucide-award', color: 'text-info', bg: 'bg-info/10', title: 'ISO 9001 Certification Renewed', sub: 'Compliance Division', time: '2d ago' },
  { icon: 'i-lucide-file-bar-chart', color: 'text-purple-500', bg: 'bg-purple-500/10', title: 'Q3 Board Report Generated', sub: 'Executive Reports Module', time: '3d ago' },
]

const actionItems = [
  { icon: 'i-lucide-alert-circle', color: 'text-warning', title: 'Enrollment Alert', desc: 'CMS enrollment is below Q3 forecast by 8%.' },
  { icon: 'i-lucide-file-text', color: 'text-error', title: 'Board Meeting Prep', desc: 'Q4 Strategy deck due in 5 days.' },
  { icon: 'i-lucide-check-circle', color: 'text-primary', title: 'Budget Approval', desc: 'FY2027 budget plan requires sign-off.' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">Executive Overview</h1>
      <p class="text-muted mt-1">Good morning, Chief Executive. Here is your organization's performance at a glance.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Revenue (YTD)</p>
        <p class="text-3xl font-bold text-highlighted">₱842M</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +12% vs last year
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total Headcount</p>
        <p class="text-3xl font-bold text-highlighted">1,250</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +45 this quarter
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Campus Enrollment</p>
        <p class="text-3xl font-bold text-warning">8,420</p>
        <p class="text-xs text-error mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-down-right" class="size-3" />
          -8% vs forecast
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Active IT Systems</p>
        <p class="text-3xl font-bold text-highlighted">42</p>
        <p class="text-xs text-muted mt-2">94% compliance score</p>
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
