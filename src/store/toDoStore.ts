import { defineStore } from 'pinia';
import { Task } from '../types';
import swal from 'sweetalert2';
import { api } from '../service/api';

export const useToDoStore = defineStore('sessionStore', {
    state: () => ({
        listOfTask: [] as Task[],
        markAll: false,
    }),
    getters: {
    },
    actions: {
        async createTask(newTask: Task) {
            this.listOfTask.push(newTask);            
            await this.saveTasks();
        },
        markAsSelected(id: number) {
            const found = this.listOfTask.find(x => x.id === id);
            if (!found) {
                return;
            }
            found.selected = !found.selected;
        },
        async markAsCompleted() {
            this.listOfTask.forEach(task => {
                if (task.selected) {
                    task.completed = true;
                    task.selected = false;
                }
            });
            if (this.markAll) {
                this.markAll = false;
            }
            await this.saveTasks();
        },
        async markAsNotCompleted() {
            this.listOfTask.forEach(task => {
                if (task.selected) {
                    task.completed = false;
                    task.selected = false;
                }
            });
            if (this.markAll) {
                this.markAll = false;
            }
            await this.saveTasks();
        },
        toggleMark() {
            this.markAll = !this.markAll;
            this.listOfTask.forEach(task => {
                task.selected = this.markAll;
            });
        },
        async removeTask(id: number) {
            if (!id) {
                return;
            }
            const foundTask = this.listOfTask.find(x => x.id === id);
            if (!foundTask) {
                return;
            }
            const swalResult = await swal.fire({
                icon: 'warning',
                text: `Are you sure you want to remove '${foundTask.name}' task ?`
            });

            if (swalResult.isConfirmed) {
                this.listOfTask = this.listOfTask.filter(x => x.id !== id);
            }
            await this.saveTasks();
        },
        async getTasks() {
            swal.showLoading();
            // const response = await api.getTasks();
            // if (!response.data || response.error) {
            //     swal.fire({
            //         icon:'error',
            //         text: response.errorMessage ?? response.error
            //     });
            //     return;
            // }
            // this.listOfTask = response.data;
            // swal.close();
            setTimeout(() => {
                const stored = localStorage.getItem('tasks');
                if (stored) {
                    this.listOfTask = JSON.parse(stored);
                }
                swal.close();
            }, 3000);
        },
        async saveTasks() {
            swal.showLoading();
            // const response = await api.saveTasks(this.listOfTask);
            // if (!response.data || response.error) {
            //     swal.fire({
            //         icon: 'error',
            //         text: response.errorMessage ?? response.error
            //     });
            //     return;
            // }
            // if (response.data) {
            //     swal.fire({
            //         icon: 'success',
            //         text: 'Tasks are save',
            //         timer: 1500,
            //         showCancelButton: false,
            //         showConfirmButton: false
            //     });
            //     return;
            // }
            // swal.close();
            setTimeout(() => {
                localStorage.setItem('tasks', JSON.stringify(this.listOfTask));
                swal.close();
            }, 500);
        },
        async deleteSelected() {
            this.listOfTask = this.listOfTask.filter(x => !x.selected);
            this.markAll = false;
            await this.saveTasks();
        }
    },
})