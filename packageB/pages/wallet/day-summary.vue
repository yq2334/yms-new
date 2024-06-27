<template>
	<view class="summary">
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view>
		</u-navbar>
		<view class="common-content">
			<view class="summary-content">
				<view class="summary-data">
					<view class="top flex align-center justify-between" @click="show = true">
						<view class="title">
							日汇总
						</view>
						<u-icon name="arrow-down" color="rgba(0,0,0,0.5)"></u-icon>

					</view>
					<view class="datas flex align-center justify-between">
						<view class="item">
							<h3>10月直营交易</h3>
							<h1>313223423.64</h1>
						</view>
						<view class="item">
							<h3>10月直营激活（台）</h3>
							<h1>258</h1>
						</view>
					</view>
				</view>
				<view class="summary-list">
					<view class="item" v-for="(item,index) in 10" :key="index">
						<view class="flex justify-between align-center">
							<view class="basis-df">
								11-01
							</view>

							<view class="basis-df flex align-center">
								<text>钱宝押金版</text>
								<u--image :showLoading="true" src="../../static/images/wallet/arrow-double.png" width="26rpx"
									height="21rpx" mode="aspectFit"></u--image>

							</view>
						</view>
						<view class="split">

						</view>
						<view class="flex justify-between align-center">
							<view class="basis-df">
								<text>激活:</text>
								<text class="fs">5台</text>
							</view>
							<view class="basis-df">
								<text>交易:</text>
								<text class="fs">538923845台</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="cancel" :closeOnClickOverlay="true"
			@close="cancel" confirmColor="#f37b1d"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['日汇总', '月汇总', '周汇总']
				],
			}
		},
		methods: {
			confirm(e) {
				console.log('confirm', e)
				this.show = false
			},
			cancel() {
				this.show = false
			}
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.summary {
		&-content {
			padding: 27rpx;

			.summary-data {
				background: url(../../static/images/wallet/bg-box.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 37rpx;

				.top {
					padding: 38rpx 0 30rpx 0;
					border-bottom: 1rpx solid rgba(43, 43, 43, 0.2);

					.title {
						font-size: 28rpx;
						color: #2B2B2B;
						position: relative;
						padding-left: 38rpx;

						&:before {
							content: '';
							position: absolute;
							width: 6rpx;
							height: 20rpx;
							background: linear-gradient(125deg, #FF9647, #FECC52);
							border-radius: 3rpx;
							top: 50%;
							transform: translateY(-50%);
							left: 16rpx;

						}
					}

				}

				.datas {
					line-height: 1;
					padding-top: 22rpx;
					padding-bottom: 38rpx;

					h3 {
						font-size: 30rpx;
						color: rgba(43, 43, 43, 0.6);
						margin-bottom: 26rpx;
					}

					h1 {
						font-size: 38rpx;
						color: #2B2B2B;
						font-family: 'AlimamaFangYuanTiVF';
					}
				}
			}

			.summary-list {
				margin-top: 25rpx;

				.item {
					padding: 28rpx 30rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 4rpx 15rpx 0rpx rgba(75, 75, 75, 0.35);
					border-radius: 16rpx;
					font-size: 32rpx;
					color: #656565;
					line-height: 1;
					margin-bottom: 18rpx;

					.split {
						height: 1rpx;
						background: #6F6F6F;
						opacity: 0.2;
						margin: 28rpx 0;
					}

					.fs {
						color: rgba(28, 28, 28, 1);
					}
				}
			}
		}
	}
</style>