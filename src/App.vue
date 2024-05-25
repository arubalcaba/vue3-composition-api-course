<script setup lang="ts">
import { RouterView } from 'vue-router';
import  Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="section">
    <div class="container">
      <Navbar/>
      <RouterView/>

    </div>
  </div>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";
</style>
