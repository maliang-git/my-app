<template>
	<view class="page-content" @touchmove.stop.prevent="moveHandle">
		<canvas canvas-id='myCanvas'></canvas>
		<movable-area :style="{width:cropBorder.size+'px',height:cropBorder.size+'px',top:cropBorder.y+'px',left:cropBorder.x+'px'}">
			<movable-view :style="{width:imgInfo.width+'px',height:imgInfo.height+'px'}" direction="all" scale="true"
			 out-of-bounds="true">
				<image class="user_head" src="../../static/2.png" :mode="imgMode"></image>
			</movable-view>
		</movable-area>
	</view>
</template>
<!-- :style="{minWidth:initWidth+'px',minHeight:initWidth+'px',}" -->
<script>
	export default {
		data() {
			return {
				// movable-view左上角相对于movable-area的坐标x,y，
				// 由于movable-area左上角位于屏幕原点，因此x，y也是movable-view相对于屏幕的坐标
				x: 0,
				y: 0,
				scale: 1, // 用来控制moveable-view的缩放比例，回撤重置时需要
				src: {
					// 图片的源文件数据
					path: '',
					orientation: 'up',
					// width和height在最初时和屏幕尺寸做比较，做一个合适的缩放
					// 在截图的时候，计算方框在源图片的位置也需要用到width和height
					width: 0,
					height: 0,
					ratio: 1, // 图片的长宽比，最开始需要根据ratio判断图片的形状是长图还是宽图，进行合适的居中放置
				},
				image: {
					// 最初图片在屏幕上显示的宽度和高度
					// 经过缩放后也是基于这两个尺寸计算新的尺寸
					initialWidth: 0,
					initialHeight: 0,
					// 控制最初图片在屏幕中的位置
					initialX: 0,
					initialY: 0,
					// 经过缩放移动后图片在屏幕中的位置
					// 截图时找方框在源图片中的位置，是基于屏幕坐标系，所以需要图片的当前位置
					curX: 0,
					curY: 0,
					// 图片当前的缩放比例，用于计算图片当前显示的尺寸大小
					curScale: 1
				},
				imgInfo: {
					width: 0,
					height: 0
				},
				imgMode: 'widthFix',
				// 屏幕尺寸windowWidth和windowHeight
				windowWidth: 0,
				windowHeight: 0,
				cropBorder: {
					// 截图的方框相对于屏幕中的位置
					x: 0,
					y: 0,
					// 截图方框的尺寸
					size: 0
				},
				context: null
			}
		},
		onLoad(options) {
			this.windowWidth = uni.getSystemInfoSync().screenWidth
			this.windowHeight = uni.getSystemInfoSync().screenHeight
			this.cropBorder.size = this.windowWidth * 0.9
			this.cropBorder.x = (this.windowWidth - this.cropBorder.size) >> 1
			this.cropBorder.y = (this.windowHeight - this.cropBorder.size) >> 1
			// #ifdef APP-PLUS
			this.cropBorder.y = (this.windowHeight - 40 - this.cropBorder.size) >> 1
			// #endif
		},
		onReady() {
			let cropBorder = this.cropBorder
			this.context = uni.createCanvasContext('myCanvas')
			// 设置背景黑色透明度0.5，不要使用opacity，会导致后期截出来的图片也是半透明
			this.context.setFillStyle('rgba(0,0,0,0.5)')
			this.context.fillRect(0, 0, this.windowWidth, this.windowHeight)
			// 挖出来一个方框，这个方框区域就是全透明了
			this.context.clearRect(cropBorder.x, cropBorder.y, cropBorder.size, cropBorder.size)
			// 画方框的外框
			this.context.setStrokeStyle('white')
			// 往外画大一圈，这样在canvas上填充图片的时候框线就不会变细啦
			this.context.strokeRect(cropBorder.x, cropBorder.y, cropBorder.size, cropBorder.size)
			this.context.draw()
			this.getDescBox()
		},
		mounted() {

		},
		methods: {
			moveHandle(e) {
				console.log(e)
			},
			getDescBox() {
				setTimeout(() => {
					let menuItem = uni.createSelectorQuery().select(".user_head");
					menuItem.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.imgInfo = data
					}).exec();
				}, 100)
			},
		}
	}
</script>

<style scoped lang="less">
	.page-content {
		width: 100%;
		height: 100vh;
		background-color: #000;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	canvas {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	movable-area {
		position: fixed;
		background-color: pink;
	}

	/* #ifdef H5 */
	.page-content {
		height: calc(100vh - 44px);
		padding-bottom: 44px;
		box-sizing: border-box;
	}

	/* #endif */
</style>
