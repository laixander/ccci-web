<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Dashboard'
})

const recentActivity = [
  { icon: 'i-lucide-monitor', color: 'text-success', bg: 'bg-success/10', title: 'HRIS System Deployment Completed', sub: 'Phase 1 Rollout', time: '2h ago' },
  { icon: 'i-lucide-file-text', color: 'text-primary', bg: 'bg-primary/10', title: 'DICT ISSP Draft Submitted for Review', sub: 'Q3 2026 Compliance', time: '5h ago' },
  { icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', title: 'Legacy Payroll System End-of-Life', sub: 'Action required in 45 days', time: '1d ago' },
  { icon: 'i-lucide-badge-dollar-sign', color: 'text-info', bg: 'bg-info/10', title: 'Cloud Infrastructure Budget Approved', sub: 'FY 2026 Allocation', time: '2d ago' },
  { icon: 'i-lucide-shield-check', color: 'text-purple-500', bg: 'bg-purple-500/10', title: 'Annual Security Audit Completed', sub: 'No critical findings', time: '3d ago' },
]

const actionItems = [
  { icon: 'i-lucide-alert-circle', color: 'text-warning', title: 'Budget Review', desc: 'Q4 Cloud expenses exceeded projection.' },
  { icon: 'i-lucide-file-text', color: 'text-error', title: 'ISSP Submission', desc: 'DICT deadline in 14 days.' },
  { icon: 'i-lucide-check-circle', color: 'text-primary', title: 'Vendor Renewal', desc: 'Approve software licenses for next year.' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">Strategic Plan Overview</h1>
      <p class="text-muted mt-1">Welcome back. Here's the current status of your ICT investments and compliance.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Active Systems</p>
        <p class="text-3xl font-bold text-highlighted">42</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
          +3 deployed this quarter
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Total IT Budget</p>
        <p class="text-3xl font-bold text-highlighted">₱124.5M</p>
        <p class="text-xs text-muted mt-2">68% utilized for FY 2026</p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Compliance Score</p>
        <p class="text-3xl font-bold text-success">94%</p>
        <p class="text-xs text-success mt-2 flex items-center gap-1">
          <UIcon name="i-lucide-check-circle" class="size-3" />
          Ready for DICT Audit
        </p>
      </UCard>
      <UCard>
        <p class="text-sm font-medium text-muted mb-1">Pending Approvals</p>
        <p class="text-3xl font-bold text-warning">5</p>
        <p class="text-xs text-muted mt-2">Requires executive review</p>
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
