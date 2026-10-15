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
    color: 'primary'
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

// ─── Entrance Reveal ──────────────────────────────────────────────────────────
// Tracks which step indices have already entered the viewport for the first time.
const cardEls = ref<HTMLElement[]>([])
const revealedSteps = ref<Set<number>>(new Set())
let revealObserver: IntersectionObserver | null = null

function isRevealed(item: ProductTimelineStep): boolean {
    const idx = getItemIndex(item)
    return revealedSteps.value.has(idx) || isPassedOrActive(item)
}

function registerCardEl(el: HTMLElement, index: number) {
    cardEls.value[index] = el
    revealObserver?.observe(el)
}

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

    // Set up entrance-reveal observer on real card wrapper elements
    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = Number((entry.target as HTMLElement).dataset.stepIndex)
                    if (!isNaN(idx)) {
                        revealedSteps.value = new Set([...revealedSteps.value, idx])
                        revealObserver?.unobserve(entry.target)
                    }
                }
            })
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    )

    // Observe all cards registered during mount
    cardEls.value.forEach((el) => {
        if (el) revealObserver?.observe(el)
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveStep)
    revealObserver?.disconnect()
})
</script>

<template>
    <div ref="timelineRoot" class="w-full">
        <!-- Alternating vertical timeline, scroll-driven highlight -->
        <UTimeline :model-value="activeStep" :items="items" :size="size" :color="color" :ui="{
            item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2.5rem)] rtl:even:translate-x-[calc(100%-2.5rem)] even:text-end',
            indicator: 'bg-elevated text-muted ring-1 ring-default group-data-[state=completed]:bg-primary group-data-[state=completed]:text-white group-data-[state=completed]:ring-2 group-data-[state=completed]:ring-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-white group-data-[state=active]:ring-2 group-data-[state=active]:ring-primary transition-all duration-500',
            separator: 'bg-elevated bg-none min-h-32 transition-all duration-500 group-data-[state=completed]:bg-primary',
            wrapper: 'mt-0 pb-20'
        }" class="translate-x-[calc(50%-1.25rem)] rtl:-translate-x-[calc(50%-1.25rem)] max-w-2xl mx-auto pt-12"
            @update:model-value="val => activeStep = typeof val === 'number' ? val : Number(val)">
            <!-- Custom numbered indicator -->
            <template #indicator="{ item }">
                <div class="flex items-center justify-center size-full font-mono font-bold text-sm transition-all duration-500"
                    :class="[
                        isPassedOrActive(item)
                            ? 'text-white'
                            : 'text-muted',
                        isRevealed(item)
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-75'
                    ]" :style="{ transitionDelay: isRevealed(item) ? `${(getItemIndex(item) % 3) * 100}ms` : '0ms' }">
                    {{ getItemIndex(item) + 1 }}
                </div>
            </template>

            <!-- Card with title + description -->
            <template #wrapper="{ item }">
                <!-- Sentinel: plain element with no transforms, measured by the scroll listener -->
                <span :ref="(el) => { if (el) sentinelEls[getItemIndex(item)] = el as HTMLElement }"
                    :data-step-index="getItemIndex(item)" class="sr-only pointer-events-none" aria-hidden="true" />
                <div :ref="(el) => { if (el) registerCardEl(el as HTMLElement, getItemIndex(item)) }"
                    :data-step-index="getItemIndex(item)" class="w-full">
                    <slot name="card" :item="item" :index="getItemIndex(item)" :active="isActive(item)"
                        :passed="isPassedOrActive(item)" :revealed="isRevealed(item)">
                        <UCard
                            class="text-start translate-y-[calc(1.25rem-50%)] transition-all duration-700 cubic-bezier(0.16,1,0.3,1) relative overflow-hidden"
                            :class="[
                                isPassedOrActive(item)
                                    ? (isActive(item)
                                        ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                                        : 'ring-2 ring-primary/20 shadow-md shadow-primary/10')
                                    : 'ring-1 ring-default',
                                isRevealed(item)
                                    ? 'opacity-100 !translate-y-[calc(1.25rem-50%)]'
                                    : 'opacity-0 !translate-y-[calc(1.25rem-50%+2rem)]'
                            ]" :style="{ transitionDelay: isRevealed(item) ? `${(getItemIndex(item) % 3) * 100}ms` : '0ms' }"
                            :ui="{ body: 'p-4 sm:p-5' }" variant="subtle">
                            <!-- Active gradient: bottom-right primary → top-left transparent -->
                            <Transition name="card-glow">
                                <div v-if="isActive(item)"
                                    class="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
                                    style="background: radial-gradient(ellipse at 100% 100%, color-mix(in oklch, var(--ui-primary) 18%, transparent) 0%, transparent 70%);"
                                    aria-hidden="true" />
                            </Transition>
                            <div class="pointer-events-none absolute inset-0 rounded-[inherit] timeline-card-grid timeline-card-grid-active transition-opacity duration-500"
                                :class="isActive(item) ? 'opacity-30' : 'opacity-0'" aria-hidden="true" />
                            <div class="flex flex-col gap-3 transition-all duration-500 ease-out" :class="isRevealed(item)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-2'"
                                :style="{ transitionDelay: isRevealed(item) ? `${((getItemIndex(item) % 3) * 100) + 120}ms` : '0ms' }">
                                <div v-if="item.icon"
                                    class="shrink-0 flex items-center justify-center size-9 rounded-lg mt-0.5 transition-all duration-500"
                                    :class="isPassedOrActive(item)
                                        ? (isActive(item)
                                            ? 'bg-primary/20'
                                            : 'bg-primary/10')
                                        : 'bg-muted'">
                                    <UIcon :name="(item.icon as string)" class="size-4 text-primary transition-all duration-500" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-2xl text-highlighted leading-snug mb-1 transition-all duration-500"
                                        :class="isActive(item)
                                            ? 'text-primary'
                                            : 'text-highlighted'">
                                        {{ item.title }}
                                    </h4>
                                    <p class="text-sm leading-relaxed transition-all duration-500" :class="isActive(item)
                                        ? 'text-highlighted'
                                        : 'text-muted'">
                                        {{ item.description }}
                                    </p>
                                    <div class="flex items-center gap-2 flex-wrap mt-2">
                                        <UBadge v-if="item.phase" :label="String(item.phase)"
                                            :color="isPassedOrActive(item) ? 'primary' : 'neutral'" variant="subtle"
                                            size="sm" />
                                        <p v-if="item.deliverable" class="text-xs text-dimmed flex items-center gap-1">
                                            <UIcon name="i-lucide-package" class="size-3.5 shrink-0" />
                                            {{ item.deliverable }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </slot>
                </div>
            </template>
        </UTimeline>
    </div>
</template>

<style scoped>
.card-glow-enter-active,
.card-glow-leave-active {
    transition: opacity 0.5s ease;
}

.card-glow-enter-from,
.card-glow-leave-to {
    opacity: 0;
}

.timeline-card-grid {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background-size: 20px 20px;
    background-position: right bottom;
    -webkit-mask-image: radial-gradient(ellipse at 100% 100%, black 15%, transparent 75%);
    mask-image: radial-gradient(ellipse at 100% 100%, black 15%, transparent 75%);
}

.timeline-card-grid-active {
    background-image:
        linear-gradient(to right, color-mix(in oklch, var(--ui-primary, #10b981) 40%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in oklch, var(--ui-primary, #10b981) 40%, transparent) 1px, transparent 1px);
}
</style>
