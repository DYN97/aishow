 /* jshint esversion: 6 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import ExhibitionList from '../views/ExhibitionList.vue';
import TicketIndex from '../views/TicketIndex.vue';
import Oath from '../views/oath.vue';
import MainFrom from '../components/MainForm.vue';
import Result from '../views/Result.vue';
import VipTicketIndex from '../views/VipTicketIndex.vue';
import Invitation from '../views/Invitation.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/ExhibitionList/:type',
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
    },{
        path:"/Result",
        name: "Result",
        component: Result
    },{
        path:"/Invitation",
        name: "Invitation",
        component: Invitation
    },{
        path:"/VipTicketIndex",
        name: "VipTicketIndex",
        component: VipTicketIndex
    }

];

const router = new VueRouter({
    routes,
    mode: "history"
});
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
});
export default router;