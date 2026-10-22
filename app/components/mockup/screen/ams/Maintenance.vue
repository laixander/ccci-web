<template>
  <MockupBrowserFrame
    url="ams.ccci.com.ph/maintenance"
    title="Maintenance"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Title & Summary -->
      <!-- <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Work Orders</h3>
          <p class="text-[11px] text-muted">Upcoming service, repairs, and warranty checks</p>
        </div>
        <UBadge label="AUTO-ALERTS ON" variant="subtle" color="primary" size="xs" class="font-mono font-bold" />
      </div> -->

      <!-- Work Orders List -->
      <div
        v-if="workOrders?.length"
        class="flex flex-col gap-4"
      >
        <UCard
          v-for="order in workOrders"
          :key="order.item"
          variant="outline"
          :ui="{ body: 'sm:p-4 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-3">
              <p class="font-medium text-[12.5px] text-highlighted">
                {{ order.item }}
              </p>
              <!-- <p class="text-[10px] text-muted">Tech: {{ order.tech }}</p> -->

              <UBadge
                :label="order.tag"
                :color="order.color"
                variant="subtle"
                size="xs"
                class="uppercase tracking-widest font-bold px-2"
              />
            </div>
          </div>
          <span class="text-[11px] font-mono text-muted">{{ order.status }}</span>
        </UCard>
      </div>

      <!-- Maintenance Alert Banner -->
      <UAlert
        title="Preventive maintenance due in 48 hours"
        icon="i-lucide-alert-triangle"
        color="warning"
        variant="soft"
        orientation="horizontal"
        class="rounded-xl"
      >
        <template #actions>
          <UBadge
            label="View 3 Alerts"
            color="warning"
            size="sm"
            class="uppercase tracking-widest font-bold px-2"
          />
        </template>
      </UAlert>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

interface WorkOrder {
  tag: string
  item: string
  tech: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'preventive-sched',
    title: 'Preventive Schedules',
    subtitle: 'Pre-Failure Detection',
    icon: 'i-lucide-clock',
    color: 'warning',
    pulse: true
  },
  {
    id: 'tech-dispatch',
    title: 'Technician Dispatch',
    subtitle: 'CoolAir & Central Depot',
    icon: 'i-lucide-user-check',
    color: 'success',
    badge: { label: 'ASSIGNED', color: 'success' }
  },
  {
    id: 'omnichannel-alerts',
    title: 'Omnichannel Alerts',
    subtitle: 'Email & Chatbot Push',
    icon: 'i-lucide-bell-ring',
    color: 'primary',
    badge: { label: 'AUTO', color: 'primary' }
  }
]

const workOrders: WorkOrder[] = [
  { tag: 'Due', item: 'Printer PRN-001 service', tech: 'Central Depot', status: 'This week', color: 'warning' },
  { tag: 'In repair', item: 'Projector PRJ-009', tech: 'R. Santos', status: 'In Progress', color: 'info' },
  { tag: 'Done', item: 'Aircon unit 3F', tech: 'CoolAir Inc.', status: 'Yesterday', color: 'success' },
  { tag: 'Replace', item: 'UPS — Server room', tech: 'IT Infrastructure', status: 'Flagged', color: 'error' }
]
</script>
