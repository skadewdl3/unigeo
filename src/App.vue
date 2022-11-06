<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref } from 'vue';
const showLoading = ref(false);
const searching = ref(false);
</script>

<template>
  <LoadingScreen v-if="showLoading" />
  <Navbar
    :setSearching="search => (searching = search)"
    :searching="searching"
  />
  <RouterView
    :searching="searching"
    :setSearching="search => (searching = search)"
    :setLoading="loading => (showLoading = loading)"
  />
</template>

<style scoped></style>
