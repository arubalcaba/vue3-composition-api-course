<script setup lang="ts">
import PostWriter from '../components/PostWriter.vue'
import { DateTime } from 'luxon';
import { TimelinePost } from '../posts';
const post: TimelinePost = {
    id: "-1",
    title: 'Blog Post',
    created: DateTime.now(),
    markdown: '## Title',
    html: '<h2>Title</h2>'
}
</script>
<template>
    New Post
    <PostWriter :post="post"/>
</template>