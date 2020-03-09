import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		user: null,
		isUnread: false
	},
	mutations: {},
	actions: {},
	modules: {}
})