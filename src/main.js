import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './global/axiosConfig'


let app = createApp(App);
app.config.globalProperties.$https = axios;
app.use(router).use(store).use(router).mount('#app')
