<template>
	<div class="comment">
		<div class="comment-header">
			<div class="comment-header-left" @click='balck'>
				<i class="el-icon-arrow-left"></i>
				返回
			</div>
			<div class="comment-header-con">
				<span>好评率:</span>
				<el-progress style="width: 150px;" :percentage="good"></el-progress>
			</div>
			<div class="comment-header-right">
				<el-radio-group v-model="radio" @change='change'>
					<el-radio label="">全部</el-radio>
					<el-radio label="2">好评</el-radio>
					<el-radio label="5">差评</el-radio>
				</el-radio-group>
			</div>
		</div>

		<div class="content">
			<template v-for="(item,index) in list">
			<div class="content-item" :key='index'>
				<div class="content-item-left"><img :src="item.img" /></div>
				<div class="content-item-con">
					<div><el-rate v-model="item.score" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate></div>
					<div class="com">
						{{item.comment}}
					</div>
				</div>
				<div class="content-item-right">
					<div class="top">{{item.sum}}赞</div>
					<el-button @click="open(item.id)" class="bottom-btn" size="mini" type="primary">回复</el-button>
				</div>
			</div>
			<div class="huifu">
				<div v-show="item.state" v-for="(items,indexs) in item.business" :key='indexs'>
					<span>商家回复:</span>
					{{items}}
				</div>
			</div>
			</template>
		</div>

		<div class="foot"><el-pagination :page-size='size' :current-page='page' @current-change='currentchange' background layout="total,prev, pager, next" :total="total"></el-pagination></div>

		<el-dialog title="回复内容" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
			<div>
			<el-input
			 slot="footer"
			  type="textarea"
			  :rows="8"
			  maxlength="200"
			  show-word-limit
			  placeholder="请输入内容"
			  v-model="textarea">
			</el-input>
			</div>
			<span slot="footer" class="dialog-footer">			
				<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="qdbtn">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'comment',
	data() {
		return {
			radio: '',
			dialogVisible: false,
			textarea:'',
			list:[],
			total:0,
			good:100,
			select:'',
			size:10,
			page:1,
			id:''
		};
	},
	methods: {
		open(e) {
			this.dialogVisible = true;
			this.id = e 
		},
		handleClose(done) {
			done();
		},
		qdbtn(e){
			if(this.textarea!=''){
				this.$post('/data/listcomment',{size:this.size,page:this.page,id:this.id,select:this.select,input:this.textarea}).then((e)=>{
					this.good = e.good;
					this.total = e.total;
					this.list = e.list;
					this.textarea = ''
					this.dialogVisible = false;
					this.$message({
					  message: '回复成功',
					  type: 'success'
					});			
				})				
			}else{
				this.$message({
				  message: '请输入内容',
				  type: 'warning'
				});	
			}

		},
		change(e){
			this.page = 1;
			this.select = e;
			this.$post('/data/listcomment',{size:this.size,page:1,select:e}).then((e)=>{
				this.good = e.good;
				this.total = e.total;
				this.list = e.list;
			})
		},
		currentchange(e){
			this.page = e
			this.$post('/data/listcomment',{size:this.size,page:e,select:this.select}).then((e)=>{
				this.good = e.good;
				this.total = e.total;
				this.list = e.list;
			})
		},
		balck(){
			this.$router.go(-1);
		}
	},
	mounted() {
		this.$post('/data/listcomment',{size:this.size,page:1,select:this.select}).then((e)=>{
			this.good = e.good;
			this.total = e.total;
			this.list = e.list;
		})
	}
};
</script>

<style lang="scss" scoped>
.comment {
	width: 100%;
	height: 100%;
	background-color: #fafafa;
	overflow: auto;
	&-header {
		height: 60px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 20px;
		&-left {
			width: 55px;
			color: #3a82f3;
			cursor: pointer;
		}
		&-con {
			span {
				margin-right: 10px;
			}
			display: flex;
			align-items: center;
			font-size: 14px;
		}
	}
}
.content {
	background-color: #fff;
	width: 100%;
	padding-top: 10px;
	&-item {
		height: 80px;
		display: flex;
		padding: 10px;
		background-color: #fafafa;
		&-left {
			width: 80px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&-con {
			flex: 1;
			padding-left: 20px;
			.com {
				width: 100%;
				height: 58px;
				font-size: 14px;
				color: #bbb;
				overflow: hidden;
				line-height: 15px;
			}
		}
		&-right {
			width: 100px;
			padding-top: 0px;
			text-align: right;
			.top {
				font-size: 14px;
				color: #aaa;
			}
			.bottom-btn {
				margin-top: 35px;
			}
		}
	}
	.huifu {
		span {
			color: #000;
			font-weight: bold;
		}
		background-color: #fafafa;
		font-size: 14px;
		color: #999;
		padding: 10px;
		padding-top: 0;
		margin-bottom: 10px;
	}
}
.foot {
	display: flex;
	justify-content: flex-end;
	padding: 5px 0;
}
</style>
