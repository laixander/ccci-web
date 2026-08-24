<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Notifications'
})

const notifications = [
  { id: 1, title: 'Enrollment KPI At Risk', description: 'Campus enrollment is 8% below the Q3 forecast target of 9,000 students. Immediate review recommended.', time: '1 hour ago', icon: 'i-lucide-alert-triangle', color: 'text-warning', bg: 'bg-warning/10', unread: true },
  { id: 2, title: 'Revenue Target Exceeded', description: 'Q3 revenue has surpassed the ₱210M target, reaching ₱224M — a 12% year-over-year growth.', time: '4 hours ago', icon: 'i-lucide-trending-up', color: 'text-success', bg: 'bg-success/10', unread: true },
  { id: 3, title: 'Q4 Board Report Due', description: 'The Q4 strategic review report for the Board of Directors is due in 5 days. Please finalize the deck.', time: '1 day ago', icon: 'i-lucide-file-bar-chart', color: 'text-primary', bg: 'bg-primary/10', unread: false },
  { id: 4, title: 'Asset Utilization Exceeded Target', description: 'Asset utilization rate reached 91%, exceeding the 85% target set for this quarter.', time: '2 days ago', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', unread: false },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Notifications</h1>
        <p class="text-muted mt-1">Critical alerts and organizational performance updates for executive review.</p>
      </div>
      <UButton icon="i-lucide-check-check" color="neutral" variant="ghost">Mark all as read</UButton>
    </div>

    <UCard :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
      <div class="divide-y divide-default">
        <div v-for="notif in notifications" :key="notif.id" :class="['flex gap-4 p-4 sm:p-5 transition-colors', notif.unread ? 'bg-muted/30' : 'hover:bg-muted/10']">
          <div :class="['size-10 rounded-full flex items-center justify-center shrink-0', notif.bg]">
            <UIcon :name="notif.icon" :class="['size-5', notif.color]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1">
              <h3 :class="['text-sm font-semibold truncate', notif.unread ? 'text-highlighted' : 'text-default']">{{ notif.title }}</h3>
              <span class="text-xs text-muted whitespace-nowrap">{{ notif.time }}</span>
            </div>
            <p class="text-sm text-muted line-clamp-2">{{ notif.description }}</p>
          </div>
          <div v-if="notif.unread" class="flex items-center">
            <span class="size-2.5 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
