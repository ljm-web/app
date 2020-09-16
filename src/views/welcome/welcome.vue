<template>
	<div class="welocome">
		<div class="card">
			<div class="card-left">
				<div class="card-left-img"><img src="../../assets/avatar.jpg" /></div>
				<div class="card-left-title">
					<span>所属部门:市场部</span>
					<span>负责人:张三</span>
				</div>
				<div class="card-left-foot">
					Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的
					渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上
					逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三
					方库或既有项目整合。
				</div>
				<p class="card-left-nav">2020-8-17</p>
			</div>
			<div class="card-right">
				<div class="card-right-title">操作介绍</div>
				<div class="card-right-text">
				Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的
				渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上
				逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三
				方库或既有项目整合。
				另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
				官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识。
				如果你刚开始学习前端开发，
				将框架作为你的第一步可能不是最好的主意——掌握好基础知识再来吧！
				之前有其它框架的使用经验会有帮助，但这不是必需的。
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Welcome',
	components: {},
	data() {
		return {};
	},
	methods: {},
	mounted() {}
};
</script>

<style lang="scss" scoped>
.welocome {
	width: 100%;
	height: 100%;
	background-color: #fafafa;
	overflow: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.card {
	width: 600px;
	height: 400px;
	background-color: #fff;
	border-radius: 4px;
	padding: 10px;
	display: flex;
	&-left {
		position: relative;
		flex: 1;
		border-right: 1px solid #eee;
		text-align: center;
		color: #bbb;
		&-img {
			padding-top: 20px;
			img {
				height: 70px;
				width: 70px;
				border-radius: 50%;
			}
		}
		&-title {
			margin-top: 20px;
			font-size: 14px;
			span {
				margin: 0 20px;
			}
		}
		&-foot{
			padding: 20px;
			text-indent: 2em;
			font-size: 14px;
			text-align: left;
		}
		&-nav{
			position: absolute;
			bottom: 0;
			right: 20px;
			font-size: 12px;
		}
	}
	&-right {
		flex: 1;
		overflow: auto;
		padding: 20px;
		&-title{
			height: 50px;
			font-size: 20px;
			text-align: center;
			color: #aaa;
		}
		&-text{
			font-size: 14px;
			text-indent: 2em;
			color: #bbb;
		}
	}
}
</style>
