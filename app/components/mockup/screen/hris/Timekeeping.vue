<template>
  <MockupBrowserFrame url="app.peoplecore.io/timekeeping" title="My Board" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Welcome Banner -->
      <UCard variant="soft" :ui="{ body: 'sm:p-4' }" class="bg-gradient-to-r from-primary-600 to-primary-900 rounded-xl">
        <p class="text-[15px] font-black text-white leading-snug">Good morning, Jane Copper</p>
        <p class="text-[10px] text-white/60 font-mono mt-1 tracking-wide">Accessing EMPLOYEE module · Aug 28, 08:00 AM</p>
      </UCard>

      <!-- Stat Cards -->
      <div class="grid grid-cols-3 gap-3">
        <UCard v-for="stat in statCards" :key="stat.label" :ui="{ body: 'sm:p-4 flex flex-col gap-1' }" class="rounded-xl shadow-sm">
          <p class="text-[9px] text-muted uppercase tracking-widest">{{ stat.label }}</p>
          <p class="text-[22px] font-black text-highlighted leading-none">{{ stat.value }}</p>
          <p class="text-[10px] text-primary font-semibold mt-0.5">{{ stat.sub }}</p>
        </UCard>
      </div>

      <!-- Attendance Progress -->
      <div class="flex flex-col gap-3">
        <div v-for="item in attendance" :key="item.label" class="flex items-center gap-3">
          <span class="text-[11px] text-muted w-14">{{ item.label }}</span>
          <UProgress :model-value="item.value" :color="item.color" class="flex-1" />
        </div>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'time-in',
    title: 'Jane Copper',
    subtitle: 'Time In · 11:59 AM',
    icon: 'i-lucide-log-in',
    color: 'primary',
    badge: { label: '11:59', color: 'primary' }
  },
  {
    id: 'overtime',
    title: 'Overtime',
    subtitle: '4 Approved · 2 Pending',
    icon: 'i-lucide-timer',
    color: 'warning',
    pulse: true
  },
  {
    id: 'attendance',
    title: 'Attendance',
    subtitle: '85% Present · Aug 28',
    icon: 'i-lucide-calendar-check-2',
    color: 'success',
    badge: { label: '85%', color: 'success' }
  }
]

const statCards = [
  { label: 'Time',     value: '11:59', sub: 'Time in'   },
  { label: 'Overtime', value: '4/2',   sub: 'appr/pend' },
  { label: 'Requests', value: '8/16',  sub: 'ongoing'   },
]

const attendance = [
  { label: 'Present',  value: 85, color: 'primary' as const },
  { label: 'Late',     value: 40, color: 'warning' as const },
  { label: 'On leave', value: 25, color: 'sky'     as const },
]
</script>
