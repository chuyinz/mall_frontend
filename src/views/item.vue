<template>
  <div id="item">
    <div class="store-content item">
      <div class="item-box">
        <div class="gallery-wrapper">
          <div class="gallery">

            <div class="thumb">
              <img :src="picUrl+curData.picture">
            </div>
          </div>

        </div>
        <div class="banner">
          <div class="sku-custom-title">
            <div class="params-price">
              <span><em>¥</em><i>{{ curData.price }}</i></span>
            </div>
            <div class="params-info">
              <h4>{{ curData.name }}</h4>
              <h6>{{ curData.introduce }}</h6>
            </div>
          </div>
          <div class="sku-dynamic-params-panel">
            <div class="sku-dynamic-params clear">
              <div class="params-name">数量</div>
              <div class="params-detail clear">
                <div class="item-num js-select-quantity">
                  <!-- down-disabled -->
                  <span class="down" @click="deCount">-</span>
                  <span class="num">{{ count }}</span>
                  <span class="up" @click="addCount">+</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sku-status">
            <div class="cart-operation-wrapper clearfix">
              <span class="blue-title-btn js-add-cart" @click="addCarPanelData()"><a>加入购物车</a></span>
              <!--              <span class="gray-title-btn"@click="buyNow(curData)"><a>现在就去</a></span>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li style="font-size: 20px">相关推荐：</li>
        </ul>
      </div>


      <div class="gray-box">

        <div class="gray-box item-box">
          <shop-item v-for="item , index in goodsData" :item="item" :key="index"></shop-item>
        </div>
      </div>
    </div>

    <prompt v-show="maxOff" tips="商品数量已到上限,不能继续添加"></prompt>

  </div>


</template>
<script>
import prompt from '@/components/prompt'
import shopItem from '@/components/shopItem'

export default {
  name: "item",
  data() {
    return {
      goodsData: [],
      picUrl: this.$store.state.baseUrl + '/img/',
      itemData: [
        {
          id: 1000271,
          name: "鳄梨",
          picture: require("../assets/img/鳄梨.jpg"),
          introduce: "TPU 环保材质、耐磨、耐油、耐久性强",
          price: 49,
          store: 5,
        },
        {
          id: 1000299,
          picture: require("../assets/img/苹果.jpg"),
          name: "苹果",
          introduce: "10000mAh 双向快充、轻盈便携、高标准安全保护",
          price: 4,
          store: 5,
        }],
      itemId: this.$route.query.itemId,
      curIndex: 0,
      count: 1
    }
  },
  components: {
    prompt,
    shopItem
  },
  computed: {
    curData() {//根据query过滤后的数据
      let curData =
          this.itemData.filter((item) => {
            return Number(item.id) === Number(this.itemId)
          })[0]
      return curData
    },
    maxOff() {//购物车单品数量最大限制
      return this.$store.state.maxOff
    }
  },
  methods: {
    tabIndex(index) {//切换细节展示
      this.curIndex = index
    },
    addCarPanelData() {
      this.$axios.post('/cart/addToCart', {
        goodsId: this.curData.id,
        number: this.count
      }).then(res => {
        let info = {data: this.curData, count: this.count}
        this.$store.commit('addCarPanelData', info)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '错误'
        })
        console.log(error)
      })


    },
    deCount() {//减少购买件数
      this.count = this.count - 1 <= 1 ? 1 : this.count - 1
    },
    addCount() {//增加购买件数
      this.count = this.count + 1 >= this.curData.store ? this.curData.store : this.count + 1
    },
    buyNow(data) {//现在购买
      let payload = {
        data: data,
        count: this.count
      }
      this.$store.commit('buyNow', payload)
      this.$router.push({name: 'checkout', query: {now: true}})
    }
  },
  created() {
    this.$axios.get('/goods/details/' + this.$route.query.itemId)
        .then(response => {
          this.itemData.push(response.data)
        }).catch(error => {
      this.$message({
        type: 'error',
        message: '获取商品信息失败！'
      })
      connsole.log(error)
    })
    //获取相关推荐

    this.$axios.get('goods/multiSimilarGoods/' + this.$route.query.itemId)
        .then(response => {
          this.goodsData = response.data
        }).catch(error => {
      console.log(eror)
    })
  }

}
</script>
<style>
.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, .14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
}

.sku-box {
  position: relative;
}

.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}

.sku-box .item {
  position: relative;
  float: left;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  width: 25%;
  height: 429px;
  background: #fff;
  box-sizing: border-box
}

.sku-box .item:hover {
  box-shadow: 0 0 38px rgba(0, 0, 0, .08) inset;
  transition: all .15s ease;
}

.sku-box .item .item-img img {
  display: block;
  width: 206px;
  height: 206px;
  margin: 50px auto 10px;
}

