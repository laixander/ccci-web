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

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
    title: 'AISSP — Automated Information Systems Strategic Plan',
    description: 'Align your organization\'s ICT projects with strategic goals. Track systems, budgets, and compliance effortlessly.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: howItWorksEl, isVisible: howItWorksVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
    { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
    { label: 'Explore Features', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-arrow-right' },
]

const ctaLinks = [
    { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
    { label: 'Contact Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
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

// ─── Page Content Data ────────────────────────────────────────────────────────
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
    },
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
    <ProductHero badge="DICT-aligned · Automated ISSP Creator"
        background-image="/Woman_holding_tablet_in_office_2K_20261014094349.jpg" :links="heroLinks"
        :checklist="checklist" :modules="modules">
        <template #title>
            Strategic planning,<br> on autopilot.
        </template>
        <template #description>
            An Automated Information Systems Strategic Plan creator that consolidates IT needs, reorders systems by cost
            or priority and generates print-ready ISSP documents — built by <strong>Centralized Cloud Computing
                International</strong> to meet DICT requirements.
        </template>
    </ProductHero>

    <!-- Core features grid -->
    <UPageSection id="features" ref="featuresEl" class="section-reveal" :class="{ 'is-visible': featuresVisible }"
        headline="Why choose us" title="Why our AISSP stands out"
        description="A strategic-planning platform engineered around compliance, cost control and the way institutions actually plan their IT."
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
        headline="The Platform" title="Six areas. One connected plan."
        description="A unified ISSP creator that links every planning function — system reordering, office productivity, prototyping, reporting, deliverables and the technical platform. One IT-needs database drives every export, kept in sync across campuses."
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
        <HubDiagram center-label="ISSP CORE" :nodes="modules" class="reveal-right reveal-delay-400" />
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

    <!-- How it works -->
    <UPageSection ref="howItWorksEl" class="section-reveal" :class="{ 'is-visible': howItWorksVisible }"
        :headline="howItWorks.headline" :title="howItWorks.title" :description="howItWorks.description"
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <div>
            <ProductTimeline :items="howItWorksSteps" />
        </div>
    </UPageSection>

    <!-- CTA -->
    <UPageSection>
        <ProductCTA title="Ready to align your IT strategy?"
            description="Join leading institutions using AISSP to manage their ICT investments." :links="ctaLinks" />
    </UPageSection>
</template>
