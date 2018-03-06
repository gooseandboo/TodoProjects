<template>
    <div class="common-searchbar-inner">
      <i class="iconfont icon-sousuo"></i>
      <input type="search" placeholder="搜索" name="" @focus="handleinput()">
    </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      
    }
  },
  props: ['href'],
  computed: {
    // Getting Vuex State from store/modules/cusquotes
  },
  methods: {
    handleinput:function() {
      console.log(this.href);
      if(this.href){
        this.$router.push('/select');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .common-searchbar-inner{
    background-color: #fff;
    border-radius: 3px;
    height: 28px;
    padding: 4px 6px;
    border: 1px solid #d1d0d5;
    display: flex;
    flex: auto;
  }
  .common-searchbar-inner .iconfont{
    font-size: 12px;
    line-height: 18px;
    color: #959595;
    margin-right: 5px;
  }
  .common-searchbar-inner input{
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    outline: 0;
  }
</style>
