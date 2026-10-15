<script setup lang="ts">
// ─── Types ────────────────────────────────────────────────────────────────────
interface FeatureItem {
    description: string
    icon: string
    [key: string]: unknown
}

// ─── Props ────────────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
    id?: string
    title: string
    /** Shown in primary color below the title */
    description: string
    features: FeatureItem[]
    orientation?: 'horizontal' | 'vertical'
    reverse?: boolean
    /** IntersectionObserver threshold (0–1). Default 0.3 */
    threshold?: number
    /** Delay in ms before reveal fires after threshold is crossed. Default 300 */
    delay?: number
}>(), {
    threshold: 0.3,
    delay: 300,
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: sectionEl, isVisible } = useScrollReveal({
    threshold: props.threshold,
    delay: props.delay,
})
</script>

<template>
    <UPageSection
        :id="id"
        :title="title"
        :description="description"
        :orientation="orientation"
        :reverse="reverse"
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            description: 'text-primary reveal-up reveal-delay-300',
            title: 'reveal-up reveal-delay-150',
        }"
        ref="sectionEl" class="section-reveal" :class="{ 'is-visible': isVisible }">
        <!-- Feature list with staggered reveal -->
        <template #features>
            <UPageFeature v-for="(feature, index) in features" :key="index" v-bind="feature"
                :ui="{ leading: 'p-0' }" class="reveal-up" :style="{ animationDelay: `${400 + index * 100}ms` }" />
        </template>

        <!-- Mockup / visual slot — slides in from the side it lives on -->
        <div :class="reverse ? 'reveal-left reveal-delay-300' : 'reveal-right reveal-delay-300'">
            <slot />
        </div>
    </UPageSection>
</template>