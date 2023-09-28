import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.vue';
import router from './router';
import { useUserStore } from './store/userStore';
import VTooltip from 'v-tooltip';

const app = createApp(App);

// Sử dụng VTooltip cho instance của ứng dụng
app.use(VTooltip);

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
