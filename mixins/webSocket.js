import io from '../socket.io.min.js'
export default {
	data() {
		return {
			userInfo: {}
		}
	},
	methods: {
		webSocketConnect() {
			let { token }  = uni.getStorageSync('userInfo')
			this.$store.state.socketInfo = io('ws://192.168.3.22:1000');
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
				// 校验登录
				this.$store.state.socketInfo.emit('verify_login', {
					userToken: token
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
			
			// 监听添加好友成功回调
			this.$store.state.socketInfo.on('friends_add_success',(message)=>{
				console.log(message)
				this.$store.commit('SET_FRIENDSLIST', message)
			})
			// socket.on('error', (msg: any) => {
			//   console.log('ws error', msg);
			// });
		},
		// 请求添加好友
		friendsReq() {
			const friendToken = this.$store.state.searchUser.token // 对方token
			const { token }  = uni.getStorageSync('userInfo') // 我方token
			if(!friendToken){
				uni.showToast({
					title: "缺少对方token",
					icon: "none"
				});
				return
			}
			
			if(!token){
				uni.showToast({
					title: "缺少我方token",
					icon: "none"
				});
				return
			}
			if (friendToken === token) {
				uni.showToast({
					title: "不能添加自己为好友",
					icon: "none"
				});
			} else {
				this.$store.state.socketInfo.emit('add_friends', {
					friendToken,
					myToken: token
				});
			}
		},
		// 同意添加好友
		agreeToAdd(){
			const friendToken = this.$store.state.searchUser.token // 对方token
			const { token }  = uni.getStorageSync('userInfo') // 我方token
			if(!friendToken){
				uni.showToast({
					title: "缺少对方token",
					icon: "none"
				});
				return
			}
			
			if(!token){
				uni.showToast({
					title: "缺少我方token",
					icon: "none"
				});
				return
			}
			this.$store.state.socketInfo.emit('agree_add_friends', {
				friendToken,
				myToken: token
			});
		}
	}
}
