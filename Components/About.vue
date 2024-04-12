<template>
    <div v-show="visible" class="modal" @click.self="close">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>About Us</h2>
            <p>Collective History was created and developed by the Design, Urban Tech + Community class at Northeastern
                University as part of the 2024 Spring Semester in collaboration with Chester Square Neighbors and the
                Mass Ave Coalition.</p><br>
            <p>This site seeks to gather and visualize the collected histories of the South End
                of Boston to better understand the developmental and rich, cultural history of the neighborhood and set
                forth a precedent
                for future development and neighborhood definition. </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits(['update:visible']);

function close() {
    emit('update:visible', false);
}
</script>

<style scoped>
.modal {
    display: flex;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 20px;

}

.close {
    color: #25A69A;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-content h2 {
    color: #25A69A;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>