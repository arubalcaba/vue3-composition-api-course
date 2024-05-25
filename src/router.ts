import { createRouter, createWebHistory } from "vue-router"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/posts/new',
            component: () => import('./views/NewPost.vue')
        }
    ]
})