<template>
  <li class="nav-cart" @mouseenter="showCar($event)" @mouseleave="hideCar($event)">
    <a href="javascript:;" class="ball-rect">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{'cart-num':calTotalCount}">
      <i>{{calTotalCount}}</i>
    </span>
    <div class="nav-cart-wrapper" v-show="carShow">
      <div class="nav-cart-list">
        <div class="empty" v-if="!calTotalCount">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                      </div>
                      <div class="full" v-else>
                        <div class="nav-cart-items">
                          <ul>
                            <li class="clear" v-for="item in carPanelData">
<!--                              {{item}}-->
                              <div class="cart-item js-cart-item cart-item-sell">
                                <div class="cart-item-inner">
                                  <div class="item-thumb">
                                    <img :src="picUrl+item.picture">
                                  </div>
                                  <div class="item-desc">
                                    <div class="cart-cell">
                                      <h4>
                                      <a href="#/item/100027401">{{item.name}}</a>
                        </h4>
                        <p class="attrs">
                          <span>{{item.name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click = "delCarPanelData(item)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{calTotalCount}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{calTotalPrice}}</span></h5>
            <h6>
              <router-link class="nav-cart-btn" :to="{ name: 'shopList'}">去购物车</router-link>
              </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车小球 -->
    <transition
      name="ball"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-bind:css="true"
    >
      <div class="addcart-mask" v-show="ball.show" @mouseleave="ballLeave">
        <img class="mask-item"/>
      </div>
    </transition>
  </li>
</template>
<script>
export default {
  name: "carPanel",
  data: () => ({
    mousetoBall:false, //防止鼠标移入移动的小球 导致购物车隐藏
    picUrl:''
  }),
  computed:{
    carPanelData(){ //购物车数据
      return this.$store.state.carPanelData
    },
    calTotalCount(){//购物车总数量
      return this.$store.getters.calTotalCount
    },
    calTotalPrice(){//购物车总价格
      return this.$store.getters.calTotalPrice
    },
    carShow(){//购物车是否显示
      return this.$store.state.carShow
    },
    ball(){
      return this.$store.state.ball
    }
  },
  methods: {
    delCarPanelData(data) {//删除一条数据
      this.$axios.delete('/cart/deleteGoods/'+data.id)
              .then(res=>{
                this.$store.commit('delCarPanelData',data)
              }).catch(error=>{
        this.$message({
          type:'error',
          message:'删除失败'
        })
      })
    },
    showCar(ev){//显示购物车
      this.$store.commit('showCar')
    },
    hideCar(ev){//隐藏购物车
      if(!this.mousetoBall){//防止鼠标移入移动的小球 导致购物车隐藏
        this.$store.commit('hideCar')
      }
      this.mousetoBall = false
    },
    ballLeave(){//移入并移出了小球
      this.mousetoBall = true
    },
    // 小球飞入
    beforeEnter(el){//初始化小球
      let rect = this.ball.el.getBoundingClientRect() //按钮位置信息
      let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect() //购物车位置信息
      let ball = document.getElementsByClassName('mask-item')[0]//小球
      let x = rectEl.left - rect.left  - rect.width/2//购物车 与 按钮 横向距离距离
      let y = rect.top - rectEl.top   //购物车 与 按钮 纵向距离距离


      el.style.transform = 'translate3d(0,'+y+'px,0)'
      ball.style.transform = 'translate3d(-'+x+'px,0,0)'
      ball.src = this.ball.img

    },
    enter(el){
      let a = el.offsetHeight //让浏览器主动渲染一下
      let ball = document.getElementsByClassName('mask-item')[0]//小球
      el.style.transform = 'translate3d(0,0,0)'
      ball.style.transform = 'translate3d(0,0,0)'
    },
    afterEnter(){
      this.ball.show = false
    }
  },
  created(){
    this.picUrl=this.$store.state.baseUrl+'/img/'
    this.$axios.get('/cart/getAllGoods')
            .then(response=>{
              let temp=response.data
              for(var i=0;i<response.data.length;i++){
                  temp[i].checked=true
              }
              this.$store.commit("initCarPaneData",temp)
            }).catch(error=>{
      this.$message({
        type:'error',
        message:'购物车初始化失败'
      })
      console.log(error)
    })
  }
}
</script>
<style>
/* 小球 */
.addcart-mask{
  position: absolute;
  left:0;
  top: 0;
  z-index: 9999;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.mask-item{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.ball-enter-active{
  transition: 500ms cubic-bezier(.04,.58,.82,1.26);
}
.ball-enter-active .mask-item{
  transition: 500ms cubic-bezier(0,0,1,1);
}
</style>
