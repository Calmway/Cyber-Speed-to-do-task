<template>
 <my-app-to-do class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"></my-app-to-do>
</template>

<script  lang="ts">
import MyAppToDo from './components/MyAppToDo.vue';
export default {
  name: "App",
  components: {
    MyAppToDo
  },
  setup() {
  },
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
