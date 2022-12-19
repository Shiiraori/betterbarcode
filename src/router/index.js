import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Student from '../views/Student.vue'
import Event from '../views/Event.vue'
import Barcode from '../views/barcode.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/event',
    name: 'Event',
    component: Event
  },
  {
    path: '/barcode',
    name: 'event',
    component: Barcode
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/student',
    name: 'Student',
    component: Student
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router
