<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const activeTab = ref('overview')
const tabs = [
  { label: 'Overview', slot: 'overview' },
  { label: 'Run Payroll', slot: 'run' },
  { label: 'History', slot: 'history' },
]

const payrollSummary = {
  month: 'August 2026',
  totalGross: '₱345,200',
  totalDeductions: '₱57,750',
  totalNet: '₱287,450',
  employees: 342,
  status: 'Processed',
}

const breakdown = [
  { label: 'Basic Salaries', amount: '₱240,000', icon: 'i-lucide-wallet', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Overtime Pay', amount: '₱18,500', icon: 'i-lucide-clock', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Allowances', amount: '₱38,700', icon: 'i-lucide-gift', color: 'text-success', bg: 'bg-success/10' },
  { label: 'Bonuses', amount: '₱48,000', icon: 'i-lucide-star', color: 'text-info', bg: 'bg-info/10' },
]

const deductions = [
  { label: 'SSS Contribution', amount: '₱12,420', pct: '3.6%' },
  { label: 'PhilHealth', amount: '₱6,904', pct: '2%' },
  { label: 'Pag-IBIG', amount: '₱3,420', pct: '1%' },
  { label: 'Withholding Tax', amount: '₱35,006', pct: '10.1%' },
]

const payslips = [
  { name: 'James Reyes', id: 'E001', dept: 'Engineering', gross: '₱85,000', net: '₱71,400', status: 'Paid', initials: 'JR', color: 'primary' as const },
  { name: 'Mia Santos', id: 'E002', dept: 'Marketing', gross: '₱65,000', net: '₱54,600', status: 'Paid', initials: 'MS', color: 'secondary' as const },
  { name: 'Carlos Wu', id: 'E003', dept: 'Sales', gross: '₱72,000', net: '₱60,480', status: 'Paid', initials: 'CW', color: 'neutral' as const },
  { name: 'Priya Lal', id: 'E004', dept: 'HR & Admin', gross: '₱55,000', net: '₱46,200', status: 'Pending', initials: 'PL', color: 'primary' as const },
  { name: 'Ana Dela Cruz', id: 'E006', dept: 'Operations', gross: '₱58,000', net: '₱48,720', status: 'Paid', initials: 'AD', color: 'warning' as const },
]

