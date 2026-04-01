<template>
  <div class="p-10 max-w-6xl mx-auto space-y-10">
    <header class="flex items-center justify-between border-b border-light/10 pb-6">
      <div>
        <h1 class="text-4xl font-black text-light tracking-tight mb-2">Projects Portfolio</h1>
        <p class="text-light/50 font-light">Add, edit, rearrange, or delete showcased projects.</p>
      </div>
      <button 
        @click="showProjectModal = true" 
        class="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-opacity-90 transition-all flex items-center space-x-2 shadow-lg hover:-translate-y-1"
      >
        <iconify-icon icon="lucide:plus"></iconify-icon>
        <span>Add Project</span>
      </button>
    </header>

    <div v-if="loadingData" class="flex justify-center p-20">
      <iconify-icon icon="lucide:loader-2" class="animate-spin text-4xl text-primary"></iconify-icon>
    </div>

    <!-- Projects List -->
    <div v-else class="space-y-4">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id" 
        class="bg-dark/50 border border-light/10 p-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 rounded-2xl group hover:border-primary/40 transition-colors"
      >
        <!-- Thumbnail -->
        <div class="w-full md:w-32 h-20 rounded-lg overflow-hidden bg-gradient-to-br flex items-center justify-center shadow-inner" :class="project.gradient">
           <iconify-icon icon="lucide:folder-git-2" class="text-white/30 text-2xl"></iconify-icon>
        </div>
        
        <!-- Info -->
        <div class="flex-1 space-y-2">
          <h3 class="text-xl font-bold text-light flex items-center space-x-2">
            <span>{{ project.title }}</span>
            <a v-if="project.url" :href="project.url" target="_blank" class="text-light/30 hover:text-primary transition-colors inline-block ml-2">
               <iconify-icon icon="lucide:external-link" class="text-sm"></iconify-icon>
            </a>
          </h3>
          <p class="text-light/50 font-light text-sm line-clamp-1">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 text-xs text-light/40 pt-1">
             <span v-for="tag in project.tags" :key="tag" class="px-2 py-0.5 rounded bg-light/5 border border-light/10">{{ tag }}</span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center space-x-2 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-light/10 w-full md:w-auto justify-end">
           <!-- Toggle Switch -->
           <button 
             @click="toggleVisibility(project)" 
             class="w-10 h-5 rounded-full flex items-center p-1 transition-colors duration-300 mr-4"
             :class="project.is_enabled !== false ? 'bg-primary' : 'bg-red-500/40'"
             :title="project.is_enabled !== false ? 'Disable Project' : 'Enable Project'"
           >
              <span class="w-3.5 h-3.5 bg-white rounded-full transform transition-transform duration-300 shadow-sm" :class="project.is_enabled !== false ? 'translate-x-5' : 'translate-x-0'"></span>
           </button>

           <button @click="moveProject(index, -1)" :disabled="index === 0" class="p-2 text-light/40 hover:text-light transition-colors disabled:opacity-20 flex" title="Move Up">
             <iconify-icon icon="lucide:arrow-up"></iconify-icon>
           </button>
           <button @click="moveProject(index, 1)" :disabled="index === projects.length - 1" class="p-2 text-light/40 hover:text-light transition-colors disabled:opacity-20 flex border-r border-light/10 pr-4 mr-2" title="Move Down">
             <iconify-icon icon="lucide:arrow-down"></iconify-icon>
           </button>
           
           <button @click="editProject(project)" class="p-3 bg-light/5 hover:bg-primary/20 hover:text-primary rounded-xl text-light/60 transition-all ml-2 flex" title="Edit">
             <iconify-icon icon="lucide:pencil"></iconify-icon>
           </button>
           <button @click="confirmDelete(project.id)" class="p-3 bg-light/5 hover:bg-red-500/20 hover:text-red-400 rounded-xl text-light/60 transition-all flex" title="Delete">
             <iconify-icon icon="lucide:trash-2"></iconify-icon>
           </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="projectToDelete" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div class="bg-red-950/20 border border-red-500/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl space-y-6 text-center backdrop-blur-md">
        <div class="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center text-red-500 text-3xl mb-4 ring-4 ring-red-500/5">
          <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
        </div>
        <h3 class="text-xl font-bold text-light">Delete Project?</h3>
        <p class="text-light/50 text-sm">This action permanently deletes this project from your portfolio. This cannot be undone.</p>
        <div class="flex space-x-3 pt-4">
          <button @click="projectToDelete = null" class="flex-1 py-3 bg-dark/50 hover:bg-light/10 text-light/70 rounded-xl transition-colors font-medium">Cancel</button>
          <button @click="executeDeleteProject" class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-[0_5px_15px_-5px_rgba(239,68,68,0.5)]">Delete</button>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showProjectModal || editingProject" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div class="bg-[#111] border border-light/10 p-8 rounded-2xl max-w-2xl w-full shadow-2xl relative my-8">
        <h3 class="text-2xl font-black text-light tracking-tight mb-6">{{ editingProject ? 'Edit Project' : 'New Project' }}</h3>
        
        <form @submit.prevent="saveProject" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm text-light/70 ml-2">Project Title</label>
              <input v-model="form.title" required type="text" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-primary transition-colors" placeholder="e.g. Acme Corp UI" />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-light/70 ml-2">Live URL</label>
              <input v-model="form.url" type="url" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-primary transition-colors" placeholder="https://" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-light/70 ml-2">Description</label>
            <textarea v-model="form.description" required rows="3" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-primary transition-colors scrollbar-thin" placeholder="Describe the project..."></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm text-light/70 ml-2">Background Gradient (Tailwind classes)</label>
              <input v-model="form.gradient" type="text" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-primary transition-colors" placeholder="from-blue-900 via-primary/50 to-purple-900" />
               <div class="h-8 mt-2 rounded-lg w-full bg-gradient-to-br" :class="form.gradient"></div>
            </div>
            <div class="space-y-2 flex flex-col">
              <label class="text-sm text-light/70 ml-2">Tags (Comma separated)</label>
              <input v-model="formTagsInput" type="text" class="w-full px-4 py-3 bg-dark/50 border border-light/10 rounded-xl text-light outline-none focus:border-primary transition-colors" placeholder="Vue, Tailwind, Frontend" />
            </div>
          </div>

           <div class="flex space-x-3 mt-8">
             <button type="button" @click="closeModal" class="flex-1 py-4 text-light/50 font-medium hover:bg-light/5 rounded-xl transition-colors">Cancel</button>
             <button type="submit" :disabled="saving" class="flex-1 py-4 bg-primary text-white font-medium hover:bg-opacity-90 rounded-xl transition-all shadow-lg flex justify-center items-center">
               <iconify-icon v-if="saving" icon="lucide:loader-2" class="animate-spin text-xl"></iconify-icon>
               <span v-else>Save Project</span>
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
  title: 'Manage Projects | Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const projects = ref([])
