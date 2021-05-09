<template>
  <div id="signupForm">
    <h2>Create Account</h2>
    <div>
      <label>
        Name:
        <input
          id="name"
          type="text"
          v-model="data.name"
          data-test="name-input"
          @blur="validate"
        />
      </label>
      <error-field v-if="errors && 'name' in errors" :errors="errors.name" />
    </div>

    <div>
      <label>
        Email:
        <input
          id="email"
          type="email"
          v-model="data.email"
          data-test="email-input"
          @blur="validate"
        />
      </label>
      <error-field v-if="errors && 'email' in errors" :errors="errors.email" />
    </div>
    <div>
      <label>
        Password:
        <input
          id="password"
          type="password"
          v-model="data.password"
          data-test="password-input"
          @blur="validate"
        />
      </label>
      <error-field v-if="errors && 'password' in errors" :errors="errors.password" />
    </div>

    <div class="signup-buttons">
      <button @click="signup" data-test="signup-button">Signup</button>
    </div>

    <ul v-if="backendErrors">
      <li class="error" v-for="(error, index) in backendErrors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { axios } from "@/common/app";
import Validator from "validatorjs";
import ErrorField from "@/components/ErrorField.vue";

export default {
  name: "SignupPage",
  components: {
    "error-field": ErrorField,
  },
  props: {},
  data() {
    return {
      showConfirmation: false,
      errors: null,
      backendErrors: null,
      data: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      let validator = new Validator(this.data, {
        name: "required",
        email: "required|email",
        password: "required|size:8",
      });

      if (validator.fails()) this.errors = validator.errors.all();
      else this.errors = null;

      return validator.passes();
    },
    signup() {
      if (this.validate()) {
        axios.post("/register", this.data).then((response) => {
          if (response.data.errors) {
            this.backendErrors = response.data.errors;
          } else {
            this.login();
            this.errors = null;
            this.backendErrors = null;
            this.data = [];
          }
        });
      }
    },
    login() {
      axios.post("login", this.data).then((response) => {
        if (response.data.authenticated) {
          this.$store.commit("setUser", response.data.user);
          this.$router.push('/');
        } else {
          this.errors = response.data.errors;
        }
      });
    },
  },
};
</script>

<style>
</style>
