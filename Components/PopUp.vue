<template>
  <div v-if="state.showPopup" class="popup">
    <button @click="closePopup">Close</button>
    <h2>{{ state.title }}</h2>
    <p>{{ state.message }}</p>
  </div>
</template>

<script setup>
const state = reactive({
  showPopup: false,
  title: '',
  message: '',
})

function openPopup(title, message) {
  state.title = title
  state.message = message
  state.showPopup = true
}

function closePopup() {
  state.showPopup = false
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid black;
  z-index: 1000;
}
</style>
