<template>
  <div class="common-page">
  	<div class="todo-search">
  		<img slot="icon" :src="head" width="36" height="36">
    	<mt-search autofocus v-model="value" :show="true" :result="filterResult">
    		<div class="todo-search-li" :class="{'active': item.active==true}" v-for="item in filterResult" @click="selMember(item)">
	    		<mt-cell
				    :title="item.title">
				    <img slot="icon" :src="item.head" width="40" height="40">
				    <span class="mint-radio is-right"><span class="mint-radio-core iconfont"></span></span>
				  </mt-cell>
			  </div>
    		<!-- <mt-cell
			    v-for="item in filterResult"
			    :title="item.title"
			    @click="selMember(item)">
			    <img slot="icon" :src="item.head" width="40" height="40">
			    <span class="mint-radio is-right"><span class="mint-radio-core"></span></span>
			  </mt-cell> -->
    	</mt-search>
    </div>
    div.

  </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      msg: '这里是成员页',
      value: null,
      selValue: null,
      head: '/static/head.png',
      defaultResults: [{
	    	title: '唐慧明',  
	    	value: 'tanghuiming',
	    	head: '/static/head/4.png'
	    },  
	    {  
	    	title: '张映国',  
	    	value: 'zhangyingguo',
	    	head: '/static/head/5.png'
	    },  
	    {  
	    	title: '李玉建',  
	    	value: 'liyujian',
	    	head: '/static/head/6.png'
	    },  
	    {  
	    	title: '杨思琦',  
	    	value: 'yangsiqi',
	    	head: '/static/head/7.png'
	    }],
    }
  },
  created() {

  },
  computed: {
    filterResult() {
    	return this.defaultResults.filter(value => {
    		//如果数据为空时，显示所有选项
    		if(this.value==null)
					return this.defaultResults;
    		else
    			return new RegExp(this.value, 'i').test(value.value+value.title)
    	});
      // return this.defaultResult.filter(value => {
      // 	console.log(value);
      // 	console.log(this.value);
      // 	new RegExp(this.value, 'i').test(value)
      // });
    }
  },
  methods: {
  	selMember(obj) {
			console.log(obj);
			this.head = obj.head;
			for( var i of this.defaultResults){
				i.active = false;
			}
			obj.active = true;
			
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todo-search{
	display: flex;
	height: 44px;
	background-color: #fff;
	vertical-align: middle;
	padding-left: 10px;
	img{
		border-radius: 50%;
		align-self: center;
	}
	.mint-search{
		flex: 1;
	}
	.mint-searchbar{
		padding-left: 0px;
		background-color: #ffffff;
		.mintui-search{
			font-size: 14px;
		}
	}
	.mint-search-list{
		display: block;
	}
	.mint-cell-title{
		margin-top: 8px;
		margin-bottom: 8px;
	}
}


</style>
