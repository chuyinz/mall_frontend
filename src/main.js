import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import store from './store/index.js'
import './plugins/element.js'

Vue.config.productionTip = false





//router配置守卫拦截
router.beforeEach((to, from, next) => {

  // if (to.matched[0].meta.requiresAuth){  // 判断该路由是否需要登录权限
  if (to.matched.some(item=>{return  item.meta.requiresAuth})){  // 判断该路由是否需要登录权限
    console.log('守卫拦截')
      // console.log(localStorage.getItem("jwtToken"))
    if (localStorage.getItem("jwtToken")!=null) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login'
      })
    }
  }
  else {
    next();
  }
});



//请求拦截器
axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      // console.log('拦截成功')
      console.log(config)
      //拦截添加token
      if(config.url!='/api/login'){
        config.headers.Authorization='Bearer '+localStorage.getItem('jwtToken')
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response;
    },
    function(error) {
      // Do something with response error

      return Promise.reject(error);
    }
);





new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
