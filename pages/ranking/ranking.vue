<template>
	<view class="content">
		<view class="answer answer_width">
			<view class="answer_content">
				<view class="subject">
					<view class="sub_left">
						 <text class="sub_name">积分排名</text>
						<!-- <view class="sub_rank">您击败了<text class="bai_sub">75%</text>的对手</view> -->
						 <view class="TOPnum">TOP10</view>
					</view>
					<view class="sub_right" v-if="myranking">
						<text class="sub_name_title">“{{myranking.userInfo.v_nickname?myranking.userInfo.v_nickname:''}}”</text>
						<view class="sub_integral">	您当前的积分：<text class="integral_num">{{myranking.score?myranking.score:''}}分 </text></view>
						<view class="rankeines">排名: <text class="Rownumber">{{myranking.rankNum}}</text></view>
					</view>
				</view>
				
				
				
				<view class="num_now" v-if="list.length">
					<block  v-for="(item,index) in list" :key="index">
						<view class="num_list" :class="{active:item.rankNum == myrankNum}">
							<view class="num_inet">{{item.rankNum}}</view>
							<view class="class_inet_name">{{item.userInfo.v_nickname?item.userInfo.v_nickname:''}}</view>
							<view class="frac_num">
								<image src="../../static/img/bi2.png" mode="widthFix" class="frac_img" lazy-load></image>
								<text class="farc_intent">{{item.score?item.score:''}}分</text>
							</view>
						</view>
					</block>
				
					
				</view>
			</view>
		</view>

		<view class="Now_Start" @click="Myranking">我的排名</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myranking:{},
				list:[],
				myrankNum:'',
			}
		},
		onLoad() {
			let that = this;
			that.get_Ranking();
		},
		methods: {
			get_Ranking(){
			  let that = this;
			  that.$http.post({
				  url:'/SRA_Standup2021/getRanking',
				  data:{
					 token:uni.getStorageSync('bid'), 
					 act_id:uni.getStorageSync('sid'),
					 v_id:uni.getStorageSync('vid'), 
				  }
			  }).then(res=>{
				  if(res.success == true){
					  that.myranking = res.data.MY;
					  that.list = res.data.list;
					  that.myrankNum = that.myranking.rankNum
					 
				  }else{
					  uni.showToast({
					  	title:res.data,
						icon:'none'
					  })
				  }
			  })
			},
			
		  //  查看我的排名
		  Myranking(){
			 let that = this;
			 that.$http.post({
				 url:'/SRA_Standup2021/getRanking',
				 data:{
					 token:uni.getStorageSync('bid'), 
					 act_id:uni.getStorageSync('sid'),
					 v_id:uni.getStorageSync('vid'), 
					 show_my_list:1
				 }
			 }).then(res=>{
				 if(res.success == true){
					 that.myranking = res.data.MY;
					 that.list = res.data.list;
					 that.myrankNum = that.myranking.rankNum
				 }else{
					 uni.showToast({
					 	title:res.data,
						icon:'none'
					 })
				 }
			 })
			
			
		  },
		}
	}
</script>

<style lang="scss">
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
			background: url(../../static/img/bg4.png) no-repeat;
			background-size: cover;
			padding-bottom: 100rpx;
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
					.sub_rank{
						font-size: 20rpx;
						font-weight: 400;
						color: #474747;
						.bai_sub{
							color:#E32626;
						}
					}
					.TOPnum{
						padding: 0 15rpx;
						background: #E32626;
						border-radius: 10rpx;
						color:#FFFFFF;
						margin-top:15rpx;
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
					.rankeines{
						font-size: 28rpx;
						font-weight: 400;
						color: #474747;
						.Rownumber{
							color:#E32626;
							font-weight: bold;
							margin-left:10rpx;
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
			
			.num_now{
				width: 595rpx;
				margin:0 auto;
				.num_list{
					width:100%;
					height: 78rpx;
					background: #FFFFFF;
					margin-bottom: 38rpx;
					display: flex;
					overflow: hidden;
					.num_inet{
						width:86rpx;
						height: 100%;
						background: #E32626;
						color:#FFFFFF;
						font-size: 36rpx;
						font-weight: 400;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.class_inet_name{
						width:345rpx;
						padding:0 10rpx;
						line-height: 78rpx;
						color: #454545;
						font-size:30rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.frac_num{
						display: flex;
						align-items: center;
						justify-content: center;
						.frac_img{
							width:39rpx;
							height: 39rpx;
						}
						.farc_intent{
							font-size: 26rpx;
							font-weight: 400;
							color: #454545;
							margin-left:15rpx;
						}
					}
				}
				.active{
					background: #E32626;
					color:#FFFFFF;
					.num_inet{
						background: #FFFFFF;
						color:#E32626;
					}
					.class_inet_name{
						color:#FFFFFF;
					}
					.frac_num{
						.farc_intent{
							color:#FFFFFF;
						}
					}
				}
			}
			

			
		}
	}
</style>
