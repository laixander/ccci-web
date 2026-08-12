<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from '@nuxt/ui'

// Ignore the props for the example
defineProps<Pick<SidebarProps, 'variant' | 'collapsible' | 'side'>>()
const variant = ref<SidebarProps['variant']>('inset')
const collapsible = ref<SidebarProps['collapsible']>('icon')

const open = ref(true)

const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-lucide-house',
    active: true
  },
  {
    label: 'Inbox',
    icon: 'i-lucide-inbox',
    badge: '4'
  },
  {
    label: 'Contacts',
    icon: 'i-lucide-users'
  }
]

const isCollapsed = computed(() => collapsible.value === 'icon' && !open.value)
</script>

<template>
  <div
    class="flex flex-1 h-screen w-full"
    :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse',
      $route.meta.themeClass
    ]"
  >
    <USidebar
      v-model:open="open"
      :variant="variant"
      :collapsible="collapsible"
      :side="side"
      :ui="{ root: '[--sidebar-width-icon:4.5625rem]', container: 'h-full', header: 'px-5', body: 'scrollbar' }"
    >
      <template #header="{ close }">
        <div v-if="!isCollapsed" class="flex items-center gap-2.5 flex-1">
            <div class="size-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <UIcon :name="($route.meta.appIcon as string) || 'i-logos-nuxt-icon'" class="size-5 text-white" />
            </div>
          <span class="font-bold text-lg tracking-tight text-highlighted">
            {{ $route.meta.appNamePrefix || 'App' }}<span class="text-primary">{{ $route.meta.appNameHighlight || 'Name' }}</span>
          </span>
        </div>
        <UButton :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'" color="neutral"
                        variant="ghost" aria-label="Toggle sidebar" @click="open = !open" />
                    <UButton class="lg:hidden ml-auto" icon="i-lucide-x" color="neutral" variant="ghost"
                        aria-label="Close sidebar" @click="close()" />
      </template>

      <UNavigationMenu
        :items="items"
        orientation="vertical" :tooltip="{
                    delayDuration: 200,
                    content: { side: 'right', sideOffset: 12 },
                    arrow: true,
                }" popover
        :ui="{
                    root: 'gap-2.5',
                    label: 'text-default uppercase tracking-widest py-2.5',
                    link: 'p-2.5 overflow-hidden',
                    list: 'space-y-0.5'
                }"
      />
    </USidebar>

    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4"
        :class="[
          variant !== 'floating' && 'border-b border-default',
          side === 'right' && 'justify-end'
        ]"
      >
      </div>

      <div class="flex-1 p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