.sku-box .item h3, .sku-box .item h6 {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sku-box .item h6 {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
}

.sku-box .item h3 {
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  margin: 8px auto 14px;
}

.sku-box .item .params-colors {
  margin-top: 23px;
  text-align: center;
}

.sku-box .item .colors-list {
  display: inline-block;
  overflow: hidden;
}

.sku-box .item .colors-list li {
  float: left;
  margin: 0 5px;
}

.sku-box .item .colors-list > li a {
  width: 8px;
  height: 8px;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  padding: 2px;
  display: block;
}

.sku-box .item .colors-list > li a.active {
  box-shadow: inset 0 0 0 1px #b2b2b2;
  border-color: #b2b2b2;
}

.sku-box .item .colors-list > li img {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  display: block;
}

.sku-box .item .item-btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 29px;
  text-align: center;
  opacity: 0;
  z-index: 10;
}

.sku-box .item:hover .item-btns {
  opacity: 1;
  transition: all .2s ease-in;
}

.sku-box .item .item-btns .item-blue-btn, .sku-box .item .item-btns .item-disabled-btn, .sku-box .item .item-btns .item-gray-btn, .sku-box .item .item-btns .item-green-btn {
  display: inline-block;
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  font-size: 12px;
  line-height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 200;
  transition: all .1s ease;
}

.sku-box .item .item-btns .item-gray-btn {
  border: 1px solid #d5d5d5;
  color: #646464;
}

.sku-box .item .item-btns .item-gray-btn a {
  display: block;
  color: #a1a1a1;
}

