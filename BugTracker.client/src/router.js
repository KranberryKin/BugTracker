import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/bugdetails/:id',
    name: 'BugDetails',
    props: route => ({ id: route.params.id }),
    beforeEnter: authGuard,
    component: loadPage('BugDetails')
  },
  {
    path: '/',
    name: 'Account',
    beforeEnter: authGuard,
    component: loadPage('AccountPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
