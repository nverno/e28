<template>
  <div>
    <!-- TODO: logo -->
    <!-- <img
         alt="ZipFoods logo"
         id="logo"
         src="@/assets/images/zipfoods-logo.png"
         /> -->

    <nav>
      <ul>
        <li>
          <router-link
            v-for="{ name, path, requireAuth } in links"
            :key="name"
            :to="path"
            :data-test="'nav-link-' + name"
          >
            <div v-if="!requireAuth || user">
              {{ name }}
            </div>
          </router-link>

          <router-link v-if="!user" :to="'/account'" data-test="nav-link-account">
            Login
          </router-link>

          <router-link v-if="!user" :to="'/signup'" data-test="nav-link-signup">
            Signup
          </router-link>

          <a v-if="user" @click="logout" class="logout" data-test="nav-link-logout">
            Logout
          </a>
        </li>
      </ul>
    </nav>
    <p v-if="user">
      Welcome, {{ user.name }}
    </p>

    <router-view @update-lists="loadLists"></router-view>

  </div>
</template>

<script>
import '@/assets/css/app.scss';
/* import { axios } from "@/common/app.js"; */

export default {
  name: 'App',
  data() {
    return {
      links: [{
        name: 'Home',
        path: '/',
        requireAuth: false,
      }, {
        name: 'Create List',
        path: '/list/new',
        requireAuth: true,
      }],
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    loadLists() {
      if (this.user) {
        this.$store.dispatch('fetchLists', { userId: this.user.id });
      }
      else {
        this.$store.commit('setLists', []);
      }
    },
    logout() {
      /* FIXME: on successful response */
      this.$store.commit('setUser', null);
      /* axios.post('logout').then((response) => {
       *   if (response.data.success) {
       *     this.$router.push('/');
       *   }
       * }); */
    },
  },
  watch: {
    user() {
      this.loadLists();
    },
  },
  mounted() {
    /* this.$store.dispatch('authUser'); */
    this.loadLists();
  },
}

// Testing
import * as api from './util/list_api';
document.addEventListener("DOMContentLoaded", () => {
  window.api = api;
});
</script>
