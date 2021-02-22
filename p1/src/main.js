import { createApp } from 'vue';
import App from './App.vue';
import 'highlight.js/scss/solarized-light.scss';
// import hljs from 'highlight.js';

const app = createApp(App);
// app.use(hljs.vuePlugin);

app.config.globalProperties.$filters = {
  minutes(seconds) {
    const mins = Math.floor(seconds / 60),
      secs = seconds - mins * 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  },

  number(n) {
    return n.toFixed(2);
  },

  percent(n) {
    return '%' + Math.round(100 * n);
  },
};

app.mount('#app');
