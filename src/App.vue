<script>
export default {
  name: 'App',
  data() {
    return {
      showLoading: false,
      stopLoading: true
    };
  },
  methods: {
    setLoading(loading) {
      this.showLoading = loading;
    }
  }
};
</script>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
</script>

<template>
  <LoadingScreen v-if="this.showLoading" />
  <Navbar />
  <RouterView :setLoading="this.setLoading" />
</template>

<style scoped></style>
