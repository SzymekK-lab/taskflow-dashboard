<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="sidebar">
    <h2 class="logo">TaskFlow</h2>

    <nav>
      <ul>
        <RouterLink to="/" active-class="active-link">
          <li>Dashboard</li>
        </RouterLink>

        <RouterLink to="/tasks" active-class="active-link">
          <li>Tasks</li>
        </RouterLink>

        <RouterLink to="/analytics" active-class="active-link">
          <li>Analytics</li>
        </RouterLink>

        <RouterLink to="/settings" active-class="active-link">
          <li>Settings</li>
        </RouterLink>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #111827;
  padding: 30px;
  border-right: 1px solid #1f2937;
}

.logo {
  font-size: 28px;
  margin-bottom: 50px;
  color: #6366f1;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: white;
}

li {
  padding: 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
}

li:hover {
  background: #1e293b;
}

@media (max-width: 900px) {
  .sidebar {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar ul {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
}

.active-link li {
  background: #1e293b;
  border: 1px solid #6366f1;
}
</style>