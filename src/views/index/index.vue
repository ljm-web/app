<template>
	<el-container class="index">
		<el-aside width="200px" class="left">
			<div class="left-hidden">
				<div class="left-nav">
					<img class="left-nav-img" src="../../assets/logo.png" />
					管理后台
				</div>
				<el-menu 
				@open='open'
				@close='close'
				:default-active="defaultactive" 
				:default-openeds="defaultopeneds" 
				class="menu">
					<template v-for="(item, index) of listNav">
						<el-submenu v-if="item.item" :key='index' :index='index.toString()'>
							<template slot="title">
								<i :class="item.icon"></i>
								<span>{{ item.title }}</span>
							</template>
							<el-menu-item @click="select(items.path,index+'-'+indexs)"
							 v-for="(items, indexs) of item.item" :key="indexs" :index="index+'-'+indexs">
								<i :class="items.icon"></i>
								<span>{{ items.title }}</span>
							</el-menu-item>
						</el-submenu>
						<el-menu-item @click="select(item.path,index)" v-if="!item.item" :index="index.toString()" :key='index'>
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</div>
		</el-aside>
		<el-container>
			<el-header class="header">
				<div class="header-nav">
					<div class="header-nav-item" @click="tznav('/index/comment')">
						<el-badge :value="23" :max="99" class="item"><i class="el-icon-bell"></i></el-badge>
					</div>
					<div class="header-nav-item" @click="tznav('/index/chat')">
						<el-badge :value="100" :max="10" class="item"><i class="el-icon-chat-dot-round"></i></el-badge>
					</div>
					<div class="header-nav-right">
						<span>管理员</span>
						<img src="../../assets/avatar.jpg" />
						<div class="header-nav-right-hover">
							<div @click="tis">修改密码</div>
							<div @click="tis">个人中心</div>
							<div @click="leave">退出登录</div>
						</div>
					</div>
				</div>
			</el-header>
			<el-main class="main">
				<router-view/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: 'Index',
	components: {},
	data() {
		return {
			defaultactive:'0',
			defaultactives:false,
			defaultopeneds:[''],
			listNav: [
				{
					title: '首页信息',
					icon: 'el-icon-s-shop',
					path: '/index/welcome'
				},
				{
					title: '活动管理',
					icon: 'el-icon-menu',
					item: [
						{
							title: '活动上线',
							icon: 'el-icon-discount',
							path: '/index/topactivity'
						},
						{
							title: '活动下线',
							icon: 'el-icon-takeaway-box',
							path: '/index/bottomactivity'
						},
						{
							title: '历史活动',
							icon: 'el-icon-reading',
							path: '/index/historyactivity'
						}
					]
				},
				{
					title: '商品上新',
					icon: 'el-icon-goods',
					path: '/index/submit'
				},
				{
					title: '商品管理',
					icon: 'el-icon-present',
					path: '/index/shopping'
				},
				{
					title: '订单详情',
					icon: 'el-icon-box',
					path: '/index/logistics'
				},
				{
					title: '数据视图',
					icon: 'el-icon-s-data',
					path: '/index/echarts'
				},
				{
					title: '用户管理',
					icon: 'el-icon-s-custom',
					path: '/index/user'
				},
				{
					title: '首页设置',
					icon: 'el-icon-s-tools',
					path: '/index/setup'
				}
			]
		};
	},
	methods: {
		open(e){			
			sessionStorage.setItem('sub-menu',e);
		},
		close(e){
			this.defaultopeneds = [];
			sessionStorage.removeItem('sub-menu')
		},
		leave() {
			this.$confirm('是否退出登录, 是否继续?', '提醒', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$router.replace('/');
				localStorage.clear();
				sessionStorage.clear();
			}).catch(err=>{});
		},
		select(e,index){
			this.defaultactive = index+''
			sessionStorage.setItem('nav',index)
			this.$router.push(e)				
		},
		tznav(e){
			if(!sessionStorage.getItem('path')){
				this.defaultactives = true
				sessionStorage.setItem('path',this.defaultactive)							
			}
			this.$router.push(e)	
		},
		tis(){
			this.$confirm('功能暂不开放', '提醒', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {	
			}).catch(err=>{});
		}
	},
	mounted() {	
		if(localStorage.getItem('state')){
			if(sessionStorage.getItem('nav')){
				this.defaultactive =sessionStorage.getItem('nav')
			}
			if(sessionStorage.getItem('sub-menu')){
				this.defaultopeneds.push(sessionStorage.getItem('sub-menu'));
			}
		}else{
			this.$router.replace('/');
		}
	},
	watch:{
	  $route(to,from){

		if(this.defaultactives){
			if(to.path=='/index/comment' || to.path=='/index/chat'){
				this.defaultactive = ''
			}else{
				this.defaultactives = false
				this.defaultactive = sessionStorage.getItem('path')
				sessionStorage.removeItem('path')
			}			
		}
	  }
	  
	},
};
</script>

<style lang="scss">
.index {
	width: 100vw;
	height: 100vh;
}
.left {
	height: 100vh !important;
	overflow: hidden !important;
	border-right: 1px #eee solid;
	&-hidden {
		width: 215px;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
	&-nav {
		width: 200px;
		line-height: 60px;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		border-bottom: 1px solid #eee;
		&-img {
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}
	}
	.menu {
		width: 200px;
		overflow: hidden;
	}
}
.header {
	display: flex;
	justify-content: flex-end;
	background-color: #fafafa;
	min-width: 300px;
	&-nav {
		display: flex;
		align-items: center;
		cursor: pointer;
		&-item {
			margin: 0 20px;
			font-size: 20px;
		}
		&-item:hover {
			color: #3a82f8;
		}
		&-right {
			position: relative;
			margin-left: 30px;
			font-size: 16px;
			line-height: 60px;
			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				margin-left: 10px;
				vertical-align: middle;
			}
			span:hover {
				color: #3a82f8;
			}
			&-hover {
				display: none;
				position: absolute;
				z-index: 99;
				left: 10px;
				top: 60px;
				width: 100px;
				height: 120px;
				overflow: hidden;
				border: 1px solid #eee;
				border-radius: 4px;
				background-color: #fff;
				div {
					font-size: 14px;
					line-height: 40px;
					text-align: center;
					border-bottom: #eee solid 1px;
				}
				div:hover {
					color: #3a82f8;
				}
			}
			&:hover &-hover {
				display: block;
			}
		}
	}
}
.main {
	min-width: 700px;
	padding: 15px !important;
}
</style>
