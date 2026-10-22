<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/dashboard"
    title="Enrollment Overview"
    icon="i-lucide-layout-dashboard"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Enrollment Overview</span>
          <p class="text-[10px] text-muted mt-0.5">Office of the President · Real-time executive performance index</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Download Brief"
            icon="i-lucide-download"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="Board Deck"
            icon="i-lucide-presentation"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- KPI cards -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="kpi in kpiCards"
          :key="kpi.label"
          variant="outline"
          :ui="{ body: 'p-2.5 sm:p-3 flex flex-col gap-0.5' }"
          class="rounded-xl shadow-2xs"
        >
          <span class="text-[9.5px] font-mono uppercase tracking-wider text-muted truncate">{{ kpi.label }}</span>
          <span class="text-base font-bold font-mono text-highlighted tracking-tight leading-none">{{ kpi.value }}</span>
          <span class="text-[9px] font-medium" :class="kpi.subClass">{{ kpi.sub }}</span>
        </UCard>
      </div>

      <!-- Report Activity Header -->
      <div class="flex items-center justify-between pt-1">
        <span class="font-bold text-[12px] text-highlighted">Report activity</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Report Activity Rows -->
      <div v-if="activities?.length" class="flex flex-col gap-2">
        <UCard
          v-for="act in activities"
          :key="act.item"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', act.iconBg]">
              <UIcon :name="act.icon" :class="['size-4', act.iconColor]" />
            </div>
            <div class="min-w-0">
              <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ act.item }}</p>
              <p class="text-[10.5px] text-muted truncate mt-0.5">{{ act.detail }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="font-mono text-[10px] text-dimmed">{{ act.time }}</span>
            <UBadge
              :label="act.status"
              :color="act.statusColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Footer Info Strip -->
      <div class="flex items-center justify-between pt-1 border-t border-default/50 text-[10px] text-muted font-mono">
        <span class="flex items-center gap-1.5">
          <span class="size-1.5 rounded-full bg-success" />
          Consolidated across 9 connected campus and enterprise systems
        </span>
        <span class="hidden sm:inline">Active Session: President's Office</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'executive-sync',
    title: 'Executive Sync',
    subtitle: 'Live Q3 Campus KPIs',
    icon: 'i-lucide-activity',
    color: 'success',
    pulse: true,
  },
  {
    id: 'board-metric',
    title: '18,240 Students',
    subtitle: '+3.1% YoY Growth',
    icon: 'i-lucide-users',
    color: 'primary',
    badge: { label: 'BOARD-READY', color: 'primary' },
  },
  {
    id: 'pipeline-alert',
    title: 'Pipeline Status',
    subtitle: '1 Sync Delayed',
    icon: 'i-lucide-alert-triangle',
    color: 'warning',
  },
]

// ─── KPI Cards Data ───────────────────────────────────────────────────────────
interface KpiItem {
  label: string
  value: string
  sub: string
  subClass: string
}

const kpiCards: KpiItem[] = [
  { label: 'Enrolled students', value: '18,240', sub: '+3.1% YoY', subClass: 'text-success' },
  { label: 'Revenue YTD', value: '₱412M', sub: 'On target', subClass: 'text-primary' },
  { label: 'Data sources', value: '9', sub: 'Connected', subClass: 'text-success' },
  { label: 'Pipeline jobs', value: '3', sub: '1 delayed', subClass: 'text-warning' },
]

// ─── Activity Data ────────────────────────────────────────────────────────────
interface ActivityItem {
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  item: string
  detail: string
  time: string
  icon: string
  iconBg: string
  iconColor: string
}

const activities: ActivityItem[] = [
  {
    status: 'Published',
    statusColor: 'success',
    item: 'Q3 Enrollment Report',
    detail: 'Undergraduate, Graduate & Law school breakdown',
    time: '10m',
    icon: 'i-lucide-file-text',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    status: 'Refreshed',
    statusColor: 'info',
    item: 'Finance dashboard',
    detail: 'Tuition collections and grant disbursements ledger',
    time: '1h',
    icon: 'i-lucide-refresh-cw',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    status: 'Delayed',
    statusColor: 'warning',
    item: 'HRIS sync job',
    detail: 'Faculty teaching load hours retry in progress',
    time: '2h',
    icon: 'i-lucide-alert-circle',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  {
    status: 'Shared',
    statusColor: 'primary',
    item: 'Board summary — 6 recipients',
    detail: 'Board of Trustees quarterly briefing package dispatched',
    time: 'Yesterday',
    icon: 'i-lucide-share-2',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
]
</script>
