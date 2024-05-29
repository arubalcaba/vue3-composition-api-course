<script lang="ts" setup>
import { TimelinePost } from '../posts'
import { ref, defineProps, watch, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { debounce } from 'lodash';
import { usePostsStore } from '../stores/posts'
import { useRouter } from 'vue-router'

const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()
const html = ref('')
const content = ref(props.post.markdown)
const postsStore = usePostsStore()
const router = useRouter()

// watchEffect(() => {
//     marked.parse(content.value, (err, result) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         html.value = result
//     })
// })

onMounted(() => {
    if(contentEditable.value) {
        contentEditable.value.innerText = content.value
    }
})

function parseHtml(markdown: string) {
    marked.parse(markdown,{
            gfm: true,
            breaks: true,
            highlight: (code) => {
                return hljs.highlightAuto(code, ['javascript']).value
            }
        }, (err, result) => {
            console.log('result', result)
            html.value = result
        })
}

watch(content, debounce((newContent) => {
       parseHtml(newContent)
},250),{ immediate: true }
)



const handleInput = () => {
    content.value = contentEditable.value?.innerText || ''
}

const handleClick = async () => {
    console.log('clicked')

    const newPost: TimelinePost = {
        ...props.post,
        title: title.value,
        markdown: content.value,
        html: html.value
    }
    await postsStore.createPost(newPost)
    router.push('/')


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
            <div contenteditable ref="contentEditable" @input="handleInput" />
        </div>
        <div class="column">
            <div v-html="html" />
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <button class="button is-primary is-pulled-right" @click="handleClick">
                Save Post
            </button>
        </div>
    </div>
</template>