<script setup lang="ts">
definePageMeta({
  layout: false, // Use no layout for a standalone login page
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const rememberMe = ref(false)

const toast = useToast()

const handleLogin = async () => {
  loading.value = true
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  
  toast.add({
    title: 'Login Successful',
    description: 'Welcome back to your HRIS dashboard.',
    color: 'success',
    icon: 'i-lucide-check-circle'
  })
}
</script>

<template>
  <div class="theme-hris min-h-screen bg-muted/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
    <div class="absolute top-0 right-0 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/3" />
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <!-- PeopleCore Logo -->
        <NuxtLink to="/products/hris" class="flex items-center gap-2.5 transition-transform hover:scale-105">
          <div class="size-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <UIcon name="i-lucide-users" class="size-7 text-white" />
          </div>
          <span class="font-bold text-3xl tracking-tight text-highlighted">
            People<span class="text-primary">Core</span>
          </span>
        </NuxtLink>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-[440px]">
      <UCard class="shadow-sm rounded-2xl" :ui="{ body: 'px-4 py-8 sm:p-10' }">
        <div class="mb-8">
          <h2 class="text-center text-3xl font-extrabold text-highlighted tracking-tight">
            Welcome back
          </h2>
          <p class="mt-2 text-center text-sm text-muted">
            Sign in to your HRIS dashboard
          </p>
        </div>
        <form class="space-y-6" @submit.prevent="handleLogin">
          <UFormField label="Email address" name="email">
            <UInput 
              v-model="email"
              type="email" 
              required 
              autocomplete="email"
              icon="i-lucide-mail"
              placeholder="you@company.com"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput 
              v-model="password"
              type="password" 
              required 
              autocomplete="current-password"
              icon="i-lucide-lock"
              placeholder="••••••••"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <div class="flex items-center justify-between mt-4">
            <UCheckbox v-model="rememberMe" label="Remember me" name="remember-me" color="primary" />
            
            <div class="text-sm">
              <NuxtLink to="#" class="font-medium text-primary hover:text-primary/80 transition-colors">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>

          <div class="pt-2">
            <UButton 
              type="submit" 
              block 
              color="primary" 
              size="xl"
              :loading="loading"
              class="font-semibold"
              to="/products/hris/dashboard"
            >
              Sign in
            </UButton>
          </div>
        </form>

        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-default" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-default px-4 text-muted text-xs font-medium uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <UButton 
              color="neutral" 
              variant="outline" 
              block 
              icon="i-simple-icons-microsoft" 
              label="Microsoft" 
              size="lg" 
            />
            <UButton 
              color="neutral" 
              variant="outline" 
              block 
              icon="i-simple-icons-google" 
              label="Google" 
              size="lg" 
            />
          </div>
        </div>
      </UCard>
      
      <p class="mt-8 text-center text-sm text-dimmed">
        Don't have an account? 
        <NuxtLink to="/products/hris" class="font-medium text-primary hover:text-primary/80 transition-colors ml-1">
          Contact Sales
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
