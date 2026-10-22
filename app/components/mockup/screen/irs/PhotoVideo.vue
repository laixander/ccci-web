<template>
  <MockupBrowserFrame
    url="irs.ccci.com.ph/report/8821"
    title="Report #8821"
    icon="i-lucide-camera"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Report #8821</span>
          <p class="text-[10px] text-muted mt-0.5">Medical emergency · Library Bldg, 2nd floor</p>
        </div>
        <UBadge
          label="Urgent"
          color="error"
          variant="subtle"
          size="xs"
          class="font-bold tracking-wider uppercase"
        />
      </div>

      <!-- Media Visual Strip -->
      <div class="grid grid-cols-2 gap-2.5">
        <div class="relative rounded-xl border border-default/70 bg-elevated/40 p-3 overflow-hidden flex flex-col justify-between h-20">
          <div class="flex items-center justify-between">
            <span class="text-[9px] font-mono text-muted uppercase">Video Evidence</span>
            <UBadge label="1080p · 0:14" color="info" variant="subtle" size="xs" />
          </div>
          <div class="flex items-center gap-2">
            <div class="size-6 rounded-full bg-info/20 flex items-center justify-center">
              <UIcon name="i-lucide-play" class="size-3 text-info" />
            </div>
            <span class="text-[11px] font-semibold text-highlighted">clip_8821_med.mp4</span>
          </div>
        </div>

        <div class="relative rounded-xl border border-default/70 bg-elevated/40 p-3 overflow-hidden flex flex-col justify-between h-20">
          <div class="flex items-center justify-between">
            <span class="text-[9px] font-mono text-muted uppercase">Scene Photos</span>
            <UBadge label="2 Files · 4.8MB" color="success" variant="subtle" size="xs" />
          </div>
          <div class="flex items-center gap-2">
            <div class="size-6 rounded-full bg-success/20 flex items-center justify-center">
              <UIcon name="i-lucide-image" class="size-3 text-success" />
            </div>
            <span class="text-[11px] font-semibold text-highlighted">img_lib2f_01.jpg</span>
          </div>
        </div>
      </div>

      <!-- List header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[12px] text-highlighted">Attached evidence</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Evidence items -->
      <div v-if="evidenceList?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in evidenceList"
          :key="item.tag"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="['size-7 rounded-lg flex items-center justify-center shrink-0', item.iconBg]">
              <UIcon :name="item.icon" :class="['size-3.5', item.iconColor]" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ item.item }}</p>
              <p class="text-[10px] text-muted uppercase tracking-wider font-mono">{{ item.tag }}</p>
            </div>
          </div>
          <UBadge
            :label="item.status"
            :color="item.color"
            variant="subtle"
            size="xs"
            class="font-bold tracking-wider"
          />
        </UCard>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-shield-check" class="size-3.5 text-success" />
          End-to-end encrypted evidence chain
        </span>
        <span>Secure Stream</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'media-sync',
    title: 'Media Encrypted',
    subtitle: 'Direct Upload · 1080p Clip',
    icon: 'i-lucide-video',
    color: 'primary',
    pulse: true,
  },
  {
    id: 'evidence-chain',
    title: 'Evidence Log',
    subtitle: 'Digital Timestamp Verified',
    icon: 'i-lucide-shield-check',
    color: 'success',
    badge: { label: 'VERIFIED', color: 'success' },
  },
  {
    id: 'responder-eta',
    title: 'Security ETA',
    subtitle: '1m 30s away · Lot C',
    icon: 'i-lucide-clock',
    color: 'warning',
    badge: { label: 'EN ROUTE', color: 'warning' },
  },
]

// ─── Data Interface ───────────────────────────────────────────────────────────
interface EvidenceItem {
  tag: string
  item: string
  status: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const evidenceList: EvidenceItem[] = [
  {
    tag: 'Video',
    item: '0:14 clip attached',
    status: 'Uploaded',
    icon: 'i-lucide-video',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    color: 'info',
  },
  {
    tag: 'Photo',
    item: '2 images attached',
    status: 'Uploaded',
    icon: 'i-lucide-image',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    color: 'success',
  },
  {
    tag: 'Status',
    item: 'Responder en route',
    status: 'Now',
    icon: 'i-lucide-navigation',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    color: 'warning',
  },
  {
    tag: 'Note',
    item: 'Student conscious',
    status: 'Added',
    icon: 'i-lucide-file-text',
    iconBg: 'bg-neutral/10',
    iconColor: 'text-muted',
    color: 'neutral',
  },
]
</script>
