<template>
  <div class="list">
    <div v-if="list">
      <h3>{{ list.name }}</h3>
      <ul>
        <li v-for="item in list.items" :key="item.id">
          <div>
            <font-awesome-icon v-if="item.done == '1'" icon="check-square" @click="toggle(item)" />
            <font-awesome-icon v-else icon="square" @click="toggle(item)" />

            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
  name: "ShowList",
  props: {
    list: Object,
  },
  data() {
    return {}
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

<style lang="scss">
.list {
  display: flex;
}
</style>
