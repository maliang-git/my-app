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
				title: '我的'
			}
		},
		onLoad() {
		
		},
		methods: {
			signOut(){
				uni.removeStorage({
				    key: "userInfo"
				});
				uni.reLaunch({
				    url: '/pages/login/login'
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
