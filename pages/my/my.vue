<template>
	<view class="content">
		<view class="my-content-top">
			<view class="my-bg"></view>
			<view class="my-header">
				<image class="user_head" src="../../static/defullt_head.jpg" mode=""></image>
			</view>
			<view class="my-info">
				<view class="my-info-item">
					<text>圈圈</text>
					<text>200</text>
				</view>
				<view class="my-info-item">
					<text>喜欢</text>
					<text>200</text>
				</view>
				<view class="my-info-item">
					<text>朋友</text>
					<text>100</text>
				</view>
			</view>
		</view>
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<button type="default" @click="signOut">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				userInfo: {}
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data
				}
			});
		},
		methods: {
			signOut() {
				uni.showLoading();
				// 退出登录
				this.$http("POST", '/user-center/loginStateModify', {
						userToken: this.userInfo.token,
						status: 2 // 1: 上线  2：下线
					})
					.then(res => {
						uni.hideLoading();
						if (res.code === 200) {
							this.clearData()
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						}
					})
					.catch(error => {
						uni.hideLoading();
					});
			}
		}
	}
</script>

<style scoped lang="less">
	.my-content-top {
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 500rpx;

		.my-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: url(../../static/defullt_head.jpg);
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			filter: blur(4px);
		}

		.my-header {
			position: relative;
			z-index: 2;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-top: 80rpx;
			border: 10rpx solid #00ffff;
			box-shadow: 0px 0px 5px 1px rgba(0, 255, 255, 0.5);
			.user_head {
				width: 100%;
				height: 100%;
			}
		}
		.my-info{
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 2;
			width: 100%;
			height: 150rpx;
			background-color: rgba(255,255,255,0.4);
			.my-info-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #333;
				font-size: 28rpx;
			}
		}
	}


	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
