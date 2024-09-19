<template>
  <main id="main-container" />
  <PopUp v-if="popUpActive" :pop-up-properties="popUpProperties" />
  <FormPopUp v-if="formActive" :location-coordinates="locationCoordinates" />
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

<script setup>
import { ref, onMounted, watch } from 'vue'
import { csv } from 'd3'
import { MapboxLayer } from '@deck.gl/mapbox'
import { IconLayer } from '@deck.gl/layers'
import 'element-plus/dist/index.css'
import { useDashboardUIStore } from '~/stores/dashboardUI'
import PopUp from './PopUp.vue'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import FormPopUp from './FormPopUp.vue'

const accessToken =
  'pk.eyJ1IjoiaG9nYW5yeSIsImEiOiJjbHMwajM2NXIwMWRnMmtsZDI2YWlxNHNjIn0.hj-yWC3dV-QiBbQzZX54Pg'

const store = useDashboardUIStore()
const {
  imageLayerVisible,
  eventLayerVisible,
  timeRangeValue,
  map1839Visible,
  editCapable,
} = storeToRefs(store)

const popUpActive = ref(false)
const popUpProperties = ref({})
const locationCoordinates = ref({})
let eventLayer
let imageLayer
let map
const formActive = ref(false)

const pinOpacity = (d) => {
  const year = parseInt(d.YEAR)
  return year >= timeRangeValue.value[0] && year <= timeRangeValue.value[1]
    ? 1
    : 0
}

const layerOpacity = ref(0)

onMounted(async () => {
  loadMapDraw()
  await addEvent()
  await addImage()
})

// need to add a function that updates a layer when the time range changes
watch(
  timeRangeValue,
  (newValue, oldValue) => {
    if (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1]) {
      console.log('Slider changed to:', newValue)
      store.setTimeRangeValue(newValue)
    }
  },
  { deep: true }
)

watch(
  editCapable,
  (newEditCapable) => {
    console.log('Edit Capable:', newEditCapable)
  },
  { immediate: true }
)

const map1839Toggle = () => {
  console.log('map1839Toggle called') // Debugging line
  const layerId = '1839'
  if (map.getLayer(layerId)) {
    console.log('Layer exists, toggling visibility') // Additional debugging line
    map.setLayoutProperty(
      layerId,
      'visibility',
      map1839Visible.value ? 'visible' : 'none'
    )
  } else {
    console.log('Layer does not exist') // Debugging line if layer doesn't exist
  }
}

const updateOpacity = () => {
  console.log('Updating opacity to:', layerOpacity.value)
  const layerId = '1839'
  if (map.getLayer(layerId)) {
    map.setPaintProperty(
      layerId,
      'raster-opacity',
      parseFloat(layerOpacity.value)
    )
    console.log(`Opacity set for ${layerId}`)
  }
}

const loadMapDraw = () => {
  mapboxgl.accessToken = accessToken

  console.log('creating map')
  map = new mapboxgl.Map({
    container: 'main-container',
    style: 'mapbox://styles/hoganry/cluwz0ht400hb01pe9e8x6qp9',
    center: [-71.078592, 42.337496],
    zoom: 16,
    attributionControl: false,
    doubleClickZoom: false,
  })

  map.on('load', () => {
    map.addLayer(
      {
        id: '1839',
        type: 'raster',
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

  // Edit mode (Add Pins)
  // define the draw object and style the pin
  let draw = new MapboxDraw({
    styles: [
      {
        id: 'feature-inactive',
        type: 'circle',
        filter: [
          'all',
          ['==', '$type', 'Point'],
          ['==', 'meta', 'feature'],
          ['==', 'active', 'false'],
        ],
        paint: {
          'circle-radius': 7,
          'circle-color': 'black',
        },
      },
    ],
  })

  // activate the form when the user clicks on the map in edit mode
  // also create a marker on the map where the user clicked
  map.on('click', (e) => {
    if (editCapable.value) {
      console.log('Edit Capable:', editCapable.value)
      const coordinates = {
        longitude: e.lngLat['lng'],
        latitude: e.lngLat['lat'],
      }
      console.log('Clicked Location:', coordinates)
      locationCoordinates.value = coordinates
      // create the form pop up
      formActive.value = !formActive.value
      // let the pin to show up only when the form is active
      if (formActive.value) {
        // create a point
        map.addControl(draw)
        let feature = {
          type: 'Point',
          coordinates: [coordinates.longitude, coordinates.latitude],
        }
        let featureIds = draw.add(feature)
        console.log(featureIds)
      } else {
        // remove the point
        map.removeControl(draw)
      }
      // stopping the existing pop up from showing up
      // popUpActive.value = false
    } else {
      // To prevent the pop up to continue showing up when the user turns off the edit mode
      formActive.value = false
    }
  })
}

const addEvent = async () => {
  const eventsData = await csv('csv/DB_0421_events.csv')
  console.log(eventsData)

  eventLayer = new MapboxLayer({
    id: 'EventLayer',
    type: IconLayer,
    data: eventsData,
    getColor: (d) => {
      const year = parseInt(d.YEAR)
      return [37, 166, 154, 255 * pinOpacity.value]
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
      console.log(pinOpacity(info.object))
    },
  })

  map.addLayer(eventLayer)
}

const addImage = async () => {
  const imagesData = await csv('csv/DB_0421_images.csv')

  imageLayer = new MapboxLayer({
    id: 'ImageLayer',
    type: IconLayer,
    data: imagesData,
    getColor: (d) => {
      const year = parseInt(d.YEAR)
      return [37, 166, 154, 255 * pinOpacity.value]
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
    visible: imageLayerVisible.value,
    pickable: true,
    onClick: (info) => {
      popUpActive.value = !popUpActive.value
      popUpProperties.value = info
      console.log('Clicked on', info.object, info)
      console.log(popUpActive.value)
    },
  })

  map.addLayer(imageLayer)
}
</script>

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
