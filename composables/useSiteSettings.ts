import { ref } from 'vue'

// Default fallback values
const settings = ref({
  email: 'michaelolaitan6@gmail.com',
  whatsapp_number: '2348149390329',
  cv_link: 'https://drive.google.com/uc?export=download&id=170CE2QJrZI3fvcgd6FnKoZ7jn65f81wa',
  twitter_url: 'https://twitter.com/lanre_olat',
  linkedin_url: 'https://www.linkedin.com/in/lanreolat',
  instagram_url: 'https://www.instagram.com/lanre_olat/',
  facebook_url: 'https://web.facebook.com/michaeloreoluwa5',
  github_url: 'https://github.com/LordCodex'
})
let fetched = false

export const useSiteSettings = () => {
  const fetchSettings = async () => {
    if (fetched) return
    try {
      const supabase = useSupabase()
      const { data, error } = await supabase.from('settings').select('*')
      if (!error && data) {
        data.forEach((item: any) => {
          if (settings.value.hasOwnProperty(item.key)) {
            (settings.value as any)[item.key] = item.value
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
