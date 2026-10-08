<template>
  <MockupBrowserFrame url="library.ccci.io/circulation">
    <!-- Main content -->
    <main class="flex-1 bg-default flex flex-col">
      <!-- App Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-default">
        <div class="flex items-center gap-3">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-[12px]">C</span>
          </div>
          <span class="font-bold text-[14px] text-highlighted">Scan · Circulation</span>
        </div>
        <span class="text-[10px] text-muted tracking-widest uppercase">CCCI</span>
      </div>

      <div class="p-5 flex-1 flex flex-col gap-4">
        <!-- Barcode scan area -->
        <div class="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-6 py-5 flex flex-col items-center justify-center gap-2">
          <!-- Barcode SVG -->
          <svg viewBox="0 0 88 40" class="w-32 h-10" xmlns="http://www.w3.org/2000/svg">
            <g v-for="(bar, i) in barBars" :key="i">
              <rect :x="bar.x" y="0" :width="bar.w" height="40" class="fill-neutral-900 dark:fill-white" />
            </g>
          </svg>
          <p class="text-[11px] font-mono font-bold text-primary">3A567B · scanned</p>
        </div>

        <!-- Recent transactions -->
        <div class="flex flex-col gap-1.5">
          <div
            v-for="tx in transactions"
            :key="tx.id"
            class="flex items-center gap-3 rounded-lg border border-default px-3 py-2.5"
          >
            <div class="flex-1 min-w-0">
              <p class="text-[11px] font-semibold text-highlighted">{{ tx.book }} — {{ tx.student }}</p>
            </div>
            <span
              :class="['text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0', statusClass(tx.status)]"
            >
              {{ tx.status }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </MockupBrowserFrame>
</template>

<script setup lang="ts">
// Generate simple barcode bars
const barBars = (() => {
  const bars = [] as any[]
  const widths = [3,1,2,1,3,2,1,2,1,3,1,1,2,1,2,3,1,2,1,3,2,1,1,2,3,1,2,1,3,1,2]
  let x = 2
  widths.forEach((w, i) => {
    if (i % 2 === 0) bars.push({ x, w })
    x += w + 1
  })
  return bars
})()

const transactions = [
  { id: 1, book: 'Sapiens',    student: 'STU-204', status: 'Issued'   },
  { id: 2, book: 'Dune',       student: 'STU-118', status: 'Returned' },
  { id: 3, book: 'Algorithms', student: 'STU-076', status: 'Overdue'  },
]

function statusClass(status: string) {
  if (status === 'Issued')   return 'bg-info/10 text-info'
  if (status === 'Returned') return 'bg-success/10 text-success'
  if (status === 'Overdue')  return 'bg-error/10 text-error'
  return 'bg-muted text-muted'
}
</script>
