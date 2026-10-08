<template>
  <MockupBrowserFrame url="app.peoplecore.io/timesheets">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Timesheets</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-6">
        <!-- Stats Banner -->
        <UCard variant="soft" :ui="{ body: 'sm:p-5 text-white flex items-center justify-around' }" class="bg-gradient-to-r from-primary-600 to-primary-900 rounded-2xl">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-[22px] font-black leading-none mb-1.5">{{ stat.value }}</p>
            <p class="text-[10px] text-white/70 tracking-wide font-mono">{{ stat.label }}</p>
          </div>
        </UCard>

        <!-- Timesheets Table -->
        <div class="flex flex-col">
          <!-- Header -->
          <div class="grid grid-cols-4 gap-4 px-2 pb-3 border-b border-default mb-1">
            <span class="text-[10px] text-muted font-bold tracking-widest uppercase">Date</span>
            <span class="text-[10px] text-muted font-bold tracking-widest uppercase">Status</span>
            <span class="text-[10px] text-muted font-bold tracking-widest uppercase">In</span>
            <span class="text-[10px] text-muted font-bold tracking-widest uppercase">Out</span>
          </div>
          <!-- Rows -->
          <div class="flex flex-col">
            <div
              v-for="row in timesheets"
              :key="row.date"
              class="grid grid-cols-4 gap-4 px-2 py-3.5 border-b border-default last:border-0 items-center"
            >
              <span class="text-[13px] text-highlighted">{{ row.date }}</span>
              <div>
                <UBadge :label="row.status" :color="row.color" variant="subtle" size="xs" class="uppercase tracking-widest font-bold px-2" />
              </div>
              <span class="text-[12px] text-muted font-mono">{{ row.in }}</span>
              <span class="text-[12px] text-muted font-mono">{{ row.out }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const stats = [
  { label: 'Time', value: '11:59' },
  { label: 'OT',   value: '0.00' },
  { label: 'Late', value: '0.00' },
  { label: 'UT',   value: '0.00' },
]

const timesheets = [
  { date: '10/1', status: 'LATE',    color: 'warning' as const, in: '08:00', out: '05:00' },
  { date: '10/2', status: 'PRESENT', color: 'success' as const, in: '08:00', out: '05:00' },
  { date: '10/3', status: 'PRESENT', color: 'success' as const, in: '08:00', out: '05:00' },
]
</script>
