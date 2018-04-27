import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: true,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {path: '/', component: () => import('../views/Home.vue')},
      {path: '/article/:id(\\d+)?', component: () => import('../views/Article.vue')},
      {path: '/about', component: () => import('../views/About.vue')}
    ]
  })
}
