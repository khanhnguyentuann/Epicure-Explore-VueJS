import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.vue';
import router from './router';
import { useUserStore } from './store/userStore';

const app = createApp(App);

app.config.globalProperties.$baseURL = 'http://localhost:3000';
window.baseURL = 'http://localhost:3000';

const pinia = createPinia();
app.use(pinia);

const storedToken = localStorage.getItem('authToken');
const storedUser = localStorage.getItem('user');

if (storedToken && storedUser) {
    const userStore = useUserStore();
    userStore.setToken(storedToken);
    userStore.setUser(JSON.parse(storedUser));
}

app.use(router).mount('#app');
