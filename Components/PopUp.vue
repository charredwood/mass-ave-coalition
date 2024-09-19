<template>
  <div v-if="isPopupVisible" class="overlay" @click="closePopup">
    <div
      class="popup"
      :style="{
        left: x + 'px',
        top: y - height + 'px',
      }"
      @click.stop
    >
      <div class="popupHeader">
        <button class="close-button" @click="closePopup">[Close]</button>
        <p class="dateStyle">{{ popUpProperties.object['YEAR'] }}</p>
        <p class="titleStyle">
          {{ popUpProperties.object['EVENT_NAME'] }}
          {{ popUpProperties.object['TITLE'] }}
        </p>
      </div>
      <div class="popupBody">
        <div class="scrollableImage">
          <img
            :src="popUpProperties.object['IMG_SOURCE']"
            style="width: auto; height: 100%"
          />
        </div>
        <div class="scrollableText">
          <p class="bodySpacing">{{ popUpProperties.object['DESCRIPTION'] }}</p>
        </div>
        <p class="bodySpacing">
          <b style="color: #25a69a">Location </b>
          {{ popUpProperties.object['LOCATION_NAME'] }} <br />
          {{ popUpProperties.object['ADDRESS'] }}
        </p>
        <p>Source: {{ popUpProperties.object['SOURCE_NAME'] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  popUpProperties: Object,
})

const isPopupVisible = ref(true)
const height = 25

function closePopup() {
  isPopupVisible.value = false
}

const popupStyle = computed(() => {
  let x = popUpProperties.x
  let y = popUpProperties.y - height

  // Get viewport dimensions
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Popup dimensions
  const popupWidth = 450
  const popupHeight = 0 // Approximate height; unrelated to the actual size

  // Adjust x and y to keep the popup within the viewport, margins are set as 10 px
  if (x + popupWidth > viewportWidth) {
    x = viewportWidth - popupWidth - 10
  }
  if (x < 0) {
    x = 10
  }
  if (y + popupHeight > viewportHeight) {
    y = viewportHeight - popupHeight - 10
  }
  if (y < 0) {
    y = 10
  }

  return {
    left: x + 'px',
    top: y + 'px',
  }
})
</script>

<style scoped>
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  height: auto;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 10;
  border-radius: 20px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
  max-height: auto;
  overflow: scroll;
  scrollbar-color: #25a69a transparent;
  scrollbar-width: thin;
}

.popupHeader {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  height: max-content;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1001;
  border-bottom: 1px solid #d3d3d3;
}

.popupBody {
  position: relative;
  padding: 20px;
  font-size: 0.8em;
  font-weight: normal;
  display: flex;
  flex-direction: column;
}

.scrollableText {
  max-height: 40vh;
  overflow-y: auto;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;

  /* Hide scrollbar arrows (buttons) */
  scrollbar-arrow-color: transparent;

  /* Custom scrollbar styles */
  scrollbar-color: #25a69a transparent;
  scrollbar-width: thin;
}

/* For Webkit browsers (Chrome, Safari) */
.scrollableText::-webkit-scrollbar {
  width: 8px;
  /* width of the entire scrollbar */
}

.scrollableText::-webkit-scrollbar-track {
  background: transparent;
  /* color of the tracking area */
}

.scrollableText::-webkit-scrollbar-thumb {
  background-color: #25a69a;
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 3px solid transparent;
  /* creates padding around scroll thumb */
}

.scrollableImage {
  max-height: 40vh;
  overflow-y: scroll;
  margin-bottom: 10px;
  padding-bottom: 10px;

  /* Custom scrollbar styles */
  scrollbar-color: #25a69a transparent;
  /* thumb and track color */
  scrollbar-width: thin;
}

/* For Webkit browsers (Chrome, Safari) */
.scrollableImage::-webkit-scrollbar {
  width: 8px;
  /* width of the entire scrollbar */
}

.scrollableImage::-webkit-scrollbar-track {
  background: white;
  /* color of the tracking area */
}

.scrollableImage::-webkit-scrollbar-thumb {
  background-color: #25a69a;
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 3px solid transparent;
  /* creates padding around scroll thumb */
}

.bodySpacing {
  margin-bottom: 10px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 0.8em;
  cursor: pointer;
}

.dateStyle {
  font-size: 1em;
  font-weight: bold;
  color: #25a69a;
}

.titleStyle {
  font-size: 1em;
  font-weight: bold;
}
</style>
