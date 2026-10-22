<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenAmsDashboard,
  MockupScreenAmsRequisition,
  MockupScreenAmsInventory,
  MockupScreenAmsMaintenance,
  MockupScreenAmsReports,
  MockupScreenAmsActivities,
  MockupScreenAmsOrganization,
  MockupScreenAmsSettings,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'AMS — Asset Management System | CCCI',
  description: 'Tag, assign, and maintain every asset from request to retirement on desktop or mobile — built by Centralized Cloud Computing International.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: lifecycleEl, isVisible: lifecycleVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
  { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
  { label: 'Explore Modules', color: 'neutral' as const, variant: 'soft' as const, leadingIcon: 'i-lucide-play' },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75', size: 'lg' as const },
  { label: 'Talk to Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const modules = [
  { title: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '#dashboard' },
  { title: 'Requisition', icon: 'i-lucide-shopping-cart', to: '#requisition' },
  { title: 'Asset Inventory', icon: 'i-lucide-boxes', to: '#inventory' },
  { title: 'Maintenance', icon: 'i-lucide-wrench', to: '#maintenance' },
  { title: 'Reports', icon: 'i-lucide-bar-chart-3', to: '#reports' },
  { title: 'Activities', icon: 'i-lucide-arrow-left-right', to: '#activities' },
  { title: 'Organization', icon: 'i-lucide-building-2', to: '#organization' },
  { title: 'Settings', icon: 'i-lucide-settings', to: '#settings' },
]

const checklist = [
  'Barcode & QR tagging',
  'SSO with HRIS and CMS',
  'Mobile app included',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Single Connected Record',
    description: 'Tracks every asset from request to retirement — requisition, inventory, maintenance, and reporting without spreadsheets.',
    icon: 'i-lucide-link',
    orientation: 'vertical' as const,
  },
  {
    title: 'Barcode & QR Scanning',
    description: 'Instant lookup and physical verification via mobile or desktop camera scanning, ensuring accurate custody tracking.',
    icon: 'i-lucide-qr-code',
    orientation: 'vertical' as const,
  },
  {
    title: 'Proactive Maintenance',
    description: 'Automated repair schedules, condition checklists, and warranty alerts keep critical campus infrastructure running.',
    icon: 'i-lucide-wrench',
    orientation: 'vertical' as const,
  },
  {
    title: 'Campus-wide Integration',
    description: 'Built-in SSO and automated sync with HRIS personnel, CMS departments, and Finance procurement workflows.',
    icon: 'i-lucide-network',
    orientation: 'vertical' as const,
  },
]

