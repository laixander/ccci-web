<template>
  <MockupBrowserFrame url="app.aissp.ccci.com.ph/system-ordering" title="System Ordering" icon="i-lucide-arrow-up-down">
    <div class="p-5 flex-1 flex flex-col gap-4">
      <!-- Section heading row -->
      <div class="flex items-center justify-between">
        <span class="font-semibold text-sm text-highlighted">Systems (drag to reorder)</span>
        <UButton
          label="Sort : Priority"
          trailing-icon="i-lucide-chevron-down"
          size="sm"
          color="neutral"
          variant="outline"
          class="rounded-lg"
        />
      </div>

      <!-- Draggable Systems List -->
      <div v-if="systems?.length" class="flex flex-col gap-2.5">
        <div
          v-for="system in systems"
          :key="system.id"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-default bg-elevated/60 hover:bg-elevated transition-colors group cursor-grab shadow-xs"
        >
          <!-- Left: Grip, Order Number, System Title -->
          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-3.5 text-muted group-hover:text-highlighted transition-colors"
            />
            <span class="flex items-center justify-center size-5 rounded-md bg-primary/10 text-primary font-bold text-[11px]">
              {{ system.order }}
            </span>
            <span class="font-semibold text-[12px] text-highlighted">{{ system.name }}</span>
          </div>

          <!-- Right: Cost & handle indicator -->
          <div class="flex items-center gap-2">
            <span v-if="system.cost" class="text-[11px] font-medium text-muted">
              {{ system.cost }}
            </span>
            <UIcon name="i-lucide-move" class="size-3 text-muted/50" />
          </div>
        </div>
      </div>

      <!-- Bottom Actions Row -->
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-2">
          <UButton
            label="Reorder by Cost"
            color="primary"
            size="sm"
          />
          <UButton
            label="Check DICT"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </div>
        <span class="text-[10px] text-muted font-mono">4 systems</span>
      </div>
    </div>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
interface SystemItem {
  id: string
  order: number
  name: string
  cost: string
}

const systems: SystemItem[] = [
  { id: 'sis', order: 1, name: 'Student Information System', cost: '₱2.4M' },
  { id: 'elib', order: 2, name: 'Digital Library', cost: '₱1.2M' },
  { id: 'hr', order: 3, name: 'HR & Payroll', cost: '₱1.8M' },
  { id: 'ams', order: 4, name: 'Asset Management', cost: '₱1.5M' },
]
</script>