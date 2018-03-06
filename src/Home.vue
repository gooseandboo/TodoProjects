<template>
  <div class="page-tabbar">
    <div class="page-wrap">
    	<div class="head-flex-module">
		   	<comSelect href="select"></comSelect>
				<mt-button :class="{'head-flex-btn' : true,'active':selpopupVisible==true}" @click="selpopupVisibleTog()" >
				  <i slot="icon" class="iconfont icon-daohangfenlei"></i>
				</mt-button>
				<mt-button :class="{'head-flex-btn' : true,'active':sortpopupVisible==true}" @click="sortpopupVisibleTog()" v-show="selected!='项目'">
				  <i slot="icon" class="iconfont icon-paixujiang"></i>
				</mt-button>
		  </div>
		  <mt-popup v-model="selpopupVisible" popup-transition="popup-fade" class="todo-popup">
		  	<template v-if="selected=='任务'">
		  		
		  		<mt-radio
				  align="right"
				  title="类型"
				  class="page-part"
				  v-model="typeValue"
				  :options="typeTaskOptions"/>
				  <mt-radio
				  align="right"
				  title="状态"
				  class="page-part"
				  v-model="stateValue"
				  :options="stateTaskOptions"/>
					
					<div class="btn-wraper">
						<mt-button size="small" @click="selTodoType()">取消</mt-button>
						<mt-button size="small" type="primary" @click="selTodoType()">确定</mt-button>
					</div>
		  	</template>
		  	<!-- <template v-else-if="selected=='项目'">
		  		<mt-radio
				  align="right"
				  class="page-part"
				  v-model="selValue"
				  :options="selTodoOptions"
				  @change="selTodoType()" />
		  	</template> -->
		  	<template v-else>
		  		<mt-radio
				  align="right"
				  class="page-part"
				  v-model="selValue"
				  :options="selected=='项目'?selItemOptions:selTodoOptions"
				  @change="selTodoType()" />
		  	</template>
			</mt-popup>
			<mt-popup v-model="sortpopupVisible" popup-transition="popup-fade" class="todo-popup">
			  <mt-radio
			  align="right"
			  class="page-part"
			  v-model="sortValue"
			  :options="sortTodoOptions"
			  @change="sortTodo()" />
			</mt-popup>
			<mt-cell-swipe
      	class="todo-swipe"
			  v-for="n in ListData"
			  :to="n.to"
			  :right="taskButtons"
			  >
			  <div class="todo-swipe-title">
			  	<span class="todo-icon" v-show="selected=='项目'"><i class="iconfont icon-xiangmuxiaoxi" slot="icon"></i></span>
			  	<span class="todo-grade" v-show="n.grade">[<span>{{n.grade}}</span>]</span>
			  	<div>{{n.title}}</div>
			  	<div class="expires-time">{{n.value}}</div>
			  </div>
			  <div class="todo-swipe-label" v-show="selected!='项目'">负责人:{{n.label}}</div>
			</mt-cell-swipe>
      <!-- <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="待办">
        	
        </mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="任务">
		    	<mt-popup v-model="selpopupVisible" popup-transition="popup-fade" class="todo-popup">
			      <mt-radio
				      align="right"
				      class="page-part"
				      v-model="selValue"
				      :options="selTodoOptions"
				      @change="selTodoType()" />
			    </mt-popup>
			    <mt-popup v-model="sortpopupVisible" popup-transition="popup-fade" class="todo-popup">
			      <mt-radio
				      align="right"
				      class="page-part"
				      v-model="sortValue"
				      :options="sortTodoOptions"
				      @change="sortTodo()" />
			    </mt-popup>
          <mt-cell-swipe
          	class="todo-swipe"
			      v-for="n in TaskList"
			      :to="n.to"
			      :right="rightButtons"
			      >
			      <div class="todo-swipe-title"><div class="todo-grade" v-show="n.grade">[<span>{{n.grade}}</span>]</div><span>{{n.title}}</span><div class="expires-time">{{n.value}}</div></div>
			      <div class="todo-swipe-label">负责人:{{n.label}}</div>
			    </mt-cell-swipe>
        </mt-tab-container-item>
        <mt-tab-container-item id="项目">
          <mt-cell v-for="n in 7" :title="'发现 ' + n" />
        </mt-tab-container-item>
      </mt-tab-container> -->
    </div>
    <div class="add-todo" @click="routerDetail()">
    	<i class="iconfont icon-tianjiatupian"></i>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="待办">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i class="iconfont icon-drxx29" slot="icon"></i>
        待办
      </mt-tab-item>
      <mt-tab-item id="任务">
      	<i class="iconfont icon-erji-dingshirenwu" slot="icon"></i>
        任务
      </mt-tab-item>
      <mt-tab-item id="项目">
      	<i class="iconfont icon-xiangmuxiaoxi" slot="icon"></i>
        项目
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import comSelect from '@/components/select'
export default {
  name: 'Home',
  data() {
    return {
      selected: '待办',
			selpopupVisible: false,
			sortpopupVisible: false,
			buttonBottom: 0,
      selValue: '',
      selTodoOptions : [
      	{
	      	label: '全部',  
	      	value: 'all'  
	      },  
	      {  
	      	label: '任务',  
	      	value: 'task'  
	      },  
	      {  
	      	label: '需求',  
	      	value: 'demand'  
	      },  
	      {  
	      	label: '缺陷',  
	      	value: 'defect'  
	      }
      ],
      sortValue: '',
      sortTodoOptions: ['按最后更新时间','按到期时间','按分级'],
			typeValue: '',
			typeTaskOptions: [{
	      	label: '全部',  
	      	value: 'all'  
	      },  
	      {  
	      	label: '抄送我的',  
	      	value: 'copy'  
	      },  
	      {  
	      	label: '我的关注',  
	      	value: 'attention'  
	      },  
	      {  
	      	label: '我负责的',  
	      	value: 'charge'  
	      },  
	      {  
	      	label: '我审核的',  
	      	value: 'aduit'  
	      },  
	      {  
	      	label: '我创建的',  
	      	value: 'create'  
	      }],
			stateValue: '',
			stateTaskOptions: [{
	    	label: '进行中',  
	    	value: 'underway'  
	    },  
	    {  
	    	label: '已完成',  
	    	value: 'completed'  
	    }],
	    selItemOptions: [{
	    	label: '进行中',  
	    	value: 'underway'  
	    },  
	    {  
	    	label: '完成',  
	    	value: 'completed'  
	    },  
	    {  
	    	label: '全部',  
	    	value: 'all'  
	    },  
	    {
	    	label: '取消',  
	    	value: 'cancel'  
	    }],

      TodoList : [
      	{
      		title: '需求1',
      		to: '/todoDetail',
	      	label: '负责人：刘世杰',  
	      	value: '过期15天',
	      	grade: '高'
	      },  
	      {  
	      	title: '需求2',
	      	label: '任务',  
	      	value: '过期15天'  
	      },  
	      {  
	      	title: '需求3',
	      	label: '需求',  
	      	value: ' '  
	      },  
	      {  
	      	title: '需求4',
	      	label: '缺陷',  
	      	value: '过期15天'  
	      }
      ],
      TaskList : [
	      {  
	      	title: '需求2',
	      	label: '任务',  
	      	value: '过期15天'  
	      },  
	      {  
	      	title: '需求3',
	      	label: '需求',  
	      	value: ' '  
	      },  
	      {  
	      	title: '需求4',
	      	label: '缺陷',  
	      	value: '过期15天'  
	      },
	      {
      		title: '需求1',
      		to: '/todoDetail',
	      	label: '负责人：刘世杰',  
	      	value: '过期15天',
	      	grade: '高'
	      },
	      {  
	      	title: '需求3',
	      	label: '需求',  
	      	value: ' '  
	      }
      ],
      ItemList : [
	      {  
	      	title: '项目1',
	      	value: '过期15天'  
	      },  
	      {  
	      	title: '项目2', 
	      	value: '03-09 到期'  
	      },  
	      {  
	      	title: '项目3',
	      	value: '过期15天'  
	      },
	      {
      		title: '测试项目',
      		to: '/todoDetail', 
	      	value: '过期15天',
	      },
	      {  
	      	title: '测试项目111',
	      	value: ' '  
	      }
      ],

    };
  },
  watch:{
    selected:function(val){
      console.log(val);
      if(val == '待办'){
      	this.ListData = this.TodoList;
      }else if(val == '任务'){
      	this.ListData = this.TaskList;
      }else{
      	this.ListData = this.ItemList;
      }
    }
  },
  created() {
    this.rightButtons = [
      {
        content: '已完成',
        style: { background: 'red', color: '#fff' },
        handler: () => this.$messagebox('delete')
      }
    ];
    this.taskButtons = [
      {
        content: '已完成',
        style: { background: 'red', color: '#fff' },
        handler: () => this.$messagebox('delete')
      }
    ];
    this.ListData = this.TodoList;
  },
  components: { comSelect },
  methods: {
  	selTodoType:function(){
			let val = this.selValue;
			this.selpopupVisible = false;
  	},
  	sortTodo: function(){
			this.sortpopupVisible = false;
		},
  	selpopupVisibleTog:function(){
  		this.sortpopupVisible = false;
  		this.selpopupVisible = !this.selpopupVisible;
  	},
  	sortpopupVisibleTog:function(){
  		this.selpopupVisible = false;
  		this.sortpopupVisible = !this.sortpopupVisible;
  	},
  	routerDetail:function(){
  		console.log(this.selected);
  		if(this.selected=='待办'){
  			this.$router.push('/todo/add');
  		}
  	}
  }
};
</script>

