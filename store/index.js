import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		searchUser: {}, // 用户详情信息
		socketInfo:null,
		friendsReq:[], // 好友请求列表
	},
	mutations: {
		SEARCH_USER(state, val) {
			console.log(val)
			state.searchUser = val
		},
		SET_FRIENDSREQ(state, val) {
			console.log(val)
			state.friendsReq.push(val)
		},
	}
})
export default store