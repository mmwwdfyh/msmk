import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


//vant 组件

import Vant from 'vant';
import 'vant/lib/index.css';
import '../public/resset.css';

Vue.use(Vant);



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
