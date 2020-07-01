import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        searchUser: {}, // 用户详情信息
        userInfo: {}, // 当前登录用户信息
        socketInfo: null,
        unreadNum: 0, // 未读请求数量
        friendsReq: [], // 好友请求列表
        myFriendList: [], // 我的好友列表
        chatInfoList: [], // 聊天列表
		roomInfo:{}, // 房间信息
		chatDetaileList:[], // 消息列表
		msgTotal:0, // 消息总数
		isLoading:'' // 是否正在加载
    },
    mutations: {
        SET_USERINFO(state, val) {
			console.log('stor',val)
            state.userInfo = val;
			uni.setStorageSync("userInfo",val)
        },
        SEARCH_USER(state, val) {
            state.searchUser = val;
        },
        SET_FRIENDSREQ(state, val) {
            state.friendsReq = val;
            state.unreadNum = 0;
            val.forEach((item) => {
                // 若有未读，点亮角标
                if (!item.isBrowse) {
                    state.unreadNum += 1;
                }
            });
            if (state.unreadNum > 0) {
                uni.showTabBarRedDot({
                    index: 1,
                });
            } else {
                uni.hideTabBarRedDot({
                    index: 1,
                });
            }
        },
        SET_FRIENDSLIST(state, val) {
            state.myFriendList = val;
        },
        SET_CHAT_LIST(state, val) {
            state.chatInfoList = val;
			// 新消息提示
			const innerAudioContext = uni.createInnerAudioContext();
			val.forEach(item=>{
				if(item.unread_num > 0){
					innerAudioContext.autoplay = true;
					innerAudioContext.src = '../../static/mp3/tips.mp3';  // https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3
					innerAudioContext.onPlay(() => {
					    console.log('开始播放');
					});
				}
			})
        },
		SET_ROOMINFO(state, val) {
		    state.roomInfo = val;
		},
		SET_MSGLIST(state, val) {
			if(val.type === 'add'){
				state.chatDetaileList.push(val.item)
			}else{
				state.chatDetaileList = val.concat(state.chatDetaileList);
			}
			console.log( state.chatDetaileList.length)
			uni.$emit('receive_msg_list', state.chatDetaileList);
			uni.$on('clear_msg_list', (data) => {
				state.chatDetaileList = []
			})
		},
		SET_MSGTOTAL(state, val) {
		    state.msgTotal = val;
		},
		SET_LOADING(state, val) {
		    state.isLoading = val;
		},
    },
});
export default store;
