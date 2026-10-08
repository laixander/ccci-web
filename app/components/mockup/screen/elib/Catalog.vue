<template>
  <MockupBrowserFrame url="library.ccci.io/catalog">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Borrow · Clean Code</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Book detail card -->
        <div class="flex items-center gap-4">
          <!-- Book cover -->
          <div class="w-20 h-28 rounded-xl bg-gradient-to-b from-primary-400 to-primary-800 shrink-0 flex items-end justify-center pb-2" />
          <!-- Book info -->
          <div class="flex flex-col gap-1.5 flex-1">
            <p class="text-[15px] font-black text-highlighted leading-tight">Clean Code</p>
            <p class="text-[11px] text-muted">Robert C. Martin · 2008</p>
            <p class="text-[11px] text-muted">Subject: Software Eng.</p>
            <div class="mt-1">
              <span class="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md">
                {{ copies }} copies available
              </span>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-2 mt-auto">
          <UButton block label="Issue book" color="primary" class="flex-1 py-2 rounded-lg" />
          <UButton block label="Reserve" color="neutral" variant="outline" class="flex-1 py-2 rounded-lg" />
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const copies = 3
</script>
