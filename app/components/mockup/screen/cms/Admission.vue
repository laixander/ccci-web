<template>
  <MockupBrowserFrame url="app.learncore.edu/admissions">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Admissions</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest font-mono uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-5">
        <!-- Tabs -->
        <div class="flex items-center gap-2">
          <UButton label="Pre-Admission" color="neutral" variant="outline" size="md" class="rounded-full px-4" />
          <UButton label="Admission List" color="primary" variant="solid" size="md" class="rounded-full px-5" />
          <UButton label="Exams" color="neutral" variant="outline" size="md" class="rounded-full px-4" />
        </div>

        <!-- Admissions List -->
        <div class="flex flex-col gap-3">
          <UCard
            v-for="student in admissions"
            :key="student.name"
            variant="outline"
            :ui="{ body: 'sm:p-4 flex items-center justify-between' }"
            class="rounded-xl shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="size-12 rounded-full" :class="student.avatarClass" />
              <div class="flex flex-col">
                <span class="font-bold text-[15px] text-highlighted">{{ student.name }}</span>
                <span class="text-[11px] text-muted font-mono mt-0.5">{{ student.course }}</span>
              </div>
            </div>
            <UBadge :label="student.status" :color="student.color" variant="soft" size="sm" class="font-semibold px-3 py-1" />
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const admissions = [
  { name: 'Maria Santos', course: 'BSN',  status: 'Passed',   color: 'success' as const, avatarClass: 'bg-gradient-to-br from-primary-200 to-primary-500' },
  { name: 'Jose Rivera',  course: 'BSCS', status: 'For Exam', color: 'warning' as const, avatarClass: 'bg-gradient-to-br from-primary-400 to-primary-700' },
  { name: 'Ana Lim',      course: 'BSA',  status: 'Pending',  color: 'error'   as const, avatarClass: 'bg-gradient-to-br from-primary-600 to-primary-900' },
]
</script>
