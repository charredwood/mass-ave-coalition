<script setup>
import { ref } from 'vue';
import AboutModal from './About.vue';

const isModalVisible = ref(false);

function showModal() {
  isModalVisible.value = true;
}
</script>

<template>
  <header class="header">
    <div class="left">
      <input type="search" id="site-search" name="q" aria-label="Search through site content" placeholder="Search..."
        class="search-bar" disabled>
    </div>
    <div class="title-container">
      <h1>Collective History</h1>
    </div>
    <div class="right">
      <nav>
        <a href="#" @click="showModal">About</a>
      </nav>
    </div>
  </header>
  <AboutModal :visible="isModalVisible" @update:visible="isModalVisible = $event" />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* This ensures the children are spaced out evenly */
  background-color: #25A69A;
  height: 60px;
  padding: 0 20px;
}

.header .left,
.header .right,
.header .title-container {
  flex: 1;
  /* Each section takes up equal space */
  display: flex;
  justify-content: center;
  /* This centers the content of each section */
}

.header .left {
  justify-content: flex-start;
  /* Aligns the search bar to the left */
}

.header .right {
  justify-content: flex-end;
  /* Aligns the navigation to the right */
}

.search-bar {
  width: 350px;
  height: 40px;

  border: 1px solid #d6d6d6;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 5px;
}

.header .left,
.header .right,
.header .title-container {
  flex: 1;
  /* Each section takes up equal space */
  display: flex;
  justify-content: center;
  /* This centers the content of each section */
}

.header .left {
  justify-content: flex-start;
  /* Aligns the search bar to the left */
}

.header .right {
  justify-content: flex-end;
  /* Aligns the navigation to the right */
}

.search-bar {
  width: 350px;
  height: 40px;

  border: 1px solid #d6d6d6;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 5px;
}

.header h1 {
  font-size: 40px;
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
