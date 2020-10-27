import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active:0,
    footer_list: [{
        name: "首页",
        path: '/',
        icon: "#icon-niu1"

      },
      {
        name: "课程",
        path: 'course',
        icon: "#icon-shu"


      },
      {
        name: "约课记录",
        path: 'record',
        icon: "#icon-ditu-shouzhi"

      },
      {
        name: "练习",
        path: 'practise',
        icon: "#icon-lianxiben"

      },
      {
        name: "我的",
        path: 'person',
        icon: "#icon-My"

      }
    ]
  },
  mutations: {
    active(state,index){
     state.active = index
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});