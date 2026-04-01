<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const { fetchSettings } = useSiteSettings()
  fetchSettings()
})
</script>
