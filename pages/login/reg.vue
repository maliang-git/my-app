<template>
	<view class="container">
		<!-- <Logo></Logo> -->
		<view class="input_box">
			<uni-icons class="icon" type="person" size="28" color="#555555"></uni-icons>
			<input placeholder="请输入昵称" v-model="formData.loginName" maxlength="10"></input>
		</view>
		<view class="input_box">
			<uni-icons class="icon" type="phone" size="28" color="#555555"></uni-icons>
			<input type="number" placeholder="请输入手机号" v-model="formData.phone" maxlength="11"></input>
		</view>
		<view class="input_box">
			<uni-icons class="icon" type="locked" size="28" color="#555555"></uni-icons>
			<input placeholder="请输入密码" v-model="formData.passWord" :password="pawIsShow" maxlength="20"></input>
		</view>
		<view class="input_box">
			<uni-icons class="icon" type="locked" size="28" color="#555555"></uni-icons>
			<input placeholder="确认密码" v-model="formData.confirmPaw" :password="confirmPawIsShow" maxlength="20"></input>
		</view>
		<button class="sumit_btn" style="width:100%;" @click="regHandel">立即注册</button>
		<view class="regin">
			<navigator class="reg-btn" url="/pages/login/login" hover-class="none">用户登录</navigator>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				formData: {
					loginName: "",
					phone: "",
					passWord: "",
					confirmPaw: ""
				},
				pawIsShow:false,
				confirmPawIsShow:false,
			}
		},
		methods: {},
	}
</script>


<style scoped lang="less">
	@import '../../common/less/public.less';

	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: calc(100vh - 44px);
		margin: 0 auto;
		padding: 0 24px;
		overflow: hidden;
		box-sizing: border-box;
		.user_head{
			width: 120upx;
			height: 120upx;
		}
		>.input_box {
			width: 100%;
			position: relative;
			overflow: hidden;
			margin-bottom: 20px;

			.icon {
				position: absolute;
				left: 0;
				bottom: 4upx;
			}

			input {
				width: 100%;
				border-bottom: 2upx solid #eeeeee;
				padding: 12upx 0;
				padding-left: 60upx;
			}
		}

		.sumit_btn {
			background-color: @themeColor;
			color: #FFFFFF;
			margin-top: 40upx;
		}

		.regin {
			position: fixed;
			bottom: 40upx;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: center;

			.reg-btn {
				padding: 20upx 0;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #878787;
			}
		}
	}
</style>
