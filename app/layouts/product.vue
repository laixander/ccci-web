<script setup lang="ts">
// Note: ref, computed, watch, onMounted, nextTick are auto-imported by Nuxt
import { useWindowScroll } from '@vueuse/core'

// ─── Route & Product Resolution ───────────────────────────────────────────────
const route = useRoute()

const currentProduct = computed(() => {
    const match = route.path.match(/^\/products\/(cms|lms|hris|dms|ams|ilsp|aissp|eis|fms|hkas|elib|irs)/)
    return match?.[1] || 'hris'
})

// ─── Dashboard Config (Branding) ──────────────────────────────────────────────
const dashboardConfig = computed(() => {
    switch (currentProduct.value) {
        case 'cms':   return useCmsDashboard()
        case 'lms':   return useLmsDashboard()
        case 'dms':   return useDmsDashboard()
        case 'ams':   return useAmsDashboard()
        case 'ilsp':  return useIlspDashboard()
        case 'aissp': return useAisspDashboard()
        case 'eis':   return useEisDashboard()
        case 'fms':   return useFmsDashboard()
        case 'hkas':  return useHkasDashboard()
        case 'elib':  return useElibDashboard()
        case 'irs':   return useIrsDashboard()
        default:      return useHrisDashboard()
    }
})

// ─── Theme & Branding Tokens ──────────────────────────────────────────────────
const themeClass       = computed(() => dashboardConfig.value.themeClass)
const appIcon          = computed(() => dashboardConfig.value.appIcon)
const appNamePrefix    = computed(() => dashboardConfig.value.appNamePrefix)
const appNameHighlight = computed(() => dashboardConfig.value.appNameHighlight)

// Apply theme class to <body> so teleported elements (e.g. mobile drawer) inherit the product color
useHead(computed(() => ({ bodyAttrs: { class: themeClass.value } })))

// ─── Landing Config ───────────────────────────────────────────────────────────
const landingConfig = computed(() => useProductLanding(currentProduct.value))
const description   = computed(() => landingConfig.value.description)
const primaryButton = computed(() => landingConfig.value.primaryButton)
const footerLinks   = computed(() => landingConfig.value.footerLinks)
const social        = computed(() => landingConfig.value.social)

// ─── Navigation & Scroll Spy ──────────────────────────────────────────────────
const activeSectionId = ref<string>('')
const { navItems, trackedSectionIds } = useProductNav(currentProduct, activeSectionId)

const updateActiveSection = () => {
    if (typeof window === 'undefined') return

    // Near the very top — no section active (Hero is in view)
    if (window.scrollY < 120) {
        activeSectionId.value = ''
        return
    }

    // Near the bottom — force the Contact section active
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        activeSectionId.value = 'contact'
        return
    }

    // Walk sections top-to-bottom; last one whose top is above the fold wins
    let current = ''
    for (const id of trackedSectionIds.value) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 240) current = id
    }

    if (current) activeSectionId.value = current
}

// ─── Scroll State ─────────────────────────────────────────────────────────────
const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 20)

const scrollProgress = computed(() => {
    if (typeof document === 'undefined') return 0
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    return scrollable > 0 ? Math.min((y.value / scrollable) * 100, 100) : 0
})

// ─── Shared Style Token ───────────────────────────────────────────────────────
// Frosted-glass panel used by the unscrolled header toggle, nav pill, and action buttons
const glassPanel = 'bg-white/80 dark:bg-neutral-900/80 border-neutral-200/80 dark:border-neutral-800 backdrop-blur-md shadow-xs'

// ─── Watchers ─────────────────────────────────────────────────────────────────
// Re-run scroll spy on every scroll tick
watch(y, updateActiveSection)

// Sync active section when navigating via hash links
watch(() => route.hash, (newHash) => {
    if (newHash) activeSectionId.value = newHash.slice(1)
}, { immediate: true })

// Re-evaluate active section after a route change (page transition)
watch(() => route.path, () => nextTick(updateActiveSection))

// ─── Page-load Header Reveal ──────────────────────────────────────────────────
const headerVisible = ref(false)
onMounted(() => {
    requestAnimationFrame(() => { headerVisible.value = true })
    nextTick(updateActiveSection)
})
</script>

