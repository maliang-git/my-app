<template>
	<view class="content">
		<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
			<view class="search-box">
				<view>
					<icon class="uni-icon" type="search" size="18" />
					<input class="uni-input" confirm-type="search" placeholder="用户名/手机号" @click="pageJump" />
				</view>
			</view>
		</scroll-view>
		<view class="add-list">
			<view class="fn-item" v-for="(item, index) in $store.state.friendsReq" :key="index" @click="seeDetails(item)">
				<view class="icon-box">
					<image class="user_head" src="../../static/defullt_img.png" mode=""></image>
				</view>
				<view class="add-info">
					<view class="req-people">
						<text class="name">{{item.reqPeople.loginName}}</text>
						<text class="time">{{item.reqTime}}</text>
					</view>
					<text class="req-text">{{item.reqMsg}}</text>
				</view>
				<text class="req-btn">查看</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import api from "@/api/index.js";
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
			};
		},
		onLoad() {},
		methods: {
			pageJump() {
				uni.navigateTo({
					url: "/pages/friends/search",
				});
			},
			seeDetails(item) {
				let data = {
					reqMsg: item.reqMsg,
					...item.reqPeople,
					seeType: 2, // 1:添加好友，2:同意添加好友 3:已经是好友
				}
				this.$store.commit('SEARCH_USER', data)
				uni.navigateTo({
					url: "/pages/friends/details",
				});
			}
		},
	};
</script>

<style scoped lang="less">
	.content {
		background-color: rgb(248, 248, 248);
		height: calc(100vh - 44px);

		.search-box {
			width: 100%;
			background-color: rgb(248, 248, 248);
			padding: 20rpx;
			box-sizing: border-box;

			>view {
				position: relative;
				width: 100%;
				height: 88rpx;
				background-color: #fff;

				.uni-icon {
					position: absolute;
					left: 20rpx;
					top: 50%;
					transform: translateY(-50%);
					border-radius: 4rpx;
				}

				.uni-input {
					height: 44px;
					font-size: 28rpx;
					padding-left: 64rpx;
				}
			}
		}

		.fn-item {
			position: relative;
			width: 100%;
			height: 120rpx;
			display: flex;
			align-items: center;
			padding-left: 24rpx;
			box-sizing: border-box;
			background-color: #fff;

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

			.add-info {
				display: flex;
				flex-direction: column;
				flex: 1;

				.req-people {
					display: flex;
					justify-content: space-between;

					.name {
						font-size: 32rpx;
						color: #333;
					}

					.time {
						font-size: 28rpx;
						color: #888;
						margin-right: 30rpx;
					}
				}

				.req-text {
					color: #888;
					font-size: 30rpx;
				}
			}

			.req-btn {
				font-size: 30rpx;
				color: #1296db;
				margin-right: 24rpx;
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				background-color: #eee;
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
