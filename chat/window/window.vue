<template>
	<view class="content">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" id="scrollview" style="height: 100%;">
			<view id="msglistview">
				<view v-for="(item,index) in chatDetaileList" :key="index" class="scroll-view-item user-item have-time" :class="item.type === 1 ? 'my-msg' : ''">
					<text class="time">{{ item.createdAt }}</text>
					<view class="head-portrait">
						<image class="user_head" src="../../static/defullt_img.png" mode=""></image>
					</view>
					<view class="name-msg">
						<text class="msg">{{ item.content }}</text>
					</view>
				</view>
			</view>
			<!--    <view class="scroll-view-item user-item my-msg">
                <view class="head-portrait">
                    <image
                        class="user_head"
                        src="../../static/defullt_img.png"
                        mode=""
                    ></image>
                </view>
                <view class="name-msg">
                    <text class="msg"
                        >你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说</text
                    >
                </view>
            </view>
            <view class="scroll-view-item user-item my-msg have-time">
                <text class="time">16:31</text>
                <view class="head-portrait">
                    <image
                        class="user_head"
                        src="../../static/defullt_img.png"
                        mode=""
                    ></image>
                </view>
                <view class="name-msg">
                    <view class="msg"
                        ><image
                            src="../../static/defullt_img.png"
                            mode="aspectFit"
                        ></image
                    ></view>
                </view>
            </view> -->
		</scroll-view>
		<view class="input-content">
			<view class="send-voice">
				<uni-icons type="mic-filled" size="30"></uni-icons>
			</view>
			<view class="send-msg">
				<input class="uni-input" type="text" v-model="messge" @confirm="sendMessge" confirm-type="send"/>
			</view>
			<view class="other-btn">
				<view>
					<uni-icons type="contact-filled" size="30"></uni-icons>
				</view>
				<view>
					<uni-icons type="plusempty" size="30"></uni-icons>
				</view>
			</view>
		</view>
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
				title: "window",
				scrollTop: 0,
				chatDetaileList: [],
				currentChatUser: {},
				messge: ''
			};
		},
		watch: {
			'$store.state.chatInfoList': {
				handler: function(val, old) {
					this.getChatList(val)
				},
				deep: true,
			},
		},
		mounted() {
		    // this.scrollToBottom()
		},
		onLoad() {
			// 当前聊天人
			this.currentChatUser = uni.getStorageSync('currentChatUser')
			wx.setNavigationBarTitle({
				title: this.currentChatUser.loginName
			})
			this.getChatList(this.$store.state.chatInfoList)
		},
		methods: {
			// 滚动至聊天底部
			scrollToBottom(t) {
				let that = this
				let query = uni.createSelectorQuery()
				query.select('#scrollview').boundingClientRect()
				query.select('#msglistview').boundingClientRect()
				query.exec((res) => {
					if (res[1].height > res[0].height) {
						that.scrollTop = res[1].height - res[0].height + 144
						console.log(132,that.scrollTop)
					}
				})
			},
			getChatList(chatList) {
				for (let i = 0; i < chatList.length; i++) {
					if (chatList[i].userInfo.token === this.currentChatUser.token) {
						this.$nextTick(() => {
							this.chatDetaileList = chatList[i].msg
							setTimeout(this.scrollToBottom,200)
						})
					}
				}
			},
			// 发送消息
			sendMessge() {
				// this.chatDetaileList.push({
				// 	content: this.messge,
				// 	createdAt: "2020-06-12 14:30:59",
				// 	isRead: true,
				// 	type: 1
				// })
				const {
					token
				} = uni.getStorageSync('userInfo') // 我方token
				this.$store.state.socketInfo.emit('send_messge', {
					friendToken: this.currentChatUser.token,
					myToken: token,
					messge: this.messge
				});
				this.messge = ''
				console.log(this.messge)
			}
		}
	};
</script>

<style scoped lang="less">
	@import "../../common/less/public.less";

	.content {
		position: relative;
		width: 100%;
		height: calc(100vh - 44px);
		background-color: #eeeeee;

		.scroll-Y {
			height: 100%;
			padding-bottom: 110rpx;
			box-sizing: border-box;

			.have-time {
				position: relative;
				margin-top: 80rpx;

				>.time {
					width: 100%;
					display: block;
					position: absolute;
					top: -40rpx;
					left: 0;
					text-align: center;
					font-size: 30rpx;
					color: #999999;
				}
			}

			.user-item {
				width: 100%;
				padding: 20rpx 30rpx 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding-right: 160rpx;
				box-sizing: border-box;

				.head-portrait {
					position: relative;
					width: 100rpx;
					height: 100rpx;
					background-color: #eeeeee;
					border-radius: 6rpx;

					>image {
						width: 100%;
						height: 100%;
					}
				}

				.name-msg {
					flex: 0.94;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: flex-start;

					>.msg {
						background-color: #ffffff;
						padding: 8rpx 16rpx;
						font-size: 32rpx;
						border-radius: 8rpx;
						word-break: break-all;
						max-width: 400rpx;

						image {
							max-width: 100%;
						}

						&::before {
							content: "";
							width: 20rpx;
							height: 20rpx;
							transform: rotate(-45deg);
							background-color: #fff;
							position: absolute;
							left: -10rpx;
							top: 40rpx;
						}
					}
				}
			}

			.my-msg {
				flex-flow: row-reverse;
				padding-right: 30rpx;
				padding-left: 160rpx;
				box-sizing: border-box;

				.name-msg {
					justify-content: flex-end;

					.msg {
						background-color: @themeColor;

						&::before {
							display: none;
						}

						&::after {
							content: "";
							width: 20rpx;
							height: 20rpx;
							transform: rotate(-45deg);
							background-color: @themeColor;
							position: absolute;
							right: -10rpx;
							top: 40rpx;
						}
					}
				}
			}
		}

		.input-content {
			width: 100%;
			height: 100rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #eeeeee;
			box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .5);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 16rpx;
			box-sizing: border-box;

			.send-msg {}

			.send-msg {
				flex: 1;
				height: 80rpx;
				margin: 0 20rpx;

				.uni-input {
					width: 100%;
					height: 100%;
					background-color: #fff;
				}
			}

			.other-btn {
				display: flex;
			}
		}
	}
</style>
