<template>
  <MockupBrowserFrame url="app.peoplecore.io/analytics" title="Analytics" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- KPI Row -->
      <div class="grid grid-cols-4 gap-3">
        <UCard
          v-for="kpi in kpis"
          :key="kpi.label"
          variant="outline"
          :ui="{ body: 'sm:p-3 flex flex-col gap-1' }"
          class="rounded-xl shadow-sm"
        >
          <p class="text-[9px] text-muted uppercase tracking-widest">{{ kpi.label }}</p>
          <p class="text-[20px] font-black text-highlighted leading-none">{{ kpi.value }}</p>
          <p class="text-[9px] font-semibold mt-0.5" :class="kpi.up ? 'text-success' : 'text-error'">
            {{ kpi.trend }}
          </p>
        </UCard>
      </div>

      <!-- Headcount by Department -->
      <UCard variant="soft" :ui="{ body: 'sm:p-4 flex flex-col gap-3' }" class="rounded-xl">
        <p class="text-[11px] font-bold text-highlighted mb-1">Headcount by Department</p>
        <div v-for="dept in departments" :key="dept.name" class="flex items-center gap-3">
          <span class="text-[10px] text-muted w-16 shrink-0">{{ dept.name }}</span>
          <UProgress :model-value="dept.value" color="primary" class="flex-1" />
          <span class="text-[10px] font-semibold text-highlighted w-6 text-right">{{ dept.count }}</span>
        </div>
      </UCard>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

const floatingTags: MockupFloatingTag[] = [
  {
    id: 'headcount',
    title: 'Headcount',
    subtitle: '360 Employees · ▲4.2%',
    icon: 'i-lucide-users',
    color: 'success',
    badge: { label: '▲4.2%', color: 'success' }
  },
  {
    id: 'turnover',
    title: 'Turnover Rate',
    subtitle: '6.1% · ▼1.3% Improved',
    icon: 'i-lucide-arrow-left-right',
    color: 'warning',
    pulse: true
  },
  {
    id: 'open-reqs',
    title: 'Open Requisitions',
    subtitle: '9 Active · Faculty Dept.',
    icon: 'i-lucide-briefcase',
    color: 'info',
    badge: { label: '9 REQS', color: 'info' }
  }
]

const kpis = [
  { label: 'Headcount',  value: '360', trend: '▲ 4.2%',  up: true  },
  { label: 'Turnover',   value: '6.1%', trend: '▼ 1.3%', up: false },
  { label: 'Avg Tenure', value: '3.4y', trend: '▲ 0.2y', up: true  },
  { label: 'Open Reqs',  value: '9',    trend: '▼ 2',    up: true  },
]

const departments = [
  { name: 'Faculty',  value: 85, count: 148 },
  { name: 'Admin',    value: 55, count: 74  },
  { name: 'IT',       value: 35, count: 42  },
  { name: 'Finance',  value: 25, count: 30  },
  { name: 'HR',       value: 15, count: 18  },
]
</script>
