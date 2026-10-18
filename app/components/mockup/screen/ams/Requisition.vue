<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/requisition" title="Requisition">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header Row -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">My Requests</h3>
          <p class="text-[11px] text-muted">Track status of equipment and service requisitions</p>
        </div>
        <UButton
          label="Request Asset"
          icon="i-lucide-plus"
          color="primary"
          size="sm"
        />
      </div>

      <!-- Requests List -->
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Active Requisitions</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">View all →</span>
        </div>
        <div v-if="requests?.length" class="flex flex-col gap-2">
          <UCard
            v-for="item in requests"
            :key="item.item"
            variant="outline"
            :ui="{ body: 'px-3.5 py-3 flex items-center justify-between' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UBadge
                :label="item.tag"
                :color="item.color"
                variant="subtle"
                size="xs"
                class="font-mono font-bold tracking-wider"
              />
              <span class="font-medium text-[12.5px] text-highlighted">{{ item.item }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-mono text-muted">{{ item.status }}</span>
              <UIcon name="i-lucide-chevron-right" class="size-3.5 text-dimmed" />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-center justify-between">
        <span class="font-mono text-xs font-semibold text-primary tracking-wide">
          Quick Reservation
        </span>
        <span class="text-xs text-primary font-medium cursor-default">
          Schedule Shared Asset →
        </span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface RequisitionItem {
  tag: string
  item: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const requests: RequisitionItem[] = [
  { tag: 'Approved', item: 'Laptop for new hire', status: 'Today', color: 'success' },
  { tag: 'In transit', item: 'Office chairs × 6', status: 'Tomorrow', color: 'info' },
  { tag: 'Pending', item: 'Vehicle service — Hiace', status: 'Review', color: 'warning' },
  { tag: 'Reserved', item: 'Projector PRJ-014', status: 'Aug 26', color: 'primary' },
]
</script>
