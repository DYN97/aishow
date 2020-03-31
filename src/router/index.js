 /* jshint esversion: 6 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import ExhibitionList from '../views/ExhibitionList.vue';
import TicketIndex from '../views/TicketIndex.vue';
import Oath from '../views/oath.vue';
import MainFrom from '../components/MainForm.vue';
import Result from '../views/Result.vue';
import VipTicketIndex from '../views/VipTicketIndex.vue';
import Invitation from '../views/Invitation.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/ExhibitionList',
    name: 'ExhibitionList',
    component: ExhibitionList
},
{
    path: '/',
    name: 'home',
    component: Home
},
{
    path: '/TicketIndex/:exhibitionCode',
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
    path:"/Invitation/:exhibitionCode",
    name: "Invitation",
    component: Invitation
},{
    path:"/VipTicketIndex/:exhibitionCode",
    name: "VipTicketIndex",
    component: VipTicketIndex
}

];

const router = new VueRouter({
    routes,
    base:"/mobile/newapp",
    mode: "history"
});
router.beforeEach((to, from, next) => {
    //console.log(to, from)
    if (to.name != "oath"&&to.name!="home") {
        let loginState = sessionStorage.getItem("islogin");

        if (loginState == "true") {
            store.commit("setToken",sessionStorage.getItem("token"));
            next();
        } else {
            next("/oath?from=" + to.name);
        }
    } else {
        next();
    }

});
export default router;