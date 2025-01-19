<template>
    <CPageWizard title="Wizard" :breadcrumbs="breadcrumbs" :forms="forms"></CPageWizard>
</template>
  
  
  <script setup lang="ts">
    const breadcrumbs = 
    [{
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    }, {
      label: 'Navigation',
      icon: 'i-heroicons-square-3-stack-3d',
      to: '/'
    }, {
      label: 'Breadcrumb',
      icon: 'i-heroicons-link'
    }]
  
    const state = {
      username: '',
      password: '',
      firstName:'',
      lastName:'',
      email:''
    }
  
    const items = [
      {key:'firstName', type: 'text', required: true , label: 'First Name', help: 'Enter your first name'},
      {key:'lastName', type: 'text', required: true, label: 'Last Name',help: 'Enter your last name' },
      {key:'email', type: 'text', required: true , label: 'Email Address', help: 'Enter your email address'},
      {key:'password', type: 'password', required: true, label: 'Password',help: 'Enter your password' },
      {key:'username', type: 'text', required: true , label: 'Username', help: 'Enter your username'},
  
      {key:'firstName', type: 'text', required: true , label: 'First Name', help: 'Enter your first name'},
      {key:'lastName', type: 'text', required: true, label: 'Last Name',help: 'Enter your last name' },
      {key:'email', type: 'text', required: true , label: 'Email Address', help: 'Enter your email address'},
      {key:'password', type: 'password', required: true, label: 'Password',help: 'Enter your password' },
      {key:'username', type: 'text', required: true , label: 'Username', help: 'Enter your username'},
  
      {key:'firstName', type: 'text', required: true , label: 'First Name', help: 'Enter your first name'},
      {key:'lastName', type: 'text', required: true, label: 'Last Name',help: 'Enter your last name' },
      {key:'email', type: 'text', required: true , label: 'Email Address', help: 'Enter your email address'},
      {key:'password', type: 'password', required: true, label: 'Password',help: 'Enter your password' },
      {key:'username', type: 'text', required: true , label: 'Username', help: 'Enter your username'},
  
      ]
  
  
  
  const forms = [
    {title: 'Step 1', description: 'This is the first step of the application process. You will need to enter a username', items, state, columns:1},
    {title: 'Step 2', description: 'This is the second step of the application process. You will need to enter a password', items, state, columns:2},
    {title: 'Step 3', description: 'This is the third step of the application process. You will need to enter your personal details', items, state, columns:3}
  ]
  </script>
  
  
  