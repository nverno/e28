import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { router } from '@/common/router';
import { store } from '@/common/store';
import App from './App.vue';

library.add(faCheckSquare, faSquare);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).use(store).mount('#app');
