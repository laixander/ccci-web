<script setup lang="ts">
definePageMeta({ layout: 'product' })

useSeoMeta({
  title: 'IRS — Incident Reporting System | SafeReport',
  description: 'Log, track, and analyze workplace accidents, near-misses, and safety hazards in real time. SafeReport by CCCI keeps your organization safe, compliant, and audit-ready — on mobile and desktop.',
})

const features = [
  {
    title: 'One-Tap Incident Logging',
    description: 'Report accidents, near-misses, and hazards from anywhere in seconds — via mobile app or web. Attach photos, videos, GPS location, and witness statements on the spot.',
    icon: 'i-lucide-triangle-alert',
  },
  {
    title: 'Real-Time Tracking & Escalation',
    description: 'Monitor every incident through a structured lifecycle — from initial report to investigation, corrective action, and closure — with automated escalation alerts.',
    icon: 'i-lucide-activity',
  },
  {
    title: 'Root Cause Analysis',
    description: 'Built-in RCA tools including Fishbone diagrams and 5 Whys methodology. Identify systemic causes, not just symptoms, to prevent recurrence.',
    icon: 'i-lucide-search',
  },
  {
    title: 'Corrective Action Management',
    description: 'Assign corrective and preventive actions (CAPA) with due dates, owners, and priority levels. Track completion and verify effectiveness automatically.',
    icon: 'i-lucide-clipboard-check',
  },
  {
    title: 'Safety Analytics & Heatmaps',
    description: 'Visualize incident frequency, type, severity, and location trends. Interactive dashboards and heatmaps reveal your highest-risk areas and times.',
    icon: 'i-lucide-bar-chart-2',
  },
  {
    title: 'Compliance & Audit Reporting',
    description: 'Generate DOLE, BIR, and ISO 45001-aligned safety reports in one click. Maintain a complete, tamper-proof audit trail with timestamped records.',
    icon: 'i-lucide-shield-check',
  },
]

const stats = [
  { value: '300+', label: 'Organizations Protected' },
  { value: '50k+', label: 'Incidents Logged' },
  { value: '72%', label: 'Faster Incident Closure' },
  { value: '100%', label: 'Audit Trail Coverage' },
]

