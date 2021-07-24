import { createRouter, createWebHistory } from 'vue-router'
import game from "../components/game";
import login from "../components/login/login";

const routes = [
  {
    path:'/game',
    // alias: '/',
    component: game
  },
  {
    path:'/login',
    alias:'/',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory('ziqi'),
  routes
})

export default router
