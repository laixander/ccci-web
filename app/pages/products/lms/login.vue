<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: false,
})

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: '',
  password: ''
})

const loading = ref(false)
const rememberMe = ref(false)

const toast = useToast()

const handleLogin = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false

  if (state.username === 'admin' && state.password === 'password') {
    toast.add({
      title: 'Login Successful',
      description: 'Welcome back to your LearnCore dashboard.',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    navigateTo('/products/lms/dashboard')
  } else {
    toast.add({
      title: 'Login Failed',
      description: 'Invalid credentials. Try admin / password.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  }
}
</script>

<template>
  <div class="theme-lms min-h-screen bg-muted/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
    <div class="absolute top-0 right-0 -z-10 size-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/3" />
    <div class="absolute bottom-0 left-0 -z-10 size-[400px] rounded-full bg-primary/5 blur-3xl translate-y-1/2 -translate-x-1/3" />

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <!-- LearnCore Logo -->
        <NuxtLink to="/products/lms" class="flex items-center gap-2.5 transition-transform hover:scale-105">
          <div class="size-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <UIcon name="i-lucide-book-open" class="size-7 text-white" />
          </div>
          <span class="font-bold text-3xl tracking-tight text-highlighted">
            Learn<span class="text-primary">Core</span>
          </span>
        </NuxtLink>
      </div>
      <p class="mt-4 text-center text-sm text-muted">Your complete learning management platform</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-[440px]">
      <UCard class="shadow-sm rounded-2xl" :ui="{ body: 'px-4 py-8 sm:p-10' }">
        <div class="mb-8">
          <h2 class="text-center text-3xl font-extrabold text-highlighted tracking-tight">
            Welcome back
          </h2>
          <p class="mt-2 text-center text-sm text-muted">
            Sign in to your LearnCore dashboard
          </p>
        </div>
        <UForm :schema="schema" :state="state" class="space-y-6" @submit="handleLogin">
          <UFormField label="Username" name="username">
            <UInput
              v-model="state.username"
              type="text"
              required
              autocomplete="username"
              icon="i-lucide-user"
              placeholder="username"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
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

          <!-- Demo hint -->
          <div class="relative overflow-hidden rounded-lg bg-primary/5 border border-primary/10 px-4 py-3 text-xs text-muted">
            <span class="font-semibold text-highlighted">Demo credentials:</span><br>
            username: <code class="text-primary font-mono">admin</code> &nbsp;•&nbsp;
            password: <code class="text-primary font-mono">password</code>
            <div class="absolute right-2 -bottom-3">
              <UIcon name="i-lucide-lock-open" class="size-14 text-primary opacity-10" />
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
            >
              Sign in
            </UButton>
          </div>
        </UForm>

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
        <NuxtLink to="/products/lms" class="font-medium text-primary hover:text-primary/80 transition-colors ml-1">
          Contact Sales
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
