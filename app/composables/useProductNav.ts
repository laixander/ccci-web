import { computed, type Ref, type ComputedRef } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

export const productBonusNavMap: Record<string, NavigationMenuItem> = {
  hris: { label: 'Add-on Modules', to: '#addons' },
  cms: { label: 'Security & Settings', to: '#security-settings' },
  lms: { label: 'AI Tutorial', to: '#ai-features' },
  aissp: { label: 'Planning Flow', to: '#how-it-works' },
  fms: { label: 'Financial Cycle', to: '#cycle' },
  ams: { label: 'Asset Lifecycle', to: '#lifecycle' },
  elib: { label: 'Architecture', to: '#platform-architecture' },
  dms: { label: 'Deployment', to: '#deployment' },
  ilsp: { label: 'Global Analytics', to: '#analytics' },
  eis: { label: 'Data Pipelines', to: '#pipelines' },
  hkas: { label: 'Wellness Dashboard', to: '#dashboard' },
  irs: { label: 'Response Flow', to: '#flow' }
}

export const productFeaturesMap: Record<string, NavigationMenuItem[]> = {
  lms: [
    { label: 'Management Portal', to: '#management-portal', description: 'Curriculum & master data management', icon: 'i-lucide-layout-grid' },
    { label: 'Professor Portal', to: '#professor-portal', description: 'Classes, lessons, modules & grading', icon: 'i-lucide-graduation-cap' },
    { label: 'Student Portal', to: '#student-portal', description: 'Activities, attendance & file drive', icon: 'i-lucide-user-check' },
    { label: 'Parents Portal', to: '#parents-portal', description: 'Real-time student monitoring & logs', icon: 'i-lucide-shield-check' }
  ],
  cms: [
    { label: 'Admission Module', to: '#admission', description: 'Applicant workflows & exam schedules', icon: 'i-lucide-user-plus' },
    { label: 'Registrar Module', to: '#registrar', description: 'Registration, TOR, COR & credentials', icon: 'i-lucide-file-text' },
    { label: 'Billing Module', to: '#billing', description: 'Tuition assessment & ledgers', icon: 'i-lucide-credit-card' },
    { label: 'Grades Module', to: '#grades', description: 'Online encoding & approval chains', icon: 'i-lucide-award' },
    { label: 'Scheduling & Manage', to: '#scheduling', description: 'Room, faculty & section loading', icon: 'i-lucide-calendar' },
    { label: 'Enrollment Module', to: '#enrollment', description: 'Online course enrollment & assessment', icon: 'i-lucide-clipboard-check' },
    { label: 'Student Module', to: '#student', description: 'Academic history docket & records', icon: 'i-lucide-user' }
  ],
  hris: [
    { label: 'Employee Information', to: '#employee-records', description: 'Centralized workforce records', icon: 'i-lucide-users' },
    { label: 'Timekeeping', to: '#timekeeping', description: 'Biometric, mobile & geofenced logs', icon: 'i-lucide-clock' },
    { label: 'Payroll', to: '#payroll', description: 'Automated salary & tax compliance', icon: 'i-lucide-banknote' },
    { label: 'Recruitment & Onboarding', to: '#recruitment', description: 'Applicant tracking & hiring flows', icon: 'i-lucide-briefcase' },
    { label: 'Learning & Development', to: '#learning', description: 'Training matrix & certifications', icon: 'i-lucide-book-open' },
    { label: 'Performance Management', to: '#performance', description: 'Goal tracking & employee reviews', icon: 'i-lucide-target' },
    { label: 'Employee Self-Service', to: '#self-service', description: 'Direct leave requests & payslips', icon: 'i-lucide-smartphone' },
    { label: 'Reports & Analytics', to: '#reports', description: 'Workforce insights & compliance', icon: 'i-lucide-bar-chart-3' }
  ],
  fms: [
    { label: 'Masterfile Setup', to: '#masterfile-setup', description: 'Customer, vendor & chart of accounts', icon: 'i-lucide-database' },
    { label: 'Procurement & Inventory', to: '#procurement-inventory', description: 'Purchase requests, POs & receipts', icon: 'i-lucide-package' },
    { label: 'Budgeting', to: '#budget', description: 'Activity budgeting & appropriations', icon: 'i-lucide-calculator' },
    { label: 'Property & Fixed Assets', to: '#property-fixed-assets', description: 'Asset tagging & custodian tracking', icon: 'i-lucide-building-2' },
    { label: 'Payables & Disbursements', to: '#payables-disbursements', description: 'Vouchers, checks & BIR Form 2307', icon: 'i-lucide-receipt' },
    { label: 'Revenues & Collections', to: '#revenues-collections', description: 'Invoicing & official receipt issuance', icon: 'i-lucide-wallet' },
    { label: 'General Ledger', to: '#general-ledger', description: 'Multi-dimension journals & trial balances', icon: 'i-lucide-book' },
    { label: 'Tax Management', to: '#tax-management', description: 'VAT computation & SLSP compliance', icon: 'i-lucide-scale' }
  ],
  aissp: [
    { label: 'System Reordering', to: '#system-reordering', description: 'Priority-based document structuring', icon: 'i-lucide-arrow-down-up' },
    { label: 'Office Productivity', to: '#office-productivity', description: 'Departmental IT consolidation', icon: 'i-lucide-laptop' },
    { label: 'Prototyping & Planning', to: '#prototyping-planning', description: 'Scenario modeling & budget projections', icon: 'i-lucide-sliders' },
    { label: 'Reporting & Investments', to: '#reporting-investments', description: 'Summary of Investments in xls/pdf', icon: 'i-lucide-file-spreadsheet' },
    { label: 'Deliverables', to: '#deliverables', description: 'Interface, database & user materials', icon: 'i-lucide-check-circle-2' },
    { label: 'Technical & Security', to: '#technical-security', description: 'Role-based access & cloud containers', icon: 'i-lucide-shield' }
  ],
  elib: [
    { label: 'Self-Service Catalog', to: '#catalog', description: 'Search, reserve, issue & return books', icon: 'i-lucide-search' },
    { label: 'Barcode Circulation', to: '#circulation', description: 'Scan-based check-in & check-out', icon: 'i-lucide-scan-line' },
    { label: 'Reports Dashboard', to: '#dashboard', description: 'Usage analytics & patron statistics', icon: 'i-lucide-bar-chart-2' },
    { label: 'Mobile Apps', to: '#mobile', description: 'Remote catalog browsing on iOS/Android', icon: 'i-lucide-smartphone' }
  ],
  ams: [
    { label: 'Dashboard', to: '#dashboard', description: 'Asset alerts, schedules & status', icon: 'i-lucide-layout-dashboard' },
    { label: 'Requisition', to: '#requisition', description: 'Equipment requests & approval routing', icon: 'i-lucide-clipboard-list' },
    { label: 'Asset Inventory', to: '#inventory', description: 'Tagging, condition & lifecycle tracking', icon: 'i-lucide-qr-code' },
    { label: 'Maintenance', to: '#maintenance', description: 'Preventive schedules & service history', icon: 'i-lucide-wrench' },
    { label: 'Asset Reports', to: '#reports', description: 'Depreciation & utilization analytics', icon: 'i-lucide-line-chart' },
    { label: 'Activities', to: '#activities', description: 'Custody handovers & photo verification', icon: 'i-lucide-arrow-left-right' },
    { label: 'Organization', to: '#organization', description: 'Departments, roles & HRIS sync', icon: 'i-lucide-building-2' },
    { label: 'Settings', to: '#settings', description: 'Roles, branding & notification rules', icon: 'i-lucide-settings' }
  ],
  dms: [
    { label: 'Search', to: '#search', description: 'Keyword, metadata & full-text search', icon: 'i-lucide-search' },
    { label: 'OCR Transcribing', to: '#ocr-transcribing', description: 'Language-aware paper-to-text engine', icon: 'i-lucide-scan-text' },
    { label: 'Digital Signature', to: '#digital-signature', description: 'Cryptographic & remote signing', icon: 'i-lucide-pen-tool' },
    { label: 'Versioning', to: '#versioning', description: 'Non-destructive version history & compare', icon: 'i-lucide-history' },
    { label: 'Workflow', to: '#workflow', description: 'Rules-based routing & escalation', icon: 'i-lucide-workflow' },
    { label: 'Security', to: '#security', description: 'Role-based access, SSO & audit trail', icon: 'i-lucide-shield-check' }
  ],
  ilsp: [
    { label: 'Admin Module', to: '#admin-module', description: 'Centralized database & MOU oversight', icon: 'i-lucide-shield-check' },
    { label: 'Partner Module', to: '#partner-module', description: 'Online registration & milestones', icon: 'i-lucide-users' },
    { label: 'Mobile Application', to: '#mobile-app', description: 'On-the-go alerts & task management', icon: 'i-lucide-smartphone' }
  ],
  eis: [
    { label: 'Data Sources', to: '#data-sources', description: 'Databases, cloud ERP, APIs & files', icon: 'i-lucide-database' },
    { label: 'Reporting', to: '#reporting', description: 'Role-based dashboards & actions', icon: 'i-lucide-file-bar-chart' },
    { label: 'Data Modeling', to: '#data-modeling', description: 'Visual relational models without SQL', icon: 'i-lucide-network' },
    { label: 'Sharing & Collaboration', to: '#sharing-collaboration', description: 'Secure digests & audited access', icon: 'i-lucide-share-2' },
    { label: 'Customization', to: '#customization', description: 'Bespoke themes & custom visuals', icon: 'i-lucide-palette' },
    { label: 'ETL Integration', to: '#etl-integration', description: 'GUI pipelines & automated workflows', icon: 'i-lucide-workflow' }
  ],
  hkas: [
    { label: 'Fitness Assessment', to: '#assessment', description: 'Standardized physical testing & scoring', icon: 'i-lucide-activity' },
    { label: 'Wellness Analytics', to: '#flow', description: 'Cohort trends & CHED-compliant reports', icon: 'i-lucide-heart-pulse' }
  ],
  irs: [
    { label: 'Mobile App', to: '#mobile-app', description: 'Student emergency reporting app', icon: 'i-lucide-smartphone' },
    { label: 'Photo & Video', to: '#photo-video', description: 'Direct multimedia evidence capture', icon: 'i-lucide-camera' },
    { label: 'Precise Location', to: '#precise-location', description: 'Floor & indoor positioning', icon: 'i-lucide-map-pin' },
    { label: 'Emergency Templates', to: '#emergency-templates', description: 'Pre-configured one-tap alert types', icon: 'i-lucide-file-text' },
    { label: 'Instant Dispatch', to: '#instant-dispatch', description: 'Direct routing to campus response teams', icon: 'i-lucide-radio' },
    { label: 'Response Dashboard', to: '#response-dashboard', description: 'Real-time incident oversight & tracking', icon: 'i-lucide-layout-dashboard' }
  ]
}

