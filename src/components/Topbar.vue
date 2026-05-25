<script setup>
defineProps({
  searchQuery: String
})

defineEmits(['open-modal', 'search'])
</script>

<template>
  <header class="topbar">
    <input
        :value="searchQuery"
        @input="$emit('search', $event.target.value)"
        type="text"
        placeholder="Search tasks..."
    />

    <button @click="$emit('open-modal')">
      New Task
    </button>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

input {
  width: 300px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #1e293b;
  color: white;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  opacity: 0.8;
}

@media (max-width: 900px) {
  .topbar {
    flex-direction: column;
    gap: 20px;
  }

  input {
    width: 100%;
  }
}
</style>