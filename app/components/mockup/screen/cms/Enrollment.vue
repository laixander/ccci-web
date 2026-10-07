<template>
  <MockupBrowserFrame url="app.learncore.edu/enrollment">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Course Enrollment</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest font-mono uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Enrollment Banner -->
        <UCard variant="soft" :ui="{ body: 'sm:p-5 text-white flex items-center justify-between' }" class="bg-gradient-to-r from-primary-500 to-primary-900 rounded-xl">
          <div class="flex flex-col gap-1">
             <span class="text-[20px] font-bold leading-none">Term 1 · AY 2026</span>
             <span class="text-[11px] text-white/80 font-mono">Regular Enrollment Period</span>
          </div>
          <UBadge label="Open" color="success" variant="solid" size="md" class="px-3 bg-success-500 text-white" />
        </UCard>

        <!-- Subjects List -->
        <div class="flex flex-col gap-3">
          <UCard
            v-for="sub in subjects"
            :key="sub.code"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex items-center justify-between' }"
            class="rounded-xl shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span class="font-bold text-[11px] text-primary">{{ sub.units }}u</span>
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-[14px] text-highlighted">{{ sub.code }}</span>
                <span class="text-[11px] text-muted font-mono mt-0.5">{{ sub.title }}</span>
              </div>
            </div>
            <UBadge :label="sub.status" :color="sub.color" variant="soft" size="sm" class="font-semibold px-3 py-1 text-center shrink-0" />
          </UCard>
        </div>
        
        <!-- Action Footer -->
        <div class="mt-2 flex gap-3 h-14">
           <div class="w-1/3 bg-elevated rounded-xl border border-default flex flex-col justify-center items-center shadow-sm">
              <span class="text-[9px] text-muted uppercase tracking-widest font-bold">Total Units</span>
              <span class="text-[18px] font-black text-primary leading-none mt-1">18.0</span>
           </div>
           <UButton label="Assess Fees" color="primary" block class="flex-1 rounded-xl font-bold text-[14px] shadow-sm bg-gradient-to-r from-primary-500 to-primary-600" />
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const subjects = [
  { code: 'CS-301',  title: 'Software Engineering', units: 3, status: 'Enlisted',       color: 'success' as const },
  { code: 'CS-302',  title: 'Database Systems',     units: 3, status: 'Enlisted',       color: 'success' as const },
  { code: 'MTH-202', title: 'Advanced Calculus',    units: 3, status: 'Prereq Missing', color: 'error'   as const },
]
</script>
