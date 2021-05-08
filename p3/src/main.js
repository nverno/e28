import { createApp } from 'vue';
import { router } from '@/common/router';
import { store } from '@/common/store';
import App from './App.vue';

createApp(App).use(router).use(store).mount('#app');
