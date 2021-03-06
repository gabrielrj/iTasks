import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from "@/views/Dashboard.vue";
import UserIndex from "@/views/users/Index.vue";
import ListTasks from "@/views/tasks/Index.vue";
import CreateOrUpdateTasks from "@/views/tasks/CreateOrEdit.vue";
import  NProgress  from 'nprogress/nprogress.js';
import 'nprogress/nprogress.css';
import Guard from "@/services/middleware";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'Users',
    component: UserIndex
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: ListTasks
  },

  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: CreateOrUpdateTasks
  },

  {
    path: '/tasks/edit/{id}',
    name: 'TaskEdit',
    component: CreateOrUpdateTasks
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }

  if(to.name !== 'Login')
    Guard.verifyUserAuthenticated(to, from, next)

  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
