<script setup lang="ts">
import Gpx from './assets/20250323-walking.gpx';

console.log('Gpx', Gpx)
</script>

<template>
  <div>
    <h1>Hello World</h1>
    <pre>{{ Gpx }}</pre>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
