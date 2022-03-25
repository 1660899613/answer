import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

//  地址
import config from 'common/config.js'
Vue.prototype.imgUrl = config.imgUrl
Vue.prototype.staticUrl = config.staticUrl
Vue.prototype.echatUrl = config.echatUrl
Vue.prototype.baseUrl = config.baseUrl

//  请求
import http from 'common/request.js'
Vue.prototype.$http = http

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
