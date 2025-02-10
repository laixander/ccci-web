<template>
    <CLoginSimple
        :logo="'/logo.png'"
        title="Welcome Back!"
        subtitle="Please login to continue"
        :loading="isLoading"
        :enableOAuth="true"
        v-model="credentials"
        @login="handleLogin"
        @recover="handleRecover"
        :showBg="false"
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