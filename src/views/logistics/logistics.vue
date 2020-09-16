<template>
	<div class="logistics">
		<div class="header">
			<div class="header-left">
				<el-input @clear='clear' clearable size="small" placeholder="请输入订单号" v-model="input3" class="input-with-select">
					<el-button @click='btn' class="header-btn" slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<div class="header-right">
				<el-radio-group v-model="radio" @change='receive'>
				    <el-radio label="1">全部</el-radio>
				    <el-radio label="true">已签收</el-radio>
				    <el-radio label="false">未签收</el-radio>
				  </el-radio-group>
			</div>
		</div>

		<div class="content">
			<div class="content-top">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="sort" label="订单号"></el-table-column>
					<el-table-column align="center" prop="start" label="发货时间"></el-table-column>
					<el-table-column align="center" label="签收时间">
						<template slot-scope="scope">
							<span>{{scope.row.state?scope.row.over:'----'}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" width="150px" label="签收状态">
						<template slot-scope="scope">
							<span>{{scope.row.state?'签收':'未签收'}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" width="150px" label="操作">
						<template slot-scope="scope">
							<span class="span" @click="open(scope.row)">详情</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="content-foot"><el-pagination @current-change='currentchange' background layout="prev, pager, next" :total="total"></el-pagination></div>
		</div>

		<el-dialog title="物流详情" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
			<div class="time">
			<div class="time-hidde">
			<el-timeline>
				<el-timeline-item 
				v-for="(activity, index) in activities" 
				:key="index" 
				:icon="activity.icon"
				:type="activity.type"
				:color="activity.color"
				:timestamp="activity.timestamp">{{ activity.content }}
			</el-timeline-item>
			</el-timeline>
			</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'logistics',
	data() {
		return {
			dialogVisible: false,
			size:10,
			radio:'1',
			input3: '',
			total: 0,
			activities: [],
			tableData: [],
			search:{
				state:'1',
				sort:''
			}
		};
	},
	methods: {
		open(e) {
			this.dialogVisible = true;
			this.activities = e.activities
		},
		currentchange(e){
			this.$post('/data/listlogistics',{size:this.size,page:e,search:this.search}).then(e=>{
				this.total = e.total
				this.tableData = e.list
			})
		},
		handleClose(done) {
			this.dialogVisible = false;
		},
		receive(e){
			this.search.state = e
			this.$post('/data/listlogistics',{size:this.size,page:1,search:this.search}).then(e=>{
				this.total = e.total
				this.tableData = e.list
			})
		},
		btn(){
			this.search.sort = this.input3
			this.$post('/data/listlogistics',{size:this.size,page:1,search:this.search}).then(e=>{
				this.total = e.total
				this.tableData = e.list
			})
		},
		clear(){
			this.search.sort = ''
			this.$post('/data/listlogistics',{size:this.size,page:1,search:this.search}).then(e=>{
				this.total = e.total
				this.tableData = e.list
			})
		}
	},
	mounted() {
		this.$post('/data/listlogistics',{size:this.size,page:1,search:this.search}).then(e=>{
			this.total = e.total
			this.tableData = e.list
		})
	}
};
</script>

<style lang="scss" scoped="">
.logistics {
	width: 100%;
	height: 100%;
	min-width: 980px;
	overflow: auto;
	background-color: #fafafa;
}
.header {
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	&-left {
		width: 300px;
		padding-top: 15px;
	}
	&-btn {
		padding: 12px 0px 12px 13px !important;
	}
	&-con {
		padding-top: 15px;
	}
	&-right {
		height: 60px;
		display: flex;
		align-items: center;
	}
}
.content {
	.span {
		color: #3a82f8 !important;
		cursor: pointer;
	}
	&-foot {
		padding: 5px 0;
		display: flex;
		justify-content: flex-end;
	}
}
	.time{
		height: 400px;
		overflow: hidden;
		&-hidde{
			height: 400px;
			width: 410px;
			padding-left: 5px;
			overflow-y: scroll;
		}
	}
</style>
