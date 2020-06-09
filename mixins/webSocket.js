import io from '../socket.io.min.js'
export default {
	data() {
		return {
			userInfo: {}
		}
	},
	methods: {
		webSocketConnect(time) {
			console.log(456)
			this.$store.state.socketInfo = io('ws://172.16.75.192:1000');

			this.$store.state.socketInfo.on('connect', () => {
				// ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
				console.log('ws 已连接');

				// socket.io 唯一连接id，可以监控这个id实现点对点通讯
				const {
					id
				} = this.$store.state.socketInfo;
				this.$store.state.socketInfo.on(id, (message) => {
					// 收到服务器推送的消息，可以跟进自身业务进行操作
					console.log('ws 收到服务器消息：', message);
				});

				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data
					}
				});
				// 校验登录
				this.$store.state.socketInfo.emit('verify_login', {
					userToken: this.userInfo.token
				});
				
				// 监听回调信息
				this.$store.state.socketInfo.on('tips_msg',(message)=>{
					console.log(message)
					uni.showToast({
						title: message,
						icon: "none"
					});
				})
				
				// 监听添加好友回调
				this.$store.state.socketInfo.on('friends_add_req',(message)=>{
					this.$store.commit('SET_FRIENDSREQ', message)
					uni.showTabBarRedDot({index:1});
					console.log(message)
				})
			});
			// socket.on('error', (msg: any) => {
			//   console.log('ws error', msg);
			// });
		},
		// 请求添加好有
		friendsReq() {
			const friendToken = this.$store.state.searchUser.token
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data
				}
			});
			const myToken = this.userInfo.token
			console.log(friendToken,myToken)
			if (friendToken === myToken) {
				uni.showToast({
					title: "不能添加自己为好友",
					icon: "none"
				});
			} else {
				console.log(123456)
				this.$store.state.socketInfo.emit('add_friends', {
					friendToken,
					myToken
				});
			}
		}
	}
}
