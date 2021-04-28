<template>
  <MainNav />
  <router-view :lists="lists" v-on:update-lists="loadLists"></router-view>
</template>

<script>
import { fetchLists, fetchItems } from './util/list_api';
import MainNav from './components/MainNav';

export default {
  name: 'App',
  components: {
    'MainNav': MainNav,
  },
  data() {
    return {
      lists: [],
      allItems: [],
    }
  },
  mounted() {
    fetchLists((lists) => this.lists = lists);
    fetchItems(items => this.allItems = items);
  },
}

// Testing
import * as api from './util/list_api';
document.addEventListener("DOMContentLoaded", () => {
  window.api = api;
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
