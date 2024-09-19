<template>
  <div class="sidebar">
    <div class="collection tools">
      <el-menu>
        <el-sub-menu index="1">
          <template #title><span class="bold-title">FILTERS</span></template>
          <el-menu-item index="1-1">
            <el-checkbox v-model="imageLayerVisible">IMAGES</el-checkbox>
          </el-menu-item>
          <el-menu-item index="1-2">
            <el-checkbox v-model="eventLayerVisible">HISTORIES</el-checkbox>
          </el-menu-item>

          <div class="dual-slide-container" style="font-size: 14px">
            <div class="slider-label">
              <span>Time Range: </span>
              <span class="slider-value">{{ timeRangeValue.join(' - ') }}</span>
            </div>
            <el-slider
              v-model="timeRangeValue"
              :min="1620"
              :max="2024"
              range
              class="range-slider"
              :show-tooltip="false"
            >
            </el-slider>
          </div>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title><span class="bold-title">MAPS</span></template>
          <div class="dropdown-container">
            <div class="dropdown-label">
              <span style="margin-left: 30px">
                Base Map: 2024
                <br />
                Overlay Map: 1839
              </span>
            </div>
          </div>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <span class="bold-title">ADD YOUR HISTORY</span>
            <span class="attributeTag">BETA</span>
          </template>
          <el-menu-item index="3-1">
            <div
              style="align-items: center; display: flex; flex-direction: column"
            >
              <el-button round @click="toggleEditMode()"> Add Pins </el-button>
            </div>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDashboardUIStore } from '~/stores/dashboardUI'
import {
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElCheckbox,
  ElSlider,
  ElSwitch,
  ElIcon,
  ElButton,
} from 'element-plus'

const store = useDashboardUIStore()
const {
  imageLayerVisible,
  eventLayerVisible,
  timeRangeValue,
  map1839Visible,
  editCapable,
} = storeToRefs(store)

const { toggleEditMode } = store
const isEditMode = ref(false)

const mapYears = ref([...Array(405).keys()].map((x) => x + 1620)) // Years from 1620 to 2024

const baseMapValue = ref(1750)
const overlayMapValue = ref(1850)
const overlayOpacity = ref(50) // Default opacity set to 50%
const editCapacity = ref(false)
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 80px;
  left: 20px;
  height: auto;
  width: 30%;
  min-width: 200px;
  background-color: rgba(255, 255, 255, 1);
  padding: 5px;
  color: black;
  display: flex;
  flex-direction: column;
  z-index: 2;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  overflow: auto;
}

.el-menu--vertical {
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border-right: none;
}

.bold-title {
  font-weight: bold;
  font-size: 16px;
  overflow: auto;
}

.attributeTag {
  margin-left: 10px;
  font-size: 10px;
  font-weight: bold;
  color: #25a69a;
  overflow: visible;
  text-align: center;
  display: inline-block;
}

.el-sub-menu {
  margin-top: 0px;
  margin-bottom: 0px;
}

.dual-slide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

:deep(.el-slider__runway) {
  background: #d3d3d3 !important;
  height: 15px !important;
  border-radius: 15px !important;
}

:deep(.el-slider__bar) {
  background: #a7a7a7 !important;
  height: 15px !important;
}

:deep(.el-slider__button) {
  width: 15px !important;
  height: 15px !important;
  background: #25a69a !important;
  border-radius: 50% !important;
  border: 1px !important;

  transform: translateY(5px) !important;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 80%;
  height: 15px;
  background: #d3d3d3;
  outline: none;
  transition: opacity 0.2s;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* Slider Handle */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #25a69a;
  cursor: pointer;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #25a69a;
  cursor: pointer;
  border-radius: 50%;
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.dropdown-label {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Ensure minimal but adequate spacing between rows */
  font-size: 14px;
  color: #333;
  width: 100%;
  justify-content: space-between;
}

.dropdown {
  width: 30%; /* Adjust if necessary */
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.opacity-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 50px; /* Smaller width for compact design */
  height: 15px;
  background: #d3d3d3;
  outline: none;
  transition: opacity 0.2s;
  border-radius: 10px;
}

.opacity-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #25a69a;
  cursor: pointer;
  border-radius: 50%;
}
</style>
