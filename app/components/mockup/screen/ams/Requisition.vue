<template>
  <MockupBrowserFrame
    url="ams.ccci.com.ph/requisition"
    title="Requisition"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header Row -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">
            My Requests
          </h3>
          <!-- <p class="text-[11px] text-muted">Track status of equipment and service requisitions</p> -->
        </div>
        <UButton
          label="Request Asset"
          icon="i-lucide-plus"
          color="primary"
        />
      </div>

      <!-- Requests List -->
      <div class="flex flex-col gap-2.5">
        <!-- <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Active Requisitions</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">View all →</span>
        </div> -->
        <div
          v-if="requests?.length"
          class="grid grid-cols-2 gap-4"
        >
          <UCard
            v-for="item in requests"
            :key="item.item"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex flex-col items-start gap-4' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex flex-col items-start gap-2">
              <UBadge
                :label="item.tag"
                :color="item.color"
                variant="subtle"
                size="xs"
                class="uppercase tracking-widest font-bold px-2"
              />
              <span class="font-medium text-[12.5px] text-highlighted">{{ item.item }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-mono text-muted">{{ item.status }}</span>
              <UIcon
                name="i-lucide-chevron-right"
                class="size-3.5 text-dimmed"
              />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Action Footer -->
      <!-- <UAlert
        title="Quick Reservation"
        color="primary"
        variant="subtle"
        orientation="horizontal"
        class="rounded-xl"
      >
        <template #actions>
          <UButton color="primary" variant="ghost" size="xs">
            Schedule Shared Asset <UIcon name="i-lucide-arrow-right" class="size-3.5 text-primary" />
          </UButton>
        </template>
      </UAlert> -->
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

interface RequisitionItem {
  tag: string
  item: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'fast-track',
    title: 'Auto-Approval Flow',
    subtitle: 'Avg. 14m Turnaround',
    icon: 'i-lucide-zap',
    color: 'success',
    pulse: true
  },
  {
    id: 'shared-pool',
    title: 'Shared Asset Pool',
    subtitle: '12 Available Now',
    icon: 'i-lucide-calendar-check',
    color: 'primary',
    badge: { label: 'RESERVE', color: 'primary' }
  },
  {
    id: 'budget-signoff',
    title: 'Budget Clearance',
    subtitle: 'Dept. Head Approved',
    icon: 'i-lucide-file-check',
    color: 'info',
    badge: { label: 'SIGNED', color: 'info' }
  }
]

const requests: RequisitionItem[] = [
  { tag: 'Approved', item: 'Laptop for new hire', status: 'Today', color: 'success' },
  { tag: 'In transit', item: 'Office chairs × 6', status: 'Tomorrow', color: 'info' },
  { tag: 'Pending', item: 'Vehicle service — Hiace', status: 'Review', color: 'warning' },
  { tag: 'Reserved', item: 'Projector PRJ-014', status: 'Aug 26', color: 'primary' }
]
</script>
