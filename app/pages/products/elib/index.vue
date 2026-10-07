<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
definePageMeta({ layout: 'product' })

const { y } = useWindowScroll()

useSeoMeta({
  title: 'eLib — Electronic Library System | BiblioCore',
  description: 'Manage your entire library in the cloud — catalog books, track circulation, handle member accounts, and empower readers with a modern OPAC. Built for schools, universities, and public libraries.',
})

const features = [
  {
    title: 'Quick Online Access',
    description: 'Students reach books, magazines, catalogs, journals and other materials online — better, faster learning from anywhere.',
    icon: 'i-lucide-search',
    orientation: 'vertical' as const
  },
  {
    title: 'Automated Library Tasks',
    description: 'Inventory, cataloguing, serial management, circulation and reference are automated, improving day-to-day efficiency.',
    icon: 'i-lucide-layers',
    orientation: 'vertical' as const
  },
  {
    title: 'Member Data Management',
    description: 'Store and manage member data in one database, maintain each account, and collect membership payments with ease.',
    icon: 'i-lucide-users',
    orientation: 'vertical' as const
  },
  {
    title: 'Automatic Fines',
    description: 'Fines and penalties for late returns are assessed and calculated automatically — no manual computation needed.',
    icon: 'i-lucide-wallet',
    orientation: 'vertical' as const
  }
]

const stats = [
  { value: '500+', label: 'Libraries Served' },
  { value: '2M+', label: 'Titles Managed' },
  { value: '98%', label: 'Patron Satisfaction' },
  { value: '60%', label: 'Less Admin Time' },
]

