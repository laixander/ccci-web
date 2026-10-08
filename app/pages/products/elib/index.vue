<script setup lang="ts">
// ─── Imports ──────────────────────────────────────────────────────────────────
import {
    MockupScreenElibCatalog,
    MockupScreenElibCirculation,
    MockupScreenElibDashboard,
} from '#components'

// ─── Page Meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: 'product' })

useSeoMeta({
    title: 'eLibrary System — Cloud Library for Schools & Universities | CCCI',
    description: 'Give students quick online access to books, magazines, catalogs, journals and more — while automating inventory, cataloguing, barcode circulation and analytics for librarians. Built by Centralized Cloud Computing International.',
})

// ─── Navigation & UI Data ─────────────────────────────────────────────────────
const heroLinks = [
    { label: 'Open Your eLibrary', to: '#features', trailingIcon: 'i-lucide-arrow-right', class: 'hero-cta-shadow' },
    { label: 'Explore Features', color: 'neutral' as const, variant: 'soft' as const, icon: 'i-lucide-play-circle' },
]

const ctaLinks = [
    { label: 'Open Your eLibrary', icon: 'i-lucide-library', class: 'bg-primary-800 hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary/75' },
    { label: 'Book a Walkthrough', color: 'neutral' as const, variant: 'soft' as const, trailingIcon: 'i-lucide-calendar' },
]

const modules = [
    { title: 'Self-Service Catalog', icon: 'i-lucide-book-open', to: '#catalog' },
    { title: 'Barcode Circulation', icon: 'i-lucide-scan-barcode', to: '#circulation' },
    { title: 'Reports Dashboard', icon: 'i-lucide-bar-chart-2', to: '#dashboard' },
    { title: 'Mobile Apps', icon: 'i-lucide-smartphone', to: '#mobile-apps' },
    { title: 'Access Control', icon: 'i-lucide-shield-check', to: '#platform' },
    { title: 'Membership', icon: 'i-lucide-users', to: '#platform' },
]

const checklist = [
    'Self check-in & check-out',
    'Barcode circulation',
    'Mobile app access',
]

// ─── Page Content Data ────────────────────────────────────────────────────────
const features = [
    {
        title: 'Quick Online Access',
        description: 'Students reach books, magazines, catalogs, journals and other materials online — better, faster learning from anywhere.',
        icon: 'i-lucide-search',
        orientation: 'vertical' as const,
    },
    {
        title: 'Automated Library Tasks',
        description: 'Inventory, cataloguing, serial management, circulation and reference are automated, improving day-to-day efficiency.',
        icon: 'i-lucide-layers',
        orientation: 'vertical' as const,
    },
    {
        title: 'Member Data Management',
        description: 'Store and manage member data in one database, maintain each account, and collect membership payments with ease.',
        icon: 'i-lucide-users',
        orientation: 'vertical' as const,
    },
    {
        title: 'Automatic Fines',
        description: 'Fines and penalties for late returns are assessed and calculated automatically — no manual computation needed.',
        icon: 'i-lucide-wallet',
        orientation: 'vertical' as const,
    },
]

