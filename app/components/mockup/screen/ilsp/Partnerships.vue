<template>
  <!-- Browser chrome frame -->
  <div class="w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-default bg-default font-sans text-xs select-none">
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-4 py-2.5 bg-elevated border-b border-default">
      <span class="size-3 rounded-full bg-[#ff5f57]" />
      <span class="size-3 rounded-full bg-[#febc2e]" />
      <span class="size-3 rounded-full bg-[#28c840]" />
      <div class="ml-3 flex-1 bg-muted rounded-md h-5 flex items-center px-3 gap-1.5 max-w-xs">
        <UIcon name="i-lucide-lock" class="size-2.5 text-dimmed" />
        <span class="text-dimmed text-[10px]">app.linkagescore.io/partnerships</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-globe" class="size-3.5 text-white" />
          </div>
        </div>
        <nav class="flex-1 py-2 space-y-0.5 flex flex-col items-center w-full">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            :title="item.label"
            :class="[
              'flex items-center justify-center size-7 rounded-md cursor-default transition-colors',
              item.active ? 'bg-primary/10 text-primary' : 'text-muted'
            ]"
          >
            <UIcon :name="item.icon" class="size-3.5" />
          </div>
        </nav>
        <div class="py-2 border-t border-default flex items-center justify-center w-full">
          <UAvatar text="LD" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Partner Institutions</p>
            <p class="text-[9px] text-dimmed mt-0.5">142 active partnerships</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-muted rounded-md px-2 py-1 cursor-default">
              <UIcon name="i-lucide-search" class="size-3 text-dimmed" />
              <span class="text-[9px] text-dimmed">Search institutions…</span>
            </div>
            <UButton size="xs" label="Add Partner" icon="i-lucide-plus" color="primary" />
          </div>
        </div>

        <!-- Filter bar -->
        <div class="flex items-center gap-2 px-4 py-1.5 border-b border-default">
          <span v-for="cat in filterCats" :key="cat.label" :class="['text-[9px] px-2 py-0.5 rounded-full cursor-default font-medium', cat.active ? 'bg-primary/10 text-primary' : 'text-muted']">
            {{ cat.label }}
          </span>
        </div>

        <!-- Directory table -->
        <div class="flex-1 overflow-y-auto scrollbar">
          <table class="w-full">
            <thead>
              <tr class="border-b border-default bg-elevated">
                <th class="text-left px-4 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Institution Name</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Region</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Active MOUs</th>
                <th class="text-left px-2 py-1.5 text-[9px] text-dimmed font-medium uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="partner in partners" :key="partner.name" class="border-b border-default last:border-0 hover:bg-muted/20">
                <td class="px-4 py-2">
                  <div class="flex items-center gap-2.5">
                    <UAvatar :text="partner.initials" size="xs" :class="partner.avatarColor" class="text-[9px] font-bold shadow-sm ring-1 ring-default" />
                    <div>
                      <p class="text-[10px] font-semibold text-highlighted">{{ partner.name }}</p>
                      <p class="text-[8.5px] text-dimmed">{{ partner.type }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-2 py-2">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[12px]">{{ partner.flag }}</span>
                    <span class="text-[9.5px] text-muted">{{ partner.country }}</span>
                  </div>
                </td>
                <td class="px-2 py-2 text-[9.5px] text-muted">{{ partner.mous }}</td>
                <td class="px-2 py-2">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-medium" :class="partner.statusClass">{{ partner.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Institutions', icon: 'i-lucide-building-2', active: true },
  { label: 'MOUs', icon: 'i-lucide-file-text', active: false },
  { label: 'Mobility', icon: 'i-lucide-plane', active: false },
  { label: 'Grants', icon: 'i-lucide-badge-dollar-sign', active: false },
  { label: 'Analytics', icon: 'i-lucide-pie-chart', active: false },
  { label: 'Settings', icon: 'i-lucide-settings', active: false },
]

const filterCats = [
  { label: 'All', active: true },
  { label: 'Asia Pacific', active: false },
  { label: 'North America', active: false },
  { label: 'Europe', active: false },
  { label: 'Industry Partners', active: false },
]

const partners = [
  { name: 'National University of Singapore', initials: 'NUS', avatarColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30', type: 'Academic', country: 'Singapore', flag: '🇸🇬', mous: '3 Active', status: 'Active', statusClass: 'bg-success/10 text-success' },
  { name: 'University of Tokyo', initials: 'UT', avatarColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30', type: 'Academic', country: 'Japan', flag: '🇯🇵', mous: '1 Active', status: 'Active', statusClass: 'bg-success/10 text-success' },
  { name: 'Stanford University', initials: 'SU', avatarColor: 'bg-red-100 text-red-600 dark:bg-red-900/30', type: 'Academic', country: 'United States', flag: '🇺🇸', mous: '2 Active', status: 'Active', statusClass: 'bg-success/10 text-success' },
  { name: 'Microsoft Research Asia', initials: 'MS', avatarColor: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30', type: 'Industry', country: 'China', flag: '🇨🇳', mous: '1 Active', status: 'Expiring Soon', statusClass: 'bg-warning/10 text-warning' },
  { name: 'University of Melbourne', initials: 'UM', avatarColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30', type: 'Academic', country: 'Australia', flag: '🇦🇺', mous: '0 Active', status: 'Inactive', statusClass: 'bg-muted/50 text-muted' },
]
</script>
