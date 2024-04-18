<template>
  <div class="popup" :style="{ left: popUpProperties.x + 'px', top: popUpProperties.y - height + 'px' }">
    <div class="popupHeader">
      <button class="close-button" onclick="closePopup()">[Close]</button>
      <p class="dateStyle">{{ popUpProperties.object['YEAR'] }}</p>
      <p class="titleStyle">
        {{ popUpProperties.object['EVENT_NAME'] }}
        {{ popUpProperties.object['TITLE'] }}
      </p>
    </div>
    <div class="popupBody">
      <div>
        <img
          :src="popUpProperties.object['IMG_SOURCE']"
          style="width: 100%; height: auto"
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

const height = 25

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
  max-height: 70vh;
  overflow: hidden;
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
  scrollbar-color: #25a69a transparent; /* thumb and track color */
  scrollbar-width: thin;
}

/* For Webkit browsers (Chrome, Safari) */
.scrollableText::-webkit-scrollbar {
  width: 8px; /* width of the entire scrollbar */
}

.scrollableText::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
}

.scrollableText::-webkit-scrollbar-thumb {
  background-color: #25a69a; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid transparent; /* creates padding around scroll thumb */
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