export function useProductNav(
  currentProduct: Ref<string> | ComputedRef<string>,
  activeSectionId: Ref<string>
) {
  const productBonusNavItem = computed<NavigationMenuItem>(() => {
    return productBonusNavMap[currentProduct.value] || { label: 'Add-on Modules', to: '#addons' }
  })

  const trackedSectionIds = computed(() => {
    const list: string[] = ['why-choose-us', 'platform']
    const featureChildren = productFeaturesMap[currentProduct.value] || []
    for (const child of featureChildren) {
      if (typeof child.to === 'string' && child.to.startsWith('#')) {
        list.push(child.to.slice(1))
      }
    }
    const bonusTo = productBonusNavItem.value?.to
    if (typeof bonusTo === 'string' && bonusTo.startsWith('#')) {
      list.push(bonusTo.slice(1))
    }
    list.push('contact')
    return list
  })

  const isFeatureActive = computed(() => {
    const children = productFeaturesMap[currentProduct.value] || []
    return children.some(c => typeof c.to === 'string' && c.to === `#${activeSectionId.value}`) || activeSectionId.value === 'features'
  })

  const productFeaturesNavItem = computed<NavigationMenuItem>(() => {
    const rawChildren = productFeaturesMap[currentProduct.value]
    const children = rawChildren?.map((child) => {
      const isActive = typeof child.to === 'string' && child.to === `#${activeSectionId.value}`
      return {
        ...child,
        active: isActive,
        class: isActive ? 'before:bg-primary/10 dark:before:bg-primary/20 text-primary font-medium' : ''
      }
    })

    return {
      label: 'Features',
      active: isFeatureActive.value,
      class: isFeatureActive.value ? 'before:bg-primary/10 dark:before:bg-primary/20 text-primary font-semibold' : '',
      children: children && children.length > 0 ? children : undefined
    }
  })

  const navItems = computed<NavigationMenuItem[]>(() => {
    const isWhyActive = activeSectionId.value === 'why-choose-us'
    const isPlatformActive = activeSectionId.value === 'platform'
    const isBonusActive = typeof productBonusNavItem.value.to === 'string' && productBonusNavItem.value.to === `#${activeSectionId.value}`
    const isContactActive = activeSectionId.value === 'contact'

    return [
      {
        label: 'Why Choose Us',
        to: '#why-choose-us',
        active: isWhyActive,
        class: isWhyActive ? 'before:bg-primary/10 dark:before:bg-primary/20 text-primary font-semibold' : ''
      },
      {
        label: 'The Platform',
        to: '#platform',
        active: isPlatformActive,
        class: isPlatformActive ? 'before:bg-primary/10 dark:before:bg-primary/20 text-primary font-semibold' : ''
      },
      productFeaturesNavItem.value,
      {
        ...productBonusNavItem.value,
        active: isBonusActive,
        class: isBonusActive ? 'before:bg-primary/10 dark:before:bg-primary/20 text-primary font-semibold' : ''
      },
      {
        label: 'Contact',
        to: '#contact',
        active: isContactActive,
        class: isContactActive ? 'before:bg-primary/10 dark:before:bg-primary/20 text-primary font-semibold' : ''
      }
    ]
  })

  return {
    navItems,
    productFeaturesNavItem,
    productBonusNavItem,
    trackedSectionIds,
    isFeatureActive
  }
}
