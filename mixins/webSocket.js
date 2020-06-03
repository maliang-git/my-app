export default {
  data() {
    return {
      wsServer: null,
	  userInfo:{}
    }
  },
  onLoad() {
  	uni.getStorage({
  		key: 'userInfo',
  		success: (res) => {
  			this.userInfo = res.data
  		}
  	});
  },
  methods: {
    webSocketConnect(time) {
		this.wsServer = new WebSocket('ws://172.16.75.192:1000');
		this.wsServer.onopen = ()=>{
			console.log('连接服务器成功!');
			let params = {
				type:1,
				token: this.userInfo.token
			}
			params = JSON.stringify(params)
			this.wsServer.send(params)
		}
		this.wsServer.onclose = ()=>{
			console.log('服务器关闭');
		}
		this.wsServer.onerror = ()=>{
			console.log("连接出错");
		}
		// 接收服务端消息
		this.wsServer.onmessage = (e)=>{
			console.log(e)
		}
    },
	// 请求添加好有
	friendsReq() {
		let params = {
			type:2,
			myToken:'123',
			otherToken:'456',
		}
		params = JSON.stringify(params)
		this.wsServer.send(params);
	}
  }
}