<script setup lang="ts">
const bgCanvas = ref<HTMLCanvasElement | null>(null)
useParticleCanvas(bgCanvas)

definePageMeta({
  title: 'CCCI — Centralized Cloud Computing International Inc.',
  layout: 'default',
})

useSeoMeta({
  title: 'CCCI — Centralized Cloud Computing International Inc.',
  description: 'CCCI builds cloud-native enterprise software for Philippine organizations — HRIS, LMS, and CMS — in one unified platform trusted by 500+ companies and schools.',
})

const {
  isVisible: statsVisible,
  container: statsContainer,
  progress: statsProgress,
} = useRevealTransition({
  duration: 2500,
  transition: [0.22, 1, 0.36, 1],
})

const stats = [
  { target: 500, suffix: '+', label: 'Organizations', decimals: 0 },
  { target: 100, suffix: 'k+', label: 'Active Users', decimals: 0 },
  { target: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
  { target: 6, suffix: '', label: 'Enterprise Products', decimals: 0 },
]

type ProductColor = 'green' | 'violet' | 'amber' | 'sky' | 'slate' | 'rose' | 'teal' | 'indigo' | 'blue' | 'red' | 'purple' | 'orange'

interface Product {
  id: string
  name: string
  fullName: string
  tagline: string
  description: string
  icon: string
  to: string
  color: ProductColor
  features: string[]
  ctaLabel: string
}

const products: Product[] = [
  {
    id: 'hris',
    name: 'HRIS',
    fullName: 'Human Resource Information System',
    tagline: 'Modernize your workforce management',
    description: 'Automate payroll, track attendance, manage talent, and stay compliant — all in one cloud platform built for Philippine companies.',
    icon: 'i-lucide-users',
    to: '/products/hris',
    color: 'green',
    features: [
      'Smart Payroll & Tax Filing',
      'Attendance & Leave Management',
      'Performance & Talent Tracking',
      'DOLE & SSS Compliance',
    ],
    ctaLabel: 'Explore HRIS',
  },
  {
    id: 'lms',
    name: 'LMS',
    fullName: 'Learning Management System',
    tagline: 'Empower learning at every level',
    description: 'Deliver courses, track learner progress, issue certifications, and build a culture of continuous learning — online or blended.',
    icon: 'i-lucide-book-open',
    to: '/products/lms',
    color: 'violet',
    features: [
      'Course Builder & Video Hosting',
      'Progress Tracking & Analytics',
      'Certification & Badges',
      'Blended & Self-Paced Learning',
    ],
    ctaLabel: 'Explore LMS',
  },
  {
    id: 'cms',
    name: 'CMS',
    fullName: 'Campus Management System',
    tagline: 'Run your campus end-to-end',
    description: 'Digitize enrollment, grading, finance, and compliance for schools and universities — CHED-ready and built for Philippine education.',
    icon: 'i-lucide-graduation-cap',
    to: '/products/cms',
    color: 'amber',
    features: [
      'Online Enrollment & Scheduling',
      'Grades & Academic Records',
      'Finance & Tuition Management',
      'CHED Compliance Reporting',
    ],
    ctaLabel: 'Explore CMS',
  },
  {
    id: 'dms',
    name: 'DMS',
    fullName: 'Document Management System',
    tagline: 'Control your documents end-to-end',
    description: 'Digitize, organize, and automate document workflows in a single secure platform. Eliminate paper trails with smart search, approvals, and e-signatures.',
    icon: 'i-lucide-folder-open',
    to: '/products/dms',
    color: 'slate',
    features: [
      'Centralized Document Repository',
      'Automated Approval Workflows',
      'Version Control & Audit Trail',
      'Integrated E-Signatures',
    ],
    ctaLabel: 'Explore DMS',
  },
  {
    id: 'ams',
    name: 'AMS',
    fullName: 'Asset Management System',
    tagline: 'Track and optimize every asset',
    description: 'Monitor, manage, and maximize the value of your physical and digital assets — from procurement to disposal with real-time visibility.',
    icon: 'i-lucide-boxes',
    to: '/products/ams',
    color: 'sky',
    features: [
      'Real-Time Asset Tracking',
      'Maintenance Scheduling',
      'Depreciation Calculation',
      'Barcode & QR Code Scanning',
    ],
    ctaLabel: 'Explore AMS',
  },
  {
    id: 'ilsp',
    name: 'ILSP',
    fullName: 'International Linkages System',
    tagline: 'Manage global partnerships',
    description: 'Track and manage your institutional partnerships, MOUs, student exchange programs, and international grants in one unified directory.',
    icon: 'i-lucide-globe',
    to: '/products/ilsp',
    color: 'rose',
    features: [
      'MOU & Agreement Tracking',
      'Student & Faculty Mobility',
      'Global Partnership Directory',
      'International Grants & Analytics',
    ],
    ctaLabel: 'Explore ILSP',
  },
  {
    id: 'aissp',
    name: 'AISSP',
    fullName: 'Automated Information Systems Strategic Plan',
    tagline: 'Strategic alignment for ICT investments',
    description: 'Align your organization\'s ICT projects with strategic goals. Track systems, budgets, and compliance effortlessly.',
    icon: 'i-lucide-network',
    to: '/products/aissp',
    color: 'teal',
    features: [
      'Strategic ICT Alignment',
      'Resource & Budget Tracking',
      'System Lifecycle Management',
      'Compliance & Audit Trails',
    ],
    ctaLabel: 'Explore AISSP',
  },
  {
    id: 'eis',
    name: 'EIS',
    fullName: 'Executive Information System',
    tagline: 'Strategic intelligence for top leadership',
    description: 'Give executives a real-time, consolidated view of your organization\'s performance — KPIs, forecasts, and critical alerts in one premium dashboard.',
    icon: 'i-lucide-bar-chart-3',
    to: '/products/eis',
    color: 'indigo',
    features: [
      'Consolidated KPI Dashboard',
      'Cross-Module Data Aggregation',
      'Predictive Forecasting',
      'Executive Reports & Alerts',
    ],
    ctaLabel: 'Explore EIS',
  },
  {
    id: 'fms',
    name: 'FMS',
    fullName: 'Financial Management System',
    tagline: 'Core financial control and accounting',
    description: 'Manage income, expenses, budgets, and compliance. Ensure financial stability and profitability across your organization.',
    icon: 'i-lucide-wallet',
    to: '/products/fms',
    color: 'blue',
    features: [
      'General Ledger & Accounting',
      'Budgeting & Forecasting',
      'Cash Flow Management',
      'Financial Reporting',
    ],
    ctaLabel: 'Explore FMS',
  },
  {
    id: 'hkas',
    name: 'HKAS',
    fullName: 'Human Kinetics Assessment System',
    tagline: 'Assess, track, and elevate physical performance',
    description: 'Digitize fitness assessments, track body composition, manage PE curriculum, and run corporate wellness programs — all in one platform built for schools, universities, and organizations.',
    icon: 'i-lucide-activity',
    to: '/products/hkas',
    color: 'red',
    features: [
      'Standardized Fitness Testing',
      'Body Composition Tracking',
      'PE Curriculum Management',
      'Corporate Wellness Programs',
    ],
    ctaLabel: 'Explore HKAS',
  },
  {
    id: 'elib',
    name: 'eLib',
    fullName: 'Electronic Library System',
    tagline: 'Digitize your library, delight every reader',
    description: 'Manage your entire library in the cloud — catalog books, track circulation, handle member accounts, and empower readers with a modern OPAC. Built for schools, universities, and public libraries.',
    icon: 'i-lucide-library',
    to: '/products/elib',
    color: 'purple',
    features: [
      'Smart Catalog & OPAC',
      'Circulation & Returns',
      'Member & Fine Management',
      'Analytics & Usage Reports',
    ],
    ctaLabel: 'Explore eLib',
  },
  {
    id: 'irs',
    name: 'IRS',
    fullName: 'Incident Reporting System',
    tagline: 'Report, track, and prevent every workplace hazard',
    description: 'Log accidents, near-misses, and safety hazards in real time from any device. SafeReport keeps your workforce protected, investigations on track, and regulators satisfied.',
    icon: 'i-lucide-triangle-alert',
    to: '/products/irs',
    color: 'orange',
    features: [
      'One-Tap Mobile Incident Logging',
      'Root Cause Analysis & CAPA',
      'Safety Analytics & Heatmaps',
      'DOLE & ISO 45001 Compliance',
    ],
    ctaLabel: 'Explore IRS',
  },
]

const whyFeatures = [
  {
    icon: 'i-lucide-cloud',
    title: 'Cloud-Native Infrastructure',
    description: 'Built on modern cloud architecture with auto-scaling, zero-downtime deployments, and 99.9% uptime SLA.',
  },
  {
    icon: 'i-lucide-map-pin',
    title: 'Philippine-Localized',
    description: 'Pre-configured for BIR, DOLE, SSS, PhilHealth, Pag-IBIG, and CHED compliance. No extra setup required.',
  },
  {
    icon: 'i-lucide-layers',
    title: 'One Unified Platform',
    description: 'HRIS, LMS, and CMS share a single login, data layer, and admin dashboard — no more siloed systems.',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Enterprise-Grade Security',
    description: 'End-to-end encryption, role-based access control, audit logs, and regular penetration testing built-in.',
  },
  {
    icon: 'i-lucide-headset',
    title: '24/7 Local Support',
    description: 'Dedicated Philippine-based implementation team, onboarding specialists, and round-the-clock helpdesk.',
  },
  {
    icon: 'i-lucide-trending-up',
    title: 'Scales With You',
    description: 'From 50-person startups to 10,000-employee enterprises — CCCI grows as your organization grows.',
  },
]

const steps = [
  {
    step: '01',
    icon: 'i-lucide-package-search',
    title: 'Choose Your Products',
    description: 'Select HRIS, LMS, CMS — or bundle all three. Our team will map your current workflows and recommend the right fit for your organization.',
  },
  {
    step: '02',
    icon: 'i-lucide-settings-2',
    title: 'We Handle Onboarding',
    description: 'Our implementation specialists configure the system, migrate your existing data, and train your team — so you go live with zero disruption.',
  },
  {
    step: '03',
    icon: 'i-lucide-rocket',
    title: 'Go Live & Scale',
    description: 'Launch in as little as 2 weeks. Then continuously improve with real-time analytics, quarterly check-ins, and priority feature requests.',
  },
]

const testimonials = [
  {
    quote: 'Switching to CCCI was the best decision we made this year. Our HR team went from drowning in spreadsheets to running payroll in under an hour. The BIR and SSS compliance features alone saved us weeks of manual work.',
    author: 'Maria Santos',
    role: 'HR Director, Apex Manufacturing Corp.',
    initials: 'MS',
    product: 'HRIS',
  },
  {
    quote: 'The LMS transformed how we deliver training across our 12 branches. Our employees now complete certifications online at their own pace, and we can track progress in real time. Onboarding new staff takes half the time it used to.',
    author: 'James Reyes',
    role: 'Training Manager, FilipinaRetail Group',
    initials: 'JR',
    product: 'LMS',
  },
  {
    quote: 'CampusCore by CCCI made our CHED accreditation a breeze. What used to take our registrar three weeks of frantic data gathering now takes one afternoon. Our enrollment process is fully online and students love it.',
    author: 'Dr. Ana Villanueva',
    role: 'Registrar, St. Michael\'s College',
    initials: 'AV',
    product: 'CMS',
  },
]

const clients = [
  { name: 'Harvard Tech', icon: 'i-lucide-building-2', color: 'text-rose-500' },
  { name: 'MIT Media Lab', icon: 'i-lucide-microscope', color: 'text-teal-500' },
  { name: 'Deloitte Digital', icon: 'i-lucide-briefcase', color: 'text-green-500' },
  { name: 'Google Enterprise', icon: 'i-lucide-zap', color: 'text-amber-500' },
  { name: 'Salesforce Academy', icon: 'i-lucide-globe', color: 'text-blue-500' },
  { name: 'Stanford Online', icon: 'i-lucide-graduation-cap', color: 'text-fuchsia-500' },
  { name: 'Siemens Learning', icon: 'i-lucide-settings', color: 'text-cyan-500' },
  { name: 'Cisco Academy', icon: 'i-lucide-shield', color: 'text-violet-500' },
]

const productColorMap: Record<ProductColor, { bg: string, text: string, border: string, badge: string, icon: string }> = {
  green: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    icon: 'bg-green-500',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-200 dark:border-violet-800',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
    icon: 'bg-violet-500',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    icon: 'bg-amber-500',
  },
  slate: {
    bg: 'bg-slate-50 dark:bg-slate-950/30',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300',
    icon: 'bg-slate-500',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-200 dark:border-sky-800',
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
    icon: 'bg-sky-500',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    icon: 'bg-rose-500',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-200 dark:border-teal-800',
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    icon: 'bg-teal-500',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
    icon: 'bg-indigo-500',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    icon: 'bg-blue-500',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    icon: 'bg-red-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
    icon: 'bg-purple-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
    icon: 'bg-orange-500',
  },
}

const carouselRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const cardsPerView = ref(3)

function updateCardsPerView() {
  if (typeof window === 'undefined') return
  if (window.innerWidth < 768) cardsPerView.value = 1
  else if (window.innerWidth < 1280) cardsPerView.value = 2
  else cardsPerView.value = 3
}

// ── Page-load hero fade-in ───────────────────────────────────────────────
const heroVisible = ref(false)

// ── Per-section scroll-reveal ────────────────────────────────────────────
const { el: logoBarEl, isVisible: logoBarVisible } = useScrollReveal({ threshold: 0.15, delay: 400 })
const { el: productsEl, isVisible: productsVisible } = useScrollReveal({ threshold: 0.1, delay: 400 })
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.1, delay: 400 })
const { el: statsEl, isVisible: statsVisible2 } = useScrollReveal({ threshold: 0.2, delay: 400 })
const { el: howItWorksEl, isVisible: howItWorksVisible } = useScrollReveal({ threshold: 0.1, delay: 400 })
const { el: aboutEl, isVisible: aboutVisible } = useScrollReveal({ threshold: 0.1, delay: 400 })
const { el: testimonialsEl, isVisible: testimonialsVisible } = useScrollReveal({ threshold: 0.1, delay: 400 })
const { el: ctaEl, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.2, delay: 400 })

