<template>
	<view class="content">
		<view class="my-content-top">
			<view class="my-bg"></view>
			<view class="my-header-content">
				<view class="my-header">
					<image class="user_head" src="../../static/defullt_head.jpg" mode=""></image>
				</view>
			</view>
			<view class="my-info-content">
				<view class="my-info-top">
					<text class="user-name">{{userInfo.loginName}}</text>
					<text class="user-login">账号：{{userInfo.phone}}</text>
					<view class="city">
						<text>{{ userInfo.gender || '--'}}</text>
						<text>{{ userInfo.cityInfo ? (userInfo.cityInfo.cityCode === "1101" || "1201" ? userInfo.cityInfo.labelArr[0] : userInfo.cityInfo.labelArr[1]) : '--'}}</text>
					</view>
					<text class="autograph">{{userInfo.autograph || ''}}</text>
				</view>
				<view class="my-info-bottom">
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
		</view>
		<fn-item title="设置" @click.native="setInfo"></fn-item>
	</view>
</template>

<script>
	import fnItem from "@/components/my-components/fn-item.vue";
	export default {
		components: {
			fnItem
		},
		data() {
			return {
				title: '我的',
				userInfo: {}
			}
		},
		watch: {
			'$store.state.userInfo': {
				handler: function(val, old) {
					console.log(123,val)
					this.$nextTick(() => {
						this.userInfo = val
					})
				},
				deep: true,
			},
		},
		onLoad() {
			this.userInfo = this.$store.state.userInfo
		},
		methods: {
			setInfo() {
				console.log(123)
				uni.navigateTo({
					url: "/pages/my/edit"
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.my-content-top {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 670rpx;
		border-bottom: 2rpx solid #eee;

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

		.my-header-content {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 2;
			width: 100%;
			height: 50%;

			.my-header {
				position: relative;
				z-index: 2;
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 10rpx solid #00ffff;
				box-shadow: 0px 0px 5px 1px rgba(0, 255, 255, 0.5);

				.user_head {
					width: 100%;
					height: 100%;
				}
			}
		}

		.my-info-content {
			position: relative;
			z-index: 2;
			width: 100%;
			height: 50%;
			border-radius: 50% 50% 0 0;
			background-color: rgba(255, 255, 255, 0.4);
			// box-shadow: 0px 0px 8px 1px rgba(255, 255, 255, 0.5);
		}

		.my-info-top {
			height: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 26rpx;
			padding-top: 20rpx;

			.user-name {
				font-size: 32rpx;
				color: #000;
			}

			.user-login {
				color: #666;
				margin-top: 4rpx;
			}

			.city {
				color: #666;
				margin: 4rpx 0;

				text {
					margin: 0 16rpx;
				}
			}

			.autograph {
				color: #666;
			}
		}

		.my-info-bottom {
			display: flex;
			justify-content: space-around;
			align-items: center;
			z-index: 2;
			width: 100%;
			height: 50%;

			.my-info-item {
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
