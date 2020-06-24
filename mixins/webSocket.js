import io from "../socket.io.min.js";
export default {
    data() {
        return {
            userInfo: {},
        };
    },
    methods: {
        webSocketConnect() {
            let userInfo = uni.getStorageSync("userInfo");
            this.$store.state.socketInfo = io("ws://172.16.75.192:1000");
            this.$store.state.socketInfo.on("connect", () => {
                // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
                console.log("ws 已连接");
                // socket.io 唯一连接id，可以监控这个id实现点对点通讯
                const { id } = this.$store.state.socketInfo;
                this.$store.state.socketInfo.on(id, (message) => {
                    // 收到服务器推送的消息，可以跟进自身业务进行操作
                    console.log("ws 收到服务器消息：", message);
                    if (message.type && message.type === "signOut") {
                        this.clearData();
                    }
                });
				console.log(userInfo)
                // 校验登录
                this.$store.state.socketInfo.emit("verify_login", {
                    user_id: userInfo._id,
                });
            });
            // 监听回调信息
            this.$store.state.socketInfo.on("tips_msg", (message) => {
                console.log(message);
                uni.showToast({
                    title: message,
                    icon: "none",
                });
            });
            // 监听添加好友回调
            this.$store.state.socketInfo.on("friends_add_req", (message) => {
                console.log("好友请求", message);
                this.$store.commit("SET_FRIENDSREQ", message);
            });
            // 监听添加好友成功回调
            this.$store.state.socketInfo.on(
                "friends_add_success",
                (message) => {
                    console.log("好友列表", message);
                    this.$store.commit("SET_FRIENDSLIST", message);
                }
            );
            // 接收好友信息
            this.$store.state.socketInfo.on("return_room_list", (roomList) => {
                console.log("房间列表", roomList);
                this.$store.commit("SET_CHAT_LIST", roomList);
            });
			// 监听获取房间信息回调
			this.$store.state.socketInfo.on('return_room_info', (roomInfo) => {
				this.$store.commit("SET_ROOMINFO", roomInfo);
			    console.log('房间信息', roomInfo)
			});
			// 监听获取消息列表
			this.$store.state.socketInfo.on('return_msg_list', (msgList) => {
			    console.log('消息列表', msgList)
				this.$store.commit("SET_MSGLIST", msgList.data);
				this.$store.commit("SET_MSGTOTAL", msgList.total);
			})
			// 监听接收消息回调
			this.$store.state.socketInfo.on('receive_msg', (msgItem) => {
			    console.log('接收消息', msgItem)
				this.$store.commit("SET_MSGLIST", {type:'add',item:msgItem});
			    // setTimeout(this.scrollToBottom,300)
			})
            // socket.on('error', (msg: any) => {
            //   console.log('ws error', msg);
            // });
        },
        // 请求添加好友
        friendsReq() {
            const receive_user = this.$store.state.searchUser._id; // 对方id
            console.log(this.$store.state.searchUser);
            const { _id: send_user } = uni.getStorageSync("userInfo"); // 我方id
            if (!send_user) {
                uni.showToast({
                    title: "缺少我方id",
                    icon: "none",
                });
                return;
            }

            if (!receive_user) {
                uni.showToast({
                    title: "缺少对方id",
                    icon: "none",
                });
                return;
            }
            if (send_user === receive_user) {
                uni.showToast({
                    title: "不能添加自己为好友",
                    icon: "none",
                });
            } else {
                this.$store.state.socketInfo.emit("add_friends", {
                    send_user,
                    receive_user,
                });
            }
        },
        // 同意添加好友
        agreeToAdd() {
            const friendID = this.$store.state.searchUser._id; // 对方token
            const { _id: myId } = uni.getStorageSync("userInfo"); // 我方token
            if (!friendID) {
                uni.showToast({
                    title: "缺少对方id",
                    icon: "none",
                });
                return;
            }
            if (!myId) {
                uni.showToast({
                    title: "缺少我方id",
                    icon: "none",
                });
                return;
            }
            this.$store.state.socketInfo.emit("agree_add_friends", {
                myId,
                friendID,
            });
        },
        // 查看用户
        seeUserDeta(item) {
            console.log(item);
            const { _id: my_id } = uni.getStorageSync("userInfo"); // 我方token
            // 更新好友请求阅读状态
            this.$store.state.socketInfo.emit("update_read_state", {
                msgId: item._id,
                myId: my_id,
            });
        },
        // 退出登录
        clearData() {
            uni.removeStorage({
                key: "userInfo",
            });
            uni.removeStorage({
                key: "currentChatUser",
            });
            this.$store.state.socketInfo.close()
            this.$store.commit("SET_USERINFO", {});
            this.$store.commit("SEARCH_USER", {});
            this.$store.commit("SET_FRIENDSREQ", []);
            this.$store.commit("SET_FRIENDSLIST", []);
            this.$store.commit("SET_CHAT_LIST", []);
			this.$store.commit("SET_ROOMINFO", {});
			this.$store.commit("SET_MSGLIST", []);
            uni.reLaunch({
                url: "/pages/login/login",
            });
        },
    },
};
