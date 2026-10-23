<template>
  <MockupBrowserFrame
    url="hkas.ccci.com.ph/reports"
    title="Reports · This term"
    icon="i-lucide-bar-chart-2"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Analytics & Report Center</span>
          <p class="text-[10px] text-muted mt-0.5">Statistical analysis, compliance exports, and interactive performance dashboards</p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge label="CHED PE Compliant" color="success" variant="subtle" size="xs" class="font-mono text-[9px] uppercase tracking-wider" />
          <UButton
            label="Generate Report"
            icon="i-lucide-file-text"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Overview Stats -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in reportStats"
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

      <!-- Generated Reports List Header -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[12px] text-highlighted">Generated Assets</span>
          <span class="text-[10px] text-muted">Q2 Academic Period</span>
        </div>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Reports List -->
      <div v-if="reports?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in reports"
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
            <UBadge
              :label="item.detail"
              :color="item.detailColor"
              variant="outline"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
            <UButton
              icon="i-lucide-download"
              color="neutral"
              variant="ghost"
              size="xs"
            />
          </div>
        </UCard>
      </div>

      <!-- Export Formats -->
      <div class="flex items-center justify-between pt-1 border-t border-default/40">
        <div class="flex items-center gap-1.5 text-muted text-[10px]">
          <UIcon name="i-lucide-check-circle-2" class="size-3 text-success" />
          <span>Instant export to PDF, Excel (XLSX), CSV, and interactive URL</span>
        </div>
        <span class="text-[10px] text-dimmed font-mono">Synced 5m ago</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'report-export',
    title: 'One-Click Export',
    subtitle: 'CHED PE Ready Formats',
    icon: 'i-lucide-file-text',
    color: 'success',
    pulse: true,
  },
  {
    id: 'interactive-chart',
    title: 'Interactive Biometrics',
    subtitle: 'Strength Velocity Trend',
    icon: 'i-lucide-line-chart',
    color: 'primary',
    badge: { label: 'LIVE VIZ', color: 'primary' },
  },
  {
    id: 'analytics-dash',
    title: 'Executive Summary',
    subtitle: 'Campus-wide Distribution',
    icon: 'i-lucide-pie-chart',
    color: 'info',
    badge: { label: 'PREVIEW', color: 'info' },
  },
]

interface ReportStat {
  label: string
  value: string
  sub: string
  subClass: string
}

interface ReportItem {
  tag: string
  tagColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  item: string
  details: string
  detail: string
  detailColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  icon: string
  iconColor: string
  iconBg: string
}

const reportStats: ReportStat[] = [
  { label: 'Published Reports', value: '38', sub: 'This semester', subClass: 'text-primary' },
  { label: 'Interactive Dashboards', value: '6', sub: 'Live streaming', subClass: 'text-success' },
  { label: 'CHED Audits', value: '100%', sub: 'Zero discrepancy', subClass: 'text-info' },
  { label: 'Cohort Insights', value: '412', sub: 'Active profiles', subClass: 'text-highlighted' },
]

const reports: ReportItem[] = [
  {
    tag: 'Report',
    tagColor: 'primary',
    item: 'Team B vs. norm',
    details: 'Comparative performance report against national age-group norms',
    detail: 'Today',
    detailColor: 'primary',
    icon: 'i-lucide-file-bar-chart',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    tag: 'Chart',
    tagColor: 'success',
    item: 'Strength trend, Grade 10',
    details: 'Longitudinal dynamometer peak force curves across 4 quarters',
    detail: 'Interactive',
    detailColor: 'success',
    icon: 'i-lucide-line-chart',
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
  },
  {
    tag: 'Report',
    tagColor: 'info',
    item: 'Individual profile — M. Santos',
    details: 'Complete biomechanics dossier with sport prediction metrics',
    detail: 'Custom',
    detailColor: 'info',
    icon: 'i-lucide-user-check',
    iconColor: 'text-info',
    iconBg: 'bg-info/10',
  },
  {
    tag: 'Dashboard',
    tagColor: 'warning',
    item: 'Campus fitness overview',
    details: 'Executive summary with aggregate percentile distributions',
    detail: 'Live',
    detailColor: 'warning',
    icon: 'i-lucide-layout-dashboard',
    iconColor: 'text-warning',
    iconBg: 'bg-warning/10',
  },
]
</script>
