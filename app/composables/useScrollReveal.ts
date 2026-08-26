import { useIntersectionObserver } from '@vueuse/core'

export interface ScrollRevealOptions {
  threshold?: number
  once?: boolean
  delay?: number // ms before isVisible flips to true
}

/**
 * Returns a ref to attach to a template element.
 * When the element enters the viewport (at the given threshold),
 * `isVisible` becomes true after `delay` ms.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.18, once = true, delay = 0 } = options
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const { stop } = useIntersectionObserver(
    el,
    (entries) => {
      if (entries[0]?.isIntersecting) {
        timer = setTimeout(() => {
          isVisible.value = true
          if (once) stop()
        }, delay)
      }
      else {
        if (timer) clearTimeout(timer)
        if (!once) isVisible.value = false
      }
    },
    { threshold },
  )

  return { el, isVisible }
}
