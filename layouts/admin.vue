<template>
  <div class="min-h-screen bg-[#050505] text-light flex font-sans relative overflow-hidden">
    
    <!-- Mobile Hamburger Header -->
    <div class="md:hidden fixed top-0 left-0 w-full h-16 border-b border-light/10 bg-dark/95 backdrop-blur z-40 flex items-center px-6 justify-between">
       <div class="font-black text-xl flex items-center space-x-2">
         <span class="text-primary tracking-tighter">Kodex</span>
         <span class="text-light/80">Admin</span>
       </div>
       <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-light p-2 hover:text-primary transition-colors">
         <iconify-icon :icon="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="text-2xl"></iconify-icon>
       </button>
    </div>

    <!-- Mobile Overlay -->
    <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"></div>

    <!-- Sidebar -->
    <aside 
      class="w-64 border-r border-light/10 p-6 flex flex-col bg-[#080808] shadow-2xl z-50 fixed md:sticky top-0 h-screen transform transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
       <div class="hidden md:flex font-black text-2xl mb-2 items-center space-x-2">
         <span class="text-primary tracking-tighter">Kodex</span>
         <span class="text-light/80">Admin</span>
       </div>
       <div class="hidden md:block text-xs text-light/40 uppercase tracking-widest font-bold mb-12 ml-1">Dashboard</div>

       <div class="md:hidden font-black text-xl mb-8 mt-2 flex items-center space-x-2">
         <span class="text-primary tracking-tighter">Navigation</span>
       </div>

       <nav class="space-y-2 flex-1 relative">
          <NuxtLink @click="mobileMenuOpen = false" to="/admin" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-light/60 hover:text-primary transition-all group" active-class="bg-primary/10 text-primary font-medium">
             <iconify-icon icon="lucide:layout-dashboard" class="text-lg opacity-70 group-hover:opacity-100"></iconify-icon>
             <span>Overview</span>
          </NuxtLink>
          <NuxtLink @click="mobileMenuOpen = false" to="/admin/projects" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-light/60 hover:text-primary transition-all group" active-class="bg-primary/10 text-primary font-medium">
             <iconify-icon icon="lucide:folder-git-2" class="text-lg opacity-70 group-hover:opacity-100"></iconify-icon>
             <span>Projects</span>
          </NuxtLink>
          <NuxtLink @click="mobileMenuOpen = false" to="/admin/skills" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-light/60 hover:text-primary transition-all group" active-class="bg-primary/10 text-primary font-medium">
             <iconify-icon icon="lucide:cpu" class="text-lg opacity-70 group-hover:opacity-100"></iconify-icon>
             <span>Stack & Tools</span>
          </NuxtLink>
          <NuxtLink @click="mobileMenuOpen = false" to="/admin/settings" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-light/60 hover:text-primary transition-all group" active-class="bg-primary/10 text-primary font-medium">
             <iconify-icon icon="lucide:settings" class="text-lg opacity-70 group-hover:opacity-100"></iconify-icon>
             <span>Settings</span>
          </NuxtLink>
       </nav>

       <div class="pt-6 border-t border-light/10 mt-auto">
         <button @click="logout" class="flex w-full items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-light/50 hover:text-red-400 transition-all font-medium">
           <iconify-icon icon="lucide:log-out"></iconify-icon>
           <span>Secure Logout</span>
         </button>
       </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 h-screen overflow-y-auto w-full pt-16 md:pt-0 bg-[#0a0a0a]">
       <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const logout = async () => {
  try {
    const supabase = useSupabase()
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Aggressive local storage wipe to guarantee it logs out even if API fails
    if (typeof window !== 'undefined' && window.localStorage) {
      Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith('sb-')) {
          window.localStorage.removeItem(key)
        }
      })
    }
    window.location.href = '/login'
  }
}
</script>
