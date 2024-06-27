<template>
	<view class="terminal">
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">

		</u-navbar>
		<view>
			<view class="terminal-content">
				<view class="data-pannel flex flex-wrap align-center justify-between">
					<view class="item flex flex-direction justify-center "
						@click="$tab.navigateTo('/packageA/pages/control/list?name=weijihuo_waitingpay')">
						<h3 class="padding-left-lg">伪激活即将扣款</h3>
						<h1 class="padding-left-lg">{{initData.yujing1}}</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
					<view class="item flex flex-direction justify-center "
						@click="$tab.navigateTo('/packageA/pages/control/list?name=chenmo')">
						<h3 class="padding-left-lg">已开通无交易</h3>
						<h1 class="padding-left-lg">{{initData.yujing2}}</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
					<view class="item flex flex-direction justify-center "
						@click="$tab.navigateTo('/packageA/pages/control/list?name=weijihuo_overtime')">
						<h3 class="padding-left-lg">未激活即将到期</h3>
						<h1 class="padding-left-lg">{{initData.yujing3}}</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
					<view class="item flex flex-direction justify-center "
						@click="$tab.navigateTo('/packageA/pages/control/list?name=chenmo30')">
						<h3 class="padding-left-lg">近30天无交易</h3>
						<h1 class="padding-left-lg">{{initData.yujing4}}</h1>
						<u--image class="arrow" :showLoading="true" src="/static/images/arrrow-1.png" width="35rpx"
							height="35rpx" mode="aspectFit"></u--image>
					</view>
				</view>
				<view class="check-pannel">
					<view class="item flex align-center justify-between"
						@click="$tab.navigateTo('/packageA/pages/control/list?name=xinzeng')">
						<view class="left flex align-center">
							<view class="img-wrapper">
								<u--image class="img" :showLoading="true" src="/static/images/store.png" width="58rpx"
									height="53rpx" mode="aspectFit"></u--image>
							</view>

							<view class="">
								<h1 class="padding-left-lg">{{initData.yujing5}}</h1>
								<h3 class="padding-left-lg">近30天开通商户</h3>
							</view>
						</view>
						<view class="right">
							<view class="btn-check">
								点击查看
							</view>
						</view>
					</view>
					<view class="item flex align-center justify-between"
						@click="$tab.navigateTo('/packageA/pages/control/list?name=weijihuo_wei_daoqi')">
						<view class="left flex align-center">
							<view class="img-wrapper">
								<u--image class="img" :showLoading="true" src="/static/images/order.png" width="48rpx"
									height="52rpx" mode="aspectFit"></u--image>
							</view>

							<view class="">
								<h1 class="padding-left-lg">{{initData.yujing6}}</h1>
								<h3 class="padding-left-lg">到期伪激活</h3>
							</view>
						</view>
						<view class="right">
							<view class="btn-check">
								点击查看
							</view>
						</view>
					</view>
					<view class="item flex align-center justify-between"
						@click="$tab.navigateTo('/packageA/pages/control/list?name=weijihuo_daoqi')">
						<view class="left flex align-center">
							<view class="img-wrapper">
								<u--image class="img" :showLoading="true" src="/static/images/daoqi.png" width="44rpx"
									height="54rpx" mode="aspectFit"></u--image>
							</view>
							<view class="">
								<h1 class="padding-left-lg">{{initData.yujing7}}</h1>
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
		</view>
	
	</view>
</template>

<script>
	import {
		getMyFengkong
	} from '@/api/system/user.js'

	export default {
		data() {
			return {
				initData: {},
			};
		},
		onLoad() {
			this.getInitData()
		},
		methods: {
			getInitData() {
				getMyFengkong().then((res) => {
					this.initData = res
				})
			},

		},
	}
</script>
<style lang="scss">
	page {
		background-color: #F6F5F8;
	}
</style>
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

					/deep/ .u-image {
						position: absolute !important;
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