<template>
    <CLoginContinue
        :logo="'/logo.png'"
        title="Welcome Back!"
        subtitle="We're excited to see you again. In order to access your dedicated page, please continue by navigating to the login page."
        :loading="isLoading"
        @login="handleLogin"
    />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'clean'
})

import { ref } from 'vue'

const isLoading = ref(false)

const handleLogin = () => {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        alert('Login successful!')
    }, 2000)
}
</script>