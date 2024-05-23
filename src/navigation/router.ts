import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../pages/home.vue'
import Test from '../pages/test.vue'
import TestResults from '../pages/test-results.vue'

const routes = [
  {
    path: '/',
    component: Home 
  },
  {
    path: '/test',
    component: Test 
  },
  {
    path: '/test-results',
    component: TestResults 
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router