const featureDetails = [
    {
        id: 'catalog',
        title: 'Self-Service Catalog',
        description: 'Log in, search, choose, issue and return — all on your own.',
        features: [
            { description: 'Students self-check-in and self-check-out books, logging in to search, choose, issue and return without staff.', icon: 'i-lucide-check' },
            { description: 'Quick online access to books, magazines, catalogs, journals and other learning materials from any device.', icon: 'i-lucide-check' },
            { description: "Every record shows availability — keep track of what's on the shelf and what's currently issued in real time.", icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenElibCatalog,
    },
    {
        id: 'circulation',
        title: 'Barcode Circulation',
        description: 'Scan to check-in and check-out — faster and more accurate.',
        features: [
            { description: 'Every book is assigned a barcode for specific identification — title, author, subject and publication date.', icon: 'i-lucide-check' },
            { description: 'On issue or return, the system fetches the barcode and creates a systematic computer entry automatically.', icon: 'i-lucide-check' },
            { description: 'Barcodes speed up check-in and check-out, increase accuracy, and help librarians manage the inventory.', icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        reverse: true,
        component: MockupScreenElibCirculation,
    },
    {
        id: 'dashboard',
        title: 'Reports Dashboard',
        description: 'Visualize, track, and interact with library data in one place.',
        features: [
            { description: 'Statistical reports and analysis of usage — resources borrowed, most popular resources, and patron demographics.', icon: 'i-lucide-check' },
            { description: 'Analytics for frequently borrowed or delayed books, students in good/bad standing, popular authors and topics.', icon: 'i-lucide-check' },
            { description: "Manage circulation — what's out, due for return, and returned — for a seamless view of any book's whereabouts.", icon: 'i-lucide-check' },
        ],
        orientation: 'horizontal' as const,
        component: MockupScreenElibDashboard,
    },
]

const mobileFeatures = [
    {
        title: 'Reserve & Borrow',
        description: 'Access the eLibrary through mobile apps for reservation, borrowing, scanning or searching for books.',
        icon: 'i-lucide-book-marked',
        orientation: 'vertical' as const,
    },
    {
        title: 'In-App Reports',
        description: 'File complaints or make reports directly from the app — cost-effective and user-friendly software.',
        icon: 'i-lucide-file-text',
        orientation: 'vertical' as const,
    },
    {
        title: 'Inventory Dashboard',
        description: 'Librarians manage inventory through the dashboard, tracking location and availability of every resource.',
        icon: 'i-lucide-layout-dashboard',
        orientation: 'vertical' as const,
    },
    {
        title: 'Scan to Reserve',
        description: "Students scan a book's barcode from their phone to instantly reserve it — no counter visit required.",
        icon: 'i-lucide-scan',
        orientation: 'vertical' as const,
    },
]

const platformFeatures = [
    {
        title: 'Role-Based Access',
        description: 'A role-based authentication and access-control system granularly sets rights and permissions per user.',
        icon: 'i-lucide-shield-check',
        orientation: 'vertical' as const,
    },
    {
        title: 'Open-Source & Postgres',
        description: 'Open-source, web-based software supporting open-source databases such as PostgreSQL for a cost-effective stack.',
        icon: 'i-lucide-database',
        orientation: 'vertical' as const,
    },
    {
        title: 'Granular Permissions',
        description: 'Create users like administrators, staff and departments — ensuring only authorized users can access resources.',
        icon: 'i-lucide-lock',
        orientation: 'vertical' as const,
    },
    {
        title: 'Multi-Cloud Microservices',
        description: "Runs on a unified, multi-cloud microservices platform with an API to connect to a university's Campus Management System.",
        icon: 'i-lucide-cloud',
        orientation: 'vertical' as const,
    },
]

const platformTags = [
    'PostgreSQL',
    'Microservices',
    'Web-based',
    'Open-source',
    'CMS API',
    'Multi-cloud',
]

const stats = [
    { value: '100%', label: 'Self-service borrowing' },
    { value: '1', label: 'Barcode per book' },
    { value: '24/7', label: 'Mobile access' },
    { value: '1', label: 'Cloud database' },
]
</script>

<template>
    <!-- Hero -->
    <ProductHero
        badge="Cloud library · For every school, college & university"
        background-image="/Student_walking_through_library_…_2K_20261008105203.jpg"
        :links="heroLinks"
        :checklist="checklist"
        :modules="modules">
        <template #title>
            Knowledge,<br>always within reach
        </template>
        <template #description>
            The <strong>eLibrary System</strong> gives students quick online access to books, magazines, catalogs, journals and more — while automating inventory, cataloguing, serial management, circulation and reference for librarians. Built by Centralized Cloud Computing International.
        </template>
    </ProductHero>

    <!-- Core features grid -->
    <UPageSection
        id="features"
        headline="eLibrary System"
        title="An essential role in every campus"
        description="The eLibrary System empowers librarians and authorized staff to keep proper records of every book — author, edition, copies, issue and return dates — while helping students learn better through quick online access."
        :features="features"
        :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10' }"
    />

    <!-- Modules Structure -->
    <UPageSection
        headline="What's inside"
        title="Everything a modern library needs"
        description="From self-service borrowing to analytics — all in one cloud platform students and librarians actually enjoy using."
        orientation="horizontal"
        :ui="{ features: 'grid grid-cols-2 gap-4' }">
        <template #features>
            <UPageFeature v-for="(module, index) in modules" :key="index" :title="module.title" icon="i-lucide-check" />
        </template>
        <HubDiagram center-label="eLIB CORE" :nodes="modules" />
    </UPageSection>

    <!-- Feature details -->
    <UPageSection
        v-for="(feature, index) in featureDetails"
        :key="index"
        :id="feature.id"
        :title="feature.title"
        :description="feature.description"
        :features="feature.features.map(f => ({ ...f, ui: { leading: 'p-0' } }))"
        :orientation="feature.orientation"
        :reverse="feature.reverse"
        :ui="{
            description: 'text-primary',
        }">
        <component :is="feature.component" />
    </UPageSection>

    <!-- Platform Section -->
    <UPageSection
        id="platform"
        headline="Secure & connected"
        title="Built on an open, secure platform"
        description="Security features include role-based authentication and access control, so you can granularly set up rights and permissions for every created user — ensuring only authorized people get in. Underneath, it's open-source, Postgres-backed, and cloud-native."
        orientation="horizontal">
        <template #features>
            <div class="flex flex-wrap gap-2">
                <UBadge
                    v-for="tag in platformTags"
                    :key="tag"
                    variant="soft"
                    color="primary"
                    size="lg">
                    {{ tag }}
                </UBadge>
            </div>
        </template>
        <UPageGrid class="lg:grid-cols-2">
            <UPageCard
                v-for="(feat, index) in platformFeatures"
                :key="index"
                v-bind="feat"
                :ui="{ leadingIcon: 'text-primary p-2 rounded-lg size-8' }"
                spotlight
            />
        </UPageGrid>
    </UPageSection>

    <!-- Mobile Apps -->
    <UPageSection
        id="mobile-apps"
        headline="Mobile Apps"
        title="Reserve, borrow, scan and search — right from your phone."
        description="Access the eLibrary through mobile apps for reservation, borrowing, scanning or searching for books. File complaints or make reports directly from the app — cost-effective and user-friendly software."
        :features="mobileFeatures"
        :ui="{
            features: 'sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10',
            description: 'text-primary',
        }"
    />

    <!-- Stats banner -->
    <div class="border-y border-default bg-muted/50 py-16">
        <UContainer>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                <div v-for="stat in stats" :key="stat.label">
                    <p class="text-4xl lg:text-5xl font-extrabold text-primary">{{ stat.value }}</p>
                    <p class="text-muted mt-2 text-sm lg:text-base font-medium">{{ stat.label }}</p>
                </div>
            </div>
        </UContainer>
    </div>

    <!-- CTA -->
    <ProductCTA
        title="Ready to bring your library online?"
        description="Give students self-service borrowing and give librarians automated cataloguing, circulation and analytics. See the eLibrary System in action."
        :links="ctaLinks"
    />
</template>
