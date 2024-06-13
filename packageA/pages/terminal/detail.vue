<template>
	<view class="terminal">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="show=true" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view>
		</u-navbar>
		<common-view>
			<view class="terminal-content">
				<view class="data-pannel flex flex-wrap align-center justify-between">
					<view class="item flex flex-direction justify-center ">
						<h3 class="padding-left-lg">伪激活即将扣款</h3>
						<h1 class="padding-left-lg">356</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
					<view class="item flex flex-direction justify-center ">
						<h3 class="padding-left-lg">已开通无交易</h3>
						<h1 class="padding-left-lg">356</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
					<view class="item flex flex-direction justify-center ">
						<h3 class="padding-left-lg">未激活即将到期</h3>
						<h1 class="padding-left-lg">356</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
					<view class="item flex flex-direction justify-center ">
						<h3 class="padding-left-lg">近30天无交易</h3>
						<h1 class="padding-left-lg">356</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
				</view>
				<view class="check-pannel">
					<view class="item flex align-center justify-between">
						<view class="left flex align-center">
							<view class="img-wrapper">
								<u--image class="img" :showLoading="true" src="/static/images/store.png" width="58rpx"
									height="53rpx" mode="aspectFit"></u--image>
							</view>

							<view class="">
								<h1 class="padding-left-lg">356</h1>
								<h3 class="padding-left-lg">近30天开通商户</h3>
							</view>
						</view>
						<view class="right">
							<view class="btn-check" @click="$tab.navigateTo('/packageA/pages/terminal/detail')">
								点击查看
							</view>
						</view>
					</view>
					<view class="item flex align-center justify-between">
						<view class="left flex align-center">
							<view class="img-wrapper">
								<u--image class="img" :showLoading="true" src="/static/images/order.png" width="48rpx"
									height="52rpx" mode="aspectFit"></u--image>
							</view>

							<view class="">
								<h1 class="padding-left-lg">356</h1>
								<h3 class="padding-left-lg">到期伪激活</h3>
							</view>
						</view>
						<view class="right">
							<view class="btn-check">
								点击查看
							</view>
						</view>
					</view>
					<view class="item flex align-center justify-between">
						<view class="left flex align-center">
							<view class="img-wrapper">
								<u--image class="img" :showLoading="true" src="/static/images/daoqi.png" width="44rpx"
									height="54rpx" mode="aspectFit"></u--image>
							</view>
							<view class="">
								<h1 class="padding-left-lg">356</h1>
								<h3 class="padding-left-lg">到期未激活</h3>
							</view>
						</view>
						<view class="right">
							<view class="btn-check">
								点击查看
							</view>
						</view>
					</view>
				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightX: 0,
			};
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F6F5F8;
	}

	.terminal {
		&-content {
			padding: 40rpx 22rpx;

			.data-pannel {
				.item {
					width: 48%;
					height: 144rpx;
					background: #FFFFFF;
					border-radius: 15rpx;
					position: relative;
					margin-bottom: 26rpx;

					h3 {

						font-size: 30rpx;
						color: #2C2C2C;
						opacity: 0.8;
						margin-bottom: 10rpx;
					}

					h1 {
						font-size: 38rpx;
						color: #000000;
						font-family: 'AlimamaFangYuanTiVF';
					}

					.arrow {
						position: absolute;
						bottom: 23rpx;
						right: 32rpx;
					}
				}
			}

			.check-pannel {
				.item {
					height: 134rpx;
					background: #FFFFFF;
					border-radius: 18rpx;
					padding: 0 40rpx;
					margin-bottom: 24rpx;

					.img-wrapper {
						width: 58rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					h3 {

						font-size: 30rpx;
						color: #2C2C2C;
						opacity: 0.8;
						margin-bottom: 10rpx;
					}

					h1 {
						font-size: 42rpx;
						color: #000000;
						font-family: 'AlimamaFangYuanTiVF';
					}

					.btn-check {
						width: 176rpx;
						height: 49rpx;
						border: 2px solid #FF6E62;
						border-radius: 24rpx;
						text-align: center;
						line-height: 45rpx;
						color: #FF6E62;
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>