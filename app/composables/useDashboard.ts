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