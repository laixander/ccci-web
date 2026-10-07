<template>
  <MockupBrowserFrame url="app.learncore.edu/scheduling">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Master Schedule</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest font-mono uppercase">CCCI</span>
      </div>

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
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
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
