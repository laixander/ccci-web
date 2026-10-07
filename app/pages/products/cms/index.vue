<script setup lang="ts">
import { MockupScreenCmsAdmission, MockupScreenCmsRegistrar, MockupScreenCmsBilling, MockupScreenCmsGrades, MockupScreenCmsScheduling, MockupScreenCmsEnrollment, MockupScreenCmsStudent } from '#components'
import { useWindowScroll } from '@vueuse/core'
definePageMeta({ layout: 'product' })
const features = [
  {
    title: 'One Place for Everything',
    description: 'Bulk forms and documents, categorized, sectioned, and organized in one system instead of scattered manual records.',
    icon: 'i-lucide-layers',
    orientation: 'vertical' as const
  },
  {
    title: 'Automated Operations',
    description: 'Repeated processes and the growing volume of enrollees and records are handled automatically, freeing staff to focus on students.',
    icon: 'i-lucide-loader',
    orientation: 'vertical' as const
  },
  {
    title: 'Fast & Conducive',
    description: 'A conducive, fast enrolling experience — no long queues, no paper bombardment, no waiting on manual computation.',
    icon: 'i-lucide-timer',
    orientation: 'vertical' as const
  },
  {
    title: 'Secure by Design',
    description: 'User access rights, audit trails, and account locking keep every transaction and record protected across modules.',
    icon: 'i-lucide-shield-check',
    orientation: 'vertical' as const
  }
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
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const, ui: { base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold', leadingIcon: 'sm:size-5' } },
  { label: 'See How It Works', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const,  ui: { base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold', trailingIcon: 'sm:size-5' } },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const, ui: { base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold', leadingIcon: 'sm:size-5' } },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const,  ui: { base: 'sm:py-4 sm:px-6 sm:rounded-xl font-semibold', trailingIcon: 'sm:size-5' } },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-oracle', label: 'Oracle' },
  { name: 'i-simple-icons-stripe', label: 'Stripe' },
  { name: 'i-simple-icons-cisco', label: 'Cisco' },
  { name: 'i-simple-icons-slack', label: 'Slack' },
]

const checklist = [
    'Paperless operations',
    'Online payments',
    'End-to-end automation'
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
      component: MockupScreenCmsAdmission
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
      component: MockupScreenCmsRegistrar
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
      component: MockupScreenCmsBilling
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
      component: MockupScreenCmsGrades
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
      component: MockupScreenCmsScheduling
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
      component: MockupScreenCmsEnrollment
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
      component: MockupScreenCmsStudent
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
  }
]

const admissionChecklist = [
  'Submit applications online',
  'Verify duplicate applicants',
  'Filter courses by GWA requirement',
  'Track application status anytime',
]

const paymentProviders = ['GCash', 'VISA', 'Mastercard']

const { y } = useWindowScroll()
</script>

