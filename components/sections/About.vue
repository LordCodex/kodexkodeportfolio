<template>
  <section id="about" class="py-24 relative overflow-hidden bg-secondary/5">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Text Content -->
        <div class="space-y-8 order-2 lg:order-1">
           <div>
            <span class="text-primary font-medium tracking-widest uppercase text-sm border border-primary/20 px-4 py-1 rounded-full bg-primary/5 inline-block mb-4">About Me</span>
            <h2 class="text-4xl md:text-5xl font-black text-light tracking-tight">
              Crafting Digital <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Masterpieces</span>
            </h2>
          </div>

          <p class="text-light/80 text-lg font-light leading-relaxed">
            I'm a full-stack developer who genuinely enjoys turning complex problems into simple, functional software. Over the years, I've built everything from heavy backend logic to clean, interactive mobile screens. For me, good code is all about solving real problems instead of over-engineering the little things.
          </p>
          
          <p class="text-light/60 font-light leading-relaxed mb-6">
            I like to keep things practical by focusing on the user, while making sure everything runs smoothly behind the scenes. Whether I'm designing an API or tweaking a UI component, I care about those tiny details that bring an app to life.
          </p>
          
          <a :href="settings.cv_link" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center space-x-2 px-8 py-3 bg-transparent border border-light/20 text-light hover:border-primary/50 hover:bg-primary/5 font-medium rounded-full transition-all duration-300">
            <span>Download My CV</span>
            <iconify-icon icon="lucide:download" class="group-hover:translate-y-1 transition-transform" />
          </a>

          <div class="pt-6">
            <h3 class="text-xl font-bold text-light mb-6">Core Stack & Tools</h3>
            <div class="flex flex-wrap gap-3">
              <span v-for="skill in skills" :key="skill.name" class="flex items-center space-x-2 px-4 py-2 bg-dark rounded-lg border border-light/5 text-sm  hover:border-primary/50 hover:text-primary transition-all cursor-default">
                 <iconify-icon :icon="skill.icon" class="text-lg" />
                 <span>{{ skill.name }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Visual / Graphic Content -->
        <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end">
           <div class="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden group">
              <!-- Decorative abstract background instead of an image -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/80 mix-blend-multiply z-10 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              <div class="absolute inset-0 bg-dark z-0">
                <!-- Inner animated blobs for visual interest -->
                 <div class="absolute top-10 right-10 w-40 h-40 bg-primary/40 rounded-full mix-blend-screen filter blur-[40px] animate-blob"></div>
                 <div class="absolute bottom-10 left-10 w-60 h-60 bg-accent/40 rounded-full mix-blend-screen filter blur-[60px] animate-blob animation-delay-2000"></div>
                 
                 <!-- Tech Pattern overlay -->
                 <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
              </div>

               <div class="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center border border-light/10 rounded-3xl backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-700">
                  <div class="w-24 h-24 rounded-full border-2 border-primary/50 mb-6 flex items-center justify-center bg-dark/50 overflow-hidden relative">
                    <iconify-icon icon="lucide:code-2" class="text-4xl text-primary animate-pulse" />
                     <!-- A spinning border effect -->
                    <div class="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                  </div>
                  <h3 class="text-2xl font-bold text-light mb-2 group-hover:text-primary transition-colors">KodexKodes</h3>
                  <p class="text-light/60 text-sm font-light uppercase tracking-widest">Creative Engineer</p>
               </div>
           </div>

           <!-- Floating decorative elements -->
           <div class="absolute top-1/4 -left-12 lg:-left-24 w-24 h-24 bg-primary/10 rounded-full mix-blend-screen filter blur-xl animate-float"></div>
           <div class="absolute bottom-1/4 -right-8 w-16 h-16 bg-accent/20 border border-primary/20 rounded-full filter blur-sm animate-float animation-delay-4000"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { settings } = useSiteSettings()
const skills = ref([])

onMounted(async () => {
  try {
    const supabase = useSupabase()
    const { data, error } = await supabase.from('skills')
      .select('*')
      .eq('is_enabled', true)
      .order('sort_order', { ascending: true })
    if (!error && data) {
      skills.value = data
    }
  } catch(err) {
    console.error(err)
  }
})
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}
</style>
