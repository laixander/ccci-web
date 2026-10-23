<template>
  <MockupBrowserFrame
    url="hkas.ccci.com.ph/collect"
    title="Data intake · Today"
    icon="i-lucide-scan-line"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Multimodal Data Intake</span>
          <p class="text-[10px] text-muted mt-0.5">Automated telemetry capture, sensor feeds, and digital assessment forms</p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge label="4 Channels Active" color="success" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
          <UButton
            label="Connect Device"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Live Throughput Stats -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in intakeStats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'p-2.5 sm:p-3 flex flex-col gap-0.5' }"
          class="rounded-xl shadow-2xs"
        >
          <span class="text-[9.5px] font-mono uppercase tracking-wider text-muted">{{ stat.label }}</span>
          <span class="text-base font-bold font-mono text-highlighted tracking-tight leading-none">{{ stat.value }}</span>
          <span class="text-[9px] font-medium" :class="stat.subClass">{{ stat.sub }}</span>
        </UCard>
      </div>

      <!-- Sources List Header -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[12px] text-highlighted">Active Intake Streams</span>
          <span class="text-[10px] text-muted">Today's Sessions</span>
        </div>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Data Streams List -->
      <div v-if="streams?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in streams"
          :key="item.item"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', item.iconBg]">
              <UIcon :name="item.icon" :class="['size-4', item.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ item.item }}</p>
                <UBadge
                  :label="item.tag"
                  :color="item.tagColor"
                  variant="subtle"
                  size="xs"
                  class="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0"
                />
              </div>
              <p class="text-[10px] text-muted truncate mt-0.5">{{ item.details }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="hidden sm:inline-block font-mono text-[10px] text-dimmed">{{ item.time }}</span>
            <UBadge
              :label="item.mode"
              :color="item.modeColor"
              variant="outline"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Integration Notice -->
      <div class="flex items-center justify-between pt-1 border-t border-default/40">
        <div class="flex items-center gap-1.5 text-muted text-[10px]">
          <UIcon name="i-lucide-cpu" class="size-3 text-primary" />
          <span>BLE 5.2 & USB-C Telemetry: Zero dropped packets recorded</span>
        </div>
        <span class="text-[10px] text-dimmed font-mono">Real-time sync</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'device-sync',
    title: 'Hardware Link',
    subtitle: '1000fps Camera Active',
    icon: 'i-lucide-camera',
    color: 'success',
    pulse: true,
  },
  {
    id: 'sensor-stream',
    title: 'Strength Tester',
    subtitle: '12 Athlete Profiles Synced',
    icon: 'i-lucide-activity',
    color: 'primary',
    badge: { label: 'AUTO-INGEST', color: 'primary' },
  },
  {
    id: 'zero-retype',
    title: 'Zero Retype',
    subtitle: 'Unified Student Master',
    icon: 'i-lucide-check-check',
    color: 'info',
    badge: { label: 'VERIFIED', color: 'info' },
  },
]

interface IntakeStat {
  label: string
  value: string
  sub: string
  subClass: string
}

interface DataStreamItem {
  tag: string
  tagColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  item: string
  details: string
  time: string
  mode: string
  modeColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconColor: string
  iconBg: string
}

const intakeStats: IntakeStat[] = [
  { label: 'Ingested Today', value: '1,420', sub: 'Telemetry points', subClass: 'text-success' },
  { label: 'Auto Devices', value: '6 / 6', sub: 'Precision units linked', subClass: 'text-primary' },
  { label: 'Form Entries', value: '38', sub: 'Teacher inputs', subClass: 'text-info' },
  { label: 'Sync Latency', value: '12ms', sub: 'Campus WiFi/BLE', subClass: 'text-success' },
]

const streams: DataStreamItem[] = [
  {
    tag: 'Form',
    tagColor: 'neutral',
    item: 'Sprint test entry — Team B',
    details: 'Coach Reyes · 100m split times recorded digitally',
    time: '8m ago',
    mode: 'Manual',
    modeColor: 'neutral',
    icon: 'i-lucide-clipboard-pen',
    iconColor: 'text-muted',
    iconBg: 'bg-muted/60',
  },
  {
    tag: 'Device',
    tagColor: 'primary',
    item: 'Strength tester — 12 athletes',
    details: 'Handheld dynamometer · Peak force 185.4 lbs captured',
    time: '24m ago',
    mode: 'Auto',
    modeColor: 'primary',
    icon: 'i-lucide-gauge',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    tag: 'Wearable',
    tagColor: 'success',
    item: 'Heart-rate sync',
    details: 'Polar chest strap telemetry · Recovery curve plotted',
    time: '1h ago',
    mode: 'Auto',
    modeColor: 'success',
    icon: 'i-lucide-heart',
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
  },
  {
    tag: 'Database',
    tagColor: 'info',
    item: 'Student profile import',
    details: 'Direct sync from CampusCore CMS master records',
    time: '2h ago',
    mode: 'Linked',
    modeColor: 'info',
    icon: 'i-lucide-database',
    iconColor: 'text-info',
    iconBg: 'bg-info/10',
  },
]
</script>
