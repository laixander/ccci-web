<script setup lang="ts">
definePageMeta({
  title: 'FMS by CCCI',
  layout: 'fms',
})

useSeoMeta({
  title: 'FMS — Financial Management System',
  description: 'Manage income, expenses, budgets, and compliance. Ensure financial stability and profitability across your organization.',
})

const features = [
  {
    title: 'General Ledger & Accounting',
    description: 'Keep your books perfectly balanced. Manage accounts payable and receivable with automated journal entries.',
    icon: 'i-lucide-book',
  },
  {
    title: 'Budgeting & Forecasting',
    description: 'Plan your financial future. Allocate budgets across departments and track actuals vs. planned spend in real-time.',
    icon: 'i-lucide-pie-chart',
  },
  {
    title: 'Cash Flow Management',
    description: 'Never lose sight of your liquidity. Monitor cash inflows and outflows to ensure operational stability.',
    icon: 'i-lucide-banknote',
  },
  {
    title: 'Financial Reporting',
    description: 'Generate standard financial statements (Income Statement, Balance Sheet, Cash Flow) with a single click.',
    icon: 'i-lucide-file-text',
  },
  {
    title: 'Asset & Depreciation Management',
    description: 'Track the lifecycle and value of fixed assets. Automatically calculate and post depreciation expenses.',
    icon: 'i-lucide-building',
  },
  {
    title: 'Bank Reconciliation',
    description: 'Connect directly to your banks via secure APIs to auto-match transactions and streamline the reconciliation process.',
    icon: 'i-lucide-arrow-left-right',
  },
]

const stats = [
  { value: '3x', label: 'Faster Month-End Close' },
  { value: '100%', label: 'Audit Trail Coverage' },
  { value: '0', label: 'Manual Entry Errors' },
  { value: '24/7', label: 'Financial Visibility' },
]

const testimonials = [
  {
    quote: 'FMS has drastically reduced the time it takes us to close the books at month-end. The automated bank reconciliation is a lifesaver.',
    author: 'Maria Santos',
    role: 'Chief Financial Officer, Delta Manufacturing',
    initials: 'MS',
  },
  {
    quote: 'We used to struggle with tracking departmental budgets in spreadsheets. FMS gave us real-time visibility into who is spending what, instantly.',
    author: 'Robert Lee',
    role: 'VP of Finance, Global Logistics Co.',
    initials: 'RL',
  },
  {
    quote: 'The financial reporting module is incredibly powerful yet easy to use. I can generate a consolidated balance sheet for all our subsidiaries in seconds.',
    author: 'Anna Chua',
    role: 'Director of Accounting, Prime Holdings',
    initials: 'AC',
  },
]

const plans = [
  {
    title: 'Essential',
    description: 'Core accounting for small to medium businesses.',
    price: '₱20,000',
    interval: 'mo',
    features: [
      'General Ledger (AP/AR)',
      'Basic Financial Reporting',
      'Up to 5 Users',
      'Email Support',
    ],
  },
  {
    title: 'Professional',
    description: 'Advanced financial management for growing organizations.',
    price: '₱50,000',
    interval: 'mo',
    highlight: true,
    features: [
      'Budgeting & Forecasting',
      'Automated Bank Reconciliation',
      'Asset Depreciation',
      'Up to 20 Users',
      'Priority Support',
    ],
  },
  {
    title: 'Enterprise',
    description: 'Comprehensive financial control for large enterprises.',
    price: 'Custom',
    features: [
      'Multi-entity consolidation',
      'Custom ERP API integrations',
      'Unlimited Users',
      'Dedicated Account Manager',
    ],
  },
]

const heroLinks = [
  { label: 'Request a Demo', to: '#pricing', icon: 'i-lucide-calendar', size: 'xl' as const },
  { label: 'Explore Features', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-arrow-right', size: 'xl' as const },
]

const ctaLinks = [
  { label: 'Request a Demo', icon: 'i-lucide-calendar', size: 'lg' as const },
  { label: 'Contact Sales', color: 'neutral' as const, variant: 'subtle' as const, trailingIcon: 'i-lucide-phone', size: 'lg' as const },
]

const logoIcons = [
  { name: 'i-simple-icons-visa', label: 'Visa' },
  { name: 'i-simple-icons-mastercard', label: 'Mastercard' },
  { name: 'i-simple-icons-stripe', label: 'Stripe' },
  { name: 'i-simple-icons-paypal', label: 'PayPal' },
]
</script>

<template>
  <!-- Hero -->
  <UPageHero
    headline="Introducing FMS"
    title="Financial Management System"
    description="Manage income, expenses, budgets, and compliance. Ensure financial stability and profitability across your organization."
    :links="heroLinks"
    orientation="horizontal"
  >
    <MockupScreenFmsDashboard />
  </UPageHero>

  <!-- Social proof -->
  <div class="border-y border-default bg-muted/50 py-10">
    <UContainer>
      <p class="text-center text-dimmed text-xs font-semibold uppercase tracking-widest mb-8">
        Trusted by finance teams nationwide
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        <UIcon v-for="logo in logoIcons" :key="logo.name" :name="logo.name" :aria-label="logo.label" class="size-10 text-muted" />
      </div>
    </UContainer>
  </div>

  <!-- Core features grid -->
  <UPageSection
    id="features"
    headline="Features"
    title="Everything you need for financial control"
    description="From daily ledger entries to annual financial reports — manage the entire financial lifecycle."
    :features="features"
  />

  <!-- Feature detail: Budgeting -->
  <UPageSection
    title="Budget tracking that keeps you in control"
    description="Allocate budgets across departments, monitor actuals vs. planned spend in real-time, and get instant alerts before any team goes over. FMS gives every manager full visibility into their financial position without the spreadsheet chaos."
    orientation="horizontal"
  >
    <MockupScreenFmsBudgeting />
  </UPageSection>

  <!-- Feature detail: Reports -->
  <UPageSection
    title="Financial reports generated in seconds"
    description="Generate GAAP-compliant Income Statements, Balance Sheets, and Cash Flow reports with a single click. Schedule automated delivery to stakeholders and export in PDF or Excel — your auditors will thank you."
    orientation="horizontal"
    reverse
  >
    <MockupScreenFmsReports />
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
    title="Loved by Finance Leaders"
    description="Hear how FMS has helped organizations streamline their accounting and boost profitability."
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
      title="Transparent pricing for any scale"
      description="Choose the plan that matches your financial operations."
    >
      <UPricingPlans :plans="plans" />
    </UPageSection>
  </div>

  <!-- CTA -->
  <UPageCTA
    title="Ready to take control of your finances?"
    description="Join leading organizations using FMS for their core accounting needs."
    :links="ctaLinks"
  />
</template>
