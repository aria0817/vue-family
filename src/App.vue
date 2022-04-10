<template>
  <div id="app">
    <router-link to="/">component A</router-link>
    |
    <router-link to="/b">component B</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import ax from "./components/a.vue";
import bx from "./components/b.vue";
export default {
  name: "App",
  components: {
    ax,
    bx,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
