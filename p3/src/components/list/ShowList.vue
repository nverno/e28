<template>
  <div id="list">
    <div v-if="list">
      <h3>{{ list.name }}</h3>
      <ul>
        <li v-for="{ id, name } in items" :key="id">
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowList",
  props: {
    list: Object,
    items: Array,
  },
  data() {
    return {}
  },
}
</script>

<style>

</style>
