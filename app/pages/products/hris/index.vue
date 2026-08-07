<script setup lang="ts">
const features = [
  {
    title: 'Smart Payroll',
    description: 'Automate payroll calculations, tax filings, and statutory compliance with pinpoint accuracy. Zero errors, every cycle.',
    icon: 'i-lucide-banknote',
  },
  {
    title: 'Time & Attendance',
    description: 'Real-time tracking with biometric support, geo-fencing, and flexible shift scheduling for any work model.',
    icon: 'i-lucide-clock',
  },
  {
    title: 'Talent Acquisition',
    description: 'Manage the full recruitment pipeline from job posting to seamless day-one onboarding, all in one place.',
    icon: 'i-lucide-user-plus',
  },
  {
    title: 'Performance Management',
    description: 'Set OKRs, run 360° reviews, identify top performers, and build high-performing teams systematically.',
    icon: 'i-lucide-trending-up',
  },
  {
    title: 'Employee Self-Service',
    description: 'Empower employees to manage leave, view payslips, and update their profiles from anywhere, any device.',
    icon: 'i-lucide-user-cog',
  },
  {
    title: 'HR Analytics',
    description: 'Data-driven insights with real-time dashboards, custom reports, and predictive workforce analytics.',
    icon: 'i-lucide-bar-chart-2',
  },
]

const stats = [
  { value: '50,000+', label: 'Employees Managed' },
  { value: '1,200+', label: 'Companies Trust Us' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '60%', label: 'Less HR Admin Time' },
]

const testimonials = [
  {
    quote: 'PeopleCore transformed how we manage our 300-person team. Payroll that used to take 3 days now takes 30 minutes. The ROI was immediate.',
    author: 'Sarah Chen',
    role: 'VP of HR, TechGrowth Inc.',
    initials: 'SC',
  },
  {
    quote: "From onboarding to annual reviews, everything just works. Our HR team finally has time for what matters — our people.",
    author: 'Marcus Rivera',
    role: 'COO, Launchpad Ventures',
    initials: 'MR',
  },
  {
    quote: 'The analytics dashboard alone saved us 20 hours a week. We can see turnover risks, costs, and hiring plans — all in real time.',
    author: 'Aisha Patel',
    role: 'HR Director, GlobalRetail Asia',
    initials: 'AP',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'Perfect for small teams getting started with modern HR.',
    price: '$4',
    features: [
      'Up to 50 employees',
      'Core payroll & attendance',
      'Leave management',
      'Employee self-service portal',
      'Email support',
    ],
  },
  {
    title: 'Growth',
    description: 'For scaling teams that need the full HR toolkit.',
    price: '$8',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 500 employees',
      'Everything in Starter',
      'Recruitment & onboarding',
      '360° performance reviews',
      'Advanced analytics & reports',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Custom solutions for large-scale HR operations.',
    price: 'Custom',
    features: [
      'Unlimited employees',
      'Everything in Growth',
      'Custom integrations & API access',
      'Dedicated account manager',
      'On-premise deployment option',
      '99.99% uptime SLA guarantee',
    ],
  },
]

const heroLinks = [
  { label: 'Start Free Trial', to: '#pricing', icon: 'i-lucide-rocket', size: 'xl' as const },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Start Free Trial', icon: 'i-lucide-rocket', size: 'lg' as const },
  { label: 'Schedule a Demo', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-calendar', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-shopify', label: 'Shopify' },
  { name: 'i-simple-icons-stripe', label: 'Stripe' },
  { name: 'i-simple-icons-airbnb', label: 'Airbnb' },
  { name: 'i-simple-icons-slack', label: 'Slack' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing PeopleCore 2.0"
    title="HR Management, Reimagined for Modern Teams"
    description="Streamline every aspect of your workforce — payroll, attendance, recruitment, and performance — in one intelligent platform trusted by 1,200+ companies."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenHrisDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by innovative companies worldwide
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
    title="Everything your HR team needs"
    description="From day-one onboarding to final paycheck — manage the complete employee lifecycle in one unified platform."
    :features="features"
  />

  <!-- Feature detail: Payroll -->
  <UPageSection
    title="Payroll that runs itself"
    description="Say goodbye to spreadsheets and manual calculations. PeopleCore automates every step of your payroll cycle — from time tracking to tax submissions — with zero errors, every time. Multi-currency support, automated compliance filings, and instant payslip delivery included."
    orientation="horizontal"
  >
    <MockupScreenHrisPayroll />
  </UPageSection>

  <!-- Feature detail: Analytics -->
  <UPageSection
    title="Analytics that drive smarter decisions"
    description="Turn your HR data into strategic insights. Real-time dashboards give you full visibility into headcount costs, turnover risks, and performance trends. Spot issues before they become problems and plan hiring with confidence."
    orientation="horizontal"
    reverse
  >
    <MockupScreenHrisAnalytics />
  </UPageSection>

  <!-- Stats banner -->
  <div class="bg-primary py-20">
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
    title="Loved by HR teams everywhere"
    description="Don't just take our word for it — hear from the HR leaders who trust PeopleCore every day."
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
      description="No hidden fees. No surprises. Start free and scale as your team grows. Every plan includes a 30-day free trial."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to transform your HR operations?"
    description="Join 1,200+ companies using PeopleCore to build better workplaces. Start your free 30-day trial — no credit card required."
    :links="ctaLinks"
  />
</template>
