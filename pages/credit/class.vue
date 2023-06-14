<template>
	<view class="credit-class">
		<view class="pannel">
			<u-parse :content="content"></u-parse>
		</view>
		<view class="btn-box">
			<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB" text="返回">
			</u-button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '<p>xxxxxxx</p>'
			}
		},
		methods: {
			navTo(route) {
				if (!route) return;

				uni.navigateTo({
					url: route
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.credit-class {

		.pannel {
			background: #FFFFFF;
			border: 1px solid #315ACE;
			border-radius: 7rpx;
			margin: 30rpx;
			padding: 30rpx;
			height: 70vh;
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
		padding: 0 50rpx;
		margin-top: 110rpx;
	}
</style>
