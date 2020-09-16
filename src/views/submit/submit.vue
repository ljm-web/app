<template>
	<div class="submit">
		<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm myform">
			<el-form-item label="商品名称" prop="age" :rules="[{ required: true, message: '商品名称不能为空' }, { message: '年龄必须为数字值' }]">
				<el-input size="small" type="age" v-model="numberValidateForm.age"></el-input>
			</el-form-item>

			<el-form-item size="small" label="商品分类" prop="region" :rules="[{ required: true, message: '商品分类不能为空' }]">
				<el-select v-model="numberValidateForm.region" placeholder="请选择商品分类">
					<el-option label="零食" value="零食"></el-option>
					<el-option label="家电" value="家电"></el-option>
					<el-option label="母婴" value="母婴"></el-option>
					<el-option label="日用" value="日用"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="商品价格" prop="price" :rules="[{ required: true, message: '商品价格不能为空' }]">
				<el-input size="small" type="price" v-model="numberValidateForm.price"></el-input>
			</el-form-item>

			<el-form-item label="商品状态" prop="state" :rules="[{ required: true }]">
				<el-radio-group v-model="numberValidateForm.state">
					<el-radio label="在售"></el-radio>
					<el-radio label="下线"></el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="商品封面" :rules="[{ required: true}]">
				<el-upload
					action="https://jsonplaceholder.typicode.com/posts/"
					list-type="picture-card"
					:limit="2"
					:http-request="http"
					:before-upload="beforeAvatarUpload"
					:on-change="handleFileChange"
					:on-remove="handleRemove"
					:class="{ hideAdd: uploadDisabled }"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>

			<el-form-item label="商品详情" prop="details" :rules="[{ required: true, message: '详情不能为空' }]">
				<el-input rows="4" size="small" type="textarea" v-model="numberValidateForm.details"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button size="small" type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
				<el-button size="small" @click="resetForm('numberValidateForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data() {
		return {
			numberValidateForm: {
				age: '',
				region: '',
				price: '',
				details: '',
				state: '在售',
				imgurl:''
			},
			//上长超出隐藏上传按钮
			uploadDisabled: false,
			//上传个数
			limitImgNumber: 1
		};
	},
	methods: {
		//表单验证
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$message({
					    message: '提交成功',
					        type: 'success'
					});
				} else {
					return false;
				}
			});
		},
		//表单重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.uploadDisabled = false;
		},
		//文件上传
		handleFileChange(file, fileList) {
			this.uploadDisabled = fileList.length >= this.limitImgNumber;
		},
		//删除文件
		handleRemove(file, fileList) {
			this.handleFileChange(file, fileList);
		},
		//上传成功
		handleSuccess(){
			
		},
		//上传判断
		beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
						
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		},
		//自定义上传
		http(){

		}
	},
};
</script>

<style lang="scss" scoped>
.submit {
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: #fafafa;
}
.myform {
	padding-top: 20px;
	width: 45%;
}
</style>
<style>
.hideAdd .el-upload--picture-card{
	display: none;
}
</style>
