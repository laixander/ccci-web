<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenIrsApp,
  MockupScreenIrsPhotoVideo,
  MockupScreenIrsLocation,
  MockupScreenIrsTemplates,
  MockupScreenIrsDispatch,
  MockupScreenIrsDashboard,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'IRS — Incident Reporting System | CCCI',
  description: 'A mobile app that lets students report incidents instantly — with photo, video, and precise location, straight to campus response teams.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl,  isVisible: modulesVisible  } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: flowEl,     isVisible: flowVisible     } = useScrollReveal({ threshold: 0.3, delay: 300 })

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
    label: 'Contact Campus Safety',
    color: 'neutral' as const,
    variant: 'soft' as const,
    trailingIcon: 'i-lucide-phone',
    size: 'lg' as const,
  },
]

const modules = [
  { title: 'Mobile App',          icon: 'i-lucide-smartphone',       to: '#mobile-app' },
  { title: 'Photo & Video',       icon: 'i-lucide-camera',           to: '#photo-video' },
  { title: 'Precise Location',    icon: 'i-lucide-map-pin',          to: '#precise-location' },
  { title: 'Emergency Templates', icon: 'i-lucide-file-text',        to: '#emergency-templates' },
  { title: 'Instant Dispatch',    icon: 'i-lucide-radio',            to: '#instant-dispatch' },
  { title: 'Response Dashboard',  icon: 'i-lucide-layout-dashboard', to: '#response-dashboard' },
]

const checklist = [
  'Android & iOS compatible',
  'Live location sharing',
  'No voice or text plan needed',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Sub-60s Emergency Reporting',
    description: 'Students report accidents, medical emergencies, and safety hazards in seconds with photos, video clips, and templates — zero airtime or load required.',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Precision GPS & Floor Mapping',
    description: 'Pinpoint building, floor level, and precise coordinates automatically so responders know the exact location before arriving on scene.',
    icon: 'i-lucide-map-pin',
  },
  {
    title: 'Instant Team Dispatch',
    description: 'Alerts route directly to on-duty campus security, medical personnel, and administrative teams without manual phone relays or call-center delays.',
    icon: 'i-lucide-radio',
  },
  {
    title: 'Live Incident Command',
    description: 'Real-time dashboard tracks incident status from initial student alert to resolution, keeping reporters informed and responders coordinated.',
    icon: 'i-lucide-shield-alert',
  },
]

const featureDetails = [
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'Report from the phone students already carry.',
    features: [
      { description: 'Compatible with Android and iOS devices.', icon: 'i-lucide-check' },
      { description: 'Removes the cost of mobile voice and text services.', icon: 'i-lucide-check' },
      { description: 'Effortless navigation designed for high-stress emergency situations.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenIrsApp,
  },
  {
    id: 'photo-video',
    title: 'Photo & Video',
    description: 'Show responders what is happening in real time.',
    features: [
      { description: 'Capture photo and video directly from the device camera.', icon: 'i-lucide-check' },
      { description: 'Transmit evidence straight to the appropriate campus authorities.', icon: 'i-lucide-check' },
      { description: 'Eliminate physical reporting delays with immediate visual assessment.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenIrsPhotoVideo,
  },
  {
    id: 'precise-location',
    title: 'Precise Location',
    description: 'Responders know exactly where to go.',
    features: [
      { description: 'Precise location details attached automatically to every report.', icon: 'i-lucide-check' },
      { description: 'Pinpoint building, floor, and nearest landmark to assist students promptly.', icon: 'i-lucide-check' },
      { description: 'Reduces critical back-and-forth phone calls and search time.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenIrsLocation,
  },
  {
    id: 'emergency-templates',
    title: 'Emergency Templates',
    description: 'No typing when every second counts.',
    features: [
      { description: 'Pre-configured templates for common campus emergencies.', icon: 'i-lucide-check' },
      { description: 'Saves valuable seconds during high-pressure emergency situations.', icon: 'i-lucide-check' },
      { description: 'Captures consistent, actionable details that responders can act on immediately.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenIrsTemplates,
  },
  {
    id: 'instant-dispatch',
    title: 'Instant Dispatch',
    description: 'From tap to responder, instantly.',
    features: [
      { description: 'Delivered directly to the right response team and security outpost.', icon: 'i-lucide-check' },
      { description: 'No delay from physical reporting or manual telephone relays.', icon: 'i-lucide-check' },
      { description: 'Reporter is kept continuously informed of status and responder ETA.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenIrsDispatch,
  },
  {
    id: 'response-dashboard',
    title: 'Response Dashboard',
    description: 'See every open incident at a glance.',
    features: [
      { description: 'Live list of open incidents categorized by urgency and building.', icon: 'i-lucide-check' },
      { description: 'Track status from reported to en route and resolved in real time.', icon: 'i-lucide-check' },
      { description: 'Comprehensive overview of campus-wide response activity and officer status.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenIrsDashboard,
  },
]

// ─── Response Flow Timeline Data ─────────────────────────────────────────────
const responseFlowSteps = [
  {
    value: 'report',
    step: '01',
    phase: 'Report',
    title: 'Student sends the alert',
    description: 'A template, photo, video, and location — sent in seconds without needing mobile voice or text plans.',
    icon: 'i-lucide-smartphone',
    deliverable: 'Instant Alert',
  },
  {
    value: 'dispatch',
    step: '02',
    phase: 'Dispatch',
    title: 'Response team is notified',
    description: 'The report reaches the right team instantly, eliminating physical reporting delays and routing confusion.',
    icon: 'i-lucide-radio',
    deliverable: 'Team Assigned',
  },
  {
    value: 'resolve',
    step: '03',
    phase: 'Resolve',
    title: 'Help arrives informed',
    description: 'Campus responders reach the student with building, floor, and visual evidence in hand before they arrive.',
    icon: 'i-lucide-shield-check',
    deliverable: 'Incident Closed',
  },
]
</script>

<template>
  <!-- Hero (self-contained reveal) -->
  <ProductHero
    badge="IRS · Incident Reporting System"
    background-image="/hero-irs-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      An emergency report, sent in seconds.
    </template>
    <template #description>
      A mobile app that lets students report incidents instantly — with photo, video, and precise location, straight to campus response teams — built by
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
    title="Built for universities and colleges that need faster emergency response"
    description="IRS connects student phones directly to on-duty campus response teams — eliminating lost calls, manual delays, and miscommunication when every second counts."
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
    title="Six capabilities. One emergency response."
    description="IRS is a single platform that carries a report from a student's phone to a responder's screen — capture, location, templates, and dispatch, all connected. Nothing gets lost in a phone call, and nothing gets typed twice."
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
      center-label="IRS CORE"
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

  <!-- Response Flow -->
  <UPageSection
    id="flow"
    ref="flowEl"
    class="section-reveal"
    :class="{ 'is-visible': flowVisible }"
    headline="Response"
    title="From tap to responder, in one flow"
    description="IRS connects students and campus responders in three synchronized steps, eliminating communication bottlenecks."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <div>
      <ProductTimeline :items="responseFlowSteps" />
    </div>
  </UPageSection>

  <!-- CTA (self-contained reveal via ProductCTA) -->
  <UPageSection>
    <ProductCTA
      title="Ready to accelerate your campus emergency response?"
      description="Equip your students, staff, and safety officers with an instant reporting and dispatch system. Built for universities and colleges across the Philippines."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