const testimonials = [
  {
    quote: 'BiblioCore transformed our library. What used to take three staff members all day — cataloging, circulation, and reporting — now runs almost automatically. Our patrons love the new OPAC.',
    author: 'Librarian Rosa Cruz',
    role: 'University Librarian, Ateneo de Manila',
    initials: 'RC',
  },
  {
    quote: 'We deployed BiblioCore across our 12 school branches. Catalog sync is instant, and the overdue management practically runs itself. Fines collection went up 45% without any extra effort.',
    author: 'Dr. Emmanuel Torres',
    role: 'Head of School Services, DepEd Region IV',
    initials: 'ET',
  },
  {
    quote: 'The analytics dashboards are incredibly powerful. We can now see which titles are underused and reallocate our acquisition budget accordingly. It\'s the smartest investment our library has made.',
    author: 'Maria Lourdes Ramos',
    role: 'Public Library Director, Quezon City',
    initials: 'MR',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'Perfect for small school libraries getting started with digital catalog management.',
    price: '₱2,500',
    features: [
      'Up to 10,000 titles',
      'Core catalog & OPAC',
      'Basic circulation tracking',
      'Member management',
      'Email support',
    ],
  },
  {
    title: 'Institution',
    description: 'For university and college libraries with large collections and high patron volume.',
    price: '₱6,500',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 100,000 titles',
      'Everything in Starter',
      'E-resources & digital lending',
      'Reservations & holds',
      'Analytics & CHED reports',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For public libraries, library consortia, and large multi-branch institutions.',
    price: 'Custom',
    features: [
      'Unlimited titles',
      'Everything in Institution',
      'Multi-branch management',
      'RFID & barcode integration',
      'Custom integrations & API',
      'Dedicated implementation team',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Schedule a Call', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-amazon', label: 'Amazon' },
  { name: 'i-simple-icons-apple', label: 'Apple' },
  { name: 'i-simple-icons-meta', label: 'Meta' },
  { name: 'i-simple-icons-unesco', label: 'UNESCO' },
]

const checklist = [
    'Self check-in & check-out',
    'Barcode circulation',
    'Mobile app access'
]

const modules = [
    { title: 'Admission', icon: 'i-lucide-door-open', to: '#admission' },
    { title: 'Enrollment', icon: 'i-lucide-clipboard-list', to: '#enrollment' },
    { title: 'Registrar', icon: 'i-lucide-book-open', to: '#registrar' },
    { title: 'Billing', icon: 'i-lucide-receipt-text', to: '#billing' },
    { title: 'Grades', icon: 'i-lucide-graduation-cap', to: '#grades' },
    { title: 'Student', icon: 'i-lucide-user-round', to: '#student' },
    { title: 'Security', icon: 'i-lucide-shield-check', to: '#security' },
    { title: 'Scheduling', icon: 'i-lucide-calendar-clock', to: '#scheduling' },
]
</script>

<template>
  <!-- Hero -->
    <UPageHero
        orientation="horizontal" :ui="{
            root: 'relative overflow-hidden min-h-[calc(100vh-var(--ui-header-height))] pb-14 flex flex-col justify-center',
            container: 'max-w-full',
            description: 'dark:text-toned'
        }">
        <template #headline>
            <UBadge variant="subtle" :ui="{ base: 'pr-2.5 gap-2' }" class="rounded-full mb-4">
                <span class="relative flex size-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                    <span class="relative inline-flex size-2 rounded-full bg-primary-500"></span>
                </span>
                Introducing CampusCore 2.0
            </UBadge>
        </template>
        <template #title>
            Knowledge,<br>always within reach.
        </template>
        <template #description>
            The <strong>eLibrary System</strong> gives students quick online access to books, magazines, catalogs, journals and more — while automating inventory, cataloguing, serial management, circulation and reference for librarians. Built by Centralized Cloud Computing International.
        </template>

        <template #top>
            <!-- Background image with true parallax -->
            <div class="absolute -inset-y-[25%] inset-x-0 -z-20 bg-cover bg-center bg-no-repeat will-change-transform"
                :style="{
                    backgroundImage: 'url(\'/Students_studying_in_library_2K_20261007165233.jpg\')',
                    transform: `translateY(${y * 0.4}px)`
                }" />
            <!-- Adaptive overlays -->
            <div class="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 to-transparent to-90% dark:from-black/90" />
            
            <!-- Grid texture -->
            <div class="absolute inset-y-0 left-0 w-2/3 -z-10 pointer-events-none [mask-image:linear-gradient(to_right,black,transparent)]">
                <svg class="absolute inset-0 h-full w-full text-primary-500/20 dark:text-primary-400/20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>
            </div>

            <!-- Primary color overlay -->
            <div class="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-transparent to-45%" />
        </template>

        <template #footer>
            <div class="flex flex-wrap gap-x-6 gap-y-3">
                <UButton v-for="(link, index) in heroLinks" :key="index" v-bind="link" />
            </div>

            <ul class="mt-6 sm:mt-12 flex flex-wrap gap-x-6 gap-y-2">
                <li v-for="item in checklist" :key="item" class="flex items-center gap-2 text-sm text-toned">
                    <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0" />
                    {{ item }}
                </li>
            </ul>
        </template>

        <!-- Ticker at bottom of hero -->
        <div
            class="absolute bottom-0 inset-x-0 border-t border-default bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md overflow-hidden flex py-4 z-10">
            <div class="flex whitespace-nowrap animate-ticker w-max hover:animation-paused">
                <div class="flex items-center gap-16 pr-16 shrink-0" v-for="i in 4" :key="`ticker-group-${i}`">
                    <NuxtLink v-for="mod in modules" :key="mod.title" :to="mod.to"
                        class="flex items-center gap-2 text-sm font-bold text-toned uppercase tracking-wider hover:text-primary transition-colors">
                        <UIcon :name="mod.icon" class="size-5 text-primary" />
                        {{ mod.title }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </UPageHero>

  <!-- Social proof -->
  <!-- <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by leading schools, universities, and public libraries
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        <UIcon
          v-for="logo in logoIcons"
          :key="logo.name"
          :name="logo.name"
          :aria-label="logo.label"
          class="size-7 text-muted"
        />
      </div>
    </UContainer>
  </div> -->

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Why Choose Us"
    title="An essential role in every campus"
    description="The eLibrary System empowers librarians and authorized staff to keep proper records of every book — author, edition, copies, issue and return dates — while helping students learn better through quick online access."
    :features="features"
    :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10' }"
  />

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Features"
    title="Everything your library needs to go digital"
    description="From a 500-title school library to a 2-million-title university system — BiblioCore covers the entire library lifecycle in one unified platform."
    :features="features"
  />

  <!-- Feature detail: Catalog -->
  <UPageSection
    title="A catalog your readers will actually use"
    description="BiblioCore's modern OPAC lets patrons search, filter, reserve, and renew books from any device — no login friction, no outdated UI. Add new titles in seconds with ISBN auto-fill and automatic cover art retrieval. Every item is tagged, categorized, and instantly searchable."
    orientation="horizontal"
  >
    <MockupScreenElibCatalog />
  </UPageSection>

  <!-- Feature detail: Circulation -->
  <UPageSection
    title="Circulation that runs at the speed of your desk"
    description="Process checkouts and returns in seconds, manage holds and renewals, and automatically flag overdue items with fine calculations. BiblioCore's circulation desk is designed for speed — every workflow is one click away so your staff can focus on helping patrons."
    orientation="horizontal"
    reverse
  >
    <MockupScreenElibCirculation />
  </UPageSection>

  <!-- Stats banner -->
  <div class="bg-primary dark:bg-primary/50 py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-4xl lg:text-5xl font-extrabold text-white">{{ stat.value }}</p>
          <p class="text-white/70 mt-2 text-sm lg:text-base font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- Testimonials -->
  <UPageSection
    id="testimonials"
    headline="Customer Stories"
    title="Trusted by librarians, educators, and administrators"
    description="Hear from the library directors, registrars, and school administrators who rely on BiblioCore every day."
  >
    <UPageGrid>
      <UCard v-for="t in testimonials" :key="t.author">
        <div class="flex flex-col h-full">
          <div class="flex gap-0.5 mb-5">
            <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-4 text-warning" />
          </div>
          <p class="text-muted italic leading-relaxed flex-1">"{{ t.quote }}"</p>
          <div class="flex items-center gap-3 mt-6 pt-6 border-t border-default">
            <UAvatar :text="t.initials" size="md" color="primary" />
            <div>
              <p class="font-semibold text-highlighted text-sm">{{ t.author }}</p>
              <p class="text-dimmed text-xs">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </UPageGrid>
  </UPageSection>

  <!-- Pricing -->
  <div class="bg-muted/30">
    <UPageSection
      id="pricing"
      headline="Pricing"
      title="Simple, transparent pricing"
      description="Whether you're a small school or a large public library network — BiblioCore has a plan for you. Every plan includes a 30-day free trial."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to modernize your library?"
    description="Join 500+ schools, universities, and public libraries using BiblioCore to deliver world-class library services. Request your free demo today."
    :links="ctaLinks"
  />
</template>

<style scoped>
@keyframes ticker {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-25%);
    }
}

.animate-ticker {
    animation: ticker 40s linear infinite;
}

.hover\:animation-paused:hover {
    animation-play-state: paused;
}

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