<template>
  <section class="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
    <!-- Abstract Background Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        ref="blob1"
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob"
      ></div>
      <div 
        ref="blob2"
        class="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"
      ></div>
       <div 
        ref="blob3"
        class="absolute -bottom-32 left-1/3 w-80 h-80 bg-primary/10 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000"
      ></div>
      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50 mask-image-linear-gradient"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-5xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
        <!-- Badge -->
        <div ref="badge" class="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-light/5 border border-light/10 mb-8 backdrop-blur-sm">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span class="text-xs font-medium tracking-wide text-light/80 uppercase">Available for new opportunities</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-balance mb-6 uppercase">
          <span class="block overflow-hidden"><span ref="title1" class="block">Building</span></span>
          <span class="block overflow-hidden"><span ref="title2" class="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Amazing &</span></span>
          <span class="block overflow-hidden"><span ref="title3" class="block">Meaningful</span></span>
          <span class="block overflow-hidden"><span ref="title4" class="block">Digital <span class="text-light/50 italic font-serif lowercase">Experiences</span></span></span>
        </h1>

        <!-- Subheading -->
        <p ref="subtitle" class="text-lg md:text-xl text-light/80 max-w-2xl font-light leading-relaxed mb-10">
          I'm a software engineer who loves building clean web apps, solid backends, and genuinely great mobile experiences.
        </p>

        <!-- CTA Buttons -->
        <div ref="ctas" class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <NuxtLink to="/projects" class="group relative px-6 py-4 bg-primary text-white font-medium rounded-full overflow-hidden w-full sm:w-auto text-center text-sm md:text-base">
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span class="relative flex items-center justify-center space-x-2">
              <span>View Projects</span>
              <iconify-icon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform" />
            </span>
          </NuxtLink>
           <NuxtLink to="/contact" class="group relative px-6 py-4 bg-transparent border border-light/20 text-light hover:border-primary/50 hover:bg-primary/5 font-medium rounded-full transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-sm text-sm md:text-base">
            <span>Get in Touch</span>
          </NuxtLink>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity animate-bounce hidden md:flex">
          <span class="text-xs uppercase tracking-widest rotate-90 origin-left ml-4 mb-4">Scroll</span>
          <div class="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const badge = ref(null);
const title1 = ref(null);
const title2 = ref(null);
const title3 = ref(null);
const title4 = ref(null);
const subtitle = ref(null);
const ctas = ref(null);

const blob1 = ref(null);
const blob2 = ref(null);
const blob3 = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo(badge.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    .fromTo([title1.value, title2.value, title3.value, title4.value], 
      { y: '100%' },
      { y: 0, duration: 1.2, stagger: 0.15 }, "-=0.6")
    .fromTo(subtitle.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
    .fromTo(ctas.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

  // Subtle blob animation
  gsap.to(blob1.value, {
    y: 'random(-50, 50)',
    x: 'random(-50, 50)',
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to(blob2.value, {
    y: 'random(-50, 50)',
    x: 'random(-50, 50)',
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
  });
   gsap.to(blob3.value, {
    y: 'random(-50, 50)',
    x: 'random(-50, 50)',
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 2
  });
});
</script>

<style scoped>
.mask-image-linear-gradient {
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}
</style>
