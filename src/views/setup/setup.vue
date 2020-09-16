<template>
	<div class="setup">
		<div class="hidden">
			<div class="lpt">
				<div class="lpt-left">
					<el-carousel @change='change' :interval="4000" type="card" trigger="click" height="200px" :autoplay="false">
						<el-carousel-item v-for="item in nav" :key="item">
							<img :src="item" />
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="lpt-right">
					<div class="lpt-right-header">修改当前图片</div>
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						</el-upload>
					<el-button size="mini" type="primary" @click='preservation'>确定修改</el-button>
				</div>
			</div>

			<div class="edit_container">
				<quill-editor
					v-model="content"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
				<el-button class="sbtn" size="mini" type="primary" @click="saveHtml">保存</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import nav0 from '../../assets/nav1.jpg';
import nav1 from '../../assets/nav2.jpg';
import nav2 from '../../assets/nav3.jpg';
import nav3 from '../../assets/nav4.jpg';
export default {
	name: 'setup',
	data() {
		return {
			imageUrl: nav0,
			content: '',
			nav:[
				nav0,
				nav1,
				nav2,
				nav3,
			],
			editorOption: {
				placeholder: '请输入内容...',
			// 	modules: {
			// 		toolbar: {
			// 			container: [
			// 				['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
			// 				['blockquote', 'code-block'], //引用，代码块
			// 				[{ header: 1 }, { header: 2 }], // 几级标题
			// 				[{ list: 'ordered' }, { list: 'bullet' }], // 有序列表，无序列表
			// 				[{ script: 'sub' }, { script: 'super' }], // 下角标，上角标
			// 				[{ indent: '-1' }, { indent: '+1' }], // 缩进
			// 				[{ size: ['small', false, 'large', 'huge'] }], // 字体大小
			// 				[{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
			// 				[{ color: [] }, { background: [] }], // 颜色选择
			// 				[{ font: [] }], // 字体
			// 				[{ align: [] }], // 居中
			// 				['clean'],// 清除样式
			// 				['image'] 
			// 			],
			// 			handlers: {
			// 				image: function() {
			// 					// 劫持原来的图片点击按钮事件
			// 					//QuillWatch.emit(this.quill.id);
			// 					// /console.log('0');
			// 					document.querySelector('#quill-upload input').click()
			// 				}
			// 			}
			// 		}
			// 	}
			   }
		};
	},
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill;
		}
	},
	methods: {
		preservation(){
			this.$message('数据提交成功');
		},
		change(e){
			this.imageUrl = this.nav[e];
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		httpRequest(){},
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
		onEditorReady(editor) {
			// 准备编辑器
		},
		onEditorBlur() {}, // 失去焦点事件
		onEditorFocus() {}, // 获得焦点事件
		onEditorChange() {}, // 内容改变事件
		saveHtml(event) {
			this.$message('数据提交成功');
			this.content = ''
		}
	}
};
</script>

<style scoped lang="scss">
.setup {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #fafafa;
}
.hidden {
	height: 100%;
	width: 100%;
	overflow-y: auto;
}
.edit_container {
	min-width: 1000px;
	width: 100%;
	margin-top: 20px;
}
.lpt {
	min-width: 1000px;
	display: flex;
	&-left {
		width: 700px;
	}
	&-right {
		flex: 1;
		min-width: 300px;
		text-align: center;
		position: relative;
		&-header {
			font-size: 14px;
			padding: 5px 0;
		}
		.avatar-uploader{
			width: 250px;
			height: 150px;
			margin: 10px auto;
			img{
				width: 250px;
				height: 150px;
			}
		}
		.file{
			position: absolute;
			left: -1px;
			top: -1px;
			display: block;
			width: 80px;
			height: 28px;
			opacity: 0;
			overflow: hidden;
		}
	}
}
.sbtn {
	margin: 10px auto;
	margin-left: 50%;
	transform: translateX(-50%);
}
.el-carousel__item img {
	width: 100%;
	height: 100%;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
</style>
<style>
.ql-editor {
	height: 300px;
}
/* .avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 158px;
	height: 158px;
	line-height: 158px;
	text-align: center;
}
.avatar {
	width: 200px;
	height: 158px;
	display: block;
} */
</style>
