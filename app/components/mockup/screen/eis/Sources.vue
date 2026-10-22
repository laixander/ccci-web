<template>
  <MockupBrowserFrame
    url="eis.ccci.com.ph/sources"
    title="Connected sources"
    icon="i-lucide-database"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Connected sources</span>
          <p class="text-[10px] text-muted mt-0.5">9 active pipelines · Databases, cloud storage, APIs & flat files</p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            label="Sync All"
            icon="i-lucide-refresh-cw"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
          <UButton
            label="Add Source"
            icon="i-lucide-plus"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in stats"
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
        <span class="font-bold text-[12px] text-highlighted">Configured connectors</span>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Sources Table / Card Rows -->
      <div v-if="sources?.length" class="flex flex-col gap-2">
        <UCard
          v-for="source in sources"
          :key="source.name"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', source.iconBg]">
              <UIcon :name="source.icon" :class="['size-4', source.iconColor]" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ source.name }}</p>
                <UBadge
                  :label="source.type"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                  class="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0"
                />
              </div>
              <p class="text-[10.5px] text-muted truncate mt-0.5">{{ source.detail }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="hidden sm:inline-block font-mono text-[10px] text-dimmed">{{ source.latency }}</span>
            <UBadge
              :label="source.status"
              :color="source.statusColor"
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
          Zero ETL code required · Direct connectors & CDC
        </span>
        <span class="hidden sm:inline">Next automated sync: 45s</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

// ─── Floating Tags ────────────────────────────────────────────────────────────
const floatingTags: MockupFloatingTag[] = [
  {
    id: 'live-sync',
    title: 'Ingestion Engine',
    subtitle: '9 Active Sources · Synced',
    icon: 'i-lucide-database',
    color: 'success',
    pulse: true,
  },
  {
    id: 'data-volume',
    title: '4.8M Records / Day',
    subtitle: 'Zero Data Loss',
    icon: 'i-lucide-check-circle-2',
    color: 'primary',
    badge: { label: 'VERIFIED', color: 'primary' },
  },
  {
    id: 'connectors',
    title: 'Universal Connectors',
    subtitle: 'REST, SQL & S3',
    icon: 'i-lucide-plug',
    color: 'info',
  },
]

// ─── Stat Data ────────────────────────────────────────────────────────────────
interface StatItem {
  label: string
  value: string
  sub: string
  subClass: string
}

const stats: StatItem[] = [
  { label: 'Connected', value: '9 Sources', sub: '100% reachable', subClass: 'text-success' },
  { label: 'Throughput', value: '4.8M / day', sub: '+12% vs last wk', subClass: 'text-primary' },
  { label: 'Latency', value: '140ms', sub: 'Real-time CDC', subClass: 'text-muted' },
  { label: 'Sync Status', value: 'Healthy', sub: '1 queue delayed', subClass: 'text-warning' },
]

// ─── Sources List Data ────────────────────────────────────────────────────────
interface SourceItem {
  type: string
  name: string
  detail: string
  latency: string
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconBg: string
  iconColor: string
}

const sources: SourceItem[] = [
  {
    type: 'Database',
    name: 'Registrar DB',
    detail: 'Oracle DB · Port 1521 · Student & Enrollment records',
    latency: '12ms',
    status: 'Synced',
    statusColor: 'success',
    icon: 'i-lucide-database',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    type: 'Cloud',
    name: 'Cloud ERP',
    detail: 'AWS PostgreSQL · Financial ledger & budget tables',
    latency: '45ms',
    status: 'Synced',
    statusColor: 'success',
    icon: 'i-lucide-cloud',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    type: 'File',
    name: 'Scholarships.csv',
    detail: 'SFTP Hot Folder · 42.8 MB flat file upload',
    latency: 'Uploaded 08:30',
    status: 'Uploaded',
    statusColor: 'info',
    icon: 'i-lucide-file-spreadsheet',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
  {
    type: 'API',
    name: 'HRIS web service',
    detail: 'REST API v2 · OAuth2 · Faculty headcount sync',
    latency: 'Retry queue',
    status: 'Delayed',
    statusColor: 'warning',
    icon: 'i-lucide-webhook',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
]
</script>
