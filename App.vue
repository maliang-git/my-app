<script>
	// import VConsole from './static/js/vconsole.min.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// var vConsole = new VConsole();
			this.webSocketConnect()
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
