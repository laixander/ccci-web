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

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: addOnsEl, isVisible: addOnsVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
    { label: 'Start Free Trial', trailingIcon: 'i-lucide-arrow-right', class: 'hero-cta-shadow' },
    { label: 'Watch Demo', icon: 'i-lucide-play-circle', color: 'neutral' as const, variant: 'soft' as const },
]

const ctaLinks = [
    { label: 'Start Free Trial', trailingIcon: 'i-lucide-arrow-right', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75' },
    { label: 'Schedule a Demo', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-calendar-check' },
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

    <!-- Core features grid -->
    <UPageSection id="why-choose-us" ref="featuresEl" class="section-reveal" :class="{ 'is-visible': featuresVisible }" headline="Why Choose Us" title="Why our HRIS stands out"
        description="A human resource platform engineered around your people, your compliance, and your growth."
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <template #features>
            <UPageFeature v-for="(feature, i) in features" :key="feature.title" v-bind="feature"
                class="reveal-up" :style="{ animationDelay: `${400 + i * 100}ms` }" />
        </template>
    </UPageSection>

    <!-- Modules Structure -->
    <UPageSection id="platform" ref="modulesEl" class="section-reveal" :class="{ 'is-visible': modulesVisible }" headline="The Platform" title="Eight modules. One connected record."
        description="Unified platform that collects and stores data across every HR function — from applicant tracking to payroll, training, deployment, and reporting. Nothing lives in a spreadsheet, and nothing gets entered twice."
        orientation="horizontal" :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            features: 'grid grid-cols-2 gap-4',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <template #features>
            <UPageFeature v-for="(module, index) in modules" :key="index" :title="module.title" icon="i-lucide-check"
                class="reveal-up" :style="{ animationDelay: `${400 + index * 60}ms` }" />
        </template>
        <HubDiagram center-label="HR CORE" :nodes="modules" class="reveal-right reveal-delay-400" />
    </UPageSection>

    <!-- Feature details -->
    <ProductFeature
        v-for="(feature, index) in featureDetails"
        :key="index"
        :id="feature.id"
        :title="feature.title"
        :description="feature.description"
        :features="feature.features"
        :orientation="feature.orientation"
        :reverse="feature.reverse">
        <component :is="feature.component" />
    </ProductFeature>

    <!-- Add-on Modules -->
    <UPageSection
        id="addons"
        ref="addOnsEl"
        class="section-reveal"
        :class="{ 'is-visible': addOnsVisible }"
        :headline="addOnModule.headline"
        :title="addOnModule.title"
        :description="addOnModule.description"
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <UPageGrid class="sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <UPageCard
                v-for="(feat, index) in addOnModule.features"
                :key="feat.title"
                :title="feat.title"
                :description="feat.description"
                spotlight
                spotlight-color="primary"
                class="reveal-up"
                :style="{ animationDelay: `${400 + index * 80}ms` }">
                <template #leading>
                    <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <UIcon :name="feat.icon" class="size-5 text-primary" />
                    </div>
                </template>
            </UPageCard>
        </UPageGrid>
    </UPageSection>

    <!-- CTA -->
    <UPageSection>
        <ProductCTA title="Ready to transform your HR operations?"
            description="Join 1,200+ companies using PeopleCore to build better workplaces. Start your free 30-day trial — no credit card required."
            :links="ctaLinks" />
    </UPageSection>
</template>