<template>
  <MockupBrowserFrame
    url="ilsp.ccci.com.ph/partner-portal"
    title="Partner Portal"
    icon="i-lucide-users"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Partnership Banner / Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Your Partnership</span>
          <p class="text-[11px] text-muted">
            Partner University A · Active Bilateral Linkage
          </p>
        </div>
        <UButton
          label="Submit Document"
          icon="i-lucide-upload"
          color="primary"
          size="xs"
        />
      </div>

      <!-- Quick stats overview -->
      <div class="grid grid-cols-3 gap-2">
        <UCard
          v-for="stat in partnerStats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-2.5 flex flex-col gap-0.5' }"
          class="rounded-xl shadow-2xs"
        >
          <span class="text-[9px] text-muted uppercase tracking-widest font-mono">{{ stat.label }}</span>
          <span class="text-[15px] font-bold text-highlighted font-mono leading-tight">{{ stat.value }}</span>
        </UCard>
      </div>

      <!-- Milestones Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[13px] text-highlighted">Milestones</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Milestones List -->
      <div
        v-if="milestones?.length"
        class="flex flex-col gap-2"
      >
        <UCard
          v-for="item in milestones"
          :key="item.title"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div
              class="size-7 rounded-lg flex items-center justify-center shrink-0"
              :class="item.iconBg"
            >
              <UIcon
                :name="item.icon"
                class="size-3.5"
                :class="item.iconColor"
              />
            </div>
            <div>
              <p class="font-semibold text-[12px] text-highlighted">
                {{ item.title }}
              </p>
              <p class="text-[10px] text-muted">
                Timeline: {{ item.when }}
              </p>
            </div>
          </div>

          <UBadge
            :label="item.status"
            :color="item.badgeColor"
            variant="subtle"
            size="xs"
            class="font-bold tracking-wider uppercase px-2"
          />
        </UCard>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/60 text-[10px] text-muted font-mono">
        <span>MOU Ref: ILSP-2026-MOU-094</span>
        <span class="text-primary cursor-default">Shared Drive (5 Files) &rarr;</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'portal-sync',
    title: 'Partner Portal',
    subtitle: 'Transparent Collaboration',
    icon: 'i-lucide-users',
    color: 'primary',
    pulse: true
  },
  {
    id: 'milestones-completed',
    title: 'Milestone Progress',
    subtitle: '2 of 4 Completed · On Track',
    icon: 'i-lucide-check-circle-2',
    color: 'success',
    badge: { label: 'ON TRACK', color: 'success' }
  },
  {
    id: 'shared-docs',
    title: 'Shared Documents',
    subtitle: '5 Files Synchronized',
    icon: 'i-lucide-file-text',
    color: 'info',
    badge: { label: 'SYNCED', color: 'info' }
  }
]

// ─── Quick Stats ──────────────────────────────────────────────────────────────
interface QuickStat {
  label: string
  value: string
}

const partnerStats: QuickStat[] = [
  { label: 'Agreement', value: 'Bilateral MOU' },
  { label: 'Term End', value: 'Dec 2028' },
  { label: 'Feedback', value: '4 Reviews' }
]

// ─── Milestone Data ───────────────────────────────────────────────────────────
interface MilestoneItem {
  title: string
  when: string
  status: string
  badgeColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconColor: string
  iconBg: string
}

const milestones: MilestoneItem[] = [
  {
    title: 'Registration & documentation',
    when: 'January 2026',
    status: 'Done',
    badgeColor: 'success',
    icon: 'i-lucide-clipboard-check',
    iconColor: 'text-success',
    iconBg: 'bg-success/10'
  },
  {
    title: 'MOU signed',
    when: 'March 2026',
    status: 'Done',
    badgeColor: 'success',
    icon: 'i-lucide-pen-tool',
    iconColor: 'text-success',
    iconBg: 'bg-success/10'
  },
  {
    title: 'Joint research phase 1',
    when: 'Now (In Progress)',
    status: 'Active',
    badgeColor: 'primary',
    icon: 'i-lucide-flask-conical',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10'
  },
  {
    title: 'Mid-year evaluation',
    when: 'Q3 2026',
    status: 'Upcoming',
    badgeColor: 'neutral',
    icon: 'i-lucide-calendar-clock',
    iconColor: 'text-muted',
    iconBg: 'bg-muted/30'
  }
]
</script>
