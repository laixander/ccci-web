<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const notifications = [
  { id: 1, title: 'Critical Maintenance Due', description: 'Server Rack A (AST-2001) requires immediate preventive maintenance.', time: '15 mins ago', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', unread: true },
  { id: 2, title: 'Asset Assignment Returned', description: 'John Doe has successfully returned MacBook Pro 16" (AST-1001).', time: '2 hours ago', icon: 'i-lucide-check-circle', color: 'text-success', bg: 'bg-success/10', unread: true },
  { id: 3, title: 'Low Inventory Alert', description: 'Stock level for "Dell XPS 15" has reached zero. Procurement recommended.', time: '4 hours ago', icon: 'i-lucide-package-minus', color: 'text-warning', bg: 'bg-warning/10', unread: false },
  { id: 4, title: 'Warranty Expiring', description: 'Warranty for 120 "Dell UltraSharp 27" monitors" expires in 30 days.', time: '1 day ago', icon: 'i-lucide-shield-alert', color: 'text-info', bg: 'bg-info/10', unread: false },
  { id: 5, title: 'Software License Renewal', description: 'Adobe Creative Cloud subscription renewal is upcoming on Jan 15.', time: '2 days ago', icon: 'i-lucide-refresh-cw', color: 'text-primary', bg: 'bg-primary/10', unread: false },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Notifications</h1>
        <p class="text-muted text-sm mt-1">Stay updated with your latest asset alerts and tasks.</p>
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
