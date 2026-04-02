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

        <!-- Visual Content (Real Photo) -->
        <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end">
           <div class="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden group border border-light/10 shadow-2xl">
              <!-- Animated Background behind image -->
              <div class="absolute inset-0 bg-dark z-0">
                <div class="absolute top-10 right-10 w-40 h-40 bg-primary/20 rounded-full mix-blend-screen filter blur-[40px] animate-blob"></div>
                <div class="absolute bottom-10 left-10 w-60 h-60 bg-accent/20 rounded-full mix-blend-screen filter blur-[60px] animate-blob animation-delay-2000"></div>
              </div>

              <!-- Real Photo -->
              <img src="/images/me.png" alt="Profile" class="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-110" />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-20 transition-opacity duration-700 group-hover:opacity-40"></div>

              <!-- Floating Info Badge on Image -->
              <div class="absolute bottom-6 left-6 right-6 z-30 transform transition-transform duration-700 group-hover:-translate-y-2">
                 <div class="p-6 rounded-2xl bg-dark/40 backdrop-blur-md border border-light/10 text-left">
                    <h3 class="text-xl font-bold text-light mb-1">Olaitan Michael Olanrewaju</h3>
                    <p class="text-primary text-xs font-bold uppercase tracking-widest leading-none">Full Stack Engineer</p>
                 </div>
              </div>
           </div>

           <!-- Floating decorative elements -->
           <div class="absolute -top-6 -left-6 lg:-left-12 w-24 h-24 bg-primary/10 rounded-full mix-blend-screen filter blur-xl animate-float"></div>
           <div class="absolute -bottom-6 -right-6 lg:-right-12 w-20 h-20 bg-accent/20 rounded-full mix-blend-screen filter blur-xl animate-float animation-delay-2000"></div>
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
