<template>
  <div class="pt-32 pb-24 min-h-screen bg-dark">
    <div class="container mx-auto px-6 max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <!-- Contact Info -->
        <div class="space-y-10">
          <div>
             <span class="text-primary font-medium tracking-widest uppercase text-sm border border-primary/20 px-4 py-1 rounded-full bg-primary/5 inline-block mb-4">Contact</span>
             <h1 class="text-5xl lg:text-7xl font-black text-light tracking-tight mb-6">Let's <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Chat</span></h1>
             <p class="text-light/60 text-lg leading-relaxed font-light mb-6">
               I'm currently open for freelance work, open-source collaborations, or a great full-time role. Send me a quick message and let's chat about what we can build together.
             </p>
             <a :href="settings.cv_link" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center space-x-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white rounded-full transition-all duration-300 w-auto text-sm font-medium">
                <iconify-icon icon="lucide:download" class="group-hover:translate-y-1 transition-transform" />
                <span>Download My CV</span>
             </a>
          </div>
          
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <iconify-icon icon="lucide:mail" class="text-xl" />
              </div>
              <div>
                <h4 class="text-light font-bold mb-1">Email</h4>
                <a :href="`mailto:${settings.email}`" class="text-light/60 hover:text-primary transition-colors text-sm break-all">{{ settings.email }}</a>
              </div>
            </div>
             <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <iconify-icon icon="lucide:map-pin" class="text-xl" />
              </div>
              <div>
                <h4 class="text-light font-bold mb-1">Location</h4>
                <p class="text-light/60 text-sm cursor-default">Lagos, Nigeria (Remote Worldwide)</p>
              </div>
            </div>
             <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <iconify-icon icon="lucide:globe" class="text-xl" />
              </div>
              <div>
                <h4 class="text-light font-bold mb-1">Socials</h4>
                  <div class="flex space-x-4 mt-2">
                    <a :href="settings.github_url || 'https://github.com/LordCodex'" target="_blank" rel="noopener noreferrer" class="text-light/60 hover:text-primary transition-colors text-xl">
                      <iconify-icon icon="lucide:github" />
                    </a>
                    <a :href="settings.twitter_url || 'https://twitter.com/lanre_olat'" target="_blank" rel="noopener noreferrer" class="text-light/60 hover:text-primary transition-colors text-xl">
                      <iconify-icon icon="lucide:twitter" />
                    </a>
                    <a :href="settings.linkedin_url || 'https://www.linkedin.com/in/lanreolat'" target="_blank" rel="noopener noreferrer" class="text-light/60 hover:text-primary transition-colors text-xl">
                      <iconify-icon icon="lucide:linkedin" />
                    </a>
                    <a :href="settings.instagram_url || 'https://www.instagram.com/lanre_olat/'" target="_blank" rel="noopener noreferrer" class="text-light/60 hover:text-primary transition-colors text-xl">
                      <iconify-icon icon="lucide:instagram" />
                    </a>
                    <a :href="settings.facebook_url || 'https://web.facebook.com/michaeloreoluwa5'" target="_blank" rel="noopener noreferrer" class="text-light/60 hover:text-primary transition-colors text-xl">
                      <iconify-icon icon="lucide:facebook" />
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-secondary/30 p-8 rounded-3xl border border-light/5 shadow-2xl relative overflow-hidden group">
          <!-- Glow -->
          <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none"></div>
          
          <form @submit.prevent class="space-y-6 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-2">
                <label for="name" class="text-light/80 text-sm font-medium ml-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  placeholder="John Doe"
                  class="w-full bg-dark/50 border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-light/80 text-sm font-medium ml-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  placeholder="john@example.com"
                  class="w-full bg-dark/50 border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>
            
             <div class="space-y-2">
              <label for="subject" class="text-light/80 text-sm font-medium ml-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject"
                placeholder="Project Inquiry"
                class="w-full bg-dark/50 border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-light/80 text-sm font-medium ml-1">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                placeholder="Tell me about your project..."
                rows="5"
                class="w-full bg-dark/50 border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                required
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
               <!-- Email Button -->
              <button 
                type="button" 
                @click="sendViaEmail"
                class="w-full bg-transparent border border-light/20 hover:border-primary/50 hover:bg-primary/5 text-light font-medium py-3 rounded-xl transition-all flex justify-center items-center space-x-2"
              >
                <iconify-icon icon="lucide:mail" class="text-lg text-primary" />
                <span>Send via Email</span>
              </button>

              <!-- WhatsApp Button -->
               <button 
                type="button" 
                @click="sendViaWhatsApp"
                class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl shadow-[0_5px_15px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(5,150,105,0.6)] transition-all flex justify-center items-center space-x-2"
              >
                 <iconify-icon icon="lucide:message-circle" class="text-lg" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
            
            <!-- Custom Inline Error Message -->
            <div v-if="validationError" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-3 text-red-400 mt-4 transition-all">
              <iconify-icon icon="lucide:alert-circle" class="text-xl"></iconify-icon>
              <span class="text-sm font-medium">{{ validationError }}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { settings } = useSiteSettings()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const validationError = ref('')

const validateForm = () => {
  validationError.value = ''
  if(!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    validationError.value = "Please fill in all details before sending."
    
    // Auto-hide the error after 4 seconds
    setTimeout(() => {
      validationError.value = ''
    }, 4000)
    
    return false;
  }
  return true;
}

const sendViaEmail = () => {
  if(!validateForm()) return;
  
  const targetEmail = settings.value.email || "michaelolaitan6@gmail.com";
  // Format body for email
  const body = `Name: ${form.value.name}%0D%0AEmail: ${form.value.email}%0D%0A%0D%0AMessage:%0D%0A${form.value.message}`;
  const subject = encodeURIComponent(form.value.subject);
  
  window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
};

const sendViaWhatsApp = () => {
  if(!validateForm()) return;

  const targetPhone = settings.value.whatsapp_number || "2348149390329";
  // Format body for WhatsApp
  const text = `*New Contact Request*%0A%0A*Name:* ${form.value.name}%0A*Email:* ${form.value.email}%0A*Subject:* ${form.value.subject}%0A%0A*Message:*%0A${form.value.message}`;
  
  window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
};
</script>
