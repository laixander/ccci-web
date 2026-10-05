<template>
  <MockupBrowserFrame url="app.learncore.edu/parent">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Parent Dashboard</span>
        </div>
        <span class="text-[10px] text-muted font-mono tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex gap-4">
        <!-- Left Side: QR Code -->
        <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col items-center justify-center h-full gap-5' }" class="rounded-lg w-32 shrink-0">
          <div class="size-16 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
            <UIcon name="i-lucide-qr-code" class="size-8 text-primary" />
          </div>
          <span class="text-[10px] text-muted font-mono tracking-wide">Scan to link</span>
        </UCard>

        <!-- Right Side: Info & Actions -->
        <div class="flex-1 flex flex-col gap-4">
          <!-- Student Info -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-1.5' }" class="rounded-lg">
            <span class="font-bold text-[14px] text-highlighted">Liam Cruz · STU-10422</span>
            <span class="text-[10px] text-muted font-mono tracking-wide">Grade 11 · Section A</span>
          </UCard>

          <!-- Attendance -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3' }" class="rounded-lg">
            <div class="flex items-center justify-between">
              <span class="text-[12px] text-muted font-medium">Attendance</span>
              <span class="text-[12px] font-bold text-emerald-500">96%</span>
            </div>
            <UProgress :model-value="96" color="success" size="md" />
          </UCard>

          <!-- Tuition Action -->
          <UButton 
            color="primary"
            variant="solid" 
            class="w-full justify-between py-3.5 px-4 rounded-lg shadow-sm"
          >
            <span class="font-medium text-[13px]">Tuition · Term 2</span>
            <span class="font-mono tracking-wide text-[12px]">Pay ₱18,500</span>
          </UButton>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
// Component intentionally left bare as per mockup nature
</script>