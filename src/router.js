import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/Signin')
    },
    {
      path: '/signout',
      name: 'signout',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/Signout')
    },
    {
      path: '/programs',
      name: 'programs',
      component: () => import(/* webpackChunkName: "acad" */ './views/Programs'),
      children: [
        {
          path: 'profile/:id',
          name: 'programProfile',
          component: () => import(/* webpackChunkName: "acad" */ './components/programs/ProgramProfile'),
        },
        
      ]
    },
  ]
})
