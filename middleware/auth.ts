export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabase()

  // Make a definitive server-side request to guarantee the token isn't just a dead string in localStorage
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && to.path.startsWith('/admin')) {
    // If the token is dead or invalid, aggressively purge the corrupted localStorage so it never loops
    if (typeof window !== 'undefined' && window.localStorage) {
      Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith('sb-')) window.localStorage.removeItem(key)
      })
    }
    return navigateTo('/login')
  }

  if (user && to.path === '/login') {
    return navigateTo('/admin')
  }
})
