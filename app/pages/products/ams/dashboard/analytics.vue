<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Analytics</h1>
        <p class="text-muted text-sm mt-1">Asset utilization and overall value metrics.</p>
      </div>
      <UButton icon="i-lucide-download" label="Export Report" size="sm" />
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UCard :ui="{ root: 'shadow-sm', body: 'p-6' }">
        <h3 class="font-semibold text-highlighted mb-6">Asset Value by Category</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1"><span class="text-muted">Hardware</span><span class="font-medium text-highlighted">₱4.2M</span></div>
            <div class="h-2 w-full bg-muted/30 rounded-full overflow-hidden"><div class="h-full bg-primary w-[45%]"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1"><span class="text-muted">Vehicles</span><span class="font-medium text-highlighted">₱3.5M</span></div>
            <div class="h-2 w-full bg-muted/30 rounded-full overflow-hidden"><div class="h-full bg-info w-[35%]"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1"><span class="text-muted">Furniture</span><span class="font-medium text-highlighted">₱1.2M</span></div>
            <div class="h-2 w-full bg-muted/30 rounded-full overflow-hidden"><div class="h-full bg-success w-[15%]"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1"><span class="text-muted">Software</span><span class="font-medium text-highlighted">₱0.4M</span></div>
            <div class="h-2 w-full bg-muted/30 rounded-full overflow-hidden"><div class="h-full bg-warning w-[5%]"></div></div>
          </div>
        </div>
      </UCard>
      
      <UCard :ui="{ root: 'shadow-sm', body: 'p-6' }">
        <h3 class="font-semibold text-highlighted mb-6">Asset Lifecycle Status</h3>
        <div class="flex items-center justify-center h-48 relative">
          <div class="size-40 rounded-full border-[12px] border-primary/20 border-t-primary border-r-primary"></div>
          <div class="absolute flex flex-col items-center">
            <span class="text-2xl font-bold text-highlighted">85%</span>
            <span class="text-xs text-muted">Healthy</span>
          </div>
        </div>
        <div class="flex justify-center gap-6 mt-4 text-sm">
          <div class="flex items-center gap-2"><span class="size-3 rounded-full bg-primary"></span><span class="text-muted">Healthy</span></div>
          <div class="flex items-center gap-2"><span class="size-3 rounded-full bg-warning"></span><span class="text-muted">Aging</span></div>
          <div class="flex items-center gap-2"><span class="size-3 rounded-full bg-error"></span><span class="text-muted">End of Life</span></div>
        </div>
      </UCard>
    </div>
  </div>
</template>
