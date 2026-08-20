<script setup lang="ts">
definePageMeta({ layout: 'dms' })
const features = [
  {
    title: 'Centralized Document Repository',
    description: 'Store, organize, and manage all your files in one secure, accessible location. Eliminate the chaos of scattered documents and version control issues.',
    icon: 'i-lucide-server',
  },
  {
    title: 'Advanced Search & Retrieval',
    description: 'Find exactly what you need in seconds with powerful full-text search, custom metadata tags, and intelligent OCR (Optical Character Recognition) for scanned documents.',
    icon: 'i-lucide-search',
  },
  {
    title: 'Automated Workflows',
    description: 'Streamline your business processes with custom approval routing, document review cycles, and automated notifications for deadlines and renewals.',
    icon: 'i-lucide-workflow',
  },
  {
    title: 'Version Control & History',
    description: 'Never lose track of changes. Maintain a complete audit trail of document revisions, access logs, and modification history to ensure compliance.',
    icon: 'i-lucide-history',
  },
  {
    title: 'Granular Access Control',
    description: 'Protect sensitive information with role-based permissions, secure sharing links, and detailed access tracking for both internal teams and external partners.',
    icon: 'i-lucide-shield-check',
  },
  {
    title: 'Electronic Signatures',
    description: 'Accelerate approvals with integrated e-signatures. Send, track, and securely sign documents without ever leaving the platform.',
    icon: 'i-lucide-pen-tool',
  },
]

const stats = [
  { value: '50M+', label: 'Documents Managed' },
  { value: '10k+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'Bank-Grade', label: 'Security Encryption' },
]

const testimonials = [
  {
    quote: 'DocuCore completely transformed our HR department. Finding employee records used to take hours of digging through filing cabinets. Now it takes three clicks.',
    author: 'Sarah Jenkins',
    role: 'HR Director, TechFlow Solutions',
    initials: 'SJ',
  },
  {
    quote: 'The automated approval workflows have reduced our contract turnaround time by 60%. We can track exactly whose desk a document is sitting on.',
    author: 'Michael Chen',
    role: 'Operations Manager, Vertex Logistics',
    initials: 'MC',
  },
  {
    quote: 'During our recent ISO audit, DocuCore made compiling evidence a breeze. The auditors were impressed by the version control and access logs.',
    author: 'Elena Rodriguez',
    role: 'Compliance Officer, MedCorp',
    initials: 'ER',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'For small teams needing basic document control.',
    price: '₱2,999',
    features: [
      'Up to 10 users',
      '500GB Storage',
      'Basic search and version control',
      'Standard email support',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing businesses with complex workflows.',
    price: '₱7,999',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 50 users',
      '2TB Storage',
      'Advanced search & OCR',
      'Automated approval workflows',
      'Integrated e-signatures (100/mo)',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For large organizations needing maximum compliance.',
    price: 'Custom',
    features: [
      'Unlimited users',
      'Unlimited Storage',
      'Advanced API access & integrations',
      'Custom metadata & reporting',
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
  { name: 'i-simple-icons-ibm', label: 'IBM' },
  { name: 'i-simple-icons-accenture', label: 'Accenture' },
  { name: 'i-simple-icons-deloitte', label: 'Deloitte' },
  { name: 'i-simple-icons-pwc', label: 'PwC' },
  { name: 'i-simple-icons-kpmg', label: 'KPMG' },
  { name: 'i-simple-icons-ey', label: 'EY' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing DocuCore"
    title="Intelligent Document Management"
    description="Digitize, organize, and automate your document workflows in a single secure platform. Say goodbye to paper trails and hello to efficiency."
    :links="heroLinks"
    orientation="horizontal"
  >
    <div class="bg-muted/50 rounded-xl border border-default p-4 flex items-center justify-center aspect-video">
      <div class="text-center">
        <UIcon name="i-lucide-image" class="size-12 text-muted mb-2 mx-auto" />
        <p class="text-sm font-medium text-dimmed">DocuCore Dashboard Mockup</p>
      </div>
    </div>
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by organizations worldwide for secure document handling
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
    title="Everything you need for document control"
    description="From secure storage to automated approvals — handle the complete document lifecycle with ease."
    :features="features"
  />

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
    description="Hear how DocuCore has helped organizations eliminate paper, speed up processes, and ensure compliance."
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
      description="Choose the plan that fits your organization's document management needs."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to take control of your documents?"
    description="Join thousands of organizations using DocuCore to streamline their workflows and protect their data."
    :links="ctaLinks"
  />
</template>
