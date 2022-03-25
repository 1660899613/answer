<template>
	<view class="content">
		<view class="answer answer_width">
			<view class="answer_content">
				<view class="subject">
					<view class="sub_left">
						 <text class="sub_name">积分排名</text>
						 <view class="sub_ranking">
						 	 <image src="../../static/img/xin.png" mode="widthFix" class="xin_img" lazy-load></image>
							 <text class="rank_text">排名:{{Info.thisAllMyRanking?Info.thisAllMyRanking:''}}</text>
						 </view>
					</view>
					<view class="sub_right">
						<text class="sub_name_title">“{{Info.userInfo.v_nickname?Info.userInfo.v_nickname:''}}”</text>
						<view class="sub_integral">	
						您当前的积分：
						<text class="integral_num">{{Info.score?Info.score:''}}分 </text>
						</view>
					</view>
				</view>
				
				<view class="pop_box">
					<view class="pop_content">
						 <text class="pop_txt">{{Info.continueTitle1}}</text>
						 <text class="pop_txt">来日再战！</text>
					</view>
				</view>
				
				<view class="pop_Ren">
					<image src="../../static/img/renwu2.png" mode="widthFix" class="pop_Ren_img" lazy-load></image>
				</view>
				
				
			</view>
		</view>
		
		<view class="Now_box_bot">
			<view class="Now_Start_plus" @click="Now_Start_redo" v-if="Info.continue == 1" :class="{active:Info.continue == 1 && Info.publish_ranking == 0}">{{Info.continueTitle2}}</view>
			<view class="Now_Start_plus" @click="Now_Start" v-if="Info.publish_ranking == 1" :class="{active:Info.publish_ranking == 1 && Info.continue == 0}">查看排名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Info:{},
			}
		},
		onLoad() {
			let that = this;
			that.get_AnswerInfo();
		},
		methods: {
			get_AnswerInfo(){
				let that = this;
				that.$http.post({
					url:'/SRA_Standup2021/getAnswerInfo',
					data:{
						token:uni.getStorageSync('bid'),
						act_id:uni.getStorageSync('sid'),
						v_id:uni.getStorageSync('vid'),
						group_id:uni.getStorageSync('group_id')
					}
				}).then(res=>{
					if(res.success == true){
						that.Info = res.data;
					}else{
						uni.showToast({
							title:res.data,
							icon:'none'
						})
					}
				})
			},
			
			Now_Start_redo(){
				let that = this;
				that.$http.post({
					url:'/SRA_Standup2021/getAllowAnswers',
					data:{
						token:uni.getStorageSync('bid'),
						act_id:uni.getStorageSync('sid'),
						v_id:uni.getStorageSync('vid'),
						group_id:uni.getStorageSync('group_id')
					}
				}).then(res=>{
					if(res.success == true){
						if(res.data.allow && res.data.allow == 1){
							uni.redirectTo({
								url:'/pages/answer/answer'
							})
						}
					}else{
						uni.showModal({
							title:'提示',
							content:res.data,
							showCancel:false
						})
					}
				})
				
			},
			Now_Start(){
				let that = this;
				uni.navigateTo({
					url:'/pages/ranking/ranking'
				})
			}
		}
	}
</script>

<style lang="scss">
	.Now_box_bot{
		width:650rpx;
		margin: 80rpx auto 100rpx;
		display: flex;
		justify-content: space-between;
		.active{
			width: 554rpx;
			margin:0 auto;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
	}
	.answer {
		margin: 0 auto;
		background: rgba(0, 0, 0, 0.2);
		display: flex;	
		justify-content: center;
		padding: 10rpx 0;
		.answer_content {
			width: 653rpx;
			background: url(../../static/img/bg3.png) no-repeat;
			background-size: cover;
			.subject {
				width: 615rpx;
				background: #FFFFFF;
				margin: 80rpx auto;
				padding: 30rpx 0;
				position: relative;
				font-size: 30rpx;
				font-weight: 400;
				color: #232323;
				display: flex;
				justify-content: space-between;
				.sub_left{
					width:218rpx;
					height: 186rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-right: 1px dotted #dedede;
					.sub_name{
						font-size: 40rpx;
						font-weight: 600;
						color: #D81D1D;
					}
					.sub_ranking{
						display: flex;
						flex-wrap: wrap;
						margin-top:15rpx;
						.xin_img{
							width: 28rpx;
							height: 30rpx;
							margin-top:5rpx;
						}
						.rank_text{
							font-weight: 400;
							color: #575755;
							font-size:26rpx;
							margin-left:20rpx;
						}
					}
				}
				.sub_right{
					width:395rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.sub_name_title{
						font-size: 30rpx;
						font-weight: 400;
						color: #474747;
					}
					.sub_integral{
						font-size: 26rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #575755;
						.integral_num{
							color: #D81D1D;
						}
					}
				}
				
			}

			.subject::after {
				content: "";
				position: absolute;
				bottom: -40rpx;
				left: 0;
				width: 100%;
				height: 30px;
				display: block;
				background: linear-gradient(-45deg, transparent 33.33%, #fff 33.33%, #fff 66.666%, transparent 66.666%),
					linear-gradient(45deg, transparent 33.33%, #fff 33.33%, #fff 66.666%, transparent 66.666%);
				background-size: 20rpx 60rpx;
				transform: rotate(180deg);
			}

			.subject::before {
				content: "";
				position: absolute;
				top: -40rpx;
				left: 0;
				width: 100%;
				height: 30px;
				display: block;
				background: linear-gradient(-45deg, transparent 33.33%, #fff 33.33%, #fff 66.666%, transparent 66.666%),
					linear-gradient(45deg, transparent 33.33%, #fff 33.33%, #fff 66.666%, transparent 66.666%);
				background-size: 20rpx 60rpx;
				;
			}
			
			.pop_box{
				width:585rpx;
				height: 281rpx;
				margin:0 auto;
				background: url(../../static/img/pop2.png) no-repeat center;
				background-size: cover;
				position: relative;
				.pop_content{
					width:515rpx;
					height: 150rpx;
					margin:0 auto;
					position: absolute;
					top:50rpx;
					left:30rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.pop_txt{
						font-size: 36rpx;
						font-weight: 400;
						color: #FFFFFF;
						display: block;
					}
				}
			}
			.pop_Ren{
				width:262rpx;
				height: 312rpx;
				margin:10rpx auto;
				.pop_Ren_img{
					width:262rpx;
					height: 312rpx;
				}
			}

			
		}
	}
</style>
