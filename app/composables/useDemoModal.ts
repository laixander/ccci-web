import { useState } from '#app'

export function useDemoModal() {
  const isOpen = useState('demo-modal-open', () => false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    open,
    close
  }
}
