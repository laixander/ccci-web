<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const notifications = [
  { id: 1, title: 'Leave Request Approved', description: 'Your vacation leave for Aug 15-20 has been approved by your manager.', time: '2 hours ago', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', unread: true },
  { id: 2, title: 'Payslip Available', description: 'Your payslip for the period of July 2026 is now available for download.', time: '1 day ago', icon: 'i-lucide-file-text', color: 'text-primary', bg: 'bg-primary/10', unread: true },
  { id: 3, title: 'Performance Review', description: 'Q3 Performance Review cycle has started. Please submit your self-evaluation by Aug 31.', time: '3 days ago', icon: 'i-lucide-target', color: 'text-warning', bg: 'bg-warning/10', unread: false },
  { id: 4, title: 'Company Announcement', description: 'Townhall meeting scheduled for Friday at 3 PM in the main cafeteria.', time: '1 week ago', icon: 'i-lucide-megaphone', color: 'text-info', bg: 'bg-info/10', unread: false },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Notifications</h1>
        <p class="text-muted text-sm mt-1">Stay updated with your latest HR alerts and messages.</p>
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
