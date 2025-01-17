import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import api from './utils/api';

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$store = store;

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');