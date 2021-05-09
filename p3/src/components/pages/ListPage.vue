<template>
  <div id="list-page">
    <div v-if="listNotFound">
      <p>List {{ id }} not found!</p>
    </div>

    <div v-else-if="list">
      <ShowList :list="list" />
    </div>
  </div>
</template>

<script>
import ShowList from '@/components/ShowList.vue';

export default {
  name: "ListPage",
  components: {
    "ShowList": ShowList,
  },
  props: {
    id: String,
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.getters.getListById(this.id);
    },
    listNotFound() {
      return this.list == null;
    },
  },
  methods: {
    updateList() {
      this.$store.dispatch('fetchLists', this.$store.state.user.id);
    },
  },
}
</script>

<style>

</style>
