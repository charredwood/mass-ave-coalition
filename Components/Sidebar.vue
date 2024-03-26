<template>
    <div class="sidebar" :class="{ expanded: isExpanded }">
        <div class="handle" @click="toggleExpand">
            <span v-if="isExpanded">&#10094;</span>
            <span v-else>&#10095;</span>
        </div>
        <div class="collection tools" v-if="isExpanded">
            <input type="search" id="site-search" name="q" aria-label="Search through site content"
                placeholder="Search..." class="search-bar">


        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const isExpanded = ref(false);


const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.sidebar {
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
}

.sidebar:not(.expanded) {
    width: 50px;
}

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
    color: #25A69A
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
</style>