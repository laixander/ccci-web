<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenHkasTalentId,
  MockupScreenHkasCampusFitness,
  MockupScreenHkasDataCollection,
  MockupScreenHkasBenchmarking,
  MockupScreenHkasAnalyticsReporting,
  MockupScreenHkasUserManagement,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'HKAS — Human Kinetics Analysis System | CCCI',
  description: 'A centralized platform integrating high-speed cameras, strength testers, wearables, and fitness software for talent acquisition, biomechanics research, and campus-wide fitness norms.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl,  isVisible: modulesVisible  } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: hardwareEl, isVisible: hardwareVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
  {
    label: 'Request a Demo',
    trailingIcon: 'i-lucide-calendar',
    class: 'hero-cta-shadow',
  },
  {
    label: 'Explore Modules',
    to: '#platform',
    color: 'neutral' as const,
    variant: 'soft' as const,
    icon: 'i-lucide-play-circle',
  },
]

const ctaLinks = [
  {
    label: 'Request a Demo',
    icon: 'i-lucide-calendar',
    class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75',
    size: 'lg' as const,
  },
  {
    label: 'Talk to Human Kinetics Experts',
    color: 'neutral' as const,
    variant: 'soft' as const,
    trailingIcon: 'i-lucide-phone',
    size: 'lg' as const,
  },
]

const modules = [
  { title: 'Talent Identification', icon: 'i-lucide-sparkles',    to: '#talent-id' },
  { title: 'Campus Fitness',        icon: 'i-lucide-activity',    to: '#campus-fitness' },
  { title: 'Data Collection',       icon: 'i-lucide-scan-line',   to: '#data-collection' },
  { title: 'Benchmarking',          icon: 'i-lucide-scale',       to: '#benchmarking' },
  { title: 'Analytics & Reporting', icon: 'i-lucide-bar-chart-2', to: '#analytics-reporting' },
  { title: 'User Management',       icon: 'i-lucide-shield-check', to: '#user-management' },
]

const checklist = [
  '80+ sports, all genders',
  'AI-assisted talent acquisition',
  '3-year support, perpetual license',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Integrated Hardware & Software',
    description: 'Synchronizes high-speed cameras, dynamometers, and wearables with zero manual data entry or lost spreadsheets.',
    icon: 'i-lucide-cpu',
  },
  {
    title: 'AI-Assisted Talent Identification',
    description: 'Evaluates biomechanical and fitness data against global norms to predict optimal sport suitability across 80+ sports.',
    icon: 'i-lucide-sparkles',
  },
  {
    title: 'Campus-Wide Fitness Benchmarking',
    description: 'Calibrates local institutional norms to monitor population health, grade-level trends, and CHED PE compliance.',
    icon: 'i-lucide-activity',
  },
  {
    title: 'Enterprise Data Security',
    description: 'Role-based access control with granular permissions protects athlete medical records and student privacy.',
    icon: 'i-lucide-shield-check',
  },
]

