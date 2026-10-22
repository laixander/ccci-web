<script setup lang="ts">
import type { MockupFloatingTag } from '~/components/mockup/BrowserFrame.vue'

defineProps<{
  floatingTags?: MockupFloatingTag[]
}>()

const tagColorMap = {
  success: { bg: 'bg-success/15', text: 'text-success', dot: 'bg-success' },
  primary: { bg: 'bg-primary/15', text: 'text-primary', dot: 'bg-primary' },
  warning: { bg: 'bg-warning/15', text: 'text-warning', dot: 'bg-warning' },
  info:    { bg: 'bg-info/15',    text: 'text-info',    dot: 'bg-info'    },
  error:   { bg: 'bg-error/15',   text: 'text-error',   dot: 'bg-error'   },
  neutral: { bg: 'bg-neutral/15', text: 'text-neutral', dot: 'bg-neutral' },
} as const

const defaultPositions = [
  'hidden sm:flex -top-3.5 -right-3 sm:-right-4',
  'hidden sm:flex -bottom-3.5 -left-3 sm:-left-4',
  'hidden md:flex top-1/2 -right-4 sm:-right-6 -translate-y-1/2',
]

const defaultAnimations = [
  'animate-float-1',
  'animate-float-2',
  'animate-float-3',
]
</script>

<template>
  <div class="relative flex justify-center">
    <!-- Floating Tags -->
    <template v-if="floatingTags?.length">
      <UCard
        v-for="(tag, index) in floatingTags"
        :key="tag.id || index"
        variant="outline"
        :ui="{ body: 'sm:p-4 flex items-center gap-2.5' }"
        class="absolute z-20 rounded-xl bg-white/20 dark:bg-elevated/20 backdrop-blur-md shadow-xl pointer-events-none"
        :class="[
          tag.positionClass || defaultPositions[index % defaultPositions.length],
          tag.animationClass || defaultAnimations[index % defaultAnimations.length],
        ]"
      >
        <div
          class="size-8 rounded-lg flex items-center justify-center shrink-0"
          :class="tagColorMap[tag.color]?.bg || 'bg-primary/15'"
        >
          <UIcon
            :name="tag.icon"
            class="size-4"
            :class="tagColorMap[tag.color]?.text || 'text-primary'"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-[12.5px] font-semibold text-highlighted leading-tight">{{ tag.title }}</span>
          <span class="text-[10px] text-muted font-mono leading-tight">{{ tag.subtitle }}</span>
        </div>
        <span
          v-if="tag.pulse"
          class="size-1.5 rounded-full animate-pulse shrink-0"
          :class="tagColorMap[tag.color]?.dot || 'bg-success'"
        />
        <UBadge
          v-else-if="tag.badge"
          :label="tag.badge.label"
          :color="tag.badge.color || tag.color"
          variant="subtle"
          size="xs"
          class="font-bold text-[8.5px] uppercase tracking-wider px-1.5 py-0.5"
        />
      </UCard>
    </template>

    <!-- Phone Frame -->
    <div class="border-6 border-default rounded-4xl w-[290px] overflow-hidden bg-default flex flex-col relative shadow-2xl shrink-0 p-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes float-smooth {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
.animate-float-1 { animation: float-smooth 4.2s ease-in-out infinite; }
.animate-float-2 { animation: float-smooth 5s ease-in-out infinite -1.8s; }
.animate-float-3 { animation: float-smooth 3.8s ease-in-out infinite -0.9s; }

@media (prefers-reduced-motion: reduce) {
  .animate-float-1,
  .animate-float-2,
  .animate-float-3 { animation: none; }
}
</style>