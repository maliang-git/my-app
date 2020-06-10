<template>
	<view class="content">
		<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
			<view class="search-box">
				<view>
					<icon class="uni-icon" type="search" size="18" /><text>搜索</text>
				</view>
			</view>
			<view class="fn-item" v-for="(item, index) in navList" :key="index" @click="hangelFn(item.code)">
				<view class="icon-box" :style="{ background: item.bgColor }">
					<uni-icons :type="item.type" :color="item.color" size="26"></uni-icons>
					<min-badge v-if="item.friendsReq" class="badge" :count="item.friendsReq.length"></min-badge>
				</view>
				<text>{{ item.text }}</text>
			</view>
			<view class="fn-item" v-for="(item, index) in $store.state.myFriendList" :key="item+index">
				<view class="icon-box">
					<image class="user_head" src="../../static/defullt_img.png" mode=""></image>
				</view>
				<text>{{ item.loginName }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				title: "朋友",
				navList: [{
						type: "personadd-filled",
						color: "#fff",
						bgColor: "#FFD700",
						text: "新的朋友",
						code: "add",
						friendsReq: this.$store.state.friendsReq
					},
					{
						type: "chatboxes-filled",
						color: "#fff",
						bgColor: "#43CD80",
						text: "群聊",
						code: "",
					},
				],
			};
		},
		onLoad() {

		},
		methods: {
			hangelFn(code) {
				if (code == "add") {
					uni.navigateTo({
						url: "/pages/friends/friendsReq",
					});
				}
			},
		},
	};
</script>

<style scoped lang="less">
	.content {
		.search-box {
			width: 100%;
			height: 108rpx;
			background-color: rgb(248, 248, 248);
			padding: 16rpx;
			box-sizing: border-box;

			view {
				width: 100%;
				height: 100%;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;

				text {
					font-size: 30rpx;
					color: #888;
					margin-left: 8rpx;
				}
			}
		}

		.fn-item {
			position: relative;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			padding-left: 24rpx;
			box-sizing: border-box;

			&:active {
				background-color: #eeeeee;
			}

			.icon-box {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70rpx;
				height: 70rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;

				.user_head {
					width: 100%;
					height: 100%;
				}

				.badge {
					position: absolute;
					right: 0;
					top: 0;
				}
			}

			text {
				flex: 1;
				font-size: 32rpx;
				color: #333;
			}

			&:not(:last-child) text {
				&::after {
					position: absolute;
					right: 0;
					bottom: 0;
					content: "";
					width: calc(~"100% - 114rpx");
					border-bottom: 2rpx solid #eeeeee;
				}
			}
		}
	}
</style>
