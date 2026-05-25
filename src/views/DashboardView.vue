<script setup>
import { computed, ref } from 'vue'

import draggable from 'vuedraggable'

import { useTaskStore } from '../stores/taskStore'
import { useSettingsStore } from '../stores/settingsStore'

const taskStore = useTaskStore()
const settingsStore = useSettingsStore()

const showModal = ref(false)

const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref('Medium')
const newTaskDate = ref('')

const editingTask = ref(null)

const translations = {
  en: {
    dashboard: 'Dashboard',
    completed: 'Completed Tasks',
    active: 'Active Tasks',
    productivity: 'Productivity',
    deadlines: 'Deadlines',
    todo: 'TODO',
    progress: 'IN PROGRESS',
    done: 'DONE',
    noDeadline: 'No deadline',
    delete: 'Delete',
    edit: 'Edit',
    newTask: 'New Task',
    createTask: 'Create New Task',
    title: 'Task title',
    description: 'Task description',
    cancel: 'Cancel',
    addTask: 'Add Task',
    editTask: 'Edit Task',
    save: 'Save',
    search: 'Search tasks...'
  },

  pl: {
    dashboard: 'Panel',
    completed: 'Ukończone',
    active: 'Aktywne',
    productivity: 'Produktywność',
    deadlines: 'Terminy',
    todo: 'DO ZROBIENIA',
    progress: 'W TRAKCIE',
    done: 'GOTOWE',
    noDeadline: 'Brak terminu',
    delete: 'Usuń',
    edit: 'Edytuj',
    newTask: 'Nowe zadanie',
    createTask: 'Dodaj zadanie',
    title: 'Tytuł zadania',
    description: 'Opis zadania',
    cancel: 'Anuluj',
    addTask: 'Dodaj',
    editTask: 'Edytuj zadanie',
    save: 'Zapisz',
    search: 'Szukaj zadań...'
  }
}

const t = computed(() => {
  return translations[settingsStore.language]
})

const completedTasks = computed(() => {
  return taskStore.columns[2].tasks.length
})

const activeTasks = computed(() => {
  return (
      taskStore.columns[0].tasks.length +
      taskStore.columns[1].tasks.length
  )
})

const productivity = computed(() => {
  const total =
      completedTasks.value + activeTasks.value

  if (total === 0) return 0

  return Math.round(
      (completedTasks.value / total) * 100
  )
})

const deadlines = computed(() => {
  let count = 0

  taskStore.columns.forEach((column) => {
    column.tasks.forEach((task) => {
      if (task.dueDate) {
        count++
      }
    })
  })

  return count
})

const openEditModal = (task) => {
  editingTask.value = task
}
</script>

<template>
  <section class="dashboard-page">
    <div class="top-bar">
      <input
          type="text"
          :placeholder="t.search"
      />

      <button
          class="new-task-btn"
          @click="showModal = true"
      >
        {{ t.newTask }}
      </button>
    </div>

    <h1>{{ t.dashboard }}</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          ✅
        </div>

        <h3>{{ t.completed }}</h3>

        <h2>{{ completedTasks }}</h2>

        <p>+12% from last week</p>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          🔥
        </div>

        <h3>{{ t.active }}</h3>

        <h2>{{ activeTasks }}</h2>

        <p>+12% from last week</p>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          📈
        </div>

        <h3>{{ t.productivity }}</h3>

        <h2>{{ productivity }}</h2>

        <p>+12% from last week</p>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          ⏰
        </div>

        <h3>{{ t.deadlines }}</h3>

        <h2>{{ deadlines }}</h2>

        <p>+12% from last week</p>
      </div>
    </div>

    <div class="columns">
      <div
          v-for="(column, columnIndex) in taskStore.columns"
          :key="column.title"
          class="column"
      >
        <h2>
          {{
            column.title === 'TODO'
                ? t.todo
                : column.title === 'IN PROGRESS'
                    ? t.progress
                    : t.done
          }}
        </h2>

        <draggable
            :list="column.tasks"
            group="tasks"
            item-key="id"
            animation="200"
            class="draggable-list"
        >
          <template #item="{ element, index }">
            <div class="task-card">
              <h3>{{ element.title }}</h3>

              <p>
                {{ element.description }}
              </p>

              <div
                  class="priority-badge"
                  :class="
                  element.priority.toLowerCase()
                "
              >
                {{ element.priority }}
              </div>

              <div class="date-badge">
                {{
                  element.dueDate ||
                  t.noDeadline
                }}
              </div>

              <div class="task-actions">
                <button
                    class="delete-btn"
                    @click="
                    taskStore.deleteTask(
                      columnIndex,
                      index
                    )
                  "
                >
                  {{ t.delete }}
                </button>

                <button
                    class="edit-btn"
                    @click="
                    openEditModal(element)
                  "
                >
                  {{ t.edit }}
                </button>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <div
        v-if="showModal"
        class="modal-overlay"
    >
      <div class="modal">
        <h2>{{ t.createTask }}</h2>

        <input
            v-model="newTaskTitle"
            type="text"
            :placeholder="t.title"
        />

        <textarea
            v-model="newTaskDescription"
            :placeholder="t.description"
        ></textarea>

        <select
            v-model="newTaskPriority"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
            v-model="newTaskDate"
            type="date"
        />

        <div class="modal-actions">
          <button
              class="cancel-btn"
              @click="showModal = false"
          >
            {{ t.cancel }}
          </button>

          <button
              class="save-btn"
              @click="
              taskStore.addTask({
                id:
                  Date.now() +
                  Math.random(),

                title: newTaskTitle,
                description:
                  newTaskDescription,
                priority:
                  newTaskPriority,
                dueDate: newTaskDate
              });

              showModal = false;

              newTaskTitle = '';
              newTaskDescription = '';
              newTaskPriority =
                'Medium';
              newTaskDate = '';
            "
          >
            {{ t.addTask }}
          </button>
        </div>
      </div>
    </div>

    <div
        v-if="editingTask"
        class="modal-overlay"
    >
      <div class="modal">
        <h2>{{ t.editTask }}</h2>

        <input
            v-model="editingTask.title"
            type="text"
        />

        <textarea
            v-model="
            editingTask.description
          "
        ></textarea>

        <select
            v-model="
            editingTask.priority
          "
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
            v-model="
            editingTask.dueDate
          "
            type="date"
        />

        <div class="modal-actions">
          <button
              class="cancel-btn"
              @click="
              editingTask = null
            "
          >
            {{ t.cancel }}
          </button>

          <button
              class="save-btn"
              @click="
              editingTask = null
            "
          >
            {{ t.save }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard-page {
  color: var(--text-color);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 40px;
}

.top-bar input {
  width: 320px;

  background: var(--card-color);

  border: none;

  color: var(--text-color);

  padding: 16px;

  border-radius: 16px;
}

.new-task-btn {
  background: #6366f1;

  border: none;

  color: white;

  padding: 16px 24px;

  border-radius: 16px;

  cursor: pointer;

  font-weight: bold;
}

.dashboard-page h1 {
  font-size: 52px;

  margin-bottom: 40px;
}

.stats-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 25px;

  margin-bottom: 50px;
}

