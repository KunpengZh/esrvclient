// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import Vuex from 'vuex';

Vue.use(Vuex);

Vue.use(vueResource);

Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

const  vuex_store = new Vuex.Store({
    state:{
        curUser:{
            username:"",
            role:"",
            isAdmin:false,
            company:""
        },
        configdoc:{
          companySource:[],
          companyAdmin:[],
          companyEmployee:[],
          workItem:[],
          workCategory:[]
        }
    },
    mutations:{
      //   isAdmin:function(){
      //   return state.curUser.role==="Admin"
      // }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:vuex_store, //注入到vue
  template: '<App/>',
  components: {
    App
  },
  data: function () {
    this.$http.get('/login/isAuthenticated').then(response => {
      // success callback
      console.log(response.body);
      var isAuthenticated = false;
      if (response.body && response.body.isAuthenticated) {
        isAuthenticated = response.body.isAuthenticated;
      }
      if (isAuthenticated) {
        this.$store.state.curUser.username=response.body.user;
        this.$store.state.curUser.isAuthenticated=response.body.isAuthenticated;
        this.$store.state.curUser.role=response.body.role;
        this.$store.state.curUser.company=response.body.company;
        if(response.body.role==="Admin"){
          this.$store.state.curUser.isAdmin=true;
        }else{
          this.$store.state.curUser.isAdmin=false;
        }
        this.$router.push({
          path: '/home'
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    }, response => {
      // error callback
      console.log(response.body);
    });
    return {};
  }
});
