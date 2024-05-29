import { defineStore } from 'pinia'
import { Post, TimelinePost, thisMonth, thisWeek, today } from '../posts'
import { Period } from '../constants'
import { DateTime } from 'luxon'

interface PostsState {
    ids: string[] // ['1', '2', '3']
    all: Map<string, Post>,
    selectedPeriod: Period
}

export const usePostsStore = defineStore("posts", {
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map(),
        selectedPeriod: 'Today'
    }),

    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
        },
        async fetchPosts() {
            const res = await fetch('http://localhost:3012/posts')
            const data = (await res.json()) as Post[]
            debugger
            data.forEach(post => {
                this.all.set(post.id, post)
                if(!this.ids.includes(post.id)) {
                    this.ids.push(post.id)
                }
            })
        },
        createPost (post: TimelinePost) {
            const body = JSON.stringify({...post, creatd: post.created.toISO() })
            console.log('saving post...')
            console.log(post)
            return window.fetch("http://localhost:3012/posts", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body
              })
        }
    },

    getters: {
        filteredPosts(state): TimelinePost[] {
            debugger
            return state.ids.map(id => {
                const post = state.all.get(id) as Post
                return {
                    ...post,
                    created: DateTime.fromISO(post?.created)
                }
            }).filter(post => {
                if(state.selectedPeriod === 'Today') {
                    return post.created >= DateTime.now().minus({ days: 1 })
                }
                if(state.selectedPeriod === 'This Week') {
                    return post.created >= DateTime.now().minus({ weeks: 1 })
                }
                return post
            })

        }
    }

})


