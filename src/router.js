import Vue from 'vue'
import Router from 'vue-router'

import shop from '@/views/shop'
import item from '@/views/item'
import shopList from '@/views/shopList'
import checkOut from '@/views/checkout'
import payment from '@/views/payment'
import account from '@/views/account'

import login from '@/views/ManagerLogin'
import registrer from  '@/views/Register'

import order from '@/views/account/order'
import ads from '@/views/account/ads'

import '@/assets/css/app.css'


Vue.use(Router)

export default new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'shop',
      component:shop,
      /*meta: {
        requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
      }*/
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/Register',
      component:registrer
    },
    {
      path:'/item',
      name:'item',
      component:item,
      /*meta: {
        requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
      }*/
    },
    {
      path:'/shopList',
      name:'shopList',
      component:shopList,
      /*meta: {
        requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
      }*/
    },
    {
      path:'/checkOut',
      name:'checkout',
      component:checkOut,
      /*meta: {
         requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
       }*/
    },
    {
      path:'/payment',
      name:'payment',
      component:payment,
      /*meta: {
         requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
       }*/
    },
    {
      path:'/account',
      component:account,
      /*meta: {
        requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
      }*/
      children:[
        {
          path:'',
          name:'account',
          component:order
        },
        {
          path:'address',
          name:'ads',
          component:ads
        }
      ]
    },
    {
      path:'*',
      redirect:'/'
    }
    ]
})
