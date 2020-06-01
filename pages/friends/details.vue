<template>
	<view class="content">
		<view class="details-top">
			<view class="user-info">
				<view class="user-head">
					<image src="../../static/defullt_img.png" mode=""></image>
				</view>
				<view class="user-other">
					<view class="user-name"><text>{{ userDetails.remarksName || userDetails.loginName }}</text>
						<uni-icons type="person-filled" color="rgb(0, 122, 255)" size="18"></uni-icons>
					</view>
					<view v-if="userDetails.remarksName" class="line-item">昵称：<text>{{ userDetails.loginName }}</text></view>
					<view class="line-item">账号：<text>{{userDetails.phone}}</text></view>
					<view class="line-item">地区：<text>{{userDetails.city || '- -'}}</text></view>
				</view>
			</view>
			<fn-item title="备注和标签" @click.native="open"></fn-item>
			<fn-item title="朋友权限"></fn-item>
		</view>
		<view class="moudle-item">
			<fn-item title="圈圈" height="140" noBorder>
				<view class="img-list">
					<image src="../../static/defullt_img.png" mode=""></image>
					<image src="../../static/defullt_img.png" mode=""></image>
					<image src="../../static/defullt_img.png" mode=""></image>
					<image src="../../static/defullt_img.png" mode=""></image>
				</view>
			</fn-item>
			<fn-item title="更多信息"></fn-item>
		</view>
		<view class="moudle-item moudle-btn">
			<my-btn title="发送消息" icon-type="chatbubble"></my-btn>
			<my-btn title="添加好友" icon-type="plus" @click="friendsReq"></my-btn>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-content">
				<view class="input-item">
					<text>备注名</text>
					<input type="text" v-model="remarksName" placeholder="添加备注名" />
				</view>
				<view class="input-item">
					<text>标签</text>
					<input type="text" v-model="labelName" placeholder="通过标签给朋友分类" />
				</view>
				<button type="primary" @click="setUserRemarksFn">保存</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import fnItem from "@/components/my-components/fn-item.vue";
	import myBtn from "@/components/my-components/my-btn.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniIcons,
			fnItem,
			myBtn,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				userDetails: this.$store.state.searchUser,
				remarksName: '',
				labelName: '',
			};
		},
		onLoad() {
			this.sddfs()
		},
		methods: {
			sddfs() {
				// var wsServer = new WebSocket('ws://172.16.75.192:3002');
				// var socketTask = uni.connectSocket({
				// 	url: 'ws://172.16.75.192:3002', //仅为示例，并非真实接口地址。
				// 	complete: ()=> {}
				// });
				uni.connectSocket({
				    url: 'ws://172.16.75.192:3002',
				    data() {
				        return {
				            x: '',
				            y: ''
				        };
				    },
				    header: {
				        'content-type': 'application/json;charset=UTF-8',
						'request-origin':'WAP',
						'user-token':'132'
				    },
				    protocols: ['protocol1'],
				    method: 'GET'
				});
			},
			open() {
				this.remarksName = this.userDetails.remarksName
				this.labelName = this.userDetails.labelName
				this.$refs.popup.open()
			},
			// 設置备注与标签
			setUserRemarksFn() {
				this.$http("GET", '/user-center/setUserRemarks', {
						remarksName: this.remarksName,
						labelName: this.labelName,
						userToken: this.userDetails.token,
					})
					.then(res => {
						if (res.code === 200) {
							this.$refs.popup.close()
							this.userDetails.remarksName = this.remarksName
							this.userDetails.labelName = this.labelName
							this.remarksName = ''
							this.labelName = ''
						}
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					})
					.catch(error => {
						uni.hideLoading();
					});
			},
			// 请求添加好有
			friendsReq() {

			}
		},
	};
</script>

<style scoped lang="less">
	.content {
		height: calc(100vh - 44px);
		background-color: rgb(248, 248, 248);

		.details-top {
			width: 100%;
			padding: 44rpx 0 0 0;
			box-sizing: border-box;
			background-color: #fff;

			.user-info {
				width: 100%;
				padding: 0rpx 0 48rpx 10rpx;
				box-sizing: border-box;
				display: flex;
				padding-left: 44rpx;
				box-sizing: border-box;

				>.user-head {
					width: 150rpx;
					height: 150rpx;
					border-radius: 10rpx;
					overflow: hidden;
					margin-right: 20rpx;

					image {
						max-width: 100%;
						max-height: 100%;
					}
				}

				.user-other {
					flex: 1;

					.user-name {
						margin-bottom: 6rpx;
						margin-top: -6rpx;

						text {
							font-size: 38rpx;
							color: #333;
							margin-right: 8rpx;
						}
					}

					.line-item {
						font-size: 28rpx;
						color: #888;
						margin-bottom: 4rpx;
					}
				}
			}
		}

		.moudle-item {
			background-color: #fff;
			margin-top: 20rpx;

			.img-list {
				flex: 1;
				display: flex;
				align-items: flex-start;
				justify-content: flex-end;
				flex-wrap: wrap;
				overflow: hidden;
				padding: 0 20rpx;
				box-sizing: border-box;

				image {
					max-width: 100rpx;
					max-height: 100rpx;
					margin-left: 10rpx;
				}
			}
		}

		.moudle-btn>view:not(:first-child) {
			border-top: 1rpx solid #eeeeee;
		}

		.popup-content {
			width: 100%;
			height: 600rpx;
			background-color: rgb(248, 248, 248);
			padding-top: 40rpx;

			.input-item {
				width: 100%;
				margin-bottom: 24rpx;

				text {
					font-size: 28rpx;
					color: #666;
					padding: 0 20rpx;
					box-sizing: border-box;
				}

				input {
					width: 100%;
					height: 70rpx;
					font-size: 24rpx;
					background-color: #fff;
					margin-top: 20rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
				}
			}

			button {
				width: 200rpx;
				margin-top: 40rpx;
			}
		}
	}
</style>
