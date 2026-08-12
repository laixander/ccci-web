<script setup lang="ts">
definePageMeta({
  layout: 'lms',
})

const features = [
  {
    title: 'Course Creation',
    description: 'Build interactive courses with a drag-and-drop builder. Support for video, audio, SCORM, quizzes, and assignments.',
    icon: 'i-lucide-book-open',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor student engagement and completion rates in real-time. Identify learners who need help before they fall behind.',
    icon: 'i-lucide-line-chart',
  },
  {
    title: 'Assessments & Grading',
    description: 'Automated grading for quizzes, peer reviews, and rubrics for complex assignments. Provide instant feedback.',
    icon: 'i-lucide-check-circle',
  },
  {
    title: 'Live Classrooms',
    description: 'Seamless integration with Zoom, Teams, and Google Meet for hybrid and remote synchronous learning.',
    icon: 'i-lucide-video',
  },
  {
    title: 'Certifications',
    description: 'Design custom certificates and badges. Automatically award them upon successful course completion.',
    icon: 'i-lucide-award',
  },
  {
    title: 'Mobile Learning',
    description: 'A fully responsive experience allowing students to learn anywhere, anytime, on any device.',
    icon: 'i-lucide-smartphone',
  },
]

const stats = [
  { value: '2M+', label: 'Active Learners' },
  { value: '500+', label: 'Institutions' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '85%', label: 'Higher Completion' },
]

const testimonials = [
  {
    quote: 'LearnCore revolutionized our corporate training. Onboarding time is cut in half, and employee engagement with compliance training is at an all-time high.',
    author: 'David Wright',
    role: 'Director of L&D, TechNova',
    initials: 'DW',
  },
  {
    quote: "Our university switched to LearnCore last year. The faculty loves the intuitive grading tools, and students appreciate the mobile-first design.",
    author: 'Elena Rostova',
    role: 'Dean of E-Learning, State University',
    initials: 'ER',
  },
  {
    quote: 'The analytics give us incredible insight into how students interact with the material. We can continuously improve our courses based on real data.',
    author: 'Michael Chang',
    role: 'Founder, CodeCamp Online',
    initials: 'MC',
  },
]

const plans = [
  {
    title: 'Basic',
    description: 'Perfect for independent instructors and small teams.',
    price: '$99',
    features: [
      'Up to 250 active learners',
      'Unlimited courses',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    title: 'Pro',
    description: 'For growing organizations needing advanced features.',
    price: '$299',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 1,000 active learners',
      'Everything in Basic',
      'Custom domains & branding',
      'Live classroom integrations',
      'Advanced reporting',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Custom solutions for large universities and corporations.',
    price: 'Custom',
    features: [
      'Unlimited learners',
      'Everything in Pro',
      'Custom API integrations',
      'Dedicated success manager',
      'Single Sign-On (SSO)',
      'SLA guarantee',
    ],
  },
]

const heroLinks = [
  { label: 'Start Free Trial', to: '#pricing', icon: 'i-lucide-rocket', size: 'xl' as const },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Get Started Today', icon: 'i-lucide-rocket', size: 'lg' as const },
  { label: 'Talk to Sales', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-coursera', label: 'Coursera' },
  { name: 'i-simple-icons-udemy', label: 'Udemy' },
  { name: 'i-simple-icons-edx', label: 'edX' },
  { name: 'i-simple-icons-khanacademy', label: 'Khan Academy' },
  { name: 'i-simple-icons-skillshare', label: 'Skillshare' },
  { name: 'i-simple-icons-duolingo', label: 'Duolingo' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing LearnCore LMS"
    title="Education and Training, Elevated."
    description="Deliver engaging learning experiences, track progress effortlessly, and scale your educational programs with a platform trusted by top institutions."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenLmsDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by leading educational organizations
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
    title="Everything you need to teach and train"
    description="From course creation to final certification — manage the complete learning journey in one unified platform."
    :features="features"
  />

  <!-- Feature detail: Course Builder -->
  <UPageSection
    title="Interactive Course Builder"
    description="Create rich, multimedia courses without any coding. Drag and drop video lectures, interactive quizzes, and downloadable resources to build learning paths that keep students engaged from start to finish."
    orientation="horizontal"
  >
    <MockupScreenLmsCourse />
  </UPageSection>

  <!-- Feature detail: Analytics -->
  <UPageSection
    title="Actionable Learning Insights"
    description="Go beyond basic completion rates. Our advanced analytics dashboard reveals how learners are interacting with your content, highlighting areas where they excel and where they need additional support."
    orientation="horizontal"
    reverse
  >
    <MockupScreenLmsAnalytics />
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
    headline="Success Stories"
    title="Empowering educators everywhere"
    description="Hear from schools and businesses that have transformed their learning programs with LearnCore."
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
      description="Start small and scale up as your learning community grows. All plans include a 14-day free trial."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to elevate your learning programs?"
    description="Join thousands of organizations using LearnCore to deliver better education and training."
    :links="ctaLinks"
  />
</template>