.stat-card {
  background: var(--card-color);

  border-radius: 28px;

  padding: 30px;

  position: relative;
}

.stat-icon {
  position: absolute;

  top: 25px;
  right: 25px;

  background: rgba(99, 102, 241, 0.2);

  padding: 12px;

  border-radius: 14px;
}

.stat-card h3 {
  color: var(--secondary-text);

  margin-bottom: 25px;
}

.stat-card h2 {
  font-size: 52px;

  margin-bottom: 10px;
}

.stat-card p {
  color: #22c55e;

  font-weight: bold;
}

.columns {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 40px;
}

.column h2 {
  margin-bottom: 20px;

  color: var(--secondary-text);
}

.draggable-list {
  min-height: 400px;
}

.task-card {
  background: var(--card-color);

  border-radius: 24px;

  padding: 24px;

  margin-bottom: 20px;

  border: 1px solid #6366f1;
}

.task-card h3 {
  margin-bottom: 10px;
}

.task-card p {
  color: var(--secondary-text);

  margin-bottom: 20px;
}

.priority-badge {
  width: fit-content;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 13px;

  font-weight: bold;

  margin-bottom: 15px;
}

.high {
  background: rgba(239, 68, 68, 0.2);

  color: #ef4444;
}

.medium {
  background: rgba(245, 158, 11, 0.2);

  color: #f59e0b;
}

.low {
  background: rgba(34, 197, 94, 0.2);

  color: #22c55e;
}

.date-badge {
  color: var(--secondary-text);

  margin-bottom: 20px;
}

.task-actions {
  display: flex;

  gap: 10px;
}

.delete-btn,
.edit-btn,
.cancel-btn,
.save-btn {
  border: none;

  padding: 12px 18px;

  border-radius: 12px;

  color: white;

  cursor: pointer;

  font-weight: bold;
}

.delete-btn {
  background: #ef4444;
}

.edit-btn {
  background: #6366f1;
}

.cancel-btn {
  background: #475569;
}

.save-btn {
  background: #6366f1;
}

.modal-overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.6);

  backdrop-filter: blur(10px);

  display: flex;

  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal {
  background: var(--sidebar-color);

  width: 500px;

  padding: 40px;

  border-radius: 32px;
}

.modal h2 {
  margin-bottom: 30px;

  font-size: 42px;
}

.modal input,
.modal textarea,
.modal select {
  width: 100%;

  background: var(--card-color);

  border: none;

  color: var(--text-color);

  padding: 18px;

  border-radius: 18px;

  margin-bottom: 20px;
}

.modal textarea {
  height: 140px;

  resize: none;
}

.modal-actions {
  display: flex;

  justify-content: flex-end;

  gap: 15px;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .top-bar {
    flex-direction: column;

    gap: 20px;

    align-items: flex-start;
  }

  .top-bar input {
    width: 100%;
  }

  .modal {
    width: 90%;
  }
}
</style>