.sku-box .item .item-btns .item-gray-btn:hover {
  background-image: linear-gradient(#f6f6f6, #ededed);
}

.sku-box .item .item-btns .item-blue-btn {
  background-color: #5c85e5;
  background-image: linear-gradient(#779ae9, #5078df);
  border: 1px solid #5c81e3;
  color: #fff;
  margin-left: 10px;
}

.sku-box .item .item-btns .item-blue-btn:hover {
  border: 1px solid #5374c8;
  background-color: #5074db;
  background-image: linear-gradient(#6e8ed5, #4769c2);
}

.sku-box .item .item-btns .item-blue-btn:active {
  border: 1px solid #3e61d7;
  background-color: #5c85e5;
  background-image: linear-gradient(#4d72de, #6189e6);
}

.sku-box .item .item-price {
  font-family: Arial;
  color: #c30a18;
  margin-top: 24px;
  text-align: center;
  opacity: 1;
}

.sku-box .item .item-price i {
  font-size: 16px;
}

.sku-box .item .item-price span {
  font-size: 18px;
  padding-left: 4px;
}

.sku-box .item:hover .item-price {
  opacity: 0;
  transition: all .1s ease-out;
}

.sku-box .item .discount-icon {
  display: none;
}

.sku-box .item .item-cover a {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 310px;
}


.item .item-box {
  width: 1098px;
  padding: 60px;
  margin-bottom: 20px;
  display: table;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, .14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
}

.banner, .gallery-wrapper {
  display: table-cell;
}

.gallery-wrapper {
  vertical-align: top;
}

.gallery {
  float: left;
  width: 540px;
  display: table-cell;
}

.thumb, .thumbnail {
  display: table-cell;
  vertical-align: middle;
}

.thumbnail li {
  width: 54px;
  height: 54px;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, .06);
  border-radius: 5px;
  cursor: pointer;
}

.thumbnail li:first-child {
  margin-top: 0;
}

.thumbnail li.on {
  padding: 10px;
  border: 3px solid #ccc;
  border: 3px solid rgba(0, 0, 0, .2);
}

item-box img {
  max-width: 100%;
  height: auto;
}

.thumb > ul {
  margin-left: 20px;
  width: 440px;
  height: 440px;
  position: relative;
}

.thumb li {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  opacity: 0;
  text-align: center;
  user-select: none;
}

.thumb li.on {
  animation: thumb-change .35s ease-out 1;
  position: relative;
  display: block;
  z-index: 1;
  opacity: 1;
}

.item-box .banner {
  vertical-align: middle;
  width: 450px;
  margin-left: 10px;
}

.item-box .banner .sku-custom-title {
  overflow: hidden;
  padding: 8px 8px 18px 10px;
  position: relative;
}

.item-box .banner .params-price {
  position: absolute;
  right: 8px;
  bottom: 19px;
}

.item-box .banner .params-price span {
  display: block;
  color: #de4037;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
}

.item-box .banner .params-price span i {
  padding-left: 2px;
  font-size: 24px;
}

.item-box .banner .sku-custom-title .params-info {
  width: 360px;
}

.item-box .banner .sku-custom-title h4 {
  font-size: 24px;
  line-height: 1.25;
  color: #000;
  margin-bottom: 13px;
}

.item-box .banner .sku-custom-title h6 {
  font-size: 14px;
  line-height: 1.5;
  color: #bdbdbd;
}

.item-box .banner .sku-dynamic-params-panel {
  padding: 29px 0 8px 10px;
  border-top: 1px solid #ebebeb;
}

.item-box .banner .sku-dynamic-params {
  margin-bottom: 19px;
}

.item-box .banner .params-name {
  float: left;
  padding-right: 20px;
  font-size: 14px;
  color: #8d8d8d;
  line-height: 36px;
}

.item-box .banner .sku-dynamic-params .params-colors {
  float: left;
  line-height: 36px;
  margin: -10px 0 0 -10px;
  width: 402px;
}

.item-box .banner .sku-dynamic-params .params-colors > li {
  float: left;
  margin: 10px 0 0 10px;
}

.item-box .banner .sku-dynamic-params .params-colors > li a {
  display: block;
  width: 26px;
  height: 26px;
  border: 2px solid #E5E5E5;
  padding: 3px;
  text-align: center;
  color: #757575;
  border-radius: 50%;
}

.item-box .banner .sku-dynamic-params .params-colors > li.cur a {
  border-color: #B2B2B2;
  box-shadow: inset 0 0 0 1px #B2B2B2;
}

.item-box .banner .sku-dynamic-params .params-colors > li i, .item-box .banner .sku-dynamic-params .params-colors > li img {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 50%;
}

.item-box .banner .sku-dynamic-params {
  margin-bottom: 19px;
}

.item-box .banner .params-detail {
  line-height: 36px;
  float: left;
  width: 392px;
}

.item-box .item-num {
  float: left;
  width: 128px;
}

.item-box .item-num .down:before, .item-box .item-num .up:before {
  content: '';
  position: absolute;
  left: -4px;
  right: -4px;
  top: 0;
  height: 45px;
  background: url(../assets/img/cart-updown-item.png) no-repeat;
  background-size: 100% auto;
}

.item-box .item-num .down:before {
  content: " ";
  background-position: 0 -60px;
}

.item-box .item-num .down:hover:before {
  content: " ";
  background-position: 0 -180px;
}

.item-box .item-num .down.down-disabled:before, .item-box .item-num .down.down-disabled:hover:before {
  content: " ";
  background-position: 0 -300px;
}

.item-box .item-num .down, .item-box .item-num .up {
  position: relative;
  float: left;
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 40px;
  text-indent: -9999em;
  cursor: pointer;
  user-select: none;
}

.item-box .item-num .down.down-disabled, .item-box .item-num .up.up-disabled {
  cursor: not-allowed;
}

.item-box .item-num .up:before {
  background-position: 0 0;
}

.item-box .item-num .up:hover:before {
  background-position: 0 -120px;
}

.item-box .item-num .up.up-disabled:before, .item-box .item-num .up.up-disabled:hover:before {
  content: " ";
  background-position: 0 -240px;
}

.item-box .item-num .num {
  position: relative;
  overflow: hidden;
  float: left;
  display: inline-block;
  width: 56px;
  height: 18px;
  margin: 7px 0 0;
  border: none;
  border-radius: 3px;
  line-height: 18px;
  text-align: center;
  font-size: 14px;
}

.item-box .item-num input {
  width: 56px;
  height: 18px;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  padding: 0;
}

.item-box .item-num ul {
  /*display: none;*/
  position: absolute;
  left: 0;
  top: 0;
  width: 56px;
}

.item-box .item-num ul li {
  width: 56px;
  height: 18px;
}

.item-box .sku-status {
  position: relative;
  border-top: 1px solid #ebebeb;
  padding: 30px 0 0 10px;
}

.item-box .blue-title-btn {
  float: left;
  display: inline-block;
  width: 143px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 7px;
  border: 1px solid #5c81e3;
  background-color: #5c85e5;
  background-image: linear-gradient(#779ae9, #5078df);
  color: #fff;
  cursor: pointer;
}

.item-box .blue-title-btn:hover {
  transition: all .15s ease-out;
  box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48, 77, 147, .4);
}

.item-box .blue-title-btn a, .item-box .green-title-btn a {
  color: #fff;
}

.item-box .cart-operation-wrapper .gray-title-btn {
  margin-left: 20px;
}

.item-box .gray-title-btn {
  display: inline-block;
  width: 143px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: linear-gradient(#fff, #fafafa);
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  color: #8c8c8c;
  cursor: pointer;
}

.item-box .gray-title-btn:hover {
  transition: all .15s ease-out;
  background: linear-gradient(#f6f6f6, #ededed);
}
</style>
