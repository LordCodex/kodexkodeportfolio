<template>
  <div class="min-h-screen bg-dark text-light font-sans selection:bg-primary selection:text-white flex flex-col">
    <UiHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <UiFooter />
    
    <div ref="cursor" class="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out hidden md:block" style="transform: translate(-50%, -50%);"></div>
    <div ref="cursorDot" class="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-50 hidden md:block" style="transform: translate(-50%, -50%);"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import Lenis from 'lenis';

const cursor = ref(null);
const cursorDot = ref(null);

onMounted(() => {
  // Custom Cursor
  const onMouseMove = (e) => {
    if(!cursor.value || !cursorDot.value) return;
    
    gsap.to(cursor.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out'
    });
    
    gsap.to(cursorDot.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.05,
      ease: 'power2.out'
    });
  };

  const onMouseEnterInteractive = () => {
    if(!cursor.value) return;
    gsap.to(cursor.value, {
      scale: 1.5,
      backgroundColor: 'rgba(5, 150, 105, 0.2)',
      duration: 0.3
    });
  };

  const onMouseLeaveInteractive = () => {
    if(!cursor.value) return;
    gsap.to(cursor.value, {
      scale: 1,
      backgroundColor: 'transparent',
      duration: 0.3
    });
  };

  document.addEventListener('mousemove', onMouseMove);
  
  // Attach hover effects to interactive elements
  const interactivElements = document.querySelectorAll('a, button, input, textarea');
  interactivElements.forEach(el => {
    el.addEventListener('mouseenter', onMouseEnterInteractive);
    el.addEventListener('mouseleave', onMouseLeaveInteractive);
  });

  // Smooth Scrolling with Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical', 
    gestureDirection: 'vertical', 
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    interactivElements.forEach(el => {
      el.removeEventListener('mouseenter', onMouseEnterInteractive);
      el.removeEventListener('mouseleave', onMouseLeaveInteractive);
    });
    lenis.destroy();
  });
});
</script>
