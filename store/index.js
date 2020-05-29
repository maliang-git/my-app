import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		searchUser: {dsfg:123}
	},
	mutations: {
		SEARCH_USER(state, val) {
			console.log(val)
			state.searchUser = val
		},
	}
})
export default store