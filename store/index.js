import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		searchUser: {}, // 用户详情信息
		userInfo: {}, // 当前登录用户信息
		socketInfo:null,
		friendsReq:[], // 好友请求列表
		myFriendList:[] // 我的好友列表
	},
	mutations: {
		SET_USERINFO(state, val) {
			state.userInfo = val
		},
		SEARCH_USER(state, val) {
			state.searchUser = val
		},
		SET_FRIENDSREQ(state, val) {
			state.friendsReq =  val
		},
		SET_FRIENDSLIST(state, val) {
			state.myFriendList = val
		},
	}
})
export default store