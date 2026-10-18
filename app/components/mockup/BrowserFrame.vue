<script setup lang="ts">
defineProps<{
  url?: string
  title?: string
  logoLetter?: string
  icon?: string
  // brand?: string
}>()
</script>
<template>
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none flex flex-col">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default flex-shrink-0">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px] truncate">{{ url || 'example.com' }}</span>
      </div>
    </div>

    <!-- App Header -->
    <div v-if="title || $slots.header" class="flex items-center justify-between px-5 py-3 border-b border-default flex-shrink-0">
      <slot name="header">
        <div class="flex items-center gap-3">
          <slot name="logo">
            <div class="size-7 rounded-md bg-primary flex items-center justify-center">
              <UIcon v-if="icon" :name="icon" class="size-3.5 text-white" />
              <span v-else class="text-white font-bold text-[12px]">{{ logoLetter || 'C' }}</span>
            </div>
          </slot>
          <span class="font-bold text-[14px] text-highlighted">{{ title }}</span>
        </div>
        <UButton square icon="i-lucide-ellipsis-vertical" size="sm" color="neutral" variant="ghost" />
        <!-- <slot name="brand">
          <span class="text-[10px] text-muted tracking-widest uppercase font-semibold">{{ brand || 'CCCI' }}</span>
        </slot> -->
      </slot>
    </div>

    <!-- Main content -->
    <slot />
  </div>
</template>
