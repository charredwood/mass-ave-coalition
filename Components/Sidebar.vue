<template>
<<<<<<< Updated upstream
    <div class="sidebar" :class="{ expanded: isExpanded }">
        <div class="handle" @click="toggleExpand">
            <span v-if="isExpanded">&#10094;</span>
            <span v-else>&#10095;</span>
        </div>
        <div class="collection tools" v-if="isExpanded">
            <input type="search" id="site-search" name="q" aria-label="Search through site content"
                placeholder="Search..." class="search-bar">

            <el-menu>
                <el-sub-menu index="1">
                    <template #title><span class="bold-title">FILTER</span></template>
                    <el-menu-item index="1-1">
                        <el-checkbox>IMAGES</el-checkbox>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <el-checkbox>STORIES</el-checkbox>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                        <el-checkbox>HISTORIC LOCATIONS</el-checkbox>
                    </el-menu-item>


                    <div class="dualslidecontainer">
                        <div class="slider-label">
                            <span>TIME RANGE: </span><span class="slider-value">{{ timeRangeValue.join(' - ') }}</span>
                        </div>
                        <el-slider v-model="timeRangeValue" :min="1620" :max="2024" :show-tooltip="false" range
                            class="range-slider">
                        </el-slider>
                    </div>

                </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title><span class="bold-title">MAPS</span></template>

                    <div class="slidecontainer">
                        <div class="slider-label">
                            <span>BASE MAP: </span><span class="slider-value">{{ baseMapValue }}</span>
                        </div>
                        <input type="range" min="1620" max="2024" v-model="baseMapValue" class="slider">
                    </div>

                    <div class="slidecontainer">
                        <div class="slider-label">
                            <span>OVERLAY MAP: </span><span class="slider-value">{{ overlayMapValue }}</span>
                        </div>
                        <input type="range" min="1620" max="2024" v-model="overlayMapValue" class="slider">
                    </div>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title><span class="bold-title">ADD TO THE HISTORY</span></template>
                    <el-menu-item index="3-1">DROP A PIN</el-menu-item>

                </el-sub-menu>
            </el-menu>


        </div>
=======
  <div class="sidebar" :class="{ expanded: isExpanded }">
    <div class="handle" @click="toggleExpand">
      <span v-if="isExpanded">&#10094;</span>
      <span v-else>&#10095;</span>
>>>>>>> Stashed changes
    </div>
    <div v-if="isExpanded" class="collection tools">
      <input
        id="site-search"
        type="search"
        name="q"
        aria-label="Search through site content"
        placeholder="Search..."
        class="search-bar"
      />

      <el-menu>
        <el-sub-menu index="1">
          <template #title><span class="bold-title">FILTER</span></template>
          <el-menu-item index="1-1">
            <el-checkbox>IMAGES</el-checkbox>
          </el-menu-item>
          <el-menu-item index="1-2">
            <el-checkbox>STORIES</el-checkbox>
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-checkbox>HISTORIC LOCATIONS</el-checkbox>
          </el-menu-item>

          <div class="dualslidecontainer">
            <div class="slider-label">
              <span>TIME RANGE: </span><span class="slider-value">{{
                timeRangeValue.join(' - ')
              }}</span>
            </div>
            <el-slider
              v-model="timeRangeValue"
              :min="1620"
              :max="2024"
              :show-tooltip="false"
              range
              class="range-slider"
            >
            </el-slider>
          </div>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title><span class="bold-title">MAPS</span></template>

          <div class="slidecontainer">
            <div class="slider-label">
              <span>BASE MAP: </span>
              <span class="slider-value">{{ baseMapValue }}</span>
            </div>
            <input
              v-model="baseMapValue"
              type="range"
              min="1620"
              max="2024"
              class="slider"
            />
          </div>

          <div class="slidecontainer">
            <div class="slider-label">
              <span>OVERLAY MAP: </span>
              <span class="slider-value">{{ overlayMapValue }}</span>
            </div>
            <input
              v-model="overlayMapValue"
              type="range"
              min="1620"
              max="2024"
              class="slider"
            />
          </div>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <span class="bold-title">ADD TO THE HISTORY</span>
          </template>
          <el-menu-item index="3-1">DROP A PIN</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  ElMenu,
  ElMenuItem,
  ElCheckbox,
  ElSubMenu,
  ElSlider,
} from 'element-plus'

const isExpanded = ref(true)

const timeRangeValue = ref([1750, 1850])
const baseMapValue = ref(1750)
const overlayMapValue = ref(1850)

const toggleExpand = () => {
<<<<<<< Updated upstream
    isExpanded.value = !isExpanded.value;
};


=======
  isExpanded.value = !isExpanded.value
}
>>>>>>> Stashed changes
</script>

<style scoped>
.sidebar {
<<<<<<< Updated upstream
    position: fixed;
    top: 80px;
    left: 20px;
    height: auto;
    width: 350px;
    background-color: rgba(255, 255, 255, 1);
    padding: 30px;
    color: black;
    display: flex;
    flex-direction: column;
    z-index: 2;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    overflow: auto;
=======
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 425px;
  background-color: rgba(255, 255, 255, 1);
  padding: 30px;
  color: black;
  display: flex;
  flex-direction: column;
  z-index: 2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
>>>>>>> Stashed changes
}

.sidebar:not(.expanded) {
  width: 50px;
}

<<<<<<< Updated upstream
=======
.handle {
  position: absolute;
  top: 50%;
  right: 0;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
}

.handle span:hover {
  color: #25a69a;
}

.search-bar {
  width: 90%;
  height: 40px;
  margin: 0 auto;
  display: block;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 5px;
}
>>>>>>> Stashed changes

.el-menu--vertical {
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border-right: none;
}

.bold-title {
  font-weight: bold;
  font-size: 18px;
}

.el-sub-menu {
<<<<<<< Updated upstream
    margin-top: 0px;
    margin-bottom: 0px;
=======
  margin-top: 10px;
  margin-bottom: 10px;
>>>>>>> Stashed changes
}

.dualslidecontainer {
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
  background: #25a69a !important;
  height: 15px !important;
}

:deep(.el-slider__button) {
  width: 15px !important;
  height: 15px !important;
  background: white !important;
  border-radius: 50% !important;
  border: 1px !important;

  transform: translateY(5px) !important;
}

.slidecontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
</style>
