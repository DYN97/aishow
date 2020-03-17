import Vue from 'vue'
import VueRouter from 'vue-router'
import ExhibitionList from '../views/ExhibitionList.vue'
import TicketIndex from '../views/ExhibitionList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ExhibitionList',
    name: 'ExhibitionList',
    component: ExhibitionList
  },
  {
    path: '/TicketIndex',
    name: 'TicketIndex',
    component: TicketIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