const loadingData = ref(true)
const saving = ref(false)

const showProjectModal = ref(false)
const editingProject = ref(null)
const projectToDelete = ref(null)

const form = ref({
  id: null,
  title: '',
  description: '',
  url: '',
  gradient: 'from-gray-800 to-gray-900',
  tags: []
})
const formTagsInput = ref('')

onMounted(async () => {
  await fetchProjects()
})

const fetchProjects = async () => {
  loadingData.value = true
  try {
    const supabase = useSupabase()
    const { data, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
    if (!error) projects.value = data
  } catch(err) {
    console.error(err)
  } finally {
    loadingData.value = false
  }
}

const editProject = (proj) => {
  editingProject.value = proj
  form.value = { ...proj }
  formTagsInput.value = proj.tags.join(', ')
}

const closeModal = () => {
  showProjectModal.value = false
  editingProject.value = null
  form.value = { id: null, title: '', description: '', url: '', gradient: 'from-gray-800 to-gray-900', tags: [] }
  formTagsInput.value = ''
}

const saveProject = async () => {
  saving.value = true
  try {
    const supabase = useSupabase()
    
    // Process tags
    const tagsArray = formTagsInput.value.split(',').map(t => t.trim()).filter(t => t)
    
    const payload = {
      title: form.value.title,
      description: form.value.description,
      url: form.value.url,
      gradient: form.value.gradient,
      tags: tagsArray
    }
    
    if (form.value.id) {
       await supabase.from('projects').update(payload).eq('id', form.value.id)
    } else {
       payload.sort_order = projects.value.length + 1
       await supabase.from('projects').insert([payload])
    }
    await fetchProjects()
    closeModal()
  } catch(err) {
    console.error(err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (id) => {
  projectToDelete.value = id
}

const executeDeleteProject = async () => {
  const id = projectToDelete.value
  if (!id) return
  projectToDelete.value = null // Close modal immediately for snappy UI
  
  try {
    const supabase = useSupabase()
    await supabase.from('projects').delete().eq('id', id)
    await fetchProjects()
  } catch(err) {
    console.error(err)
  }
}

const toggleVisibility = async (project) => {
  try {
    const supabase = useSupabase()
    const newValue = project.is_enabled === false ? true : false
    project.is_enabled = newValue
    await supabase.from('projects').update({ is_enabled: newValue }).eq('id', project.id)
  } catch(err) {
    console.error(err)
  }
}

const moveProject = async (index, direction) => {
  const newIndex = index + direction
  if(newIndex < 0 || newIndex >= projects.value.length) return
  
  // Swap sort_order
  const current = projects.value[index]
  const target = projects.value[newIndex]
  
  const currentOrder = current.sort_order
  const targetOrder = target.sort_order
  
  // Swap locally for instant feedback
  current.sort_order = targetOrder
  target.sort_order = currentOrder
  
  // Sort array
  projects.value.sort((a,b) => a.sort_order - b.sort_order)
  
  // Update DB silently
  const supabase = useSupabase()
  await Promise.all([
     supabase.from('projects').update({ sort_order: targetOrder }).eq('id', current.id),
     supabase.from('projects').update({ sort_order: currentOrder }).eq('id', target.id)
  ])
}
</script>
