<script setup lang="ts">
import { MockupScreenHrisPayroll, MockupScreenHrisAnalytics, MockupScreenHrisEmployees } from '#components'
definePageMeta({ layout: 'product' })
const standouts = [
  {
    title: 'Employee-Centered Design',
    description: 'Built for people, not just systems — our HRIS ensures ease, clarity, and quick adoption across every team.',
    icon: 'i-lucide-users',
    orientation: 'vertical' as const
  },
  {
    title: 'Integrated & Flexible',
    description: 'Integrates all core HR functions into one adaptable system, providing a fully customizable experience.',
    icon: 'i-lucide-layers',
    orientation: 'vertical' as const
  },
  {
    title: 'Tailored for SMEs',
    description: 'Makes powerful HR tools accessible — combining world-class standards with affordable, practical solutions.',
    icon: 'i-lucide-building-2',
    orientation: 'vertical' as const
  },
  {
    title: 'Smart Automation',
    description: 'Combines automation, geolocation, and real-time data to cut errors and free HR for strategic priorities.',
    icon: 'i-lucide-settings',
    orientation: 'vertical' as const
  }
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

const checklist = [
  'Tailored for SMEs',
  'Geo-tagged timekeeping',
  'PH-compliant payroll'
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

const modules = [
  { title: 'Employee records', icon: 'i-lucide-check' },
  { title: 'Recruitment', icon: 'i-lucide-check' },
  { title: 'Self-service', icon: 'i-lucide-check' },
  { title: 'Learning & development', icon: 'i-lucide-check' },
  { title: 'Payroll', icon: 'i-lucide-check' },
  { title: 'Timekeeping', icon: 'i-lucide-check' },
  { title: 'Reports & analytics', icon: 'i-lucide-check' },
  { title: 'Performance', icon: 'i-lucide-check' },
]

const hubModules = [
  { label: 'Employee Records', icon: 'i-lucide-users'       },
  { label: 'Recruitment',      icon: 'i-lucide-user-plus'   },
  { label: 'Payroll',          icon: 'i-lucide-banknote'    },
  { label: 'Timekeeping',      icon: 'i-lucide-clock'       },
  { label: 'Reports',          icon: 'i-lucide-bar-chart-2' },
  { label: 'Performance',      icon: 'i-lucide-trending-up' },
  { label: 'Self-Service',     icon: 'i-lucide-smartphone'  },
  { label: 'Learning',         icon: 'i-lucide-book-open'   },
]

const featureDetails = [
  {
    title: 'Employee Information',
    description: 'The single source of truth that powers smarter HR decisions.',
    features: [
      { title: 'A centralized record keeping all employee data accurate, consistent, and accessible.', icon: 'i-lucide-users' },
      { title: 'Securely stores documents, licenses, and certifications with expiry reminders.', icon: 'i-lucide-file-text' },
      { title: 'Dynamic charts give instant visibility of roles across departments.', icon: 'i-lucide-bar-chart-4' },
    ],
    orientation: 'horizontal' as const,
    component: MockupScreenHrisEmployees
  },
  {
    title: 'Timekeeping',
    description: 'Making every second count for your workforce.',
    features: [
      { title: 'Attendance tracking with biometric, mobile, and web-based clock-ins for on-site and remote teams.', icon: 'i-lucide-clock' },
      { title: 'Geo-tagged clock-ins verify when and where employees start and end their workday.', icon: 'i-lucide-map-pin' },
      { title: 'Smart scheduling, automated leave management, and real-time notifications keep workflows compliant.', icon: 'i-lucide-calendar' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHrisAnalytics
  },
  {
    title: 'Payroll',
    description: 'Less time on payroll, more time on people.',
    features: [
      { title: 'Automated salary computation that integrates directly with attendance and leave data.', icon: 'i-lucide-calculator' },
      { title: 'Employees get digital payslips; HR gains audit-ready records and real-time insights.', icon: 'i-lucide-receipt-text' },
      { title: 'Accurate tax and government-contribution compliance with support for multiple pay structures.', icon: 'i-lucide-check-circle' },
    ],
    orientation: 'horizontal' as const,
    component: MockupScreenHrisPayroll
  },
  {
    title: 'Recruitment & Onboarding',
    description: 'The right talent, the right start, the right tools.',
    features: [
      { title: 'Streamlines the hiring journey — from job postings and AI-powered candidate matching to digital, paperless contracts.', icon: 'i-lucide-sparkles' },
      { title: 'Hired applicants flow straight into Employee Information, eliminating duplicate data entry.', icon: 'i-lucide-user-check' },
      { title: 'Plug-and-play with the Learning Management System for structured training from day one.', icon: 'i-lucide-book-open' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHrisAnalytics
  },
  {
    title: 'Learning & Development',
    description: 'Build the foundation, scale with LMS.',
    features: [
      { title: 'A central hub for training records — track employee skills, training history, and development needs.', icon: 'i-lucide-globe' },
      { title: 'Works standalone as a streamlined monitoring tool for every program.', icon: 'i-lucide-shield-cog-corner' },
      { title: 'Integrates with the LMS to unlock certification management, progress tracking, online activities, and exams.', icon: 'i-lucide-award' },
    ],
    orientation: 'horizontal' as const,
    component: MockupScreenHrisPayroll
  },
  {
    title: 'Performance Management',
    description: 'Performance that scales with you.',
    features: [
      { title: 'Starts with the essentials — goal tracking, structured reviews, and performance records for a clear, consistent process.', icon: 'i-lucide-bar-chart-4' },
      { title: 'Grows into a full ecosystem with continuous feedback, skill frameworks, and analytics.', icon: 'i-lucide-trending-up' },
      { title: 'Integrates seamlessly with Learning & Development for targeted employee growth.', icon: 'i-lucide-file-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHrisAnalytics
  },
  {
    title: 'Employee Self-Service',
    description: 'The freedom to manage your HR needs.',
    features: [
      { title: 'Puts HR in every employee’s pocket — direct access to payslips, leave balances, schedules, and personal info.', icon: 'i-lucide-smartphone' },
      { title: 'Every update flows back into the centralized record, ensuring one single source of truth.', icon: 'i-lucide-pencil' },
      { title: 'File requests, update records, or download documents in a few clicks — less manual workload for HR.', icon: 'i-lucide-file-text' },
    ],
    orientation: 'horizontal' as const,
    component: MockupScreenHrisPayroll
  },
  {
    title: 'Reports & Analytics',
    description: 'Turn HR data into business strategy.',
    features: [
      { title: 'Turns everyday HR data into clear, actionable insights.', icon: 'i-lucide-bar-chart-4' },
      { title: 'Real-time dashboards, customizable reports, and predictive trends to spot patterns and plan ahead.', icon: 'i-lucide-hourglass' },
      { title: 'From compliance reporting to linking payroll, attendance, and performance in one view.', icon: 'i-lucide-link-2' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHrisAnalytics
  }
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing PeopleCore 2.0"
    title="Your workforce, finally unified."
    description="One unified cloud platform that connects payroll, attendance, recruitment, learning and performance — for the way modern SME teams work."
    orientation="horizontal"
  >
    <template #footer>
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <UButton
          v-for="(link, index) in heroLinks"
          :key="index"
          v-bind="link"
        />
      </div>

      <ul class="mt-6 sm:mt-12 flex flex-wrap gap-x-6 gap-y-2">
        <li
          v-for="item in checklist"
          :key="item"
          class="flex items-center gap-2 text-sm text-muted"
        >
          <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0" />
          {{ item }}
        </li>
      </ul>
    </template>

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
    headline="Why Choose Us"
    title="Why our HRIS stands out"
    description="A human resource platform engineered around your people, your compliance, and your growth."
    :features="standouts"
    :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10' }"
  />

  <!-- Modules Structure -->
  <UPageSection
    headline="The Platform"
    title="Eight modules. One connected record."
    description="Unified platform that collects and stores data across every HR function — from applicant tracking to payroll, training, deployment, and reporting. Nothing lives in a spreadsheet, and nothing gets entered twice."
    orientation="horizontal"
    :features="modules"
    :ui="{ features: 'grid grid-cols-2 gap-4' }"
  >
    <HubDiagram center-label="HR CORE" :nodes="hubModules" />
  </UPageSection>

  <!-- Feature details -->
  <UPageSection
    v-for="(feature, index) in featureDetails"
    :key="index"
    :title="feature.title"
    :description="feature.description"
    :features="feature.features"
    :orientation="feature.orientation"
    :reverse="feature.reverse"
    :ui="{
      description: 'text-primary'
    }"
  >
    <component :is="feature.component" />
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
