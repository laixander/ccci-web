<template>
  <MockupBrowserFrame url="app.peoplecore.io/learning">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Training Programs</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Stat Cards -->
        <div class="grid grid-cols-4 gap-3">
          <UCard v-for="stat in stats" :key="stat.label" variant="outline" :ui="{ body: 'sm:p-3 flex flex-col items-center gap-0.5' }" class="rounded-xl shadow-sm">
            <p class="text-[22px] font-black text-highlighted leading-none">{{ stat.value }}</p>
            <p class="text-[10px] text-muted">{{ stat.label }}</p>
          </UCard>
        </div>

        <!-- Training Grid -->
        <div class="grid grid-cols-3 gap-4">
          <UCard
            v-for="program in programs"
            :key="program.title + program.status"
            variant="outline"
            :ui="{ body: 'sm:p-0 flex flex-col overflow-hidden' }"
            class="rounded-xl shadow-sm overflow-hidden p-0"
          >
            <!-- Banner -->
            <div class="relative h-20 flex-shrink-0" :class="program.bannerClass">
              <!-- <UBadge :label="program.status" color="primary" variant="outline" size="xs" class="absolute top-2 left-2 font-semibold text-primary rounded-full" /> -->
            </div>
            <!-- Info -->
            <div class="p-3 flex flex-col gap-1.5">
              <span class="font-bold text-[13px] text-highlighted">{{ program.title }}</span>
              <span class="text-[10px] text-muted font-mono">{{ program.location }}</span>
              <UBadge :label="program.date" :color="program.dateColor" variant="subtle" size="xs" class="w-fit px-2" />
            </div>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const stats = [
  { label: 'Total',    value: '4' },
  { label: 'Upcoming', value: '1' },
  { label: 'Ongoing',  value: '1' },
  { label: 'Done',     value: '2' },
]

const programs = [
  {
    title:       'Leadership Bootcamp',
    location:    'Makati, PH',
    status:      'Upcoming',
    date:        'Oct 21',
    bannerClass: 'bg-gradient-to-b from-primary-200 to-primary-400',
    dateColor:   'neutral' as const,
  },
  {
    title:       'Data Privacy 101',
    location:    'BGC, PH',
    status:      'Ongoing',
    date:        'Oct 14',
    bannerClass: 'bg-gradient-to-b from-primary-400 to-primary-600',
    dateColor:   'warning' as const,
  },
  {
    title:       'Safety & Health',
    location:    'Ortigas, PH',
    status:      'Ended',
    date:        'Sep 30',
    bannerClass: 'bg-gradient-to-b from-primary-600 to-primary-800',
    dateColor:   'error' as const,
  },
]
</script>
