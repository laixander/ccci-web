<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
    MockupScreenCmsAdmission,
    MockupScreenCmsRegistrar,
    MockupScreenCmsBilling,
    MockupScreenCmsGrades,
    MockupScreenCmsScheduling,
    MockupScreenCmsEnrollment,
    MockupScreenCmsStudent,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: securityEl, isVisible: securityVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: portalEl, isVisible: portalVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
    { label: 'Request a Demo', to: '#pricing', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
    { label: 'See How It Works', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-play-circle' },
]

const ctaLinks = [
    { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75' },
    { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone' },
]

const modules = [
    { title: 'Admission', icon: 'i-lucide-door-open', to: '#admission' },
    { title: 'Enrollment', icon: 'i-lucide-clipboard-list', to: '#enrollment' },
    { title: 'Registrar', icon: 'i-lucide-book-open', to: '#registrar' },
    { title: 'Billing', icon: 'i-lucide-receipt-text', to: '#billing' },
    { title: 'Grades', icon: 'i-lucide-graduation-cap', to: '#grades' },
    { title: 'Student', icon: 'i-lucide-user-round', to: '#student' },
    { title: 'Security', icon: 'i-lucide-shield-check', to: '#security' },
    { title: 'Scheduling', icon: 'i-lucide-calendar-clock', to: '#scheduling' },
]

const checklist = [
    'Paperless operations',
    'Online payments',
    'End-to-end automation',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
    {
        title: 'One Place for Everything',
        description: 'Bulk forms and documents, categorized, sectioned, and organized in one system instead of scattered manual records.',
        icon: 'i-lucide-layers',
        orientation: 'vertical' as const,
    },
    {
        title: 'Automated Operations',
        description: 'Repeated processes and the growing volume of enrollees and records are handled automatically, freeing staff to focus on students.',
        icon: 'i-lucide-loader',
        orientation: 'vertical' as const,
    },
    {
        title: 'Fast & Conducive',
        description: 'A conducive, fast enrolling experience — no long queues, no paper bombardment, no waiting on manual computation.',
        icon: 'i-lucide-timer',
        orientation: 'vertical' as const,
    },
    {
        title: 'Secure by Design',
        description: 'User access rights, audit trails, and account locking keep every transaction and record protected across modules.',
        icon: 'i-lucide-shield-check',
        orientation: 'vertical' as const,
    },
]

const featureDetails = [
    {
        id: 'admission',
        title: 'Admission Module',
        description: 'From application to acceptance, fully automated.',
        features: [
            { description: 'Create students, pre-admission and admission lists, import applicant data, and track student status & history.', icon: 'i-lucide-check' },
            { description: 'Admission exam settings, schedules, and question banks — with auction course lists and events.', icon: 'i-lucide-check' },
            { description: 'View current admissions and statistics, and filter admissions by campus in a few clicks.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenCmsAdmission,
    },
    {
        id: 'registrar',
        title: 'Registrar Module',
        description: 'Complete records, from admission to graduation.',
        features: [
            { description: 'Automate the University\'s registration — pre-enrollment, document submission, acceptance, and issuance of transcripts.', icon: 'i-lucide-check' },
            { description: 'Receive approved electronic grades, convert scanned documents to PDF, and issue TOR, COR, Grade Cards, and Form 9 fast.', icon: 'i-lucide-check' },
            { description: 'Course shifting with automatic prevention of non-board to board shifts; scholarships, honors, and graduation eligibility.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenCmsRegistrar,
    },
    {
        id: 'billing',
        title: 'Billing Module',
        description: 'Automated assessment, collection, and every ledger in between.',
        features: [
            { description: 'Computes tuition, laboratory, and miscellaneous fees automatically, updating for any add/drop of subjects.', icon: 'i-lucide-check' },
            { description: 'Handles receivables, payments, adjustments, grants, scholarships, and a detailed ledger per student.', icon: 'i-lucide-check' },
            { description: 'Reports per college, year, or course — daily to yearly — plus delinquent account lists, deposit slips, and tally sheets.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenCmsBilling,
    },
    {
        id: 'grades',
        title: 'Grades Module',
        description: 'A paperless, error-free, tamper-proof grading workflow.',
        features: [
            { description: 'Professors submit grades to Deans and Registrar online — anywhere, anytime — with seamless consecutive approval.', icon: 'i-lucide-check' },
            { description: 'Faculties, Deans, and colleges monitor submission and non-submission; reports per student, class, year, and college.', icon: 'i-lucide-check' },
            { description: 'Translates class cards to electronic student lists, auto-calculates grades to school policy, and allows tagged-INC edits.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenCmsGrades,
    },
    {
        id: 'scheduling',
        title: 'Scheduling & Manage',
        description: 'Balanced schedules, maximized rooms, zero conflicts.',
        features: [
            { description: 'Schedules and assigns students to classrooms by time, professor, subject, and teaching load — with no conflicts.', icon: 'i-lucide-check' },
            { description: 'Enrollment forecasting decides how many classes to offer; supports special, non-standard, and block sections.', icon: 'i-lucide-check' },
            { description: 'Create and update employees, courses, rooms, subjects, curriculum, colleges, departments, deans, and faculty.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenCmsScheduling,
    },
    {
        id: 'enrollment',
        title: 'Enrollment Module',
        description: 'Online registration with real-time assessment.',
        features: [
            { description: 'Online registration with automated assessment of fees; near-real-time alerts linked to other modules.', icon: 'i-lucide-check' },
            { description: 'Shows subjects with prerequisites (PE, ROTC, TESDA, short courses); blocks failed or untaken prereqs.', icon: 'i-lucide-check' },
            { description: 'Auto-generates assessment slips, registration slips, and lists of subjects, grades, fees, and enrolled students.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenCmsEnrollment,
    },
    {
        id: 'student',
        title: 'Student Module',
        description: 'A personal docket and one-stop info retrieval for every student.',
        features: [
            { description: 'Assigns each student a docket — achievements, awards, test and interview results, assessments, and attendance.', icon: 'i-lucide-check' },
            { description: 'Automated alerts to college, dean, and professor for awards, failing grades, attendance, and scholar performance.', icon: 'i-lucide-check' },
            { description: 'View curriculum, grades, schedules, faculty assignments, apply for scholarships, and print testing permits when fully paid.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenCmsStudent,
    },
]

const securityAndSettingsFeatures = [
    {
        title: 'User Access Rights',
        description: 'Complete access-rights entry, a list of screens and reports, and per-user privileges maintained across every module.',
        icon: 'i-lucide-shield-check',
        orientation: 'vertical' as const,
    },
    {
        title: 'Audit Trail',
        description: 'An overall audit trail of each user — search history, report access, and activity — ready for the administrator to review.',
        icon: 'i-lucide-search',
        orientation: 'vertical' as const,
    },
    {
        title: 'Currently Logged Users',
        description: 'Live monitoring of currently logged-in users and the screens and reports each one is permitted to access.',
        icon: 'i-lucide-users',
        orientation: 'vertical' as const,
    },
    {
        title: 'Account Lock',
        description: 'An account-lock feature secures every profile, locking access automatically after 3 failed sign-in attempts.',
        icon: 'i-lucide-lock',
        orientation: 'vertical' as const,
    },
]

const admissionChecklist = [
    'Submit applications online',
    'Verify duplicate applicants',
    'Filter courses by GWA requirement',
    'Track application status anytime',
]

const paymentProviders = ['GCash', 'VISA', 'Mastercard']
</script>

<template>
    <!-- Hero -->
    <ProductHero
        badge="Introducing CampusCore 2.0"
        background-image="/hero-cms-bg.jpg"
        :links="heroLinks"
        :checklist="checklist"
        :modules="modules">
        <template #title>
            Run your campus<br>on the cloud.
        </template>
        <template #description>
            The <strong>Campus Management System</strong> replaces manual, paper-heavy school operations with one automated platform — from admission and enrollment to billing, grades, and graduation. Conducive, fast, and secure, built by Centralized Cloud Computing International.
        </template>
    </ProductHero>

    <!-- Core features grid -->
    <UPageSection id="features" ref="featuresEl" class="section-reveal" :class="{ 'is-visible': featuresVisible }"
        headline="Why Choose Us" title="The digital campus, without the growing pains."
        description="Every facet of education is leaning towards technology. With more enrollees, more records, and repeated processes, manual operation simply can't keep up. The Digital Campus gives your school the best academic environment and most engaging experience."
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
    <UPageSection ref="modulesEl" class="section-reveal" :class="{ 'is-visible': modulesVisible }"
        headline="The Platform" title="Every campus operation, one platform."
        description="From an applicant's first admission exam to an alumnus's profile — all cross-linked, all in the cloud, all in a single system dashboard."
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
        <HubDiagram center-label="CMS CORE" :nodes="modules" class="reveal-right reveal-delay-400" />
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

    <!-- Security and Settings details -->
    <UPageSection
        ref="securityEl"
        class="section-reveal"
        :class="{ 'is-visible': securityVisible }"
        id="security-settings"
        orientation="horizontal"
        headline="Security & system settings"
        title="In charge of every transaction"
        description="The Security module maintains all modules and transactions, while System Settings collate functions into one dashboard — semester definitions, grade systems, academic year, schedule templates, graduation dates, and application settings."
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <template #features>
            <div class="flex flex-wrap gap-2 reveal-up reveal-delay-400">
                <UBadge
                    v-for="setting in ['Semester Definition', 'Grade System', 'Academic Year', 'School Information', 'Schedule Templates', 'Graduation Dates', 'Logo & Signature', 'Auto-Lapse Control']"
                    :key="setting"
                    variant="soft"
                    color="primary"
                    size="lg">
                    {{ setting }}
                </UBadge>
            </div>
        </template>
        <UPageGrid class="lg:grid-cols-2">
            <UPageCard
                v-for="(feature, index) in securityAndSettingsFeatures"
                :key="index"
                v-bind="feature"
                :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
                class="reveal-up"
                :style="{ animationDelay: `${400 + index * 80}ms` }"
                spotlight
            />
        </UPageGrid>
    </UPageSection>

    <!-- Student Admission Portal & Payment Gateway -->
    <UPageSection
        ref="portalEl"
        class="section-reveal"
        :class="{ 'is-visible': portalVisible }"
        headline="Extend Your Platform"
        title="Portal access and online payment, built in."
        description="CampusCore goes beyond the back office — giving students a direct portal to apply and enroll online, and a secure payment gateway to settle fees without ever queuing."
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <UPageGrid class="lg:grid-cols-2">
            <!-- Student Admission Portal -->
            <UPageCard
                title="Student Admission Portal"
                description="Aspiring students submit applications for University admission, with duplicate-applicant verification and automatic course filtering when a GWA falls below the minimum requirement."
                icon="i-lucide-door-open"
                spotlight
                class="reveal-up reveal-delay-400"
                :ui="{
                    title: 'text-xl',
                    leadingIcon: 'text-primary size-10'
                }">
                <ul class="mt-2 space-y-3">
                    <li v-for="item in admissionChecklist" :key="item" class="flex items-center gap-2 text-sm text-muted">
                        <UIcon name="i-lucide-check" class="text-primary size-4 shrink-0" />
                        {{ item }}
                    </li>
                </ul>
            </UPageCard>

            <!-- Payment Gateway -->
            <UPageCard
                title="Payment Gateway"
                description="Students pay tuition, laboratory, and other fees anytime, anywhere — no queues, no cash handling. Payments post straight to the student ledger."
                icon="i-lucide-credit-card"
                spotlight
                class="reveal-up reveal-delay-500"
                :ui="{
                    root: 'bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-600 dark:to-primary-900 ring-primary-300/50 dark:ring-primary-500/30',
                    title: 'text-primary-900 dark:text-white text-xl',
                    description: 'text-primary-800/80 dark:text-white/60',
                    leadingIcon: 'text-primary-700 dark:text-white size-10'
                }">
                <template #footer>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="provider in paymentProviders" :key="provider" class="flex items-center justify-center rounded-lg bg-primary/15 dark:bg-white/10 px-4 py-2 text-sm font-bold text-primary-800 dark:text-white backdrop-blur-sm">
                            {{ provider }}
                        </div>
                    </div>
                </template>
            </UPageCard>
        </UPageGrid>
    </UPageSection>

    <!-- CTA -->
    <UPageSection>
        <ProductCTA
            title="Ready to modernize your campus operations?"
            description="Join 200+ schools using CampusCore to reduce admin workload and improve the student experience. Book a free demo with our team today."
            :links="ctaLinks"
        />
    </UPageSection>
</template>