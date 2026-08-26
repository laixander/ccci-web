<script setup lang="ts">
definePageMeta({ layout: 'product' })

useSeoMeta({
  title: 'HKAS — Human Kinetics Assessment System | KineticsCore',
  description: 'Digitize fitness assessments, track body composition, manage PE curriculum, and run corporate wellness programs — all in one platform built for schools, universities, and organizations.',
})

const features = [
  {
    title: 'Fitness Assessment Engine',
    description: 'Administer standardized tests — VO₂ max, sit-and-reach, push-up, BMI — with automated scoring and national percentile benchmarks.',
    icon: 'i-lucide-clipboard-list',
  },
  {
    title: 'Body Composition Tracking',
    description: 'Record and monitor individual body composition data over time. Identify health risks early with longitudinal trend analysis.',
    icon: 'i-lucide-person-standing',
  },
  {
    title: 'PE Curriculum Management',
    description: 'Build lesson plans, assign graded activities, manage class schedules, and generate CHED-compliant PE reports automatically.',
    icon: 'i-lucide-book-open',
  },
  {
    title: 'Corporate Wellness Programs',
    description: 'Launch company-wide fitness challenges, track employee wellness milestones, and reduce health-related absenteeism.',
    icon: 'i-lucide-heart-pulse',
  },
  {
    title: 'Sports Performance Monitoring',
    description: 'Track athlete training loads, monitor recovery, log competition results, and benchmark against performance targets.',
    icon: 'i-lucide-trophy',
  },
  {
    title: 'Assessment Analytics',
    description: 'Population-level health insights, cohort comparisons, grade-level benchmarking, and exportable compliance reports.',
    icon: 'i-lucide-bar-chart-2',
  },
]

const stats = [
  { value: '200k+', label: 'Individuals Assessed' },
  { value: '800+', label: 'Schools & Organizations' },
  { value: '87%', label: 'Avg Pass Rate Improvement' },
  { value: '40%', label: 'Less Admin Time' },
]

const testimonials = [
  {
    quote: 'KineticsCore completely transformed our PE department. What used to be paper-based test forms and manual tallying is now fully digital. Our teachers love it.',
    author: 'Dr. Rosario dela Vega',
    role: 'PE Department Head, University of Santo Tomas',
    initials: 'RV',
  },
  {
    quote: 'We deployed KineticsCore for our 3,000-employee wellness program. Engagement jumped by 60% in the first semester. The data dashboards are incredibly insightful.',
    author: 'Jerome Lim',
    role: 'HR Director, Ayala Corporation',
    initials: 'JL',
  },
  {
    quote: "Our varsity coaches rely on KineticsCore every season. Tracking athlete performance trends has helped us spot fatigue early and prevent injuries.",
    author: 'Coach Nico Villanueva',
    role: 'Head of Athletics, De La Salle University',
    initials: 'NV',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'Perfect for small schools or teams getting started with digital assessments.',
    price: '₱3,500',
    features: [
      'Up to 500 individuals',
      'Core fitness assessments',
      'Basic body composition tracking',
      'PDF report exports',
      'Email support',
    ],
  },
  {
    title: 'Institution',
    description: 'For schools and universities running full PE programs and assessments.',
    price: '₱8,000',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 5,000 students',
      'Everything in Starter',
      'PE curriculum management',
      'CHED compliance reporting',
      'Analytics & trend dashboards',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For large organizations, corporations, and sports federations.',
    price: 'Custom',
    features: [
      'Unlimited individuals',
      'Everything in Institution',
      'Corporate wellness modules',
      'Sports performance tracking',
      'Custom integrations & API',
      'Dedicated implementation team',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Schedule a Call', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-nike', label: 'Nike' },
  { name: 'i-simple-icons-adidas', label: 'Adidas' },
  { name: 'i-simple-icons-decathlon', label: 'Decathlon' },
  { name: 'i-simple-icons-apple', label: 'Apple' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing KineticsCore 2.0"
    title="Physical Fitness Assessment, Reimagined for Modern Organizations"
    description="Assess every individual with precision — from students in PE class to employees in wellness programs to varsity athletes on the field. One platform. Total visibility."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenHkasDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by leading schools, corporations, and sports organizations
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
    title="Everything you need to assess and improve physical fitness"
    description="From individual fitness tests to organization-wide wellness programs — KineticsCore covers the entire human kinetics lifecycle."
    :features="features"
  />

  <!-- Feature detail: Assessment -->
  <UPageSection
    title="Assessments that run themselves"
    description="Administer nationally standardized fitness tests — VO₂ max, push-up, sit-and-reach, 50-meter dash, and more — with automated scoring, percentile ranking, and instant digital reports. No spreadsheets. No manual tallying. Just accurate results in seconds."
    orientation="horizontal"
  >
    <MockupScreenHkasAssessment />
  </UPageSection>

  <!-- Feature detail: Analytics -->
  <UPageSection
    title="Analytics that drive healthier outcomes"
    description="Turn fitness data into actionable insights. Track population health trends across grade levels, departments, or cohorts. Identify at-risk individuals early, benchmark against national standards, and generate CHED-compliant PE reports automatically."
    orientation="horizontal"
    reverse
  >
    <MockupScreenHkasAnalytics />
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
    title="Trusted by PE faculty, HR teams, and coaches"
    description="Hear from the educators, wellness leaders, and coaches who rely on KineticsCore every day."
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
      description="Whether you're a small school or a large corporation — KineticsCore has a plan for you. Every plan includes a 30-day free trial."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to transform how you assess physical fitness?"
    description="Join 800+ schools and organizations using KineticsCore to build healthier, more active communities. Request your free demo today."
    :links="ctaLinks"
  />
</template>
