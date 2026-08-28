<script setup lang="ts">
definePageMeta({ layout: 'product' })

useSeoMeta({
  title: 'eLib — Electronic Library System | BiblioCore',
  description: 'Manage your entire library in the cloud — catalog books, track circulation, handle member accounts, and empower readers with a modern OPAC. Built for schools, universities, and public libraries.',
})

const features = [
  {
    title: 'Smart Catalog & OPAC',
    description: 'Digitize your entire collection with ISBN auto-fill, cover art, subject tags, and a modern Online Public Access Catalog your readers will love.',
    icon: 'i-lucide-book-open',
  },
  {
    title: 'Circulation Management',
    description: 'Streamline checkouts, returns, and renewals at the desk or self-service kiosk. Track loan periods, late returns, and holds in real time.',
    icon: 'i-lucide-bookmark',
  },
  {
    title: 'E-Resources & Digital Lending',
    description: 'Extend your collection with e-books, journals, and digital resources. Set concurrent loan limits and let patrons borrow anywhere, anytime.',
    icon: 'i-lucide-tablet',
  },
  {
    title: 'Member & Fine Management',
    description: 'Manage patron registrations, membership tiers, borrowing history, and outstanding fines — all in one unified member portal.',
    icon: 'i-lucide-id-card',
  },
  {
    title: 'Reservations & Holds',
    description: 'Allow patrons to place holds on popular titles. Automatic hold notifications via email or SMS when the item becomes available.',
    icon: 'i-lucide-calendar-clock',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Measure collection usage, peak borrowing hours, most popular titles, and generate CHED-compliant library utilization reports automatically.',
    icon: 'i-lucide-bar-chart-2',
  },
]

const stats = [
  { value: '500+', label: 'Libraries Served' },
  { value: '2M+', label: 'Titles Managed' },
  { value: '98%', label: 'Patron Satisfaction' },
  { value: '60%', label: 'Less Admin Time' },
]

const testimonials = [
  {
    quote: 'BiblioCore transformed our library. What used to take three staff members all day — cataloging, circulation, and reporting — now runs almost automatically. Our patrons love the new OPAC.',
    author: 'Librarian Rosa Cruz',
    role: 'University Librarian, Ateneo de Manila',
    initials: 'RC',
  },
  {
    quote: 'We deployed BiblioCore across our 12 school branches. Catalog sync is instant, and the overdue management practically runs itself. Fines collection went up 45% without any extra effort.',
    author: 'Dr. Emmanuel Torres',
    role: 'Head of School Services, DepEd Region IV',
    initials: 'ET',
  },
  {
    quote: 'The analytics dashboards are incredibly powerful. We can now see which titles are underused and reallocate our acquisition budget accordingly. It\'s the smartest investment our library has made.',
    author: 'Maria Lourdes Ramos',
    role: 'Public Library Director, Quezon City',
    initials: 'MR',
  },
]

const plans = [
  {
    title: 'Starter',
    description: 'Perfect for small school libraries getting started with digital catalog management.',
    price: '₱2,500',
    features: [
      'Up to 10,000 titles',
      'Core catalog & OPAC',
      'Basic circulation tracking',
      'Member management',
      'Email support',
    ],
  },
  {
    title: 'Institution',
    description: 'For university and college libraries with large collections and high patron volume.',
    price: '₱6,500',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Up to 100,000 titles',
      'Everything in Starter',
      'E-resources & digital lending',
      'Reservations & holds',
      'Analytics & CHED reports',
      'Priority support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'For public libraries, library consortia, and large multi-branch institutions.',
    price: 'Custom',
    features: [
      'Unlimited titles',
      'Everything in Institution',
      'Multi-branch management',
      'RFID & barcode integration',
      'Custom integrations & API',
      'Dedicated implementation team',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'Watch Demo', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-play-circle', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Schedule a Call', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-google', label: 'Google' },
  { name: 'i-simple-icons-microsoft', label: 'Microsoft' },
  { name: 'i-simple-icons-amazon', label: 'Amazon' },
  { name: 'i-simple-icons-apple', label: 'Apple' },
  { name: 'i-simple-icons-meta', label: 'Meta' },
  { name: 'i-simple-icons-unesco', label: 'UNESCO' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing BiblioCore 2.0"
    title="Your Entire Library — Digitized, Streamlined, and Always Open"
    description="From catalog management to circulation, e-resources to analytics — BiblioCore gives your library a complete digital backbone. Built for schools, universities, and public libraries in the Philippines."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenElibDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by leading schools, universities, and public libraries
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
  </div>

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Features"
    title="Everything your library needs to go digital"
    description="From a 500-title school library to a 2-million-title university system — BiblioCore covers the entire library lifecycle in one unified platform."
    :features="features"
  />

  <!-- Feature detail: Catalog -->
  <UPageSection
    title="A catalog your readers will actually use"
    description="BiblioCore's modern OPAC lets patrons search, filter, reserve, and renew books from any device — no login friction, no outdated UI. Add new titles in seconds with ISBN auto-fill and automatic cover art retrieval. Every item is tagged, categorized, and instantly searchable."
    orientation="horizontal"
  >
    <MockupScreenElibCatalog />
  </UPageSection>

  <!-- Feature detail: Circulation -->
  <UPageSection
    title="Circulation that runs at the speed of your desk"
    description="Process checkouts and returns in seconds, manage holds and renewals, and automatically flag overdue items with fine calculations. BiblioCore's circulation desk is designed for speed — every workflow is one click away so your staff can focus on helping patrons."
    orientation="horizontal"
    reverse
  >
    <MockupScreenElibCirculation />
  </UPageSection>

  <!-- Stats banner -->
  <div class="bg-primary dark:bg-primary/50 py-20">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-4xl lg:text-5xl font-extrabold text-white">{{ stat.value }}</p>
          <p class="text-white/70 mt-2 text-sm lg:text-base font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- Testimonials -->
  <UPageSection
    id="testimonials"
    headline="Customer Stories"
    title="Trusted by librarians, educators, and administrators"
    description="Hear from the library directors, registrars, and school administrators who rely on BiblioCore every day."
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
  </UPageSection>

  <!-- Pricing -->
  <div class="bg-muted/30">
    <UPageSection
      id="pricing"
      headline="Pricing"
      title="Simple, transparent pricing"
      description="Whether you're a small school or a large public library network — BiblioCore has a plan for you. Every plan includes a 30-day free trial."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to modernize your library?"
    description="Join 500+ schools, universities, and public libraries using BiblioCore to deliver world-class library services. Request your free demo today."
    :links="ctaLinks"
  />
</template>
