import Vue from 'vue'
import App from './App'
import http from './request/request.js'
import timeFormat from './utils/date.js'
import store from './store'
import webSocket from './mixins/webSocket.js'
Vue.config.productionTip = false

Vue.prototype.$store = store  
Vue.prototype.$http = http
Vue.prototype.$time = timeFormat

App.mpType = 'app'

Vue.mixin(webSocket)
const app = new Vue({
    ...App
})
app.$mount()
