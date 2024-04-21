import { defineStore } from 'pinia';

export const useDashboardUIStore = defineStore('dashboardUI', {
  state: () => ({
    imageLayerVisible: true,
    eventLayerVisible: true,
    timeRangeValue: [1800, 1910],

  }),


  actions: {
    toggleImageLayerVisibility() {
      this.imageLayerVisible = !this.imageLayerVisible;
    },
    toggleEventLayerVisibility() {
      this.eventLayerVisible = !this.eventLayerVisible;
    },
    setTimeRangeValue(newRange) {
      this.timeRangeValue = newRange;
    }
  }
});