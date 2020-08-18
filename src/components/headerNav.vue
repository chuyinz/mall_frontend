<template>
  <div id="header">
    <div class="nav-global">
      <div class="container">
        <h1 class="nav-logo">
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-aside">
          <li class="nav-user">
            <a href="javascript:;">个人中心</a>
            <!--active-->
            <div class="nav-user-wrapper">
              <div class="nav-user-list">
                <dl class="nav-user-avatar">
                  <dd><span class="ng-scope"></span></dd>
                  <dt class="ng-binding">{{account}}</dt>
                </dl>
                <ul>

                  <router-link class="order" tag="li" :to="{ name: 'account'}">
                    <a>我的订单</a>
                  </router-link>
                  <router-link class="address" tag="li" :to="{ name: 'ads'}">
                    <a>收货地址</a>
                  </router-link>

                  <router-link @click.native="cleanToken" tag="li" :to="{name:'login'}"  active-class="current">
                    <a>登出</a>
                  </router-link>
                </ul>
              </div>
            </div>
          </li>
          <!--active-->
          <car-panel></car-panel>
        </ul>


        <ul class="nav-list">
<!--          <li><a href="javascript:;">做个锤子</a></li>-->
          <router-link tag="li" :to="{ name: 'shop'}"><a>做个锤子</a></router-link>
        </ul>



      </div>
    </div>
    <div class="nav-sub">
      <div class="nav-sub-wrapper">
        <div class="container">
          <ul class="nav-list">
            <router-link tag="li" :to="{ name: 'shop'}"><a>首页</a></router-link>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carPanel from '@/components/carPanel'

export default {
  name: 'headerNav',
  data () {
    return {
      account:''
    }
  },
  methods:{
    cleanToken(){
      //删除token

      localStorage.removeItem('jwtToken')
      localStorage.removeItem('account')
      this.$data.account='未登录'
    }
  },
  components: {
    carPanel
  },
  created(){
    this.account=localStorage.getItem('account')
    console.log('account')
    console.log(localStorage.getItem('account'))
  }
}
</script>

<style>

</style>
