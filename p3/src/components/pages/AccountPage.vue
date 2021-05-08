<template>
  <div id="account-page">
    <div v-if="user">
      <h2 data-test="welcome-message">Hi, {{ user.name }}!</h2>

      <!-- <div id="favorites">
           <strong>Your Favorites</strong>
           <p v-if="favorites && favorites.length == 0">
           No favorites yet.
           </p>
           <li v-for="(favorite, key) in favorites" v-bind:key="key">
           {{ favorite.name }}
           </li>
           </div> -->

      <button v-on:click="logout" data-test="logout-button">
        Logout
      </button>
    </div>

    <div v-else id="loginForm">
      <h2>Login</h2>
      <!-- FIXME: remove -->
      <small>
        (Form is prefilled for demonstration purposes; remove in final
        application)
      </small>
      <div>
        <label>
          Email:
          <input
            id="email"
            type="text"
            v-model="data.email"
            data-test="email-input"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            id="password"
            type="password"
            v-model="data.password"
            data-test="password-input"
          />
        </label>
      </div>

      <button v-on:click="login" data-test="login-button">Login</button>

      <ul v-if="errors">
        <li class="error" v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
  data() {
    return {
      // Form is prefilled for demonstration purposes; remove in final application
      // jill@harvard.edu/asdfasdf is one of our seed users from e28api/seeds/user.json
      data: {
        email: "jill@harvard.edu",
        password: "asdfasdf",
      },
      errors: null,
    };
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
    /* loadLists() {
     *   if (this.user) {
     *     axios
     *       .get("favorite/query?user_id=" + this.user.id)
     *       .then((response) => {
     *         this.favorites = response.data.favorite.map(
     *           (favorite) => {
     *             return this.$store.getters.getProductById(
     *               favorite.product_id
     *             );
     *           }
     *         );
     *       });
     *   }
     * }, */
    login() {
      axios.post("login", this.data).then((response) => {
        if (response.data.authenticated) {
          this.$store.commit("setUser", response.data.user);
        } else {
          this.errors = response.data.errors;
        }
      });
    },
    logout() {
      axios.post("logout").then((response) => {
        if (response.data.success) {
          this.$store.commit("setUser", false);
        }
      });
    },
  },
  /* watch: {
   *   user() {
   *     this.loadFavorites();
   *   },
   * },
   * mounted() {
   *   this.loadFavorites();
   * }, */
};
</script>

