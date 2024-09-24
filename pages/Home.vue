<script setup lang="ts">
import MainHeader from '~/Components/MainHeader.vue'
import Sidebar from '~/Components/Sidebar.vue'
import MapComponent from '~/Components/Map.vue'

defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <MainHeader />
  <Sidebar />
  <MapComponent />
</template>

<style scoped></style>
