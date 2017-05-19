import Vue from 'vue'
import Router from 'vue-router'
import HomeLayout from '@/components/HomeLayout'
import Login from '@/components/Login'
import PrintWorkForm from '@/components/PrintWorkForm'
import PrintMonthlyReport from '@/components/PrintMonthlyReport'
import PrintAnnuallyReport from '@/components/PrintAnnuallyReport'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/home',
      name: 'HomeLayout',
      component: HomeLayout
    },
    {
      path: '/printWorkForm',
      name: 'printWorkForm',
      component: PrintWorkForm
    },
    {
      path: '/printMonthlyReport',
      name: 'printMonthlyReport',
      component: PrintMonthlyReport
    },
    {
      path: '/printAnnuallyReport',
      name: 'printAnnuallyReport',
      component: PrintAnnuallyReport
    }
  ]
})
