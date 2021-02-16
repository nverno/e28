<template>
  <div class="shopping">
    <h1>Shopping List</h1>

    <label>
      Item:
      <input v-model="item" type="text" />
      <button v-on:click="addItem()">Add</button>
    </label>

    <p v-if="!hasItems()">
      <i>You have no items on your list.</i>
    </p>

    <div v-if="hasItems()" class="list">
      <div>
        <p>Item count: {{ items.length }}</p>
      </div>
      <ul>
        <li v-for="it in items" v-bind:key="it">{{ it }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingList',
  props: {},
  data() {
    return {
      item: null,
      items: [],
    };
  },
  methods: {
    hasItems() {
      return this.items.length > 0;
    },
    addItem() {
      this.items.push(this.item);
      this.item = '';
    },
  },
};
</script>

<style scoped>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
}
</style>
