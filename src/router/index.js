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
 import OrderList from '../views/OrderList.vue';
 import OrderDetail from '../views/OrderDetail.vue';
 import MailDetail from '../views/MailDetail.vue';
 import MailList from '../views/MailList.vue';
 import ConsigneeText from '../views/consigneeText.vue';

 Vue.use(VueRouter);

 const routes = [{
         path: '/ExhibitionList',
         name: 'ExhibitionList',
         title:"展会列表",
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
         title:"普通观众订票",
         component: TicketIndex
     }, {
         path: "/oath",
         name: "oath",
         component: Oath
     }, {
         path: "/mainForm",
         name: "mainForm",
         component: MainFrom
     }, {
         path: "/Result/:result",
         name: "Result",
         title:"操作结果",
         component: Result
     }, {
         path: "/Invitation/:exhibitionCode",
         name: "Invitation",
         title:"邀请码",
         component: Invitation
     }, {
         path: "/VipTicketIndex/:exhibitionCode",
         name: "VipTicketIndex",
         title:"Vip观众订票",
         component: VipTicketIndex
     }, {
         path: "/OrderList",
         name: "OrderList",
         title:"订单列表",
         component: OrderList
     }, {
         path: "/MailList",
         name: "MailList",
         title:"邮寄列表",
         component: MailList
     }, {
         path: "/ConsigneeText",
         name: "ConsigneeText",
         title:"申请邮寄",
         component: ConsigneeText
     }, {
         path: "/OrderDetail/:id",
         name: "OrderDetail",
         title:"订单详情",
         component: OrderDetail
     }, {
         path: "/MailDetail/:id",
         name: "MailDetail",
         title:"快递详情",
         component: MailDetail
     }

 ];

 const router = new VueRouter({
     routes,
     base: "/mobile/newapp",
     mode: "history"
 });
 router.beforeEach((to, from, next) => {
     //console.log(to, from)
     if (to.name != "oath" && to.name != "home") {
         let loginState = localStorage.getItem("islogin");

         if (loginState == "true") {
             store.commit("setToken", localStorage.getItem("token"));
             next();
         } else {
             next("/oath?from=" + to.fullPath);
         }
     } else {
         next();
     }

 });
 router.afterEach((transition)=>{
    console.log(transition);
    setTitle("sjisajdo");
 });

 export default router;


 function setTitle(title) {
    document.title = title
    var mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none'
      var iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback);
          document.body.removeChild(iframe);
        }, 0);
      }
      iframe.addEventListener('load', iframeCallback);
      document.body.appendChild(iframe);
    }
  }