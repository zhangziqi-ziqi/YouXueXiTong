import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index/index.vue'
import Layout from '@/views/Layout/Layout.vue'
import Login from '@/views/Login/Login.vue' 
import LocationRecommend from '@/views/Category/LocationRecommend.vue' 
import MapTour from '@/views/Category/MapTour.vue'
import Account from '@/views/Category/Account.vue'
import TravelDiary from '@/views/Category/TravelDiary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/layout',
      component: Layout,
      children:[
        {
          path: 'locationRecommendation',
          component: LocationRecommend
        },
        {
          path: 'mapTour',
          component: MapTour
        },
        {
          path: 'travelDiary',
          component: TravelDiary
        },
        {
          path: 'account',
          component: Account
        }
      ]
    }
  ]
})

export default router
