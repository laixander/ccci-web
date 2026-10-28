<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
  MockupScreenDmsSearch,
  MockupScreenDmsOcr,
  MockupScreenDmsSignature,
  MockupScreenDmsVersioning,
  MockupScreenDmsWorkflow,
  MockupScreenDmsSecurity,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'DMS — Document Management System | CCCI',
  description: 'A centralized repository that scans, indexes, and manages your files — with real-time status, OCR, digital signatures, and full version history.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: deploymentEl, isVisible: deploymentVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
  { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
  { label: 'Explore Modules', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-play-circle' },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75' },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone' },
]

const modules = [
  { title: 'Search', icon: 'i-lucide-search', to: '#search' },
  { title: 'OCR Transcribing', icon: 'i-lucide-scan-text', to: '#ocr-transcribing' },
  { title: 'Digital Signature', icon: 'i-lucide-pen-tool', to: '#digital-signature' },
  { title: 'Versioning', icon: 'i-lucide-history', to: '#versioning' },
  { title: 'Workflow', icon: 'i-lucide-workflow', to: '#workflow' },
  { title: 'Security', icon: 'i-lucide-shield-check', to: '#security' },
]

const checklist = [
  'OCR in any language',
  'SSO, LDAP-ready',
  'Cloud or on-premise',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Centralized Repository',
    description: 'One secure home for every file — scanned, indexed, and instantly accessible by anyone with the right permissions.',
    icon: 'i-lucide-server',
  },
  {
    title: 'OCR & Full-Text Search',
    description: 'Find any document in seconds across keywords, metadata, content, and file attributes — even inside scanned images.',
    icon: 'i-lucide-search',
  },
  {
    title: 'Automated Workflows',
    description: 'Routing rules trigger automatically as documents change state — no reminders, no manual hand-offs.',
    icon: 'i-lucide-workflow',
  },
  {
    title: 'Enterprise Security',
    description: 'Role-based access, SSO/LDAP, cryptographic signatures, redaction, and a full audit trail of every action.',
    icon: 'i-lucide-shield-check',
  },
]

const deploymentFeatures = [
  {
    title: 'Any backend you choose',
    description: 'File system, S3-compatible cloud storage, or on-premise Minio.',
    icon: 'i-lucide-hard-drive',
    label: 'Storage',
  },
  {
    title: 'Bare metal to single-board',
    description: 'Virtual machine, public or private cloud, or a single board computer.',
    icon: 'i-lucide-server',
    label: 'Environment',
  },
  {
    title: 'Docker & Kubernetes',
    description: 'Deployed on Digital Ocean, Google Cloud, Azure, and IBM Cloud.',
    icon: 'i-lucide-boxes',
    label: 'Scale',
  },
]

