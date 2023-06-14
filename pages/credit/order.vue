<template>
	<view class="credit-order">
		<view class="u-list">
			<view class="item" v-for="(item,index) in 2" :key="index">
				<view class="info">
					<view class="lft">
						<u--image v-if="index == 0" src="../../static/images/i-success.png" width="88rpx"
							height="88rpx"></u--image>
						<u--image v-if="index == 1" src="../../static/images/i-failed.png" width="88rpx" height="88rpx">
						</u--image>
						<view class="dec">
							<view class="fs3">
								已逾期
							</view>
							<text class="fs1">欠款金额 </text>
							<text class="fs1"> 最晚还款时间 </text>
							<text class="fs1">逾期天数</text>
						</view>
					</view>
					<view class="rtf">
						<text class="fs2">800.00元 </text>
						<text class="fs2"> 2023-05-01 18:23</text>
						<text class="fs2"> 8天</text>
					</view>
				</view>
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
	.u-list {
		margin: 15rpx 15rpx;

		.item {
			background: #FFFFFF;
			margin-bottom: 30rpx;
			border: 1rpx solid #4095E5;
			border-radius: 7rpx;

			.title {
				background-color: #fff;
				border-bottom: 1rpx solid #8A8A8A;
				font-size: 31rpx;
				font-family: Adobe Heiti Std;
				padding: 14rpx 34rpx;
				color: #010101;

				text {
					margin-right: 20rpx;
				}
			}

			.info {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				padding: 40rpx 30rpx;

				.lft {
					display: flex;
					align-items: center;

					.dec {
						margin-left: 30rpx;
					}

					.fs1 {
						color: #666666;
						font-size: 27rpx;
						line-height: 1.8;
					}

					.fs3 {
						font-size: 33rpx;
						font-family: Adobe Heiti Std;
						line-height: 2;
						color: #000000;
					}

					text {
						display: block;
					}
				}

				.rtf {
					font-size: 27rpx;
					font-family: Adobe Heiti Std;
					color: #666666;
					line-height: 1.5;
					text-align: right;

					text {
						display: block;
					}
				}
			}

			.bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 35rpx;

				.lft {
					display: flex;
					align-items: center;
					font-size: 33rpx;
					font-family: Adobe Heiti Std;
					color: #010101;

					.name {
						margin-left: 18rpx;
					}
				}

			}
		}

	}
</style>
