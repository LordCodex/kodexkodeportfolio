<template>
  <div class="p-10 space-y-10">
    <header>
      <h1 class="text-4xl font-black text-light tracking-tight mb-2">Welcome Back</h1>
      <p class="text-light/50 font-light text-lg">Manage your portfolio's content, skills, and site settings directly.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-dark/50 p-8 rounded-2xl border border-light/5 hover:border-primary/30 transition-all flex flex-col justify-between group">
        <div>
          <iconify-icon icon="lucide:folder-git-2" class="text-3xl text-primary mb-6 group-hover:scale-110 transition-transform"></iconify-icon>
          <h2 class="text-2xl font-bold text-light mb-2">Projects</h2>
          <p class="text-light/50 font-light text-sm">Add, remove, list, or meticulously reorder your magnificent featured work.</p>
        </div>
        <NuxtLink to="/admin/projects" class="mt-8 text-primary font-medium flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
          <span>Manage Projects</span>
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </NuxtLink>
      </div>

      <div class="bg-dark/50 p-8 rounded-2xl border border-light/5 hover:border-accent/30 transition-all flex flex-col justify-between group">
        <div>
           <iconify-icon icon="lucide:cpu" class="text-3xl text-accent mb-6 group-hover:scale-110 transition-transform"></iconify-icon>
          <h2 class="text-2xl font-bold text-light mb-2">Skills & Tools</h2>
          <p class="text-light/50 font-light text-sm">Toggle visibility or update your constantly evolving core development stack.</p>
        </div>
        <NuxtLink to="/admin/skills" class="mt-8 text-accent font-medium flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
          <span>Manage Skills</span>
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </NuxtLink>
      </div>

       <div class="bg-dark/50 p-8 rounded-2xl border border-light/5 hover:border-emerald-400/30 transition-all flex flex-col justify-between group">
        <div>
           <iconify-icon icon="lucide:settings" class="text-3xl text-emerald-400 mb-6 group-hover:scale-110 transition-transform"></iconify-icon>
          <h2 class="text-2xl font-bold text-light mb-2">Settings</h2>
          <p class="text-light/50 font-light text-sm">Quickly update contact options, emails, phone numbers or the main CV link.</p>
        </div>
        <NuxtLink to="/admin/settings" class="mt-8 text-emerald-400 font-medium flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
          <span>Update Settings</span>
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({
  title: 'Admin Dashboard | KodexKodes',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
