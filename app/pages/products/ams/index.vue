<script setup lang="ts">
definePageMeta({ layout: 'ams' })
const features = [
  {
    title: 'Asset Tracking',
    description: 'Real-time tracking of all corporate assets. Know where your equipment is at all times.',
    icon: 'i-lucide-box',
  },
  {
    title: 'Maintenance Scheduling',
    description: 'Automated maintenance scheduling and alerts to prevent costly downtime.',
    icon: 'i-lucide-calendar-clock',
  },
  {
    title: 'Depreciation Calculation',
    description: 'Automatically calculate asset depreciation over time with multiple standard methods.',
    icon: 'i-lucide-trending-down',
  },
  {
    title: 'Inventory Management',
    description: 'Comprehensive inventory control and auditing capabilities to ensure accurate records.',
    icon: 'i-lucide-clipboard-list',
  },
  {
    title: 'Barcode Scanning',
    description: 'Integrated barcode and QR code scanning for quick lookups and updates via mobile.',
    icon: 'i-lucide-scan-line',
  },
  {
    title: 'Reporting & Analytics',
    description: 'Detailed reports on asset utilization, lifecycle costs, and procurement planning.',
    icon: 'i-lucide-bar-chart-3',
  },
]

const stats = [
  { value: '1M+', label: 'Assets Tracked' },
  { value: '5k+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'Enterprise', label: 'Security Grade' },
]

const testimonials = [
  {
    quote: 'AssetCore gave us complete visibility into our hardware inventory. We saved thousands by reallocating unused equipment instead of buying new.',
    author: 'David Wright',
    role: 'IT Director, GlobalTech',
    initials: 'DW',
  },
  {
    quote: 'The automated maintenance schedules have reduced our equipment downtime by 40%. It essentially pays for itself.',
    author: 'Sarah Jenkins',
    role: 'Operations Manager, BuildCorp',
    initials: 'SJ',
  },
  {
    quote: 'Depreciation calculations used to take weeks of spreadsheet wrangling. Now it is just a click of a button at month-end.',
    author: 'Michael Chen',
    role: 'CFO, Vertex Innovations',
    initials: 'MC',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'For small businesses managing up to 1,000 assets.',
    price: '₱2,999',
    features: [
      'Up to 5 users',
      '1,000 Assets',
      'Basic reporting',
      'Standard email support',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing companies with complex tracking needs.',
    price: '₱7,999',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 25 users',
      '10,000 Assets',
      'Barcode/QR code scanning',
      'Maintenance scheduling',
      'Depreciation tracking',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For large organizations with extensive asset portfolios.',
    price: 'Custom',
    features: [
      'Unlimited users',
      'Unlimited Assets',
      'Advanced API integrations',
      'Custom workflows',
      'Dedicated success manager',
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
  { name: 'i-simple-icons-apple', label: 'Apple' },
  { name: 'i-simple-icons-accenture', label: 'Accenture' },
  { name: 'i-simple-icons-salesforce', label: 'Salesforce' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing AssetCore"
    title="Intelligent Asset Management System"
    description="Track, manage, and optimize your organization's physical and digital assets in one unified platform."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenAmsDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by organizations worldwide for intelligent asset tracking
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
    title="Everything you need for asset control"
    description="From procurement to disposal — manage the entire asset lifecycle efficiently."
    :features="features"
  />

  <!-- Feature detail: Asset Tracking -->
  <UPageSection
    title="One place for every asset you own"
    description="Stop losing track of equipment across departments. AssetCore gives you a single searchable registry of every physical and digital asset — with real-time location, assignment history, and lifecycle status visible at a glance."
    orientation="horizontal"
  >
    <MockupScreenAmsAssets />
  </UPageSection>

  <!-- Feature detail: Analytics -->
  <UPageSection
    title="Analytics that drive smarter procurement"
    description="Turn your asset data into strategic insights. Track utilization rates, depreciation schedules, and total cost of ownership across your entire portfolio. Spot underused assets and make data-driven decisions on when to repair, retire, or replace."
    orientation="horizontal"
    reverse
  >
    <MockupScreenAmsAnalytics />
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
    title="Loved by teams across industries"
    description="Hear how AssetCore has helped organizations eliminate waste, reduce downtime, and ensure accurate tracking."
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
      title="Straightforward pricing for every team"
      description="Choose the plan that fits your organization's asset management needs."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to take control of your assets?"
    description="Join thousands of organizations using AssetCore to optimize their resources and improve tracking."
    :links="ctaLinks"
  />
</template>
