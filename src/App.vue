<template>
  <div id="app">
    <header-nav v-if="this.$route.fullPath.toLowerCase()!='/login'&&this.$route.fullPath.toLowerCase()!='/register'" />
    <router-view ></router-view>
  </div>

</template>

<script>
  import headerNav from '@/components/headerNav'

export default {

  name: 'app',
  components: {
    headerNav
  },

/*  mounted(){
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function (e) {

      var e = window.event||e
      e.returnValue=("确定离开当前页面吗？");
    }
  }*/
}
</script>

<style >

</style>
