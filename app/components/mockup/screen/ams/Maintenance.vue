<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/maintenance" title="Maintenance">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Title & Summary -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Work Orders</h3>
          <p class="text-[11px] text-muted">Upcoming service, repairs, and warranty checks</p>
        </div>
        <UBadge label="AUTO-ALERTS ON" variant="subtle" color="primary" size="xs" class="font-mono font-bold" />
      </div>

      <!-- Work Orders List -->
      <div v-if="workOrders?.length" class="flex flex-col gap-2">
        <UCard
          v-for="order in workOrders"
          :key="order.item"
          variant="outline"
          :ui="{ body: 'px-3.5 py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <UBadge
              :label="order.tag"
              :color="order.color"
              variant="subtle"
              size="xs"
              class="font-mono font-bold tracking-wider"
            />
            <div>
              <p class="font-medium text-[12.5px] text-highlighted">{{ order.item }}</p>
              <p class="text-[10px] text-muted">Tech: {{ order.tech }}</p>
            </div>
          </div>
          <span class="text-[11px] font-mono text-muted">{{ order.status }}</span>
        </UCard>
      </div>

      <!-- Maintenance Alert Banner -->
      <div class="rounded-xl bg-warning/10 border border-warning/20 px-4 py-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-alert-triangle" class="size-4 text-warning shrink-0" />
          <span class="text-[11px] font-medium text-highlighted">Preventive maintenance due in 48 hours</span>
        </div>
        <span class="text-[11px] font-mono font-semibold text-warning cursor-default">View 3 Alerts</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface WorkOrder {
  tag: string
  item: string
  tech: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const workOrders: WorkOrder[] = [
  { tag: 'Due', item: 'Printer PRN-001 service', tech: 'Central Depot', status: 'This week', color: 'warning' },
  { tag: 'In repair', item: 'Projector PRJ-009', tech: 'R. Santos', status: 'In Progress', color: 'info' },
  { tag: 'Done', item: 'Aircon unit 3F', tech: 'CoolAir Inc.', status: 'Yesterday', color: 'success' },
  { tag: 'Replace', item: 'UPS — Server room', tech: 'IT Infrastructure', status: 'Flagged', color: 'error' },
]
</script>
