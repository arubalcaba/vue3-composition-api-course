<script lang="ts" setup>
import { TimelinePost } from '../posts'
import { ref, defineProps } from 'vue'
const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()
const content = ref(props.post.markdown)

const handleInput = () => {
    content.value = contentEditable.value?.innerText || ''
}

</script>
<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">{{title}}</div>
                <input type="text" class="input" v-model="title">
            </div>

        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput" >
                {{ content }}
            </div>
        </div>
        <div class="column">
            {{ content }}
        </div>
    </div>
</template>