<template>
    <CLoginSplit
        :logo="'/logo.png'" 
        title="Welcome Back!"
        subtitle="Please login to continue" 
        position="right"
        styleType="diagonal"
        :bgImage="'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b'" 
        :loading="isLoading"
        :enableOAuth="true" 
        v-model="credentials" 
        @login="handleLogin" 
        @recover="handleRecover" 
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'  // Import router

const router = useRouter()
const isLoading = ref(false)
const credentials = ref({ username: '', password: '' })

const handleLogin = () => {
    isLoading.value = true
    console.log('Logging in with:', credentials.value)
    
    setTimeout(() => {
        isLoading.value = false
        alert('Login successful!')

        // Redirect to the dashboard after the alert
        router.push('/portal')
    }, 2000)
}

const handleRecover = () => {
    alert('Recover password clicked')
}

definePageMeta({
    layout: 'centered'
})
</script>

<!-- <script setup lang="ts">
  definePageMeta({
    layout: 'layout',
    hasHeader: true,
    hasSidebar: true,
    hasFooter: true,
  })
  </script> -->