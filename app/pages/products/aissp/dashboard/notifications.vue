<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Notifications'
})

const notifications = [
  { id: 1, title: 'DICT ISSP Submission Due Soon', description: 'Your annual ISSP submission is due in 14 days. Please review and finalize your drafts.', time: '2 hours ago', icon: 'i-lucide-alert-circle', color: 'text-warning', bg: 'bg-warning/10', unread: true },
  { id: 2, title: 'New System Request Submitted', description: 'The HR Department has submitted a request for a new Employee Self-Service Portal.', time: '5 hours ago', icon: 'i-lucide-monitor', color: 'text-primary', bg: 'bg-primary/10', unread: true },
  { id: 3, title: 'Cloud Infrastructure Budget Approved', description: 'Your budget request for FY 2026 Cloud Infrastructure has been fully approved.', time: '2 days ago', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', unread: false },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Notifications</h1>
        <p class="text-muted mt-1">Stay updated on your ICT portfolio and compliance requirements.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-check-check" color="neutral" variant="ghost">Mark all as read</UButton>
      </div>
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
