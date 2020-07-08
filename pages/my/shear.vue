<template>
	<view class="page-content" @touchmove.stop.prevent="moveHandle">
		<image class="user_head" :style="{width:phoneWidth+'px',left:20+'px'}" src="../../static/defullt_head.jpg" mode="widthFix"></image>
		<view class="mantle mantle-top"></view>
		<view class="mantle mantle-center" :style="{height:phoneWidth+2+'px'}">
			<view class="seat"></view>
			<view class="mantle-box" :style="{width:phoneWidth+'px',height:phoneWidth+'px'}">
				<view class="subscript subscript-one"></view>
				<view class="subscript subscript-tow"></view>
				<view class="subscript subscript-there"></view>
				<view class="subscript subscript-four"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
			</view>
			<view class="seat"></view>
		</view>
		<view class="mantle mantle-bottom"></view>
		<!-- <image class="user_head" src="../../static/defullt_head.jpg" mode=""></image>
		<view class="mantle" @touchmove.stop.prevent="moveHandle">

			<view class="mantle-box" :style="{width:phoneWidth+'px',height:phoneWidth+'px'}">
				<view class="subscript subscript-one"></view>
				<view class="subscript subscript-tow"></view>
				<view class="subscript subscript-there"></view>
				<view class="subscript subscript-four"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
				<view class="lattice"></view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneWidth: 0
			}
		},
		onReady() {
			this.phoneWidth = uni.getSystemInfoSync().screenWidth - 40
			console.log(uni.getSystemInfoSync().screenWidth)
		},
		mounted() {

		},
		methods: {
			moveHandle() {}
		}
	}
</script>

<style scoped lang="less">
	.page-content {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: #000;
		display: flex;
		flex-direction: column;

		.user_head {
			position: absolute;
			width: 100%;
			position: absolute;
			left: 0;
			top: -20rpx;
		}

		.mantle-top {
			flex: 1;
			background-color: rgba(0, 0, 0, 0.8);
		}

		.mantle-center {
			display: flex;

			.seat {
				flex: 1;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.8);
			}

			.mantle-box {
				position: relative;
				z-index: 2;
				display: flex;
				flex-wrap: wrap;
				position: relative;
				border: 2rpx solid #fff;
				background-color: none;

				.lattice {
					flex: 1;
					min-width: 33%;
					min-height: 33%;
					border-right: 1rpx solid #fff;
					border-bottom: 1rpx solid #fff;

					&:nth-child(3n+1) {
						border-right: none;
					}

					&:nth-last-child(1),
					&:nth-last-child(2),
					&:nth-last-child(3) {
						border-bottom: none;
					}
				}

				.subscript {
					position: absolute;
					width: 40rpx;
					height: 40rpx;
				}

				.subscript-one {
					left: -6rpx;
					top: -6rpx;
					border-top: 6rpx solid #fff;
					border-left: 6rpx solid #fff;
				}

				.subscript-tow {
					right: -6rpx;
					top: -6rpx;
					border-top: 6rpx solid #fff;
					border-right: 6rpx solid #fff;
				}

				.subscript-there {
					left: -6rpx;
					bottom: -6rpx;
					border-left: 6rpx solid #fff;
					border-bottom: 6rpx solid #fff;
				}

				.subscript-four {
					right: -6rpx;
					bottom: -6rpx;
					border-right: 6rpx solid #fff;
					border-bottom: 6rpx solid #fff;
				}
			}
		}

		.mantle-bottom {
			flex: 1;
			background-color: rgba(0, 0, 0, 0.8);
		}

		.mantle {
			position: relative;
			z-index: 2;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
