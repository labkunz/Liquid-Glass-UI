import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './styles/global.css'
import '@liquid/tokens/colors.css'
import '@liquid/tokens/glass.css'

createApp(App).use(router).mount('#app')
