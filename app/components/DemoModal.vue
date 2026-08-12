<script setup lang="ts">
const { isOpen, close } = useDemoModal()

const form = ref({
  name: '',
  email: '',
  company: '',
  product: 'all',
})

const loading = ref(false)
const toast = useToast()

async function onSubmit() {
  loading.value = true
  
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  loading.value = false
  close()
  
  toast.add({ 
    title: 'Request Sent Successfully', 
    description: 'Our team will contact you within 24 hours to schedule your demo.', 
    color: 'success',
    icon: 'i-lucide-check-circle'
  })
}
</script>

<template>
  <UModal v-model:open="isOpen" title="Book a Free Demo" :ui="{ title: 'text-lg' }">
    <template #body>
      <div class="mb-4 text-muted">Fill out the form below and our team will get back to you within 24 hours to schedule a demo.</div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <UFormField label="Full Name" name="name">
          <UInput v-model="form.name" required placeholder="Juan Dela Cruz" class="w-full" />
        </UFormField>
        
        <UFormField label="Email Address" name="email">
          <UInput v-model="form.email" type="email" required placeholder="juan@company.com" class="w-full" />
        </UFormField>

        <UFormField label="Company" name="company">
          <UInput v-model="form.company" required placeholder="ACME Corp" class="w-full" />
        </UFormField>

        <UFormField label="Interested In" name="product">
          <USelect
            v-model="form.product"
            :items="[
              { label: 'All Products (HRIS, LMS, CMS)', value: 'all' },
              { label: 'HRIS only', value: 'hris' },
              { label: 'LMS only', value: 'lms' },
              { label: 'CMS only', value: 'cms' }
            ]"
            class="w-full"
          />
        </UFormField>
        
        <div class="flex justify-end gap-3 mt-6">
          <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
          <UButton type="submit" color="primary" :loading="loading">Request Demo</UButton>
        </div>
      </form>
    </template>
  </UModal>
</template>
