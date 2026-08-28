<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const reports = [
  { id: 1, title: 'Monthly Circulation Report', description: 'Complete summary of all checkouts, returns, and renewals for August 2026. Includes patron statistics and collection utilization rates.', date: 'Aug 28, 2026', type: 'Circulation', status: 'Ready', icon: 'i-lucide-book-open', color: 'text-primary', bg: 'bg-primary/10' },
  { id: 2, title: 'Overdue & Fines Report', description: 'List of all overdue items with patron details, days outstanding, and total fines collected vs outstanding for August 2026.', date: 'Aug 28, 2026', type: 'Fines', status: 'Ready', icon: 'i-lucide-receipt', color: 'text-error', bg: 'bg-error/10' },
  { id: 3, title: 'New Acquisitions Report', description: 'All new titles and copies added to the collection in August 2026, categorized by genre, subject, and acquiring department.', date: 'Aug 25, 2026', type: 'Catalog', status: 'Ready', icon: 'i-lucide-sparkles', color: 'text-warning', bg: 'bg-warning/10' },
  { id: 4, title: 'Patron Activity Report', description: 'Summary of patron borrowing activity, new registrations, membership renewals, and suspended accounts for August 2026.', date: 'Aug 28, 2026', type: 'Members', status: 'Ready', icon: 'i-lucide-users', color: 'text-success', bg: 'bg-success/10' },
  { id: 5, title: 'CHED Library Compliance Report', description: 'CHED-format library utilization report covering collection size, circulation volume, patron count, and budget allocation for Q2 2026.', date: 'Aug 15, 2026', type: 'Compliance', status: 'Ready', icon: 'i-lucide-file-check', color: 'text-info', bg: 'bg-info/10' },
  { id: 6, title: 'Inventory & Collection Health Report', description: 'Full collection audit — damaged, lost, missing, and withdrawn items — with recommendations for replacement purchasing.', date: 'Sep 1, 2026', type: 'Catalog', status: 'Scheduled', icon: 'i-lucide-clipboard-check', color: 'text-muted', bg: 'bg-muted' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Reports</h1>
        <p class="text-muted text-sm mt-1">Generate, download, and schedule library reports.</p>
      </div>
      <UButton label="Generate Report" icon="i-lucide-file-plus" color="primary" />
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-3 gap-4">
      <UCard v-for="stat in [{ label: 'Reports Ready', value: reports.filter(r => r.status === 'Ready').length, icon: 'i-lucide-file-check', bg: 'bg-success/10', color: 'text-success' }, { label: 'Scheduled', value: reports.filter(r => r.status === 'Scheduled').length, icon: 'i-lucide-calendar-clock', bg: 'bg-warning/10', color: 'text-warning' }, { label: 'This Month', value: reports.length, icon: 'i-lucide-bar-chart-2', bg: 'bg-primary/10', color: 'text-primary' }]" :key="stat.label">
        <div class="flex items-center gap-4">
          <div :class="['size-10 rounded-xl flex items-center justify-center', stat.bg]">
            <UIcon :name="stat.icon" :class="['size-5', stat.color]" />
          </div>
          <div>
            <p class="text-2xl font-extrabold text-highlighted">{{ stat.value }}</p>
            <p class="text-muted text-xs">{{ stat.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Reports list -->
    <div class="space-y-3">
      <UCard v-for="report in reports" :key="report.id" :ui="{ body: 'p-5 sm:p-5' }">
        <div class="flex items-start gap-4">
          <div :class="['size-12 rounded-xl flex items-center justify-center shrink-0', report.bg]">
            <UIcon :name="report.icon" :class="['size-6', report.color]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="font-semibold text-highlighted text-base">{{ report.title }}</h3>
                <p class="text-sm text-muted mt-0.5 leading-relaxed">{{ report.description }}</p>
              </div>
              <UBadge :color="report.status === 'Ready' ? 'success' : 'warning'" variant="subtle" :label="report.status" class="shrink-0" />
            </div>
            <div class="flex items-center gap-4 mt-3">
              <span class="text-xs text-dimmed flex items-center gap-1">
                <UIcon name="i-lucide-calendar" class="size-3" /> {{ report.date }}
              </span>
              <UBadge color="neutral" variant="subtle" size="xs" :label="report.type" />
              <div class="ml-auto flex items-center gap-2">
                <UButton label="Preview" icon="i-lucide-eye" size="sm" color="neutral" variant="outline" :disabled="report.status === 'Scheduled'" />
                <UButton label="Download PDF" icon="i-lucide-download" size="sm" color="primary" :disabled="report.status === 'Scheduled'" />
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
