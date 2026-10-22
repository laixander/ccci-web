<template>
  <MockupBrowserFrame url="app.learncore.edu/scheduling" title="Master Schedule" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-6">
      <!-- Grid Header (Rooms) -->
      <div class="flex items-center">
        <div class="w-10"></div> <!-- Empty space for time column -->
        <div class="flex-1 grid grid-cols-3 gap-2">
          <div v-for="room in rooms" :key="room" class="text-center">
            <span class="text-[11px] font-mono font-bold text-highlighted">{{ room }}</span>
          </div>
        </div>
      </div>

      <!-- Schedule Rows -->
      <div class="flex flex-col gap-2">
        <div v-for="row in schedule" :key="row.time" class="flex items-center">
          <div class="w-10 text-[10px] font-mono text-muted text-right pr-3 shrink-0">
            {{ row.time }}
          </div>
          <div class="flex-1 grid grid-cols-3 gap-2">
            <div
              v-for="(slot, idx) in row.slots"
              :key="idx"
              class="rounded-md py-1.5 text-center flex items-center justify-center h-8"
              :class="slot.color"
            >
              <span class="text-[11px] font-mono font-medium">{{ slot.subject }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Banner -->
      <div class="mt-4 bg-primary/10 rounded-xl py-3 flex items-center justify-center border border-primary/20">
        <span class="text-[11px] font-mono text-primary font-semibold">Utilization 88% · 0 conflicts detected</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'utilization',
    title: '88% Utilization',
    subtitle: 'Rm 201 · Rm 202 · Lab A',
    icon: 'i-lucide-layout-grid',
    color: 'primary',
    badge: { label: '88%', color: 'primary' }
  },
  {
    id: 'no-conflicts',
    title: 'No Conflicts',
    subtitle: '0 Overlaps Detected',
    icon: 'i-lucide-shield-check',
    color: 'success',
    pulse: true
  },
  {
    id: 'subjects',
    title: 'Active Subjects',
    subtitle: 'CS204 · PHY1 · MA201',
    icon: 'i-lucide-calendar-days',
    color: 'info',
    badge: { label: '3 SUBJ', color: 'info' }
  }
]

const rooms = ['Rm 201', 'Rm 202', 'Lab A']

const schedule = [
  {
    time: '8:00',
    slots: [
      { subject: 'CS204', color: 'bg-indigo-500 text-white' },
      { subject: '—',     color: 'bg-gray-100 dark:bg-gray-800 text-muted' },
      { subject: 'PHY1',  color: 'bg-blue-500 text-white' },
    ]
  },
  {
    time: '10:00',
    slots: [
      { subject: '—',     color: 'bg-gray-100 dark:bg-gray-800 text-muted' },
      { subject: 'PHY1',  color: 'bg-blue-500 text-white' },
      { subject: '—',     color: 'bg-gray-100 dark:bg-gray-800 text-muted' },
    ]
  },
  {
    time: '1:00',
    slots: [
      { subject: 'PHY1',  color: 'bg-blue-500 text-white' },
      { subject: '—',     color: 'bg-gray-100 dark:bg-gray-800 text-muted' },
      { subject: 'MA201', color: 'bg-primary text-white' },
    ]
  }
]
</script>
