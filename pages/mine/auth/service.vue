<template>
	<view class="">
		<view class="auth">
			<view class="fs title">
				服务介绍 
			</view>
			<view class="fs" >
				<u-parse :content="content"></u-parse>
			</view>
			<view class="btn-box">
				<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB"  text="开启服务">
				</u-button>
				<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB" text="关闭服务">
				</u-button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
				content: 'xxxxxxxxx'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
.auth{
	background: #FFFFFF;
	border: 1px solid #315ACE;
	border-radius: 7rpx;
	margin: 30rpx;
	padding: 30rpx;
	.title{
		text-align: center;
		
	}
	&-content{
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #000000;
		padding: 5rpx 30rpx;
		height: 60vh;
	}
	.fs{
		color: #388CEB;
	}
	
}
.checkbox{
	padding: 0rpx 30rpx;
}
.btn-box{
	margin-top: 500rpx;
}
/deep/ .u-button{
	width: 600.67rpx;
	height: 91.33rpx;
	margin-bottom: 60rpx;
}
</style>
