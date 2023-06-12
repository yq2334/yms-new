<template>
	<view class="">
		<view class="auth">
			<view class=" title">
				注销后，您将永久放弃以下权益：
			</view>

			<view class="fs">
				<u-parse :content="content"></u-parse>
			</view>

		</view>
		<view class="checkbox">
			<u-checkbox v-model="checked" activeColor="#1296DB" labelSize="10" labelColor="#000" shape="circle"
				label="已阅读并同意以上条款"></u-checkbox>

		</view>
		<view class="btn-box">
			<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB" text="我已了解风险，继续">
			</u-button>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
				content: '<p style="margin-bottom: 20px"> 1.您的身份信息、账户信息等权益将被清空且无法恢复 </p><p style="margin-bottom: 20px">  2.xxxxxxxxxxx </p><p style="margin-bottom: 20px">  3.xxxxx</p>'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.auth {
		background: #FFFFFF;
		border: 1px solid #315ACE;
		border-radius: 7rpx;
		margin: 30rpx;
		padding: 30rpx;
		height: 70vh;
		.title {
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #000000;
			margin-bottom: 40rpx;
		}

		&-content {
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #000000;
			padding: 5rpx 30rpx;
			height: 60vh;
		}

		.fs {
			color: #388CEB;
			font-size: 26.67rpx;
		}

	}

	.checkbox {
		padding: 0rpx 30rpx;
	}

	.btn-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 30rpx;
	}

	/deep/ .u-button {
		width: 600.67rpx;
		height: 91.33rpx;
	}
</style>
