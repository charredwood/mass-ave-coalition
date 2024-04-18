<script setup>
// IMPORTS
import { csv } from 'd3'
import { MapboxLayer } from '@deck.gl/mapbox'
import { GeoJsonLayer } from '@deck.gl/layers'
import { IconLayer } from '@deck.gl/layers'
import 'element-plus/dist/index.css'
import PopUp from '~/components/PopUp.vue'

// Mapbox imports
import mapboxgl from 'mapbox-gl'

const accessToken =
  'pk.eyJ1IjoiaG9nYW5yeSIsImEiOiJjbHMwajM2NXIwMWRnMmtsZDI2YWlxNHNjIn0.hj-yWC3dV-QiBbQzZX54Pg'

const popUpActive = ref(false)
const popUpProperties = ref({})

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
    style: 'mapbox://styles/hoganry/cluwz0ht400hb01pe9e8x6qp9',
    center: [-71.078592, 42.337496], // longitude, latitude
    zoom: 16, // starting zoom level
    attributionControl: false,
    doubleClickZoom: false
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
  console.log(eventsData)

  map.addLayer(
    new MapboxLayer({
      id: 'EventLayer',
      type: IconLayer,
      data: eventsData,
      // getColor: (d) => d.YEAR >= 1800 && d.YEAR <= 1900 || d.IMG_SOURCE == "" ? [255, 0, 0] : [0, 255, 0],
      getColor: (d) => [0, 255, 0],
      getIcon: (d) => 'marker',
      getPosition: (d) => {
        console.log(d, 'ddddd', [
          -1 * parseFloat(d['LONGITUDE']),
          parseFloat(d['LATITUDE']),
        ]) ///d.coordinates
        return [-1 * parseFloat(d['LONGITUDE']), parseFloat(d['LATITUDE'])]
      },
      getSize: 50,
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
      getSize: 50,
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
</script>

<template>
  <main id="main-container" />
  <PopUp v-if="popUpActive" :pop-up-properties="popUpProperties" />
</template>

<style lang="postcss" scoped>
#main-container {
  width: 100%;
  height: calc(100vh - 60px);
  margin: 0;
  flex-direction: column;
}
</style>
