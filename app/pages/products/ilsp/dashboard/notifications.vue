<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Notifications'
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-highlighted tracking-tight">Notifications</h1>
        <p class="text-muted mt-1">Stay updated on your international partnerships and mobility programs.</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-check-check" color="neutral" variant="ghost">Mark all as read</UButton>
      </div>
    </div>

    <UCard>
      <div class="divide-y divide-default">
        <div class="py-4 flex gap-4">
          <div class="size-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-alert-circle" class="size-5 text-warning" />
          </div>
          <div>
            <p class="text-sm font-medium text-highlighted">MOU with University of New South Wales is expiring soon</p>
            <p class="text-xs text-muted mt-1">Agreement expires in exactly 30 days. Action required for renewal.</p>
            <p class="text-[10px] text-dimmed mt-2">2 hours ago</p>
          </div>
        </div>
        <div class="py-4 flex gap-4">
          <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-file-text" class="size-5 text-primary" />
          </div>
          <div>
            <p class="text-sm font-medium text-highlighted">New Mobility Application Received</p>
            <p class="text-xs text-muted mt-1">Miguel Santos submitted an outbound application for NUS Exchange.</p>
            <p class="text-[10px] text-dimmed mt-2">5 hours ago</p>
          </div>
        </div>
        <div class="py-4 flex gap-4 opacity-60">
          <div class="size-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-check-circle" class="size-5 text-success" />
          </div>
          <div>
            <p class="text-sm font-medium text-highlighted">Erasmus+ Grant Application Approved</p>
            <p class="text-xs text-muted mt-1">Your funding request for the Faculty Mobility Program has been approved.</p>
            <p class="text-[10px] text-dimmed mt-2">2 days ago</p>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
