<template>
  <div class="item">

    <div>



      <div class="item-img">
        <img  :alt="item.name" :src="picUrl+item.picture" style="opacity: 1;">

      </div>
      <h6>{{item.name}}</h6>
      <h3 >{{item.introduce}}</h3>

      <div class="item-btns clearfix">
        <span class="item-gray-btn"><router-link :to="{ name: 'item',query:{itemId:item.id}}">查看详情</router-link></span>
        <span class="item-blue-btn" @click = "addCarPanelData(item)">加入购物车 </span>
      </div>


      <div class="item-price clearfix">
        <i>¥</i><span>{{item.price}}</span>
      </div>
      <div class="discount-icon">false</div>


      <div class="item-cover">
        <router-link :to="{ name: 'item',query:{itemId:item.id}}"></router-link>
      </div>



    </div>


  </div>


</template>
<script>



export default {
  name: "shopItem",
  props:{
    item:{
      type:Object
    }
  },
  data: () => ({
    picUrl:'',
    itemIndex:0 //控制选中的索引
  }),
  methods: {
    addCarPanelData(item){
      this.$axios.post('/cart/addToCart',{
        goodsId:item.id,
        number:1
      }).then(res=>{
        let info = {data:item,count:1}
        this.$store.commit('addCarPanelData',info)
      }).catch(err=>{
        this.$message({
          type:'error',
          message:'添加失败'
        })
      })


    }
  },
  created(){
    this.picUrl=this.$store.state.baseUrl+'/img/'
  }
}
</script>
<style>
</style>
