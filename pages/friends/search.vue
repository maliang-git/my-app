<template>
	<view class="content">
		<scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
			<view class="search-box">
				<view>
					<icon class="uni-icon" type="search" size="18" />
					<input v-model="keyData" class="uni-input" confirm-type="search" placeholder="用户名/手机号" @confirm="searchUser" />
				</view>
			</view>
		</scroll-view>
		<view v-if="isHaveUser" class="no-user">
			<text>该用户不存在</text>
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
				keyData: '18142566234',
				isHaveUser: false
			};
		},
		watch: {
			keyData: function(val, old) {
				if (!val || val === '' || val !== old) {
					this.isHaveUser = false
				}
			}
		},
		onLoad() {},
		methods: {
			// 搜索用户
			searchUser() {
				if (this.keyData && this.keyData != '' && !this.isHaveUser) {
					uni.showLoading();
					// 先从好友列表搜索
					const frendsList = this.$store.state.myFriendList
					if (frendsList.length > 0) {
						for (let i = 0; i < frendsList.length; i++) {
							if (frendsList[i].phone === this.keyData || frendsList[i].loginName === this.keyData) {
								uni.hideLoading();
								this.$store.commit('SEARCH_USER', frendsList[i])
								this.pageJump()
								return
							}
						}
					}

					// 好友列表未搜索到从远程搜索
					this.$http("GET", api.userApi.searchUser, {
							keyData: this.keyData
						})
						.then(res => {
							uni.hideLoading();
							if (res.code === 200) {
								if (res.data.length === 0) {
									this.isHaveUser = true
								} else {
									this.$store.commit('SEARCH_USER', res.data[0])
									this.pageJump()
								}
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
			},
			pageJump() {
				uni.navigateTo({
					url: "/pages/friends/details",
				});
			},
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

		.no-user {
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #888;
			font-size: 32rpx;
			background-color: #fff;
		}
	}
</style>