onMounted(() => {
  updateCardsPerView()
  window.addEventListener('resize', updateCardsPerView)
  // Trigger hero fade-in on next frame so CSS transition fires
  requestAnimationFrame(() => { heroVisible.value = true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCardsPerView)
})

const totalCards = computed(() => products.length + 1) // +1 for Coming Soon card
const maxIndex = computed(() => Math.max(0, totalCards.value - cardsPerView.value))

function scrollToIndex(index: number) {
  activeIndex.value = Math.max(0, Math.min(index, maxIndex.value))
  const el = carouselRef.value
  if (!el) return
  const card = el.querySelector('[data-card]') as HTMLElement
  if (!card) return
  const cardWidth = card.offsetWidth + 24 // gap-6 = 24px
  el.scrollTo({ left: activeIndex.value * cardWidth, behavior: 'smooth' })
}

function prevSlide() { scrollToIndex(activeIndex.value - 1) }
function nextSlide() { scrollToIndex(activeIndex.value + 1) }

// Card width = (visible container content area - gaps) / numCards
// Visible area = min(100vw, 80rem) - 3rem (the 2x left+right container padding of 1.5rem each)
const cardStyle = computed(() => {
  const n = cardsPerView.value
  const gaps = n - 1
  return {
    flexShrink: 0,
    width: `calc((min(100vw, 80rem) - 3rem - ${gaps} * 1.5rem) / ${n})`,
  }
})
</script>

<template>
  <!-- Background decoration -->
  <div class="grid-overlay fixed inset-0 -z-10 pointer-events-none" />

  <canvas ref="bgCanvas" class="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen dark:mix-blend-lighten" />

  <!-- ─── Hero (page-load fade-in) ─────────────────────────────────────── -->
  <section
    class="relative overflow-hidden section-reveal"
    :class="{ 'is-visible': heroVisible }"
  >
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
    <div class="absolute top-0 right-0 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/3" />

    <UContainer class="py-24 md:py-32">
      <div class="mx-auto max-w-3xl text-center">
        <!-- Badge: slides down from above -->
        <div class="reveal-down inline-flex items-center gap-2 rounded-full border border-default bg-elevated px-4 py-1.5 text-sm font-medium text-muted mb-8">
          <span class="size-2 rounded-full bg-primary animate-pulse" />
          Trusted by 500+ Philippine organizations
        </div>

        <!-- Headline: fades up with slight delay -->
        <h1 class="reveal-up reveal-delay-150 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-highlighted leading-[1.05] mb-6">
          Enterprise Cloud Software,
          <span class="text-primary">Built for the Philippines</span>
        </h1>

        <!-- Sub-copy -->
        <p class="reveal-up reveal-delay-300 text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-10">
          CCCI delivers HRIS, LMS, and Campus Management in one unified platform — locally compliant, cloud-native, and built to scale with every Philippine organization.
        </p>

        <!-- CTAs -->
        <div class="reveal-up reveal-delay-400 flex flex-wrap items-center justify-center gap-4">
          <UButton
            id="hero-cta-demo"
            label="Book a Free Demo"
            size="xl"
            trailing-icon="i-lucide-calendar"
            @click="useDemoModal().open()"
          />
          <UButton
            id="hero-cta-products"
            label="Explore Products"
            size="xl"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-arrow-down"
            to="#products"
          />
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ─── Social Proof / Logo Bar ─────────────────────────────────────── -->
  <div
    ref="logoBarEl"
    class="border-y border-default bg-muted/40 py-10 overflow-hidden section-reveal"
    :class="{ 'is-visible': logoBarVisible }"
  >
    <UContainer>
      <p class="reveal-up text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by leading organizations
      </p>
    </UContainer>
    <div
      class="reveal-up reveal-delay-200 w-full flex overflow-hidden group"
      style="mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);"
    >
      <div class="flex shrink-0 gap-[60px] pr-[60px] items-center animate-[scrollMarquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
        <div
          v-for="(client, index) in clients"
          :key="index"
          class="flex items-center gap-3 text-muted font-bold text-lg tracking-wider uppercase whitespace-nowrap transition-colors hover:text-highlighted"
        >
          <UIcon :name="client.icon" class="size-6 shrink-0 transition-colors" :class="client.color" />
          {{ client.name }}
        </div>
      </div>
      <div class="flex shrink-0 gap-[60px] pr-[60px] items-center animate-[scrollMarquee_30s_linear_infinite] group-hover:[animation-play-state:paused]" aria-hidden="true">
        <div
          v-for="(client, index) in clients"
          :key="index"
          class="flex items-center gap-3 text-muted font-bold text-lg tracking-wider uppercase whitespace-nowrap transition-colors hover:text-highlighted"
        >
          <UIcon :name="client.icon" class="size-6 shrink-0 transition-colors" :class="client.color" />
          {{ client.name }}
        </div>
      </div>
    </div>
  </div>

  <!-- ─── Products ─────────────────────────────────────────────────────── -->
  <section
    id="products"
    ref="productsEl"
    class="py-24 overflow-hidden section-reveal"
    :class="{ 'is-visible': productsVisible }"
  >
    <UContainer>
      <div class="text-center mb-16">
        <p class="reveal-down text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Products</p>
        <h2 class="reveal-up reveal-delay-150 text-4xl font-extrabold text-highlighted tracking-tight mb-4">
          Six Products. One Platform.
        </h2>
        <p class="reveal-up reveal-delay-300 text-muted text-lg max-w-2xl mx-auto">
          Whether you're running a company, a school, or both — CCCI has the enterprise software to digitize and streamline your operations.
        </p>
      </div>
    </UContainer>

    <!-- Carousel — full viewport width -->
    <div class="reveal-up reveal-delay-400 relative group">
      <!-- Prev button -->
       <UButton
        v-if="activeIndex > 0"
        class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full shadow-lg flex items-center justify-center hover:bg-elevated transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous products"
        @click="prevSlide"
        variant="outline"
        color="neutral"
        square
      >
        <UIcon name="i-lucide-chevron-left" class="size-5 text-muted" />
      </UButton>

      <!-- Scroll track -->
      <div
        ref="carouselRef"
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        style="scrollbar-width: none; -ms-overflow-style: none; padding-left: max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem)); padding-right: max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem)); scroll-padding-left: max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem));"
      >
          <div
            v-for="product in products"
            :key="product.id"
            data-card
            class="snap-start rounded-2xl border p-8 flex flex-col gap-6 transition-all duration-300 hover:shadow-lg"
            :class="[productColorMap[product.color].bg, productColorMap[product.color].border]"
            :style="cardStyle"
          >
            <!-- Icon + badge -->
            <div class="flex items-start justify-between">
              <div class="size-12 rounded-xl flex items-center justify-center shadow-sm" :class="productColorMap[product.color].icon">
                <UIcon :name="product.icon" class="size-6 text-white" />
              </div>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full" :class="productColorMap[product.color].badge">
                {{ product.name }}
              </span>
            </div>

            <!-- Content -->
            <div>
              <h3 class="text-xl font-bold text-highlighted mb-1">{{ product.fullName }}</h3>
              <p class="text-sm font-medium mb-3" :class="productColorMap[product.color].text">{{ product.tagline }}</p>
              <p class="text-muted text-sm leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- Feature list -->
            <ul class="space-y-2 flex-1">
              <li
                v-for="feature in product.features"
                :key="feature"
                class="flex items-center gap-2 text-sm text-muted"
              >
                <UIcon name="i-lucide-check" class="size-4 shrink-0" :class="productColorMap[product.color].text" />
                {{ feature }}
              </li>
            </ul>

            <!-- CTA -->
            <UButton
              :id="`product-cta-${product.id}`"
              :to="product.to"
              :color="(product.color as any)"
              variant="outline"
              size="lg"
              block
            >
              {{ product.ctaLabel }}
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </template>
            </UButton>
          </div>

          <!-- Coming Soon Card -->
          <div
            data-card
            class="snap-start rounded-2xl border border-dashed border-white/10 p-8 flex flex-col gap-6 relative overflow-hidden"
            :style="[cardStyle, { background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }]"
          >
            <!-- Animated background glow -->
            <div class="absolute inset-0 pointer-events-none">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 rounded-full bg-primary/10 blur-3xl animate-pulse" />
            </div>

            <!-- Faded content overlay -->
            <div class="relative z-10 flex flex-col items-center justify-center h-full gap-6 text-center py-8">
              <!-- Icon -->
              <div class="size-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shadow-inner">
                <UIcon name="i-lucide-sparkles" class="size-7 text-primary/60 animate-pulse" />
              </div>

              <!-- Badge -->
              <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary/70 border border-primary/20 uppercase tracking-widest">
                <span class="size-1.5 rounded-full bg-primary/60 animate-ping" />
                Coming Soon
              </span>

              <!-- Text -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-highlighted/40">More Products</h3>
                <p class="text-sm text-muted/50 leading-relaxed max-w-[220px]">
                  We're building more powerful tools to complete your enterprise ecosystem.
                </p>
              </div>

              <!-- Feature placeholders -->
              <ul class="space-y-3 w-full flex-1">
                <li v-for="i in 3" :key="i" class="flex items-center gap-3">
                  <div class="size-4 rounded-full bg-white/5 shrink-0" />
                  <div class="h-2.5 rounded-full bg-white/5 flex-1" :style="{ width: `${55 + i * 10}%` }" />
                </li>
              </ul>

              <!-- Locked CTA -->
              <div class="w-full rounded-xl border border-white/8 bg-white/3 py-3 flex items-center justify-center gap-2 text-sm text-muted/40 font-medium">
                <UIcon name="i-lucide-lock" class="size-4" />
                Unlock Soon
              </div>
            </div>
          </div>
      </div>

      <!-- Next button -->
      <UButton
        v-if="activeIndex < maxIndex"
        class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full shadow-lg flex items-center justify-center hover:bg-elevated transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next products"
        @click="nextSlide"
        variant="outline"
        color="neutral"
        square
      >
        <UIcon name="i-lucide-chevron-right" class="size-5 text-muted" />
      </UButton>
    </div>

    <!-- Dot indicators -->
    <div class="flex justify-center gap-2 mt-8">
      <button
        v-for="i in maxIndex + 1"
        :key="i"
        class="h-2 rounded-full transition-all duration-300"
        :class="activeIndex === i - 1 ? 'w-6 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground'"
        :aria-label="`Go to slide ${i}`"
        @click="scrollToIndex(i - 1)"
      />
    </div>
  </section>

  <!-- ─── Why CCCI / Features Grid ────────────────────────────────────── -->
  <div
    ref="featuresEl"
    class="bg-muted/30 section-reveal"
    :class="{ 'is-visible': featuresVisible }"
  >
    <UPageSection id="features">
      <template #headline>
        <h4 class="reveal-down text-primary text-sm font-semibold uppercase tracking-widest mb-3 text-center">Why CCCI</h4>
      </template>
      <template #title>
        <h2 class="reveal-up reveal-delay-150 text-4xl font-extrabold text-highlighted tracking-tight mb-4">Everything your organization needs to go digital</h2>
      </template>
      <template #description>
        <p class="reveal-up reveal-delay-300">
          From a single startup to a multi-campus university — CCCI's platform grows with you, stays locally compliant, and keeps your teams productive.
        </p>
      </template>
      <template #features>
        <UPageFeature
          v-for="(feature, i) in whyFeatures"
          :key="feature.title"
          v-bind="feature"
          class="reveal-up"
          :style="{ animationDelay: `${400 + i * 120}ms` }"
        />
      </template>
    </UPageSection>
  </div>

  <!-- ─── Stats Banner ─────────────────────────────────────────────────── -->
  <div
    ref="statsEl"
    class="bg-primary dark:bg-primary/60 py-20 section-reveal"
    :class="{ 'is-visible': statsVisible2 }"
  >
    <UContainer>
      <div ref="statsContainer" class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="reveal-up"
          :style="{ animationDelay: `${i * 120}ms` }"
        >
          <p class="text-4xl lg:text-5xl font-extrabold text-white">
            {{ (stat.target * statsProgress).toFixed(stat.decimals) }}{{ stat.suffix }}
          </p>
          <p class="text-white/70 mt-2 text-sm lg:text-base font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- ─── How It Works ─────────────────────────────────────────────────── -->
  <section
    id="how-it-works"
    ref="howItWorksEl"
    class="py-24 min-h-screen flex flex-col justify-center section-reveal"
    :class="{ 'is-visible': howItWorksVisible }"
  >
    <UContainer>
      <div class="text-center mb-16">
        <p class="reveal-down text-primary text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
        <h2 class="reveal-up reveal-delay-150 text-4xl font-extrabold text-highlighted tracking-tight mb-4">
          Up and running in weeks, not months
        </h2>
        <p class="reveal-up reveal-delay-300 text-muted text-lg max-w-2xl mx-auto">
          We handle the heavy lifting so your team can focus on what matters. Our proven onboarding process gets you live quickly with zero disruption.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.step"
          class="flex flex-col items-center text-center gap-5 relative"
          :class="[
            index === 0 ? 'reveal-left reveal-delay-200' : '',
            index === 1 ? 'reveal-up reveal-delay-300' : '',
            index === 2 ? 'reveal-right reveal-delay-400' : '',
          ]"
        >
          <!-- Connecting line to next item (desktop only) -->
          <div
            v-if="index < steps.length - 1"
            class="hidden md:block absolute top-10 left-[calc(50%+3.5rem)] w-[calc(100%-5rem)] h-px bg-primary/20"
          />
          <div class="relative">
            <div class="size-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <UIcon :name="step.icon" class="size-9 text-primary" />
            </div>
            <span class="absolute -top-3 -right-3 size-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
              {{ step.step }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-highlighted mb-2">{{ step.title }}</h3>
            <p class="text-muted text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ─── About ─────────────────────────────────────────────────────────── -->
  <div
    id="about"
    ref="aboutEl"
    class="bg-muted/30 min-h-screen flex flex-col justify-center section-reveal"
    :class="{ 'is-visible': aboutVisible }"
  >
    <UPageSection orientation="horizontal">
      <template #headline>
        <h4 class="reveal-down text-primary text-sm font-semibold uppercase tracking-widest mb-3">About CCCI</h4>
      </template>
      <template #title>
        <h2 class="reveal-up reveal-delay-150 text-4xl font-extrabold text-highlighted tracking-tight mb-4">Built in the Philippines, for the Philippines</h2>
      </template>
      <template #description>
        <p class="reveal-up reveal-delay-300">
          Founded in 2020, Centralized Cloud Computing International Inc. started with a single mission: make enterprise-grade software accessible to every Philippine organization — from small businesses to large universities. Today, we serve 500+ clients nationwide with a team of 80+ engineers, implementation specialists, and support staff based in Manila.
        </p>
      </template>
      <div class="reveal-right reveal-delay-200 rounded-2xl bg-muted border border-default p-8 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-accented/40 p-5 text-center">
            <p class="text-3xl font-extrabold text-highlighted">2020</p>
            <p class="text-muted text-xs mt-1 font-medium">Founded</p>
          </div>
          <div class="rounded-xl bg-accented/40 p-5 text-center">
            <p class="text-3xl font-extrabold text-highlighted">80+</p>
            <p class="text-muted text-xs mt-1 font-medium">Team Members</p>
          </div>
          <div class="rounded-xl bg-accented/40 p-5 text-center">
            <p class="text-3xl font-extrabold text-highlighted">Manila</p>
            <p class="text-muted text-xs mt-1 font-medium">Headquarters</p>
          </div>
          <div class="rounded-xl bg-accented/40 p-5 text-center">
            <p class="text-3xl font-extrabold text-highlighted">6</p>
            <p class="text-muted text-xs mt-1 font-medium">Core Products</p>
          </div>
        </div>
        <p class="text-muted text-sm leading-relaxed">
          Our team brings deep expertise in cloud engineering, Philippine regulatory compliance, and change management — ensuring every implementation succeeds.
        </p>
        <UButton
          id="about-cta"
          label="Meet Our Team"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </UPageSection>
  </div>

  <!-- ─── Testimonials ─────────────────────────────────────────────────── -->
  <div
    ref="testimonialsEl"
    class="min-h-screen flex flex-col justify-center section-reveal"
    :class="{ 'is-visible': testimonialsVisible }"
  >
  <UPageSection id="testimonials">
    <template #headline>
      <h4 class="reveal-down text-primary text-sm font-semibold uppercase tracking-widest mb-3 text-center">Customer Stories</h4>
    </template>
    <template #title>
      <h2 class="reveal-up reveal-delay-150 text-4xl font-extrabold text-highlighted tracking-tight mb-4">Trusted by leaders across industries</h2>
    </template>
    <template #description>
      <p class="reveal-up reveal-delay-300">From HR directors to school registrars — here's what organizations say about switching to CCCI.</p>
    </template>
    <UPageGrid>
      <UCard
        v-for="(t, i) in testimonials"
        :key="t.author"
        class="reveal-up"
        :style="{ animationDelay: `${400 + i * 150}ms` }"
      >
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between mb-5">
            <div class="flex gap-0.5">
              <UIcon v-for="j in 5" :key="j" name="i-lucide-star" class="size-4 text-warning" />
            </div>
            <UBadge :label="t.product" color="neutral" variant="subtle" size="sm" />
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
  </div>

  <!-- ─── Contact / CTA ─────────────────────────────────────────────────── -->
  <div
    id="contact"
    ref="ctaEl"
    class="bg-muted/30 section-reveal"
    :class="{ 'is-visible': ctaVisible }"
  >
    <UPageSection>
      <UPageCTA id="cta-main" class="reveal-up">
        <template #title>
          <h2 class="reveal-up reveal-delay-200 text-4xl font-extrabold text-highlighted tracking-tight mb-4">Ready to transform your organization?</h2>
        </template>
        <template #description>
          <p class="reveal-up reveal-delay-300">Join 500+ Philippine companies and schools using CCCI to automate HR, deliver learning, and manage campuses — all from one cloud platform. Book a free demo with our local team today.</p>
        </template>
        <template #links>
          <div class="reveal-up reveal-delay-400 flex flex-wrap justify-center gap-3">
            <UButton
              size="lg"
              trailing-icon="i-lucide-calendar"
              @click="useDemoModal().open()"
            >
              Book a Free Demo
            </UButton>
            <UButton
              size="lg"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-phone"
            >
              Talk to Sales
            </UButton>
          </div>
        </template>
      </UPageCTA>
    </UPageSection>
  </div>
</template>