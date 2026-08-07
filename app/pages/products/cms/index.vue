<script setup lang="ts">
definePageMeta({ layout: 'cms' })
const features = [
  {
    title: 'Student Information System',
    description: 'Maintain a complete digital record of every student — from admission to graduation. Academic history, contact details, disciplinary records, and documents in one secure profile.',
    icon: 'i-lucide-user-round',
  },
  {
    title: 'Online Enrollment Management',
    description: 'Streamline the entire enrollment process online — from subject selection and schedule management to assessment, payment, and official enrollment confirmation.',
    icon: 'i-lucide-clipboard-list',
  },
  {
    title: 'Grades & Academic Records',
    description: 'Digitize grading, generate transcripts, and compute GPA automatically. Faculty encodes grades directly into the system — no paper forms, no data re-entry.',
    icon: 'i-lucide-award',
  },
  {
    title: 'Faculty & Curriculum Management',
    description: 'Manage faculty loads, course assignments, and curriculum revisions with ease. Track teaching performance and ensure every program meets accreditation standards.',
    icon: 'i-lucide-user-check',
  },
  {
    title: 'Finance & Tuition Management',
    description: 'Automate billing, process tuition payments, manage scholarships, and generate financial reports — fully integrated with the enrollment process.',
    icon: 'i-lucide-banknote',
  },
  {
    title: 'Campus Analytics & Reporting',
    description: 'Data-driven decisions for academic leaders. Track enrollment trends, retention rates, GPA distributions, and accreditation compliance — all in real time.',
    icon: 'i-lucide-bar-chart-2',
  },
]

const stats = [
  { value: '200+', label: 'Schools & Universities' },
  { value: '500k+', label: 'Students Managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '70%', label: 'Less Admin Workload' },
]

const testimonials = [
  {
    quote: 'CampusCore transformed our enrollment process. What used to take our registrar\'s office 3 weeks of chaos now runs in 3 days — fully online, zero queues, zero paper.',
    author: 'Dr. Maria Concepcion Bautista',
    role: 'Registrar, St. Luke\'s College',
    initials: 'MB',
  },
  {
    quote: 'Our faculty can now encode grades directly from their phones. The system computes GPA, flags at-risk students, and notifies advisers automatically. It\'s been a game-changer.',
    author: 'Prof. Ramon Villanueva',
    role: 'Academic VP, Colegio de San Juan',
    initials: 'RV',
  },
  {
    quote: 'CHED accreditation used to stress us out every cycle. With CampusCore\'s reporting tools, all our compliance data is ready in minutes. We passed with flying colors.',
    author: 'Engr. Liza Hernandez',
    role: 'Dean of Engineering, TechVoc Institute',
    initials: 'LH',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'For small schools and community colleges.',
    price: '₱4,999',
    features: [
      'Up to 1,000 students',
      'Online enrollment module',
      'Student records & grading',
      'Basic reporting',
      'Email & chat support',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing universities and multi-campus schools.',
    price: '₱12,999',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 10,000 students',
      'Everything in Starter',
      'Finance & billing integration',
      'Faculty & curriculum tools',
      'Advanced analytics & dashboards',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For large universities and multi-campus systems.',
    price: 'Custom',
    features: [
      'Unlimited students',
      'Everything in Professional',
      'Multi-campus management',
      'Custom integrations & API',
      'CHED compliance reporting',
      'Dedicated account manager',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'See How It Works', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-oracle', label: 'Oracle' },
  { name: 'i-simple-icons-stripe', label: 'Stripe' },
  { name: 'i-simple-icons-cisco', label: 'Cisco' },
  { name: 'i-simple-icons-slack', label: 'Slack' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing CampusCore 2.0"
    title="Campus Management, Built for Philippine Schools"
    description="Digitize your entire campus operation — enrollment, grading, finance, and compliance — in one intelligent platform trusted by 200+ schools and universities nationwide."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenCmsDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by schools, colleges, and universities across the Philippines
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
    title="Everything your campus needs to go digital"
    description="From student admission to alumni management — handle the complete academic lifecycle in one unified, CHED-compliant platform."
    :features="features"
  />

  <!-- Feature detail: Enrollment -->
  <UPageSection
    title="Enrollment that runs without the lines"
    description="Say goodbye to queues, paper forms, and manual encoding. CampusCore's online enrollment module lets students enroll from anywhere — select subjects, view schedules, pay tuition, and get their official enrollment form, all in one seamless flow. Your registrar's office goes from chaos to control."
    orientation="horizontal"
  >
    <MockupScreenCmsEnrollment />
  </UPageSection>

  <!-- Feature detail: Analytics -->
  <UPageSection
    title="Data-driven insights for academic leaders"
    description="Turn your campus data into strategic decisions. Real-time dashboards give administrators full visibility into enrollment trends, retention rates, GPA distributions, and tuition collection — all in one place. Prepare for CHED compliance reviews in minutes, not weeks."
    orientation="horizontal"
    reverse
  >
    <MockupScreenCmsAnalytics />
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
    title="Loved by registrars, faculty, and administrators"
    description="Don't just take our word for it — hear from the school leaders who trust CampusCore to run their institutions every day."
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
      title="Straightforward pricing for every school size"
      description="No hidden fees. No per-module add-ons. All plans include onboarding support and a 30-day pilot period so you can see the impact before committing."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to modernize your campus operations?"
    description="Join 200+ schools using CampusCore to reduce admin workload and improve the student experience. Book a free demo with our team today."
    :links="ctaLinks"
  />
</template>
