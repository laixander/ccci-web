<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
    MockupScreenFmsBudgeting,
    MockupScreenFmsMasterfile,
    MockupScreenFmsInventory,
    MockupScreenFmsProperty,
    MockupScreenFmsDisbursements,
    MockupScreenFmsCollections,
    MockupScreenFmsLedger,
    MockupScreenFmsTax,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

// ─── SEO ──────────────────────────────────────────────────────────────────────
useSeoMeta({
    title: 'FMS — Financial Management System',
    description: 'One end-to-end financial platform connecting procurement, inventory, budgeting, assets, payables and collections to a live general ledger — built by Centralized Cloud Computing International.',
})

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const { el: featuresEl, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: modulesEl, isVisible: modulesVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })
const { el: cycleEl, isVisible: cycleVisible } = useScrollReveal({ threshold: 0.3, delay: 300 })

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
    { label: 'Request a Demo', trailingIcon: 'i-lucide-calendar', class: 'hero-cta-shadow' },
    { label: 'Watch Demo', color: 'neutral' as const, variant: 'soft' as const, leadingIcon: 'i-lucide-play' },
]

const ctaLinks = [
    { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
    { label: 'Talk to Sales', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const modules = [
    { title: 'Masterfile Setup', icon: 'i-lucide-database', to: '#masterfile-setup' },
    { title: 'Procurement & Inventory', icon: 'i-lucide-shopping-cart', to: '#procurement-inventory' },
    { title: 'Budget', icon: 'i-lucide-pie-chart', to: '#budget' },
    { title: 'Property & Fixed Assets', icon: 'i-lucide-building-2', to: '#property-fixed-assets' },
    { title: 'Payables & Disbursements', icon: 'i-lucide-banknote', to: '#payables-disbursements' },
    { title: 'Revenues & Collections', icon: 'i-lucide-trending-up', to: '#revenues-collections' },
    { title: 'General Ledger & Accounting', icon: 'i-lucide-book-open', to: '#general-ledger' },
    { title: 'Tax Management & Compliance', icon: 'i-lucide-file-text', to: '#tax-management' },
]

const checklist = [
    'Auto accounting entries',
    'Multi-currency ready',
    'BIR-compliant tax reports',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
    {
        title: 'Truly End-to-End',
        description: 'Integrated modules perform every major business process — from a purchase request all the way to a posted journal entry.',
        icon: 'i-lucide-link',
        orientation: 'vertical' as const,
    },
    {
        title: 'Automated Accounting',
        description: 'Transactions auto-generate the corresponding accounting entries, so books stay accurate without double encoding.',
        icon: 'i-lucide-zap',
        orientation: 'vertical' as const,
    },
    {
        title: 'Compliant by Design',
        description: 'BIR-ready books of accounts, withholding tax, VAT and SLSP reporting aligned to Philippine reportorial standards.',
        icon: 'i-lucide-shield-check',
        orientation: 'vertical' as const,
    },
    {
        title: 'Web-based & Scalable',
        description: 'A PHP/Laravel platform that is database-agnostic, cloud or on-premise, and integrates via REST APIs.',
        icon: 'i-lucide-globe',
        orientation: 'vertical' as const,
    },
]

const featureDetails = [
    {
        id: 'masterfile-setup',
        title: 'Masterfile Setup',
        description: 'Clean masterfiles are the foundation of clean books.',
        features: [
            { description: 'Set up customer, supplier and employee masters with TIN, address, contact, billing and tax info.', icon: 'i-lucide-check' },
            { description: 'Assign groups, currencies, payment terms, withholding-tax and VAT types per record.', icon: 'i-lucide-check' },
            { description: 'Migrate chart of accounts and subsidiaries in bulk through masterfile upload.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenFmsMasterfile,
    },
    {
        id: 'procurement-inventory',
        title: 'Procurement & Inventory',
        description: 'From requisition to receipt, in one connected flow.',
        features: [
            { description: 'Raise Purchase Requisitions, invite bids via RFQ, and compare suppliers with side-by-side canvassing.', icon: 'i-lucide-check' },
            { description: 'Approve Purchase Orders and record Receiving Reports that auto-post the accounting entries.', icon: 'i-lucide-check' },
            { description: 'Track item masters, unit-of-measure, stock levels, issuances, returns and warehouse transfers.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenFmsInventory,
    },
    {
        id: 'budget',
        title: 'Budget',
        description: 'Plan with intent, spend with control.',
        features: [
            { description: 'Create monthly or annual budgets per activity or department, routed to authorized signatories for approval.', icon: 'i-lucide-check' },
            { description: 'Realign and reclassify budget across activities or departments with a full approval trail.', icon: 'i-lucide-check' },
            { description: 'Record Requests for Appropriation (RFA) and Requests for Payment (RFP) against the approved budget.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenFmsBudgeting,
    },
    {
        id: 'property-fixed-assets',
        title: 'Property & Fixed Assets',
        description: 'Know every asset, and who holds it.',
        features: [
            { description: 'Capture asset group, description, model, serial number, cost and full acquisition history.', icon: 'i-lucide-check' },
            { description: 'Monitor accountability — track the location, custodian employee and department of each item.', icon: 'i-lucide-check' },
            { description: 'Issue fixed assets to a requesting department or authorized employee with receiver details.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenFmsProperty,
    },
    {
        id: 'payables-disbursements',
        title: 'Payables & Disbursements',
        description: 'Settle obligations, keep the books auto-balanced.',
        features: [
            { description: 'Prepare AP vouchers from receiving reports that automatically generate the accounting entries.', icon: 'i-lucide-check' },
            { description: 'Issue checks and check vouchers, with BIR Form 2307 generated for withholding tax.', icon: 'i-lucide-check' },
            { description: 'Monitor the check registry — on-hand, released, cancelled or stale — plus fund replenishments and liquidations.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenFmsDisbursements,
    },
    {
        id: 'revenues-collections',
        title: 'Revenues & Collections',
        description: 'From sales order to official receipt, real-time.',
        features: [
            { description: 'Create sales orders / job orders and track delivery commitments and fulfillments.', icon: 'i-lucide-check' },
            { description: 'Generate sales invoices and statements of accounts to manage receivables and credit terms.', icon: 'i-lucide-check' },
            { description: "Issue Official Receipts and apply collections to invoices for live visibility of what's uncollected.", icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenFmsCollections,
    },
    {
        id: 'general-ledger',
        title: 'General Ledger & Accounting',
        description: 'Every transaction, one true ledger.',
        features: [
            { description: 'Define a summarized or detailed Chart of Accounts across balance-sheet and income-statement classes.', icon: 'i-lucide-check' },
            { description: 'Maintain BIR-compliant books of accounts, journal vouchers and beginning balances by cut-off date.', icon: 'i-lucide-check' },
            { description: 'Generate multi-dimension P&L, trial balance, balance sheet and ledgers — with multi-currency support.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenFmsLedger,
    },
    {
        id: 'tax-management',
        title: 'Tax Management & Compliance',
        description: 'Compliance calculated, not chased.',
        features: [
            { description: 'Set up sales-tax and withholding-tax rates mapped to ATC codes and GL accounts.', icon: 'i-lucide-check' },
            { description: 'Automatically compute VAT and withholding-tax obligations on every transaction.', icon: 'i-lucide-check' },
            { description: 'Produce Summary List of Sales & Purchases (SLSP) and expanded/creditable withholding reports.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenFmsTax,
    },
]

const financialCycle = {
    headline: 'One connected flow',
    title: 'The financial cycle',
    description: 'Each step auto-generates its accounting entries — so the books close themselves as the business runs.',
}

const financialCycleSteps = [
    {
        value: 'procure',
        step: '01',
        phase: 'Procurement',
        title: 'Procure',
        description: 'Requisition, RFQ, canvass and approve purchase orders.',
        icon: 'i-lucide-layers',
        deliverable: 'Approved POs',
    },
    {
        value: 'receive',
        step: '02',
        phase: 'Inventory',
        title: 'Receive',
        description: 'Record receiving reports that auto-post to inventory.',
        icon: 'i-lucide-package-check',
        deliverable: 'Stock Updates',
    },
    {
        value: 'pay',
        step: '03',
        phase: 'Disbursements',
        title: 'Pay',
        description: 'Prepare vouchers, issue checks, withhold and disburse.',
        icon: 'i-lucide-banknote',
        deliverable: 'AP Vouchers',
    },
    {
        value: 'collect',
        step: '04',
        phase: 'Collections',
        title: 'Collect',
        description: 'Invoice customers and apply official-receipt collections.',
        icon: 'i-lucide-trending-up',
        deliverable: 'Official Receipts',
    },
    {
        value: 'report',
        step: '05',
        phase: 'Reporting',
        title: 'Report',
        description: 'Everything flows to a live, BIR-compliant general ledger.',
        icon: 'i-lucide-book-open',
        deliverable: 'Live Ledger',
    },
]
</script>

<template>
    <!-- Hero -->
    <ProductHero badge="DIGITAL ERP · Business Resource Manager — FMS"
        background-image="/hero-fms-bg.jpg" :links="heroLinks"
        :checklist="checklist" :modules="modules">
        <template #title>
            Every peso,<br>fully accounted.
        </template>
        <template #description>
            One end-to-end financial platform that connects procurement, inventory, budgeting, assets, payables and
            collections to a live general ledger — built by <strong>Centralized Cloud Computing International</strong>
            to run the full business cycle.
        </template>
    </ProductHero>

    <!-- Why Choose Us -->
    <UPageSection id="why-choose-us" ref="featuresEl" class="section-reveal" :class="{ 'is-visible': featuresVisible }"
        headline="Why choose us" title="Why our FMS stands out"
        description="A Business Resource Manager engineered to control operations, transactions and finances in a single source of truth."
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

    <!-- The Platform -->
    <UPageSection id="platform" ref="modulesEl" class="section-reveal" :class="{ 'is-visible': modulesVisible }"
        headline="The platform" title="Introducing Digital ERP"
        description="The Business Resource Manager is an end-to-end solution composed of integrated modules designed to perform a client's major business processes — enabling business owners to manage and control operations and transactions from procurement to the financial statements."
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
        <HubDiagram center-label="BRM" :nodes="modules" class="reveal-right reveal-delay-400" />
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
        :reverse="feature.reverse">
        <component :is="feature.component" />
    </ProductFeature>

    <!-- Financial Cycle -->
    <UPageSection id="cycle" ref="cycleEl" class="section-reveal" :class="{ 'is-visible': cycleVisible }"
        :headline="financialCycle.headline" :title="financialCycle.title"
        :description="financialCycle.description"
        :ui="{
            root: 'min-h-screen flex flex-col justify-center',
            headline: 'reveal-down',
            title: 'reveal-up reveal-delay-150',
            description: 'reveal-up reveal-delay-300',
        }">
        <div>
            <ProductTimeline :items="financialCycleSteps" />
        </div>
    </UPageSection>

    <!-- CTA -->
    <UPageSection>
        <ProductCTA title="Ready to run your entire business cycle?"
            description="Bring procurement, inventory, payables, collections and the general ledger into one intelligent Digital ERP. See FMS in action."
            :links="ctaLinks" />
    </UPageSection>
</template>
