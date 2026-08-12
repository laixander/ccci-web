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
  { target: 3, suffix: '', label: 'Enterprise Products', decimals: 0 },
]

type ProductColor = 'green' | 'violet' | 'amber'

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
}
</script>

<template>
  <canvas ref="bgCanvas" class="fixed inset-0 pointer-events-none z-[-1] opacity-60 dark:opacity-40 mix-blend-screen dark:mix-blend-lighten" />

  <!-- Background decoration -->
  <div class="grid-overlay fixed inset-0 -z-10 pointer-events-none" />

  <!-- ─── Hero ─────────────────────────────────────────────────────────── -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
    <div class="absolute top-0 right-0 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/3" />

    <UContainer class="py-24 md:py-32">
      <div class="mx-auto max-w-3xl text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated px-4 py-1.5 text-sm font-medium text-muted mb-8">
          <span class="size-2 rounded-full bg-primary animate-pulse" />
          Trusted by 500+ Philippine organizations
        </div>

        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-highlighted leading-[1.05] mb-6">
          Enterprise Cloud Software,
          <span class="text-primary">Built for the Philippines</span>
        </h1>

        <p class="text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-10">
          CCCI delivers HRIS, LMS, and Campus Management in one unified platform — locally compliant, cloud-native, and built to scale with every Philippine organization.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
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
  <div class="border-y border-default bg-muted/40 py-10 overflow-hidden">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by leading organizations
      </p>
    </UContainer>
    <div 
      class="w-full flex overflow-hidden group"
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
  <section id="products" class="py-24">
    <UContainer>
      <div class="text-center mb-16">
        <p class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Products</p>
        <h2 class="text-4xl font-extrabold text-highlighted tracking-tight mb-4">
          Three Products. One Platform.
        </h2>
        <p class="text-muted text-lg max-w-2xl mx-auto">
          Whether you're running a company, a school, or both — CCCI has the enterprise software to digitize and streamline your operations.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="rounded-2xl border p-8 flex flex-col gap-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          :class="[productColorMap[product.color].bg, productColorMap[product.color].border]"
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
            :color="product.color"
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
      </div>
    </UContainer>
  </section>

  <!-- ─── Why CCCI / Features Grid ────────────────────────────────────── -->
  <div class="bg-muted/30">
    <UPageSection
      id="features"
      headline="Why CCCI"
      title="Everything your organization needs to go digital"
      description="From a single startup to a multi-campus university — CCCI's platform grows with you, stays locally compliant, and keeps your teams productive."
      :features="whyFeatures"
    />
  </div>

  <!-- ─── Stats Banner ─────────────────────────────────────────────────── -->
  <div class="bg-primary dark:bg-primary/60 py-20">
    <UContainer>
      <div ref="statsContainer" class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-4xl lg:text-5xl font-extrabold text-white">
            {{ (stat.target * statsProgress).toFixed(stat.decimals) }}{{ stat.suffix }}
          </p>
          <p class="text-white/70 mt-2 text-sm lg:text-base font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- ─── How It Works ─────────────────────────────────────────────────── -->
  <section class="py-24">
    <UContainer>
      <div class="text-center mb-16">
        <p class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
        <h2 class="text-4xl font-extrabold text-highlighted tracking-tight mb-4">
          Up and running in weeks, not months
        </h2>
        <p class="text-muted text-lg max-w-2xl mx-auto">
          We handle the heavy lifting so your team can focus on what matters. Our proven onboarding process gets you live quickly with zero disruption.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.step"
          class="flex flex-col items-center text-center gap-5 relative"
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
  <div id="about" class="bg-muted/30">
    <UPageSection
      headline="About CCCI"
      title="Built in the Philippines, for the Philippines"
      description="Founded in 2020, Centralized Cloud Computing International Inc. started with a single mission: make enterprise-grade software accessible to every Philippine organization — from small businesses to large universities. Today, we serve 500+ clients nationwide with a team of 80+ engineers, implementation specialists, and support staff based in Manila."
      orientation="horizontal"
    >
      <div class="rounded-2xl bg-muted border border-default p-8 space-y-6">
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
            <p class="text-3xl font-extrabold text-highlighted">3</p>
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
  <UPageSection
    id="testimonials"
    headline="Customer Stories"
    title="Trusted by leaders across industries"
    description="From HR directors to school registrars — here's what organizations say about switching to CCCI."
  >
    <UPageGrid>
      <UCard v-for="t in testimonials" :key="t.author">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between mb-5">
            <div class="flex gap-0.5">
              <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-4 text-warning" />
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

  <!-- ─── Contact / CTA ─────────────────────────────────────────────────── -->
  <div id="contact" class="bg-muted/30">
    <UPageSection>
      <UPageCTA
        id="cta-main"
        title="Ready to transform your organization?"
        description="Join 500+ Philippine companies and schools using CCCI to automate HR, deliver learning, and manage campuses — all from one cloud platform. Book a free demo with our local team today."
        :links="[{
          label: 'Book a Free Demo',
          size: 'lg',
          trailingIcon: 'i-lucide-calendar',
          onClick: () => useDemoModal().open(),
        }, {
          label: 'Talk to Sales',
          color: 'neutral',
          variant: 'subtle',
          size: 'lg',
          trailingIcon: 'i-lucide-phone',
        }]"
      />
    </UPageSection>
  </div>
</template>