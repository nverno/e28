<template>
  <div id="home">
    <p>
      Create task lists from other sites using xpath
    </p>

    <ShowLists :lists="lists" />
  </div>
</template>

<script>
import ShowLists from '@/components/ShowLists.vue';

export default {
  name: "HomePage",
  components: {
    "ShowLists": ShowLists,
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
}
</script>

<style>

</style>
