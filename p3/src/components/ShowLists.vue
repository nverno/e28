<template>
  <div id="show-lists">
    <h2 data-test="lists-header">Lists</h2>
    
    <div>
      <ul id="lists">
        <li v-for="{ id, name, } in lists" :key="id">
          <router-link
            class="list-link"
            :to="`/list/${id}`">
            <!-- TODO: Show [completed/total] ??? -->
            {{ name }}
          </router-link>
        </li>
      </ul>
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

<style lang="scss" scoped>
#show-lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    width: 40%;
    margin: 0 auto;
    border-bottom: 1px solid grey;
  }
}

#lists {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
}
</style>
