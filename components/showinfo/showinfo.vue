<template>

	<view>
		<view class="showLogin">
			<view class="showTot">
			  <view class="show_title" v-if="infoType == 1">会员登录,享受更多优惠</view>
			  <view class="show_title" v-if="infoType == 2">获取手机号码，信息更完善</view>
			  <button class="btn-cancel" @click='getuserinfo_' v-if="infoType == 1">获取授权</button>
			  <button class="btn-cancel"  open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" v-if="infoType == 2">获取手机号</button>
			</view>
		</view>
	</view>
</template>

<script>
	var that
	export default {
		props:{
			infoType:{
				infoType:Number,
				default:1
			},
			title: {
				type: String,
				default: ''
			},
			info: {
				type: String,
				default: ''
			},
			btn: {
				type: String,
				default: '取消'
			},
			btn1: {
				type: String,
				default: '确定'
			}
		},
		data() {
			return {
				
			}
		},
		created() {
			that = this
			
			
		},
		methods: {
			getuserinfo_(e) {
				let that = this;
				uni.getUserProfile({
					desc: 'Wexin',
					success: res => {
						if (res.userInfo) {
							uni.setStorage({
								key: 'userinfo',
								data: res.userInfo
							})
							that.$emit('getuserinfo')
						}else{
							uni.showModal({
								title: '拒绝授权会影响功能使用',
								icon: 'none',
								showCancel: false,
							})
							that.$emit('getuserinfo')
						}
						// console.log(res)
					},
					fail: err => {
						console.log(err);
					}
				})
			},
		 
			decryptPhoneNumber(e) {
				console.log(e);
				var that = this;
				const info = uni.getStorageSync('userinfo');
				console.log(info);
				uni.setStorage({
					key: "phoneLogo",
					data: e.detail
				})
				that.$http.post({
					url:'/zzj_singleSaleApi/authorizedLogin',
					data:{
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv,
						session_key:uni.getStorageSync('session_key'),
						bid: uni.getStorageSync('bid'),
						openid: uni.getStorageSync('openid'),
						nickName:info.nickName?info.nickName:info.nickname,
						headimg: info.avatarUrl?info.avatarUrl:info.headimg,
						share_v_id: 0, //分享id
						city:info.city,
						sex: info.gender, //性別
						country: info.country, //國家
						province: info.province //省份
					}
				}).then(res=>{
					that.$emit('getuserinfo')
					if(res.errcode == 100){
						that.v_id = res.v_id;
						uni.setStorage({
							key: "vid",
							data: res.v_id
						})
					}
				})
			},
			cancel(){
				this.$emit('cancel')
			},
			certain(){
				this.$emit('certain')
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.showLogin{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		position: fixed;
		top:0;
		left:0;
		z-index:9999;
		.showTot{
			width:550rpx;
			height: 380rpx;
			background: #FFFFFF;
			position: fixed;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			border-radius: 15rpx;
			text-align: center;
			.show_title{
				color: #969696;
				margin-top:80rpx;
			}
			.btn-cancel {
				width: 260rpx;
				font-size: 30rpx;
				text-align: center;
				color: #969696;
				border: 1px solid #AFAFAF;
				border-radius: 68rpx;
				line-height: 68rpx;
				background: none;
				margin-top: 100rpx;
			}
		}
	}
	
</style>
