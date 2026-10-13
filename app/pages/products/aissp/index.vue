<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
    MockupScreenAisspDeliverables,
    MockupScreenAisspProductivity,
    MockupScreenAisspPrototyping,
    MockupScreenAisspReordering,
    MockupScreenAisspReporting,
    MockupScreenAisspSecurity,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

useSeoMeta({
  title: 'AISSP — Automated Information Systems Strategic Plan',
  description: 'Align your organization\'s ICT projects with strategic goals. Track systems, budgets, and compliance effortlessly.',
})

const features = [
  {
    title: 'DICT-Ready Documents',
    description: 'Auto-format and generate printable ISSP documents with dynamic layouts that follow DICT reporting requirements.',
    icon: 'i-lucide-award',
    orientation: 'vertical' as const,
  },
  {
    title: 'Plan Before You Spend',
    description: 'Prototype multiple configuration scenarios and project budgets before committing a single peso.',
    icon: 'i-lucide-target',
    orientation: 'vertical' as const,
  },
  {
    title: 'One Source for IT Needs',
    description: 'Consolidate the IT requirements of every department into a single, reorderable strategic plan.',
    icon: 'i-lucide-layers',
    orientation: 'vertical' as const,
  },
  {
    title: 'Secure & Multi-Entity',
    description: 'Role-based access, single sign-on, and separate credentials per campus — approved plans are tagged and locked.',
    icon: 'i-lucide-shield-check',
    orientation: 'vertical' as const,
  }
]

