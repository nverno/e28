<template>
  <div id="lists">

      <router-link
        v-for="list in lists"
        :key="list.id"
        :to="`/list/${list.id}`">
        <!-- <ShowList :list="list" :items> -->
        {{ list.name }}
      </router-link>

  </div>
</template>

<script>
export default {
  name: "ShowLists",
  props: {
    lists: Array,
    allItems: Array,
  },
}
</script>

<style>

</style>
