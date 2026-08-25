<script setup lang="ts">
definePageMeta({
  title: 'ExecIS by CCCI',
  layout: 'product',
})

useSeoMeta({
  title: 'ExecIS — Executive Information System',
  description: 'Give executives a real-time, consolidated view of your organization\'s performance — KPIs, forecasts, and critical alerts in one premium dashboard.',
})

const features = [
  {
    title: 'Consolidated KPI Dashboard',
    description: 'See the entire organization\'s performance in a single view. Monitor critical KPIs across HR, Finance, Campus, and Operations in real time.',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    title: 'Cross-Module Data Aggregation',
    description: 'Pull data from HRIS, LMS, CMS, DMS, and AMS into one unified executive view, eliminating information silos.',
    icon: 'i-lucide-layers',
  },
  {
    title: 'Predictive Forecasting',
    description: 'AI-powered trend analysis to project headcount, budget utilization, student enrollment, and revenue for the next quarter or fiscal year.',
    icon: 'i-lucide-trending-up',
  },
  {
    title: 'Executive Reports',
    description: 'Generate one-click board-ready reports in PDF or Excel. Schedule automated email delivery to stakeholders.',
    icon: 'i-lucide-file-bar-chart',
  },
  {
    title: 'Critical Alerts & Thresholds',
    description: 'Set thresholds for key metrics and receive instant alerts when KPIs fall below target — before small issues become major problems.',
    icon: 'i-lucide-bell',
  },
  {
    title: 'Secure & Role-Based Access',
    description: 'Ensure sensitive organizational data is only visible to authorized executives and board members with granular role-based access control.',
    icon: 'i-lucide-shield-check',
  },
]

const stats = [
  { value: '80%', label: 'Faster Decision Making' },
  { value: '1 View', label: 'For All Modules' },
  { value: '99.9%', label: 'Data Accuracy' },
  { value: '< 5s', label: 'Dashboard Load Time' },
]

const testimonials = [
  {
    quote: 'ExecIS changed how our board prepares for meetings. Instead of compiling reports from five different systems, everything is in one screen. The forecasting module alone has paid for itself.',
    author: 'Emmanuel Torres',
    role: 'President, Apex University System',
    initials: 'ET',
  },
  {
    quote: 'As a CEO overseeing multiple subsidiaries, I need instant visibility into everything. ExecIS gives me exactly that — real-time KPIs and intelligent alerts the moment something goes off track.',
    author: 'Patricia Lim',
    role: 'CEO, NovaCorp Holdings',
    initials: 'PL',
  },
  {
    quote: 'The cross-module reporting is a game changer. I can drill down from a headline HR metric all the way to individual department-level data in seconds. Incredible product.',
    author: 'Dr. Jose Reyes',
    role: 'Executive Vice President, Metro Health Group',
    initials: 'JR',
  },
]

const plans = [
  {
    title: 'Professional',
    description: 'For organizations with up to 3 integrated modules.',
    price: '₱45,000',
    interval: 'mo',
    features: [
      'Up to 3 module integrations',
      'Standard KPI dashboards',
      'Monthly executive reports',
      'Email alerts',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Full integration across all CCCI modules.',
    price: '₱90,000',
    interval: 'mo',
    highlight: true,
    features: [
      'Unlimited module integrations',
      'AI Forecasting',
      'Custom KPI builder',
      'Board-ready report templates',
      'Priority support',
    ],
  },
  {
    title: 'Custom',
    description: 'Tailored for large corporations and multi-campus systems.',
    price: 'Custom',
    features: [
      'Multi-entity consolidation',
      'Custom data connectors',
      'Dedicated analyst support',
      'On-premise deployment option',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'Explore Features', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-amazon', label: 'Amazon' },
  { name: 'i-simple-icons-ibm', label: 'IBM' },
  { name: 'i-simple-icons-cisco', label: 'Cisco' },
  { name: 'i-simple-icons-oracle', label: 'Oracle' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing ExecIS"
    title="Executive Information System"
    description="Give executives a real-time, consolidated view of your organization's performance — KPIs, forecasts, and critical alerts in one premium dashboard."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenEisDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by executive leadership worldwide
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        <UIcon v-for="logo in logoIcons" :key="logo.name" :name="logo.name" :aria-label="logo.label" class="size-7 text-muted" />
      </div>
    </UContainer>
  </div>

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Features"
    title="Everything a top executive needs"
    description="From real-time KPIs to AI-powered forecasting — make strategic decisions backed by data."
    :features="features"
  />

  <!-- Feature detail: Forecasting -->
  <UPageSection
    title="AI-powered forecasting for smarter strategy"
    description="Stop reacting to yesterday's data. ExecIS uses AI to project your next quarter's revenue, headcount, and budget utilization with over 90% confidence. Get ahead of problems before they surface and plan with precision."
    orientation="horizontal"
  >
    <MockupScreenEisForecasting />
  </UPageSection>

  <!-- Feature detail: Reports -->
  <UPageSection
    title="Board-ready reports, delivered automatically"
    description="Generate consolidated executive reports across all CCCI modules in seconds. Schedule automated delivery to board members and stakeholders — with custom branding, drill-down KPIs, and export to PDF or Excel."
    orientation="horizontal"
    reverse
  >
    <MockupScreenEisReports />
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
    title="Loved by leaders everywhere"
    description="Hear how ExecIS has transformed executive decision-making across industries."
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
      title="Investment-grade plans for every leadership team"
      description="Choose the plan that matches the scale of your organization."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to lead with data?"
    description="Join leading organizations using ExecIS for strategic intelligence and executive decision-making."
    :links="ctaLinks"
  />
</template>
