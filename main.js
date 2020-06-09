import Vue from 'vue'
import App from './App'
import http from './request/request.js'
import store from './store'
import webSocket from './mixins/webSocket.js'
Vue.config.productionTip = false

Vue.prototype.$store = store  
Vue.prototype.$http = http

App.mpType = 'app'

Vue.mixin(webSocket)
const app = new Vue({
    ...App
})
app.$mount()
