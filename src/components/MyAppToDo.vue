<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my_todo_app_container space-y-12">
    <ListOfTasks></ListOfTasks>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useToDoStore } from "../store/toDoStore";
import ListOfTasks from './ListOfTasks.vue';
export default {
  name: "MyAppToDo",
  components: { ListOfTasks },
  setup() {
    const useStore = useToDoStore();
    onMounted(async () => {
      await useStore.getTasks();
    })
    return {
      useStore,
    }
  },
}
</script>

<style scoped></style>
