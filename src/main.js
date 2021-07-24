import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './global/axiosConfig'
import ws from "./global/websocket1";


let app = createApp(App);
app.config.globalProperties.$https = axios;
app.config.globalProperties.$ws = ws;
app.use(router).use(store).use(router).mount('#app')