const featureDetails = [
  {
    id: 'search',
    title: 'Search',
    description: 'Find any document in seconds.',
    features: [
      { description: 'Multiple search engines supported for maximum coverage.', icon: 'i-lucide-check' },
      { description: 'Keyword, metadata, and full-text search across all file types.', icon: 'i-lucide-check' },
      { description: 'LibreOffice-based preview of Word, Sheet, and Slide files.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenDmsSearch,
  },
  {
    id: 'ocr-transcribing',
    title: 'OCR Transcribing',
    description: 'Turn paper into searchable text.',
    features: [
      { description: 'Language detection routes each document to a compatible OCR engine.', icon: 'i-lucide-check' },
      { description: 'Transcription load distributed across engines for availability.', icon: 'i-lucide-check' },
      { description: 'Multi-page PDF, office, and TIFF support out of the box.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenDmsOcr,
  },
  {
    id: 'digital-signature',
    title: 'Digital Signature',
    description: 'Authentic documents, signed anywhere.',
    features: [
      { description: 'Verifies embedded cryptographic signatures with full PKI chain.', icon: 'i-lucide-check' },
      { description: 'Captures and digitizes handwritten signatures for storage.', icon: 'i-lucide-check' },
      { description: 'Remote contract signing for secure online transactions.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenDmsSignature,
  },
  {
    id: 'versioning',
    title: 'Versioning',
    description: 'Nothing gets lost or overwritten.',
    features: [
      { description: 'Non-destructive page mapping and reordering on every edit.', icon: 'i-lucide-check' },
      { description: 'Compare, download, or revert to any previous version.', icon: 'i-lucide-check' },
      { description: 'Comments, discussion threads, and color coding per version.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenDmsVersioning,
  },
  {
    id: 'workflow',
    title: 'Workflow',
    description: 'Documents move on rules, not reminders.',
    features: [
      { description: 'Routing rules and conditions set once, triggered automatically.', icon: 'i-lucide-check' },
      { description: 'Escalation and automatic state expiration keep things moving.', icon: 'i-lucide-check' },
      { description: 'Duplicate detection by file and label prevents double submissions.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: false,
    component: MockupScreenDmsWorkflow,
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Access controlled down to the action.',
    features: [
      { description: 'Role-based access and granular permissions on every atomic operation.', icon: 'i-lucide-check' },
      { description: 'SSO, LDAP, and email or username sign-in with multi-factor support.', icon: 'i-lucide-check' },
      { description: 'Full audit trail of user activity, document access, and redactions.', icon: 'i-lucide-check' },
    ],
    orientation: 'horizontal' as const,
    reverse: true,
    component: MockupScreenDmsSecurity,
  },
]
</script>

<template>
  <!-- Hero -->
  <ProductHero
    badge="DMS · Document Management System"
    background-image="/hero-dms-bg.jpg"
    :links="heroLinks"
    :checklist="checklist"
    :modules="modules"
  >
    <template #title>
      Every document,<br>findable, trackable, secure.
    </template>
    <template #description>
      The <strong>Document Management System</strong> is a centralized repository that scans, indexes, and manages
      your files — with real-time status, OCR, digital signatures, and full version history — built by
      <strong>Centralized Cloud Computing International</strong>.
    </template>
  </ProductHero>

  <!-- Why Choose Us -->
  <UPageSection
    id="why-choose-us"
    ref="featuresEl"
    class="section-reveal"
    :class="{ 'is-visible': featuresVisible }"
    headline="Why Choose Us"
    title="Six modules. One document record."
    description="DMS manages every document from upload to archive — search, OCR, signatures, versions, and workflow, all connected. Nothing lives in a folder on someone's desktop."
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

  <!-- The Platform -->
  <UPageSection
    id="platform"
    ref="modulesEl"
    class="section-reveal"
    :class="{ 'is-visible': modulesVisible }"
    headline="The Platform"
    title="Six modules. One document record."
    description="DMS is a single platform that manages every document from upload to archive — search, OCR, signatures, versions, and workflow, all connected."
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
      center-label="DMS CORE"
      :nodes="modules"
      class="reveal-right reveal-delay-400"
    />
  </UPageSection>

  <!-- Module Feature Details -->
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

  <!-- Deployment -->
  <UPageSection
    id="deployment"
    ref="deploymentEl"
    class="section-reveal"
    :class="{ 'is-visible': deploymentVisible }"
    headline="Deployment"
    title="Runs where your infrastructure already is"
    description="DMS adapts to your environment — choose any storage backend, any compute target, and any cloud or on-premise setup."
    :ui="{
      root: 'min-h-screen flex flex-col justify-center',
      headline: 'reveal-down',
      title: 'reveal-up reveal-delay-150',
      description: 'reveal-up reveal-delay-300',
    }"
  >
    <UPageGrid class="lg:grid-cols-3">
      <UPageCard
        v-for="(feat, index) in deploymentFeatures"
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

  <!-- CTA -->
  <UPageSection>
    <ProductCTA
      title="Ready to take control of your documents?"
      description="Join organizations using DMS to eliminate paper, speed up approvals, and secure every file — from upload to archive."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
