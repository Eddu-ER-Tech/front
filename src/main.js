import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

import './assets/main.css'
import 'material-icons/iconfont/material-icons.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router); 
app.use(store);
app.config.globalProperties.$http = axios;
app.mount('#app');