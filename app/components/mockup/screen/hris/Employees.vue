<template>
  <MockupBrowserFrame url="app.peoplecore.io/employees">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Employees</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-6">
        <!-- Header row -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[40px] font-black text-highlighted leading-none tracking-tight">122</span>
            <span class="text-[11px] text-muted tracking-wide mt-2">Total employee count</span>
          </div>
          <USelect :items="['All departments', 'Engineering', 'Marketing', 'Sales']" model-value="All departments" size="lg" color="neutral" variant="soft" />
        </div>

        <!-- Grid of Employees -->
        <div class="grid grid-cols-3 gap-4">
          <UCard v-for="emp in employees" :key="emp.name + emp.avatarClass" variant="subtle" :ui="{ body: 'sm:p-4 flex flex-col items-center justify-center gap-3' }" class="rounded-xl shadow-sm">
            <div class="size-12 rounded-full" :class="emp.avatarClass" />
            <div class="flex flex-col items-center">
              <span class="font-bold text-[13px] text-highlighted">{{ emp.name }}</span>
              <span class="text-[10px] text-muted mt-0.5">{{ emp.role }}</span>
            </div>
          </UCard>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
const employees = [
  { name: 'E. Nathan',    role: 'Instructor VII',  avatarClass: 'bg-gradient-to-b from-primary-200 to-primary-500' },
  { name: 'M. Santos',    role: 'HR Specialist',   avatarClass: 'bg-gradient-to-b from-primary-300 to-primary-600' },
  { name: 'C. Reyes',     role: 'Payroll Officer', avatarClass: 'bg-gradient-to-b from-primary-400 to-primary-700' },
  { name: 'A. Dela Cruz', role: 'Admin Assistant', avatarClass: 'bg-gradient-to-b from-primary-500 to-primary-800' },
  { name: 'R. Cruz',      role: 'IT Support',      avatarClass: 'bg-gradient-to-b from-primary-600 to-primary-900' },
  { name: 'P. Lim',       role: 'Finance Analyst', avatarClass: 'bg-gradient-to-b from-primary-700 to-primary-950' },
]
</script>
