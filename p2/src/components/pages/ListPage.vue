<template>
  <div id="list-page">
    <div v-if="list">
      <ShowList :list="list" :items="items" />
    </div>
  </div>
</template>

<script>
import ShowList from '@/components/list/ShowList.vue';

export default {
  name: "ListPage",
  components: {
    "ShowList": ShowList,
  },
  props: {
    id: String,
    lists: Array,
    allItems: Array,
  },
  data() {
    return {}
  },
  computed: {
    list() {
      return this.lists.filter(l => l.id == this.id);
    },
    items() {
      return this.allItems.filter(e => e.tasklist_id == this.id);
    },
  },
}
</script>

<style>

</style>
