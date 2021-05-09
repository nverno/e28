<template>
  <div class="list">
    <div v-if="list">
      <h3>
        <a :href="list.url" target="_blank"><font-awesome-icon icon="link" /></a>
        {{ list.name }}
      </h3>
      <ul>
        <li v-for="item in list.items" :key="item.id">
          <ListItem :item="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';

export default {
  name: "ShowList",
  props: {
    list: Object,
  },
  components: {
    ListItem,
  },
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;
  
  ul {
    list-style-type: none;
    display: flex;
    align-items: baseline;
    flex-direction: column;
  }
}
</style>
