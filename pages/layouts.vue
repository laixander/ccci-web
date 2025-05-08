<template>
    <CWrapper>
        <div class="divide-y dark:divide-gray-800 *:pt-8 *:pb-6 relative z-0">
            <div class="space-y-8 first:pt-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Dashboard
                    </div>
                    <UBadge color="white" variant="solid" label="<CLayoutDashboard />" />
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        CLayoutDashboard has a sidebar, header, content, and footer
                    </div>
                </div>
                <CLayoutDashboard logo="/logo.png" name="UI Development" :links="links" :isLoggedIn="true" minHeight="min-h-full" customClass="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800" sidebarHeight="h-auto" title="Dashboard">
                    <CWrapper class="h-full">
                        <div class="rounded-lg border-dashed border border-gray-300 dark:border-gray-700 bg-gray-100/60 dark:bg-gray-900/60 h-full"></div>
                    </CWrapper>
                </CLayoutDashboard>
                <CodeBlock :code="codes.dashboard" language="html" />
            </div>

            <div class="space-y-8 first:pt-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Minimal
                    </div>
                    <UBadge color="white" variant="solid" label="<CLayoutMinimal />" />
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        CLayoutMinimal is without sidebar
                    </div>
                </div>
                <CLayoutMinimal logo="logo.png" name="UI Development" :links="links" :isLoggedIn="false" :hasMenu="false" minHeight="min-h-full" customClass="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <CWrapper>
                        <div class="rounded-lg border-dashed border border-gray-300 dark:border-gray-700 bg-gray-100/60 dark:bg-gray-900/60 h-32"></div>
                    </CWrapper>
                </CLayoutMinimal>
                <CodeBlock :code="codes.minimal" language="html" />
            </div>

            <div class="space-y-8 first:pt-0">
                <div class="space-y-2">
                    <div class="font-bold text-lg text-gray-800 dark:text-gray-100">
                        Centered
                    </div>
                    <UBadge color="white" variant="solid" label="<CLayoutCentered />" />
                    <div class="font-light text-sm text-gray-500 dark:text-gray-100">
                        CLayoutCentered is usually used for login page or any centered design layout
                    </div>
                </div>
                <CLayoutCentered minHeight="min-h-full" customClass="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div class="rounded-lg border-dashed border border-gray-300 dark:border-gray-700 bg-gray-100/60 dark:bg-gray-900/60 w-72 h-96 my-8"></div>
                </CLayoutCentered>
                <CodeBlock :code="codes.centered" language="html" />
            </div>
        </div>
    </CWrapper>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Layouts'
});

const codes = {
  dashboard: "dashboard",
  minimal: "minimal",
  centered: "centered",
};

const links = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-home',
      to: '/layouts'
    },
    {
      label: 'Teams',
      icon: 'i-heroicons-users',
      to: '/'
    },
    {
      label: 'Projects',
      icon: 'i-heroicons-folder',
      to: '/'
    },
    {
      label: 'Calendar',
      icon: 'i-heroicons-calendar',
      to: '/'
    },
    {
      label: 'Documents',
      icon: 'i-heroicons-document-duplicate',
      to: '/'
    },
    {
      label: 'Reports',
      icon: 'i-heroicons-chart-pie',
      to: '/'
    },
  ]
]
</script>