import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/global.css'
import '@liquid/tokens/colors.css'
import '@liquid/tokens/glass.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
