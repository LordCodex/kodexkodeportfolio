<template>
  <div class="min-h-screen bg-dark flex flex-col justify-center items-center px-6">
    <div class="w-full max-w-md bg-secondary/30 p-8 sm:p-12 rounded-3xl border border-light/5 shadow-2xl relative">
      <div class="absolute inset-0 bg-primary/5 opacity-50 blur-xl pointer-events-none rounded-3xl"></div>
      
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-light mb-2 text-center">Admin <span class="text-primary">Login</span></h1>
        <p class="text-light/50 text-center mb-8 font-light text-sm">Secure access to KodexKodes dashboard</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-light/80 ml-2">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              required
              class="w-full px-5 py-3 bg-dark/50 border border-light/10 text-light rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              placeholder="joe@gmail.com"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-light/80 ml-2">Password</label>
            <input 
              v-model="password" 
              type="password" 
              required
              class="w-full px-5 py-3 bg-dark/50 border border-light/10 text-light rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <div v-if="config.public.hcaptchaSiteKey" class="flex justify-center scale-90 sm:scale-100 py-2">
             <vue-hcaptcha 
               :sitekey="config.public.hcaptchaSiteKey" 
               theme="dark"
               @verify="onVerify"
               @expired="onExpired"
               @error="onError"
             />
          </div>

          <div v-if="errorMsg" class="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
            {{ errorMsg }}
          </div>

          <button 
            type="submit" 
            :disabled="loading || (config.public.hcaptchaSiteKey && !captchaToken)"
            class="w-full py-4 bg-primary text-white font-medium rounded-xl hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <iconify-icon v-if="loading" icon="lucide:loader-2" class="animate-spin text-xl"></iconify-icon>
            <span v-else>Secure Log In</span>
          </button>
        </form>
        
        <div class="mt-8 text-center text-xs text-light/40">
           <NuxtLink to="/" class="hover:text-primary transition-colors flex items-center justify-center gap-1">
             <iconify-icon icon="lucide:arrow-left"></iconify-icon> Back to site
           </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'

definePageMeta({
  middleware: 'auth',
  layout: false
})

useHead({
  title: 'Admin Login | KodexKodes',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const captchaToken = ref('')
const router = useRouter()
const config = useRuntimeConfig()

const onVerify = (token) => {
  captchaToken.value = token
}

const onExpired = () => {
  captchaToken.value = ''
}

const onError = (err) => {
  errorMsg.value = 'Captcha verification failed'
  captchaToken.value = ''
}

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const supabase = useSupabase()
    
    const options = {}
    if (config.public.hcaptchaSiteKey) {
      options.captchaToken = captchaToken.value
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
      options: options
    })
    
    if (error) throw error
    
    // Redirect to admin 
    router.push('/admin')
  } catch (error) {
    errorMsg.value = error.message || 'Failed to authenticate'
    // Reset captcha on failure
    captchaToken.value = ''
  } finally {
    loading.value = false
  }
}
</script>
