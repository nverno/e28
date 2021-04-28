import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import store from './common/store';
import App from './App.vue';
import HomePage from '@/components/pages/HomePage.vue';
import ListPage from '@/components/pages/ListPage.vue';
import ListNew from '@/components/list/ListNew.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/list/new', component: ListNew },
    { path: '/list/:id', component: ListPage, props: true },
    // { path: '/list/:id/edit', component: ListEdit, props: true },
  ],
});

createApp(App).use(router).use(store).mount('#app');
