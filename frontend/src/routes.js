import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'
import buyNFT from './pages/buyPasses.vue'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'buyNFT',
        path: '/buyNFT',
        component: buyNFT
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;