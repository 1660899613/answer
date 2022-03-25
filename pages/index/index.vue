<template>
	<view class="content">
		<block v-if="!noImage">
			<image :src="imgUrl+list.wx_img?imgUrl+list.wx_img:imgUrl+list[0].wx_img" mode="widthFix" class="name_img" lazy-load></image>
			<view class="activity_box_one display-flex flex-wrap margin-auto margin-top-100 margin-bot-30" v-if="numstate == 1">
				<block v-for="(item,index) in list" :key='index'>
					<view class="num_start_list width_100 height-90 color-white display-flex display-j-center display-a-center margin-bot-50"
						@click="activitySelect(index)">{{item.wx_title}}</view>
				</block>
			</view>
			
			<view class="activity_box" v-if="numstate == 2">
				<view class="activity_list">
					<text class="activity_explain">活动说明</text>
					<view class="activity_content">
						<rich-text :nodes="list.act_info"></rich-text>
					</view>
				</view>
				<view class="activity_list">
					<text class="activity_explain">活动规则</text>
					<view class="activity_content">
						<rich-text :nodes="list.act_rule"></rich-text>
					</view>
				</view>
			</view>
		</block>
		<!--Start  暂无题库 -->
		   <view class="no_info" v-if="noImage">
		   	    <image :src="no_Image?imgUrl+no_Image:''" mode="widthFix"></image>
		   </view>
		<!--End  暂无题库 -->

		<showinfo v-if='getuserinfo' @getuserinfo='getuserinfo = false' :infoType='infoType'></showinfo>
		<view class="Now_Start" @click="Now_Start" v-if="numstate == 2">马上开始</view>

	</view>
</template>

<script>
	let that;
	import api from '../../common/index.js'
	export default {
		data() {
			return {
				// 退伍军人 bid: 'Tsa*FkZ6C6pDHhQL*9MgDg==',  wx3d6ba376abe127b1
				bid: 'ZdNtvbfPgtBn1R8E3JlHag==', 
				imgUrl: this.imgUrl,
				numstate: 1,
				getuserinfo: false,
				infoType: 1,
				show: false,
				list: [],
				gid: '', // 题库ID
				noImage:false,
				no_Image:'',
			}
		},
		onLoad() {
			let that = this;
			uni.setStorageSync('bid', that.bid);
			
			that.getNumStart()
		},
		onShow() {
			api.getWXOpenid();
		},
		methods: {
			activitySelect(index) {
				let that = this;
				that.list = that.list[index]
				that.numstate = 2;
				let gid = Object.keys(that.list.bankArr);
				that.gid = gid;
				uni.setStorage({
					key: 'sid',
					data: that.list.sid
				})
				uni.setStorage({
					key: 'return_correct',
					data: that.list.return_correct
				})
			},

			getNumStart() {
				let that = this;
				that.$http.post({
					url: '/SRA_Standup2021/act_list',
					data: {
						token: that.bid
					}
				}).then((res) => {
					if (res.data != null) {
						that.noImage = false;
						let list_length = res.data.length;
						if (list_length == 1) {
							that.numstate = 2;
							that.list = res.data[0];
							let gid = Object.keys(that.list.bankArr);
							that.gid = gid;
							if (gid) {
								uni.setStorage({
									key: 'gid',
									data: gid
								})
							}
							if (that.list.sid) {
								uni.setStorage({
									key: 'sid',
									data: that.list.sid
								})
							}
							if (that.list.return_correct) {
								uni.setStorage({
									key: 'return_correct',
									data: that.list.return_correct
								})
							}
						} else {
							that.numstate = 1;
							that.list = res.data;
						}
					} else {
						uni.showModal({
							title:'提示',
							content:res.msg,
							showCancel:false
						})
						that.noImage = true;
						that.no_Image = res.img
					
					}

				})
			},

			getinfo() {
				let that = this;
				let info = uni.getStorageSync('userinfo');
				uni.getSetting({
					success: (res) => {
						if (!res.authSetting['scope.userInfo'] || info == '') {
							that.getuserinfo = true
						} else {
							that.getuserinfo = false
						}
					}
				})
			},
//that.getinfo();  判断是否授权注册
			Now_Start() {
				let that = this;
				let info = uni.getStorageSync('userinfo');
				console.log(info)
				let vid = uni.getStorageSync('vid');
				console.log(vid)
				if(info == ''){
					that.infoType = 1;
					that.getuserinfo = true
					return;
				}
				if (vid == '') {
					that.infoType = 2;
					that.getuserinfo = true
				} else {
					that.$http.post({
						url: '/SRA_Standup2021/question',
						data: {
							token: uni.getStorageSync('bid'),
							act_id: that.list.sid,
							gid: that.gid,
							v_id: uni.getStorageSync('vid')
						}
					}).then(res => {
						if (res.success == 100001) {
							uni.setStorage({
								key: 'group_id',
								data: res.group_id
							})
							uni.showModal({
								title: '提示',
								content: res.data,
								showCancel: false,
								success() {
									uni.navigateTo({
										url: '/pages/end/end'
									})
								}
							})
						}
						if (res.success == false) {
							uni.showModal({
								title: '提示',
								content: res.data,
								showCancel: false
							})
						}
						if (res.success == true) {
							uni.navigateTo({
								url: '/pages/answer/answer?sid=' + that.list.sid + '&gid=' + that.gid
							})
						}
					})

				}

			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.no_info{
		width:100%;
		position: fixed;
		top:200rpx;
		left:0;
		z-index:666;
		image{
			width:100%;
		}
	}
	.name_img {
		width: 100%;
		height: 414rpx;
	}

	.activity_box_one {
		width: 660rpx;

		.num_start_list {
			background: linear-gradient(0deg, #FF6E02, #FFBE01);
			box-shadow: 0px 2px 0px 0px rgba(128, 16, 16, 0.75);
			border-radius: 11rpx;
		}
	}

	.activity_box {
		width: 660rpx;
		background: #FFFFFF;
		margin: 32rpx auto;
		display: flex;
		flex-direction: column;
		padding: 30rpx 0;
		position: relative;

		.activity_list:first-child {
			border-bottom: 1px dotted red;
			padding-bottom: 50rpx;
		}

		.activity_list:last-child {
			margin-top: 35rpx;
		}

		.activity_list {
			padding: 10rpx 26rpx;

			.activity_explain {
				width: 100%;
				font-size: 36rpx;
				font-weight: 400;
				display: block;
				color: #DB2626;
				text-align: center;
			}

			.activity_content {
				color: #3E3E3E;
				line-height: 48rpx;
				margin-top: 15rpx;
			}

		}
	}

	.activity_box::after {
		content: "";
		position: absolute;
		bottom: -40rpx;
		left: 0;
		width: 100%;
		height: 30px;
		display: block;
		background: linear-gradient(-45deg, transparent 33.33%, #fff 33.33%, #fff 66.666%, transparent 66.666%),
			linear-gradient(45deg, transparent 33.33%, #fff 33.33%, #fff 66.666%, transparent 66.666%);
		background-size: 10px 60px;
		transform: rotate(180deg);
	}
</style>
