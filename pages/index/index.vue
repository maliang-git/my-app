<template>
	<view class="content">
		<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
			<text v-if="chatList.length < 1" class="tips">暂无聊天信息</text>
			<view class="scroll-view-item user-item" v-for="(item, index) in chatList" :key="index" @click="goChat(item)">
				<view class="head-portrait">
					<min-badge class="badge" :count="item.unread_num"></min-badge>
					<image class="user_head" :src="item.origin_user.headImg || '../../static/defullt_head.jpg'" mode=""></image>
				</view>
				<view class="name-msg">
					<view class="name-time">
						<text class="name">{{item.origin_user.loginName}}</text>
						<text class="time">{{ $time(new Date(item.nweData),"yyyy-MM-dd hh:mm:ss") }}</text>
					</view>
					<text class="msg">{{ item.lastMsg }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import minBadge from "@/components/min-badge/min-badge";

	export default {
		components: {
			minBadge
		},
		data() {
			return {
				title: "Hello",
				chatList: this.$store.state.chatInfoList,
				userInfo:{}
			};
		},
		watch: {
			'$store.state.chatInfoList': {
				handler: function(val, old) {
					this.$nextTick(() => {
						console.log('val',val)
						console.log('old',old)
						this.chatList = val
					})
				},
				deep: true,
			},
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		mounted(){
			
		},
		methods: {
			goChat(room) {
				// 存储当前聊天人
				uni.setStorage({
					key: "currentChatUser",
					data: room.origin_user
				});
				uni.navigateTo({
					url: "/chat/window/window"
				});
			}
		}
	};
</script>

<style scoped lang="less">
	@import "../../common/less/public.less";

	.content {
		.tips {
			display: block;
			width: 100%;
			text-align: center;
			font-size: 32rpx;
			color: #999999;
			height: 100rpx;
			line-height: 100rpx;
		}

		.user-item {
			display: flex;
			padding: 18rpx 0 0 30rpx;
			box-sizing: border-box;

			&:active {
				background-color: #eeeeee;
			}

			.head-portrait {
				position: relative;
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				background-color: #eeeeee;
				border-radius: 6rpx;

				>image {
					width: 100%;
					height: 100%;
				}

				.badge {
					position: absolute;
					right: 0;
					top: 0;
				}
			}

			.name-msg {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-bottom: 18rpx;
				border-bottom: 1rpx solid #eeeeee;
				height: 138rpx;
				box-sizing: border-box;
				padding-right: 30rpx;

				.name-time {
					display: flex;
					justify-content: space-between;

					.name {
						font-size: 38rpx;
						color: #333333;
					}

					.time {
						font-size: 30rpx;
						color: #999999;
					}
				}

				.msg {
					font-size: 30rpx;
					color: #999999;
					.textRow(1);
				}
			}
		}
	}
</style>
