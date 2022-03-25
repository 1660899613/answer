<template>
	<view class="content">
		<view class="answer answer_width">
			<view class="answer_content">
				<view class="subject">
					<view class="sub_left">
						 <text class="sub_name">积分排名</text>
						 <view class="sub_rank">您击败了<text class="bai_sub">75%</text>的对手</view>
						 <view class="TOPnum">TOP10</view>
					</view>
					<view class="sub_right">
						<text class="sub_name_title">“骑着蜗牛去赛跑”</text>
						<view class="sub_integral">	您当前的积分：<text class="integral_num">30分 </text></view>
						<view class="rankeines">排名: <text class="Rownumber">1</text></view>
					</view>
				</view>
				
				
				<view class="subject_over">
					 <view class="over_box">恭喜你，成功完成答题！</view>
					 <view class="over_list_box">
						 <view class="overEnt">
							 <text>总题数</text>
							 <text>20</text>
						 </view>
						 <view class="overEnt">
							 <text>正确</text>
							 <text>15</text>
						 </view>
						 <view class="overEnt">
							 <text>错误</text>
							 <text>5</text>
						 </view>
					 </view>
				</view>
				
				
			</view>
		</view>

		<view class="Now_Start" @click="Now_Start">我的排名</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
			background: url(../../static/img/bg3.png) no-repeat;
			background-size: cover;
			padding-bottom: 80rpx;
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
			
		 
			.subject_over{
				width: 615rpx;
				background: #FFFFFF;
				margin: 150rpx auto;
				position: relative;
				font-size: 30rpx;
				font-weight: 400;
				color: #232323;
				display: flex;
				flex-direction: column;
				.over_box{
					width:100%;
					font-size: 40rpx;
					font-weight: 400;
					color: #E32626;
					// line-height: 100rpx;
					border-bottom: 1px dotted #DCDCDC;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.over_list_box{
					padding:30rpx;
					.overEnt{
						width:100%;
						display: flex;
						justify-content: space-between;
						font-size: 30rpx;
						font-weight: 400;
						color: #464646;
						margin-bottom: 20rpx;
					}
				}
			}
			.subject_over::after {
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
			
			.subject_over::before {
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

			
		}
	}
</style>
