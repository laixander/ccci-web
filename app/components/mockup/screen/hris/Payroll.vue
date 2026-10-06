<template>
  <MockupBrowserFrame url="app.peoplecore.io/payroll">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Payroll</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Section heading -->
        <div class="flex items-center justify-between">
          <span class="font-bold text-[14px] text-highlighted">Payroll list</span>
          <div class="flex items-center gap-2">
            <UButton label="Generate" icon="i-lucide-plus" color="primary" size="lg" />
            <USelect :items="['All', 'Generated', 'For Review', 'Denied']" model-value="All" size="lg" color="neutral" variant="soft" />
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Payroll cards -->
          <UCard v-for="item in payrolls" :key="item.label + item.status" variant="outline" :ui="{ body: 'sm:p-4 flex flex-col gap-2' }" class="rounded-xl">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[13px] text-highlighted">{{ item.label }}</span>
              <UBadge :label="item.status" :color="item.color" variant="subtle" size="xs" class="uppercase tracking-widest font-bold px-2" />
            </div>
            <span class="text-[11px] text-muted">{{ item.period }}</span>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const payrolls = [
  { label: 'General Payroll', status: 'Generated',  period: 'Oct 01 – Oct 30, 2024', color: 'success' as const },
  { label: 'General Payroll', status: 'For Review', period: 'Oct 01 – Oct 30, 2024', color: 'info'    as const },
  { label: 'General Payroll', status: 'Denied',     period: 'Oct 01 – Oct 30, 2024', color: 'error'   as const },
  { label: 'General Payroll', status: 'Approved',   period: 'Sep 01 – Sep 30, 2024', color: 'success' as const },
]
</script>
