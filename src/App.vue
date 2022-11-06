<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref, onMounted } from 'vue';
const showLoading = ref(false);
const expandSearchBar = ref(false);
const searching = ref(false);
const query = ref('');

onMounted(() => {
  console.log('connected to server: %BASE_URL%');
});
</script>

<template>
  <LoadingScreen v-if="showLoading" />
  <Navbar
    :setSearching="
      search => {
        searching = search;
        expandSearchBar = search;
        query = '';
      }
    "
    :searchQuery="query"
    :searching="searching"
    :expandSearchBar="expandSearchBar"
    :setExpandSearchBar="expand => (expandSearchBar = expand)"
  />
  <RouterView
    :searching="searching"
    :setSearching="
      search => {
        searching = search;
        expandSearchBar = search;
        query = '';
      }
    "
    :setLoading="loading => (showLoading = loading)"
    :setExpandSearchBar="expand => (expandSearchBar = expand)"
    :setSearchQuery="searchQuery => (query = searchQuery)"
    :expandSearchBar="expandSearchBar"
  />
</template>

<style scoped></style>
