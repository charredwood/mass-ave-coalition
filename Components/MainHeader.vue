<template>
  <header class="header">
    <div class="left">
      <input
        id="site-search"
        type="search"
        name="q"
        aria-label="Search through site content"
        placeholder="Search..."
        class="search-bar"
        disabled
      />
    </div>
    <div class="title-container">
      <h1>Collective History</h1>
    </div>
    <div class="right">
      <nav>
        <a href="#" style="font-size: 100%" @click="showModal">About</a>
      </nav>
    </div>
  </header>
  <AboutModal
    :visible="isModalVisible"
    @update:visible="isModalVisible = $event"
  />
</template>

<script setup>
import { ref } from 'vue'
import AboutModal from './About.vue'

const isModalVisible = ref(false)

function showModal() {
  isModalVisible.value = true
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #25a69a;
  height: 60px;
  padding: 0 20px;
}

.header .title-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header .left {
  justify-content: flex-start;
  width: 30%;
}

.header .right {
  justify-content: flex-end;
}

.search-bar {
  width: 100%;
  height: 40px;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 5px;
}

.header h1 {
  font-size: 110%;
  font-weight: bold;
  margin: 0;
  text-align: center;
}

.header nav a {
  color: black;
  font-size: 20px;
  margin-right: 20px;
}
</style>
