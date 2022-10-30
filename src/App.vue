<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref } from 'vue';
const showLoading = ref(false);
</script>

<template>
  <LoadingScreen v-if="showLoading" />
  <Navbar />
  <RouterView :setLoading="loading => (showLoading = loading)" />
</template>

<style scoped></style>
