<template>
  <div class="checkbox" @click="toggle(item)">
    <font-awesome-icon v-if="item.done == '1'" icon="check-square" />
    <font-awesome-icon v-else icon="square" />
    {{ item.name }}
  </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
  name: 'ListItem',
  props: {
    item: Object,
  },
  methods: {
    toggle(item) {
      axios({
        method: 'put',
        url: `task/${item.id}`,
        data: { ...item, done: item.done == 1 ? false : true },
      }).then(() => {
        item.done = item.done == 1 ? '0' : '1';
      });
    },
  },
}
</script>

<style>
.checkbox {
  cursor: pointer;
}
</style>
