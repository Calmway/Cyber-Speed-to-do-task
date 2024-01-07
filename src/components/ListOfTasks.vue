<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <SearchAddRemoveTask @found-matched="foundMatched"></SearchAddRemoveTask>
    <div class="my_todo_app_container sm:mx-auto sm:w-full sm:max-w-sm">
        <p>List of Tasks:</p>
        <div class="task_header" style="margin:  0 auto; margin-bottom: 20px;">
            <div>
                <div class="flex h-6 items-center">
                    <input @input="useStore.toggleMark" id="comments" name="comments" type="checkbox"
                        :checked="useStore.markAll" :value="useStore.markAll"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                </div>
            </div>
            <div>Task</div>
            <div></div>
        </div>
        <div class="list_of_tasks">
            <OneTask :duplicated="duplicatedTask"></OneTask>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                @click="deleteSelected"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                <button type="button"
                @click="markAsNotCompleted"
                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Mark
                    as not completed</button>
                <button type="button"
                @click="markAsCompleted"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 sm:mt-0 sm:w-auto">Mark
                    as completed</button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import { useToDoStore } from "../store/toDoStore";
import SearchAddRemoveTask from './SearchAddRemoveTask.vue';
import OneTask from './Task.vue';
export default {
    name: "MyAppToDo",
    components: { SearchAddRemoveTask, OneTask },
    setup() {
        const duplicatedTask = ref("");
        const useStore = useToDoStore();
        function foundMatched(foundName: string) {
            duplicatedTask.value = foundName;
        }
        async function markAsCompleted() {
            await useStore.markAsCompleted();
        }
        async function markAsNotCompleted() {
            await useStore.markAsNotCompleted();
        }
        async function deleteSelected() {
            await useStore.deleteSelected();
        }
        return {
            useStore,
            duplicatedTask,
            foundMatched,
            markAsCompleted,
            markAsNotCompleted,
            deleteSelected
        }
    },
}
</script>
  
<style scoped>
.task,
.task_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    margin-bottom: 15px;
    padding: 15px;
}
</style>
  