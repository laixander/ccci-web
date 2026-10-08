export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'zinc',
      info: 'sky',
      success: 'green',
      warning: 'orange',
      danger: 'red',
      // Full Tailwind palette
      red: 'red',
      orange: 'orange',
      amber: 'amber',
      yellow: 'yellow',
      lime: 'lime',
      green: 'green',
      emerald: 'emerald',
      teal: 'teal',
      cyan: 'cyan',
      sky: 'sky',
      blue: 'blue',
      indigo: 'indigo',
      violet: 'violet',
      purple: 'purple',
      fuchsia: 'fuchsia',
      pink: 'pink',
      rose: 'rose',
      slate: 'slate',
      gray: 'gray',
      zinc: 'zinc',
      stone: 'stone',
      taupe: 'taupe',
      mauve: 'mauve',
      mist: 'mist',
      olive: 'olive',
    },
    pageSection: {
      slots: {
        root: 'relative isolate even:bg-elevated/60 dark:even:bg-muted/50',
        headline: 'flex items-center gap-2 before:content-[\'\'] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary uppercase tracking-widest text-xs font-semibold text-primary'
      }
    }
  }
})