const payslipColumns = [
  { accessorKey: 'employee', header: 'Employee' },
  { accessorKey: 'dept', header: 'Department' },
  { accessorKey: 'gross', header: 'Gross' },
  { accessorKey: 'net', header: 'Net' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]

const history = [
  { month: 'July 2026', employees: 340, gross: '₱342,500', net: '₱284,775', status: 'Completed', date: 'Jul 30, 2026' },
  { month: 'June 2026', employees: 338, gross: '₱339,200', net: '₱282,012', status: 'Completed', date: 'Jun 30, 2026' },
  { month: 'May 2026', employees: 335, gross: '₱334,000', net: '₱277,722', status: 'Completed', date: 'May 30, 2026' },
  { month: 'April 2026', employees: 330, gross: '₱326,400', net: '₱271,442', status: 'Completed', date: 'Apr 30, 2026' },
]

const historyColumns = [
  { accessorKey: 'month', header: 'Period' },
  { accessorKey: 'employees', header: 'Employees' },
  { accessorKey: 'gross', header: 'Gross' },
  { accessorKey: 'net', header: 'Net Pay' },
  { accessorKey: 'date', header: 'Processed' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions' }
]

const runStep = ref(1)
const runPayrollLoading = ref(false)
function nextStep() {
  if (runStep.value < 4) runStep.value++
}
function prevStep() {
  if (runStep.value > 1) runStep.value--
}
async function processPayroll() {
  runPayrollLoading.value = true
  await new Promise(r => setTimeout(r, 1500))
  runPayrollLoading.value = false
  runStep.value = 4
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Smart Payroll</h1>
        <p class="text-muted text-sm mt-1">Automated payroll calculations and statutory compliance</p>
      </div>
      <div class="flex gap-3">
        <UButton icon="i-lucide-download" label="Download Payslips" color="neutral" variant="outline" size="sm" />
        <UButton icon="i-lucide-play" label="Run Payroll" size="sm" @click="activeTab = 'run'; runStep = 1" />
      </div>
    </div>

    <!-- Tabs -->
    <UTabs
      :items="tabs"
    >
      <!-- Overview Tab -->
      <template #overview>
        <div class="space-y-6 pt-4">
          <!-- Summary Banner -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }" class="sm:col-span-1">
              <p class="text-xs text-dimmed uppercase tracking-wider font-semibold mb-1">Period</p>
              <p class="text-lg font-bold text-highlighted">{{ payrollSummary.month }}</p>
              <span class="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium mt-2 inline-block">{{ payrollSummary.status }}</span>
            </UCard>
            <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
              <p class="text-xs text-dimmed uppercase tracking-wider font-semibold mb-1">Gross Pay</p>
              <p class="text-2xl font-bold text-highlighted">{{ payrollSummary.totalGross }}</p>
              <p class="text-xs text-muted mt-1">{{ payrollSummary.employees }} employees</p>
            </UCard>
            <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
              <p class="text-xs text-dimmed uppercase tracking-wider font-semibold mb-1">Total Deductions</p>
              <p class="text-2xl font-bold text-error">{{ payrollSummary.totalDeductions }}</p>
              <p class="text-xs text-muted mt-1">SSS, PhilHealth, Tax</p>
            </UCard>
            <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
              <p class="text-xs text-dimmed uppercase tracking-wider font-semibold mb-1">Net Pay</p>
              <p class="text-2xl font-bold text-success">{{ payrollSummary.totalNet }}</p>
              <p class="text-xs text-muted mt-1">After all deductions</p>
            </UCard>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Pay Components -->
            <UCard variant="subtle" :ui="{ root: 'shadow-sm' }">
              <h2 class="font-semibold text-highlighted mb-4">Pay Components</h2>
              <div class="space-y-3">
                <div v-for="item in breakdown" :key="item.label" class="flex items-center gap-4">
                  <div :class="['size-9 rounded-lg flex items-center justify-center flex-shrink-0', item.bg]">
                    <UIcon :name="item.icon" :class="['size-4', item.color]" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-highlighted font-medium">{{ item.label }}</p>
                  </div>
                  <p class="text-sm font-bold text-highlighted">{{ item.amount }}</p>
                </div>
              </div>
            </UCard>

            <!-- Deductions -->
            <UCard variant="subtle" :ui="{ root: 'shadow-sm' }">
              <h2 class="font-semibold text-highlighted mb-4">Statutory Deductions</h2>
              <div class="space-y-3">
                <div v-for="item in deductions" :key="item.label" class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="size-2 rounded-full bg-error" />
                    <p class="text-sm text-highlighted">{{ item.label }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-error">{{ item.amount }}</p>
                    <p class="text-xs text-dimmed">{{ item.pct }}</p>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Individual Payslips -->
          <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
            <div class="flex items-center justify-between px-5 py-4 border-b border-default">
              <h2 class="font-semibold text-highlighted">Employee Payslips</h2>
              <UButton label="Export All" icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
            </div>
            <div class="overflow-x-auto">
              <UTable
                :data="payslips"
                :columns="payslipColumns"
                class="w-full text-sm"
                :ui="{
                  th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
                  td: 'px-4 py-3.5',
                  tr: 'hover:bg-muted/30 transition-colors'
                }"
              >
                <template #gross-header>
                  <div class="text-right w-full">Gross</div>
                </template>
                <template #net-header>
                  <div class="text-right w-full">Net</div>
                </template>

                <template #employee-cell="{ row }">
                  <div class="flex items-center gap-3">
                    <UAvatar :text="row.original.initials" size="sm" :color="row.original.color" />
                    <div>
                      <p class="font-medium text-highlighted">{{ row.original.name }}</p>
                      <p class="text-xs text-dimmed">{{ row.original.id }}</p>
                    </div>
                  </div>
                </template>
                <template #dept-cell="{ row }">
                  <span class="text-muted">{{ row.original.dept }}</span>
                </template>
                <template #gross-cell="{ row }">
                  <div class="text-right font-medium text-highlighted w-full">{{ row.original.gross }}</div>
                </template>
                <template #net-cell="{ row }">
                  <div class="text-right font-bold text-success w-full">{{ row.original.net }}</div>
                </template>
                <template #status-cell="{ row }">
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', row.original.status === 'Paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning']">
                    {{ row.original.status }}
                  </span>
                </template>
                <template #actions-cell>
                  <div class="text-right w-full">
                    <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
                  </div>
                </template>

                <template #empty>
                  <div class="py-16 flex flex-col items-center justify-center">
                    <UEmpty icon="i-lucide-file-text" title="No payslips" description="No payslips generated for this period." />
                  </div>
                </template>
              </UTable>
            </div>
          </UCard>
        </div>
      </template>

      <!-- Run Payroll Tab -->
      <template #run>
        <div class="pt-4 max-w-2xl">
          <!-- Steps -->
          <div class="flex items-center gap-3 mb-8">
            <div v-for="(step, i) in ['Verify', 'Adjust', 'Review', 'Done']" :key="step" class="flex items-center gap-2">
              <div :class="['size-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors', runStep > i + 1 ? 'bg-success text-white' : runStep === i + 1 ? 'bg-primary text-white' : 'bg-muted text-muted']">
                <UIcon v-if="runStep > i + 1" name="i-lucide-check" class="size-4" />
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span :class="['text-sm font-medium', runStep === i + 1 ? 'text-primary' : 'text-muted']">{{ step }}</span>
              <UIcon v-if="i < 3" name="i-lucide-chevron-right" class="size-4 text-dimmed" />
            </div>
          </div>

          <!-- Step 1: Verify -->
          <UCard v-if="runStep === 1" :ui="{ body: 'p-6' }">
            <h2 class="text-lg font-bold text-highlighted mb-4">Verify Payroll Data</h2>
            <div class="space-y-3 mb-6">
              <div v-for="check in [{ label: 'Employee records up to date', ok: true }, { label: 'Attendance data synchronized', ok: true }, { label: 'Leave balances verified', ok: true }, { label: 'Overtime approved', ok: false }]" :key="check.label" class="flex items-center gap-3">
                <UIcon :name="check.ok ? 'i-lucide-check-circle' : 'i-lucide-alert-circle'" :class="check.ok ? 'text-success size-5' : 'text-warning size-5'" />
                <span :class="['text-sm', check.ok ? 'text-highlighted' : 'text-warning']">{{ check.label }}</span>
                <span v-if="!check.ok" class="text-xs text-warning ml-auto">3 pending approvals</span>
              </div>
            </div>
            <UAlert
              icon="i-lucide-alert-circle"
              color="warning"
              variant="subtle"
              title="3 overtime requests need your approval before payroll can be finalized."
              class="mb-6"
            />
            <div class="flex justify-end">
              <UButton label="Continue Anyway" trailing-icon="i-lucide-arrow-right" @click="nextStep" />
            </div>
          </UCard>

          <!-- Step 2: Adjust -->
          <UCard v-else-if="runStep === 2" :ui="{ body: 'p-6' }">
            <h2 class="text-lg font-bold text-highlighted mb-4">Adjustments & Bonuses</h2>
            <div class="space-y-4 mb-6">
              <UFormField label="Pay Period">
                <USelect :items="['August 2026', 'September 2026']" class="w-full" />
              </UFormField>
              <UFormField label="Additional Bonus (optional)">
                <UInput type="number" placeholder="0.00" leading-icon="i-lucide-philippine-peso" class="w-full" />
              </UFormField>
              <UFormField label="Deduction Adjustment (optional)">
                <UInput type="number" placeholder="0.00" leading-icon="i-lucide-minus-circle" class="w-full" />
              </UFormField>
              <UFormField label="Notes">
                <UTextarea placeholder="Any notes for this payroll run…" class="w-full" />
              </UFormField>
            </div>
            <div class="flex justify-between">
              <UButton label="Back" color="neutral" variant="outline" @click="prevStep" />
              <UButton label="Continue" trailing-icon="i-lucide-arrow-right" @click="nextStep" />
            </div>
          </UCard>

          <!-- Step 3: Review -->
          <UCard v-else-if="runStep === 3" :ui="{ body: 'p-6' }">
            <h2 class="text-lg font-bold text-highlighted mb-4">Review & Confirm</h2>
            <div class="space-y-3 mb-6">
              <div class="flex justify-between py-2 border-b border-default">
                <span class="text-muted">Total Employees</span>
                <span class="font-semibold text-highlighted">342</span>
              </div>
              <div class="flex justify-between py-2 border-b border-default">
                <span class="text-muted">Gross Pay</span>
                <span class="font-semibold text-highlighted">₱345,200</span>
              </div>
              <div class="flex justify-between py-2 border-b border-default">
                <span class="text-muted">Deductions</span>
                <span class="font-semibold text-error">₱57,750</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-bold text-highlighted">Net Pay</span>
                <span class="font-bold text-success text-lg">₱287,450</span>
              </div>
            </div>
            <UAlert
              icon="i-lucide-shield-check"
              color="success"
              variant="subtle"
              title="All calculations verified. Payroll is ready to process."
              class="mb-6"
            />
            <div class="flex justify-between">
              <UButton label="Back" color="neutral" variant="outline" @click="prevStep" />
              <UButton label="Process Payroll" icon="i-lucide-play" :loading="runPayrollLoading" @click="processPayroll" />
            </div>
          </UCard>

          <!-- Step 4: Done -->
          <UCard v-else-if="runStep === 4" :ui="{ body: 'p-6 text-center' }">
            <div class="size-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-check-circle" class="size-8 text-success" />
            </div>
            <h2 class="text-xl font-bold text-highlighted mb-2">Payroll Processed!</h2>
            <p class="text-muted mb-6">₱287,450 has been disbursed to 342 employees for August 2026.</p>
            <div class="flex gap-3 justify-center">
              <UButton label="Download Report" icon="i-lucide-download" color="neutral" variant="outline" />
              <UButton label="View Payslips" @click="activeTab = 'overview'; runStep = 1" />
            </div>
          </UCard>
        </div>
      </template>

      <!-- History Tab -->
      <template #history>
        <div class="pt-4">
          <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
            <div class="overflow-x-auto">
              <UTable
                :data="history"
                :columns="historyColumns"
                class="w-full text-sm"
                :ui="{
                  th: 'text-left px-4 py-3.5 text-xs text-dimmed font-semibold uppercase tracking-wider',
                  td: 'px-4 py-4',
                  tr: 'hover:bg-muted/30 transition-colors'
                }"
              >
                <template #gross-header>
                  <div class="text-right w-full">Gross</div>
                </template>
                <template #net-header>
                  <div class="text-right w-full">Net Pay</div>
                </template>

                <template #month-cell="{ row }">
                  <span class="font-medium text-highlighted">{{ row.original.month }}</span>
                </template>
                <template #employees-cell="{ row }">
                  <span class="text-muted">{{ row.original.employees }}</span>
                </template>
                <template #gross-cell="{ row }">
                  <div class="text-right text-highlighted w-full">{{ row.original.gross }}</div>
                </template>
                <template #net-cell="{ row }">
                  <div class="text-right font-bold text-success w-full">{{ row.original.net }}</div>
                </template>
                <template #date-cell="{ row }">
                  <span class="text-muted text-xs">{{ row.original.date }}</span>
                </template>
                <template #status-cell="{ row }">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">{{ row.original.status }}</span>
                </template>
                <template #actions-cell>
                  <div class="text-right w-full">
                    <UButton icon="i-lucide-download" size="xs" color="neutral" variant="ghost" />
                  </div>
                </template>

                <template #empty>
                  <div class="py-16 flex flex-col items-center justify-center">
                    <UEmpty icon="i-lucide-history" title="No history" description="No previous payroll records found." />
                  </div>
                </template>
              </UTable>
            </div>
          </UCard>
        </div>
      </template>
    </UTabs>
  </div>
</template>
