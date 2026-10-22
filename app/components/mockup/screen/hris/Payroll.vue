<template>
  <MockupBrowserFrame url="app.peoplecore.io/payroll" title="Payroll" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Section heading -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[14px] text-highlighted">Payroll list</span>
        <div class="flex items-center gap-2">
          <UButton label="Generate" icon="i-lucide-plus" color="primary" size="lg" />
          <USelect :items="['All', 'Generated', 'For Review', 'Denied']" model-value="All" size="lg" color="neutral" variant="soft" />
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Payroll cards -->
        <UCard v-for="item in payrolls" :key="item.label + item.status" variant="outline" :ui="{ body: 'sm:p-4 flex flex-col gap-2' }" class="rounded-xl">
          <div class="flex items-center justify-between">
            <span class="font-bold text-[13px] text-highlighted">{{ item.label }}</span>
            <UBadge :label="item.status" :color="item.color" variant="subtle" size="xs" class="uppercase tracking-widest font-bold px-2" />
          </div>
          <span class="text-[11px] text-muted">{{ item.period }}</span>
        </UCard>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'payroll-generated',
    title: 'Payroll Generated',
    subtitle: 'Oct 01–30, 2024',
    icon: 'i-lucide-circle-dollar-sign',
    color: 'success',
    badge: { label: 'APPROVED', color: 'success' }
  },
  {
    id: 'for-review',
    title: 'For Review',
    subtitle: '1 Payroll Pending',
    icon: 'i-lucide-clock',
    color: 'info',
    pulse: true
  },
  {
    id: 'denied',
    title: 'Denied Entry',
    subtitle: 'Oct 01–30 · Action Needed',
    icon: 'i-lucide-x-circle',
    color: 'error',
    badge: { label: 'DENIED', color: 'error' }
  }
]

const payrolls = [
  { label: 'General Payroll', status: 'Generated',  period: 'Oct 01 – Oct 30, 2024', color: 'success' as const },
  { label: 'General Payroll', status: 'For Review', period: 'Oct 01 – Oct 30, 2024', color: 'info'    as const },
  { label: 'General Payroll', status: 'Denied',     period: 'Oct 01 – Oct 30, 2024', color: 'error'   as const },
  { label: 'General Payroll', status: 'Approved',   period: 'Sep 01 – Sep 30, 2024', color: 'success' as const },
]
</script>
