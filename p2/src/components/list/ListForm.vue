<template>
  <form id="list-form">
    <label>Url
      <input
        v-model="list.url"
        id="list-url"
        required
        placeholder="site on which to run xpath query"
      >
    </label>
  </form>
</template>

<script>
/* import { axios } from '@/common/app.js'; */
import { postList } from '../../util/list_api';

export default {
  name: 'ListForm',
  props: {},
  data() {
    return {
      list: {
        url: '',
        xpath: '',
      },
    }
  },
  methods: {
    createList() {
      postList(this.list, () => this.$emit('update-lists'));
    },
  },
}
</script>

<style>

</style>
