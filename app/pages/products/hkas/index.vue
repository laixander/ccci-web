<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenHkasDashboard,
  MockupScreenHkasAssessment,
  MockupScreenHkasAnalytics,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'KineticsCore — Human Kinetics Assessment System | CCCI',
  description: 'Digitize fitness assessments, track body composition, manage PE curriculum, and run corporate wellness programs — built by Centralized Cloud Computing International.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl,  isVisible: featuresVisible  } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl,   isVisible: modulesVisible   } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: dashboardEl, isVisible: dashboardVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
  { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-play-circle' },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75', size: 'lg' as const },
  { label: 'Schedule a Call', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const modules = [
  { title: 'Fitness Assessment',  icon: 'i-lucide-clipboard-list',   to: '#assessment' },
  { title: 'Body Composition',    icon: 'i-lucide-person-standing',   to: '#assessment' },
  { title: 'PE Curriculum',       icon: 'i-lucide-book-open',         to: '#flow'       },
  { title: 'Corporate Wellness',  icon: 'i-lucide-heart-pulse',       to: '#flow'       },
  { title: 'Sports Performance',  icon: 'i-lucide-trophy',            to: '#dashboard'  },
  { title: 'Analytics',           icon: 'i-lucide-bar-chart-2',       to: '#dashboard'  },
]

const checklist = [
  'CHED-compliant reporting',
  'Mobile-first assessment',
  'Schools & corporates',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Fitness Assessment Engine',
    description: 'Administer standardized tests — VO₂ max, BMI, push-up, sit-and-reach — with automated scoring and national percentile benchmarks.',
    icon: 'i-lucide-clipboard-list',
  },
  {
    title: 'PE Curriculum Management',
    description: 'Build lesson plans, assign graded activities, manage schedules, and generate CHED-compliant PE reports automatically.',
    icon: 'i-lucide-book-open',
  },
  {
    title: 'Corporate Wellness Programs',
    description: 'Launch company-wide fitness challenges, track employee wellness milestones, and reduce health-related absenteeism with real data.',
    icon: 'i-lucide-heart-pulse',
  },
  {
    title: 'Assessment Analytics',
    description: 'Population-level health insights, cohort comparisons, grade-level benchmarking, and exportable compliance reports for CHED.',
    icon: 'i-lucide-bar-chart-2',
  },
]