<template>
    <div :class="themeClass">
        <!-- ─── Header ──────────────────────────────────────────────────────── -->
        <UHeader
            :toggle="{
                size: isScrolled ? 'md' : 'xl',
                variant: isScrolled ? 'ghost' : 'soft',
                class: !isScrolled && `${glassPanel} rounded-xl border-none`
            }"
            :ui="{
                root: [
                    'transition-all duration-300 ease-in-out',
                    isScrolled
                        ? 'h-16 bg-default/75 backdrop-blur border-b border-default shadow-xs'
                        : 'h-20 bg-transparent border-transparent backdrop-blur-none shadow-none',
                ],
                container: [
                    'max-w-full reveal-down transition-[padding] duration-300 ease-in-out',
                    isScrolled ? 'px-4 sm:px-6 lg:px-8' : 'px-6 sm:px-8 lg:px-10',
                ],
                toggle: [
                    'transition-all duration-300 ease-in-out',
                    !isScrolled && `${glassPanel} border`,
                ],
            }"
            class="section-reveal reveal-fade"
            :class="{ 'is-visible': headerVisible }"
        >
            <!-- Logo + App Name -->
            <template #title>
                <div
                    class="flex items-center transition-[gap] duration-300 ease-in-out"
                    :class="isScrolled ? 'gap-2.5' : 'gap-3'"
                >
                    <div
                        class="bg-primary flex items-center justify-center transition-all duration-300 ease-in-out"
                        :class="isScrolled ? 'size-8 rounded-lg shadow-sm' : 'size-9.5 sm:size-10 rounded-xl shadow-md'"
                    >
                        <UIcon
                            :name="appIcon"
                            class="text-white transition-all duration-300 ease-in-out"
                            :class="isScrolled ? 'size-5' : 'size-5.5 sm:size-6'"
                        />
                    </div>

                    <h2
                        class="font-bold tracking-tight text-highlighted transition-[font-size] duration-300 ease-in-out"
                        :class="isScrolled ? 'text-xl' : 'text-xl sm:text-2xl'"
                    >
                        {{ appNamePrefix }}<span class="text-primary">{{ appNameHighlight }}</span>
                    </h2>
                </div>
            </template>

            <!-- Desktop Navigation -->
            <UNavigationMenu
                :items="navItems"
                :ui="{
                    link: [
                        'transition-all duration-300 ease-in-out',
                        isScrolled ? 'text-sm px-2.5 py-1.5' : 'text-base px-3.5 py-2 font-medium',
                    ],
                    viewportWrapper: [
                        'transition-all duration-300 ease-in-out',
                        !isScrolled
                            ? 'w-full start-0 translate-x-0 pt-2'
                            : 'w-max min-w-full start-1/2 -translate-x-1/2 justify-center pt-4',
                    ],
                    viewport: [
                        'transition-all duration-300 ease-in-out overflow-hidden',
                        !isScrolled
                            ? `w-full ${glassPanel} border rounded-2xl ring-0`
                            : 'shrink-0 w-(--reka-navigation-menu-viewport-width) max-w-[calc(100vw-2rem)] bg-default shadow-lg rounded-md ring ring-default border-transparent backdrop-blur-none',
                    ],
                    content:   ['overflow-x-hidden', !isScrolled ? 'w-full' : 'w-auto'],
                    childList: [
                        'p-3 grid-cols-2 gap-2',
                        !isScrolled ? 'w-full' : 'w-[520px] sm:w-[560px] max-w-[calc(100vw-2.5rem)]',
                    ],
                    childLink:     'rounded-xl transition-all duration-200',
                    childLinkIcon: 'transition-colors',
                }"
                class="transition-all duration-300 ease-in-out"
                :class="[
                    !isScrolled
                        ? `rounded-full px-3 py-1 border ${glassPanel}`
                        : 'bg-transparent border-transparent px-0 py-0 shadow-none',
                ]"
            />

            <!-- Header Right Actions -->
            <template #right>
                <UColorModeButton
                    :size="isScrolled ? 'md' : 'xl'"
                    :variant="isScrolled ? 'ghost' : 'soft'"
                    class="transition-all duration-300 ease-in-out"
                    :class="[!isScrolled && `${glassPanel} rounded-xl`]"
                />

                <UButton
                    label="Sign in"
                    color="neutral"
                    :size="isScrolled ? 'md' : 'xl'"
                    :variant="isScrolled ? 'ghost' : 'soft'"
                    class="hidden sm:flex transition-all duration-300 ease-in-out"
                    :class="[!isScrolled && `${glassPanel} rounded-xl`]"
                    :to="`/products/${currentProduct}/login`"
                />

                <UButton
                    :label="primaryButton.label"
                    :trailing-icon="primaryButton.icon"
                    :size="isScrolled ? 'md' : 'xl'"
                    class="transition-all duration-300 ease-in-out"
                    :class="[!isScrolled && 'shadow-md rounded-xl']"
                />
            </template>

            <!-- Mobile Drawer Body -->
            <template #body>
                <!-- Mobile nav inherits theme color via themeClass on <body> -->
                <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />

                <div class="mt-4 flex flex-col gap-2">
                    <UButton
                        label="Sign in"
                        color="neutral"
                        variant="outline"
                        block
                        :to="`/products/${currentProduct}/login`"
                    />
                    <UButton :label="primaryButton.label" block />
                </div>
            </template>
        </UHeader>

        <!-- ─── Scroll Progress Indicator ──────────────────────────────────── -->
        <div
            class="scroll-indicator-track section-reveal reveal-fade reveal-delay-200"
            :class="{ 'is-visible': headerVisible }"
            :style="{ top: isScrolled ? 'var(--ui-header-height)' : '5rem' }"
        >
            <div class="scroll-indicator-bar" :style="{ width: `${scrollProgress}%` }" />
        </div>

        <!-- ─── Page Slot ───────────────────────────────────────────────────── -->
        <UMain class="-mt-20">
            <slot />
        </UMain>

        <!-- ─── Footer ─────────────────────────────────────────────────────── -->
        <UFooter>
            <template #top>
                <UContainer>
                    <UFooterColumns :columns="footerLinks">
                        <template #left>
                            <div class="space-y-4">
                                <!-- Brand mark -->
                                <div class="flex items-center gap-2.5">
                                    <div class="size-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                                        <UIcon :name="appIcon" class="size-5 text-white" />
                                    </div>
                                    <span class="font-bold text-xl tracking-tight text-highlighted">
                                        {{ appNamePrefix }}<span class="text-primary">{{ appNameHighlight }}</span>
                                    </span>
                                </div>

                                <p class="text-muted text-sm leading-relaxed max-w-xs">
                                    {{ description }}
                                </p>
                            </div>
                        </template>
                    </UFooterColumns>
                </UContainer>
            </template>

            <!-- Copyright -->
            <template #left>
                <p class="text-muted text-sm flex items-center gap-2">
                    <UIcon name="i-lucide-copyright" />
                    <span>{{ new Date().getFullYear() }} {{ appNamePrefix }}{{ appNameHighlight }}. All rights reserved.</span>
                </p>
            </template>

            <!-- Social Links -->
            <template #right>
                <div class="flex items-center gap-1">
                    <UButton v-if="social.includes('linkedin')" icon="i-simple-icons-linkedin" color="neutral"
                        variant="ghost" size="sm" to="https://linkedin.com" target="_blank" aria-label="LinkedIn" />
                    <UButton v-if="social.includes('x')" icon="i-simple-icons-x" color="neutral"
                        variant="ghost" size="sm" to="https://x.com" target="_blank" aria-label="X (Twitter)" />
                    <UButton v-if="social.includes('facebook')" icon="i-simple-icons-facebook" color="neutral"
                        variant="ghost" size="sm" to="https://facebook.com" target="_blank" aria-label="Facebook" />
                    <UButton v-if="social.includes('youtube')" icon="i-simple-icons-youtube" color="neutral"
                        variant="ghost" size="sm" to="https://youtube.com" target="_blank" aria-label="YouTube" />
                </div>
            </template>
        </UFooter>
    </div>
</template>

<style scoped>
/* ─── Scroll Progress Bar ──────────────────────────────────────────────────── */
.scroll-indicator-track {
    position: fixed;
    top: var(--ui-header-height);
    left: 0;
    right: 0;
    z-index: 50;
    height: 3px;
    background: transparent;
    pointer-events: none;
    transition: top 0.3s ease-in-out;
}

.scroll-indicator-bar {
    position: relative;
    height: 100%;
    background: linear-gradient(to right, var(--ui-color-primary-400), var(--ui-color-primary-600));
    border-radius: 0 9999px 9999px 0;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px 1px var(--ui-color-primary-500);
    overflow: hidden;
}

/* Shimmer animation that travels across the bar */
.scroll-indicator-bar::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 100%;
    background: linear-gradient(to right, transparent, white, transparent);
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
    animation: scroll-shine 2.5s ease-out infinite;
}

@keyframes scroll-shine {
    0%   { transform: translateX(-300px); opacity: 0; }
    40%  { opacity: 0.8; }
    100% { transform: translateX(150px);  opacity: 0; }
}
</style>
