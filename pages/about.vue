<template>
  <div class="pt-24 min-h-screen">
    <div class="container mx-auto px-6 py-12 text-center">
      <h1 class="text-6xl font-black mb-6">About <span class="text-primary">Me</span></h1>
      <p class="text-light/60 max-w-2xl mx-auto text-lg mb-8">A little more about who I am and what I do.</p>
      <a :href="settings.cv_link" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white font-medium rounded-full shadow-[0_10px_30px_-10px_rgba(5,150,105,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.7)] hover:-translate-y-1 transition-all duration-300 mx-auto">
        <iconify-icon icon="lucide:download" class="group-hover:translate-y-1 transition-transform" />
        <span>Download My CV</span>
      </a>
    </div>
    <SectionsAbout />
  </div>
</template>

<script setup>
const { settings } = useSiteSettings()
</script>
