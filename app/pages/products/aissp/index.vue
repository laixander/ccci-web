<script setup lang="ts">
definePageMeta({
  title: 'AISSP by CCCI',
  layout: 'aissp',
})

useSeoMeta({
  title: 'AISSP — Automated Information Systems Strategic Plan',
  description: 'Align your organization\'s ICT projects with strategic goals. Track systems, budgets, and compliance effortlessly.',
})

const features = [
  {
    title: 'Strategic ICT Alignment',
    description: 'Ensure every IT project supports your core mandate. Map systems to strategic objectives and track progress in real-time.',
    icon: 'i-lucide-target',
  },
  {
    title: 'Resource & Budget Tracking',
    description: 'Manage procurement timelines, allocate budgets effectively, and prevent overspending on redundant systems.',
    icon: 'i-lucide-wallet',
  },
  {
    title: 'System Lifecycle Management',
    description: 'Track the status of all automated information systems from proposal and development to deployment and retirement.',
    icon: 'i-lucide-monitor',
  },
  {
    title: 'Compliance & Audit Trails',
    description: 'Stay compliant with government mandates (e.g., DICT requirements). Maintain an audit trail for every ICT investment.',
    icon: 'i-lucide-shield-check',
  },
  {
    title: 'Risk Management',
    description: 'Identify potential risks in your IT infrastructure and projects before they impact your organization.',
    icon: 'i-lucide-alert-triangle',
  },
  {
    title: 'Executive Dashboards',
    description: 'Provide stakeholders and executives with a high-level view of IT performance, budget utilization, and strategic alignment.',
    icon: 'i-lucide-pie-chart',
  },
]

const stats = [
  { value: '100%', label: 'Compliance Rate' },
  { value: '30%', label: 'Budget Saved' },
  { value: '50+', label: 'Systems Managed' },
  { value: '24/7', label: 'Real-time Visibility' },
]

const testimonials = [
  {
    quote: 'AISSP has been instrumental in aligning our IT initiatives with the agency\'s goals. The budget tracking feature alone saved us from overspending on duplicate systems.',
    author: 'Mark Rivera',
    role: 'Chief Information Officer, Govt Agency',
    initials: 'MR',
  },
  {
    quote: 'Preparing our ISSP for DICT used to be a nightmare of spreadsheets. With this platform, compliance reporting is just a click away.',
    author: 'Sarah Jenkins',
    role: 'IT Director, Regional Office',
    initials: 'SJ',
  },
  {
    quote: 'The executive dashboards give our leadership complete visibility into our ICT investments, ensuring we are always on track with our strategic mandate.',
    author: 'Dr. Alan Chua',
    role: 'Director of Strategic Planning, Metro Institute',
    initials: 'AC',
  },
]

const plans = [
  {
    title: 'Basic',
    description: 'For small agencies starting their strategic planning.',
    price: '₱30,000',
    interval: 'mo',
    features: [
      'Up to 10 Systems tracked',
      'Basic Budget tracking',
      'Standard compliance reports',
      'Email support',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing organizations with complex IT portfolios.',
    price: '₱60,000',
    interval: 'mo',
    highlight: true,
    features: [
      'Unlimited Systems',
      'Advanced Risk Management',
      'Executive Dashboards',
      'Audit Trails',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Custom solutions for large departments and bureaus.',
    price: 'Custom',
    features: [
      'Multi-agency consolidation',
      'Custom API integrations',
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
  { name: 'i-simple-icons-ibm', label: 'IBM' },
  { name: 'i-simple-icons-cisco', label: 'Cisco' },
  { name: 'i-simple-icons-oracle', label: 'Oracle' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing AISSP"
    title="Automated Information Systems Strategic Plan"
    description="Align your organization's ICT projects with strategic goals. Track systems, budgets, and compliance effortlessly."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenAisspDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by organizations worldwide for ICT Governance
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
    title="Everything you need for Strategic IT Planning"
    description="From managing budgets to ensuring compliance — handle the entire ICT lifecycle."
    :features="features"
  />

  <!-- Feature detail: Projects -->
  <UPageSection
    title="Track every ICT system from proposal to retirement"
    description="Maintain a complete registry of all automated information systems across your organization. Monitor procurement timelines, development phases, and deployment status in a single unified view — no more spreadsheets."
    orientation="horizontal"
  >
    <MockupScreenAisspProjects />
  </UPageSection>

  <!-- Feature detail: Compliance -->
  <UPageSection
    title="DICT compliance, always audit-ready"
    description="Stay ahead of government mandates with built-in ISSP compliance checklists, automated audit trails for every ICT investment, and one-click report generation for DICT submission. Never scramble at deadline time again."
    orientation="horizontal"
    reverse
  >
    <MockupScreenAisspCompliance />
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
    title="Loved by IT Leaders"
    description="Hear how AISSP has helped organizations align their technology with their mission."
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
      title="Straightforward pricing for every organization"
      description="Choose the plan that fits your strategic planning goals."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to align your IT strategy?"
    description="Join leading institutions using AISSP to manage their ICT investments."
    :links="ctaLinks"
  />
</template>