<template>
  <!-- Hero -->
  <UPageHero
      orientation="horizontal" :ui="{
          root: 'relative overflow-hidden min-h-[calc(100vh-var(--ui-header-height))] pb-14 flex flex-col justify-center',
          container: 'max-w-full',
          description: 'dark:text-toned'
      }">
      <template #headline>
          <UBadge variant="subtle" :ui="{ base: 'pr-2.5 gap-2' }" class="rounded-full mb-4">
              <span class="relative flex size-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                  <span class="relative inline-flex size-2 rounded-full bg-primary-500"></span>
              </span>
              Introducing CampusCore 2.0
          </UBadge>
      </template>
      <template #title>
          Run your campus<br>on the cloud.
      </template>
      <template #description>
          The <strong>Campus Management System</strong> replaces manual, paper-heavy school operations with one automated platform — from admission and enrollment to billing, grades, and graduation. Conducive, fast, and secure, built by Centralized Cloud Computing International.
      </template>

      <template #top>
          <!-- Background image with true parallax -->
          <div class="absolute -inset-y-[25%] inset-x-0 -z-20 bg-cover bg-center bg-no-repeat will-change-transform"
              :style="{
                  backgroundImage: 'url(\'/Student_learning_on_tablet_2K_20261005122406.jpg\')',
                  transform: `translateY(${y * 0.4}px)`
              }" />
          <!-- Adaptive overlays -->
          <div class="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 to-transparent to-90% dark:from-black/90" />
          
          <!-- Grid texture -->
          <div class="absolute inset-y-0 left-0 w-2/3 -z-10 pointer-events-none [mask-image:linear-gradient(to_right,black,transparent)]">
              <svg class="absolute inset-0 h-full w-full text-primary-500/20 dark:text-primary-400/20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                      <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="1" />
                      </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-grid)" />
              </svg>
          </div>

          <!-- Primary color overlay -->
          <div class="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-transparent to-45%" />
      </template>

      <template #footer>
          <div class="flex flex-wrap gap-x-6 gap-y-3">
              <UButton v-for="(link, index) in heroLinks" :key="index" v-bind="link" />
          </div>

          <ul class="mt-6 sm:mt-12 flex flex-wrap gap-x-6 gap-y-2">
              <li v-for="item in checklist" :key="item" class="flex items-center gap-2 text-sm text-toned">
                  <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0" />
                  {{ item }}
              </li>
          </ul>
      </template>

      <!-- Ticker at bottom of hero -->
      <div
          class="absolute bottom-0 inset-x-0 border-t border-default bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md overflow-hidden flex py-4 z-10">
          <div class="flex whitespace-nowrap animate-ticker w-max hover:animation-paused">
              <div class="flex items-center gap-16 pr-16 shrink-0" v-for="i in 4" :key="`ticker-group-${i}`">
                  <NuxtLink v-for="mod in modules" :key="mod.title" :to="mod.to"
                      class="flex items-center gap-2 text-sm font-bold text-toned uppercase tracking-wider hover:text-primary transition-colors">
                      <UIcon :name="mod.icon" class="size-5 text-primary" />
                      {{ mod.title }}
                  </NuxtLink>
              </div>
          </div>
      </div>
  </UPageHero>

  <!-- Social proof -->
  <!-- <div class="border-y border-default bg-muted/50 py-10">
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
  </div> -->

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Why Choose Us"
    title="The digital campus, without the growing pains."
    description="Every facet of education is leaning towards technology. With more enrollees, more records, and repeated processes, manual operation simply can't keep up. The Digital Campus gives your school the best academic environment and most engaging experience."
    :features="features"
    :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10' }"
  />

  <!-- Modules Structure -->
  <UPageSection headline="The Platform" title="Every campus operation, one platform."
      description="From an applicant's first admission exam to an alumnus's profile — all cross-linked, all in the cloud, all in a single system dashboard."
      orientation="horizontal" :ui="{ features: 'grid grid-cols-2 gap-4' }">
      <template #features>
          <UPageFeature v-for="(module, index) in modules" :key="index" :title="module.title" icon="i-lucide-check" />
      </template>
      <HubDiagram center-label="CMS CORE" :nodes="modules" />
  </UPageSection>

  <!-- Feature details -->
  <UPageSection v-for="(feature, index) in featureDetails" :key="index" :id="feature.id" :title="feature.title"
      :description="feature.description" :features="feature.features.map(f => ({ ...f, ui: { leading: 'p-0' } }))"
      :orientation="feature.orientation" :reverse="feature.reverse" :ui="{
          description: 'text-primary',
      }">
      <component :is="feature.component" />
  </UPageSection>

  <!-- Security and Settings details -->
  <UPageSection
    id="security-settings"
    orientation="horizontal"
    headline="Security & system settings"
    title="In charge of every transaction"
    description="The Security module maintains all modules and transactions, while System Settings collate functions into one dashboard — semester definitions, grade systems, academic year, schedule templates, graduation dates, and application settings."
    :ui="{
      headline: 'flex items-center gap-2 before:content-[\'\'] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary uppercase tracking-widest text-xs font-semibold text-primary'
    }"
  >
    <template #features>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UCard
          v-for="setting in ['Semester Definition', 'Grade System', 'Academic Year', 'School Information', 'Schedule Templates', 'Graduation Dates', 'Logo & Signature', 'Auto-Lapse Control']"
          :key="setting"
          variant="soft"
          :ui="{ body: 'sm:p-4 font-medium' }"
        >
          {{ setting }}
        </UCard>
      </div>
    </template>
    <UPageGrid class="lg:grid-cols-2">
      <UPageCard
        v-for="(feature, index) in securityAndSettingsFeatures"
        :key="index"
        v-bind="feature"
        :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
        spotlight
      />
    </UPageGrid>
  </UPageSection>

  <!-- Student Admission Portal & Payment Gateway -->
  <UPageSection
    headline="Extend Your Platform"
    title="Portal access and online payment, built in."
    description="CampusCore goes beyond the back office — giving students a direct portal to apply and enroll online, and a secure payment gateway to settle fees without ever queuing."
    :ui="{
      headline: 'flex items-center gap-2 before:content-[\'\'] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary uppercase tracking-widest text-xs font-semibold text-primary'
    }"
  >
    <UPageGrid class="lg:grid-cols-2">
      <!-- Student Admission Portal -->
      <UPageCard
        title="Student Admission Portal"
        description="Aspiring students submit applications for University admission, with duplicate-applicant verification and automatic course filtering when a GWA falls below the minimum requirement."
        icon="i-lucide-door-open"
        spotlight
        :ui="{ 
          title: 'text-xl',
          leadingIcon: 'text-primary size-10' 
        }"
      >
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
        :ui="{
          root: 'bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-600 dark:to-primary-900 ring-primary-300/50 dark:ring-primary-500/30',
          title: 'text-primary-900 dark:text-white text-xl',
          description: 'text-primary-800/80 dark:text-white/60',
          leadingIcon: 'text-primary-700 dark:text-white size-10'
        }"
      >
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
  </UPageSection> -->

  <!-- Pricing -->
  <!-- <div class="bg-muted/30">
    <UPageSection
      id="pricing"
      headline="Pricing"
      title="Straightforward pricing for every school size"
      description="No hidden fees. No per-module add-ons. All plans include onboarding support and a 30-day pilot period so you can see the impact before committing."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div> -->

  <!-- CTA -->
  <div class="relative bg-primary dark:bg-primary/50 py-10 overflow-hidden">
    <div class="cta-grid-texture" />
    <UPageCTA
      title="Ready to modernize your campus operations?"
      description="Join 200+ schools using CampusCore to reduce admin workload and improve the student experience. Book a free demo with our team today."
      :links="ctaLinks"
      variant="naked" 
      :ui="{
          title: 'text-white',
          description: 'text-white/60'
      }" />
  </div>
</template>

<style scoped>
@keyframes ticker {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-25%);
    }
}

.animate-ticker {
    animation: ticker 40s linear infinite;
}

.hover\:animation-paused:hover {
    animation-play-state: paused;
}

.cta-grid-texture {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    -webkit-mask-image: radial-gradient(ellipse 160% 110% at 50% -5%, black 50%, transparent 75%);
    mask-image: radial-gradient(ellipse 160% 110% at 50% -5%, black 50%, transparent 75%);
}
</style>