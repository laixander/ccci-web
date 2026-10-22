<template>
  <MockupBrowserFrame
    url="ams.ccci.com.ph/activities"
    title="Activities & Handover"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Header -->
      <!-- <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-[14px] text-highlighted">Pending Asset Checks</h3>
          <p class="text-[11px] text-muted">Real-time acceptance, release, and media verification</p>
        </div>
        <UBadge label="UPDATED JUST NOW" variant="subtle" color="primary" size="xs" class="font-mono font-bold" />
      </div> -->

      <!-- Awaiting Acceptance List -->
      <div class="flex flex-col gap-2.5">
        <!-- <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted">Awaiting Acceptance</span>
          <span class="text-[10px] font-semibold text-primary cursor-default">View all →</span>
        </div> -->
        <div
          v-if="activities?.length"
          class="grid grid-cols-2 gap-4"
        >
          <UCard
            v-for="item in activities"
            :key="item.item"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex flex-col gap-4' }"
            class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
          >
            <div class="flex flex-col items-start gap-3">
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
      <UAlert
        title="All custody transfers require verified photo/video"
        icon="i-lucide-shield-check"
        color="success"
        variant="soft"
        orientation="horizontal"
        class="rounded-xl"
      >
        <template #actions>
          <UBadge
            label="Audit Log"
            color="success"
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

interface ActivityItem {
  tag: string
  item: string
  detail: string
  mediaIcon?: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'media-proof',
    title: 'Media Proof',
    subtitle: 'Photo & Video Signed',
    icon: 'i-lucide-camera',
    color: 'success',
    pulse: true
  },
  {
    id: 'chain-custody',
    title: 'Custody Handover',
    subtitle: '100% Verified Chain',
    icon: 'i-lucide-shield-check',
    color: 'primary',
    badge: { label: 'VERIFIED', color: 'primary' }
  },
  {
    id: 'transit-checks',
    title: 'In-Transit Checks',
    subtitle: '2 Awaiting Sign-off',
    icon: 'i-lucide-arrow-left-right',
    color: 'info',
    badge: { label: 'ACTIVE', color: 'info' }
  }
]

const activities: ActivityItem[] = [
  { tag: 'In transit', item: 'Projector PRJ-014 → Engineering', detail: '2 photos', mediaIcon: 'i-lucide-camera', color: 'info' },
  { tag: 'In transit', item: 'Laptop AST-2290 → IT Office', detail: '1 video', mediaIcon: 'i-lucide-video', color: 'info' },
  { tag: 'For release', item: 'Server rack SRV-008', detail: 'Tech: R. Santos', mediaIcon: 'i-lucide-user', color: 'warning' },
  { tag: 'Accepted', item: 'Scanner SCN-112 → Library', detail: 'Signed', mediaIcon: 'i-lucide-check-circle', color: 'success' }
]
</script>
