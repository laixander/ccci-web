import type { NavigationMenuItem } from '@nuxt/ui'

export function useHrisDashboard() {
  const meta = {
    themeClass: 'theme-hris',
    appIcon: 'i-lucide-users',
    appNamePrefix: 'People',
    appNameHighlight: 'Core'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/hris/dashboard',
        },
      ],
    },
    {
      label: 'Core HR',
      items: [
        { label: 'Employees', icon: 'i-lucide-users', to: '/products/hris/dashboard/employees' },
        { label: 'Attendance', icon: 'i-lucide-clock', to: '/products/hris/dashboard/attendance' },
        { label: 'Smart Payroll', icon: 'i-lucide-banknote', to: '/products/hris/dashboard/payroll' },
      ],
    },
    {
      label: 'Talent',
      items: [
        { label: 'Recruitment', icon: 'i-lucide-user-plus', to: '/products/hris/dashboard/recruitment' },
        { label: 'Performance', icon: 'i-lucide-trending-up', to: '/products/hris/dashboard/performance' },
      ],
    },
    {
      label: 'Self-Service',
      items: [
        { label: 'My Portal', icon: 'i-lucide-user-cog', to: '/products/hris/dashboard/self-service' },
        { label: 'Analytics', icon: 'i-lucide-bar-chart-2', to: '/products/hris/dashboard/analytics' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}


export function useCmsDashboard() {
  const meta = {
    themeClass: 'theme-cms',
    appIcon: 'i-lucide-graduation-cap',
    appNamePrefix: 'Campus',
    appNameHighlight: 'Core'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/cms/dashboard',
        },
      ],
    },
    {
      label: 'Academic',
      items: [
        { label: 'Students', icon: 'i-lucide-user-round', to: '/products/cms/dashboard/students' },
        { label: 'Enrollment', icon: 'i-lucide-clipboard-list', to: '/products/cms/dashboard/enrollment' },
        { label: 'Grades & Records', icon: 'i-lucide-award', to: '/products/cms/dashboard/grades' },
      ],
    },
    {
      label: 'Administration',
      items: [
        { label: 'Faculty & Curriculum', icon: 'i-lucide-user-check', to: '/products/cms/dashboard/faculty' },
        { label: 'Finance & Tuition', icon: 'i-lucide-banknote', to: '/products/cms/dashboard/finance' },
      ],
    },
    {
      label: 'Insights',
      items: [
        { label: 'My Portal', icon: 'i-lucide-user-cog', to: '/products/cms/dashboard/my-portal' },
        { label: 'Analytics', icon: 'i-lucide-bar-chart-2', to: '/products/cms/dashboard/analytics' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useLmsDashboard() {
  const meta = {
    themeClass: 'theme-lms',
    appIcon: 'i-lucide-book-open',
    appNamePrefix: 'Learn',
    appNameHighlight: 'Core'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/lms/dashboard',
        },
      ],
    },
    {
      label: 'Learning',
      items: [
        { label: 'Courses', icon: 'i-lucide-book-open', to: '/products/lms/dashboard/courses' },
        { label: 'Progress Tracking', icon: 'i-lucide-line-chart', to: '/products/lms/dashboard/progress' },
        { label: 'Assessments', icon: 'i-lucide-check-circle', to: '/products/lms/dashboard/assessments' },
      ],
    },
    {
      label: 'Tools',
      items: [
        { label: 'Live Classrooms', icon: 'i-lucide-video', to: '/products/lms/dashboard/classrooms' },
        { label: 'Certifications', icon: 'i-lucide-award', to: '/products/lms/dashboard/certifications' },
      ],
    },
    {
      label: 'Learner',
      items: [
        { label: 'My Learning', icon: 'i-lucide-graduation-cap', to: '/products/lms/dashboard/my-learning' },
        { label: 'Analytics', icon: 'i-lucide-bar-chart-2', to: '/products/lms/dashboard/analytics' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useDmsDashboard() {
  const meta = {
    themeClass: 'theme-dms',
    appIcon: 'i-lucide-folder-open',
    appNamePrefix: 'Docu',
    appNameHighlight: 'Core'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/dms/dashboard',
        },
      ],
    },
    {
      label: 'Files',
      items: [
        { label: 'All Documents', icon: 'i-lucide-files', to: '/products/dms/dashboard/documents' },
        { label: 'Shared with Me', icon: 'i-lucide-users', to: '/products/dms/dashboard/shared' },
        { label: 'Starred', icon: 'i-lucide-star', to: '/products/dms/dashboard/starred' },
      ],
    },
    {
      label: 'Workflows',
      items: [
        { label: 'My Approvals', icon: 'i-lucide-check-circle', to: '/products/dms/dashboard/approvals' },
        { label: 'Signatures', icon: 'i-lucide-pen-tool', to: '/products/dms/dashboard/signatures' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Access Control', icon: 'i-lucide-shield-check', to: '/products/dms/dashboard/access' },
        { label: 'Settings', icon: 'i-lucide-settings', to: '/products/dms/dashboard/settings' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useAmsDashboard() {
  const meta = {
    themeClass: 'theme-ams',
    appIcon: 'i-lucide-boxes',
    appNamePrefix: 'Asset',
    appNameHighlight: 'Core'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/ams/dashboard',
        },
      ],
    },
    {
      label: 'Assets',
      items: [
        { label: 'All Assets', icon: 'i-lucide-box', to: '/products/ams/dashboard/assets' },
        { label: 'Assigned', icon: 'i-lucide-user-check', to: '/products/ams/dashboard/assigned' },
        { label: 'Maintenance', icon: 'i-lucide-wrench', to: '/products/ams/dashboard/maintenance' },
      ],
    },
    {
      label: 'Inventory',
      items: [
        { label: 'Hardware', icon: 'i-lucide-laptop', to: '/products/ams/dashboard/hardware' },
        { label: 'Software', icon: 'i-lucide-code', to: '/products/ams/dashboard/software' },
      ],
    },
    {
      label: 'Reports',
      items: [
        { label: 'Analytics', icon: 'i-lucide-pie-chart', to: '/products/ams/dashboard/analytics' },
        { label: 'Depreciation', icon: 'i-lucide-trending-down', to: '/products/ams/dashboard/depreciation' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Access Control', icon: 'i-lucide-shield-check', to: '/products/ams/dashboard/access' },
        { label: 'Settings', icon: 'i-lucide-settings', to: '/products/ams/dashboard/settings' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useIlspDashboard() {
  const meta = {
    themeClass: 'theme-ilsp',
    appIcon: 'i-lucide-globe',
    appNamePrefix: 'Linkages',
    appNameHighlight: 'Core'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/ilsp/dashboard',
        },
      ],
    },
    {
      label: 'Partnerships',
      items: [
        { label: 'Institutions', icon: 'i-lucide-building-2', to: '/products/ilsp/dashboard/partnerships' },
        { label: 'MOUs & Agreements', icon: 'i-lucide-file-text', to: '/products/ilsp/dashboard/mou' },
      ],
    },
    {
      label: 'Programs',
      items: [
        { label: 'Mobility & Exchange', icon: 'i-lucide-plane', to: '/products/ilsp/dashboard/mobility' },
        { label: 'Grants & Funding', icon: 'i-lucide-badge-dollar-sign', to: '/products/ilsp/dashboard/grants' },
      ],
    },
    {
      label: 'Insights',
      items: [
        { label: 'Analytics', icon: 'i-lucide-pie-chart', to: '/products/ilsp/dashboard/analytics' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Settings', icon: 'i-lucide-settings', to: '/products/ilsp/dashboard/settings' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useAisspDashboard() {
  const meta = {
    themeClass: 'theme-aissp',
    appIcon: 'i-lucide-network',
    appNamePrefix: 'AIS',
    appNameHighlight: 'SP'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/aissp/dashboard',
        },
      ],
    },
    {
      label: 'Planning',
      items: [
        { label: 'Information Systems', icon: 'i-lucide-monitor', to: '/products/aissp/dashboard/systems' },
        { label: 'Budget & Procurement', icon: 'i-lucide-wallet', to: '/products/aissp/dashboard/budget' },
      ],
    },
    {
      label: 'Governance',
      items: [
        { label: 'Compliance & Audits', icon: 'i-lucide-shield-check', to: '/products/aissp/dashboard/compliance' },
      ],
    },
    {
      label: 'Insights',
      items: [
        { label: 'Analytics', icon: 'i-lucide-pie-chart', to: '/products/aissp/dashboard/analytics' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Settings', icon: 'i-lucide-settings', to: '/products/aissp/dashboard/settings' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useEisDashboard() {
  const meta = {
    themeClass: 'theme-eis',
    appIcon: 'i-lucide-bar-chart-3',
    appNamePrefix: 'Exec',
    appNameHighlight: 'IS'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/eis/dashboard',
        },
      ],
    },
    {
      label: 'Performance',
      items: [
        { label: 'KPI Tracker', icon: 'i-lucide-target', to: '/products/eis/dashboard/kpi' },
        { label: 'Forecasting', icon: 'i-lucide-trending-up', to: '/products/eis/dashboard/forecast' },
      ],
    },
    {
      label: 'Intelligence',
      items: [
        { label: 'Reports', icon: 'i-lucide-file-bar-chart', to: '/products/eis/dashboard/reports' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Settings', icon: 'i-lucide-settings', to: '/products/eis/dashboard/settings' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}

export function useFmsDashboard() {
  const meta = {
    themeClass: 'theme-fms',
    appIcon: 'i-lucide-wallet',
    appNamePrefix: 'F',
    appNameHighlight: 'MS'
  }

  const navGroups: { label?: string; items: NavigationMenuItem[] }[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: 'i-lucide-layout-dashboard',
          to: '/products/fms/dashboard',
        },
      ],
    },
    {
      label: 'Core Accounting',
      items: [
        { label: 'General Ledger', icon: 'i-lucide-book', to: '/products/fms/dashboard/ledger' },
      ],
    },
    {
      label: 'Planning',
      items: [
        { label: 'Budgeting', icon: 'i-lucide-pie-chart', to: '/products/fms/dashboard/budget' },
      ],
    },
    {
      label: 'Intelligence',
      items: [
        { label: 'Reports', icon: 'i-lucide-file-text', to: '/products/fms/dashboard/reports' },
      ],
    },
    {
      label: 'Admin',
      items: [
        { label: 'Settings', icon: 'i-lucide-settings', to: '/products/fms/dashboard/settings' },
      ],
    },
  ]

  return {
    ...meta,
    navGroups
  }
}