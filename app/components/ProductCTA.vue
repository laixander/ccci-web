<script setup lang="ts">
// ─── Types ────────────────────────────────────────────────────────────────────
export interface CtaLink {
    label: string
    [key: string]: unknown
}

// ─── Props ────────────────────────────────────────────────────────────────────
defineProps<{
    /** Main heading of the CTA section */
    title: string
    /** Supporting text below the title */
    description: string
    /** Array of UButton-compatible objects */
    links?: CtaLink[]
}>()
</script>

<template>
    <div class="relative bg-primary dark:bg-primary/50 py-10 overflow-hidden">
        <!-- Grid texture overlay -->
        <div class="cta-grid-texture" />

        <UPageCTA
            :title="title"
            :description="description"
            variant="naked"
            :ui="{
                title: 'text-white',
                description: 'text-white/80 dark:text-white/60',
            }"
        >
            <!-- Render buttons here so we can bake in the shared size + ui config -->
            <template v-if="links?.length" #links>
                <UButton
                    v-for="(link, index) in links"
                    :key="index"
                    v-bind="link"
                    size="xl"
                    :ui="{
                        base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold',
                        leadingIcon: 'sm:size-5',
                        trailingIcon: 'sm:size-5',
                        ...((link.ui as Record<string, string>) ?? {}),
                    }"
                />
            </template>
        </UPageCTA>
    </div>
</template>

<style scoped>
.cta-grid-texture {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    -webkit-mask-image: radial-gradient(ellipse 160% 110% at 50% -5%, black 50%, transparent 75%);
    mask-image: radial-gradient(ellipse 160% 110% at 50% -5%, black 50%, transparent 75%);
}
</style>
