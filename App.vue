<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '/common/uni.css';
	@import '/common/animate.min.css';
	@import '/common/icon.css';
	@import '/common/main.css';
	page{
		height: 100%;
		background: #e32626;
		font-size:28rpx;
		line-height: 1.8;
	}
	text,view,input,textarea,*{
		box-sizing: border-box;
		font-family: Microsoft YaHei;
	}
	.bgColor{
		background: #e32626;
	}
	.bg-btn{
		background: #FFBE01;
	}
	.color{
		color:#e32626;
	}
	.Now_Start{
		margin:80rpx auto 100rpx;
		width: 554rpx;
		height: 93rpx;
		line-height: 93rpx;
		font-size: 36rpx;
		text-align: center;
		font-weight: 400;
		color: #FFFFFF;
		background: linear-gradient(0deg, #FF6E02, #FFBE01);
		box-shadow: 0px 5px 0px 0px rgba(128, 16, 16, 0.75);
		border-radius: 11rpx;
	}
	.Now_Start_plus{
		width: 300rpx;
		height: 93rpx;
		line-height: 93rpx;
		font-size: 36rpx;
		text-align: center;
		font-weight: 400;
		color: #FFFFFF;
		background: linear-gradient(0deg, #FF6E02, #FFBE01);
		box-shadow: 0px 5px 0px 0px rgba(128, 16, 16, 0.75);
		border-radius: 11rpx;
	}
	.answer_width{
		// width:660rpx;
		width:676rpx;
	}
</style>
