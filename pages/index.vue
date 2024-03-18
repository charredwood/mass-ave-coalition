<script setup>
// IMPORTS
import { MapboxLayer } from '@deck.gl/mapbox'
import { GeoJsonLayer } from '@deck.gl/layers'
import 'element-plus/dist/index.css'

// Mapbox imports
import mapboxgl from 'mapbox-gl'
import acsNYCHA from '~/static/ACS_NYCHA_2.json'

const accessToken = ''

let map

onMounted(() => loadMapDraw())

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
    style: 'mapbox://styles/mapbox/light-v9',
    bounds: [
      [-74.1651917975229651, 40.5716103812675328],
      [-73.7311475563883505, 40.888293221510196],
    ],
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

    map.addLayer(
      new MapboxLayer({
        id: 'sf-geojson',
        type: GeoJsonLayer,
        data: acsNYCHA,
        pickable: true,
        stroked: false,
        filled: true,
        extruded: true,
        pointType: 'circle',
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getLineColor: [0, 78, 50], //88,24,13 brown, 255,255,255 white
        getFillColor: [0, 78, 50],
        getPointRadius: 100,
        getLineWidth: 1,
        getElevation: 30,
        autoHighlight: true,
        highlightColor: [178, 235, 242, 200],
      })
    )
  })
}
</script>

<template>
  <main id="main-container" />
</template>

<style lang="postcss" scoped>
#main-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  flex-direction: column;
}
</style>
