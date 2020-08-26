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
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './components/admin/AdminDashboard'),
      children: [
        {
          path: 'academics',
          name: 'adminAcademics',
          component: () => import(/* webpackChunkName: "admin" */ './components/admin/Academics'),
        },
        {
          path: 'classes',
          name: 'adminClasses',
          component: () => import(/* webpackChunkName: "admin" */ './components/admin/Classes'),
        },
        {
          path: 'students',
          name: 'adminStudents',
          component: () => import(/* webpackChunkName: "admin" */ './components/admin/Students'),
        },
        {
          path: 'faculty',
          name: 'adminFaculty',
          component: () => import(/* webpackChunkName: "admin" */ './components/admin/Faculty'),
        },
        {
          path: 'Exams',
          name: 'adminExams',
          component: () => import(/* webpackChunkName: "admin" */ './components/admin/Exams'),
        },
      ],
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
