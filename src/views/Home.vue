<script setup lang="ts">
import Timeline from '../components/Timeline.vue'

</script>

<template>
    <h1>Home</h1>
    <Suspense>
        <template #default>
          <Timeline />
        </template>

        <template #fallback>
          <div>Loading...</div>
        </template>

      </Suspense>

</template>
