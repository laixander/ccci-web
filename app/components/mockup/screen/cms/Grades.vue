<template>
  <MockupBrowserFrame url="app.learncore.edu/grades/cs-204">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Grade Submission · CS-204</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest font-mono uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col">
        <!-- Main Card -->
        <UCard variant="outline" :ui="{ body: 'sm:p-5 flex flex-col gap-6' }" class="rounded-xl shadow-sm border-0 ring-1 ring-default bg-elevated">
          
          <!-- Header -->
          <div class="flex items-end justify-between">
            <span class="font-bold text-[16px] text-highlighted">Data Structures</span>
            <span class="text-[11px] text-muted font-mono">42 students · 40 encoded</span>
          </div>

          <!-- Progress Bars -->
          <div class="flex flex-col gap-4">
            <div v-for="stat in progressStats" :key="stat.label" class="flex items-center gap-4">
              <span class="text-[12px] text-muted font-mono w-24 shrink-0">{{ stat.label }}</span>
              <UProgress :model-value="(stat.value / stat.max) * 100" :color="stat.color" class="flex-1" />
              <span class="text-[12px] font-bold text-highlighted w-4 text-right shrink-0">{{ stat.value }}</span>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="grid grid-cols-2 gap-4 mt-2">
            <!-- Average Card -->
            <UCard variant="outline" :ui="{ body: 'sm:p-3 flex flex-col items-center justify-center h-full' }" class="rounded-xl border border-default shadow-none">
              <span class="text-[28px] font-black text-primary leading-none">1.68</span>
              <span class="text-[10px] text-muted font-mono mt-1 uppercase tracking-wider">Class average</span>
            </UCard>

            <!-- Submit Button -->
            <UButton label="Submit to Dean" color="primary" block size="xl" class="rounded-xl font-bold text-[14px] h-full shadow-sm bg-gradient-to-r from-primary-500 to-primary-600" />
          </div>

        </UCard>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const progressStats = [
  { label: 'Encoded',      value: 40, max: 42, color: 'primary' as const },
  { label: 'For approval', value: 2,  max: 42, color: 'warning' as const },
  { label: 'Tagged INC',   value: 1,  max: 42, color: 'rose'    as const },
]
</script>
