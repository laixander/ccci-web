<template>
  <MockupBrowserFrame url="library.ccci.io/analytics">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Library Analytics</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- KPI Row -->
        <div class="grid grid-cols-3 gap-3">
          <UCard
            v-for="kpi in kpis"
            :key="kpi.label"
            variant="outline"
            :ui="{ body: 'sm:p-3 flex flex-col items-center gap-1' }"
            class="rounded-xl shadow-sm"
          >
            <p class="text-[20px] font-black leading-none" :class="kpi.color">{{ kpi.value }}</p>
            <p class="text-[9px] text-muted uppercase tracking-widest text-center">{{ kpi.label }}</p>
          </UCard>
        </div>

        <!-- Charts row -->
        <div class="grid grid-cols-2 gap-3 flex-1">
          <!-- Borrows / month bar chart -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3' }" class="rounded-xl">
            <p class="text-[11px] font-bold text-highlighted">Borrows / month</p>
            <div class="flex items-end gap-1.5 h-16">
              <div
                v-for="bar in monthBars"
                :key="bar.label"
                class="flex-1 rounded-t-sm bg-primary"
                :style="{ height: bar.pct + '%' }"
              />
            </div>
          </UCard>

          <!-- Top subjects -->
          <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3' }" class="rounded-xl">
            <p class="text-[11px] font-bold text-highlighted">Top subjects</p>
            <div class="flex flex-col gap-2.5 flex-1 justify-center">
              <div v-for="subject in subjects" :key="subject.label" class="flex items-center gap-2">
                <span class="text-[10px] text-muted w-14 shrink-0">{{ subject.label }}</span>
                <UProgress :model-value="subject.value" :color="subject.color" class="flex-1" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const kpis = [
  { label: 'Borrowed', value: '1.2k', color: 'text-primary'  },
  { label: 'Overdue',  value: '86',   color: 'text-error'    },
  { label: 'On time',  value: '94%',  color: 'text-success'  },
]

const monthBars = [
  { label: 'Jun', pct: 45 },
  { label: 'Jul', pct: 60 },
  { label: 'Aug', pct: 52 },
  { label: 'Sep', pct: 70 },
  { label: 'Oct', pct: 65 },
  { label: 'Nov', pct: 58 },
  { label: 'Dec', pct: 80 },
]

const subjects = [
  { label: 'Fiction',  value: 82, color: 'primary' as const },
  { label: 'Science',  value: 60, color: 'info'    as const },
  { label: 'History',  value: 40, color: 'success' as const },
]
</script>
