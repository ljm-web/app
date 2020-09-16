<template>
	<div class="home">
		<div class="content">
			<div class="content-top">后台管理系统</div>
			<div class="content-bottom">
				<el-form :model="numberValidateForm" ref="numberValidateForm"  class="demo-ruleForm">
					<el-form-item  prop="admin" :rules="[{ required: true, message: '账号不能为空' }]">
						<el-input placeholder='请输入账号' prefix-icon='el-icon-user' type="admin" v-model="numberValidateForm.admin" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空' }]">
						<el-input placeholder='请输入密码' prefix-icon='el-icon-lock' type="password" v-model="numberValidateForm.password" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item class="btn-list"><el-button class="btn" type="primary" @click="submitForm('numberValidateForm')">提交</el-button></el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			numberValidateForm: {
				admin: 'admin',
				password: '1234'
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if( this.numberValidateForm.admin=='admin' && this.numberValidateForm.password=='1234'){
						this.$router.replace('/index/welcome')
						localStorage.setItem("state",'true')
					}else{
						this.$message.error('账号或密码错误');
					}
				}
			});
		}
	},
	mounted() {
		if(localStorage.getItem("state")){
			this.$router.push('/index/welcome')
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url(../../assets/bj.png);
	background-size: 100% 100%;
}
.content {
	width: 550px;
	height: 400px;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 0 20px 0px #eee;
	&-top {
		padding: 20px 0;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		color: #3a82f8;
		border-bottom: 1px solid #fafafa;
	}
	&-bottom {
		margin-top: 30px;
		padding: 30px;
		.btn {
			width: 100%;
		}
	}
}
.el-form-item{
	padding-bottom: 20px;
}
</style>
