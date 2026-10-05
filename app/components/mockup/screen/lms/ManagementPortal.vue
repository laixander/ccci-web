<template>
  <MockupBrowserFrame url="app.learncore.edu/admin">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Admin Dashboard</span>
        </div>
        <span class="text-[10px] text-muted font-mono tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Purple Banner -->
         <UCard variant="soft" :ui="{ body: 'sm:p-4 text-white flex items-center justify-around' }" class="bg-gradient-to-r from-violet-600 to-indigo-900 rounded-lg">
          <div class="text-center">
            <p class="text-[22px] font-black leading-none mb-1.5">24</p>
            <p class="text-[9px] text-white/75 uppercase tracking-widest font-semibold">Programs</p>
          </div>
          <div class="text-center">
            <p class="text-[22px] font-black leading-none mb-1.5">186</p>
            <p class="text-[9px] text-white/75 uppercase tracking-widest font-semibold">Subjects</p>
          </div>
          <div class="text-center">
            <p class="text-[22px] font-black leading-none mb-1.5">1.2k</p>
            <p class="text-[9px] text-white/75 uppercase tracking-widest font-semibold">Students</p>
          </div>
          <div class="text-center">
            <p class="text-[22px] font-black leading-none mb-1.5">84</p>
            <p class="text-[9px] text-white/75 uppercase tracking-widest font-semibold">Faculty</p>
          </div>
        </UCard>

        <!-- Cards -->
        <div class="grid grid-cols-2 gap-4 flex-1">
          <!-- Newsfeed -->
          <UCard class="flex flex-col h-full" :ui="{ body: 'flex-1 flex flex-col p-4 sm:p-4' }">
            <p class="text-[12px] font-bold text-highlighted mb-3.5">Newsfeed</p>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-3">
                <div class="size-7 rounded-full bg-gradient-to-br from-violet-300 to-violet-500" />
                <span class="text-[11px] text-muted font-medium">School mission updated</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="size-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-700" />
                <span class="text-[11px] text-muted font-medium">Founding Day — Oct 21</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="size-7 rounded-full bg-gradient-to-br from-violet-700 to-indigo-900" />
                <span class="text-[11px] text-muted font-medium">New scholarship batch</span>
              </div>
            </div>
          </UCard>

          <!-- Roles -->
          <UCard class="flex flex-col h-full" :ui="{ body: 'flex-1 flex flex-col p-4 sm:p-4' }">
            <p class="text-[12px] font-bold text-highlighted mb-4">Roles</p>
            <div class="flex flex-col gap-4 flex-1 justify-center">
              <div class="flex items-center justify-between gap-3">
                <span class="text-[11px] text-muted w-14 font-medium">Students</span>
                <UProgress :model-value="80" color="primary" size="lg" class="flex-1" />
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-[11px] text-muted w-14 font-medium">Faculty</span>
                <UProgress :model-value="45" color="info" size="lg" class="flex-1" />
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-[11px] text-muted w-14 font-medium">Staff</span>
                <UProgress :model-value="25" color="success" size="lg" class="flex-1" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
// Component intentionally left bare as per mockup nature
</script>
