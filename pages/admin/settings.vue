<template>
  <div class="p-10 max-w-4xl mx-auto space-y-10">
    <header class="flex items-center justify-between border-b border-light/10 pb-6">
      <div>
        <h1 class="text-4xl font-black text-light tracking-tight mb-2">Global Settings</h1>
        <p class="text-light/50 font-light">Manage your email address, phone number, and CV download link.</p>
      </div>
      <button 
        @click="saveSettings" 
        :disabled="loading"
        class="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-opacity-90 transition-all flex items-center space-x-2 disabled:opacity-50"
      >
        <iconify-icon v-if="loading" icon="lucide:loader-2" class="animate-spin text-xl"></iconify-icon>
        <span v-else>Save Changes</span>
      </button>
    </header>

    <div v-if="successMsg" class="p-4 bg-primary/20 text-primary rounded-xl border border-primary/30 font-medium flex items-center mb-6">
      <iconify-icon icon="lucide:check-circle" class="mr-2"></iconify-icon>
      {{ successMsg }}
    </div>
    
    <div v-if="errorMsg" class="p-4 bg-red-500/10 text-red-500 rounded-xl border border-red-500/30 font-medium flex items-center mb-6">
      <iconify-icon icon="lucide:alert-circle" class="mr-2"></iconify-icon>
      {{ errorMsg }}
    </div>

    <div v-if="loadingData" class="flex justify-center p-20">
      <iconify-icon icon="lucide:loader-2" class="animate-spin text-4xl text-primary"></iconify-icon>
    </div>
    
    <div v-else class="space-y-6">
       <!-- Dynamic Settings Fields -->
       <div v-for="setting in settingsList" :key="setting.key" class="bg-dark/50 p-6 rounded-2xl border border-light/5">
         <div class="mb-2">
           <label class="block text-primary font-bold uppercase tracking-wider text-xs mb-1">{{ setting.key.replace('_', ' ') }}</label>
           <p class="text-light/40 text-sm font-light mb-4">{{ setting.description }}</p>
         </div>
         <input 
           v-model="setting.value" 
           type="text" 
           class="w-full px-5 py-3 bg-secondary/30 border border-light/10 text-light rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
         />
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

useHead({
  title: 'Site Settings | Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const settingsList = ref([])
const loadingData = ref(true)
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

onMounted(async () => {
  await fetchSettings()
})

const fetchSettings = async () => {
  try {
    const supabase = useSupabase()
    const { data, error } = await supabase.from('settings').select('*')
    if (error) throw error
    settingsList.value = data
  } catch (error) {
    console.error('Error fetching settings:', error.message)
    errorMsg.value = 'Failed to load settings from Supabase'
  } finally {
    loadingData.value = false
  }
}

const saveSettings = async () => {
  loading.value = true
  successMsg.value = ''
  errorMsg.value = ''
  
  try {
    const supabase = useSupabase()
    
    // Upsert all settings
    const { error } = await supabase.from('settings').upsert(
      settingsList.value.map(s => ({ key: s.key, value: s.value, description: s.description }))
    )
    
    if (error) throw error
    successMsg.value = 'Settings successfully updated!'
    
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch(error) {
    errorMsg.value = 'Failed to save settings: ' + error.message
  } finally {
    loading.value = false
  }
}
</script>
