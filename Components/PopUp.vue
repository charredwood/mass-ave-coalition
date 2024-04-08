<template>
  <div class="popup" :class="{ left: popUpProperties.x + 'px', top: popUpProperties.y + 'px' }">
    <!-- <button @click=" closePopup">Close</button> -->
    <h2>{{ popUpProperties.object['TITLE'] }}</h2>
    <p>{{ popUpProperties.object['DESCRIPTION'] }}</p>
  </div>
</template>

<script setup>


function openPopup(title, message) {
  state.title = title
  state.message = message
  state.showPopup = true
}

function closePopup() {
  state.showPopup = false
}

const props = defineProps({
  popUpProperties: Object,
});
</script>

<style scoped>
.popup {
  position: fixed;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
  background: red;
  padding: 20px;
  border: 1px solid black;
  z-index: 1000;

}
</style>
