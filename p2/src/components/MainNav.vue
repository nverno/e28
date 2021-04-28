<template>
  <nav>
    <ul>
      <li>
        <router-link
          v-for="{ name, path } in links"
          :key="name"
          :to="path"
        >
          {{ name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "MainNav",
  data() {
    return {
      links: [{
        name: 'Home',
        path: '/',
      }, {
        name: 'Create List',
        path: '/list/new',
      }],
    }
  },
}
</script>

<style>

</style>
