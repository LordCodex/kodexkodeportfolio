<template>
  <section id="projects" class="py-24 bg-dark relative z-10">
    <div class="container mx-auto px-6 max-w-7xl">
      <!-- Section Header -->
      <div class="flex flex-col items-center mb-16 space-y-4">
        <span class="text-primary font-medium tracking-widest uppercase text-sm border border-primary/20 px-4 py-1 rounded-full bg-primary/5">Selected Work</span>
        <h2 class="text-4xl md:text-5xl font-black text-light tracking-tight text-center">
          Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
        </h2>
        <p class="text-light/50 max-w-2xl text-center font-light">
          A collection of digital products and web applications I've built, focusing on performance, aesthetics, and user experience.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-card group relative bg-secondary/30 rounded-2xl overflow-hidden border border-light/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(5,150,105,0.3)] flex flex-col h-full"
        >
          <!-- Project Image (Image or Gradient Fallback) -->
          <div class="relative w-full h-56 overflow-hidden" :class="!project.image_url ? ['bg-gradient-to-br', project.gradient] : 'bg-secondary/30'">
            <img 
              v-if="project.image_url" 
              :src="project.image_url" 
              :alt="project.title" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div v-if="!project.image_url" class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            <!-- Overlay Content on Hover -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-dark/40">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="px-6 py-2 bg-primary text-white rounded-full font-medium flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" :aria-label="'Visit ' + project.title + ' website'">
                <span>Visit Site</span>
                <iconify-icon icon="lucide:external-link" class="text-sm border border-transparent"/>
              </a>
            </div>
          </div>

          <!-- Project Details -->
          <div class="p-6 flex-grow flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-bold text-light group-hover:text-primary transition-colors">{{ project.title }}</h3>
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="text-light/60 hover:text-primary transition-colors" :aria-label="'View ' + project.title + ' website'">
                <iconify-icon icon="lucide:arrow-up-right" class="text-xl" />
              </a>
            </div>
            
            <p class="text-light/60 text-sm mb-6 flex-grow line-clamp-3 font-light">
              {{ project.description }}
            </p>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-for="tag in project.tags" :key="tag" class="text-xs px-3 py-1 bg-light/5 text-light/70 rounded-md border border-light/10">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All CTA -->
       <div class="mt-20 text-center">
        <NuxtLink to="/projects" class="inline-flex items-center space-x-2 text-light hover:text-primary transition-colors group">
          <span class="text-lg font-medium border-b border-primary/30 group-hover:border-primary pb-1">View All Projects</span>
          <iconify-icon icon="lucide:arrow-right" class="group-hover:translate-x-2 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = ref([])

onMounted(async () => {
  if (typeof window !== 'undefined') {
    // Fetch from Supabase
    try {
      const supabase = useSupabase()
      const { data, error } = await supabase.from('projects')
        .select('*')
        .eq('is_enabled', true)
        .order('sort_order', { ascending: true })
      if (!error && data) {
        projects.value = data
      }
    } catch(err) {
      console.error(err)
    }

    // Give Vue time to render the fetched projects before animating
    setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card, {
          y: 50,
          opacity: 0,
        }, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 3) * 0.1
        });
      });
    }, 100)
  }
});
</script>
