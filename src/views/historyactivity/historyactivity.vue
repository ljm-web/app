<template>
	<div class="historyactivity">
		<div class="header-top">
			全部历史活动活动<span>{{this.list.length}}</span>
		</div>
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item :name="index" v-for="(item,index) in list" :key='index'>
				<template slot="title">
					<div style="font-size: 14px;">
				      <span style="font-weight: bold;width: 80px;">{{item.title}}</span>--------------结束时间(<span style="color: red;">{{item.over}}</span>)
					</div>
				</template>
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
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
export default {
	name: 'historyactivity',
	data() {
		return {
			activeNames: ['1'],
			list:[],
		};
	},
	methods: {
		handleChange(val) {
			
		}
	},
	mounted() {
		this.$post('/data/listhistryactive').then(e=>{
			this.list = e.data;
		});
	}
};
</script>

<style scoped lang="scss">
.historyactivity {
	width: 100%;
	height: 100%;
	overflow: auto;
}
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
.header-top{
	height: 60px;
	background-color: #fafafa;	
	line-height: 60px;
	padding-left: 20px;
	color: #bbb;
}
</style>
