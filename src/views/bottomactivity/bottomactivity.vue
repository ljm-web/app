<template>
	<div class="bottomactivity">
		<div class="header-top">
			当前在线活动<span>{{this.list.length}}</span>
		</div>
		
		<el-card class="box-card" shadow="never" v-for="(item,index) in list" :key="index">
		  <div slot="header" class="clearfix">
		    <span>{{item.title}}</span>
		    <el-button @click='bottom(item.id)' style="float: right; padding: 3px 0" type="text">活动下线</el-button>
		  </div>
		  <div>
		    <el-form label-position="left" inline class="demo-table-expand">
		        <el-form-item label="活动对象" required>
		            <span>{{ item.name }}</span>
		        </el-form-item>
				<el-form-item label="开始时间" required>
				    <span>{{ item.start }}</span>
				</el-form-item>
				<el-form-item label="结束时间" required>
				    <span>{{ item.over }}</span>
				</el-form-item>
				<el-form-item label="是否提前通知" required>
					<span>
				    <el-switch
				      v-model="item.state"
					  disabled>
				    </el-switch>
					</span>
				</el-form-item>
				<el-form-item label="活动商品" required>
				    <span v-for="(items,indexs) in item.lei" :key='indexs'>{{ items }}</span>
				</el-form-item>
				<el-form-item label="优惠情况" required>
				    <span>{{ item.setup }}</span>
				</el-form-item>
				<el-form-item label="活动详情" required>
				    <span>{{ item.content }}</span>
				</el-form-item>
			</el-form>		  
		  </div>
		</el-card>
		
	</div>
</template>

<script>
export default {
	name: 'bottomactivity',
	data() {
		return {
			list:[]
		};
	},
	methods:{
		bottom(e){
			this.$confirm('是否提前下线活动, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						
					this.$post('/data/listactive',{id:e}).then(e=>{
						this.list = e.data;
						this.$message({
						    type: 'success',
						    message: '成功下线!'
						  });
						})
					}).catch(() => {        
					});
		}
	},
	mounted() {
		this.$post('/data/listactive').then(e=>{
			this.list = e.data
		})
	}
};
</script>

<style scoped lang="scss">
.bottomactivity{
	width: 100%;
	height: 100%;
	overflow: auto;
}
.header-top{
	height: 60px;
	background-color: #fafafa;	
	line-height: 60px;
	padding-left: 20px;
	color: #bbb;
}
.box-card{
	margin-bottom: 20px;
}
</style>
<style>
.el-form-item__label{
	font-weight: bold;
}	
</style>
