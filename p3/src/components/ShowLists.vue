<template>
  <div id="show-lists">
    <h2>Lists</h2>
    <div id="lists">
      <router-link
        class="list-link"
        v-for="list in lists"
        :key="list.id"
        :to="`/list/${list.id}`">
        <!-- Show [completed/total] ??? -->
        {{ list.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowLists",
  props: {
    lists: Array,
  },
}
</script>

<style>

</style>
