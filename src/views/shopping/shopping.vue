<template>
	<div class="shopping">
		<div class="header">
			<div class="header-left"><el-button :disabled="state" size="mini" type="danger" @click="delect">批量删除</el-button></div>
			<div class="header-right">
				<el-input size="small" @clear="clear" placeholder="请输入搜索名称" v-model="input3" clearable class="input-with-select">
					<div slot="prepend">名称</div>
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
			</div>
		</div>

		<el-table @selection-change="selectheckbox" :data="tableData" border style="width: 100%">
			<el-table-column type="selection" width="50" align="center"></el-table-column>
			<el-table-column prop="sort" label="序列号" width="70" align="center"></el-table-column>
			<el-table-column prop="date" label="图片" align="center">
				<template slot-scope="scope">
					<img :src="scope.row.img" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="名称" align="center"></el-table-column>
			<el-table-column prop="price" label="价格" align="center"></el-table-column>
			<el-table-column prop="state" label="状态" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.state">在售</span>
					<span v-if="!scope.row.state">下线</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="foot">
			<el-pagination
				background
				@size-change="sizechange"
				@current-change="currentchange"
				:page-size="pageSize"
				:page-sizes="[5, 10, 20, 30]"
				layout="total, sizes, prev, pager, next"
				:total="total"
				:current-page='page'
			></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Shopping',
	components: {},
	data() {
		return {
			total: 0,
			page:1,
			pageSize: 5,
			input3: '',
			select: '',
			state: true,
			statelist: [],
			tableData: []
		};
	},
	methods: {
		handleEdit(e, a) {
			console.log(e, a);
		},
		handleDelete(e,a) {
			this.$confirm('是否删除选中的信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$post('/data/delectshopping', { search:this.input3, page: this.page, size: this.pageSize , id: [a.id]}).then(e => {
					this.tableData = e.list;
					this.total = e.total;
					if(e.total%this.pageSize == 0){
						this.page = this.page - 1
					}
					this.$message({
					type: 'success',
					duration: 1000,
					message: '删除成功!'
				});
				});
			}).catch(() => {});
		},
		selectheckbox(e, index) {
			let statelist = []
			for(let i=0;i<e.length;i++){
				statelist.push(e[i].id)
			}
			this.statelist = statelist;
			if (e.length > 0) {
				this.state = false;
			} else {
				this.state = true;
			}
		},
		delect() {
			this.$confirm('是否删除选中的信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$post('/data/delectshopping', { search:this.input3, page: this.page, size: this.pageSize , id: this.statelist}).then(e => {
					this.tableData = e.list;
					this.total = e.total;
					if(e.total%this.pageSize == 0){
						this.page = this.page - 1
					}
					this.$message({
					type: 'success',
					duration: 1000,
					message: '删除成功!'
				});
				});
			}).catch(() => {});
		},
		currentchange(e) {
			this.page = e
			if (this.input3 == '') {			
				this.$post('/data/listshopping', { page: e, size: this.pageSize }).then(e => {
					this.tableData = e.list;
					this.total = e.total;
				});
			}else{
				this.$post('/data/searchshopping', { search: this.input3, size: this.pageSize, page: e }).then(e => {
					this.tableData = e.list;
					this.total = e.total;
				});
			}
		},
		sizechange(e) {
			if (this.input3 == '') {
			this.pageSize = e
			this.$post('/data/listshopping', { page: this.page, size: e }).then(e => {
				this.tableData = e.list;
				this.total = e.total;
			});
			}else{
				this.$post('/data/searchshopping', { search: this.input3, size: this.pageSize, page: this.page }).then(e => {
					this.tableData = e.list;
					this.total = e.total;
				});
			}
		},
		search() {
			this.page = 1;
			this.$post('/data/searchshopping', { search: this.input3, size: this.pageSize, page: this.page }).then(e => {
				this.tableData = e.list;
				this.total = e.total;
			});
		},
		clear() {
			this.$post('/data/listshopping', { page: 1, size: this.pageSize }).then(e => {
				this.tableData = e.list;
				this.total = e.total;
			});
		}
	},
	mounted() {
		this.$post('/data/listshopping', { page: 1, size: 5 }).then(e => {
			this.tableData = e.list;
			this.total = e.total;
		});
	}
};
</script>

<style lang="scss" scoped>
.shopping {
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: #fafafa;
}
.header {
	height: 60px;
	display: flex;
	justify-content: space-between;
	&-left {
		line-height: 60px;
		padding-left: 5px;
	}
	&-right {
		width: 400px;
		padding-top: 15px;
		padding-right: 20px;
	}
}
.foot {
	display: flex;
	justify-content: flex-end;
	padding: 5px 0;
}
</style>
