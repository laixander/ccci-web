<template>
  <MockupBrowserFrame url="app.peoplecore.io/recruitment">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Positions</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

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
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
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
