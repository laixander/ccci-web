<script setup lang="ts">
// ─── Types ────────────────────────────────────────────────────────────────────
export interface ProductTimelineStep {
    value?: string | number
    step?: string
    phase?: string
    title: string
    description: string
    icon?: string
    deliverable?: string
    [key: string]: unknown
}

// ─── Props & Model ────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
    /** Steps to display in the timeline */
    items: ProductTimelineStep[]
    /** Size of the timeline */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Theme color */
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}>(), {
    size: 'xl',
    color: 'primary',
})

const activeStep = defineModel<number>({ default: -1 })

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getItemIndex(item: ProductTimelineStep): number {
    return props.items.indexOf(item)
}

function isActive(item: ProductTimelineStep): boolean {
    return activeStep.value >= 0 && activeStep.value === getItemIndex(item)
}

function isPassedOrActive(item: ProductTimelineStep): boolean {
    return activeStep.value >= 0 && getItemIndex(item) <= activeStep.value
}

// ─── Scroll Observation ───────────────────────────────────────────────────────
// We use a scroll listener + getBoundingClientRect() instead of
// IntersectionObserver because:
//  1. IntersectionObserver uses the element's *layout* box (pre-transform),
//     so the translate-y on UCard causes it to fire at wrong scroll positions.
//  2. getBoundingClientRect() returns the true *visual* position after transforms.
// We observe invisible sentinel <span> elements (no transforms) placed at the
// top of each step row, and always resolve to exactly ONE active step.
const timelineRoot = ref<HTMLElement | null>(null)
const sentinelEls = ref<HTMLElement[]>([])

function updateActiveStep() {
    const els = sentinelEls.value
    if (!els.length) return

    const viewMid = window.innerHeight / 2
    let bestIdx = -1
    let bestDist = Infinity

    els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elMid = (rect.top + rect.bottom) / 2
        const dist = Math.abs(elMid - viewMid)
        if (dist < bestDist) {
            bestDist = dist
            bestIdx = Number(el.dataset.stepIndex)
        }
    })

    // Only activate if the closest sentinel is within 48% of the viewport height
    activeStep.value = bestDist < window.innerHeight * 0.48 ? bestIdx : -1
}

onMounted(() => {
    window.addEventListener('scroll', updateActiveStep, { passive: true })
    updateActiveStep()
    onUnmounted(() => window.removeEventListener('scroll', updateActiveStep))
})
</script>

<template>
    <div ref="timelineRoot" class="w-full">
        <!-- Alternating vertical timeline, scroll-driven highlight -->
        <UTimeline
            :model-value="activeStep"
            :items="items"
            :size="size"
            :color="color"
            :ui="{
                item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2.5rem)] rtl:even:translate-x-[calc(100%-2.5rem)] even:text-end',
                indicator: 'bg-elevated text-muted ring-1 ring-default group-data-[state=completed]:bg-primary group-data-[state=completed]:text-white group-data-[state=completed]:ring-2 group-data-[state=completed]:ring-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-white group-data-[state=active]:ring-2 group-data-[state=active]:ring-primary transition-all duration-500',
                separator: 'bg-elevated bg-none min-h-32 transition-all duration-500 group-data-[state=completed]:bg-primary',
                wrapper: 'mt-0 pb-20',
            }"
            class="translate-x-[calc(50%-1.25rem)] rtl:-translate-x-[calc(50%-1.25rem)] max-w-2xl mx-auto pt-12"
            @update:model-value="val => activeStep = typeof val === 'number' ? val : Number(val)"
        >
            <!-- Custom numbered indicator -->
            <template #indicator="{ item }">
                <div
                    class="flex items-center justify-center size-full font-mono font-bold text-sm transition-all duration-500"
                    :class="isPassedOrActive(item)
                        ? 'text-white'
                        : 'text-muted'"
                >
                    {{ getItemIndex(item) + 1 }}
                </div>
            </template>

            <!-- Card with title + description -->
            <template #wrapper="{ item }">
                <!-- Sentinel: plain element with no transforms, measured by the scroll listener -->
                <span
                    :ref="(el) => { if (el) sentinelEls[getItemIndex(item)] = el as HTMLElement }"
                    :data-step-index="getItemIndex(item)"
                    class="sr-only pointer-events-none"
                    aria-hidden="true"
                />
                <slot name="card" :item="item" :index="getItemIndex(item)" :active="isActive(item)" :passed="isPassedOrActive(item)">
                    <UCard
                        class="text-start translate-y-[calc(1.25rem-50%)] transition-all duration-500"
                        :class="isPassedOrActive(item)
                            ? (isActive(item)
                                ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                                : 'ring-2 ring-primary shadow-md shadow-primary/10')
                            : 'ring-1 ring-default'"
                        :ui="{ body: 'p-4 sm:p-5' }"
                    >
                        <div class="flex items-start gap-3">
                            <div
                                v-if="item.icon"
                                class="shrink-0 flex items-center justify-center size-9 rounded-lg bg-primary/10 mt-0.5"
                            >
                                <UIcon :name="item.icon as string" class="size-4 text-primary" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 flex-wrap mb-1">
                                    <p class="font-semibold text-highlighted text-sm leading-snug">{{ item.title }}</p>
                                    <UBadge
                                        v-if="item.phase"
                                        :label="String(item.phase)"
                                        color="primary"
                                        variant="subtle"
                                        size="sm"
                                    />
                                </div>
                                <p class="text-sm text-muted leading-relaxed">{{ item.description }}</p>
                                <p
                                    v-if="item.deliverable"
                                    class="text-xs text-dimmed mt-2 flex items-center gap-1"
                                >
                                    <UIcon name="i-lucide-package" class="size-3.5 shrink-0" />
                                    {{ item.deliverable }}
                                </p>
                            </div>
                        </div>
                    </UCard>
                </slot>
            </template>
        </UTimeline>
    </div>
</template>
