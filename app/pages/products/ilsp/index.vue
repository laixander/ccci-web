<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenIlspAdmin,
  MockupScreenIlspPartner,
  MockupScreenIlspMobile
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'ILSP — Institutional Linkages and Special Projects | CCCI',
  description: 'Create, support, and strengthen institutional partnerships — from registration to MOU compliance — in one centralized hub — built by Centralized Cloud Computing International.'
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: analyticsEl, isVisible: analyticsVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
  { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
  { label: 'Explore Modules', to: '#platform', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-play-circle' }
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75', size: 'lg' as const },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const }
]

const modules = [
  { title: 'Admin Module', icon: 'i-lucide-shield-check', to: '#admin-module' },
  { title: 'Partner Module', icon: 'i-lucide-users', to: '#partner-module' },
  { title: 'Mobile Application', icon: 'i-lucide-smartphone', to: '#mobile-app' }
]

const checklist = [
  'Centralized partner database',
  'MOU lifecycle tracking',
  'Mobile app included'
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Centralized Partner Database',
    description: 'A single source of truth for partner profiles, institutions, contacts, and active engagements with real-time updates.',
    icon: 'i-lucide-building-2'
  },
  {
    title: 'MOU Lifecycle Oversight',
    description: 'Track agreements from drafting to execution and compliance, backed by automated alerts that prevent expiration surprises.',
    icon: 'i-lucide-file-signature'
  },
  {
    title: 'Transparent Partner Portal',
    description: 'Empower partner institutions to submit documentation, monitor milestones, and communicate directly in a dedicated portal.',
    icon: 'i-lucide-users'
  },
  {
    title: 'On-the-Go Mobile Access',
    description: 'Native mobile app gives administrators and partners push notifications, task milestones, and real-time alerts anywhere.',
    icon: 'i-lucide-smartphone'
  }
]

const featureDetails = [
  {
    id: 'admin-module',
    title: 'Admin Module',
    description: 'A single source of truth for every partnership.',
    features: [
      { description: 'Design and customize partner registration forms with flexible data fields.', icon: 'i-lucide-check' },
      { description: 'Centralized database with real-time updates and status notifications.', icon: 'i-lucide-check' },
      { description: 'MOU creation, execution, and compliance tracking from initiation to evaluation.', icon: 'i-lucide-check' },
      { description: 'Automated workflows, document sharing, and detailed reports on partner performance.', icon: 'i-lucide-check' }
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenIlspAdmin
  },
  {
    id: 'partner-module',
    title: 'Partner Module',
    description: 'A transparent experience for your partners.',
    features: [
      { description: 'Online registration and document submission in a dedicated partner space.', icon: 'i-lucide-check' },
      { description: 'Milestone tracking against agreed objectives and shared timelines.', icon: 'i-lucide-check' },
      { description: 'Shared document access with built-in feedback loops and milestone updates.', icon: 'i-lucide-check' },
      { description: 'Comprehensive performance and evaluation reports accessible on demand.', icon: 'i-lucide-check' }
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenIlspPartner
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    description: 'Manage partnerships anywhere.',
    features: [
      { description: 'Mobile registration and rapid partner onboarding on iOS and Android.', icon: 'i-lucide-check' },
      { description: 'Task and milestone management directly from the mobile interface.', icon: 'i-lucide-check' },
      { description: 'Real-time dashboards and partner analytics accessible on the go.', icon: 'i-lucide-check' },
      { description: 'Push notifications and in-app communication for instant alert resolution.', icon: 'i-lucide-check' }
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenIlspMobile
  }
]

// ─── Analytics Section Data ───────────────────────────────────────────────────
const analyticsFeatures = [
  {
    title: 'Internationalization Metrics',
    description: 'Track active partnerships, outbound mobility rates, and MOU coverage by region in a single dashboard.',
    icon: 'i-lucide-globe'
  },
  {
    title: 'Grant & Funding Tracker',
    description: 'Monitor international research grants, scholarships, and joint funding with a dedicated financial overview.',
    icon: 'i-lucide-badge-dollar-sign'
  },
  {
    title: 'CHED Compliance Reports',
    description: 'Generate accreditation-ready reports on global linkages and exchange program outcomes in one click.',
    icon: 'i-lucide-file-bar-chart'
  },
  {
    title: 'Institutional Benchmarking',
    description: 'Compare your internationalization performance against targets and national standards each semester.',
    icon: 'i-lucide-trophy'
  }
]
</script>

<template>
  <!-- Hero -->
  <ProductHero
    badge="ILSP · Institutional Linkages and Special Projects"
    background-image="/hero-ilsp-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Partnerships that grow, not stall.
    </template>
    <template #description>
      Create, support, and strengthen institutional partnerships — from registration to MOU compliance — in one centralized hub — built by
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
    title="Built for offices managing institutional linkages"
    description="Built for offices managing shared research, resource allocation, and joint institutional initiatives — eliminating scattered files and duplicate data entry."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300'
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
    title="Three modules. One partnership record."
    description="ILSP is a single platform that carries a partnership from registration to renewal — admin oversight, partner engagement, and mobile access, all connected. Nothing lives in scattered files, and nothing gets entered twice."
    orientation="horizontal"
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      features: 'grid grid-cols-1 sm:grid-cols-3 gap-4',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300'
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
      center-label="ILSP CORE"
      :nodes="modules"
      class="reveal-right reveal-delay-400"
    />
  </UPageSection>

  <!-- Feature details (self-contained reveal via ProductFeature) -->
  <ProductFeature
    v-for="(feature, index) in featureDetails"
    :id="feature.id"
    :key="index"
    :title="feature.title"
    :description="feature.description"
    :features="feature.features"
    :orientation="feature.orientation"
    :reverse="feature.reverse"
  >
    <component :is="feature.component" />
  </ProductFeature>

  <!-- Global Analytics -->
  <UPageSection
    id="analytics"
    ref="analyticsEl"
    class="section-reveal"
    :class="{ 'is-visible': analyticsVisible }"
    headline="Global Analytics"
    title="Real-time visibility into your global footprint"
    description="From MOU renewal timelines to exchange program outcomes — LinkagesCore gives you the data you need to demonstrate internationalization impact to CHED and accreditation bodies."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300'
    }"
  >
    <UPageGrid class="lg:grid-cols-2">
      <UPageCard
        v-for="(feature, index) in analyticsFeatures"
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
      title="Ready to strengthen your institutional partnerships?"
      description="Join institutions using ILSP to centralize partner records, track MOU lifecycles, and stay connected from desktop to mobile."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
