<template>
  <main id="main-container" :class="{ 'edit-mode': editCapable }" />
  <PopUp v-if="popUpActive" :pop-up-properties="popUpProperties" />
  <FormPopUp
    v-if="formActive"
    :location-coordinates="locationCoordinates"
    @update-map="addNewMarker"
    @close-form="closeForm"
  />
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
import { ref, onMounted, watch, nextTick } from 'vue'
import { csv } from 'd3'
import { MapboxLayer } from '@deck.gl/mapbox'
import { IconLayer } from '@deck.gl/layers'
import 'element-plus/dist/index.css'
import { useDashboardUIStore } from '~/stores/dashboardUI'
import PopUp from './PopUp.vue'
import mapboxgl from 'mapbox-gl'
import FormPopUp from './FormPopUp.vue'
import Papa from 'papaparse'

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
const eventLayer = ref(null)
const mapData = ref([])
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

  map.on('click', (e) => {
    if (editCapable.value) {
      console.log('Edit Capable:', editCapable.value)
      const coordinates = {
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
      }
      console.log('Clicked Location:', coordinates)
      locationCoordinates.value = coordinates
      formActive.value = !formActive.value
    } else {
      formActive.value = false
    }
  })
}

const addEvent = async () => {
  const SHEET_ID = '1I7wAhaMPa3Pk6IEOPpN1_GOjIeINbK4-2O5hgpg1KhQ'
  const SHEET_NAME = 'HistoryInput'
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`

  Papa.parse(CSV_URL, {
    download: true,
    header: true,
    complete: (results) => {
      mapData.value = results.data
      console.log(mapData.value)

      eventLayer.value = new MapboxLayer({
        id: 'EventLayer',
        type: IconLayer,
        data: mapData.value,
        getColor: (d) => {
          const year = parseInt(d.YEAR)
          return [37, 166, 154, 255 * pinOpacity.value]
        },
        getIcon: (d) => 'marker',
        getPosition: (d) => {
          return [parseFloat(d['LONGITUDE']), parseFloat(d['LATITUDE'])]
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

      map.addLayer(eventLayer.value)
    },
    error: (error) => {
      console.error('Error parsing CSV:', error)
    },
  })
}

const addImage = async () => {
  const imagesData = await csv('csv/DB_0421_events.csv')

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

const addNewMarker = async (markerData) => {
  console.log('addNewMarker called with data:', markerData)

  const lat = parseFloat(markerData.LATITUDE)
  const lng = parseFloat(markerData.LONGITUDE)

  if (isNaN(lat) || isNaN(lng)) {
    console.error('Invalid coordinates:', markerData)
    return
  }

  const newEventData = {
    YEAR: markerData.YEAR,
    EVENT_NAME: markerData.EVENT_NAME,
    LATITUDE: lat,
    LONGITUDE: lng,
    DESCRIPTION: markerData.DESCRIPTION,
    ADDRESS: markerData.ADDRESS,
    SOURCE_NAME: markerData.SOURCE_NAME,
  }
  console.log('New event data created:', newEventData)

  mapData.value = [...mapData.value, newEventData]

  if (eventLayer.value) {
    eventLayer.value.setProps({
      data: mapData.value,
      getPosition: (d) => {
        const position = [parseFloat(d.LONGITUDE), parseFloat(d.LATITUDE)]
        console.log('getPosition called for:', d, 'returning:', position)
        return position
      },
      onClick: (info) => {
        console.log('Icon clicked:', info)
        popUpActive.value = true
        popUpProperties.value = { object: info.object }
        console.log('Popup activated with properties:', popUpProperties.value)
      },
    })
    console.log('Event layer props updated')

    await nextTick()
    map.triggerRepaint()
    console.log('Map repaint triggered')
  } else {
    console.error('Event layer not initialized')
  }
}

const closeForm = () => {
  formActive.value = false
}

onMounted(async () => {
  loadMapDraw()
  await addEvent()
  await addImage()

  try {
    const response = await axios.get('/api/getMarkers')
    response.data.forEach((markerData) => addNewMarker(markerData))
  } catch (error) {
    console.error('Error loading markers:', error)
  }
})
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

.edit-mode {
  cursor: url('../public/img/click.png'), auto;
}
</style>
