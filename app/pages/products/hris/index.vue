<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
    MockupScreenHrisPayroll,
    MockupScreenHrisAnalytics,
    MockupScreenHrisEmployees,
    MockupScreenHrisTimekeeping,
    MockupScreenHrisRecruitment,
    MockupScreenHrisLearning,
    MockupScreenHrisPerformance,
    MockupScreenHrisSelfService,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
    { label: 'Start Free Trial', trailingIcon: 'i-lucide-arrow-right', class: 'hero-cta-shadow' },
    { label: 'Watch Demo', icon: 'i-lucide-play-circle', color: 'neutral' as const, variant: 'soft' as const },
]

const ctaLinks = [
    { label: 'Start Free Trial', trailingIcon: 'i-lucide-arrow-right', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75' },
    { label: 'Schedule a Demo', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-calendar-check' },
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
    { title: 'Employee Records', icon: 'i-lucide-users', to: '#employee-records' },
    { title: 'Recruitment', icon: 'i-lucide-user-plus', to: '#recruitment' },
    { title: 'Payroll', icon: 'i-lucide-banknote', to: '#payroll' },
    { title: 'Timekeeping', icon: 'i-lucide-clock', to: '#timekeeping' },
    { title: 'Reports', icon: 'i-lucide-bar-chart-2', to: '#reports' },
    { title: 'Performance', icon: 'i-lucide-trending-up', to: '#performance' },
    { title: 'Self-Service', icon: 'i-lucide-smartphone', to: '#self-service' },
    { title: 'Learning', icon: 'i-lucide-book-open', to: '#learning' },
]

const checklist = [
    'Tailored for SMEs',
    'Geo-tagged timekeeping',
    'PH-compliant payroll',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
    {
        title: 'Employee-Centered Design',
        description: 'Built for people, not just systems — our HRIS ensures ease, clarity, and quick adoption across every team.',
        icon: 'i-lucide-users',
        orientation: 'vertical' as const,
    },
    {
        title: 'Integrated & Flexible',
        description: 'Integrates all core HR functions into one adaptable system, providing a fully customizable experience.',
        icon: 'i-lucide-layers',
        orientation: 'vertical' as const,
    },
    {
        title: 'Tailored for SMEs',
        description: 'Makes powerful HR tools accessible — combining world-class standards with affordable, practical solutions.',
        icon: 'i-lucide-building-2',
        orientation: 'vertical' as const,
    },
    {
        title: 'Smart Automation',
        description: 'Combines automation, geolocation, and real-time data to cut errors and free HR for strategic priorities.',
        icon: 'i-lucide-settings',
        orientation: 'vertical' as const,
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

const featureDetails = [
    {
        id: 'employee-records',
        title: 'Employee Information',
        description: 'The single source of truth that powers smarter HR decisions.',
        features: [
            { description: 'A centralized record keeping all employee data accurate, consistent, and accessible.', icon: 'i-lucide-check' },
            { description: 'Securely stores documents, licenses, and certifications with expiry reminders.', icon: 'i-lucide-check' },
            { description: 'Dynamic charts give instant visibility of roles across departments.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenHrisEmployees,
    },
    {
        id: 'timekeeping',
        title: 'Timekeeping',
        description: 'Making every second count for your workforce.',
        features: [
            { description: 'Attendance tracking with biometric, mobile, and web-based clock-ins for on-site and remote teams.', icon: 'i-lucide-check' },
            { description: 'Geo-tagged clock-ins verify when and where employees start and end their workday.', icon: 'i-lucide-check' },
            { description: 'Smart scheduling, automated leave management, and real-time notifications keep workflows compliant.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenHrisTimekeeping,
    },
    {
        id: 'payroll',
        title: 'Payroll',
        description: 'Less time on payroll, more time on people.',
        features: [
            { description: 'Automated salary computation that integrates directly with attendance and leave data.', icon: 'i-lucide-check' },
            { description: 'Employees get digital payslips; HR gains audit-ready records and real-time insights.', icon: 'i-lucide-check' },
            { description: 'Accurate tax and government-contribution compliance with support for multiple pay structures.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenHrisPayroll,
    },
    {
        id: 'recruitment',
        title: 'Recruitment & Onboarding',
        description: 'The right talent, the right start, the right tools.',
        features: [
            { description: 'Streamlines the hiring journey — from job postings and AI-powered candidate matching to digital, paperless contracts.', icon: 'i-lucide-check' },
            { description: 'Hired applicants flow straight into Employee Information, eliminating duplicate data entry.', icon: 'i-lucide-check' },
            { description: 'Plug-and-play with the Learning Management System for structured training from day one.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenHrisRecruitment,
    },
    {
        id: 'learning',
        title: 'Learning & Development',
        description: 'Build the foundation, scale with LMS.',
        features: [
            { description: 'A central hub for training records — track employee skills, training history, and development needs.', icon: 'i-lucide-check' },
            { description: 'Works standalone as a streamlined monitoring tool for every program.', icon: 'i-lucide-check' },
            { description: 'Integrates with the LMS to unlock certification management, progress tracking, online activities, and exams.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenHrisLearning,
    },
    {
        id: 'performance',
        title: 'Performance Management',
        description: 'Performance that scales with you.',
        features: [
            { description: 'Starts with the essentials — goal tracking, structured reviews, and performance records for a clear, consistent process.', icon: 'i-lucide-check' },
            { description: 'Grows into a full ecosystem with continuous feedback, skill frameworks, and analytics.', icon: 'i-lucide-check' },
            { description: 'Integrates seamlessly with Learning & Development for targeted employee growth.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenHrisPerformance,
    },
    {
        id: 'self-service',
        title: 'Employee Self-Service',
        description: 'The freedom to manage your HR needs.',
        features: [
            { description: 'Puts HR in every employee\'s pocket — direct access to payslips, leave balances, schedules, and personal info.', icon: 'i-lucide-check' },
            { description: 'Every update flows back into the centralized record, ensuring one single source of truth.', icon: 'i-lucide-check' },
            { description: 'File requests, update records, or download documents in a few clicks — less manual workload for HR.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenHrisSelfService,
    },
    {
        id: 'reports',
        title: 'Reports & Analytics',
        description: 'Turn HR data into business strategy.',
        features: [
            { description: 'Turns everyday HR data into clear, actionable insights.', icon: 'i-lucide-check' },
            { description: 'Real-time dashboards, customizable reports, and predictive trends to spot patterns and plan ahead.', icon: 'i-lucide-check' },
            { description: 'From compliance reporting to linking payroll, attendance, and performance in one view.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenHrisAnalytics,
    },
]

const addOnModule = {
    headline: 'Add-on Module',
    title: 'Employee Loan Management',
    description: 'Seamless loan management for your workforce — from application to full repayment, all inside the HRIS.',
    features: [
        { title: 'Loan Application', description: 'Employees apply via HRIS, entering loan amount, term, and reason.', icon: 'i-lucide-file-text' },
        { title: 'Approval Process', description: 'Supervisor and HR review and approve the request in a guided workflow.', icon: 'i-lucide-shield-check' },
        { title: 'Disbursement', description: 'Approved loans are disbursed via payroll or direct bank transfer.', icon: 'i-lucide-landmark' },
        { title: 'Repayment', description: 'Monthly deductions from salary continue automatically until fully paid.', icon: 'i-lucide-clock' },
        { title: 'Tracking & Reports', description: 'Employees and HR can monitor loan status and full history any time.', icon: 'i-lucide-bar-chart-2' },
    ],
}

</script>

<template>
    <!-- Hero -->
    <ProductHero badge="Introducing PeopleCore 2.0"
        description="One unified cloud platform that connects payroll, attendance, recruitment, learning and performance — for the way modern SME teams work."
        background-image="/hero-hris-bg.jpg" :links="heroLinks" :checklist="checklist" :modules="modules">
        <template #title>
            Your workforce,<br>finally unified.
        </template>
    </ProductHero>

    <!-- Social proof -->
    <!-- <div class="border-y border-default bg-muted/50 py-10">
        <UContainer>
            <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
                Trusted by innovative companies worldwide
            </p>
            <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                <UIcon v-for="logo in logoIcons" :key="logo.name" :name="logo.name" :aria-label="logo.label"
                    class="size-7 text-muted" />
            </div>
        </UContainer>
    </div> -->

    <!-- Core features grid -->
    <UPageSection id="features" headline="Why Choose Us" title="Why our HRIS stands out"
        description="A human resource platform engineered around your people, your compliance, and your growth."
        :features="features" :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10' }" />

    <!-- Modules Structure -->
    <UPageSection headline="The Platform" title="Eight modules. One connected record."
        description="Unified platform that collects and stores data across every HR function — from applicant tracking to payroll, training, deployment, and reporting. Nothing lives in a spreadsheet, and nothing gets entered twice."
        orientation="horizontal" :ui="{ features: 'grid grid-cols-2 gap-4' }">
        <template #features>
            <UPageFeature v-for="(module, index) in modules" :key="index" :title="module.title" icon="i-lucide-check" />
        </template>
        <HubDiagram center-label="HR CORE" :nodes="modules" />
    </UPageSection>

    <!-- Feature details -->
    <UPageSection v-for="(feature, index) in featureDetails" :key="index" :id="feature.id" :title="feature.title"
        :description="feature.description" :features="feature.features.map(f => ({ ...f, ui: { leading: 'p-0' } }))"
        :orientation="feature.orientation" :reverse="feature.reverse" :ui="{
            description: 'text-primary',
        }">
        <component :is="feature.component" />
    </UPageSection>

    <!-- Add-on Modules -->
    <UPageSection :headline="addOnModule.headline" :title="addOnModule.title" :description="addOnModule.description">
        <UPageGrid class="sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <UPageCard v-for="feat in addOnModule.features" :key="feat.title" :title="feat.title"
                :description="feat.description" spotlight spotlight-color="primary">
                <template #leading>
                    <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <UIcon :name="feat.icon" class="size-5 text-primary" />
                    </div>
                </template>
            </UPageCard>
        </UPageGrid>
    </UPageSection>

    <!-- Stats banner -->
    <!-- <div class="bg-primary dark:bg-primary/50 py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-4xl lg:text-5xl font-extrabold text-white">{{ stat.value }}</p>
          <p class="text-white/70 mt-2 text-sm lg:text-base font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </UContainer>
  </div> -->

    <!-- Testimonials -->
    <!-- <UPageSection
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
  </UPageSection> -->

    <!-- Pricing -->
    <!-- <div class="bg-muted/30">
    <UPageSection
      id="pricing"
      headline="Pricing"
      title="Simple, transparent pricing"
      description="No hidden fees. No surprises. Start free and scale as your team grows. Every plan includes a 30-day free trial."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div> -->

    <!-- CTA -->
    <ProductCTA title="Ready to transform your HR operations?"
        description="Join 1,200+ companies using PeopleCore to build better workplaces. Start your free 30-day trial — no credit card required."
        :links="ctaLinks" />
</template>