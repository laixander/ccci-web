<template>
  <!-- Phone frame mockup -->
  <div class="mx-auto w-[260px] select-none">
    <!-- Phone shell -->
    <div class="relative bg-zinc-900 rounded-[36px] p-[10px] shadow-2xl ring-1 ring-white/10">
      <!-- Dynamic island -->
      <div class="mx-auto mb-2 w-20 h-6 bg-zinc-950 rounded-full flex items-center justify-center gap-1.5">
        <div class="size-2.5 rounded-full bg-zinc-800 ring-1 ring-white/5" />
        <div class="size-1.5 rounded-full bg-zinc-700" />
      </div>

      <!-- Screen -->
      <div class="rounded-[28px] overflow-hidden bg-zinc-950 h-[500px] flex flex-col text-[10px]">
        <!-- Status bar -->
        <div class="flex items-center justify-between px-4 pt-1 pb-0.5 text-[9px] text-white/50">
          <span>9:41</span>
          <div class="flex items-center gap-1">
            <UIcon name="i-lucide-signal" class="size-2.5" />
            <UIcon name="i-lucide-wifi" class="size-2.5" />
            <UIcon name="i-lucide-battery" class="size-3" />
          </div>
        </div>

        <!-- App header -->
        <div class="px-4 pt-2 pb-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-white/40 text-[9px] font-medium uppercase tracking-widest">IRS SafeReport</p>
              <p class="text-white text-[13px] font-bold leading-tight mt-0.5">Incident Dashboard</p>
            </div>
            <div class="relative">
              <div class="size-8 rounded-full bg-red-500/20 ring-1 ring-red-500/30 flex items-center justify-center">
                <UIcon name="i-lucide-bell" class="size-3.5 text-red-400" />
              </div>
              <span class="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-red-500 text-white text-[7px] flex items-center justify-center font-bold">3</span>
            </div>
          </div>
        </div>

        <!-- KPI strip -->
        <div class="px-3 mb-3">
          <div class="grid grid-cols-3 gap-1.5">
            <div v-for="kpi in kpis" :key="kpi.label" :class="['rounded-xl p-2 border', kpi.bg, kpi.border]">
              <UIcon :name="kpi.icon" :class="['size-3.5 mb-1', kpi.color]" />
              <p :class="['text-[13px] font-extrabold leading-none', kpi.value === '3' ? 'text-red-400' : 'text-white']">{{ kpi.value }}</p>
              <p class="text-white/40 text-[8px] mt-0.5 leading-tight">{{ kpi.label }}</p>
            </div>
          </div>
        </div>

        <!-- Report button -->
        <div class="px-3 mb-3">
          <button class="w-full bg-red-500 rounded-xl py-2.5 flex items-center justify-center gap-1.5 shadow-lg shadow-red-500/30">
            <UIcon name="i-lucide-triangle-alert" class="size-3.5 text-white" />
            <span class="text-white text-[11px] font-bold">Report New Incident</span>
          </button>
        </div>

        <!-- Recent incidents -->
        <div class="px-3 flex-1 overflow-hidden">
          <p class="text-white/50 text-[9px] font-semibold uppercase tracking-widest mb-2">Recent Incidents</p>
          <div class="space-y-1.5">
            <div
              v-for="incident in incidents"
              :key="incident.id"
              class="bg-white/5 rounded-xl p-2.5 border border-white/8 flex items-start gap-2.5"
            >
              <div :class="['size-6 rounded-lg flex-shrink-0 flex items-center justify-center', incident.iconBg]">
                <UIcon :name="incident.icon" :class="['size-3', incident.iconColor]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white text-[9px] font-semibold truncate">{{ incident.title }}</p>
                <p class="text-white/40 text-[8px]">{{ incident.location }} · {{ incident.time }}</p>
              </div>
              <span :class="['text-[7px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0', incident.statusColor]">
                {{ incident.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Bottom nav -->
        <div class="px-4 py-2 border-t border-white/8 flex items-center justify-around mt-2">
          <div v-for="nav in bottomNav" :key="nav.label" :class="['flex flex-col items-center gap-0.5', nav.active ? 'text-red-400' : 'text-white/30']">
            <UIcon :name="nav.icon" class="size-3.5" />
            <span class="text-[7px] font-medium">{{ nav.label }}</span>
          </div>
        </div>

        <!-- Home indicator -->
        <div class="flex justify-center pb-1">
          <div class="w-16 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const kpis = [
  { label: 'Open', value: '12', icon: 'i-lucide-circle-dot', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { label: 'Critical', value: '3', icon: 'i-lucide-flame', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { label: 'Resolved', value: '48', icon: 'i-lucide-check-circle', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
]

const incidents = [
  {
    id: 1,
    title: 'Forklift Near-Miss — Bay 3',
    location: 'Warehouse A',
    time: '2h ago',
    status: 'OPEN',
    icon: 'i-lucide-truck',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    statusColor: 'bg-orange-500/20 text-orange-300',
  },
  {
    id: 2,
    title: 'Chemical Spill — Lab 2',
    location: 'R&D Building',
    time: '5h ago',
    status: 'CRITICAL',
    icon: 'i-lucide-flask-conical',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    statusColor: 'bg-red-500/20 text-red-300',
  },
  {
    id: 3,
    title: 'Slip & Fall — Lobby',
    location: 'Main Entrance',
    time: '1d ago',
    status: 'IN REVIEW',
    icon: 'i-lucide-person-standing',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    statusColor: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    id: 4,
    title: 'Electrical Hazard Reported',
    location: 'Floor 4, Rm 401',
    time: '2d ago',
    status: 'RESOLVED',
    icon: 'i-lucide-zap',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    statusColor: 'bg-emerald-500/20 text-emerald-300',
  },
]

const bottomNav = [
  { label: 'Home', icon: 'i-lucide-layout-dashboard', active: true },
  { label: 'Report', icon: 'i-lucide-plus-circle', active: false },
  { label: 'Incidents', icon: 'i-lucide-list', active: false },
  { label: 'Analytics', icon: 'i-lucide-bar-chart-2', active: false },
  { label: 'Profile', icon: 'i-lucide-user', active: false },
]
</script>
