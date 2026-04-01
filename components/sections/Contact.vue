<template>
  <section id="contact" class="py-24 bg-dark relative z-10 overflow-hidden">
    <div class="container mx-auto px-6 max-w-4xl relative z-10">
      <div class="text-center space-y-8 p-12 lg:p-20 rounded-[3rem] bg-gradient-to-b from-secondary/40 to-dark border border-light/5 shadow-[0_0_100px_rgba(5,150,105,0.05)] relative group overflow-hidden">
         <!-- Animated glow effect on hover -->
        <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl rounded-[3rem] pointer-events-none"></div>

        <span class="text-primary font-medium tracking-widest uppercase text-sm inline-block">Next Steps</span>
        <h2 class="text-5xl md:text-7xl font-black text-light tracking-tight mt-2 mb-6 text-balance">
          Let's build something <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative">
            amazing together.
             <!-- Squiggly line under text -->
             <svg class="absolute -bottom-4 left-0 w-full h-4 text-primary" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </span>
        </h2>
        
        <p class="text-light/50 max-w-xl mx-auto text-lg font-light leading-relaxed mb-10 pt-4">
          Got a project in mind, an idea to bounce around, or just want to say hi? I'm always open to chatting about new opportunities or collaborating on something fun.
        </p>
        
        <div class="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 relative z-20">
          <a :href="`mailto:${settings.email}`" class="group px-8 py-4 bg-primary text-white font-medium rounded-full flex items-center space-x-3 w-full sm:w-auto justify-center transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(5,150,105,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.7)] hover:-translate-y-1">
            <span>Send me an email</span>
             <iconify-icon icon="lucide:send" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <NuxtLink to="/contact" class="px-8 py-4 bg-transparent border border-light/20 text-light hover:bg-light/5 hover:border-light/50 font-medium rounded-full w-full sm:w-auto text-center transition-all duration-300">
            Contact Form
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"></div>
  </section>
</template>

<script setup>
const { settings } = useSiteSettings()
</script>
