<template>
	<view class="">
		<view class="auth">
			<view class="auth-user">
				<text>授权人：</text>
				<text class="fs">ｘxx </text>
			</view>
			<view class="auth-user">
				<text>被授权人：</text>
				<text class="fs">ｘxx </text>
			</view>
			<view class="auth-content">
				<text>授权内容：</text>
				<text class="fs">ｘxx </text>
			</view>
		</view>
		<view class="checkbox">
			<u-checkbox v-model="checked" activeColor="#1296DB"  labelSize="10"  labelColor="#000"  shape="circle" label="已阅读并同意以上条款"></u-checkbox>
			
		</view>
		<view class="btn-box">
			<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB"  text="拒签">
			</u-button>
			<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB" text="同意签署">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true
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
	&-user{
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #000000;
		padding: 5rpx 30rpx;
		border-bottom: 1rpx solid #315ACE;
		
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
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 30rpx;
}
/deep/ .u-button{
	width: 300.67rpx;
	height: 91.33rpx;
}
</style>
