export function useProductLanding(product: string): { description: string, primaryButton: { label: string, icon: string }, footerLinks: any[], social: string[] } {
  const commonLinks = {
    product: [
      { label: 'Features', to: '#features' },
      { label: 'Pricing', to: '#pricing' },
      { label: 'Security', to: '#' },
      { label: 'Changelog', to: '#' },
    ],
    resources: [
      { label: 'Documentation', to: '#' },
      { label: 'Webinars', to: '#' },
      { label: 'Community', to: '#' },
      { label: 'Support Center', to: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Cookie Policy', to: '#' },
    ]
  }

  const data: Record<string, { description: string, primaryButton: { label: string, icon: string }, footerLinks: any[], social: string[] }> = {
    hris: {
      description: 'The modern HR platform helping growing Philippine organizations manage their entire workforce lifecycle with confidence.',
      primaryButton: { label: 'Request Demo', icon: 'i-lucide-calendar' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Company', children: [{ label: 'About', to: '#' }, { label: 'Blog', to: '#' }, { label: 'Careers', to: '#' }, { label: 'Contact', to: '#' }] },
        { label: 'Resources', children: [{ label: 'Documentation', to: '#' }, { label: 'Implementation Guide', to: '#' }, { label: 'Community', to: '#' }, { label: 'Support Center', to: '#' }] },
        { label: 'Legal', children: [{ label: 'Privacy Policy', to: '#' }, { label: 'Terms of Service', to: '#' }, { label: 'Data Protection', to: '#' }] }
      ],
      social: ['linkedin', 'x', 'facebook']
    },
    cms: {
      description: 'The all-in-one campus management platform helping Philippine schools digitize enrollment, academics, and administration.',
      primaryButton: { label: 'Request Demo', icon: 'i-lucide-calendar' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Institution', children: [{ label: 'About', to: '#' }, { label: 'Blog', to: '#' }, { label: 'Careers', to: '#' }, { label: 'Contact', to: '#' }] },
        { label: 'Resources', children: [{ label: 'Documentation', to: '#' }, { label: 'Implementation Guide', to: '#' }, { label: 'Community', to: '#' }, { label: 'Support Center', to: '#' }] },
        { label: 'Legal', children: [{ label: 'Privacy Policy', to: '#' }, { label: 'Terms of Service', to: '#' }, { label: 'Data Protection', to: '#' }] }
      ],
      social: ['linkedin', 'x', 'facebook']
    },
    lms: {
      description: 'The modern learning management system built to empower educators and inspire learners globally.',
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'K-12 Schools', to: '#' }, { label: 'Higher Education', to: '#' }, { label: 'Corporate Training', to: '#' }, { label: 'Bootcamps', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    },
    dms: {
      description: 'The secure document management system built to streamline operations and ensure compliance.',
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'Government Agencies', to: '#' }, { label: 'Corporations', to: '#' }, { label: 'Healthcare', to: '#' }, { label: 'Education', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    },
    ams: {
      description: 'The intelligent asset management system designed to track and optimize your resources.',
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'Enterprise', to: '#' }, { label: 'Small Business', to: '#' }, { label: 'Healthcare', to: '#' }, { label: 'Education', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    },
    ilsp: {
      description: 'Manage global partnerships, MOUs, and student exchange programs in one unified platform.',
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'Enterprise', to: '#' }, { label: 'Small Business', to: '#' }, { label: 'Healthcare', to: '#' }, { label: 'Education', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    },
    aissp: {
      description: 'Align ICT investments with strategic goals. Track systems, budgets, and compliance effortlessly.',
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'Government', to: '#' }, { label: 'Enterprise', to: '#' }, { label: 'Healthcare', to: '#' }, { label: 'Education', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    },
    eis: {
      description: "Give executives a real-time, consolidated view of your organization's performance.",
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'Enterprise', to: '#' }, { label: 'Government', to: '#' }, { label: 'Healthcare', to: '#' }, { label: 'Education', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    },
    fms: {
      description: 'Manage income, expenses, budgets, and compliance. Ensure financial stability and profitability.',
      primaryButton: { label: 'Get started', icon: 'i-lucide-arrow-right' },
      footerLinks: [
        { label: 'Product', children: commonLinks.product },
        { label: 'Solutions', children: [{ label: 'Enterprise', to: '#' }, { label: 'Government', to: '#' }, { label: 'Healthcare', to: '#' }, { label: 'Education', to: '#' }] },
        { label: 'Resources', children: commonLinks.resources },
        { label: 'Legal', children: commonLinks.legal }
      ],
      social: ['linkedin', 'x', 'youtube']
    }
  }

  return data[product] ?? data['hris']!
}
