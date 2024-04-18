import { defineStore } from 'pinia';

export const useDashboardUIStore = defineStore('dashboardUI', {
  state: () => ({
    imageLayerVisible: true,
    eventLayerVisible: true,
  }),
  actions: {
    toggleImageLayerVisibility() {
      this.imageLayerVisible = !this.imageLayerVisible;
    },
    toggleEventLayerVisibility() {
      this.eventLayerVisible = !this.eventLayerVisible;
    },
  }
});