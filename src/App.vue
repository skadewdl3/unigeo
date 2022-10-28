<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
console.log(window);
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
