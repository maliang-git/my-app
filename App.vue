<script>
	// import VConsole from './static/js/vconsole.min.js'
	export default {
		globalData: {
			socketInfo: null
		},
		onLaunch: function() {
			console.log('App Launch')
			this.webSocketConnect()
		},
		onShow: function() {
			// var vConsole = new VConsole();
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
	/*每个页面公共css */
</style>
