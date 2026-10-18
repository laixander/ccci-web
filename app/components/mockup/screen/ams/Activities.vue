<template>
  <MockupBrowserFrame url="ams.ccci.com.ph/activities" title="Activities & Handover">
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Pending Asset Checks</h3>
          <p class="text-[11px] text-muted">Real-time acceptance, release, and media verification</p>
        </div>
        <UBadge label="UPDATED JUST NOW" variant="subtle" color="primary" size="xs" class="font-mono font-bold" />
      </div>

      <!-- Awaiting Acceptance List -->
      <div class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Awaiting Acceptance</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">View all →</span>
        </div>
        <div v-if="activities?.length" class="flex flex-col gap-2">
          <UCard
            v-for="item in activities"
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
              <UBadge
                :label="item.detail"
                :icon="item.mediaIcon"
                color="neutral"
                variant="soft"
                size="xs"
                class="font-mono text-[10px]"
              />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Verified Handover Strip -->
      <div class="rounded-xl bg-success/10 border border-success/20 px-4 py-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-shield-check" class="size-4 text-success shrink-0" />
          <span class="text-[11px] font-medium text-highlighted">All custody transfers require verified photo/video proof</span>
        </div>
        <span class="text-[11px] font-mono font-semibold text-success cursor-default">Audit Log</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface ActivityItem {
  tag: string
  item: string
  detail: string
  mediaIcon?: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const activities: ActivityItem[] = [
  { tag: 'In transit', item: 'Projector PRJ-014 → Engineering', detail: '2 photos', mediaIcon: 'i-lucide-camera', color: 'info' },
  { tag: 'In transit', item: 'Laptop AST-2290 → IT Office', detail: '1 video', mediaIcon: 'i-lucide-video', color: 'info' },
  { tag: 'For release', item: 'Server rack SRV-008', detail: 'Tech: R. Santos', mediaIcon: 'i-lucide-user', color: 'warning' },
  { tag: 'Accepted', item: 'Scanner SCN-112 → Library', detail: 'Signed', mediaIcon: 'i-lucide-check-circle', color: 'success' },
]
</script>
