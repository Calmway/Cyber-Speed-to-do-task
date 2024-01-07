<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="task" v-for="task in useStore.listOfTask" :key="task.id" :class="task.completed ? 'task_completed bg-indigo-600' : ''"  @click="useStore.markAsSelected(task.id)">
        <div>
            <div class="flex h-6 items-center">
                <input @input="useStore.markAsSelected(task.id)" id="comments" name="comments" type="checkbox"
                    :checked="task.selected" :value="task.selected"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
            </div>
        </div>
        <div style="display: flex; gap: 15px;">
            <span>
                <check v-if="props.duplicated && props.duplicated === task.name.toLowerCase()"></check>
            </span>
            <span style="word-break: break-word;">{{ task.name }}</span>
        </div>
        <div>
            <trash style="cursor: pointer;" @click="removeTask(task.id)"></trash>
        </div>
    </div>
</template>
  
<script lang="ts">
import { useToDoStore } from "../store/toDoStore";
import check from './icons/check.vue'
import trash from './icons/trash.vue'
export default {
    name: "MyAppToDo",
    props: {
        duplicated: String
    },
    components: { check, trash },
    setup(props) {
        const useStore = useToDoStore();
        async function removeTask(id: number) {
            await useStore.removeTask(id);
        }
        return {
            useStore,
            removeTask,
            props
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

.task {
    border: 1px solid #f1f3f5;
    border-radius: 8px;
}

</style>
  