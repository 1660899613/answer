import config from './config.js'


let systemData = {
	system: '', //操作系统版本
	platform: '', //操作系统类型  ios  android
	brand: '', //手机品牌
	model: '' //手机型号
}
let addressData = {
	longitude: 0, //用户当前经度范围，0-180度 未获取到为 0
	latitude: 0 //用户当前纬度范围，0-90 未获取到为 0
}
uni.getSystemInfo({
	success: (res) => {
		uni.setStorageSync('systemData', res)
		systemData = res
	}
})
uni.getLocation({
	type: 'wgs84',
	success: function(res) {
		uni.setStorageSync('addressData', res);
		addressData = res;
		
	}
})
let source = '' //访问端/来源 1微信公众号 2微信小程序 3支付宝小程序 4百度小程序 5头条小程序 6抖音小程序 7快应用
let regId = ''
// #ifdef H5
let ua = window.navigator.userAgent.toLowerCase()
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	source = 1
} else {
	source = 8
}
// #endif
// #ifdef MP-WEIXIN
source = 2
// #endif
// #ifdef MP-ALIPAY
source = 3
// #endif
// #ifdef MP-BAIDU
source = 4
// #endif
// #ifdef MP-TOUTIAO
source = 6
// #endif
// #ifdef QUICKAPP-WEBVIEW-UNION || QUICKAPP-WEBVIEW-HUAWEI || QUICKAPP-WEBVIEW
source = 7
// #endif
// #ifdef APP-PLUS
source = 9
// #endif


function request (url, data, method)  {
    data = Object.assign({}, {
       source: source,
	   system: systemData.system,
	   platform: systemData.platform,
	   brand: systemData.brand,
	   longitude: addressData.longitude,
	   latitude: addressData.latitude,
	   regId: regId
    }, data)
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseUrl + url,
			method: method,
			data,
			dataType: "json",
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function(resp) {
				resolve(resp.data);
			},
			fail: function(resp) {
				reject(resp);
			}
		})
	})
}

function post(obj) {
    return request(obj.url, obj.data, 'POST');
}

function get(obj) {
    return request(obj.url, obj.data, 'GET');
}

export default {
	post,
	get,
	source
}