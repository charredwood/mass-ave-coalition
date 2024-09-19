import { defineStore } from 'pinia'

export const useDashboardUIStore = defineStore('dashboardUI', {
  state: () => ({
    imageLayerVisible: true,
    eventLayerVisible: true,
    timeRangeValue: [1620, 2024],
    map1839Visible: true,
    editCapable: false,
  }),

  actions: {
    toggleImageLayerVisibility() {
      this.imageLayerVisible = !this.imageLayerVisible
    },
    toggleEventLayerVisibility() {
      this.eventLayerVisible = !this.eventLayerVisible
    },
    setTimeRangeValue(newRange) {
      this.timeRangeValue = newRange
    },
    toggleMap1839Visibility() {
      this.map1839Visible = !this.map1839Visible
    },
    toggleEditMode() {
      this.editCapable = !this.editCapable
    },
  },
})
