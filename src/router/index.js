import Vue from 'vue'
import VueRouter from 'vue-router'
import ExhibitionList from '../views/ExhibitionList.vue'
import TicketIndex from '../views/TicketIndex.vue'
import Oath from '../views/oath.vue'
import MainFrom from '../components/MainForm.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/ExhibitionList',
        name: 'ExhibitionList',
        component: ExhibitionList
    },
    {
        path: '/TicketIndex',
        name: 'TicketIndex',
        component: TicketIndex
    }, {
        path: "/oath",
        name: "oath",
        component: Oath
    },{
        path:"/mainForm",
        name: "mainForm",
        component: MainFrom
    }

]

const router = new VueRouter({
    routes,
    mode: "history"
})
router.beforeEach((to, from, next) => {
    //console.log(to, from)
    // if (to.name != "oath") {
    //     let loginState = sessionStorage.getItem("islogin");
    //     if (loginState == "true") {
    //         next();
    //     } else {
    //         next("/oath?from=" + to.name);
    //     }
    // } else {
    //     next();
    // }

    next();
})
export default router