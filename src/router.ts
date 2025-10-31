import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'CARDINAL',
            component: () => import('@/views/HomeView/HomeView.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/Auth.vue'),
            props: {login: true}
        },
        {
            path: '/register',
            component: () => import('@/views/Auth.vue'),
            props: {login: false}
        },
        {
            path: '/about',
            name: 'О проекте',
            component: () => import('@/views/AboutView/AboutView.vue')
        },
        // {
        //     path: '/settings',
        //     name: 'Настройки',
        //     component: () => import('@/views/SettingsView.vue')
        // },
        {
            path: '/users',
            name: 'Пользователи',
            component: () => import('@/views/AdminView/AdminPanel.vue')
        },

        // 404 page
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/Page404.vue')
        }
    ],
})

export default router
