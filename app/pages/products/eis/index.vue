<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenEisSources,
  MockupScreenEisReports,
  MockupScreenEisModel,
  MockupScreenEisShare,
  MockupScreenEisThemes,
  MockupScreenEisEtl,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'EIS — Executive Information System | CCCI',
  description: 'Query and report across every system you run, in one dashboard — built for campus and enterprise leadership by Centralized Cloud Computing International.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl,  isVisible: featuresVisible  } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl,   isVisible: modulesVisible   } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: pipelinesEl, isVisible: pipelinesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

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
    label: 'Contact Leadership Sales',
    color: 'neutral' as const,
    variant: 'soft' as const,
    trailingIcon: 'i-lucide-phone',
    size: 'lg' as const,
  },
]

const modules = [
  { title: 'Data Sources',           icon: 'i-lucide-database',       to: '#data-sources' },
  { title: 'Reporting',              icon: 'i-lucide-file-bar-chart', to: '#reporting' },
  { title: 'Data Modeling',          icon: 'i-lucide-network',        to: '#data-modeling' },
  { title: 'Sharing & Collaboration', icon: 'i-lucide-share-2',       to: '#sharing-collaboration' },
  { title: 'Customization',          icon: 'i-lucide-palette',        to: '#customization' },
  { title: 'ETL Integration',        icon: 'i-lucide-workflow',       to: '#etl-integration' },
]

const checklist = [
  'Connects to any data source',
  'Role-based dashboards',
  'Built-in ETL',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Universal Data Connectivity',
    description: 'Seamlessly connect SQL databases, cloud ERP, REST APIs, and flat files into one source of truth without manual data exports.',
    icon: 'i-lucide-database',
  },
  {
    title: 'Role-Based Governance',
    description: 'Ensure institutional governance with fine-grained access control so board members, deans, and finance heads access precisely what they need.',
    icon: 'i-lucide-shield-check',
  },
  {
    title: 'Visual Relational Modeling',
    description: 'Link datasets across campus departments with an intuitive graphical schema editor — zero hand-crafted SQL joins required.',
    icon: 'i-lucide-network',
  },
  {
    title: 'Automated Pipeline Orchestration',
    description: 'Schedule recurring ingestion and data transformation jobs with a visual ETL builder, auto-retries, and real-time failure alerts.',
    icon: 'i-lucide-workflow',
  },
]

