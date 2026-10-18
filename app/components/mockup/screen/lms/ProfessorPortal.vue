<template>
  <MockupBrowserFrame url="app.learncore.edu/teaching/cs-204" title="Teaching · CS-204">
    <div class="p-5 flex-1 flex flex-col gap-6">
      <!-- Tabs -->
      <div class="flex items-center gap-2">
        <UButton label="Class Feed" variant="outline" color="neutral" class="rounded-full px-4 font-medium shadow-sm" />
        <UButton label="Lessons" variant="solid" color="primary" class="rounded-full px-5 font-medium shadow-sm" />
        <UButton label="Grades" variant="outline" color="neutral" class="rounded-full px-4 font-medium shadow-sm" />
      </div>

      <!-- Lessons List -->
      <div class="flex flex-col gap-3.5">
        <!-- Item 1 -->
         <UCard variant="soft" :ui="{ body: 'sm:p-4 flex items-center justify-between' }" class="rounded-lg">
          <div class="flex items-center gap-4">
            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon name="i-lucide-file-text" class="size-5 text-primary" />
            </div>
            <span class="font-bold text-[13px] text-highlighted">Recursion — Module 4</span>
          </div>
          <UBadge label="PDF" color="error" variant="subtle" size="sm" class="font-bold tracking-widest px-2" />
        </UCard>

        <!-- Item 2 -->
        <UCard variant="soft" :ui="{ body: 'sm:p-4 flex items-center justify-between' }" class="rounded-lg">
          <div class="flex items-center gap-4">
            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon name="i-lucide-file-text" class="size-5 text-primary" />
            </div>
            <span class="font-bold text-[13px] text-highlighted">Trees & Graphs</span>
          </div>
          <UBadge label="PPTX" color="warning" variant="subtle" size="sm" class="font-bold tracking-widest px-2" />
        </UCard>

        <!-- Item 3 -->
        <UCard variant="soft" :ui="{ body: 'sm:p-4 flex items-center justify-between' }" class="rounded-lg">
          <div class="flex items-center gap-4">
            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon name="i-lucide-file-text" class="size-5 text-primary" />
            </div>
            <span class="font-bold text-[13px] text-highlighted">Quiz 3: Big-O</span>
          </div>
          <UBadge label="CSV" color="success" variant="subtle" size="sm" class="font-bold tracking-widest px-2" />
        </UCard>
      </div>

      <!-- Create Button -->
      <UButton 
        label="+ Create lesson" 
        variant="ghost" 
        color="primary" 
        class="w-full justify-center py-2.5 border border-dashed border-primary/40 hover:bg-primary/10 rounded-xl font-bold shadow-sm" 
      />
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
// Component intentionally left bare as per mockup nature
</script>