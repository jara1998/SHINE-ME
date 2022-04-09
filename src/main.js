import { createApp } from 'vue'
import App from './App.vue'
import upload_image from './pages/upload-image.vue'
import view_images from './pages/view-images.vue'
import { createRouter, createWebHistory } from 'vue-router'




const routes = [
    { path: '/', component: App },
    { path: '/upload-image', component: upload_image },
    { path: '/view-images', component: view_images }
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

createApp(App).use(router).mount('#app')

