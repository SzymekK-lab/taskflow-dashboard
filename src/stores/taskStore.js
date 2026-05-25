import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
    const columns = ref(
        JSON.parse(localStorage.getItem('columns')) || [
            {
                title: 'TODO',

                tasks: [
                    {
                        id: Date.now() + Math.random(),
                        title: 'Design Landing Page',
                        description: 'Create modern UI for homepage',
                        priority: 'High',
                        dueDate: '2026-05-30'
                    },

                    {
                        id: Date.now() + Math.random(),
                        title: 'Create Mobile Layout',
                        description: 'Responsive design for tablets',
                        priority: 'Medium',
                        dueDate: '2026-06-02'
                    }
                ]
            },

            {
                title: 'IN PROGRESS',

                tasks: [
                    {
                        id: Date.now() + Math.random(),
                        title: 'API Integration',
                        description: 'Connect frontend with backend',
                        priority: 'High',
                        dueDate: '2026-06-05'
                    }
                ]
            },

            {
                title: 'DONE',

                tasks: [
                    {
                        id: Date.now() + Math.random(),
                        title: 'Setup Project',
                        description: 'Initialize Vue application',
                        priority: 'Low',
                        dueDate: '2026-05-25'
                    }
                ]
            }
        ]
    )
    const completedTasks = computed(() => {
        const doneColumn = columns.value.find(
            column => column.title === 'DONE'
        )

        return doneColumn.tasks.length
    })

    const activeTasks = computed(() => {
        return columns.value.reduce(
            (total, column) => total + column.tasks.length,
            0
        )
    })

    const productivity = computed(() => {
        if (activeTasks.value === 0) return 0

        return Math.round(
            (completedTasks.value / activeTasks.value) * 100
        )
    })

    const deadlines = computed(() => {
        const today = new Date()

        let count = 0

        columns.value.forEach(column => {
            column.tasks.forEach(task => {
                if (!task.dueDate) return

                const dueDate = new Date(task.dueDate)

                if (dueDate >= today) {
                    count++
                }
            })
        })

        return count
    })

    const addTask = (task) => {
        columns.value[0].tasks.push(task)
    }

    const deleteTask = (columnIndex, taskIndex) => {
        columns.value[columnIndex].tasks.splice(taskIndex, 1)
    }

    watch(
        columns,
        (newValue) => {
            localStorage.setItem(
                'columns',
                JSON.stringify(newValue)
            )
        },
        { deep: true }
    )

    return {
        columns,
        completedTasks,
        activeTasks,
        productivity,
        addTask,
        deleteTask,
        deadlines
    }
})