const featureDetails = [
  {
    id: 'assessment',
    title: 'Fitness Assessment',
    description: 'Assessments that score themselves.',
    features: [
      { description: 'Standardized national tests — VO₂ max, sit-and-reach, BMI, 50-meter dash — with automated scoring.', icon: 'i-lucide-check' },
      { description: 'Percentile rankings against national benchmarks instantly generated for every individual tested.', icon: 'i-lucide-check' },
      { description: 'Digital result reports ready in seconds — no spreadsheets, no manual tallying, no delays.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenHkasAssessment,
  },
  {
    id: 'flow',
    title: 'Wellness Analytics',
    description: 'Data that drives healthier outcomes.',
    features: [
      { description: 'Track population health trends across grade levels, departments, and cohorts over time.', icon: 'i-lucide-check' },
      { description: 'Identify at-risk individuals early and benchmark against national fitness standards automatically.', icon: 'i-lucide-check' },
      { description: 'Generate CHED-compliant PE reports and accreditation documentation with one click.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHkasAnalytics,
  },
]

// ─── Wellness Dashboard Section ───────────────────────────────────────────────
const wellnessFeatures = [
  {
    title: 'Real-Time Wellness Dashboard',
    description: 'Monitor organization-wide fitness metrics, participation rates, and wellness program progress in a single unified view.',
    icon: 'i-lucide-layout-dashboard',
  },
  {
    title: 'Sports Performance Tracking',
    description: 'Track athlete training loads, log competition results, monitor recovery, and benchmark against performance targets each season.',
    icon: 'i-lucide-trophy',
  },
  {
    title: 'Body Composition Monitoring',
    description: 'Record and monitor individual body composition longitudinally — identify health risks early with trend analysis over time.',
    icon: 'i-lucide-person-standing',
  },
  {
    title: 'Mobile-First Data Collection',
    description: 'Administer tests and collect data from any device on the field, in the gym, or on the court — no laptop required.',
    icon: 'i-lucide-smartphone',
  },
]
</script>

<template>
  <!-- Hero -->
  <ProductHero
    badge="KineticsCore · Human Kinetics Assessment System"
    background-image="/hero-hkas-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Physical fitness, assessed<br>with precision.
    </template>
    <template #description>
      The <strong>Human Kinetics Assessment System</strong> digitizes fitness assessments, PE curriculum, and corporate wellness programs — built by
      <strong>Centralized Cloud Computing International</strong>.
    </template>
  </ProductHero>

  <!-- Core features grid -->
  <UPageSection
    id="why-choose-us"
    ref="featuresEl"
    class="section-reveal"
    :class="{ 'is-visible': featuresVisible }"
    headline="Why Choose Us"
    title="Engineered for complete fitness management"
    description="Stop managing fitness tests on paper. KineticsCore automates assessments, generates CHED-compliant reports, and gives schools and organizations a complete view of population health."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <template #features>
      <UPageFeature
        v-for="(feature, i) in features"
        :key="feature.title"
        v-bind="feature"
        class="reveal-up"
        :style="{ animationDelay: `${400 + i * 100}ms` }"
      />
    </template>
  </UPageSection>

  <!-- Hub diagram: The Platform -->
  <UPageSection
    id="platform"
    ref="modulesEl"
    class="section-reveal"
    :class="{ 'is-visible': modulesVisible }"
    headline="The Platform"
    title="Six modules. One fitness record."
    description="KineticsCore manages the entire wellness lifecycle — from individual assessments to population-level analytics. Whether you're a school, university, or corporation, one platform covers everything."
    orientation="horizontal"
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      features: 'grid grid-cols-2 gap-4',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <template #features>
      <UPageFeature
        v-for="(module, index) in modules"
        :key="index"
        :title="module.title"
        icon="i-lucide-check"
        class="reveal-up"
        :style="{ animationDelay: `${400 + index * 60}ms` }"
      />
    </template>
    <HubDiagram
      center-label="HKAS CORE"
      :nodes="modules"
      class="reveal-right reveal-delay-400"
    />
  </UPageSection>

  <!-- Feature details (self-contained reveal via ProductFeature) -->
  <ProductFeature
    v-for="(feature, index) in featureDetails"
    :key="index"
    :id="feature.id"
    :title="feature.title"
    :description="feature.description"
    :features="feature.features"
    :orientation="feature.orientation"
    :reverse="feature.reverse"
  >
    <component :is="feature.component" />
  </ProductFeature>

  <!-- Wellness Dashboard -->
  <UPageSection
    id="dashboard"
    ref="dashboardEl"
    class="section-reveal"
    :class="{ 'is-visible': dashboardVisible }"
    headline="Wellness Dashboard"
    title="Complete visibility into organization-wide health"
    description="KineticsCore's unified dashboard gives PE departments, HR teams, and coaches a single screen for fitness data, program participation, sports performance, and wellness metrics."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <UPageGrid class="lg:grid-cols-2">
      <UPageCard
        v-for="(feature, index) in wellnessFeatures"
        :key="feature.title"
        v-bind="feature"
        :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
        spotlight
        class="reveal-up"
        :style="{ animationDelay: `${400 + index * 80}ms` }"
      />
    </UPageGrid>
  </UPageSection>

  <!-- CTA (self-contained reveal via ProductCTA) -->
  <UPageSection>
    <ProductCTA
      title="Ready to transform how you assess physical fitness?"
      description="Join schools, universities, and corporations using KineticsCore to build healthier, more active communities — with data that actually drives action."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
