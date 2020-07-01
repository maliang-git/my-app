<template>
	<view class="page-content">
		<view class="fn-lit">
			<fn-item v-for="(item,index) in setList" :key="index" :title="item.text" :height="index===0?'140':'100'" :noBorder="index===0"
			 @click.native="editData(item)">
				<view v-if="item.code==='head'" class="img-list">
					<image src="../../static/defullt_head.jpg" mode=""></image>
				</view>
				<view v-if="item.code==='name'" class="item-text">
					<text>{{userInfo.loginName}}</text>
				</view>
				<view v-if="item.code==='gender'" class="item-text">
					<text>{{userInfo.gender || ''}}</text>
				</view>
				<view v-if="item.code==='region'" class="item-text">
					<text>{{userInfo.cityInfo ? userInfo.cityInfo.label : ''}}</text>
				</view>
				<view v-if="item.code==='autograph'" class="item-text">
					<text>{{userInfo.autograph || ''}}</text>
				</view>
			</fn-item>
		</view>
		<view class="out-login">
			<fn-item title="退出登录" @click.native="signOut" noBorder></fn-item>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-content">
				<view class="input-item">
					<view class="set-title">
						<text>{{setTitle}}</text>
						<button :disabled="!formData.keyWords" class="set-btn" type="primary" @click="setUserInfoFn">完成</button>
					</view>
					<!-- s 设置昵称 -->
					<input v-if="formData.editType==='name'" type="text" v-model="formData.keyWords" placeholder="输入昵称" />
					<!-- s 设置性别 -->
					<view v-if="formData.editType==='gender'" class="uni-list">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
								<view>
									<radio :value="item.name" :checked="item.checked" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
					<!-- s 设置签名 -->
					<textarea v-if="formData.editType==='autograph'" type="text" v-model="formData.keyWords" placeholder="输入签名" />
					</view>
			</view>
		</uni-popup>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import fnItem from "@/components/my-components/fn-item.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		components: {
			fnItem,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			simpleAddress
		},
		data() {
			return {
				userInfo: {},
				setList: [{
						text: '头像',
						code: 'head'
					},
					{
						text: '昵称',
						code: 'name'
					},
					{
						text: '性别',
						code: 'gender'
					},
					{
						text: '地区',
						code: 'region'
					},
					{
						text: '签名',
						code: 'autograph'
					},
				],
				setTitle:"",
				items: [{
						value: 'man',
						name: '男',
					},
					{
						value: 'woman',
						name: '女',
					},
				],
				formData:{
					editType: "",
					keyWords:null
				},
				cityPickerValueDefault: [0, 0, 0],
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
			console.log(this.userInfo)
		},
		onReady(){
			// 监听修改用户信息回调
			getApp().globalData.socketInfo.on('return_user_info', (res) => {
				if (res.code === 200) {
					console.log(888)
					this.$store.commit("SET_USERINFO", res.data)
					this.$refs.popup.close()
					uni.showToast({
						title: '修改成功',
						icon: "success",
					});
					this.formData = {
						editType: "",
						keyWords:null
					}
					this.items = [{
							value: 'man',
							name: '男',
						},
						{
							value: 'woman',
							name: '女',
						},
					]
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
				console.log('用户信息', res)
			})
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
			},
			// 切换性别
			radioChange(e){
				this.$nextTick(()=>{
					this.formData.keyWords= e.target.value
				})
			},
			editData(item) {
				this.formData.editType = item.code
				if(item.code === 'region'){
					this.cityPickerValueDefault = this.userInfo.cityInfo ? this.userInfo.cityInfo.value : [0,0,0]
					this.$refs.simpleAddress.open();
					return
				}
				if(item.code === 'name'){
					this.formData.keyWords = this.userInfo.loginName
				}
				if(item.code === 'autograph'){
					this.formData.keyWords = this.userInfo.autograph
				}
				if(item.code === 'gender') {
					this.formData.keyWords = this.userInfo.gender
					for(let i = 0;i<this.items.length;i++){
						if(this.items[i].name === this.userInfo.gender){
							this.items[i].checked = true
						}
					}
				}
				this.setTitle = '设置' + item.text
				this.$refs.popup.open()
			},
			// 确认更改用户信息
			setUserInfoFn(){
				this.formData.userId = this.userInfo._id
				console.log(this.formData)
				getApp().globalData.socketInfo.emit("update_user_info", this.formData);
			},
			// 选择城市
			onConfirm(e) {
				this.formData.userId = this.userInfo._id
				this.formData.keyWords = e
				getApp().globalData.socketInfo.emit("update_user_info", this.formData);
				console.log(e)
			}
		},
		destroyed(){
			// 离开页面删除监听
			getApp().globalData.socketInfo.removeAllListeners('return_user_info');
		}
	}
</script>

<style scoped lang="less">
	.page-content {
		height: 100vh;
		background-color: rgb(248, 248, 248);
	}

	.fn-lit {
		background-color: #fff;
	}

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

	.out-login {
		margin-top: 20rpx;
		background-color: #fff;
	}

	.item-text {
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 0 20rpx;

		text {
			color: #888;
			font-size: 34rpx;
		}
	}

	.popup-content {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: rgb(248, 248, 248);
		padding: 20rpx 0;

		.input-item {
			width: 100%;

			.set-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;

				.set-btn {
					width: 140rpx;
					height: 60rpx;
					line-height: 60rpx;
					margin: 0;
				}
			}

			text {
				font-size: 28rpx;
				color: #666;
				box-sizing: border-box;
			}

			input {
				width: 100%;
				height: 100rpx;
				font-size: 28rpx;
				background-color: #fff;
				margin-top: 20rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
			}

			textarea {
				width: 100%;
				height: 120rpx;
				font-size: 28rpx;
				background-color: #fff;
				margin-top: 20rpx;
				padding: 10rpx 20rpx;
				box-sizing: border-box;
			}
		}

		.uni-list {
			margin-top: 20rpx;

			.uni-list-cell {
				display: flex;
				align-items: center;
				height: 100rpx;
				padding: 0 20rpx;
				border-bottom: 2rpx solid #eee;

				&:nth-child(1) {
					border-top: 2rpx solid #eee;
				}
			}
		}
	}
</style>
