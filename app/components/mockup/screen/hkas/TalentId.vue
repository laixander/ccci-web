<template>
  <MockupBrowserFrame
    url="hkas.ccci.com.ph/talent-id"
    title="Sport suitability · Grade 10 cohort"
    icon="i-lucide-sparkles"
    :floating-tags="floatingTags"
  >
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Screen Header -->
      <div class="flex items-center justify-between">
        <div>
          <span class="font-bold text-[14px] text-highlighted">Sport Suitability Predictions</span>
          <p class="text-[10px] text-muted mt-0.5">Assessed against international age & gender norms · 80+ sports</p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge label="AI Analysis Active" color="primary" variant="subtle" size="xs" class="font-bold tracking-wider uppercase" />
          <UButton
            label="Run Prediction"
            icon="i-lucide-sparkles"
            color="primary"
            size="xs"
            class="font-semibold"
          />
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-3 gap-2.5">
        <UCard
          v-for="stat in summaryStats"
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

      <!-- Cohort Candidates Table Header -->
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[12px] text-highlighted">Athlete Predictions</span>
          <UBadge label="Cohort 10-A" color="neutral" variant="subtle" size="xs" class="font-mono text-[9px]" />
        </div>
        <UButton
          label="View all"
          color="primary"
          variant="ghost"
          size="xs"
          trailing-icon="i-lucide-chevron-right"
        />
      </div>

      <!-- Candidates List -->
      <div v-if="athletes?.length" class="flex flex-col gap-2">
        <UCard
          v-for="item in athletes"
          :key="item.name"
          variant="outline"
          :ui="{ body: 'px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between' }"
          class="rounded-xl shadow-2xs hover:bg-elevated/40 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <UAvatar :text="item.initials" size="sm" :color="item.avatarColor" />
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-[12.5px] text-highlighted truncate">{{ item.name }}</p>
                <UBadge
                  :label="item.sport"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                  class="font-mono text-[9.5px] uppercase tracking-wider px-1.5 py-0"
                />
              </div>
              <p class="text-[10px] text-muted truncate mt-0.5">{{ item.details }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <div class="flex flex-col items-end">
              <span class="font-mono font-bold text-[13px] text-highlighted">{{ item.suitability }}</span>
              <span class="text-[9px] text-dimmed">Match Score</span>
            </div>
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

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-1 border-t border-default/40">
        <div class="flex items-center gap-1.5 text-muted text-[10px]">
          <UIcon name="i-lucide-info" class="size-3 text-primary" />
          <span>Norms source: World Athletics & FIBA Anthropometric Baselines</span>
        </div>
        <span class="text-[10px] text-dimmed font-mono">Algorithm v4.2</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'ai-talent',
    title: 'AI Prediction',
    subtitle: '80+ Sports Evaluated',
    icon: 'i-lucide-sparkles',
    color: 'primary',
    pulse: true,
  },
  {
    id: 'match-rate',
    title: '94% Top Match',
    subtitle: 'M. Santos · Track & Field',
    icon: 'i-lucide-award',
    color: 'success',
    badge: { label: 'OPTIMAL', color: 'success' },
  },
  {
    id: 'talent-pipeline',
    title: 'Recruitment Flow',
    subtitle: 'Direct Coach Alerts',
    icon: 'i-lucide-target',
    color: 'info',
    badge: { label: 'SYNCED', color: 'info' },
  },
]

interface SummaryStat {
  label: string
  value: string
  sub: string
  subClass: string
}

interface AthletePrediction {
  name: string
  initials: string
  sport: string
  suitability: string
  status: string
  statusColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  avatarColor: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'neutral'
  details: string
}

const summaryStats: SummaryStat[] = [
  { label: 'Athletes Screened', value: '89', sub: '+12 this week', subClass: 'text-success' },
  { label: 'High Potential', value: '34', sub: '>85% suitability', subClass: 'text-primary' },
  { label: 'Target Sports', value: '18', sub: 'Varsity disciplines', subClass: 'text-info' },
]

const athletes: AthletePrediction[] = [
  {
    name: 'M. Santos',
    initials: 'MS',
    sport: 'Track & Field',
    suitability: '94%',
    status: 'Strong match',
    statusColor: 'success',
    avatarColor: 'primary',
    details: 'High fast-twitch ratio · Peak sprint velocity 9.8 m/s',
  },
  {
    name: 'J. dela Cruz',
    initials: 'JC',
    sport: 'Basketball',
    suitability: '88%',
    status: 'Strong match',
    statusColor: 'success',
    avatarColor: 'info',
    details: 'Wingspan +7cm ratio · Vertical leap 32.5 inches',
  },
  {
    name: 'A. Reyes',
    initials: 'AR',
    sport: 'Swimming',
    suitability: '81%',
    status: 'Good match',
    statusColor: 'primary',
    avatarColor: 'success',
    details: 'High shoulder mobility (340° ROM) · VO₂ max 54.2 mL/kg',
  },
  {
    name: 'C. Bautista',
    initials: 'CB',
    sport: 'Volleyball',
    suitability: '67%',
    status: 'Review',
    statusColor: 'warning',
    avatarColor: 'warning',
    details: 'Lateral agility within 60th pctl · Block reach retest',
  },
]
</script>
