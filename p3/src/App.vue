<template>
  <div>
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
    <p v-if="user" data-test="welcome-banner">
      Welcome, {{ user.name }}
    </p>

    <router-view @update-lists="loadLists"></router-view>

  </div>
</template>

<script>
import '@/assets/css/app.scss';
import { axios } from "@/common/app.js";

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
        this.$store.dispatch('authUser');
      }
    },
    logout() {
      axios.post('logout').then((response) => {
        if (response.data.success) {
          this.$store.commit('setUser', null);
          this.$router.push('/');
          this.$emit('update-lists');
        }
      });
    },
  },
  watch: {
    user() {
      this.loadLists();
    },
  },
  mounted() {
    this.loadLists();
  },
}
</script>
