<template>
	<div class="chat">
		<div class="chat-header">
			<div class="chat-header-left" @click='balck'>
				<i class="el-icon-arrow-left"></i>
				返回
			</div>
			<el-button type="primary" size="mini" @click='bz'>全部已读</el-button>
		</div>
		<div class="content">
			<div class="chat-left">
				<div class="chat-hidde">
					<div :class="state == index ? 'item selectitem' : 'item'" @click="select(index)" v-for="(item, index) in list" :key="index">
						<div class="item-left"><img :src="item.img" /></div>
						<div class="item-con">
							<div class="item-con-top">{{ item.name }}</div>
							<div class="item-con-bottom">{{ item.comemt[0] }}</div>
						</div>
						<div class="item-right">
							<div class="item-right-top" v-show="item.sun != 0">{{ item.sun }}</div>
							<div class="item-right-bottom"><i class="el-icon-delete" @click="delect"></i></div>
						</div>
					</div>
				</div>
			</div>
			<div class="chat-right">
				<div class="chat-right-content" ref='socr'>
					<template v-if="list.length != 0">
						<div class="items" v-for="(item, index) in list[state].comemt" :key="index">
							<div class="items-left"><img :src="list[state].img" /></div>
							<div class="items-right">
								{{ item }}
								<i class="el-icon-caret-left items-right-nav"></i>
							</div>
						</div>
						<div class="items items2" v-for="(item, index) in kefulist[state]" :key="index + 'k'">
							<div class="items-right">
								{{ item.text }}
								<i class="el-icon-caret-right items2-nav"></i>
							</div>
							<div class="items2-left"><img src="../../assets/avatar.jpg" /></div>
						</div>
					</template>
				</div>
				<div class="foot">
					<el-input clearable size="small" class="foot-input" v-model="input" placeholder="请输入内容"></el-input>
					<div class="foot-btn" @click="setup">发送</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'chat',
	data() {
		return {
			input: '',
			list: [],
			state: 0,
			kefulist: []
		};
	},
	methods: {
		select(e) {
			this.state = e;
		},
		setup() {
			
			if (this.input != '') {
				this.kefulist[this.state].push({
					text: this.input
				});
				this.list[this.state].sun = 0;
				this.input = '';
				this.$nextTick(()=>{
					this.$refs.socr.scrollTop = this.$refs.socr.scrollHeight;
				})
			} else {
				this.$message({
					message: '警告，请输入内容',
					type: 'warning'
				});
			}
		},
		delect() {
			this.$confirm('是否删除次记录?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.list.splice(this.state, 1);
					this.kefulist.splice(this.state, 1);
					if (this.state == this.list.length) {
						this.state -= 1;
					}
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
				.catch(() => {});
		},
		bz(){
			for (let i = 0; i < this.list.length; i++) {
				this.list[i].sun = 0
			}
		},
		balck(){
			this.$router.go(-1);
		}
	},
	mounted() {
		this.$post('/data/listchat').then(e => {
			this.list = e;
			for (let i = 0; i < e.length; i++) {
				this.kefulist.push([]);
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.chat {
	width: 100%;
	height: 100%;
}
.chat-header {
	height: 60px;
	background-color: #fafafa;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	&-left{
		width: 55px;
		height: 20px;
		color: #3a82f3;
		cursor: pointer;
	}
}
.content {
	display: flex;
	height: calc(100% - 61px);
	.chat-left {
		width: 250px;
		height: 100%;
		overflow: hidden;
	}
	.chat-right {
		height: 100%;
		flex: 1;
		&-content {
			height: calc(100% - 50px);
			overflow: auto;
		}
		.foot {
			height: 50px;
			background-color: #fafafa;
			display: flex;
			align-items: center;
			&-input {
				flex: 1;
			}
			&-btn {
				width: 60px;
				cursor: pointer;
				margin-left: 10px;
				background-color: #3a82f3;
				border-radius: 4px;
				line-height: 31px;
				text-align: center;
				color: #fff;
				font-size: 14px;
			}
		}
	}
	.chat-hidde {
		width: 266px;
		height: 100%;
		overflow: auto;
	}
}

.selectitem {
	background-color: #ccc !important;
}
.item {
	width: 250px;
	padding: 10px 0;
	display: flex;
	cursor: pointer;
	background-color: #fafafa;
	position: relative;
	border-bottom: 2px solid #fff;
	&-left {
		width: 45px;
		padding-left: 5px;
		img {
			width: 45px;
			height: 45px;
			border-radius: 50%;
		}
	}
	&-con {
		flex: 1;
		padding-left: 10px;
		&-top {
			font-weight: bold;
			font-size: 14px;
			padding-top: 5px;
		}
		&-bottom {
			width: 150px;
			color: #999;
			font-size: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	&-right {
		width: 40px;
		padding-top: 5px;
		&-top {
			text-align: center;
			margin: auto;
			width: 15px;
			height: 15px;
			font-size: 12px;
			color: #fff;
			border-radius: 50%;
			background-color: #f56c6c;
		}
		&-bottom {
			padding-top: 5px;
			text-align: center;
		}
	}
}
.items {
	padding: 20px;
	display: flex;
	&-left {
		margin-right: 20px;
		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
	}
	&-right {
		position: relative;
		background-color: #fafafa;
		border-radius: 4px;
		font-size: 14px;
		line-height: 30px;
		padding: 10px;
		&-nav {
			position: absolute;
			top: 10px;
			left: -19px;
			font-size: 30px;
			color: #fafafa;
		}
	}
}
.items2 {
	justify-content: flex-end;
	&-left {
		margin-left: 20px;
		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
	}
	&-nav {
		position: absolute;
		top: 10px;
		right: -19px;
		font-size: 30px;
		color: #fafafa;
	}
}
</style>
