<template>
  <MockupBrowserFrame url="app.peoplecore.io/recruitment" title="Positions" :floating-tags="floatingTags">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Stats Banner -->
      <UCard variant="soft" :ui="{ body: 'sm:p-4 text-white flex items-center justify-around' }" class="bg-gradient-to-r from-primary-600 to-primary-900 rounded-xl">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="text-[26px] font-black leading-none mb-1">{{ stat.value }}</p>
          <p class="text-[10px] text-white/70 tracking-wide">{{ stat.label }}</p>
        </div>
      </UCard>

      <!-- Positions Grid -->
      <div class="grid grid-cols-2 gap-4">
        <UCard
          v-for="pos in positions"
          :key="pos.title + pos.type"
          variant="outline"
          :ui="{ body: 'sm:p-4 flex flex-col gap-2' }"
          class="rounded-xl shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-[13px] text-highlighted">{{ pos.title }}</span>
            <USwitch :model-value="pos.active" size="md" />
          </div>
          <span class="text-[11px] text-muted">Slots {{ pos.slots }} · Vacant {{ pos.vacant }}</span>
          <div>
            <UBadge :label="pos.type" :color="pos.color" variant="subtle" size="xs" class="px-2" />
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
    id: 'vacancies',
    title: 'Open Vacancies',
    subtitle: '33 Slots · Hiring Active',
    icon: 'i-lucide-user-plus',
    color: 'warning',
    badge: { label: '33 OPEN', color: 'warning' }
  },
  {
    id: 'filled',
    title: 'Filled Positions',
    subtitle: '202 of 235 Total',
    icon: 'i-lucide-user-check',
    color: 'success',
    pulse: true
  },
  {
    id: 'regular-positions',
    title: 'Regular Positions',
    subtitle: '51 Permanent Staff',
    icon: 'i-lucide-badge-check',
    color: 'primary',
    badge: { label: '51 REG', color: 'primary' }
  }
]

const stats = [
  { label: 'Total',   value: '95'  },
  { label: 'Filled',  value: '202' },
  { label: 'Vacant',  value: '33'  },
  { label: 'Regular', value: '51'  },
]

const positions = [
  { title: 'CCCI Part Time I',    slots: 25, vacant: 11, type: 'Part-time', color: 'warning' as const, active: true  },
  { title: 'Faculty Javier',      slots: 40, vacant: 8,  type: 'Full-time', color: 'primary' as const, active: false },
  { title: 'Admin Assistant III', slots: 10, vacant: 4,  type: 'Contract',  color: 'info'    as const, active: true  },
  { title: 'Lab Technician I',    slots: 15, vacant: 6,  type: 'Part-time', color: 'warning' as const, active: false },
]
</script>
