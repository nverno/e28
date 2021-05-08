<template>
  <div id="home">
    <p>
      Create task lists from other sites using xpath
    </p>

    <ShowLists :lists="lists" />
  </div>
</template>

<script>
import ShowLists from '@/components/list/ShowLists.vue';

export default {
  name: "HomePage",
  props: {
    lists: Array,
  },
  components: {
    "ShowLists": ShowLists,
  },
}
</script>

<style>

</style>
