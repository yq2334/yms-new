<template>
	<view class="withdraw">
		<u-navbar leftText="返回" :fixed="false" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<!-- <view class="search flex align-center" slot="right">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view> -->
		</u-navbar>
		
			<view class="withdraw-content">
				<!-- <view class="bank-select flex align-center justify-between" @click="showBank = true">
				<view class="left flex align-center justify-start">
					<u--image :showLoading="true" src="/static/images/zsyh.png" width="81rpx" height="81rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left">
						<view class="fs1">
							招商银行
						</view>
						<view class="fs2">
							尾号0023储蓄卡
						</view>
					</view>
				</view>
				<u-icon class="margin-left-sm" color="#696969" size="18" name="arrow-down"></u-icon>
			</view> -->
				<view class="edit-bank">
					<h1 class="margin-bottom-xl">{{info.bank || ''}}</h1>
					<h3>{{info.huming || ''}}（{{info.kahao || ''}}）</h3>
					<view class="edit-wrapper flex align-center justify-center"
						@click="$tab.navigateTo('/packageA/pages/finance/card-setting')">
						<u--image :showLoading="true" src="../../static/images/wallet/edit.png" width="24rpx" height="24rpx"
							mode="aspectFit"></u--image>
						<text class="margin-left-xs">修改结算卡</text>
					</view>
				</view>
				<view class="withdraw-operate margin-top">
					<view class="flex align-center justify-between">
						<view class="text-df">
							可提现金额 <text class="text-orange">￥</text> <text class="text-xxl text-orange text-bold">
								{{info.yuer || 0}}</text>
						</view>
						<text @click="max" class="text-orange text-bold text-df">全部提现</text>
					</view>
					<view class="flex align-center  justify-start input-wrapper">
						<text class="text-price"></text>
						<u--input v-model="amount" placeholder="请输入申请金额" type="number" fontSize="26" color="#3F3F3F"
							border="none" clearable>
						</u--input>
					</view>
					<view class="tips text-df">
						税费{{info.shuidian || ''}}% 服务费￥{{info.shouxufei}}元/笔 起提金额: {{info.zuidi || 0}}元
					</view>
				</view>

				<view class="action-btn margin-top-lg  flex flex-direction align-center justify-center">
					<u-button :loading="loading" :disabled="disabled"
						:customStyle="{'border-radius': '48rpx','height': '104rpx', 'width': '568rpx', 'font-size': '42rpx', 'color': '#fff'}"
						size="" type="" @click="widthdraw()" text="确认提现">
					</u-button>
				</view>
				<view class="margin-top-lg tips-bottom">
					<p>{{info.remark}}</p>
					<!-- <p>提现时间：每天早上9点到晚上18点（提现到账时间为T+1）</p>
				<p>提现时间：每天早上9点到晚上18点（提现到账时间为T+1）</p>
				<p>提现时间：每天早上9点到晚上18点（提现到账时间为T+1）</p> -->
				</view>
			</view>
		
		<u-action-sheet :show="showBank" :actions="actions" title="请选择银行" @close="showBank = false"
			@select="bankSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	import {
		getWithdrawInfo,
		handleWithdraw
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				info: {},
				showBank: false,
				actions: [{
						name: '中国银行',
					},
					{
						name: '建设银行',
					},
					{
						name: '招商银行',
					},
				],
				amount: '',
				type: '',
				loading: false,
				disabled: false
			};
		},
		onLoad(options) {
			this.type = options.type
			this.getInfo()
		},
		methods: {
			getInfo() {
				getWithdrawInfo({
					qbtype: this.type
				}).then((res) => {
					if (res.code == '00') {
						this.info = res
					} else {
						if (res.code == '09') {
							setTimeout(() => {
								this.$tab.redirectTo('/packageA/pages/finance/card-setting')

							}, 2000)
							return;
						}
						this.disabled = true
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					}
				})
			},
			max() {
				this.amount = this.info.yuer
			},
			widthdraw() {
				if (!this.amount) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'error'
					})
					return;
				}
				this.loading = true
				handleWithdraw({
					qbtype: this.type,
					tid: this.info.tid,
					jine: this.amount
				}).then((res) => {
					this.loading = false
					if (res.code == '00') {
						uni.showToast({
							title: '提现申请已提交',
							icon: 'success'
						})
						setTimeout(() => {
							this.$tab.navigateTo("/packageB/pages/withdraw/detail?type=" + this.type)
						}, 2000)

					}
				})
			}
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

	.withdraw {
		&-content {
			padding: 16rpx 18rpx;

			.bank-select {
				padding: 28rpx 39rpx;
				height: 139rpx;
				background: #FFFFFF;
				border-radius: 18rpx;

				.fs1 {
					font-size: 32rpx;
					color: #3F3F3F;
					margin-bottom: 15rpx;
				}

				.fs2 {
					color: rgba(63, 63, 63, 0.7);
					font-size: 27rpx;
				}
			}

			.edit-bank {
				background: linear-gradient(130deg, #FA982B, #FFC079);
				border-radius: 18rpx;
				color: #fff;
				padding: 50rpx 45rpx;
				line-height: 1;
				position: relative;

				h1 {
					font-size: 46rpx;
					font-weight: 400;
				}

				h3 {
					font-size: 36rpx;
					font-weight: 400;
				}

				.edit-wrapper {
					width: 198rpx;
					height: 49rpx;
					background: linear-gradient(-58deg, #FF6E69, #FF7B76);
					border-radius: 14rpx 0rpx 0rpx 14rpx;
					font-size: 26rpx;
					position: absolute;
					top: 23rpx;
					right: 0;
				}
			}

			.withdraw-operate {
				color: #3F3F3F;
				padding: 28rpx;

				background: #FFFFFF;
				border-radius: 18rpx;

				.input-wrapper {
					margin: 24rpx 0;
					padding: 38rpx 10rpx;
					border-top: 1rpx solid rgba(69, 69, 69, 0.3);
					border-bottom: 1rpx solid rgba(69, 69, 69, 0.3);
				}

				.tips {
					opacity: 0.8;
				}
			}

			.tips-bottom {
				color: rgba(63, 63, 63, 0.6);
				font-size: 20rpx;
				line-height: 1.5;
				padding-left: 30rpx;
			}
		}
	}

	/deep/ .u-button {
		background: linear-gradient(-58deg, #E95752, #FF7B76);
		border-radius: 48rpx;
	}
</style>