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

const vuex_store = new Vuex.Store({
  state: {
    curUser: {
      username: "",
      role: "",
      isAdmin: false,
      company: "",
      fullname: "",
      isAuthenticated: false
    },
    configdoc: {
      companySource: [],
      companyAdmin: [],
      companyEmployee: [],
      workItem: [],
      workCategory: [],
      spareParts: [],
      securityTools: []
    },
    qcriteria: "",
    wcriteria: ""
  },
  mutations: {
  }
})

new Vue({
  el: '#app',
  router,
  store: vuex_store, //注入到vue
  template: '<App/>',
  components: {
    App
  },
  data: function () {
    this.$http.get('/login/isAuthenticated').then(response => {
      // success callback
      var isAuthenticated = false;
      if (response.body && response.body.isAuthenticated) {
        isAuthenticated = response.body.isAuthenticated;
      }
      if (isAuthenticated) {
        this.$store.state.curUser.username = response.body.username;
        this.$store.state.curUser.isAuthenticated = response.body.isAuthenticated;
        this.$store.state.curUser.role = response.body.role;
        this.$store.state.curUser.company = response.body.company;
        this.$store.state.curUser.fullname = response.body.fullname;
        this.$store.state.curUser.isAdmin = response.body.role==="Admin"?true:false;
        this.$store.state.curUser.isAdminOffice = response.body.role==="AdminOffice"?true:false;
        // if (response.body.role === "Admin") {
        //   this.$store.state.curUser.isAdmin = true;
        // } else {
        //   this.$store.state.curUser.isAdmin = false;
        // }
        var path = window.location.pathname;
        if (path === "/") {
          this.$router.push({
            path: '/home'
          })
        } else {
          this.$router.push({
            path: path
          })
        }

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