const featureDetails = [
  {
    id: 'talent-id',
    title: 'Talent Identification',
    description: 'AI-assisted sport prediction, across 80+ sports.',
    features: [
      { description: 'Fitness assessment from data collected on students.', icon: 'i-lucide-check' },
      { description: 'Age- and gender-specific international norms.', icon: 'i-lucide-check' },
      { description: 'Predicts suitable sports from 80+, for all genders.', icon: 'i-lucide-check' },
      { description: 'Helps coaches and recruiters target specific skill sets.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenHkasTalentId,
  },
  {
    id: 'campus-fitness',
    title: 'Campus Fitness',
    description: 'Know where every student stands.',
    features: [
      { description: 'Percentile rank reported for each student.', icon: 'i-lucide-check' },
      { description: 'Local student results as the reference.', icon: 'i-lucide-check' },
      { description: 'Age- and gender-specific norms.', icon: 'i-lucide-check' },
      { description: 'Instant population-wide wellness categorizations.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHkasCampusFitness,
  },
  {
    id: 'data-collection',
    title: 'Data Collection',
    description: 'One record, built from every input.',
    features: [
      { description: 'Customizable forms to input performance data.', icon: 'i-lucide-check' },
      { description: 'Integration with databases and wearables.', icon: 'i-lucide-check' },
      { description: 'Automatic capture from devices and sensors.', icon: 'i-lucide-check' },
      { description: 'Zero duplicate entry across athletic departments.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenHkasDataCollection,
  },
  {
    id: 'benchmarking',
    title: 'Benchmarking',
    description: 'Norms your program can measure against.',
    features: [
      { description: 'Norms built from historical data and statistical analysis.', icon: 'i-lucide-check' },
      { description: 'Compare individuals or groups against established norms.', icon: 'i-lucide-check' },
      { description: 'Segment by age, gender, skill level, or role.', icon: 'i-lucide-check' },
      { description: 'Longitudinal progress tracking across academic terms.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHkasBenchmarking,
  },
  {
    id: 'analytics-reporting',
    title: 'Analytics & Reporting',
    description: 'Turn measurements into insight.',
    features: [
      { description: 'Advanced statistical analysis and trend modeling.', icon: 'i-lucide-check' },
      { description: 'Custom reports highlighting performance against norms.', icon: 'i-lucide-check' },
      { description: 'Interactive charts, graphs, and live dashboards.', icon: 'i-lucide-check' },
      { description: 'Automated CHED and accreditation compliance summaries.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenHkasAnalyticsReporting,
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Right data, right people.',
    features: [
      { description: 'Profile management with performance data.', icon: 'i-lucide-check' },
      { description: 'Roles and permissions per user type.', icon: 'i-lucide-check' },
      { description: 'Data security and privacy.', icon: 'i-lucide-check' },
      { description: 'Secure delegation between coaches, faculty, and medical staff.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenHkasUserManagement,
  },
]

// ─── Hardware Equipment Section ───────────────────────────────────────────────
const hardwareEquipment = [
  {
    title: 'High-Speed Camera',
    description: 'High-speed capture for sprint form, gait mechanics, and high-frequency motion tracking.',
    specification: '3 units · 1000fps @ 1920×1080',
    icon: 'i-lucide-video',
  },
  {
    title: 'Vertec Device',
    description: 'Standardized vertical jump measurement with high precision vane arrays.',
    specification: '3 sets · adjustable 6–12 ft',
    icon: 'i-lucide-arrow-up',
  },
  {
    title: 'Handheld Strength Tester',
    description: 'Digital dynamometer capturing peak and sustained force production for isometric muscle evaluation.',
    specification: '3 units · 0–300 lbs force',
    icon: 'i-lucide-gauge',
  },
  {
    title: 'ROM Tester',
    description: 'Precision digital goniometer measuring joint angle flexibility and orthopedic mobility limits.',
    specification: '3 units · 0°–360° range of motion',
    icon: 'i-lucide-rotate-cw',
  },
  {
    title: 'Anthropometric Kit',
    description: 'Standardized Level 1 ISAK calipers, bone gauges, and calibrated anatomical tape for body sizing.',
    specification: '30 units · ISAK Level 1 certified',
    icon: 'i-lucide-ruler',
  },
  {
    title: 'Body Composition Analyzer',
    description: 'Segmental bioelectrical impedance analyzer assessing visceral fat, skeletal muscle, and total water.',
    specification: '1 unit · multi-frequency BIA',
    icon: 'i-lucide-person-standing',
  },
]
</script>

<template>
  <!-- Hero (self-contained reveal) -->
  <ProductHero
    badge="HKAS · Human Kinetics Analysis System"
    background-image="/hero-hkas-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Elevating performance,<br>backed by real data.
    </template>
    <template #description>
      A centralized platform integrating high-speed cameras, strength testers, wearables, and fitness software — for talent acquisition, biomechanics research, and campus-wide fitness norms — built by
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
    title="Built for institutions running data-driven athletic and academic fitness programs"
    description="HKAS replaces disconnected clipboards and manual spreadsheets with an integrated measurement ecosystem — connecting laboratory hardware directly to coach and faculty dashboards."
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
    title="Six modules. One connected record."
    description="HKAS is a single platform that collects and stores data across every step — from talent identification to fitness benchmarks and reporting. Nothing lives in a spreadsheet, and nothing gets entered twice."
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

  <!-- Hardware: Precision equipment -->
  <UPageSection
    id="hardware"
    ref="hardwareEl"
    class="section-reveal"
    :class="{ 'is-visible': hardwareVisible }"
    headline="Hardware"
    title="Precision equipment, built into the platform"
    description="Every module is backed by devices that capture data automatically — no manual re-entry needed."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <UPageGrid class="lg:grid-cols-3">
      <UPageCard
        v-for="(item, index) in hardwareEquipment"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
        spotlight
        class="reveal-up"
        :style="{ animationDelay: `${400 + index * 80}ms` }"
      >
        <template #headline>
          <span class="text-[10px] font-bold uppercase tracking-widest text-primary">{{ item.specification }}</span>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>

  <!-- CTA (self-contained reveal via ProductCTA) -->
  <UPageSection>
    <ProductCTA
      title="Ready to elevate athletic performance with real data?"
      description="Equip your sports science faculty, varsity coaches, and campus wellness programs with a centralized analysis ecosystem. Perpetual license backed by 3-year support."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
