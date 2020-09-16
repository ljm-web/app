<template>
	<div class="topactivity">
		<el-form ref="form" class="form" :model="form" label-width="100px">
			<el-form-item label="活动名称"><el-input size="small" v-model="form.name"></el-input></el-form-item>
			<el-form-item label="活动对象">
				<el-select size="small" v-model="form.region" placeholder="请选择活动对象">
					<el-option label="全部会员" value="shanghai"></el-option>
					<el-option label="普通会员" value="beijing"></el-option>
					<el-option label="黄金会员" value="shanghai"></el-option>
					<el-option label="黑钻会员" value="beijing"></el-option>
					<el-option label="至尊会员" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="开始时间">
				<el-col :span="11"><el-date-picker size="small" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker></el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11"><el-time-picker size="small" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker></el-col>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-col :span="11"><el-date-picker size="small" type="date" placeholder="选择日期" v-model="form.dates1" style="width: 100%;"></el-date-picker></el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11"><el-time-picker size="small" placeholder="选择时间" v-model="form.dates2" style="width: 100%;"></el-time-picker></el-col>
			</el-form-item>
			<el-form-item label="提前通知"><el-switch v-model="form.delivery"></el-switch></el-form-item>
			<el-form-item label="活动种类">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="名牌家电" name="type"></el-checkbox>
					<el-checkbox label="悠闲零食" name="type"></el-checkbox>
					<el-checkbox label="日用百货" name="type"></el-checkbox>
					<el-checkbox label="新鲜果蔬" name="type"></el-checkbox>
					<el-checkbox label="数码电子产品" name="type"></el-checkbox>
					<el-checkbox label="进口货物" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊设置">
				<el-radio-group v-model="form.resource">
					<el-radio label="优惠互斥"></el-radio>
					<el-radio label="优惠不互斥"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="内容备注"><el-input rows="4" type="textarea" v-model="form.desc"></el-input></el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit" size="small">立即创建</el-button>
				<el-button size="small">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'topactivity',
	data() {
		return {
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				dates1:'',
				dates2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		};
	},
	methods: {
		onSubmit() {
			this.$message('点击了数据提交');
		}
	}
};
</script>

<style scoped lang="scss">
.topactivity {
	width: 100%;
	height: 100%;
	background-color: #fafafa;
	overflow: auto;
	.form{
		width: 50%;
		margin-top: 20px;
		.line{
			text-align: center;
		}
	}
}
</style>
