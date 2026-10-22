<template>
  <MockupBrowserFrame
    url="dms.ccci.com.ph/documents/hr-policy"
    title="HR Policy Manual"
    icon="i-lucide-history"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">

      <!-- Document header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">HR Policy Manual</span>
          <p class="text-[10px] text-muted mt-0.5">4 versions · Last updated Sep 20</p>
        </div>
        <UButton label="New version" icon="i-lucide-plus" color="primary" size="xs" />
      </div>

      <!-- Version list -->
      <div v-if="versions?.length" class="flex flex-col gap-2">
        <UCard
          v-for="ver in versions"
          :key="ver.version"
          variant="outline"
          :ui="{ body: 'px-4 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="size-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <span class="font-mono font-bold text-[10px] text-primary">{{ ver.version }}</span>
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">{{ ver.author }}</p>
              <p class="text-[10px] text-muted">{{ ver.date }}</p>
            </div>
          </div>
          <UBadge :label="ver.status" :color="ver.color" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
        </UCard>
      </div>

      <!-- Action footer -->
      <div class="flex items-center gap-2 pt-1">
        <UButton label="Compare" color="neutral" variant="outline" size="xs" icon="i-lucide-diff" />
        <UButton label="Revert" color="neutral" variant="ghost" size="xs" icon="i-lucide-rotate-ccw" />
        <span class="text-[10px] text-muted font-mono ml-auto">4 versions tracked</span>
      </div>

    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'live-version',
    title: 'Current: v4',
    subtitle: 'L. Santiago · Sep 20',
    icon: 'i-lucide-badge-check',
    color: 'success',
    pulse: true,
  },
  {
    id: 'non-destructive',
    title: 'Non-Destructive',
    subtitle: 'All versions preserved',
    icon: 'i-lucide-layers',
    color: 'primary',
    badge: { label: 'SAFE', color: 'primary' },
  },
  {
    id: 'comments',
    title: 'Comments',
    subtitle: '3 on version 4',
    icon: 'i-lucide-message-square',
    color: 'info',
    badge: { label: 'OPEN', color: 'info' },
  },
]

interface DocVersion {
  version: string
  author: string
  date: string
  status: string
  color: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
}

const versions: DocVersion[] = [
  { version: 'v4', author: 'L. Santiago', date: 'Sep 20, 2026', status: 'Current', color: 'success' },
  { version: 'v3', author: 'R. Santos', date: 'Aug 02, 2026', status: 'Archived', color: 'neutral' },
  { version: 'v2', author: 'L. Santiago', date: 'Mar 14, 2026', status: 'Archived', color: 'neutral' },
  { version: 'v1', author: 'M. Reyes', date: 'Jan 09, 2026', status: 'Archived', color: 'neutral' },
]
</script>
