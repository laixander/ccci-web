<template>
  <MockupBrowserFrame
    url="hkas.ccci.com.ph/benchmarks"
    title="Benchmark comparison · Age group 15–16"
    icon="i-lucide-scale"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Normative Benchmark Evaluation</span>
          <p class="text-[10px] text-muted mt-0.5">Historical baseline comparison segmented by age 15–16, gender & varsity level</p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge label="Segment: Junior Varsity" color="primary" variant="subtle" size="xs" class="font-mono text-[9px]" />
          <UButton
            label="Filter Cohort"
            icon="i-lucide-filter"
            color="neutral"
            variant="outline"
            size="xs"
            class="font-mono"
          />
        </div>
      </div>

      <!-- Segment Summary Metric Cards -->
      <div class="grid grid-cols-4 gap-2.5">
        <UCard
          v-for="stat in benchmarkStats"
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

      <!-- Comparison Rows Header -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[12px] text-highlighted">Vs. Established Norm</span>
          <span class="text-[10px] text-muted">Ages 15–16</span>
        </div>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Benchmark Metrics List -->
      <div v-if="benchmarks?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in benchmarks"
          :key="item.measure"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', item.iconBg]">
              <UIcon :name="item.icon" :class="['size-4', item.iconColor]" />
            </div>
            <div class="min-w-0 flex-1 pr-4">
              <div class="flex items-center justify-between mb-1">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ item.measure }}</p>
                <span class="font-mono text-[11px] font-bold text-highlighted">{{ item.percentile }}</span>
              </div>
              <!-- Comparative track -->
              <div class="relative w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all', item.barColor]"
                  :style="{ width: `${item.pct}%` }"
                />
                <!-- 50th percentile baseline mark -->
                <div class="absolute top-0 bottom-0 left-1/2 w-0.5 bg-foreground/20" title="Norm 50th pctl" />
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <UBadge
              :label="item.status"
              :color="item.statusColor"
              variant="subtle"
              size="xs"
              class="font-bold tracking-wider uppercase px-2"
            />
          </div>
        </UCard>
      </div>

      <!-- Footer Normative Citation -->
      <div class="flex items-center justify-between pt-1 border-t border-default/40">
        <div class="flex items-center gap-1.5 text-muted text-[10px]">
          <UIcon name="i-lucide-layers" class="size-3 text-primary" />
          <span>Established using 3-year historical dataset (N = 2,480 students)</span>
        </div>
        <span class="text-[10px] text-dimmed font-mono">P-value &lt; 0.01</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'historical-norms',
    title: 'Historical Baseline',
    subtitle: 'N = 2,480 Data Points',
    icon: 'i-lucide-history',
    color: 'primary',
    pulse: true,
  },
  {
    id: 'variance-stat',
    title: '+18.4% Variance',
    subtitle: 'Cardio Cohort vs State',
    icon: 'i-lucide-trending-up',
    color: 'success',
    badge: { label: 'PEAK', color: 'success' },
  },
  {
    id: 'segment-tag',
    title: 'Cohort Filter',
    subtitle: 'Age 15–16 Verified',
    icon: 'i-lucide-user-check',
    color: 'info',
    badge: { label: 'MATCHED', color: 'info' },
  },
]

interface BenchmarkStat {
  label: string
  value: string
  sub: string
  subClass: string
}

interface BenchmarkItem {
  percentile: string
  measure: string
  pct: number
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  barColor: string
  icon: string
  iconColor: string
  iconBg: string
}

const benchmarkStats: BenchmarkStat[] = [
  { label: 'Cohort Size', value: '184', sub: 'Ages 15–16', subClass: 'text-primary' },
  { label: 'Exceeding Norm', value: '62%', sub: '>50th percentile', subClass: 'text-success' },
  { label: 'Strength Delta', value: '+11%', sub: 'Vs. last year', subClass: 'text-info' },
  { label: 'Flagged Retest', value: '7', sub: 'Low agility index', subClass: 'text-warning' },
]

const benchmarks: BenchmarkItem[] = [
  {
    percentile: '82nd pctl',
    measure: 'Cardiovascular endurance',
    pct: 82,
    status: 'Above norm',
    statusColor: 'success',
    barColor: 'bg-success',
    icon: 'i-lucide-heart-pulse',
    iconColor: 'text-success',
    iconBg: 'bg-success/10',
  },
  {
    percentile: '74th pctl',
    measure: 'Flexibility',
    pct: 74,
    status: 'Above norm',
    statusColor: 'success',
    barColor: 'bg-primary',
    icon: 'i-lucide-move',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    percentile: '61st pctl',
    measure: 'Strength',
    pct: 61,
    status: 'At norm',
    statusColor: 'info',
    barColor: 'bg-info',
    icon: 'i-lucide-dumbbell',
    iconColor: 'text-info',
    iconBg: 'bg-info/10',
  },
  {
    percentile: '38th pctl',
    measure: 'Agility',
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
