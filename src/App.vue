<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  padding: 0;
  margin: 0;
  background-color: #f4f4f4;
}

* {
  box-sizing: border-box;
}
.page-button-group {
  padding: 0 10px 15px;
}
.page-button-group .mint-button{
  display: block;
  width: 100%;
}

@font-face {font-family: "iconfont";
  src: url('assets/font/iconfont.eot?t=1519634515086'); /* IE9*/
  src: url('assets/font/iconfont.eot?t=1519634515086#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('assets/font/iconfont.ttf?t=1519634515086') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('assets/font/iconfont.svg?t=1519634515086#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-kaifa:before { content: "\e618"; }

.icon-sousuo:before { content: "\e7d4"; }

.icon-tianjia:before { content: "\e64d"; }

.icon-liuyan:before { content: "\e744"; }

.icon-daohangfenlei:before { content: "\e61b"; }

.icon-ai-img:before { content: "\e615"; }

.icon-guanbi:before { content: "\e635"; }

.icon-paixujiang:before { content: "\e6a3"; }

.icon-down:before { content: "\e616"; }

.icon-up:before { content: "\e617"; }

.icon-shouqijianpan:before { content: "\e62d"; }

.icon-tongzhi:before { content: "\e647"; }

.icon-xiangqing:before { content: "\e769"; }

.icon-webicon209:before { content: "\e687"; }

.icon-dakaijianpan:before { content: "\e619"; }

.icon-wodexiangmu01:before { content: "\e60e"; }

.icon-gouxuan:before { content: "\e631"; }

.icon-xiangmuxiaoxi:before { content: "\e60f"; }

.icon-add:before { content: "\e607"; }

.icon-tianjiatupian:before { content: "\e653"; }

.icon-xiangmu:before { content: "\e606"; }

.icon-erji-dingshirenwu:before { content: "\eaae"; }

.icon-drxx29:before { content: "\e710"; }


.todo-search-li{
  margin-bottom: -1px;
  &.active{
    .mint-radio-core{
      background-color: #3197eb;
      border-color: #3197eb;
      color: #fff;
      font-size: 14px;
      text-align: center;
      &:before{
        content: "\e631";
        vertical-align: -2px;
      }
    }
  }
}
</style>
