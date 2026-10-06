<template>
  <MockupBrowserFrame url="app.peoplecore.io/timekeeping">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">My Board</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

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
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
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
