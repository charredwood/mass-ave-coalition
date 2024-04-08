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
import acsNYCHA from '~/static/ACS_NYCHA_2.json'

const accessToken =
  'pk.eyJ1IjoiaG9nYW5yeSIsImEiOiJjbHMwajM2NXIwMWRnMmtsZDI2YWlxNHNjIn0.hj-yWC3dV-QiBbQzZX54Pg'


const popUpActive = ref(false)

const popUpProperties = ref({
  title: 'Test',
  description: 'This is a Test',
})

let map

onMounted(async () => {
  loadMapDraw()
  addEvent()
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

  // /* -------------------------------------------------------------------------- */
  // /*                                MAP CALLBACKS                               */
  // /* -------------------------------------------------------------------------- */

  // /* ---------------------------------- LOAD ---------------------------------- */

  //
  // Extent
  // -122.5112833477207062,37.7073752682728482 : -122.3697531769701499,37.8054956996366940

  map.on('load', () => {
    const firstLabelLayerId = map
      .getStyle()
      .layers.find((layer) => layer.type === 'symbol').id
    console.log('loaded.....')
  })
}

const addEvent = async () => {
  const imagesData = await csv('csv/Collective_History_DB.csv')

  map.addLayer(
    new MapboxLayer({
      id: 'EventLayer',
      type: IconLayer,
      data: imagesData,
      getColor: (d) => [255, 0, 0],
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




</script>

<template>
  <main id="main-container" />
  <PopUp v-if="popUpActive" :popUpProperties="popUpProperties" />
</template>

<style lang="postcss" scoped>
#main-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  flex-direction: column;
}
</style>