<style lang="scss">
.head-flex-module{
	display: flex;
	position: relative;
	z-index: 3000;
	justify-content: space-between;
	padding: 15px 18px;
	align-items: center;
	background-color: #f0eff5;
}
.btn-wraper{
	text-align: center;
	.mint-button{
		margin: 10px;
	}
}
.mint-tabbar.is-fixed{
	z-index: 3000;
}
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
	.mint-tabbar > .mint-tab-item.is-selected{
		background-color: transparent;
	}
  .mint-tab-item-icon .iconfont{
  	font-size: 20px;
  }
  .head-flex-btn{
  	height: 28px;
  	padding: 0 8px;
  	border-color: #d1d0d5;
  	margin-left: 15px;
  	background-color: #fff;
  }
  .head-flex-btn.active{
		color: #26a2ff;
  }
  .todo-popup{
  	width: 100%;
  	top: 57px;
  	transform: none;
  	left: 0;
  	text-align: left;
  }
  .mint-cell:first-child .mint-cell-wrapper{
		background-image: none;
  }
  .todo-popup .mint-cell-wrapper{
  	background-image:-webkit-linear-gradient(top, #e7e7e7, #e7e7e7 50%, transparent 50%);
    background-image:linear-gradient(180deg, #e7e7e7, #e7e7e7 50%, transparent 50%);
    color: #070707;
  }
  .todo-popup .mint-radiolist-title{
  	// display: none;
  	margin: 0;
  	padding: 8px 10px;
  	background-color: #f4f4f4;
  }
  .todo-popup .mint-radio-core{
  	border: none;
  }
  .todo-popup .mint-radio-input:checked + .mint-radio-core{
  	font-family:"iconfont" !important;
  	color: #26a2ff;
  	background-color: transparent;
  	font-size: 22px;
  }
  .todo-popup .mint-radio-input:checked + .mint-radio-core:after{
  	content: "\e631";
		width: 20px;
		height: 20px;
		top: 0;
		left: 0;
  }
  .v-modal{
  	background-color: #ececec;
  	opacity: .8;
  }
  .todo-swipe{
  	.todo-icon{
  		width: 40px;
  		height: 40px;
  		line-height: 40px;
  		text-align: center;
  		border-radius: 5px;
  		background-color: #55bb4e;
  		color: #fff;
  		margin: 3px 10px 3px 0;
  		.iconfont{
  			font-size: 20px;
  		}
  	}
		.todo-swipe-title{
			display: flex;
			align-items:: center;
			color: #000;
			line-height: 24px;
			>div{
				flex-grow: 1;
			}
		}
  	.mint-cell-value{
			width: 100%;
			display: block;
			text-align: left;
			margin: 10px 0;
	  }
	  .todo-swipe-label{
	  	font-size: 12px;
	  	margin-top: 10px;
	  }
	  .expires-time{
	  	font-size: 12px;
	  	text-align: right;
	  	color: #5f5f5f;
	  }
  }
  .todo-grade{
  	color: #dc3543;
  	font-size: 14px;
  	vertical-align: 1px;
  	display: inline-block;
  	margin-right: 5px;
  }
  .todo-grade span{
  	margin: 0 2px;
  }

  .add-todo{
  	position: absolute;
  	text-align: center;
		bottom: 75px;
		right: 30px;
  	background-color: #69a7f2;
  	width: 50px;
  	height: 50px;
  	line-height: 50px;
  	border-radius: 50%;
  	i{
  		font-size: 30px;
  		color: #fff;
  	}
  	+ span{
  		font-weight: bold;
  	}
  }
</style>