<script setup>
// IMPORTS
import { ref, onMounted, watch } from 'vue'
import { csv } from 'd3'
import { MapboxLayer } from '@deck.gl/mapbox'
import { GeoJsonLayer } from '@deck.gl/layers'
import { IconLayer } from '@deck.gl/layers'
import 'element-plus/dist/index.css'
import { useDashboardUIStore } from '~/stores/dashboardUI'

// Mapbox imports
import mapboxgl from 'mapbox-gl'

const accessToken =
  'pk.eyJ1IjoiaG9nYW5yeSIsImEiOiJjbHMwajM2NXIwMWRnMmtsZDI2YWlxNHNjIn0.hj-yWC3dV-QiBbQzZX54Pg'

const store = useDashboardUIStore()
const { imageLayerVisible, eventLayerVisible, timeRangeValue } =
  storeToRefs(store)
const popUpActive = ref(false)
const popUpProperties = ref({})
let eventLayer
let imageLayer
let map

onMounted(async () => {
  loadMapDraw()
  addEvent()
  addImage()
})

watch(
  imageLayerVisible,
  (newVisibility) => {
    if (imageLayer) {
      imageLayer.setProps({ visible: newVisibility })
      console.log('Image Layer Visibility Updated:', newVisibility)
    }
  },
  { immediate: true }
)

watch(
  eventLayerVisible,
  (newVisibility) => {
    if (eventLayer) {
      eventLayer.setProps({ visible: newVisibility })
      console.log('Event Layer Visibility Updated:', newVisibility)
    }
  },
  { immediate: true }
)

watch(
  timeRangeValue,
  (newValue) => {
    console.log('Slider changed to:', newValue)
    store.setTimeRangeValue(newValue)
  },
  { deep: true }
)

//Map Opacity
const layerOpacity = ref(0)
const updateOpacity = () => {
  console.log('Updating opacity to:', layerOpacity.value) // Debugging line
  const layerId = '1839'
  if (map.getLayer(layerId)) {
    map.setPaintProperty(
      layerId,
      'raster-opacity',
      parseFloat(layerOpacity.value)
    )
    console.log(`Opacity set for ${layerId}`) // Confirm operation
  }
}

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
    doubleClickZoom: false,
  })

  map.on('load', () => {
    // Add your custom raster layer beneath the icon layers
    map.addLayer(
      {
        id: '1839',
        type: 'raster', // Adjust type based on your layer type
        source: {
          type: 'raster',
          url: 'mapbox://hoganry.1gcfgvhx',
          tileSize: 256,
        },
        layout: {
          visibility: 'visible',
        },
        paint: {
          'raster-opacity': 0,
        },
      },
      'EventLayer'
    )
  })
}

const addEvent = async () => {
  const eventsData = await csv('csv/DB_0421_events.csv')
  console.log(eventsData)

  map.addLayer(
    (eventLayer = new MapboxLayer({
      id: 'EventLayer',
      type: IconLayer,
      data: eventsData,
      getColor: (d) => {
        const year = parseInt(d.YEAR)

        return year >= timeRangeValue.value[0] &&
          year <= timeRangeValue.value[1]
          ? [37, 166, 154, 255]
          : [37, 166, 154, 0]
      },
      getIcon: (d) => 'marker',
      getPosition: (d) => {
        return [-1 * parseFloat(d['LONGITUDE']), parseFloat(d['LATITUDE'])]
      },
      getSize: 50,
      iconAtlas:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
      visible: eventLayerVisible.value,
      pickable: true,
      onClick: (info) => {
        popUpActive.value = !popUpActive.value
        popUpProperties.value = info
        console.log('Clicked on', info.object, info)
        console.log(popUpActive.value)
      },
    }))
  )
}

const addImage = async () => {
  const imagesData = await csv('csv/DB_0421_images.csv')

  map.addLayer(
    (imageLayer = new MapboxLayer({
      id: 'ImageLayer',
      type: IconLayer,
      data: imagesData,
      getColor: (d) => {
        const year = parseInt(d.YEAR)

        return year >= timeRangeValue.value[0] &&
          year <= timeRangeValue.value[1]
          ? [37, 166, 154, 255]
          : [37, 166, 154, 0]
      },
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
      visible: imageLayerVisible.value,
      pickable: true,
      onClick: (info) => {
        popUpActive.value = !popUpActive.value
        popUpProperties.value = info
        console.log('Clicked on', info.object, info)
        console.log(popUpActive.value)
      },
    }))
  )
}
</script>

<template>
  <main id="main-container" />
  <PopUp v-if="popUpActive" :pop-up-properties="popUpProperties" />
  <div class="control-container">
    <label for="opacity-slider">1839 City of Boston Map Opacity</label>
    <input
      id="opacity-slider"
      v-model="layerOpacity"
      type="range"
      min="0"
      max="1"
      step="0.1"
      class="opacity-slider"
      @input="updateOpacity"
    />
  </div>
</template>

<style scoped>
#main-container {
  width: 100%;
  height: calc(100vh - 60px);
  margin: 0;
  flex-direction: column;
}

.control-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  color: black;
  margin-bottom: 10px;
  align-items: center;
}

.control-container div {
  margin-bottom: 10px;
}

.control-container label {
  display: block;
  margin-bottom: 5px;
}

.opacity-slider {
  width: 200px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: #d3d3d3;
  outline: none;
  transition: opacity 0.2s;
  border-radius: 10px;
}

.opacity-slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  background: #25a69a; /* Teal handle */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  cursor: pointer;
}

.opacity-slider::-moz-range-thumb {
  background: #25a69a; /* Teal handle */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
