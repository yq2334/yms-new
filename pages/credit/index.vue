<template>
	<view class="credit">
		<view class="credit-top">
			<view class="item">
				<view class="lt">
					<text class="icon icon-yh"></text>
					<text>现在授信的银行：</text>
					<text class="fs">建设银行</text>
				</view>
				<view class="rt">
					<u-button type="primary" size="mini" text="切换"></u-button>

				</view>
			</view>
			<u-line color="#5C5C5C" margin="10rpx"></u-line>
			<view class="item">
				<view class="lt">
					<text class="icon icon-sxzt"></text>
					<text>授信状态：</text>
					<text class="fs">待去医院自助机激活</text>
				</view>
				<view class="rt">
					<u-button type="primary" size="mini" text="教程"></u-button>
				</view>
			</view>
		</view>
		<view class="credit-warpper">
			<view class="title">
				我的信用额度
			</view>
			<view class="content">
				<view class="content-box">
					<view class="tit">
						门诊先诊后付
					</view>
					<view class="dec">
						<view class="lt">
							总额度：
							<text class="fs">2000.00</text>
							（元）
						</view>
						<view class="rt">
							可用额度：
							<text class="fs">2000.00</text>（元）
						</view>
					</view>
				</view>
				<view class="content-box">
					<view class="tit">
						急诊先诊后付
					</view>
					<view class="dec">
						<view class="lt">
							总额度：
							<text class="fs">2000.00</text>
							（元）
						</view>
						<view class="rt">
							可用额度：
							<text class="fs">2000.00</text>（元）
						</view>
					</view>
				</view>
				<view class="content-box">
					<view class="tit">
						住院免押金
					</view>
					<view class="dec">
						<view class="lt">
							总额度：
							<text class="fs">2000.00</text>
							（元）
						</view>
						<view class="rt">
							可用额度：
							<text class="fs">2000.00</text>（元）
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="credit-warpper">
			<view class="title">
				信用就医记录
			</view>
			<view class="content">
				<view class="fx pd">
					<view class="fs">
						守约记录：0
					</view>
					<view class="fs">
						逾期记录：0
					</view>
					<view class="fs">
						待支付订单：0
					</view>
				</view>
			</view>
		</view>
		<view class="credit-warpper">
			<view class="title">
				信用服务
			</view>
			<view class="content">
				<view class="fx pd">
					<view class="fs center">
						<u--image :src="'../../static/images/mzgh.png'" width="80rpx" height="80rpx"></u--image>
						门诊挂号
					</view>
					<view class="fs center">
						<u--image :src="'../../static/images/mzjf.png'" width="80rpx" height="80rpx"></u--image>
						门诊缴费
					</view>
					<view class="fs center">
						<u--image :src="'../../static/images/zy.png'" width="80rpx" height="80rpx"></u--image>
						住院免押金
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
	.credit {
		&-top {
			background: #FFFFFF;
			border: 1px solid #315ACE;
			border-radius: 7rpx;
			padding: 18rpx 30rpx;
			margin: 20rpx;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.lt {
					display: flex;
					align-items: center;
					font-size: 33rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #090909;

					.icon {
						margin-right: 26rpx;
					}
				}

				.icon-yh {
					background: url(@/static/images/yh.png) no-repeat;
					background-size: 100% 100%;
					display: block;
					width: 43rpx;
					height: 50rpx;
				}

				.icon-sxzt {
					background: url(@/static/images/sxzt.png) no-repeat;
					background-size: 100% 100%;
					display: block;
					width: 45rpx;
					height: 40rpx;
				}

				.fs {
					color: #2472DD;
				}
			}
		}

		&-warpper {
			background: #FFFFFF;
			border: 1px solid #315ACE;
			border-radius: 7rpx;
			margin: 40rpx 20rpx 0 20rpx;

			.title {
				background-color: #4095E5;
				padding: 15rpx 22rpx;
				color: #FFFEFE;
			}

			.content {
				&-box {
					padding: 22rpx 25rpx;

					.tit {
						color: #000000;
					}

					.dec {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 20rpx;
						line-height: 1.5;
						color: #000000;

					}

				}

				.fs {
					color: #4095E5;
				}

				.fx {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.pd {
					padding: 27rpx;
				}

				.center {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 33.33%;
				}
			}
		}
	}
</style>