const featureDetails = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'See what needs action, right now.',
    features: [
      { description: 'Acceptance and release checklists with real-time status.', icon: 'i-lucide-check' },
      { description: 'Automated alerts for maintenance and upcoming repairs.', icon: 'i-lucide-check' },
      { description: 'Daily, weekly, and monthly reservation schedules in one unified view.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenAmsDashboard,
  },
  {
    id: 'requisition',
    title: 'Requisition',
    description: 'Request what you need, in one place.',
    features: [
      { description: 'Request equipment, office supplies, and vehicle service in seconds.', icon: 'i-lucide-check' },
      { description: 'Reserve shared assets with clear availability calendars.', icon: 'i-lucide-check' },
      { description: 'Live status updates as requests progress through approval routing.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenAmsRequisition,
  },
  {
    id: 'inventory',
    title: 'Asset Inventory',
    description: 'Every asset, tagged and searchable.',
    features: [
      { description: 'Barcode, QR code, or serial-number tagging follows each asset across its lifecycle.', icon: 'i-lucide-check' },
      { description: 'Instant search by location, condition, assignee, or serial number.', icon: 'i-lucide-check' },
      { description: 'Groupings, software license tracking, and low-stock threshold alerts.', icon: 'i-lucide-check' },
      { description: 'Fast bulk data migration via Excel spreadsheets or flat files.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenAmsInventory,
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Fix it before it fails.',
    features: [
      { description: 'Complete maintenance, calibration, and repair history per asset.', icon: 'i-lucide-check' },
      { description: 'Automated notifications by email, in-app alerts, and chatbot.', icon: 'i-lucide-check' },
      { description: 'Assigned technician, vendor warranties, and live repair status.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenAmsMaintenance,
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Numbers management can act on.',
    features: [
      { description: 'Automated depreciation calculations and book value monitoring for every asset.', icon: 'i-lucide-check' },
      { description: 'Asset utilization metrics and shared equipment reservation analytics.', icon: 'i-lucide-check' },
      { description: 'Actionable analytics to support budget planning and top management decisions.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenAmsReports,
  },
  {
    id: 'activities',
    title: 'Activities',
    description: 'Know who has what, with proof.',
    features: [
      { description: 'Real-time tracking of assets waiting to be accepted or released.', icon: 'i-lucide-check' },
      { description: 'Photo and video attachments provide verifiable proof of physical condition.', icon: 'i-lucide-check' },
      { description: 'Live status notices: in transit, accepted, returned, or relocated.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenAmsActivities,
  },
  {
    id: 'organization',
    title: 'Organization',
    description: 'Mirror how your campus is organized.',
    features: [
      { description: 'Map divisions and departments to streamline searches and assignments.', icon: 'i-lucide-check' },
      { description: 'Define user roles and administrator permissions per campus group.', icon: 'i-lucide-check' },
      { description: 'HRIS triggers automatically update asset custodian records on staff changes.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenAmsOrganization,
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Roles, branding, and defaults.',
    features: [
      { description: 'Granular role-based rights for administrators, custodians, and staff.', icon: 'i-lucide-check' },
      { description: 'Flexible email or username sign-in with optional 2FA and Campus SSO.', icon: 'i-lucide-check' },
      { description: 'Full custom branding with your organization logo, colors, and symbol.', icon: 'i-lucide-check' },
      { description: 'Dynamic custom fields and automated notification rules.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenAmsSettings,
  },
]

// ─── Lifecycle Timeline Data ──────────────────────────────────────────────────
const assetLifecycle = {
  headline: 'From Request to Retirement',
  title: 'The complete asset lifecycle',
  description: 'Every physical and digital asset moves through an automated, auditable lifecycle — tracked every step of the way without spreadsheets.',
}

const assetLifecycleSteps = [
  {
    value: 'request',
    step: '01',
    phase: 'Requisition',
    title: 'Request & Approve',
    description: 'Staff submit requisitions for supplies, equipment, or service with multi-level approval routing.',
    icon: 'i-lucide-shopping-cart',
    deliverable: 'Approved Requisition',
  },
  {
    value: 'tag',
    step: '02',
    phase: 'Registry',
    title: 'Tag & Catalog',
    description: 'Assets receive unique Barcode or QR labels and are logged with serial number, category, and warranty.',
    icon: 'i-lucide-qr-code',
    deliverable: 'Registered Asset Tag',
  },
  {
    value: 'deploy',
    step: '03',
    phase: 'Custody',
    title: 'Release & Handover',
    description: 'Custodians sign off on receipt with attached photo or video verification of physical condition.',
    icon: 'i-lucide-arrow-left-right',
    deliverable: 'Signed Handover',
  },
  {
    value: 'maintain',
    step: '04',
    phase: 'Maintenance',
    title: 'Maintain & Calibrate',
    description: 'Automated schedules trigger preventive maintenance, repairs, and vendor warranty service before failures occur.',
    icon: 'i-lucide-wrench',
    deliverable: 'Service Record',
  },
  {
    value: 'depreciate',
    step: '05',
    phase: 'Reporting',
    title: 'Depreciate & Retire',
    description: 'Automated depreciation calculations, utilization reports, and verified disposal or replacement sign-offs.',
    icon: 'i-lucide-bar-chart-3',
    deliverable: 'Lifecycle Audit',
  },
]
</script>

<template>
  <!-- Hero -->
  <ProductHero
    badge="AMS · Asset Management System"
    background-image="/hero-ams-bg-3.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Every asset you own,<br>tracked in one place.
    </template>
    <template #description>
      Tag, assign, and maintain every asset from one dashboard — on desktop or mobile — built by <strong>Centralized Cloud Computing International</strong>.
    </template>
  </ProductHero>

  <!-- Core features grid -->
  <UPageSection
    id="why-choose-us"
    ref="featuresEl"
    class="section-reveal"
    :class="{ 'is-visible': featuresVisible }"
    headline="Why Choose Us"
    title="Engineered for complete asset control"
    description="Stop losing track of campus equipment. AMS unites procurement, inventory, maintenance, and accounting into one living record."
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
    title="Eight modules. One connected record."
    description="AMS is a single platform that tracks every asset from request to retirement — requisition, inventory, maintenance, and reporting, all connected. Nothing lives in a spreadsheet, and nothing gets entered twice."
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
      center-label="AMS CORE"
      :nodes="modules"
      class="reveal-right reveal-delay-400"
    />
  </UPageSection>

  <!-- Feature details: 8 Modules -->
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

  <!-- Asset Lifecycle Timeline -->
  <UPageSection
    id="lifecycle"
    ref="lifecycleEl"
    class="section-reveal"
    :class="{ 'is-visible': lifecycleVisible }"
    :headline="assetLifecycle.headline"
    :title="assetLifecycle.title"
    :description="assetLifecycle.description"
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <div>
      <ProductTimeline :items="assetLifecycleSteps" />
    </div>
  </UPageSection>

  <!-- CTA -->
  <UPageSection>
    <ProductCTA
      title="Ready to take complete control of your assets?"
      description="Join leading institutions and enterprises tracking thousands of assets with zero spreadsheet headaches. See AMS in action today."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
