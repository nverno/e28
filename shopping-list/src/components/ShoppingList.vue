<template>
  <div class="shopping">
    <h1>Shopping List</h1>
    <label>Qty:
      <input v-model="qty" type="number">
    </label>

    <label>
      Item:
      <input v-model="item" @keyup.enter="addItem()" type="text" />
      <button @click="addItem()">Add</button>
    </label>

    <p v-if="!hasItems()">
      <i>You have no items on your list.</i>
    </p>

    <div v-if="hasItems()" class="list">
      <div>
        <p>Item count: {{ total }}</p>
      </div>
      <ul>
        <li v-for="it in items" v-bind:key="it">
          <button @click="remove(it)">x</button>
          {{ it }}
        </li>
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
      qty: null,
      items: [
        { item: 'Oranges', qty: 4 },
        { item: 'Milk (gallon)', qty: 1 },
        { item: 'Sweet potatoes', qty: 6 },
        { item: 'Garlic clove', qty: 1 },
      ],
    };
  },
  computed: {
    total() {
      return this.items.reduce((acc, item) => acc + item.qty, 0);
    }
  },
  methods: {
    hasItems() {
      return this.items.length > 0;
    },
    remove({ item, }) {
      const ind = this.items.findIndex(it => it.item === item);
      if (ind !== -1)
        this.items.splice(ind, 1);
    },
    addItem() {
      this.items.push({
        item: this.item,
        qty: this.qty,
      });
      this.item = '';
      this.qty = null;
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
