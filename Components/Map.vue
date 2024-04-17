<script setup>
// IMPORTS
import { csv } from 'd3'
import { MapboxLayer } from '@deck.gl/mapbox'
import { GeoJsonLayer } from '@deck.gl/layers'
import { IconLayer } from '@deck.gl/layers'
import 'element-plus/dist/index.css'
import PopUp from '~/Components/PopUp.vue'

// Mapbox imports
import mapboxgl from 'mapbox-gl'

const accessToken =
  'pk.eyJ1IjoiaG9nYW5yeSIsImEiOiJjbHMwajM2NXIwMWRnMmtsZDI2YWlxNHNjIn0.hj-yWC3dV-QiBbQzZX54Pg'
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
const popUpActive = ref(false)

const popUpProperties = ref({
  title: 'Test',
  description: 'This is a Test',
})

let map

onMounted(async () => {
  loadMapDraw()
  addEvent()
  addImage()
})

/***
 * Loads mapbox map and Deck.gl
 */
const loadMapDraw = () => {
  let mouseLocation = false

  // 2) mapbox token
  mapboxgl.accessToken = accessToken

  // 3) Initialize the map
  console.log('creating map')
  map = new mapboxgl.Map({
    container: 'main-container',
    style: 'mapbox://styles/hoganry/clu8tr3m400kt01p8dqowcdaf',
    center: [-71.078592, 42.337496], // longitude, latitude
    zoom: 17, // starting zoom level
    pitch: 37.5,
    attributionControl: false,
  })

  map.on('load', () => {
    const firstLabelLayerId = map
      .getStyle()
      .layers.find((layer) => layer.type === 'symbol').id
    console.log('loaded.....')
  })
}

const addEvent = async () => {
  const eventsData = await csv('csv/DB_0414_events.csv')

  map.addLayer(
    new MapboxLayer({
      id: 'EventLayer',
      type: IconLayer,
<<<<<<< Updated upstream
      data: imagesData,
      getColor: (d) => [37, 166, 154],
=======
      data: eventsData,
      getColor: (d) => [255, 0, 0],
>>>>>>> Stashed changes
      getIcon: (d) => 'marker',
      getPosition: (d) => {
        console.log(d, 'ddddd', [
          -1 * parseFloat(d['LONGITUDE']),
          parseFloat(d['LATITUDE']),
        ]) ///d.coordinates
        return [-1 * parseFloat(d['LONGITUDE']), parseFloat(d['LATITUDE'])]
      },
      getSize: 80,
      iconAtlas:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
      pickable: true,
      onClick: (info) => {
        popUpActive.value = !popUpActive.value
        popUpProperties.value = info
        console.log('Clicked on', info.object, info)
        console.log(popUpActive.value)
      },
    })
  )
}

<<<<<<< Updated upstream
=======
const addImage = async () => {
  const imagesData = await csv('csv/DB_0416_images.csv')

  map.addLayer(
    new MapboxLayer({
      id: 'ImageLayer',
      type: IconLayer,
      data: imagesData,
      getColor: (d) => [0, 255, 0],
      getIcon: (d) => 'marker',
      getPosition: (d) => {
        console.log(d, 'ddddd', [
          -1 * parseFloat(d['LONGITUDE']),
          parseFloat(d['LATITUDE']),
        ]) ///d.coordinates
        return [-1 * parseFloat(d['LONGITUDE']), parseFloat(d['LATITUDE'])]
      },
      getSize: 80,
      iconAtlas:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
      pickable: true,
      onClick: (info) => {
        popUpActive.value = !popUpActive.value
        popUpProperties.value = info
        console.log('Clicked on', info.object, info)
        console.log(popUpActive.value)
      },
    })
  )
}
>>>>>>> Stashed changes
</script>

<template>
  <main id="main-container" />
  <PopUp v-if="popUpActive" :pop-up-properties="popUpProperties" />
</template>

<style lang="postcss" scoped>
#main-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  flex-direction: column;
}
</style>
