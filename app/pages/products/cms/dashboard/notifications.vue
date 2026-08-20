<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const notifications = [
  { id: 1, title: 'Enrollment Spike', description: 'Over 150 new students enrolled in the last 24 hours for the upcoming Fall semester.', time: '30 mins ago', icon: 'i-lucide-trending-up', color: 'text-info', bg: 'bg-info/10', unread: true },
  { id: 2, title: 'Grade Submissions Pending', description: '5 faculty members have yet to submit final grades for the Spring 2026 term.', time: '2 hours ago', icon: 'i-lucide-alert-circle', color: 'text-error', bg: 'bg-error/10', unread: true },
  { id: 3, title: 'Transcript Request', description: 'New official transcript request from student ID 2023-0104.', time: '4 hours ago', icon: 'i-lucide-file-text', color: 'text-primary', bg: 'bg-primary/10', unread: false },
  { id: 4, title: 'System Maintenance', description: 'The student portal will be down for scheduled maintenance this Saturday at 2 AM.', time: '1 day ago', icon: 'i-lucide-settings', color: 'text-warning', bg: 'bg-warning/10', unread: false },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Notifications</h1>
        <p class="text-muted text-sm mt-1">Stay updated with your latest campus and registrar alerts.</p>
      </div>
      <UButton label="Mark all as read" color="neutral" variant="ghost" size="sm" icon="i-lucide-check-check" />
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
