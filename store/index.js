import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		searchUser: {}, // 用户详情信息
		userInfo: {}, // 当前登录用户信息
		socketInfo: null,
		unreadNum: 0, // 未读请求数量
		friendsReq: [], // 好友请求列表
		myFriendList: [], // 我的好友列表
		chatInfoList: [], // 聊天列表
		chatDetaile: [] // 聊天详情
	},
	mutations: {
		SET_USERINFO(state, val) {
			state.userInfo = val
		},
		SEARCH_USER(state, val) {
			state.searchUser = val
		},
		SET_FRIENDSREQ(state, val) {
			state.friendsReq = val
			state.unreadNum = 0
			val.forEach(item => {
				// 若有未读，点亮角标
				if (!item.isBrowse) {
					state.unreadNum += 1
				}
			})
			if (state.unreadNum > 0) {
				uni.showTabBarRedDot({
					index: 1
				});
			} else {
				uni.hideTabBarRedDot({
					index: 1
				});
			}
		},
		SET_FRIENDSLIST(state, val) {
			state.myFriendList = val
		},
		SET_CHAT_LIST(state, val) {
			state.chatInfoList = val
		},
		SET_CHAT_DETAILE(state, val) {
			state.chatDetaile = val
		},
	}
})
export default store
