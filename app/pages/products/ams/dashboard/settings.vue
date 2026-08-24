<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-highlighted">Settings</h1>
        <p class="text-muted text-sm mt-1">Configure your AssetCore environment.</p>
      </div>
      <UButton icon="i-lucide-save" label="Save Changes" size="sm" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard :ui="{ root: 'shadow-sm', body: 'space-y-4 p-6' }">
        <h3 class="font-semibold text-highlighted mb-4">General Information</h3>
        <UFormField label="Company Name"><UInput value="TechFlow Solutions" /></UFormField>
        <UFormField label="Default Currency"><USelect :items="['PHP - Philippine Peso', 'USD - US Dollar', 'EUR - Euro']" model-value="PHP - Philippine Peso" /></UFormField>
        <UFormField label="Timezone"><USelect :items="['Asia/Manila (GMT+8)', 'UTC']" model-value="Asia/Manila (GMT+8)" /></UFormField>
      </UCard>
      
      <UCard :ui="{ root: 'shadow-sm', body: 'space-y-4 p-6' }">
        <h3 class="font-semibold text-highlighted mb-4">Asset Identification</h3>
        <UFormField label="Asset ID Prefix"><UInput value="AST-" /></UFormField>
        <UFormField label="Next Sequence Number"><UInput type="number" value="1051" /></UFormField>
        <div class="pt-4 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-highlighted">Auto-generate Asset IDs</p>
            <p class="text-xs text-muted">Automatically assign incremental IDs to new assets.</p>
          </div>
          <UToggle model-value="true" />
        </div>
      </UCard>
    </div>
  </div>
</template>
