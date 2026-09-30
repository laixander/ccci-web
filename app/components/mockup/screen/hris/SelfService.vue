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
        <span class="text-dimmed text-[10px]">app.peoplecore.io/self-service</span>
      </div>
    </div>

    <!-- App layout: sidebar + main -->
    <div class="flex h-[340px]">
      <!-- Sidebar (icon-only) -->
      <aside class="w-10 flex-shrink-0 border-r border-default bg-elevated flex flex-col items-center">
        <div class="flex items-center justify-center py-2 border-b border-default w-full">
          <div class="size-6 rounded-md bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-users" class="size-3.5 text-white" />
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
          <UAvatar text="SC" size="xs" color="primary" />
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-hidden flex flex-col bg-default">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-default">
          <div>
            <p class="text-[11px] font-bold text-highlighted">Employee Self-Service</p>
            <p class="text-[9px] text-dimmed mt-0.5">Manage your profile, payslips, and leave requests</p>
          </div>
          <UButton size="xs" label="Edit Profile" icon="i-lucide-pencil" color="neutral" variant="outline" />
        </div>

        <div class="flex-1 overflow-y-auto scrollbar px-3 py-2.5 space-y-2.5">

          <!-- Profile card -->
          <div class="rounded-lg border border-default bg-elevated px-3 py-2.5 flex items-center gap-3">
            <UAvatar text="SC" size="md" color="primary" />
            <div class="flex-1 min-w-0">
              <p class="text-[10.5px] font-bold text-highlighted">Sarah Chen</p>
              <p class="text-[8.5px] text-muted">VP of HR · HR & Admin</p>
              <div class="flex items-center gap-3 mt-1 text-[8px] text-dimmed">
                <span class="flex items-center gap-0.5"><UIcon name="i-lucide-id-card" class="size-2.5" /> E010</span>
                <span class="flex items-center gap-0.5"><UIcon name="i-lucide-calendar" class="size-2.5" /> Joined March 2019</span>
                <span class="flex items-center gap-0.5"><UIcon name="i-lucide-mail" class="size-2.5" /> sarah.chen@company.com</span>
              </div>
            </div>
          </div>

          <!-- Tabs bar (static) -->
          <div class="flex gap-1 border-b border-default">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              :class="[
                'px-3 py-1.5 text-[9px] font-medium border-b-2 -mb-px transition-colors',
                tab.active ? 'border-primary text-primary' : 'border-transparent text-muted'
              ]"
            >{{ tab.label }}</button>
          </div>

          <!-- My Profile tab content -->
          <div class="grid grid-cols-2 gap-2">
            <!-- Personal Info -->
            <div class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9.5px] font-semibold text-highlighted mb-2">Personal Information</p>
              <div class="space-y-2">
                <div v-for="field in profileFields" :key="field.label" class="border-b border-default last:border-0 pb-1.5 last:pb-0">
                  <p class="text-[7.5px] text-dimmed uppercase tracking-wide font-semibold mb-0.5">{{ field.label }}</p>
                  <p class="text-[9px] text-highlighted font-medium">{{ field.value }}</p>
                </div>
              </div>
            </div>

            <!-- Leave Balances -->
            <div class="rounded-lg border border-default bg-elevated p-2.5">
              <p class="text-[9.5px] font-semibold text-highlighted mb-2">Leave Balances</p>
              <div class="space-y-2.5">
                <div v-for="leave in leaveBalances" :key="leave.label">
                  <div class="flex items-center justify-between mb-1">
                    <p class="text-[8.5px] font-medium text-highlighted">{{ leave.label }}</p>
                    <span class="text-[8.5px] font-bold text-highlighted">
                      {{ leave.remaining }}<span class="text-dimmed font-normal">/{{ leave.total }}d</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        class="h-full rounded-full"
                        :class="leave.barColor"
                        :style="`width: ${Math.round((leave.remaining / leave.total) * 100)}%`"
                      />
                    </div>
                    <span class="text-[7.5px] text-dimmed">{{ leave.used }}d used</span>
                  </div>
                </div>
                <UButton block size="xs" label="File Leave Request" icon="i-lucide-plus" />
              </div>
            </div>
          </div>

          <!-- Payslips quick preview -->
          <div class="rounded-lg border border-default bg-elevated overflow-hidden">
            <div class="flex items-center justify-between px-3 py-1.5 border-b border-default">
              <p class="text-[9.5px] font-semibold text-highlighted">Recent Payslips</p>
              <span class="text-[8px] text-muted">My Payslips tab for full list</span>
            </div>
            <table class="w-full">
              <thead>
                <tr class="border-b border-default bg-muted/30">
                  <th class="text-left px-3 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Period</th>
                  <th class="text-right px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Gross</th>
                  <th class="text-right px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Net Pay</th>
                  <th class="text-left px-2 py-1 text-[8.5px] text-dimmed font-semibold uppercase tracking-wide">Status</th>
                  <th class="px-3 py-1" />
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="slip in payslips"
                  :key="slip.month"
                  class="border-b border-default last:border-0 hover:bg-muted/20"
                >
                  <td class="px-3 py-1.5 text-[9px] font-medium text-highlighted">{{ slip.month }}</td>
                  <td class="px-2 py-1.5 text-[9px] text-highlighted text-right">{{ slip.gross }}</td>
                  <td class="px-2 py-1.5 text-[9px] font-bold text-success text-right">{{ slip.net }}</td>
                  <td class="px-2 py-1.5">
                    <span class="text-[7.5px] bg-success/10 text-success rounded-full px-1.5 py-0.5 font-medium">{{ slip.status }}</span>
                  </td>
                  <td class="px-3 py-1.5 text-right">
                    <UButton size="xs" icon="i-lucide-download" color="neutral" variant="ghost" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarItems = [
  { label: 'Dashboard',   icon: 'i-lucide-layout-dashboard', active: false },
  { label: 'Employees',   icon: 'i-lucide-users',            active: false },
  { label: 'Timekeeping', icon: 'i-lucide-clock',            active: false },
  { label: 'Payroll',     icon: 'i-lucide-banknote',         active: false },
  { label: 'Recruitment', icon: 'i-lucide-user-plus',        active: false },
  { label: 'Performance', icon: 'i-lucide-trending-up',      active: false },
  { label: 'Self-Service', icon: 'i-lucide-user-cog',        active: true  },
  { label: 'Analytics',   icon: 'i-lucide-bar-chart-2',      active: false },
]

const tabs = [
  { label: 'My Profile', active: true  },
  { label: 'My Payslips', active: false },
  { label: 'Leave',      active: false },
]

const profileFields = [
  { label: 'Full Name',   value: 'Sarah Chen'                },
  { label: 'Email',       value: 'sarah.chen@company.com'    },
  { label: 'Phone',       value: '+63 917 888 9999'          },
  { label: 'Department',  value: 'HR & Admin'                },
]

const leaveBalances = [
  { label: 'Vacation Leave', remaining: 10, total: 15, used: 5, barColor: 'bg-primary'   },
  { label: 'Sick Leave',     remaining: 8,  total: 10, used: 2, barColor: 'bg-error'     },
  { label: 'Emergency Leave', remaining: 3, total: 3,  used: 0, barColor: 'bg-warning'   },
]

const payslips = [
  { month: 'August 2026', gross: '₱120,000', net: '₱101,500', status: 'Paid' },
  { month: 'July 2026',   gross: '₱120,000', net: '₱101,500', status: 'Paid' },
  { month: 'June 2026',   gross: '₱115,000', net: '₱97,000',  status: 'Paid' },
]
</script>
