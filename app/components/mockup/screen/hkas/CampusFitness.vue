<template>
  <MockupBrowserFrame
    url="hkas.ccci.com.ph/campus-fitness"
    title="Percentile ranks · Campus results"
    icon="i-lucide-activity"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Campus Fitness Norms</span>
          <p class="text-[10px] text-muted mt-0.5">Cohort percentile rankings calculated against local university norms</p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge label="412 Enrolled" color="primary" variant="subtle" size="xs" class="font-bold font-mono tracking-wider" />
          <UButton
            label="Export Norms"
            icon="i-lucide-download"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
        </div>
      </div>

      <!-- Campus Benchmark Score Overview -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in fitnessStats"
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

      <!-- Campus Fitness Results Header -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[12px] text-highlighted">Standard Physical Fitness Components</span>
          <span class="text-[10px] text-muted">All Cohorts</span>
        </div>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Fitness Components List -->
      <div v-if="measures?.length" class="flex flex-col gap-2">
        <UCard
          v-for="measure in measures"
          :key="measure.name"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', measure.iconBg]">
              <UIcon :name="measure.icon" :class="['size-4', measure.iconColor]" />
            </div>
            <div class="min-w-0 flex-1 pr-4">
              <div class="flex items-center justify-between mb-1">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ measure.name }}</p>
                <span class="font-mono text-[11px] font-bold text-highlighted">{{ measure.percentile }}</span>
              </div>
              <!-- Progress bar indicator -->
              <div class="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all', measure.barColor]"
                  :style="{ width: `${measure.pct}%` }"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <UBadge
              :label="measure.status"
              :color="measure.statusColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Campus Benchmark Insights -->
      <div class="flex items-center justify-between pt-1 border-t border-default/40">
        <div class="flex items-center gap-1.5 text-muted text-[10px]">
          <UIcon name="i-lucide-check-circle" class="size-3 text-success" />
          <span>76% of campus meets or exceeds DepEd/CHED physical standards</span>
        </div>
        <span class="text-[10px] text-dimmed font-mono">Updated today</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'campus-norm',
    title: 'Local Norms',
    subtitle: 'Population-Calibrated',
    icon: 'i-lucide-users',
    color: 'primary',
    pulse: true,
  },
  {
    id: 'percentile-stat',
    title: '76th Percentile',
    subtitle: 'Overall Campus Average',
    icon: 'i-lucide-trending-up',
    color: 'success',
    badge: { label: 'ABOVE NORM', color: 'success' },
  },
  {
    id: 'flagged-alert',
    title: 'Intervention Group',
    subtitle: 'Agility Conditioning Alert',
    icon: 'i-lucide-alert-triangle',
    color: 'warning',
    badge: { label: 'FLAGGED', color: 'warning' },
  },
]

interface FitnessStat {
  label: string
  value: string
  sub: string
  subClass: string
}

interface FitnessMeasure {
  name: string
  percentile: string
  pct: number
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  barColor: string
  icon: string
  iconColor: string
  iconBg: string
}

const fitnessStats: FitnessStat[] = [
  { label: 'Campus Avg', value: '76th', sub: 'National norm: 50th', subClass: 'text-success' },
  { label: 'Cardio Leader', value: '82nd', sub: 'Aerobic fitness', subClass: 'text-primary' },
  { label: 'Needs Focus', value: 'Agility', sub: '38th percentile', subClass: 'text-warning' },
  { label: 'Compliance', value: '100%', sub: 'CHED PE standards', subClass: 'text-info' },
]

const measures: FitnessMeasure[] = [
  {
    name: 'Cardiovascular endurance',
    percentile: '82nd pctl',
    pct: 82,
    status: 'Above norm',
    statusColor: 'success',
    barColor: 'bg-success',
    icon: 'i-lucide-heart-pulse',
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
  },
  {
    name: 'Flexibility',
    percentile: '74th pctl',
    pct: 74,
    status: 'Above norm',
    statusColor: 'success',
    barColor: 'bg-primary',
    icon: 'i-lucide-move',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    name: 'Strength',
    percentile: '61st pctl',
    pct: 61,
    status: 'At norm',
    statusColor: 'info',
    barColor: 'bg-info',
    icon: 'i-lucide-dumbbell',
    iconColor: 'text-info',
    iconBg: 'bg-info/10',
  },
  {
    name: 'Agility',
    percentile: '38th pctl',
    pct: 38,
    status: 'Below norm',
    statusColor: 'warning',
    barColor: 'bg-warning',
    icon: 'i-lucide-zap',
    iconColor: 'text-warning',
    iconBg: 'bg-warning/10',
  },
]
</script>
