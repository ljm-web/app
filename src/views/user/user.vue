<template>
	<div class="user">
		<div class="user-header">
			<el-radio-group class="radio" v-model="radio">
				<el-radio label="全部">全部</el-radio>
				<el-radio label="正常">正常</el-radio>
				<el-radio label="冻结">冻结</el-radio>
			</el-radio-group>
			<el-select class="select" size="small" v-model="value">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input clearable size="small" placeholder="请输用户ID" v-model="input3" class="input-with-select input">
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column align="center" prop="id" label="用户ID"></el-table-column>
			<el-table-column align="center" label="用户头像">
				<template slot-scope="scope">
					<img :src="scope.row.img" class="img" />
				</template>
			</el-table-column>
			<el-table-column align="center" prop="time" label="创建时间"></el-table-column>
			<el-table-column align="center" prop="grade" label="会员等级"></el-table-column>
			<el-table-column align="center" label="状态">
				<template slot-scope="scope">
					<span :class="scope.row.state ? 'success' : 'err'">{{ scope.row.state ? '正常' : '冻结' }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button v-show="scope.row.state" @click="handleClick(scope.row)" type="text" size="medium">冻结</el-button>
					<el-button v-show="!scope.row.state" @click="Unseal(scope.row)" type="text" size="medium">解封</el-button>
					<el-button type="text" size="medium" @click="details(scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<el-dialog
		  title="用户状态"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <span>改用互处于{{this.conent?'正常':'冻结'}}状态</span>
		</el-dialog>
		
		<div class="footer"><el-pagination background layout="prev, pager, next" :current-page="currentpage" :total="total" @current-change="currentchange"></el-pagination></div>
	</div>
</template>

<script>
export default {
	name: 'User',
	data() {
		return {
			tableData: [],
			total: 0,
			currentpage: 1,
			radio: '全部',
			value: '全部',
			dialogVisible: false,
			conent:true,
			options: [
				{
					value: '全部',
					label: '全部会员'
				},
				{
					value: '普通',
					label: '普通会员'
				},
				{
					value: '黄金',
					label: '黄金会员'
				},
				{
					value: '黑钻',
					label: '黑钻会员'
				},
				{
					value: '至尊',
					label: '至尊会员'
				}
			],
			input3: ''
		};
	},
	methods: {
		handleClick(e) {
			this.$confirm('冻结后该用户账号为游客模式, 是否继续?', '是否冻结该账号', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$post('/data/listuser', {id:e.id, page: this.currentpage, radio: this.radio, value: this.value, input3: this.input3 }).then(e => {
					this.tableData = e.data;
					this.total = e.total;
				});
					this.$message({
						type: 'success',
						message: '冻结成功!'
					});
				}).catch(() => {});
		},
		Unseal(e){
			this.$confirm('是否恢复改用户的权限, 是否继续?', '是否解除冻结', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$post('/data/listuser', {id:e.id, page: this.currentpage, radio: this.radio, value: this.value, input3: this.input3 }).then(e => {
					this.tableData = e.data;
					this.total = e.total;
				});
					this.$message({
						type: 'success',
						message: '解除冻结!'
					});
				}).catch(() => {});
		},
		details(e){
			this.conent = e.state;			
			this.dialogVisible = true;
		},
		 handleClose(done) {
			 this.dialogVisible = false;
		 },
		search() {
			this.$post('/data/listuser', { page: 1, radio: this.radio, value: this.value, input3: this.input3 }).then(e => {
				this.tableData = e.data;
				this.total = e.total;
			});
		},
		currentchange(e) {
			this.currentpage = e;
			this.$post('/data/listuser', { page: e, radio: this.radio, value: this.value, input3: this.input3 }).then(e => {
				this.tableData = e.data;
				this.total = e.total;
			});
		}
	},
	mounted() {
		this.$post('/data/listuser', { page: 1, radio: this.radio, value: this.value, input3: this.input3 }).then(e => {
			this.tableData = e.data;
			this.total = e.total;
		});
	}
};
</script>

<style lang="scss" scoped>
.user {
	width: 100%;
	height: 100%;
	min-width: 1000px;
	background-color: #fafafa;
	&-header {
		height: 60px;
		display: flex;
		align-items: center;
		padding-left: 20px;
		.radio {
		}
		.select {
			width: 200px;
			margin: 0 60px;
		}
		.input {
			width: 300px;
		}
	}
}
.img {
	height: 50px;
	width: 50px;
	border-radius: 50%;
}
.success {
	color: #67c23a;
}
.err {
	color: #f56c6c;
}
.footer {
	display: flex;
	justify-content: flex-end;
	padding: 5px 0;
}
</style>
