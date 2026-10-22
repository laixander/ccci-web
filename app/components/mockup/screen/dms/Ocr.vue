<template>
  <MockupBrowserFrame
    url="dms.ccci.com.ph/ocr"
    title="OCR Queue"
    icon="i-lucide-scan-text"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">OCR Queue</span>
          <p class="text-[10px] text-muted mt-0.5">Distributed across engines</p>
        </div>
        <UBadge label="4 items" color="info" variant="subtle" size="xs" class="font-bold tracking-wider" />
      </div>

      <!-- Queue list -->
      <div v-if="queue?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in queue"
          :key="item.file"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 rounded-md flex items-center justify-center shrink-0" :class="item.iconBg">
              <UIcon :name="item.icon" class="size-3.5" :class="item.iconColor" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ item.file }}</p>
              <p class="text-[10px] text-muted">{{ item.lang }}</p>
            </div>
          </div>
          <UBadge :label="item.status" :color="item.color" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
        </UCard>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-3 gap-2">
        <UCard
          v-for="stat in stats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-3 sm:p-3 flex flex-col items-center justify-center gap-1' }"
          class="rounded-xl shadow-xs"
        >
          <span class="text-[9px] font-mono text-muted uppercase tracking-widest">{{ stat.label }}</span>
          <span class="text-base font-bold font-mono text-highlighted tracking-tight leading-none">{{ stat.value }}</span>
        </UCard>
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'processing',
    title: 'OCR Engine',
    subtitle: 'Processing: Land_title_scan.pdf',
    icon: 'i-lucide-cpu',
    color: 'warning',
    pulse: true,
  },
  {
    id: 'lang-detect',
    title: 'Lang Detection',
    subtitle: 'Filipino · English · Spanish',
    icon: 'i-lucide-languages',
    color: 'primary',
    badge: { label: 'ACTIVE', color: 'primary' },
  },
  {
    id: 'distributed',
    title: 'Load Balanced',
    subtitle: '3 Engines Distributed',
    icon: 'i-lucide-network',
    color: 'success',
    badge: { label: 'SYNCED', color: 'success' },
  },
]

interface QueueItem {
  file: string
  lang: string
  status: string
  icon: string
  iconBg: string
  iconColor: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const queue: QueueItem[] = [
  { file: 'Registrar_scan_0412.tiff', lang: 'English', status: 'Done', icon: 'i-lucide-check-circle', iconBg: 'bg-success/10', iconColor: 'text-success', color: 'success' },
  { file: 'Board_minutes_2019.pdf', lang: 'English', status: 'Done', icon: 'i-lucide-check-circle', iconBg: 'bg-success/10', iconColor: 'text-success', color: 'success' },
  { file: 'Land_title_scan.pdf', lang: 'Filipino', status: 'Running', icon: 'i-lucide-loader', iconBg: 'bg-warning/10', iconColor: 'text-warning', color: 'warning' },
  { file: 'Invoice_batch_77.pdf', lang: 'Pending', status: 'Queued', icon: 'i-lucide-clock', iconBg: 'bg-neutral/10', iconColor: 'text-muted', color: 'neutral' },
]

interface Stat {
  label: string
  value: string
}

const stats: Stat[] = [
  { label: 'Completed', value: '2' },
  { label: 'Running', value: '1' },
  { label: 'Queued', value: '1' },
]
</script>
