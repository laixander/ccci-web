<template>
    <CLoginCenter
        :logo="'/logo.png'"
        title="Welcome Back!"
        subtitle="Please login to continue"
        :loading="isLoading"
        :enableOAuth="true"
        v-model="credentials"
        @login="handleLogin"
        @recover="handleRecover"
        :bgImage="'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b'"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const credentials = ref({ username: '', password: '' })

const handleLogin = () => {
    isLoading.value = true
    console.log('Logging in with:', credentials.value)
    setTimeout(() => {
        isLoading.value = false
        alert('Login successful!')
    }, 2000)
}

const handleRecover = () => {
    alert('Recover password clicked')
}

definePageMeta({
    layout: 'clean'
})
</script>