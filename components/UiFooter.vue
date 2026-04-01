<template>
  <footer class="bg-secondary/20 border-t border-light/5 py-12">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand Info -->
        <div class="col-span-1 md:col-span-2 space-y-4">
          <NuxtLink to="/" class="group flex items-center space-x-2">
            <span class="text-3xl font-bold tracking-tighter text-light group-hover:text-primary transition-colors">
              Kodex<span class="text-primary group-hover:text-light transition-colors">Kodes</span>
            </span>
          </NuxtLink>
          <p class="text-light/60 text-sm max-w-sm font-light leading-relaxed">
            Crafting digital experiences with purpose. Specializing in modern web applications, interactive designs, and meaningful code.
          </p>
          <div class="flex space-x-4 pt-2">
            <a :href="settings.twitter_url || 'https://twitter.com/lanre_olat'" target="_blank" rel="noopener noreferrer" class="text-light/50 hover:text-primary transition-colors text-xl" aria-label="Twitter">
              <iconify-icon icon="lucide:twitter" />
            </a>
            <a :href="settings.linkedin_url || 'https://www.linkedin.com/in/lanreolat'" target="_blank" rel="noopener noreferrer" class="text-light/50 hover:text-primary transition-colors text-xl" aria-label="LinkedIn">
              <iconify-icon icon="lucide:linkedin" />
            </a>
            <a :href="settings.instagram_url || 'https://www.instagram.com/lanre_olat/'" target="_blank" rel="noopener noreferrer" class="text-light/50 hover:text-primary transition-colors text-xl" aria-label="Instagram">
              <iconify-icon icon="lucide:instagram" />
            </a>
            <a :href="settings.facebook_url || 'https://web.facebook.com/michaeloreoluwa5'" target="_blank" rel="noopener noreferrer" class="text-light/50 hover:text-primary transition-colors text-xl" aria-label="Facebook">
              <iconify-icon icon="lucide:facebook" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-span-1 space-y-4">
          <h3 class="text-light font-semibold uppercase tracking-wider text-xs">Explore</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-light/60 hover:text-primary text-sm transition-colors relative group inline-block">Home<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span></NuxtLink></li>
            <li><NuxtLink to="/about" class="text-light/60 hover:text-primary text-sm transition-colors relative group inline-block">About<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span></NuxtLink></li>
            <li><NuxtLink to="/projects" class="text-light/60 hover:text-primary text-sm transition-colors relative group inline-block">Projects<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span></NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-light/60 hover:text-primary text-sm transition-colors relative group inline-block">Contact<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span></NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-span-1 space-y-4">
          <h3 class="text-light font-semibold uppercase tracking-wider text-xs">Say Hello</h3>
           <ul class="space-y-3">
            <li>
               <a :href="`mailto:${settings.email}`" class="text-light/60 hover:text-primary text-sm transition-colors flex items-center space-x-2 group">
                 <iconify-icon icon="lucide:mail" class="text-primary group-hover:scale-110 transition-transform"/>
                 <span class="break-all">{{ settings.email }}</span>
               </a>
            </li>
             <li>
               <span class="text-light/60 text-sm flex items-center space-x-2">
                 <iconify-icon icon="lucide:map-pin" class="text-primary"/>
                 <span>Lagos, Nigeria</span>
               </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-light/5 flex flex-col items-center justify-between text-xs text-light/60 space-y-4 md:flex-row md:space-y-0">
        <p>&copy; {{ new Date().getFullYear() }} KodexKodes. All rights reserved.</p>
        <p class="flex items-center space-x-1">
          <span>Designed with</span>
          <iconify-icon icon="lucide:heart" class="text-primary animate-pulse" />
          <span>by KodexKodes</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { settings } = useSiteSettings()
</script>
