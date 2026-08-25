<script setup lang="ts">
definePageMeta({
  title: 'LinkagesCore by CCCI',
  layout: 'product',
})

useSeoMeta({
  title: 'LinkagesCore — International Linkages Management System',
  description: 'Manage global partnerships, MOUs, student exchange programs, and international grants in one unified directory.',
})

const features = [
  {
    title: 'Centralized Partnership Directory',
    description: 'A searchable database of all your partner institutions, complete with regional mapping, focal points, and active agreements.',
    icon: 'i-lucide-building-2',
  },
  {
    title: 'MOU & Agreement Lifecycle',
    description: 'Track the full lifecycle of MOUs and MOAs. Get automated alerts before agreements expire, ensuring partnerships remain active and compliant.',
    icon: 'i-lucide-file-signature',
  },
  {
    title: 'Student & Faculty Mobility',
    description: 'Manage inbound and outbound exchange applications, visa requirements, travel itineraries, and academic credit transfers.',
    icon: 'i-lucide-plane',
  },
  {
    title: 'Grants & Funding Management',
    description: 'Monitor international research grants, scholarships, and joint funding opportunities with a dedicated financial tracking module.',
    icon: 'i-lucide-badge-dollar-sign',
  },
  {
    title: 'Global Analytics & Reporting',
    description: 'Generate comprehensive reports on internationalization metrics for CHED, accreditation bodies, or internal reviews with one click.',
    icon: 'i-lucide-pie-chart',
  },
  {
    title: 'Secure Access & Permissions',
    description: 'Role-based access ensures sensitive partnership data and student information is only visible to authorized personnel.',
    icon: 'i-lucide-shield-check',
  },
]

const stats = [
  { value: '42', label: 'Countries Represented' },
  { value: '142+', label: 'Active Partnerships' },
  { value: '80%', label: 'Less Admin Work' },
  { value: '0', label: 'Expired MOUs Missed' },
]

const testimonials = [
  {
    quote: 'LinkagesCore transformed our internationalization efforts. Before, tracking MOUs across different colleges was a nightmare. Now, everything is centralized and we never miss a renewal deadline.',
    author: 'Dr. Roberto Mendoza',
    role: 'VP for International Affairs, Manila State University',
    initials: 'RM',
  },
  {
    quote: 'Managing student exchange programs used to involve endless email threads and lost documents. The mobility module streamlines the entire application and visa tracking process.',
    author: 'Elena Cruz',
    role: 'Mobility Coordinator, Global Institute of Tech',
    initials: 'EC',
  },
  {
    quote: 'When preparing for our international accreditation, the analytics dashboard saved us weeks of work. We generated comprehensive reports on our global footprint in just a few clicks.',
    author: 'Prof. Sarah Lin',
    role: 'Director of Strategic Partnerships, Apex College',
    initials: 'SL',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'Perfect for institutions beginning their internationalization journey.',
    price: '₱25,000',
    interval: 'mo',
    features: [
      'Up to 50 active partnerships',
      'Basic MOU tracking & alerts',
      'Standard directory',
      'Email support',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing universities with active exchange programs.',
    price: '₱50,000',
    interval: 'mo',
    highlight: true,
    features: [
      'Unlimited partnerships',
      'Student & Faculty Mobility module',
      'Grants & Funding tracking',
      'Advanced reporting',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Custom solutions for university systems and large networks.',
    price: 'Custom',
    features: [
      'Multi-campus management',
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
  { name: 'i-simple-icons-apple', label: 'Apple' },
  { name: 'i-simple-icons-accenture', label: 'Accenture' },
  { name: 'i-simple-icons-salesforce', label: 'Salesforce' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing LinkagesCore"
    title="International Linkages Management System"
    description="Manage global partnerships, MOUs, student exchange programs, and international grants in one unified directory."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenIlspDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by organizations worldwide for global collaboration
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
    title="Everything you need for global partnerships"
    description="From managing MOUs to facilitating student exchanges — handle the entire internationalization lifecycle."
    :features="features"
  />

  <!-- Feature detail: Partnerships -->
  <UPageSection
    title="A single source of truth for all partnerships"
    description="Stop tracking global linkages across fragmented spreadsheets. LinkagesCore provides a centralized directory of all your partner institutions, active MOUs, and regional footprints, instantly accessible to authorized staff."
    orientation="horizontal"
  >
    <MockupScreenIlspPartnerships />
  </UPageSection>

  <!-- Feature detail: Mobility -->
  <UPageSection
    title="Streamline student & faculty mobility"
    description="Manage the complexities of inbound and outbound exchange programs effortlessly. Track application statuses, monitor visa requirements, and ensure students are well-prepared before departure, all from a single dashboard."
    orientation="horizontal"
    reverse
  >
    <MockupScreenIlspMobility />
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
    title="Loved by international affairs teams"
    description="Hear how LinkagesCore has helped universities expand their global footprint and secure vital partnerships."
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
      title="Straightforward pricing for every institution"
      description="Choose the plan that fits your global expansion goals."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to expand your global reach?"
    description="Join leading institutions using LinkagesCore to secure partnerships and manage international programs."
    :links="ctaLinks"
  />
</template>
