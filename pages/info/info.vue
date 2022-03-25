<template>
	<view class="content">
		<view class="info">
			<view class="info_top">信息填写</view>
			<view class="info_box">
				<view class="info_list">
					<text class="info_text">姓名:</text>
					<input type="text"  v-model="name" class="info_content"/>
				</view>
				<view class="info_list">
					<text class="info_text">电话:</text>
					<input type="text"  v-model="phone" class="info_content"/>
				</view>
			</view>
		</view>
		
		<view class="Now_Start" @click="Now_Start">马上开始</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				phone:''
			}
		},
		methods: {
			Now_Start(){
				let that = this;
				let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/; // 手机号正则检验
				uni.navigateTo({
					url:'/pages/answer/answer'
				})
				// if(that.name == ''){
				// 	uni.showToast({
				// 		title:'姓名不能为空!',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				// if(that.phone == ''){
				// 	uni.showToast({
				// 		title:'电话不能为空!',
				// 		icon:'none'
				// 	})
				// 	return
				// }
			}
		}
	}
</script>

<style lang="scss">
 .content{
	 display: flex;
	flex-direction: column;
	 .info{
		 width:660rpx;
		 padding-bottom:200rpx;
		 background: rgba(255,255,250,0.5);
		 margin:40rpx auto 0;
		 .info_top{
			 width:100%;
			 height: 105rpx;
			 border-bottom: 1px dotted #FFFFFF;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 color:#FFFFFF;
			 font-weight: 500;
			 font-size:38rpx;
		 }
		 .info_box{
			 width:600rpx;
			 margin:0 auto;
			 .info_list{
				 margin-top:60rpx;
				 .info_text{
					 color:#FFFFFF;
					 font-size:32rpx;
				 }
				 .info_content{
					 padding:10rpx;
					 height: 80rpx;
					 background: #FFFFFF;
					 margin-top:20rpx;
				 }
			 }
		 }
	 }
 }
 
</style>
