<template>
  <div class="popup" :style="{ left: popUpProperties.x + 'px', top: popUpProperties.y - height + 'px' }">
    <h2>{{ popUpProperties.object['TITLE'] }}</h2>
    <p>{{ popUpProperties.object['DESCRIPTION'] }}</p>
  </div>
</template>

<script setup>


function openPopup() {
  state.showPopup = true
}

function closePopup() {
  state.showPopup = false
}

const props = defineProps({
  popUpProperties: Object,
});

const height = 25
</script>

<style scoped>
.popup {
  position: fixed;
  width: 300px;
  height: auto;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 10;
  border-radius: 20px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);

}

.popup::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 10px solid white;
  transform: translateX(-50%);
}
</style>
