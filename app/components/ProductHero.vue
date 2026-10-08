<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

// ─── Types ────────────────────────────────────────────────────────────────────
/**
 * Anything that can be spread onto a UButton via v-bind.
 * Typed loosely on purpose — UButton validates its own props at runtime.
 */
export interface HeroLink {
    label: string
    [key: string]: unknown
}

export interface HeroModule {
    title: string
    icon: string
    to: string
}

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps<{
    /** Text shown inside the pulsing badge above the title */
    badge: string
    /** Plain-text description — use the #description slot for rich HTML */
    description?: string
    /** Absolute or root-relative path to the hero background image */
    backgroundImage: string
    /** Array of UButton-compatible objects rendered in the footer */
    links?: HeroLink[]
    /** Short trust/feature bullet points shown below the CTA buttons */
    checklist?: string[]
    /** Items scrolled across the ticker strip at the bottom of the hero */
    modules?: HeroModule[]
}>()

// ─── Composables ──────────────────────────────────────────────────────────────
const { y } = useWindowScroll()
</script>

<template>
    <UPageHero orientation="horizontal" :description="description" :ui="{
        root: 'relative overflow-hidden min-h-[calc(100vh-var(--ui-header-height))] pb-14 flex flex-col justify-center',
        container: 'max-w-full',
        description: 'dark:text-toned',
    }">
        <!-- ── Badge headline ──────────────────────────────────────────────── -->
        <template #headline>
            <UBadge variant="subtle" :ui="{ base: 'pr-2.5 gap-2' }" class="rounded-full mb-4">
                <span class="relative flex size-2">
                    <span
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                    <span class="relative inline-flex size-2 rounded-full bg-primary-500" />
                </span>
                {{ badge }}
            </UBadge>
        </template>

        <!-- ── Title (pass-through slot) ──────────────────────────────────── -->
        <template v-if="$slots.title" #title>
            <slot name="title" />
        </template>

        <!-- ── Description (pass-through slot for rich HTML) ─────────────── -->
        <template v-if="$slots.description" #description>
            <slot name="description" />
        </template>

        <!-- ── Background layers ──────────────────────────────────────────── -->
        <template #top>
            <!-- Parallax background image -->
            <div
                class="absolute -inset-y-[10%] inset-x-0 -z-20 bg-cover bg-center bg-no-repeat will-change-transform"
                :style="{
                    backgroundImage: `url('${backgroundImage}')`,
                    transform: `translateY(${y * 0.4}px)`,
                }" />

            <!-- Light/dark fade overlay -->
            <div class="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 to-transparent to-90% dark:from-black/90" />

            <!-- Primary-tinted grid texture (left two-thirds) -->
            <div class="absolute inset-y-0 left-0 w-2/3 -z-10 pointer-events-none"
                style="-webkit-mask-image: linear-gradient(to right, black, transparent); mask-image: linear-gradient(to right, black, transparent);">
                <svg class="absolute inset-0 h-full w-full text-primary-500/20 dark:text-primary-400/20"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="product-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#product-hero-grid)" />
                </svg>
            </div>

            <!-- Primary colour wash (left 45 %) -->
            <div class="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-transparent to-45%" />
        </template>

        <!-- ── CTA footer ─────────────────────────────────────────────────── -->
        <template v-if="links?.length || checklist?.length" #footer>
            <div v-if="links?.length" class="flex flex-wrap gap-x-6 gap-y-3">
                <UButton v-for="(link, index) in links" :key="index" v-bind="link"
                    size="xl" :ui="{ base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold', trailingIcon: 'sm:size-5', leadingIcon: 'sm:size-5' }"
                />
            </div>

            <ul v-if="checklist?.length" class="mt-6 sm:mt-12 flex flex-wrap gap-x-6 gap-y-2">
                <li v-for="item in checklist" :key="item" class="flex items-center gap-2 text-sm text-toned">
                    <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0" />
                    {{ item }}
                </li>
            </ul>
        </template>

        <!-- ── Scrolling module ticker ────────────────────────────────────── -->
        <div v-if="modules?.length"
            class="absolute bottom-0 inset-x-0 border-t border-default bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md overflow-hidden flex py-4 z-10">
            <div class="flex whitespace-nowrap animate-product-ticker w-max hover:animation-paused">
                <div v-for="i in 4" :key="`ticker-group-${i}`" class="flex items-center gap-16 pr-16 shrink-0">
                    <NuxtLink v-for="mod in modules" :key="mod.title" :to="mod.to"
                        class="flex items-center gap-2 text-sm font-bold text-toned uppercase tracking-wider hover:text-primary transition-colors">
                        <UIcon :name="mod.icon" class="size-5 text-primary" />
                        {{ mod.title }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </UPageHero>
</template>

<style scoped>
@keyframes product-ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-25%); }
}

.animate-product-ticker {
    animation: product-ticker 40s linear infinite;
}

.hover\:animation-paused:hover {
    animation-play-state: paused;
}

/* CTA primary button glow — applied via class prop on the link object */
.hero-cta-shadow {
    box-shadow:
        0 8px 20px -6px color-mix(in srgb, var(--ui-primary) 85%, transparent),
        0 20px 48px -10px color-mix(in srgb, var(--ui-primary) 45%, transparent);
}
</style>
