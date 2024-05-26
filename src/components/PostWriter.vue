<script lang="ts" setup>
import { TimelinePost } from '../posts'
import { ref, defineProps, watch } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()
const html = ref('')
const content = ref(props.post.markdown)

// watchEffect(() => {
//     marked.parse(content.value, (err, result) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         html.value = result
//     })
// })

watch(content, (newContent) => {
        marked.parse(newContent, (err, result) => {
        if (err) {
            console.error(err)
            return
        }
        html.value = result
    })
},{ immediate: true })



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
            <div v-html="html"></div>
        </div>
    </div>
</template>