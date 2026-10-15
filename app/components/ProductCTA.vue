<script setup lang="ts">
// ─── Types ────────────────────────────────────────────────────────────────────
export interface CtaLink {
    label: string
    [key: string]: unknown
}

// ─── Props ────────────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
    /** Main heading of the CTA section */
    title: string
    /** Supporting text below the title */
    description: string
    /** Array of UButton-compatible objects */
    links?: CtaLink[]
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
    <UContainer ref="sectionEl" class="section-reveal" :class="{ 'is-visible': isVisible }">
        <UPageCTA
            :title="title"
            :description="description"
            variant="soft"
            class="shadow-xl reveal-up"
            :ui="{
                root: 'relative bg-linear-to-b from-primary to-primary-800 overflow-hidden',
                title: 'text-white reveal-up reveal-delay-200',
                description: 'text-white/80 dark:text-white/60 reveal-up reveal-delay-300',
            }"
        >
            <template #top>
                <div class="cta-grid-texture" />
            </template>
            <!-- Render buttons here so we can bake in the shared size + ui config -->
            <template v-if="links?.length" #links>
                <UButton
                    v-for="(link, index) in links"
                    :key="index"
                    v-bind="link"
                    size="xl"
                    class="reveal-up"
                    :style="{ animationDelay: `${450 + index * 100}ms` }"
                    :ui="{
                        base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold',
                        leadingIcon: 'sm:size-5',
                        trailingIcon: 'sm:size-5',
                        ...((link.ui as Record<string, string>) ?? {}),
                    }"
                />
            </template>
        </UPageCTA>
    </UContainer>
</template>
<style scoped>
.cta-grid-texture {
    position: absolute;
    inset: 0;
    z-index: -10;
    pointer-events: none;
    background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    -webkit-mask-image: radial-gradient(ellipse 160% 110% at 50% -5%, black 50%, transparent 75%);
    mask-image: radial-gradient(ellipse 160% 110% at 50% -5%, black 50%, transparent 75%);
}
</style>