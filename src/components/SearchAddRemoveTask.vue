<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="search_bar sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="sm:col-span-3 input_wrapper">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Search or Add Task</label>
            <div class="mt-2">
                <input v-model.trim="addingTask" type="text" name="first-name" id="search-task" @keydown.esc="cancelSearch"
                    @keyup.enter="createTask" @input="foundMatched"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            <div class="input-icons">
                <Cancel v-if="addingTask" @click="cancelSearch" />
                <Add v-if="addingTask" :exist="exist" @click="createTask" />
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, computed } from 'vue';
import { useToDoStore } from "../store/toDoStore";
import { Task } from '../types';
import Add from './icons/add.vue';
import Cancel from './icons/cancel.vue';
import swal from 'sweetalert2';
export default {
    name: "MyAppToDo",
    components: { Add, Cancel },
    emits: ['addItem', 'foundMatched'],
    setup(props, { emit }) {
        const useStore = useToDoStore();
        const addingTask = ref("");
        const exist = computed(() =>
            useStore.listOfTask.some(
                (x: Task) =>
                    x.name.toLocaleLowerCase() == addingTask.value.toLocaleLowerCase()
            )
        );
        async function createTask() {
            if (!addingTask.value || exist.value) {
                return;
            }
            if (useStore.listOfTask.find(x => x.name === addingTask.value)) {
                swal.fire({icon: "info", text: "Task with same name already exist"})
                return;
            }
            let max = 0;
            if (useStore.listOfTask && useStore.listOfTask.length > 0) {
                let taskIds: number[] = [];
                taskIds = useStore.listOfTask.map(x => x.id);
                max = Math.max(...taskIds);
            }
            const newTask = new Task();
            newTask.id = max + 1;
            newTask.name = addingTask.value;
            await useStore.createTask(newTask);
            cancelSearch();
        }
        function foundMatched() {
            if (
                useStore.listOfTask.some(
                    (x: Task) =>
                        x.name.toLocaleLowerCase() == addingTask.value.toLocaleLowerCase()
                )
            ) {
                emit('foundMatched', addingTask.value.toLocaleLowerCase());
                return;
            } else {
                emit('foundMatched', '');
            }
        }
        function cancelSearch() {
            addingTask.value = '';
            emit('foundMatched', '');
        }
        return {
            useStore,
            addingTask,
            createTask,
            foundMatched,
            exist,
            cancelSearch
        }
    },
}
</script>
  
<style scoped>
.search_bar {
    margin: 0 auto;
}

.input_wrapper {
    position: relative;
}

.search_bar input {
    padding: 8px 25px;
    padding-inline-end: 72px;
}

.input-icons {
    position: absolute;
    right: 5%;
    top: 55%;
    display: flex;
}
</style>
  