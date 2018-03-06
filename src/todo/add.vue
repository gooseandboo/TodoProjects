<template>
  <div class="common-form">
    <div class="page-part">
      <mt-field placeholder="任务标题(必填)" type="text"></mt-field>
      <mt-field placeholder="任务描述(必填)" type="textarea" rows="4"></mt-field>
    </div>
    <div class="page-cell">
	    <mt-cell title="负责人" is-link :to="{ name: 'MenberPage' }"></mt-cell>
	    <mt-cell title="审核人" is-link :to="{ name: 'MenberPage' }"></mt-cell>
	    <mt-cell title="抄送人" is-link :to="{ name: 'MenberPage' }"></mt-cell>
	    <mt-cell title="开始时间" is-link :value="startTime" @click.native="open('datetimePicker','startTime')"></mt-cell>
	    <mt-cell title="结束时间" is-link :value="endTime" @click.native="open('datetimePicker','endTime')"></mt-cell>
	    <mt-cell title="任务分级" is-link :value="taskVal" @click.native="openTaskPicker('taskPicker')"></mt-cell>
	  </div>
		<div class="todo-picker" v-bind:class="{ show: show }" >
			<!-- <div class="picker-toolbar">
				<span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker">取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" @click="confirmPicker">确定</span>
			</div> -->
		  <mt-picker 
		  	class="common-picker" 
		  	ref="taskPicker" 
		  	:slots="taskSlot" 
		  	@change="onTaskChange" 
		  	:visible-item-count="3">
		  </mt-picker>
	  </div>

	  <mt-datetime-picker
      ref="datetimePicker"
      type="date"
      v-model="pickTime"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChange">
    </mt-datetime-picker>

	  <div class="page-cell">
	  	
	  	<div class="upload-wraper">
				<div class="cell-title">上传附件</div>
	  		<div class="upload-inner">
					<div class="upload-btn">
						<i class="iconfont icon-tianjiatupian"></i>
	  				<input type="file" name="">
	  			</div>
	  		</div>
	  	</div>
	  </div>
	  <div class="page-button-group">
	  	<mt-button type="primary">确定</mt-button>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
    	pickObj : null,
    	pickTime: null,
      startTime : null,
			endTime : null,
			taskVal: null,
			show: false,
			taskSlot: [{
        flex: 1,
        values: ['无', '低', '中', '高'],
        className: 'slot1'
      }],
    }
  },
  methods: {
  	showMask(val) {
			var par = document.querySelector('.common-form');
			var mask = document.createElement('div');
			mask.className = 'v-modal';
			mask.style.zIndex = '2000';
			var _this = this;
			mask.onclick = function(){
				_this.show = false;
				par.removeChild(mask);
			}
			if(val=='show')
				par.appendChild(mask);
			else
				par.removeChild(mask);
  	},
    open(picker,obj) {
      this.$refs[picker].open();
      this.pickObj = obj;
    },
    openTaskPicker(picker) {
			this.show = !this.show;
			this.showMask('show');
			console.log(this.show);
    },
    handleChange(value) {
    	let d = new Date(value);
    	let date = d.getFullYear() + '-' + (d.getMonth()<9?'0'+(d.getMonth()+1):(d.getMonth()+1) )+ '-' + (d.getDate()<9?'0'+d.getDate():d.getDate() );
    	if(this.pickObj=='startTime'){
    		this.startTime = date;
    	}else{
    		this.endTime = date;
    	}
			
      console.log(date);
    },
    cancelPicker(){

    },
    onTaskChange(picker, values) {
      console.log(values);
      this.taskVal = values[0];
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.page-part,.page-cell{
		margin-bottom: 20px;
	}

	.todo-picker{
		display: none;
		width: 100%;
		position: fixed;
    background: #fff;
		z-index: 2003;
		backface-visibility: hidden;
		-webkit-transition: .2s ease-out;
    transition: .2s ease-out;
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
	}
	.todo-picker.show{
		display: block;
	}

	.upload-wraper{
		background-color: #fff;
		background-image:-webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image:linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size:100% 1px;
    background-repeat:no-repeat;
    background-position:bottom;
    .cell-title{
	    background-image:-webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-image:linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-size:100% 1px;
	    background-repeat:no-repeat;
	    background-position:top;
	    padding: 10px;
    }
    .upload-inner{
    	padding: 0 10px 15px;
    }
    .upload-btn{
    	position: relative;
    	display: inline-block;
    	border: 1px solid #d9d9d9;
    	width: 80px;
    	height: 80px;
    	line-height: 80px;
    	text-align: center;
    	input{
    		position: absolute;
    		width: 100%;
    		height: 100%;
    		left: 0;
    		opacity: 0;
    	}
    	.iconfont{
    		font-size: 40px;
    		color: #d8d8d8;
    	}
    }
	}
</style>
