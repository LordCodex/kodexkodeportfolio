<template>
  <div class="p-10 max-w-6xl mx-auto space-y-10">
    <header class="flex items-center justify-between border-b border-light/10 pb-6">
      <div>
        <h1 class="text-4xl font-black text-light tracking-tight mb-2">My Stack & Tools</h1>
        <p class="text-light/50 font-light">Add, edit, enable or disable the technologies in your About section.</p>
      </div>
      <button 
        @click="showNewSkillModal = true" 
        class="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-opacity-90 transition-all flex items-center space-x-2 shadow-lg hover:-translate-y-1"
      >
        <iconify-icon icon="lucide:plus"></iconify-icon>
        <span>Add Skill</span>
      </button>
    </header>

    <div v-if="loadingData" class="flex justify-center p-20">
      <iconify-icon icon="lucide:loader-2" class="animate-spin text-4xl text-accent"></iconify-icon>
    </div>

    <!-- Skills Grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div 
        v-for="skill in skills" 
        :key="skill.id" 
        class="relative bg-dark/50 border rounded-xl p-6 flex flex-col items-center justify-center space-y-4 group transition-all"
        :class="skill.is_enabled ? 'border-light/10 hover:border-accent/40 shadow-sm' : 'border-red-500/20 opacity-50 bg-red-500/5'"
      >
        <div class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button @click="editSkill(skill)" class="text-light/40 hover:text-light transition-colors p-1" title="Edit">
             <iconify-icon icon="lucide:pencil" class="text-sm"></iconify-icon>
           </button>
           <button @click="confirmDelete(skill.id)" class="text-red-400 hover:text-red-500 transition-colors p-1" title="Delete">
             <iconify-icon icon="lucide:trash-2" class="text-sm"></iconify-icon>
           </button>
        </div>

        <iconify-icon :icon="skill.icon" class="text-4xl" :class="skill.is_enabled ? 'text-light' : 'text-red-500'"></iconify-icon>
        <p class="font-bold text-center text-sm" :class="skill.is_enabled ? 'text-light/90' : 'text-red-400 font-medium'">{{ skill.name }}</p>

        <!-- Toggle Switch -->
        <button 
          @click="toggleVisibility(skill)" 
          class="w-8 h-4 rounded-full flex items-center p-0.5 transition-colors duration-300"
          :class="skill.is_enabled ? 'bg-accent' : 'bg-red-500/40'"
          :title="skill.is_enabled ? 'Disable Skill' : 'Enable Skill'"
        >
           <span class="w-3 h-3 bg-white rounded-full transform transition-transform duration-300 shadow-sm" :class="skill.is_enabled ? 'translate-x-4' : 'translate-x-0'"></span>
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="skillToDelete" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div class="bg-red-950/20 border border-red-500/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl space-y-6 text-center backdrop-blur-md">
        <div class="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center text-red-500 text-3xl mb-4 ring-4 ring-red-500/5">
          <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
        </div>
        <h3 class="text-xl font-bold text-light">Delete Skill?</h3>
        <p class="text-light/50 text-sm">This action permanently deletes this skill. This cannot be undone.</p>
        <div class="flex space-x-3 pt-4">
          <button @click="skillToDelete = null" class="flex-1 py-3 bg-dark/50 hover:bg-light/10 text-light/70 rounded-xl transition-colors font-medium">Cancel</button>
          <button @click="executeDeleteSkill" class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-[0_5px_15px_-5px_rgba(239,68,68,0.5)]">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit/Add Modal Overlay -->
    <div v-if="showNewSkillModal || editingSkill" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-[#111] border border-light/10 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
        <h3 class="text-2xl font-black text-light tracking-tight">{{ editingSkill ? 'Edit Skill' : 'New Skill' }}</h3>
        
        <form @submit.prevent="saveSkill" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm text-light/70 ml-2">Skill Name (e.g. React)</label>
            <input 
              v-model="form.name" required 
              type="text" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-accent"
              placeholder="e.g. Tailwind CSS"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm text-light/70 ml-2">Iconify Icon Key</label>
            <input 
              v-model="form.icon" required 
              type="text" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-accent"
              placeholder="e.g. mdi:language-javascript"
            />
            <p class="text-xs text-light/30 px-2 mt-1">Search for icons on <a href="https://icon-sets.iconify.design/" target="_blank" class="text-accent hover:underline">iconify.design</a></p>
          </div>
          <div class="flex items-center space-x-3 px-2 py-2">
             <input type="checkbox" v-model="form.is_enabled" id="enableToggle" class="w-4 h-4 rounded bg-dark border-light/10 accent-accent" />
             <label for="enableToggle" class="text-sm font-medium text-light/80 cursor-pointer">Show in portfolio</label>
          </div>

           <div class="flex space-x-3 pt-4">
            <button type="button" @click="closeModal" class="flex-1 py-3 text-light/60 font-medium hover:bg-light/5 rounded-xl transition-colors">Cancel</button>
            <button type="submit" :disabled="saving" class="flex-1 py-3 bg-accent text-white font-medium rounded-xl hover:bg-opacity-90 transition-all flex justify-center items-center">
               <iconify-icon v-if="saving" icon="lucide:loader-2" class="animate-spin"></iconify-icon>
               <span v-else>Save Skill</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

useHead({
  title: 'Manage Skills | Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const skills = ref([])
const loadingData = ref(true)
const saving = ref(false)

const showNewSkillModal = ref(false)
const editingSkill = ref(null)
const skillToDelete = ref(null)

const form = ref({
  id: null,
  name: '',
  icon: '',
  is_enabled: true
})

onMounted(async () => {
  await fetchSkills()
})

const fetchSkills = async () => {
  loadingData.value = true
  try {
    const supabase = useSupabase()
    const { data, error } = await supabase.from('skills').select('*').order('sort_order', { ascending: true })
    if (!error) skills.value = data
  } catch(err) {
    console.error(err)
  } finally {
    loadingData.value = false
  }
}

const toggleVisibility = async (skill) => {
  try {
    const supabase = useSupabase()
    const newValue = !skill.is_enabled
    skill.is_enabled = newValue
    await supabase.from('skills').update({ is_enabled: newValue }).eq('id', skill.id)
  } catch(err) {
    console.error(err)
  }
}

const editSkill = (skill) => {
  editingSkill.value = skill
  form.value = { ...skill }
}

const closeModal = () => {
  showNewSkillModal.value = false
  editingSkill.value = null
  form.value = { id: null, name: '', icon: '', is_enabled: true }
}

const saveSkill = async () => {
  saving.value = true
  try {
    const supabase = useSupabase()
    const payload = {
      name: form.value.name,
      icon: form.value.icon,
      is_enabled: form.value.is_enabled
    }

    if (form.value.id) {
      await supabase.from('skills').update(payload).eq('id', form.value.id)
    } else {
      payload.sort_order = skills.value.length + 1
      await supabase.from('skills').insert([payload])
    }
    await fetchSkills()
    closeModal()
  } catch(err) {
    console.error(err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (id) => {
  skillToDelete.value = id
}

const executeDeleteSkill = async () => {
  const id = skillToDelete.value
  if (!id) return
  skillToDelete.value = null

  try {
    const supabase = useSupabase()
    await supabase.from('skills').delete().eq('id', id)
    await fetchSkills()
  } catch(err) {
    console.error(err)
  }
}
</script>