const testimonials = [
  {
    quote: 'SafeReport replaced our paper-based system overnight. Our safety officers now log incidents in under a minute from their phones, and management gets real-time alerts. Lost-time injuries are down 40% since we deployed it.',
    author: 'Engr. Ramon Dela Cruz',
    role: 'EHS Manager, PhilSteel Industrial Corp.',
    initials: 'RD',
  },
  {
    quote: 'The analytics heatmaps alone were worth it. We discovered that 60% of our near-misses happened in one area during one shift. We fixed the root cause, and incidents dropped dramatically. SafeReport paid for itself in a month.',
    author: 'Patricia Navarro',
    role: 'Safety Officer, Batangas Logistics Hub',
    initials: 'PN',
  },
  {
    quote: 'DOLE audit compliance is stressful — but not anymore. SafeReport generates audit-ready reports in seconds, and our entire incident history is always available with a complete chain of custody. Our last DOLE inspection was the smoothest ever.',
    author: 'Atty. Jose Bautista',
    role: 'Compliance Director, Cebu Manufacturing Group',
    initials: 'JB',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'For small teams getting started with digital incident reporting and basic compliance.',
    price: '₱2,000',
    features: [
      'Up to 25 users',
      'Incident logging & tracking',
      'Photo & GPS attachment',
      'Basic reporting',
      'Email notifications',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing organizations that need full investigations, CAPA, and analytics.',
    price: '₱5,500',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 200 users',
      'Everything in Starter',
      'Root Cause Analysis tools',
      'CAPA management',
      'Analytics & heatmaps',
      'DOLE compliance reports',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For multi-site organizations and companies with complex EHS compliance requirements.',
    price: 'Custom',
    features: [
      'Unlimited users & sites',
      'Everything in Professional',
      'Multi-site management',
      'ISO 45001 reporting',
      'Custom integrations & API',
      'Dedicated EHS consultant',
      'On-site onboarding',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'See It in Action', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Talk to an EHS Expert', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-amazon', label: 'Amazon' },
  { name: 'i-simple-icons-apple', label: 'Apple' },
  { name: 'i-simple-icons-meta', label: 'Meta' },
  { name: 'i-simple-icons-siemens', label: 'Siemens' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing SafeReport 2.0"
    title="Workplace Safety, Digitized — Report, Track & Prevent Every Incident"
    description="From factory floors to office buildings — SafeReport gives your EHS team a powerful mobile-first platform to log accidents, near-misses, and hazards in real time. Stay compliant, investigate faster, and prevent the next incident before it happens."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenIrsDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by safety teams across manufacturing, logistics, and construction
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
  </div>

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Features"
    title="Everything your EHS team needs to manage safety end-to-end"
    description="From a single-site SME to a multi-plant enterprise — SafeReport covers the entire incident lifecycle, from first report to final resolution and regulatory compliance."
    :features="features"
  />

  <!-- Feature detail: Mobile reporting -->
  <UPageSection
    title="Report any incident in under 60 seconds — from your phone"
    description="SafeReport's mobile app is built for speed. Your workers can log a near-miss or accident with a photo, GPS pin, and incident type in less than a minute. No paper forms, no delays. Reports land in the safety officer's dashboard instantly, with automated escalation for critical events."
    orientation="horizontal"
  >
    <MockupScreenIrsDashboard />
  </UPageSection>

  <!-- Feature detail: Analytics -->
  <UPageSection
    title="Turn incident data into prevention intelligence"
    description="SafeReport's analytics engine transforms raw incident logs into actionable insights. Spot patterns by location, shift, worker role, or equipment type. Interactive heatmaps reveal your highest-risk zones. Trend charts show whether your safety program is working — or where it needs reinforcement."
    orientation="horizontal"
    reverse
  >
    <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default p-6 space-y-5">
      <!-- Mini analytics mockup -->
      <div class="flex items-center justify-between">
        <p class="text-sm font-bold text-highlighted">Incident Trends — Aug 2026</p>
        <span class="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold">↓ 28% vs last month</span>
      </div>
      <!-- Fake bar chart -->
      <div class="flex items-end gap-2 h-28">
        <div v-for="(bar, i) in [55, 70, 48, 85, 40, 62, 35, 78, 45, 30, 55, 42]" :key="i" class="flex-1 rounded-t-md bg-red-500/20 hover:bg-red-500/40 transition-colors relative group" :style="{ height: bar + '%' }">
          <div class="absolute inset-x-0 top-0 h-1 rounded-t-md bg-red-500 opacity-60" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div v-for="cat in [{ label: 'Slip & Fall', pct: 34, color: 'bg-red-500' }, { label: 'Near-Miss', pct: 28, color: 'bg-orange-500' }, { label: 'Equipment', pct: 22, color: 'bg-amber-500' }]" :key="cat.label" class="rounded-lg p-3 bg-muted/50 border border-default">
          <p class="text-xs text-muted mb-1">{{ cat.label }}</p>
          <p class="text-lg font-extrabold text-highlighted">{{ cat.pct }}%</p>
          <div class="h-1.5 rounded-full bg-muted mt-2">
            <div :class="['h-1.5 rounded-full', cat.color]" :style="{ width: cat.pct + '%' }" />
          </div>
        </div>
      </div>
    </div>
  </UPageSection>

  <!-- Stats banner -->
  <div class="bg-red-600 dark:bg-red-700/70 py-20">
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
    title="Trusted by EHS managers, safety officers, and compliance teams"
    description="Hear from the safety professionals who rely on SafeReport to protect their workforce and stay ahead of regulations."
  >
    <UPageGrid>
      <UCard v-for="t in testimonials" :key="t.author">
        <div class="flex flex-col h-full">
          <div class="flex gap-0.5 mb-5">
            <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-4 text-warning" />
          </div>
          <p class="text-muted italic leading-relaxed flex-1">"{{ t.quote }}"</p>
          <div class="flex items-center gap-3 mt-6 pt-6 border-t border-default">
            <UAvatar :text="t.initials" size="md" color="error" />
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
      title="Simple, transparent pricing — protect every worker"
      description="Whether you're managing 10 employees or 10,000 — SafeReport scales with you. Every plan includes a 30-day free trial and full onboarding support."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to make your workplace safer?"
    description="Join 300+ Philippine organizations using SafeReport to protect their workforce, reduce incidents, and stay compliant. Request your free demo today."
    :links="ctaLinks"
  />
</template>
