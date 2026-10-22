<template>
  <MockupBrowserFrame url="app.peoplecore.io/employees" title="Employees" :floating-tags="floatingTags">
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
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'total-headcount',
    title: 'Total Employees',
    subtitle: '122 Active Staff',
    icon: 'i-lucide-users-round',
    color: 'primary',
    badge: { label: '122', color: 'primary' }
  },
  {
    id: 'departments',
    title: 'All Departments',
    subtitle: 'Engineering · HR · Finance',
    icon: 'i-lucide-building-2',
    color: 'info',
    pulse: true
  },
  {
    id: 'roles',
    title: 'Multi-Role View',
    subtitle: 'Instructor · HR · IT · Finance',
    icon: 'i-lucide-id-card',
    color: 'success',
    badge: { label: 'ACTIVE', color: 'success' }
  }
]

const employees = [
  { name: 'E. Nathan',    role: 'Instructor VII',  avatarClass: 'bg-gradient-to-b from-primary-200 to-primary-500' },
  { name: 'M. Santos',    role: 'HR Specialist',   avatarClass: 'bg-gradient-to-b from-primary-300 to-primary-600' },
  { name: 'C. Reyes',     role: 'Payroll Officer', avatarClass: 'bg-gradient-to-b from-primary-400 to-primary-700' },
  { name: 'A. Dela Cruz', role: 'Admin Assistant', avatarClass: 'bg-gradient-to-b from-primary-500 to-primary-800' },
  { name: 'R. Cruz',      role: 'IT Support',      avatarClass: 'bg-gradient-to-b from-primary-600 to-primary-900' },
  { name: 'P. Lim',       role: 'Finance Analyst', avatarClass: 'bg-gradient-to-b from-primary-700 to-primary-950' },
]
</script>
