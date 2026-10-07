<template>
  <MockupBrowserFrame url="app.learncore.edu/registrar/stu-10422">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Student Record · STU-10422</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest font-mono uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Student Banner -->
        <UCard variant="soft" :ui="{ body: 'sm:p-5 text-white flex flex-col gap-1' }" class="bg-gradient-to-r from-primary-500 to-primary-900 rounded-xl">
          <span class="text-[20px] font-bold leading-none">Liam Cruz</span>
          <span class="text-[11px] text-white/80 font-mono">BS Computer Science · 3rd Year · GWA 1.75</span>
        </UCard>

        <!-- Documents List -->
        <div class="flex flex-col gap-3">
          <UCard
            v-for="doc in documents"
            :key="doc.title"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex items-center justify-between' }"
            class="rounded-xl shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-file-text" class="size-5 text-primary" />
              </div>
              <span class="font-bold text-[14px] text-highlighted">{{ doc.title }}</span>
            </div>
            <UBadge :label="doc.status" :color="doc.color" variant="soft" size="sm" class="font-semibold px-3 py-1" />
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const documents = [
  { title: 'Transcript of Records',       status: 'Ready',     color: 'success' as const },
  { title: 'Certificate of Registration', status: 'Ready',     color: 'success' as const },
  { title: 'Form 9 — Grade Card',         status: 'Ready',     color: 'success' as const },
  { title: 'Certification',               status: 'Requested', color: 'warning' as const },
]
</script>
