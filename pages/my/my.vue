<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
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
							uni.removeStorage({
								key: "userInfo"
							});
							this.$store.state.socketInfo = null
							uni.reLaunch({
								url: '/pages/login/login'
							});
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