const featureDetails = [
    {
        id: 'system-reordering',
        title: 'System Reordering & Formatting',
        description: 'Reorder by cost or priority — the document rebuilds itself.',
        features: [
            { description: 'Input and manage information about various systems in one module.', icon: 'i-lucide-check' },
            { description: 'Dynamically reorder systems based on cost or priority with drag-and-drop.', icon: 'i-lucide-check' },
            { description: 'Automate the formatting and generation of printable Word/PDF documents.', icon: 'i-lucide-check' },
            { description: 'Allow dynamic layout changes to the ISSP document per DICT requirements.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenAisspReordering,
    },
    {
        id: 'office-productivity',
        title: 'Office Productivity Management',
        description: "Every department's IT needs, consolidated and deployable.",
        features: [
            { description: 'Consolidate IT needs across all university departments.', icon: 'i-lucide-check' },
            { description: 'Build a deployment section listing end users and their specific needs, with item selection (laptops, desktops, printers).', icon: 'i-lucide-check' },
            { description: 'Upload pictures / diagrams and export the ISSP in Word/PDF, or the Summary of Investments in xls/xlsx/csv.', icon: 'i-lucide-check' },
            { description: 'Multi-entity support with unique credentials; approved documents are tagged, locked and edit-restricted.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenAisspProductivity,
    },
    {
        id: 'prototyping-planning',
        title: 'Prototyping & Planning',
        description: 'Model the budget before you commit it.',
        features: [
            { description: 'Input and save multiple configuration scenarios for partners.', icon: 'i-lucide-check' },
            { description: 'Project budget allocations across items (laptops, printers, supplies).', icon: 'i-lucide-check' },
            { description: 'Auto-adjust and summarize cost breakdowns under MOOE and Capital Outlay headings.', icon: 'i-lucide-check' },
            { description: 'Add or remove items with automatic recalculations, and upload data via flat file (CSV) for offline use.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenAisspPrototyping,
    },
    {
        id: 'reporting-investments',
        title: 'Reporting & Investments',
        description: 'The Summary of Investments, always up to date.',
        features: [
            { description: 'Generate the Summary of investments and export to xls/xlsx/csv.', icon: 'i-lucide-check' },
            { description: 'Produce print-ready ISSP outputs in Word and PDF.', icon: 'i-lucide-check' },
            { description: 'Dynamic data modeling and reporting keep every figure consistent across the plan.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenAisspReporting,
    },
    {
        id: 'deliverables',
        title: 'Deliverables',
        description: 'From interface to training — the whole package.',
        features: [
            { description: 'A user-friendly interface for system monitoring and document generation.', icon: 'i-lucide-check' },
            { description: 'A consolidated IT-needs database with an ISSP approval-tracking function.', icon: 'i-lucide-check' },
            { description: 'A prototyping tool for efficient planning and configuration management.', icon: 'i-lucide-check' },
            { description: 'Documentation and training materials for end users and administrators.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenAisspDeliverables,
    },
    {
        id: 'technical-security',
        title: 'Technical & Security',
        description: 'Cloud-native, secure, and ready to integrate.',
        features: [
            { description: 'Role-based access control and Single Sign-On with existing systems.', icon: 'i-lucide-check' },
            { description: 'Cloud-based platform with a portable app for offline access, synching when a connection is available.', icon: 'i-lucide-check' },
            { description: 'Microservice architecture using containerization (Docker, Containerd), web-responsive and mobile-viewable.', icon: 'i-lucide-check' },
            { description: 'Open to Financial Management System and Asset Management System integration.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenAisspSecurity,
    },
]

const stats = [
  { value: '100%', label: 'Compliance Rate' },
  { value: '30%', label: 'Budget Saved' },
  { value: '50+', label: 'Systems Managed' },
  { value: '24/7', label: 'Real-time Visibility' },
]

const testimonials = [
  {
    quote: 'AISSP has been instrumental in aligning our IT initiatives with the agency\'s goals. The budget tracking feature alone saved us from overspending on duplicate systems.',
    author: 'Mark Rivera',
    role: 'Chief Information Officer, Govt Agency',
    initials: 'MR',
  },
  {
    quote: 'Preparing our ISSP for DICT used to be a nightmare of spreadsheets. With this platform, compliance reporting is just a click away.',
    author: 'Sarah Jenkins',
    role: 'IT Director, Regional Office',
    initials: 'SJ',
  },
  {
    quote: 'The executive dashboards give our leadership complete visibility into our ICT investments, ensuring we are always on track with our strategic mandate.',
    author: 'Dr. Alan Chua',
    role: 'Director of Strategic Planning, Metro Institute',
    initials: 'AC',
  },
]

const plans = [
  {
    title: 'Basic',
    description: 'For small agencies starting their strategic planning.',
    price: '₱30,000',
    interval: 'mo',
    features: [
      'Up to 10 Systems tracked',
      'Basic Budget tracking',
      'Standard compliance reports',
      'Email support',
    ],
  },
  {
    title: 'Professional',
    description: 'For growing organizations with complex IT portfolios.',
    price: '₱60,000',
    interval: 'mo',
    highlight: true,
    features: [
      'Unlimited Systems',
      'Advanced Risk Management',
      'Executive Dashboards',
      'Audit Trails',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Custom solutions for large departments and bureaus.',
    price: 'Custom',
    features: [
      'Multi-agency consolidation',
      'Custom API integrations',
      'Dedicated success manager',
      'On-premise deployment option',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
  { label: 'Explore Features', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-arrow-right' },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const modules = [
    { title: 'System Reordering & Formatting', icon: 'i-lucide-layers', to: '#system-reordering' },
    { title: 'Office Productivity Management', icon: 'i-lucide-monitor', to: '#office-productivity' },
    { title: 'Prototyping & Planning', icon: 'i-lucide-target', to: '#prototyping-planning' },
    { title: 'Reporting & Investments', icon: 'i-lucide-bar-chart-3', to: '#reporting-investments' },
    { title: 'Deliverables', icon: 'i-lucide-file-text', to: '#deliverables' },
    { title: 'Technical & Security', icon: 'i-lucide-shield-check', to: '#technical-security' },
]

const checklist = [
    'Word / PDF export',
    'MOOE & Capital Outlay',
    'Cloud + offline sync',
]

const logoIcons = [
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-amazon', label: 'Amazon' },
  { name: 'i-simple-icons-ibm', label: 'IBM' },
  { name: 'i-simple-icons-cisco', label: 'Cisco' },
  { name: 'i-simple-icons-oracle', label: 'Oracle' },
]

const howItWorks = {
    headline: 'How it works',
    title: 'From needs to approved plan',
    description: 'Five guided steps take an institution from scattered IT requests to a locked, DICT-compliant strategic plan.',
}

const howItWorksSteps = [
    {
        value: 'consolidate',
        step: '01',
        phase: 'Intake',
        title: 'Consolidate',
        description: 'Gather IT needs from every department into one centralized database.',
        icon: 'i-lucide-database',
        deliverable: 'Central IT Needs',
    },
    {
        value: 'prototype',
        step: '02',
        phase: 'Simulation',
        title: 'Prototype',
        description: 'Model budget scenarios across MOOE and Capital Outlay.',
        icon: 'i-lucide-calculator',
        deliverable: 'Scenario Models',
    },
    {
        value: 'reorder',
        step: '03',
        phase: 'Prioritization',
        title: 'Reorder',
        description: 'Rank systems by cost or priority with live recalculation.',
        icon: 'i-lucide-arrow-down-up',
        deliverable: 'Ranked Priority',
    },
    {
        value: 'generate',
        step: '04',
        phase: 'Automation',
        title: 'Generate',
        description: 'Produce the DICT-formatted ISSP in Word or PDF.',
        icon: 'i-lucide-file-text',
        deliverable: 'DICT Documents',
    },
    {
        value: 'approve',
        step: '05',
        phase: 'Governance',
        title: 'Approve',
        description: 'Route for sign-off — approved plans are tagged and locked.',
        icon: 'i-lucide-shield-check',
        deliverable: 'Locked & Sealed Plan',
    },
]

</script>

<template>
  <!-- Hero -->
  <!-- <UPageHero
    headline="Introducing AISSP"
    title="Automated Information Systems Strategic Plan"
    description="Align your organization's ICT projects with strategic goals. Track systems, budgets, and compliance effortlessly."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenAisspDashboard />
  </UPageHero> -->
  <!-- Hero -->
  <ProductHero badge="DICT-aligned · Automated ISSP Creator" background-image="/hero-elib-bg.jpg"
      :links="heroLinks" :checklist="checklist" :modules="modules">
      <template #title>
          Strategic planning,<br> on autopilot.
      </template>
      <template #description>
          An Automated Information Systems Strategic Plan creator that consolidates IT needs, reorders systems by cost or priority and generates print-ready ISSP documents — built by <strong>Centralized Cloud Computing International</strong> to meet DICT requirements.
      </template>
  </ProductHero>

  <!-- Social proof -->
  <!-- <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by organizations worldwide for ICT Governance
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
    headline="Why choose us"
    title="Why our AISSP stands out"
    description="A strategic-planning platform engineered around compliance, cost control and the way institutions actually plan their IT."
    :features="features"
    :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10' }"
  />

  <!-- Modules Structure -->
  <UPageSection headline="The Platform" title="Six areas. One connected plan."
      description="A unified ISSP creator that links every planning function — system reordering, office productivity, prototyping, reporting, deliverables and the technical platform. One IT-needs database drives every export, kept in sync across campuses."
      orientation="horizontal" :ui="{ features: 'grid grid-cols-2 gap-4' }">
      <template #features>
          <UPageFeature v-for="(module, index) in modules" :key="index" :title="module.title" icon="i-lucide-check" />
      </template>
      <HubDiagram center-label="ISSP CORE" :nodes="modules" />
  </UPageSection>

  <!-- Feature details -->
  <UPageSection v-for="(feature, index) in featureDetails" :key="index" :id="feature.id" :title="feature.title"
      :description="feature.description" :features="feature.features.map(f => ({ ...f, ui: { leading: 'p-0' } }))"
      :orientation="feature.orientation" :reverse="feature.reverse" :ui="{
          description: 'text-primary',
      }">
      <component :is="feature.component" />
  </UPageSection>

  <!-- How it works -->
  <UPageSection :headline="howItWorks.headline" :title="howItWorks.title" :description="howItWorks.description">
      <ProductTimeline :items="howItWorksSteps" />
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
    title="Loved by IT Leaders"
    description="Hear how AISSP has helped organizations align their technology with their mission."
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
      title="Straightforward pricing for every organization"
      description="Choose the plan that fits your strategic planning goals."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div> -->

  <!-- CTA -->
  <UPageSection>
    <ProductCTA
      title="Ready to align your IT strategy?"
      description="Join leading institutions using AISSP to manage their ICT investments."
      :links="ctaLinks"
    />
  </UPageSection>
</template>
