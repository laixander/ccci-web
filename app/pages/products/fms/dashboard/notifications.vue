<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Notifications'
})

const notifications = [
  { id: 1, title: 'Budget Overrun Alert', description: 'The IT Operations department has exceeded their Q3 budget allocation by 5%.', time: '1 hour ago', icon: 'i-lucide-alert-triangle', color: 'text-error', bg: 'bg-error/10', unread: true },
  { id: 2, title: 'Pending Approval: PO-2026-012', description: 'Purchase order for ₱45,000 to Vendor Beta requires your signature.', time: '3 hours ago', icon: 'i-lucide-file-check', color: 'text-warning', bg: 'bg-warning/10', unread: true },
  { id: 3, title: 'Bank Sync Successful', description: 'BDO Account ending in 1234 successfully synced 45 new transactions.', time: '1 day ago', icon: 'i-lucide-arrow-left-right', color: 'text-success', bg: 'bg-success/10', unread: false },
  { id: 4, title: 'Month-End Close Checklist', description: 'Reminder: The July 2026 month-end close process is due in 3 days.', time: '2 days ago', icon: 'i-lucide-calendar', color: 'text-primary', bg: 'bg-primary/10', unread: false },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Notifications</h1>
        <p class="text-muted mt-1">Financial alerts, approval requests, and system updates.</p>
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
