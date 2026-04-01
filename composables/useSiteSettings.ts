import { ref } from 'vue'

// Default fallback values
const settings = ref({
  email: 'michaelolaitan6@gmail.com',
  whatsapp_number: '2348149390329',
  cv_link: 'https://drive.google.com/uc?export=download&id=170CE2QJrZI3fvcgd6FnKoZ7jn65f81wa'
})
let fetched = false

export const useSiteSettings = () => {
  const fetchSettings = async () => {
    if (fetched) return
    try {
      const supabase = useSupabase()
      const { data, error } = await supabase.from('settings').select('*')
      if (!error && data) {
        data.forEach(item => {
          if (settings.value.hasOwnProperty(item.key)) {
            settings.value[item.key] = item.value
          }
        })
        fetched = true
      }
    } catch(err) {
      console.error(err)
    }
  }

  return { settings, fetchSettings }
}
