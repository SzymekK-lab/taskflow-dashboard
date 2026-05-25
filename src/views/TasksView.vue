<script setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const searchQuery = ref('')
const selectedPriority = ref('All')

const allTasks = computed(() => {
  return taskStore.columns.flatMap(column =>
      column.tasks.map(task => ({
        ...task,
        status: column.title
      }))
  )
})

const filteredTasks = computed(() => {
  return allTasks.value.filter(task => {
    const matchesSearch =
        task.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())

    const matchesPriority =
        selectedPriority.value === 'All' ||
        task.priority === selectedPriority.value

    return matchesSearch && matchesPriority
  })
})
</script>

<template>
  <section class="tasks-page">
    <div class="tasks-header">
      <h1>Tasks</h1>

      <div class="filters">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tasks..."
        />

        <select v-model="selectedPriority">
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
    </div>

    <div class="tasks-table">
      <div class="table-head">
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Deadline</span>
      </div>

      <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="table-row"
      >
        <div class="task-info">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>

        <div class="status">
          {{ task.status }}
        </div>

        <div
            class="priority"
            :class="task.priority.toLowerCase()"
        >
          {{ task.priority }}
        </div>

        <div class="deadline">
          {{ task.dueDate }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tasks-page h1 {
  font-size: 32px;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
}

.filters {
  display: flex;
  gap: 15px;
}

.filters input,
.filters select {
  background: var(--card-color);

  border: none;

  color: var(--text-color);

  padding: 14px;

  border-radius: 12px;
}

.tasks-table {
  background: var(--card-color);

  border-radius: 24px;

  overflow: hidden;
}

.table-head,
.table-row {
  display: grid;

  grid-template-columns: 2fr 1fr 1fr 1fr;

  padding: 20px;

  align-items: center;
}

.table-head {
  background: var(--card-color);

  font-weight: bold;

  color: var(--text-color);
}

.table-row {
  border-top: 1px solid #1e293b;
}

.task-info h3 {
  margin-bottom: 5px;
}

.task-info p {
  color: var(--text-color);
  font-size: 14px;
}

.priority {
  width: fit-content;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 13px;

  font-weight: bold;
}

.high {
  background: var(--card-color);
  color: var(--text-color);
}

.medium {
  background: var(--card-color);
  color: var(--text-color);
}

.low {
  background: var(--card-color);
  color: var(--text-color);
}

.status {
  color: var(--text-color);
}

.deadline {
  color: var(--text-color);
}

@media (max-width: 900px) {
  .table-head,
  .table-row {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .tasks-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .filters {
    width: 100%;
    flex-direction: column;
  }
}
</style>