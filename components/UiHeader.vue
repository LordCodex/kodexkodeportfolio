<template>
  <header class="fixed top-0 left-0 w-full z-40 bg-dark/80 backdrop-blur-md border-b border-light/10 transition-all duration-300">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center space-x-2">
        <span class="text-2xl font-bold tracking-tighter text-light group-hover:text-primary transition-colors">
          Kodex<span class="text-primary group-hover:text-light transition-colors">Kodes</span>
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink v-for="link in links" :key="link.name" :to="link.path" class="text-sm font-medium text-light/70 hover:text-primary transition-colors hover:animate-pulse">
          {{ link.name }}
        </NuxtLink>
        <NuxtLink to="/contact" class="px-6 py-2 bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(5,150,105,0.6)]">
          Let's Talk
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-light hover:text-primary transition-colors focus:outline-none">
        <iconify-icon v-if="!isMobileMenuOpen" icon="lucide:menu" class="text-2xl"></iconify-icon>
        <iconify-icon v-else icon="lucide:x" class="text-2xl"></iconify-icon>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-light/10 py-4 px-6 flex flex-col space-y-4 shadow-lg origin-top animate-fade-in-down">
      <NuxtLink v-for="link in links" :key="link.name" :to="link.path" class="text-lg font-medium text-light/80 hover:text-primary transition-colors" @click="isMobileMenuOpen = false">
        {{ link.name }}
      </NuxtLink>
      <NuxtLink to="/contact" class="px-6 py-3 bg-primary text-white text-center rounded-lg font-medium tracking-wide shadow-md active:scale-95 transition-transform" @click="isMobileMenuOpen = false">
        Let's Talk
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
];
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}
</style>
