<template>
  <MockupBrowserFrame
    url="dms.ccci.com.ph/search"
    title="Search results"
    icon="i-lucide-search"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Search bar -->
      <div class="flex items-center gap-2 rounded-lg border border-default bg-elevated px-3 py-2">
        <UIcon name="i-lucide-search" class="size-3.5 text-muted shrink-0" />
        <span class="text-[12px] text-highlighted font-medium flex-1">"vendor contract 2026"</span>
        <UBadge label="4 matches" color="primary" variant="subtle" size="xs" class="font-bold tracking-wider" />
      </div>

      <!-- Section header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-[14px] text-highlighted">Matches</span>
        <UButton label="View all" color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-chevron-right" />
      </div>

      <!-- Results list -->
      <div v-if="results?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in results"
          :key="item.file"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon :name="item.icon" class="size-3.5 text-primary" />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ item.file }}</p>
              <p class="text-[10px] text-muted">{{ item.reason }}</p>
            </div>
          </div>
          <UBadge :label="item.type" :color="item.color" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
        </UCard>
      </div>

      <!-- Footer -->
      <div class="flex items-center gap-2 pt-1">
        <UIcon name="i-lucide-filter" class="size-3.5 text-muted" />
        <span class="text-[10px] text-muted font-mono">Filtered by: All types</span>
        <UButton label="Clear" color="neutral" variant="ghost" size="xs" class="ml-auto font-mono" />
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'ocr-ready',
    title: 'OCR Ready',
    subtitle: '100% Text Indexed',
    icon: 'i-lucide-scan-text',
    color: 'success',
    pulse: true,
  },
  {
    id: 'engines',
    title: 'Multi-Engine',
    subtitle: '3 Search Engines Active',
    icon: 'i-lucide-layers',
    color: 'primary',
    badge: { label: 'ACTIVE', color: 'primary' },
  },
  {
    id: 'preview',
    title: 'Live Preview',
    subtitle: 'Office file preview on',
    icon: 'i-lucide-eye',
    color: 'info',
    badge: { label: 'ENABLED', color: 'info' },
  },
]

interface SearchResult {
  file: string
  type: string
  reason: string
  icon: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const results: SearchResult[] = [
  { file: 'Contract_2026_v3.pdf', type: 'PDF', reason: 'Text match', icon: 'i-lucide-file-text', color: 'error' },
  { file: 'Vendor onboarding checklist', type: 'DOCX', reason: 'Title match', icon: 'i-lucide-file-type', color: 'info' },
  { file: 'Vendor price list Q3', type: 'XLSX', reason: 'Metadata', icon: 'i-lucide-table', color: 'success' },
  { file: 'Scanned MOU — Vendor Corp', type: 'TIFF', reason: 'OCR text', icon: 'i-lucide-scan', color: 'warning' },
]
</script>
