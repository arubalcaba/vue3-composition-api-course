<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import { usePostsStore } from '../stores/posts';
import { periods } from '../constants';

const postsStore = usePostsStore()
postsStore.fetchPosts()
</script>

<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period of periods"
            :key="period"
            @click="postsStore.setSelectedPeriod(period)"
            :class="{ 'is-active': period === postsStore.selectedPeriod }"
            >
                {{ period }}
            </a>
        </span>
        <TimelineItem v-for="post of postsStore.filteredPosts"
            :key="post.id"
            :post="post"
            />

    </nav>
</template>