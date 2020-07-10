<template>
	<view class="img-content">
		<image :src="upImage"></image>
		<view v-if="isShow" class='flex-justify-around text_white text_bg'>
			<view @click='outputImg'><text>取消</text></view>
			<view @click='uploadimg'><text>完成</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: null,
				showUpload: false,
				upImage: null,
				isShow: false
			}
		},
		onNavigationBarButtonTap() {
			console.log("点击了自定义按钮");
			this.init();
		},
		onLoad(option) {
			this.height = option.height;
			this.upImage = option.valueName
		},
		methods: {
			// 选择图片
			init() {
				const that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						console.log(res)
						// that.showUpload = true;
						// that.upImage = res.tempFilePaths[0];
						// that.isShow = true
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success(res) {
								uni.navigateTo({
									url: '/pages/my/shear?data=' + JSON.stringify(res)
								})
							}
						})
					}
				})
			},
			// 确认上传
			uploadimg: function() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let that = this;
				const uploadTask = uni.uploadFile({
					url: 'http://172.16.75.192:3002/user-center/upload',
					filePath: that.upImage,
					name: 'file',
					header: {
						'request-origin': 'WAP',
						'user-token': uni.getStorageSync('userInfo').token,
						'_id': uni.getStorageSync('userInfo')._id,
					}, //请求头，非必填
					formData: {
						'user': 'test'
					},
					success: function(res) {
						let data = JSON.parse(res.data)
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
						that.$store.commit("SET_USERINFO", data.data)
						setTimeout(() => {
							that.upImage = null
							that.isShow = false
							uni.navigateBack({
								delta: 1
							});
						}, 500)
						console.log(data);
					},
				});
				uploadTask.onProgressUpdate(function(res) {
					that.percent = res.progress;
					console.log('上传进度' + res.progress);
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				});
			},
			// 取消上传
			outputImg() {
				this.upImage = null
				this.isShow = false
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.img-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		background-color: rgb(0, 0, 0);

		.img-box {
			width: 100%;

			image {
				width: 100%;
			}
		}
	}

	.text_white {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 20rpx;
		color: white;
		display: flex;
		justify-content: space-around;
	}
</style>
