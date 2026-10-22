<template>
  <MockupBrowserFrame url="app.learncore.edu/student/stu-10422" title="My Docket" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Student Profile -->
      <div class="flex items-center gap-4">
        <div class="size-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 shrink-0" />
        <div class="flex flex-col">
          <span class="font-bold text-[18px] text-highlighted leading-tight">Liam Cruz</span>
          <span class="text-[11px] text-muted font-mono mt-0.5">STU-10422 · Dean's Lister</span>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-3 gap-3">
        <UCard
          v-for="stat in stats"
          :key="stat.label"
          variant="outline"
          :ui="{ body: 'sm:p-3 flex flex-col items-center justify-center' }"
          class="rounded-xl shadow-sm"
        >
          <span class="text-[22px] font-black text-primary leading-none">{{ stat.value }}</span>
          <span class="text-[9px] text-muted uppercase tracking-widest mt-1">{{ stat.label }}</span>
        </UCard>
      </div>

      <!-- Achievements & Alerts -->
      <div class="flex flex-col gap-3">
        <UCard
          v-for="item in achievements"
          :key="item.text"
          variant="soft"
          :ui="{ body: 'sm:p-4 flex items-center gap-3' }"
          class="rounded-xl shadow-sm"
        >
          <UIcon :name="item.icon" class="size-4 shrink-0" :class="item.iconColor" />
          <span class="text-[12px] text-highlighted font-medium">{{ item.text }}</span>
        </UCard>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'deans-lister',
    title: "Dean's Lister",
    subtitle: 'Liam Cruz · GWA 1.75',
    icon: 'i-lucide-medal',
    color: 'warning',
    badge: { label: 'HONORS', color: 'warning' }
  },
  {
    id: 'testing-permit',
    title: 'Testing Permit',
    subtitle: 'Available · 96% Attendance',
    icon: 'i-lucide-file-badge',
    color: 'success',
    pulse: true
  },
  {
    id: 'units',
    title: '96 Units Earned',
    subtitle: 'Best in Programming 2025',
    icon: 'i-lucide-graduation-cap',
    color: 'primary',
    badge: { label: '96 UNITS', color: 'primary' }
  }
]

const stats = [
  { label: 'GWA',        value: '1.75' },
  { label: 'Units',      value: '96'   },
  { label: 'Attendance', value: '96%'  },
]

const achievements = [
  { icon: 'i-lucide-medal',        iconColor: 'text-warning',  text: 'Best in Programming 2025'  },
  { icon: 'i-lucide-graduation-cap', iconColor: 'text-secondary',  text: 'Scholarship: Academic Merit' },
  { icon: 'i-lucide-circle-check', iconColor: 'text-success',  text: 'Testing permit available'   },
]
</script>
