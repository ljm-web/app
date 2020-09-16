import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import Index from '../views/index/index.vue'
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},{
	  path: '/index',
	  name: 'Index',
	  component: () => import('../views/index/index'),
	  children:[
		  {
			  path: 'welcome',
			  name: 'Welcome',
			  component: () => import('../views/welcome/welcome')
		  },{
			  path: 'shopping',
			  name: 'Shopping',
			  component: () => import('../views/shopping/shopping')
		  },{
			  path: 'logistics',
			  name: 'Logistics',
			  component: () => import('../views/logistics/logistics')
		  },{
			  path: 'comment',
			  name: 'Comment',
			  component: () => import('../views/comment/comment')
		  },{
			  path: 'chat',
			  name: 'Chat',
			  component: () => import('../views/chat/chat')
		  },{
			  path: 'echarts',
			  name: 'Echarts',
			  component: () => import('../views/echarts/echarts')
		  },{
			  path: 'submit',
			  name: 'Submit',
			  component: () => import('../views/submit/submit')
		  },{
			  path: 'user',
			  name: 'User',
			  component: () => import('../views/user/user')
		  },{
			  path: 'topactivity',
			  name: 'Topactivity',
			  component: () => import('../views/topactivity/topactivity')
		  },{
			  path: 'bottomactivity',
			  name: 'Bottomactivity',
			  component: () => import('../views/bottomactivity/bottomactivity')
		  },{
			  path: 'historyactivity',
			  name: 'Historyactivity',
			  component: () => import('../views/historyactivity/historyactivity')
		  },{
			  path: 'setup',
			  name: 'Setup',
			  component: () => import('../views/setup/setup')
		  }
	  ]
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

//解决路由重复跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router
