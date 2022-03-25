import request from './request.js';
export default {
	 //  start  微信端获取openid
		getWXOpenid() {
			let that = this;
			uni.getProvider({
				service: "oauth",
				success: (res) => {
					uni.login({
						provider: res.provider[0],
						success: (req) => {
							request.get({
								url: '/zzj_singleSaleApi/getOpenId',
								data: {
									js_code: req.code,
									bid: uni.getStorageSync('bid')
								}
							}).then(res => {
								if (res.code == 100 && res.data) {
									uni.setStorage({
										key: "openid",
										data: res.data.openid
									})
									uni.setStorage({
										key: "vid",
										data: res.data.vid
									})
									uni.setStorage({
										key: "session_key",
										data: res.data.session_key
									})
									if (res.data.userInfo) {
										if (res.data.userInfo.nickname != null || res.data.userInfo.nickname != '微信用户') {
											uni.setStorage({
												key: "userinfo",
												data: res.data.userInfo
											})
										}
									}
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							})
						}
					})
				}
			})
		},
		//  end
	}
