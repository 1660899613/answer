<template>
	<view class="content">
		<view class="answer answer_width">
			<view class="answer_content">
				<view class="subject" v-if="letterData">
					<view>
						<text class="subject_select color" v-if="letterData.answer_number > 1">多选题</text>
						<text class="subject_select color" v-else>单选题</text>
						<text class="color">总题数: {{letterData.allNum}}</text>
					</view>
					<view class="subject_box">{{letterData.ID}}. {{letterData.item_title}}</view>
				 </view>
				<view class="option_box">
					<block v-for="(item,index) in SelectList" :key='index' >
						
						<!-- 多选 -->
						<view class="option_list" v-if="letterData.answer_number > 1"  @click="choice_check(item.data_id,index)" :class="{active:data_index.indexOf(index) != -1 }">{{item.name}} . {{item.data_title}}</view>
						
						<!-- 单选 -->
						<view class="option_list" v-else :class="{active:opt_index == index}" @click="choice(item.data_id,index)">{{item.name}} . {{item.data_title}}</view>
					</block>
				</view>
			</view>
		</view>
		
		<view class="Now_Start" v-if="SelectList.length"  @click="submit_btn">提交答案</view>
		
		<!-- <view class="time bgColor display-flex display-j-center display-a-center" v-if="time != ''">{{time}}s</view> -->
		<view class="time bgColor display-flex display-j-center display-a-center">{{time}}s</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				opt_index: '100',
				sid: '',
				letterData:'',
				SelectList:[],
				time:0,
				data_id:[],
				data_index:[],
				dtime:null,
			}
		},
		onLoad(e) {
			let that = this;
			if (e.sid) {
				that.sid = e.sid
				uni.setStorage({
					key: 'sid',
					data: e.sid
				})
			}
			if (e.gid) {
				that.gid = e.gid;
				uni.setStorage({
					key: 'gid',
					data: e.gid
				})
			}
			that.getTopic();
		},
		onShow() {
			let that = this;
		},
		// onHide() {
		// 	let that = this;
		// 	clearInterval(that.dtime);
		// 	that.dtime = null;
		// 	that.time = 0;
		// 	console.log('onHide');
		// },
		onUnload(){
			let that = this;
			clearInterval(that.dtime);
			that.dtime = null;
			that.time = 0;
		},
		methods: {
			getTopic(){
				let that = this;
				that.$http.post({
					url: '/SRA_Standup2021/question',
					data:{
						token: uni.getStorageSync('bid'),
						act_id: uni.getStorageSync('sid'),
						v_id: uni.getStorageSync('vid'),
						gid: uni.getStorageSync('gid')
					}
				}).then(res=>{
					if(res.success == true){
						that.letterData = res.data;
						that.time = res.data.item_time;
						that.SelectList = res.data.data;
						that.dtime = setInterval(()=>{
							if(that.time > 0){
								that.time --;
							}else{
								clearInterval(that.dtime);
								that.dtime = null;
								that.time = 0;
								// that.data_id.push(-1);
								// that.submit_btn();
							}
						},1000)

						for(let i= 0;i<that.SelectList.length;i++){
							that.$set(that.SelectList[i],'name',String.fromCharCode(65+i))
						}
					}else{
						uni.setStorage({
							key:'group_id',
							data:res.group_id
						})
						uni.showModal({
							title:'提示',
							content:res.data,
							showCancel:false,
							success() {
								uni.redirectTo({
									url: '/pages/end/end'
								})
							}
						})
					}
				})
			},
			
			
		  submit_btn(){
			let that = this;  
			if(that.data_id == ''){
				uni.showToast({
					title:'请选择答案！',
					icon:'none'
				})
				return;
			} 
			clearInterval(that.dtime);
			that.dtime = null;
			that.$http.post({
				url:'/SRA_Standup2021/Answer',
				data:{
					token:uni.getStorageSync('bid'),
					act_id: uni.getStorageSync('sid'),
					v_id: uni.getStorageSync('vid'),
					udid:that.letterData.udid,
					data_id:that.data_id.toString()
				}
			}).then(res=>{
				that.data_index = [];
				that.data_id = [];
				that.opt_index = 100;
				let return_correct = uni.getStorageSync('return_correct');
				if(res.success == 100001){    // 已做过题 直接跳过到结果页面
					uni.setStorage({
						key:'group_id',
						data:res.group_id
					})
					uni.showModal({
						title:'提示',
						content:res.data,
						showCancel:false,
						success() {
							uni.redirectTo({
								url: '/pages/end/end'
							})
						}
					})
					return;
				}
				if(return_correct == 1){   // 显示答案
					if(that.time == 0){
						uni.showModal({
							title:res.title?res.title:'提示',
							content:res.data,
							showCancel:false,
							success() {
								 that.getTopic();
							}
						})
					}else{
						uni.showModal({
							title:res.title?res.title:'提示',
							content:res.data,
							showCancel:false,
							success() {
								 that.getTopic();
							}
						})
					}
				}else{    // 不显示答案
					if(that.time == 0){
						uni.showModal({
							title:'提示',
							content:res.data,
							showCancel:false,
							success() {
								 that.getTopic();
							}
						})
					}else{
						that.getTopic();
					}
				}
			})
		  },
		
		// 单选
		choice(data_id,index){  
			let that = this;
			let dataid = [];
			that.data_id = [];
			that.opt_index = index;
			dataid.push(data_id);
			that.data_id = dataid;
		},
		
		// 双选
		choice_check(data_id,index){  
			let that = this;
			if(that.data_index.indexOf(index) == -1){
				that.data_index.push(index);
				that.data_id.push(data_id);
			}else{
				that.data_index.splice(that.data_index.indexOf(index),1)
				that.data_id.splice(that.data_id.indexOf(index),1)
			}
		},
		
			
		}
	}
</script>

<style lang="scss">
	.time{
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		top: 30rpx;
		right: 30rpx;
		color: #FFFFFF;
		border-radius: 50%;
		font-size: 34rpx;
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
			padding-bottom: 150rpx;

			.subject {
				width: 615rpx;
				background: #FFFFFF;
				margin: 80rpx auto;
				position: relative;
				font-size: 30rpx;
				font-weight: 400;
				color: #232323;
				line-height: 60rpx;
				.subject_box{
					padding:30rpx 35rpx;
				}
				.subject_select{
					padding-left:35rpx;
					padding-right: 50rpx;
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

			.option_box {
				width: 615rpx;
				margin: 0 auto;

				.option_list {
					width: 595rpx;
					background: #FFFFFF;
					line-height: 78rpx;
					padding: 0 37rpx;
					font-weight: 400;
					color: #454545;
					font-size: 32rpx;
					margin: 0 auto 40rpx;
				}

				.active {
					background: #A61010;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