const featureDetails = [
  {
    id: 'data-sources',
    title: 'Data Sources',
    description: 'Connect everything you already run.',
    features: [
      { description: 'Databases and cloud services connected directly via high-speed native drivers.', icon: 'i-lucide-check' },
      { description: 'Excel files, CSVs, and other flat files uploaded and indexed effortlessly.', icon: 'i-lucide-check' },
      { description: 'Web services and REST APIs synchronized with automated authentication.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenEisSources,
  },
  {
    id: 'reporting',
    title: 'Reporting',
    description: 'The right report for the right role.',
    features: [
      { description: 'Role-based reports and dashboards tailored to executive and departmental needs.', icon: 'i-lucide-check' },
      { description: 'Granular access controls over sensitive student, financial, and salary metrics.', icon: 'i-lucide-check' },
      { description: 'Define user-specific actions from read-only auditing to executive annotations.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenEisReports,
  },
  {
    id: 'data-modeling',
    title: 'Data Modeling',
    description: 'Complex data, made simple to work with.',
    features: [
      { description: 'Build and validate cross-system data models with a graphical interface.', icon: 'i-lucide-check' },
      { description: 'Simplify complex data structures across disparate institutional silos.', icon: 'i-lucide-check' },
      { description: 'Enhance data analysis capabilities with visual cardinality and join mapping.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenEisModel,
  },
  {
    id: 'sharing-collaboration',
    title: 'Sharing & Collaboration',
    description: 'Share the insight, not the raw data.',
    features: [
      { description: 'Publish and distribute executive reports with end-to-end encryption.', icon: 'i-lucide-check' },
      { description: 'Facilitate leadership alignment and cross-departmental collaboration.', icon: 'i-lucide-check' },
      { description: 'Ensure full data privacy and governance with complete audit logging.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenEisShare,
  },
  {
    id: 'customization',
    title: 'Customization',
    description: 'Reports that look like yours.',
    features: [
      { description: 'Incorporate custom visuals, themes, crest watermarks, and brand palettes.', icon: 'i-lucide-check' },
      { description: 'Personalize the leadership user experience across tablets and desktops.', icon: 'i-lucide-check' },
      { description: 'Enhance presentation aesthetics with interactive funnel and waterfall charts.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenEisThemes,
  },
  {
    id: 'etl-integration',
    title: 'ETL Integration',
    description: 'Pipelines your team can actually build.',
    features: [
      { description: 'GUI for intuitive interaction that dramatically reduces the learning curve.', icon: 'i-lucide-check' },
      { description: 'Dynamic pipeline creation as institutional requirements evolve.', icon: 'i-lucide-check' },
      { description: 'Automate data movement, scheduled ingestion, and self-healing retries.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenEisEtl,
  },
]

// ─── Bonus Section: Data Pipelines ───────────────────────────────────────────
const pipelineFeatures = [
  {
    title: 'GUI, not code',
    description: 'An intuitive interface that simplifies ETL and reduces the learning curve for analytics teams.',
    icon: 'i-lucide-mouse-pointer-click',
    label: 'Interface',
  },
  {
    title: 'Built dynamically',
    description: 'Create pipelines on the fly as institutional and enterprise data requirements change.',
    icon: 'i-lucide-sliders',
    label: 'Pipelines',
  },
  {
    title: 'Workflows that run themselves',
    description: 'Automate recurring data movement, transformations, and dependency triggers between sources.',
    icon: 'i-lucide-zap',
    label: 'Automation',
  },
]
</script>

<template>
  <!-- Hero (self-contained reveal) -->
  <ProductHero
    badge="EIS · Executive Information System"
    background-image="/hero-eis-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Insight, without<br>waiting on IT.
    </template>
    <template #description>
      Query and report across every system you run, in one dashboard — built for campus and enterprise leadership by
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
    title="Built on cloud services, modern data platforms, and tools you already use"
    description="EIS connects every data source you run into a single executive interface — modeling, reporting, sharing, and automated pipelines, all together without disconnected spreadsheets."
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
    title="Six capabilities. One data platform."
    description="EIS is a single platform that connects every data source you run into one place — modeling, reporting, sharing, and pipelines, all together. Nothing lives in a disconnected spreadsheet, and nothing gets exported twice."
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
      center-label="EIS CORE"
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

  <!-- Bonus Section: Data Pipelines -->
  <UPageSection
    id="pipelines"
    ref="pipelinesEl"
    class="section-reveal"
    :class="{ 'is-visible': pipelinesVisible }"
    headline="Pipeline Architecture"
    title="Pipelines your team can actually build"
    description="Automate data movement between sources with an intuitive graphical ETL engine. No custom cron jobs, no manual imports, and no fragile scripts."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <UPageGrid class="lg:grid-cols-3">
      <UPageCard
        v-for="(feat, index) in pipelineFeatures"
        :key="feat.title"
        :title="feat.title"
        :description="feat.description"
        :icon="feat.icon"
        :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
        spotlight
        class="reveal-up"
        :style="{ animationDelay: `${400 + index * 80}ms` }"
      >
        <template #headline>
          <span class="text-[10px] font-bold uppercase tracking-widest text-muted">{{ feat.label }}</span>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>

  <!-- CTA (self-contained reveal via ProductCTA) -->
  <UPageSection>
    <ProductCTA
      title="Ready to lead with real-time insight?"
      description="Query and report across every system you run in one unified dashboard. Join institutions and organizations modernizing their executive intelligence with CCCI."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
