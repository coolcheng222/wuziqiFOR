import { createRouter, createWebHistory } from 'vue-router'
import game from "../components/game";

const routes = [
  {
    path:'/game',
    alias: '/',
    component: game
  }
]

const router = createRouter({
  history: createWebHistory('ziqi'),
  routes
})

export default router
