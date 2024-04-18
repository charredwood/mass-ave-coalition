<template>
    <div class="sidebar" :class="{ expanded: isExpanded }">

        <div class="collection tools" v-show="isExpanded">
            <el-menu>
                <el-sub-menu index="1">
                    <template #title><span class="bold-title">FILTER</span></template>
                    <el-menu-item index="1-1">
                        <el-checkbox v-model="dashboardUI.imageLayerVisible">IMAGES</el-checkbox>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <el-checkbox v-model="dashboardUI.eventLayerVisible">STORIES</el-checkbox>
                    </el-menu-item>
                    <!-- <el-menu-item index="1-3">
                        <el-checkbox>HISTORIC LOCATIONS</el-checkbox>
                    </el-menu-item> -->


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
    </div>

</template>

<script setup>
import { useDashboardUIStore } from '~/stores/dashboardUI'; // Adjust path as necessary
import { ElMenu, ElSubMenu, ElMenuItem, ElCheckbox } from 'element-plus';


const dashboardUI = useDashboardUIStore();


const isExpanded = ref(true);

const timeRangeValue = ref([1750, 1850]);
const baseMapValue = ref(1750);
const overlayMapValue = ref(1850);

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};


</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 80px;
    left: 20px;
    height: auto;
    width: 350px;
    background-color: rgba(255, 255, 255, 1);
    padding: 5px;
    color: black;
    display: flex;
    flex-direction: column;
    z-index: 2;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    overflow: auto;
}

.sidebar:not(.expanded) {
    width: 50px;
}


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
    margin-top: 0px;
    margin-bottom: 0px;
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
    background: #25A69A !important;
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
    transition: opacity .2s;
    border-radius: 10px;
    margin-bottom: 20px;

}



/* Slider Handle */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #25A69A;
    cursor: pointer;
    border-radius: 50%;
}

.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #25A69A;
    cursor: pointer;
    border-radius: 50%;
}
</style>