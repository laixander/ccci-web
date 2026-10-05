<template>
  <MockupBrowserFrame url="app.learncore.edu/student">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">My Activities</span>
        </div>
        <span class="text-[10px] text-muted font-mono tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-6">
        <!-- Metrics -->
        <div class="grid grid-cols-3 gap-4">
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex items-center gap-3' }" class="rounded-lg">
            <span class="text-2xl font-black text-primary leading-none">5</span>
            <span class="text-[10px] text-muted uppercase tracking-widest font-mono">Current</span>
          </UCard>
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex items-center gap-3' }" class="rounded-lg">
            <span class="text-2xl font-black text-emerald-500 leading-none">12</span>
            <span class="text-[10px] text-muted uppercase tracking-widest font-mono">Conducted</span>
          </UCard>
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex items-center gap-3' }" class="rounded-lg">
            <span class="text-2xl font-black text-pink-500 leading-none">2</span>
            <span class="text-[10px] text-muted uppercase tracking-widest font-mono">Missed</span>
          </UCard>
        </div>

        <!-- Activities List -->
        <div class="flex flex-col gap-4">
          <!-- Item 1 -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3.5' }" class="rounded-lg">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[13px] text-highlighted">Calculus II — Quiz 4</span>
              <span class="text-[10px] text-muted font-mono tracking-wide">Due in 3h</span>
            </div>
            <UProgress :model-value="65" color="primary" size="md" />
          </UCard>

          <!-- Item 2 -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3.5' }" class="rounded-lg">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[13px] text-highlighted">World History — Essay</span>
              <span class="text-[10px] text-muted font-mono tracking-wide">Submitted</span>
            </div>
            <UProgress :model-value="100" color="primary" size="md" />
          </UCard>

          <!-- Item 3 -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3.5' }" class="rounded-lg">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[13px] text-highlighted">Digital Ethics — Reading</span>
              <span class="text-[10px] text-muted font-mono tracking-wide">Self-paced</span>
            </div>
            <UProgress :model-value="30" color="primary" size="md" />
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
// Component intentionally left bare as per mockup nature
</script>