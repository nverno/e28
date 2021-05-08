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

    <router-view @update-lists="loadLists"></router-view>
  </div>
</template>

<script>
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
    },
    logout() {
      /* FIXME: axios.post('logout') ??? */
      this.$store.commit('setUser', false);
    }
  },
  watch: {
    user() {
      this.loadLists();
    }
  },
  mounted() {
    this.loadLists();
  },
}

// Testing
import * as api from './util/list_api';
document.addEventListener("DOMContentLoaded", () => {
  window.api = api;
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav ul {
  list-style-type: none;
  li {
    display: inline-block;

    a:link, a:visited, a:hover, a:active {
      display: inline-block;
      text-transform: capitalize;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      color: blue;
      font-weight: bold;
    }
    a.router-link-active:link,
    a.router-link-active:visited,
    a.router-link-active:hover,
    a.router-link-active:active {
      text-decoration: none;
      color: black;
      background-color: lightblue;
      cursor: inherit;
    }

    .logout {
      display: inline-block;
      color: blue;

      &:hover {
        text-transform: capitalize;
      }
    }
  }

}
</style>
