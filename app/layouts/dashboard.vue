<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from '@nuxt/ui'

defineProps<Pick<SidebarProps, 'variant' | 'collapsible' | 'side'>>()
const variant = ref<SidebarProps['variant']>('inset')
const collapsible = ref<SidebarProps['collapsible']>('icon')
const open = ref(true)

const route = useRoute()
const dashboardConfig = computed(() => {
  if (route.path.startsWith('/products/cms')) return useCmsDashboard()
  if (route.path.startsWith('/products/lms')) return useLmsDashboard()
  return useHrisDashboard() // default fallback
})

const themeClass = computed(() => dashboardConfig.value.themeClass)
const appIcon = computed(() => dashboardConfig.value.appIcon)
const appNamePrefix = computed(() => dashboardConfig.value.appNamePrefix)
const appNameHighlight = computed(() => dashboardConfig.value.appNameHighlight)
const navGroups = computed(() => dashboardConfig.value.navGroups)

const isCollapsed = computed(() => collapsible.value === 'icon' && !open.value)

const loginRoute = computed(() => {
  if (route.path.startsWith('/products/cms')) return '/products/cms/login'
  if (route.path.startsWith('/products/lms')) return '/products/lms/login'
  return '/products/hris/login'
})

const dashboardHomeRoute = computed(() => {
  if (route.path.startsWith('/products/cms')) return '/products/cms/dashboard'
  if (route.path.startsWith('/products/lms')) return '/products/lms/dashboard'
  return '/products/hris/dashboard'
})

const userInfo = computed(() => {
  if (route.path.startsWith('/products/lms')) return { initials: 'AR', name: 'Alex Rivera', role: 'L&D Manager' }
  if (route.path.startsWith('/products/cms')) return { initials: 'RC', name: 'Reg. Carmen Reyes', role: 'Registrar' }
  return { initials: 'SC', name: 'Sarah Chen', role: 'VP of HR' }
})
</script>

<template>
  <div
    class="flex flex-1 h-screen w-full"
    :class="[
      themeClass,
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse',
    ]"
  >
    <USidebar
      v-model:open="open"
      :variant="variant"
      :collapsible="collapsible"
      :side="side"
      :ui="{ root: '[--sidebar-width-icon:4.5625rem]', container: 'h-full', header: 'px-5', body: 'scrollbar' }"
      :menu="{ ui: { content: themeClass } }"
      :class="themeClass"
    >
      <template #header="{ close }">
        <div v-if="!isCollapsed" class="flex items-center gap-2.5 flex-1">
          <div class="size-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <UIcon :name="appIcon" class="size-5 text-white" />
          </div>
          <span class="font-bold text-lg tracking-tight text-highlighted">
            {{ appNamePrefix }}<span class="text-primary">{{ appNameHighlight }}</span>
          </span>
        </div>
        <UButton
          :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
          class="invisible lg:visible"
        />
        <UButton
          class="lg:hidden ml-auto"
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          aria-label="Close sidebar"
          @click="close()"
        />
      </template>

      <!-- Navigation Groups -->
      <div class="space-y-4 py-2">
        <div v-for="group in navGroups" :key="group.label || 'main'">
          <p
            v-if="group.label && !isCollapsed"
            class="px-3 text-[10px] font-bold uppercase tracking-widest text-dimmed mb-1.5"
          >
            {{ group.label }}
          </p>
          <UNavigationMenu
            :items="group.items"
            orientation="vertical"
            :tooltip="{
              delayDuration: 200,
              content: { side: 'right', sideOffset: 12 },
              arrow: true,
            }"
            popover
            :ui="{
              root: 'gap-0.5',
              label: 'text-default uppercase tracking-widest py-2.5',
              link: 'p-2.5 overflow-hidden',
              list: 'space-y-0.5',
            }"
          />
        </div>
      </div>

      <template #footer>
        <div v-if="!isCollapsed" class="flex items-center justify-between gap-3 px-2 py-3 w-full">
          <UAvatar :text="userInfo.initials" size="sm" color="primary" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-highlighted truncate">{{ userInfo.name }}</p>
            <p class="text-xs text-muted truncate">{{ userInfo.role }}</p>
          </div>
          <UButton icon="i-lucide-log-out" size="xs" color="neutral" variant="ghost" :to="loginRoute" />
        </div>
        <div v-else class="flex justify-center py-4 px-2">
          <UAvatar :text="userInfo.initials" size="sm" color="primary" />
        </div>
      </template>
    </USidebar>

    <!-- Main content area -->
    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <!-- Top bar -->
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-6 border-b border-default"
      >
        <div class="flex items-center gap-3">
          <UButton
            :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle sidebar"
            @click="open = !open"
            class="lg:hidden"
          />
          <!-- Breadcrumb -->
          <UBreadcrumb
            :items="[
              { label: appNamePrefix + appNameHighlight, to: dashboardHomeRoute },
              { label: ($route.meta.breadcrumb as string) || ($route.name as string)?.split('-').pop() || 'Dashboard' },
            ]"
          />
        </div>
        <div class="flex items-center gap-2">
          <UColorModeButton />
          <div class="relative">
            <UButton icon="i-lucide-bell" color="neutral" variant="ghost" size="sm" />
            <span class="absolute top-1 right-1 size-2 rounded-full bg-primary" />
          </div>
          <UButton icon="i-lucide-settings" color="neutral" variant="ghost" size="sm" />
        </div>
      </div>

      <!-- Page content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar">
        <slot />
      </div>
    </div>
  </div>
</template>
