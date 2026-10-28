<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useWindowScroll } from '@vueuse/core'

const navItems: NavigationMenuItem[] = [
  { label: 'Products', to: '#products' },
  { label: 'Features', to: '#features' },
  { label: 'How It Works', to: '#how-it-works' },
  { label: 'About', to: '#about' },
  { label: 'Customer Stories', to: '#testimonials' },
  { label: 'Contact', to: '#contact' },
  // {
  //   label: 'Products',
  //   icon: 'i-lucide-layout-grid',
  //   children: [
  //     {
  //       label: 'HRIS',
  //       description: 'Human Resource Information System',
  //       icon: 'i-lucide-users',
  //       to: '/products/hris',
  //     },
  //     {
  //       label: 'LMS',
  //       description: 'Learning Management System',
  //       icon: 'i-lucide-book-open',
  //       to: '/products/lms',
  //     },
  //     {
  //       label: 'CMS',
  //       description: 'Campus Management System',
  //       icon: 'i-lucide-graduation-cap',
  //       to: '/products/cms',
  //     },
  //   ],
  // },
]

// ─── Scroll State ─────────────────────────────────────────────────────────────
const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 20)

const scrollProgress = computed(() => {
  if (typeof document === 'undefined') return 0
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  return scrollable > 0 ? Math.min((y.value / scrollable) * 100, 100) : 0
})

// ─── Shared Style Token ───────────────────────────────────────────────────────
const glassPanel = 'bg-white/80 dark:bg-neutral-900/80 border-neutral-200/80 dark:border-neutral-800 backdrop-blur-md shadow-xs'

// ─── Page-load Header Reveal ──────────────────────────────────────────────────
const headerVisible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { headerVisible.value = true })
})

const footerLinks = [
  {
    label: 'Products',
    children: [
      { label: 'HRIS', to: '/products/hris' },
      { label: 'LMS', to: '/products/lms' },
      { label: 'CMS', to: '/products/cms' },
      { label: 'Pricing', to: '#' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', to: '#about' },
      { label: 'Blog', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#contact' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', to: '#' },
      { label: 'API Reference', to: '#' },
      { label: 'Implementation Guide', to: '#' },
      { label: 'Support Center', to: '#' },
    ],
  },
  {
    label: 'Legal',
    children: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Data Protection', to: '#' },
    ],
  },
]
</script>

<template>
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
    <!-- Logo -->
    <template #title>
      <AppLogo />
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
        content: ['overflow-x-hidden', !isScrolled ? 'w-full' : 'w-auto'],
        childList: [
          'p-3 grid-cols-2 gap-2',
          !isScrolled ? 'w-full' : 'w-[520px] sm:w-[560px] max-w-[calc(100vw-2.5rem)]',
        ],
        childLink: 'rounded-xl transition-all duration-200',
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
        label="Contact Sales"
        color="neutral"
        :size="isScrolled ? 'md' : 'xl'"
        :variant="isScrolled ? 'ghost' : 'soft'"
        class="hidden sm:flex transition-all duration-300 ease-in-out"
        :class="[!isScrolled && `${glassPanel} rounded-xl`]"
      />

      <UButton
        label="Book a Demo"
        trailing-icon="i-lucide-calendar"
        :size="isScrolled ? 'md' : 'xl'"
        class="transition-all duration-300 ease-in-out"
        :class="[!isScrolled && 'shadow-md rounded-xl']"
        @click="useDemoModal().open()"
      />
    </template>

    <!-- Mobile Drawer Body -->
    <template #body>
      <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
      <div class="mt-4 flex flex-col gap-2">
        <UButton label="Contact Sales" color="neutral" variant="outline" block />
        <UButton label="Book a Demo" block @click="useDemoModal().open()" />
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

  <UMain class="-mt-20">
    <slot />
  </UMain>

  <UFooter>
    <template #top>
      <UContainer>
        <UFooterColumns :columns="footerLinks">
          <template #left>
            <div class="space-y-4">
              <AppLogo />
              <p class="text-muted text-sm leading-relaxed max-w-xs">
                Centralized Cloud Computing International Inc. — building enterprise cloud software for Philippine organizations since 2020.
              </p>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm flex items-center gap-2">
        <UIcon name="i-lucide-copyright" />
        <span>{{ new Date().getFullYear() }} Centralized Cloud Computing International Inc. All rights reserved.</span>
      </p>
    </template>

    <template #right>
      <div class="flex items-center gap-1">
        <UButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
        />
        <UButton
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://facebook.com"
          target="_blank"
          aria-label="Facebook"
        />
        <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://x.com"
          target="_blank"
          aria-label="X (Twitter)"
        />
      </div>
    </template>
  </UFooter>
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
