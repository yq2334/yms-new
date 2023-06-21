<template>
  <view class="help-container">
	<view class="title">
		遇到问题了吗？
	</view>
	<view class="cont">
		可以长按下方二维码，加客服微信寻求帮助。
	</view>
	<view class="cont">
		客服在线时间：工作日9：00-18：00。
	</view>
	<view class="qrcode">
		<view class="top">
			<u--image  src="" width="100upx" height="100upx" mode="widthFix"
				shape="circle">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
			<text>客服微信</text>
		</view>
		<view class="qr-img">
			<u--image  src="" width="100upx" height="100upx" mode="widthFix"
				shape="circle">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>
		<view class="tips">
			扫一扫上方的二维码 加我微信
		</view>
	</view>
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

<style lang="scss" scoped>
  page {
    background-color: #f5f5f5;
  }

  .help-container {
    margin-bottom: 100rpx;
    padding: 30rpx;
	.title{
		font-size: 30rpx;
		color: #000;
	}
	.cont{
		font-size: 30rpx;
		color: #333;
		margin-top: 20rpx;
	}
	.qrcode{
		width: 85%;
		background-color: #fff;
		margin: 100rpx auto ;
		padding: 40rpx;
		border-radius: 12rpx;
		.top{
			display: flex;
			align-items: center;
			font-size: 30rpx;
			text{
				margin-left: 10rpx;
			}
		}
		.qr-img{
			height: 500rpx;
			margin: 30rpx auto;
		}
		.tips{
			color: #666;
			font-size: 26rpx;
			text-align: center;
		}
	}
  }

  
</style>
