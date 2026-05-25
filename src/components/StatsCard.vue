<script setup>
defineProps({
  title: String,
  value: Number,
  icon: String
})
</script>

<template>
  <div class="stats-card">
    <div class="top">
      <span>{{ title }}</span>

      <div class="icon">
        {{ icon }}
      </div>
    </div>

    <h2>{{ value }}</h2>

    <p>+12% from last week</p>
  </div>
</template>

<style scoped>
.stats-card {
  background: #1e293b;
  border-radius: 24px;
  padding: 25px;
  transition: 0.3s;
  border: 1px solid transparent;
}

.stats-card:hover {
  transform: translateY(-5px);
  border-color: #6366f1;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.top span {
  color: #94a3b8;
  font-size: 15px;
}

.icon {
  width: 42px;
  height: 42px;

  border-radius: 12px;

  background: rgba(99, 102, 241, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
}

h2 {
  font-size: 34px;
  margin-bottom: 10px;
}

p {
  color: #22c55e;
  font-size: 14px;
}
</style>