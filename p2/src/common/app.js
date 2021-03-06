import { reactive } from 'vue';

export const axios = require("axios").create({
  baseURL: process.env.VUE_APP_API_URL ?? 'http://e28api.nverno.loc',
  responseType: 'json',
});

export const store = reactive({});
