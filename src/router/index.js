import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import SelectPage from '@/assist/selectPage'
import Home from '@/Home'
import Member from '@/assist/member'

import TodoDetail from '@/todo/detail'
import TodoAdd from '@/todo/add'


Vue.use(Router)

export default new Router({
	routes: [{
		path: '/select',
		name: 'SelectPage',
		meta: {
			title: '搜索页'
		},
		component: SelectPage
	}, {
		path: '/menber',
		name: 'MenberPage',
		meta: {
			title: '选择人员'
		},
		component: Member
	}, {
		path: '/todo/Detail',
		name: 'TodoDetail',
		component: TodoDetail
	}, {
		path: '/todo/Add',
		name: 'TodoAdd',
		component: TodoAdd
	}, {
		path: '/',
		name: '首页',
		component: Home,
		children: [{
			path: '/todoDetail',
			component: TodoDetail,
			name: '待办列表'
		}]
	}, ]
})