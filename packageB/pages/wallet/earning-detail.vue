<template>
	<view class="earning">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<!-- <view class="search flex align-center" slot="right">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view> -->
		</u-navbar>
		<common-view>
			<view class="earning-content padding-lr padding-tb-sm">
				<!-- <view class="pannel ">
				<view class="title">
					本月收益
				</view>
				<view class="fs1">
					33568163.73
				</view>
				<view class="split">

				</view>
				<view class="flex align-center">
					<view class="margin-right-lg">
						<text class="fs2 margin-right-xs">今日收益</text> <text class="fs3">+317056.36</text>
					</view>
					<view class="">
						<text class="fs2 margin-right-xs">昨日收益</text> <text class="fs3">+317056.36</text>
					</view>
				</view>
			</view> -->
				<view class="list-menu">
					<u-cell-group :border="false">
						<u-cell icon="../../static/images/wallet/zysy.png" title="直营收益" :isLink="true" @click="$tab.navigateTo('/packageA/pages/income/detail?type='+type + '&name=zy')" 
							:value="`+${initdata.m1}`"></u-cell>
						<u-cell icon="../../static/images/wallet/xjgx.png" title="下级贡献" :isLink="true" @click="$tab.navigateTo('/packageA/pages/income/detail?type='+type+ '&name=xj')" 
							:value="`+${initdata.m2}`"></u-cell>
						<u-cell icon="../../static/images/wallet/mdsy.png" title="秒到收益" v-if="type == 'qbtype1'" @click="$tab.navigateTo('/packageA/pages/income/detail?type='+type+ '&name=md')" 
							:isLink="true" :value="`+${initdata.m3}`"></u-cell>
						<u-cell icon="../../static/images/wallet/mdbt.png" title="秒到补贴" v-if="type == 'qbtype1'" @click="$tab.navigateTo('/packageA/pages/income/detail?type='+type+ '&name=mdbt')" 
							:isLink="true" :value="`+${initdata.m4}`"></u-cell>
						<u-cell icon="../../static/images/wallet/yybt.png" title="运营补贴" v-if="type == 'qbtype1'" @click="$tab.navigateTo('/packageA/pages/income/detail?type='+type+ '&name=yybt')" 
							:isLink="true" :value="`+${initdata.m5}`"></u-cell>
						<u-cell icon="../../static/images/wallet/ydq.png" title="已到期应扣" :isLink="true" 
							:value="`+${initdata.m6}`"></u-cell>
						<u-cell icon="../../static/images/wallet/wdq.png" title="未到期扣款" :isLink="true" 
							:value="`+${initdata.m7}`"></u-cell>
						<u-cell icon="../../static/images/wallet/txjl.png" :border="false" title="提现记录" :isLink="true"
							:value="`+${initdata.m8}`" @click="$tab.navigateTo('/packageB/pages/withdraw/detail?type='+type)"></u-cell>
					</u-cell-group>
				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	import {
		getMoneyfenrun,
		getMoneyfanxian,
		getMoneyDongjie,
		getMoneyLiuliangka
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				type: '',
				initdata: {
					m1: 0,
					m2: 0,
					m3: 0,
					m4: 0,
					m5: 0,
					m6: 0,
					m7: 0,
					m8: 0
				}
			};
		},
		onLoad(options) {
			this.type = options.type;
			this.handleInitData()
		},
		methods: {
			handleInitData() {
				switch (this.type) {
					case 'qbtype1':
						this.getFenrunData()
						break;
					case 'qbtype2':
						this.getFanxianData()
						break;
					case 'qbtype3':
						this.getDonmgjieData()
						break;
					case 'qbtype4':
						this.getLiuliangKaData()
						break;
					default:
						break;
				}
			},
			getFenrunData() {
				getMoneyfenrun().then((res) => {
					this.initdata = res.moneyrpt
				})
			},
			getFanxianData() {
				getMoneyfanxian().then((res) => {
					this.initdata = res.moneyrpt
				})
			},
			getDonmgjieData() {
				getMoneyDongjie().then((res) => {
					this.initdata = res.moneyrpt
				})
			},
			getLiuliangKaData() {
				getMoneyLiuliangka().then((res) => {
					this.initdata = res.moneyrpt
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

	.earning {
		&-content {
			.pannel {
				height: 254rpx;
				background: url(../../static/images/wallet/bg-6.png) no-repeat;
				background-size: 100% 100%;
				color: #fff;
				padding: 45rpx 32rpx;
				line-height: 1;

				.title {
					font-size: 29rpx;
					margin-bottom: 20rpx;
				}

				.fs1 {
					font-size: 62rpx;
					font-family: 'AlimamaFangYuanTiVF';
					font-weight: bold;

				}

				.fs2 {
					font-size: 26rpx;
				}

				.fs3 {
					font-size: 32rpx;
				}

				.split {
					height: 1rpx;
					background-color: rgba(255, 255, 255, 0.3);
					margin-top: 20rpx;
					margin-bottom: 25rpx;
				}
			}

			.list-menu {
				background-color: #fff;
				border-radius: 18rpx;
				padding: 0 41rpx;
				// margin-top: 27rpx;

				/deep/ .u-icon__icon--info {
					color: rgba(0, 0, 0, 1);
					font-size: 24rpx;
				}

				/deep/ .u-cell__value {
					color: rgba(0, 0, 0, 1);
					font-size: 36rpx;
				}

				/deep/ .u-cell__body {
					padding: 45rpx 0;
				}

				/deep/ .u-cell__title-text {
					font-size: 34rpx;
					color: rgba(44, 44, 44, 0.8);
					margin-left: 32rpx;
				}
			}
		}
	}
</style>