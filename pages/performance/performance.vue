<template>
	<view class="performance">
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$tab.switchTab('/pages/home/home')" leftIconColor="#363636" leftIcon="arrow-leftward"
			leftIconSize="25" :titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="show=true" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view>
		</u-navbar>
		<view>

			<view class="performance-content margin-top-sm">
				<view class="pannel">
					<div class="top flex align-center justify-between">
						<div class="title">团队业绩</div>
						<u-button class="btn md"
							@click="$tab.navigateTo('/pages/performance/month-list?name=jiaoyi_month_xiaji&type=交易&tab=1')"
							type="default" :plain="true" shape="circle" text="查看明细"></u-button>
					</div>
					<view class="datas">
						<h3>本月团队交易(元)</h3>
						<h1>{{yejiDta.jiaoyi}}</h1>
					</view>
					<view class="menu-wrapper flex flex-wrap margin-top justify-between">
						<view class="flex item justify-start align-start "
							@click="$tab.navigateTo('/pages/performance/day-list?name=jiaoyi_month_xiaji&type=交易&tab=1')">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/jy.png" width="37rpx"
								height="39rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">今日交易</text>
								<text class="fs2">{{yejiDta.jiaoyi_pre}}</text>
							</view>
						</view>
						<view class="flex item justify-start align-start "
							@click="$tab.navigateTo('/pages/performance/day-list?name=jihuo_month_xiaji&type=激活&tab=1')">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/cy.png" width="40rpx"
								height="40rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">今日激活</text>
								<text class="fs2">{{yejiDta.jihuo_pre}}</text>
							</view>
						</view>
						<view class="flex item justify-start align-start margin-top-xl"
							@click="$tab.navigateTo('/pages/performance/month-list?name=jihuo_month_xiaji&type=激活&tab=1')"> 
							<u--image class="img" :showLoading="true" src="/static/images/wallet/rili.png" width="39rpx"
								height="39rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">本月激活(台)</text>
								<text class="fs2">{{yejiDta.jihuo_month}}</text>
							</view>
						</view>
						<view class="flex item justify-start align-start margin-top-xl">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/js.png" width="35rpx"
								height="40rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">累积激活(台)</text>
								<text class="fs2">{{yejiDta.jihuo}}</text>
							</view>
						</view>

					</view>
				</view>
				<view class="pannel pannel-blue margin-top-lg">
					<div class="top flex align-center justify-between">
						<div class="title">直营业绩</div>
						<u-button
							@click="$tab.navigateTo('/pages/performance/month-list?name=jiaoyi_month_xiaji&type=交易&tab=0')"
							class="btn md" type="default" :plain="true" shape="circle" text="查看明细"></u-button>
					</div>
					<view class="datas">
						<h3>本月直营交易(元)</h3>
						<h1>{{yejiDta.jiaoyi_self}}</h1>
					</view>
					<view class="menu-wrapper flex flex-wrap margin-top justify-between">
						<view class="flex item justify-start align-start "
							@click="$tab.navigateTo('/pages/performance/day-list?name=jiaoyi_month_xiaji&type=交易&tab=0')">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/jy.png" width="37rpx"
								height="39rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">今日交易</text>
								<text class="fs2">{{yejiDta.jiaoyi_pre_self}}</text>
							</view>
						</view>
						<view class="flex item justify-start align-start "
							@click="$tab.navigateTo('/pages/performance/day-list?name=jihuo_month_xiaji&type=激活&tab=0')">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/cy.png" width="40rpx"
								height="40rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">今日激活</text>
								<text class="fs2">{{yejiDta.jihuo_pre_self}}</text>
							</view>
						</view>
						<view class="flex item justify-start align-start margin-top-xl"
							@click="$tab.navigateTo('/pages/performance/month-list?name=jihuo_month_xiaji&type=激活&tab=0')">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/rili.png" width="39rpx"
								height="39rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">本月激活(台)</text>
								<text class="fs2">{{yejiDta.jihuo_month_self}}</text>
							</view>
						</view>
						<view class="flex item justify-start align-start margin-top-xl">
							<u--image class="img" :showLoading="true" src="/static/images/wallet/js.png" width="35rpx"
								height="40rpx" mode="aspectFit"></u--image>
							<view class="flex flex-direction">
								<text class="fs1">累积激活(台)</text>
								<text class="fs2">{{yejiDta.jihuo_self}}</text>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="top" @close="close" @open="open">
			<view class="serach-pop">
				<u-navbar leftText="返回" :fixed="false" bgColor="transparent" :autoBack="false" :safeAreaInsetTop="true"
					@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
					:titleStyle="{color: '#363636',fontSize: '32rpx'}">
					<view class="search flex align-center" slot="right" @click="show=false">
						<text style="fontSize: 33rpx">退出查询</text>
						<u-icon size="28" class="margin-left-xs" color="#363636" name="close-circle"></u-icon>
					</view>
				</u-navbar>
				<u--form :model="form" ref="form" labelPosition="left" labelWidth="120" :borderBottom="true">
					<u-form-item label="年月" prop="filterDate" class="input-item " :borderBottom="true"
						@click="showFilterDate = true; hideKeyboard()">
						<u--input v-model="filterDate" disabled disabledColor="#ffffff" placeholder="请选择年月"
							inputAlign="right" fontSize="18" color="#3F3F3F" border="none"></u--input>
						<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
					</u-form-item>

					<view class="btn-action flex align-center justify-between">
						<u-button type="default" :plain="true" shape="circle" text="重置条件"
							@click="clearFilter"></u-button>
						<u-button type="primary" shape="circle" text="确认筛选" @click="initData"></u-button>
					</view>
				</u--form>
			</view>
		</u-popup>
		<u-action-sheet :show="showFilterDate" :actions="actions" title="请选择品牌" @close="showFilterDate = false"
			@select="dateSelect">
		</u-action-sheet>

	</view>
</template>

<script>
	import {
		getYejiData,
		getYejiMonth
	} from "@/api/system/user.js"
	import {
		getToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				rightX: 0,
				show: false,
				form: {
					name: '',
					bank: '',
					mobile: '',
					cardNo: '',
					IDCard: ''
				},
				filterDate: uni.$u.timeFormat(new Date(), 'yyyy-mm'),
				yejiDta: {},
				showFilterDate: false,
				showStartTime: false,
				showEndTime: false,
				startTime: '',
				endTime: '',
				actions: [],
				selectPlatforms: [],
				rules: {
					"name": [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}],
					"bank": [{
						required: true,
						message: '请选择开户行',
						trigger: ['blur', 'change']
					}],
					"mobile": [{
						required: true,
						message: '请输入手机号码',
						trigger: ['blur', 'change']
					}],
					"cardNo": [{
						required: true,
						message: '请输入银行卡号',
						trigger: ['blur', 'change']
					}],
					"IDCard": [{
						required: true,
						message: '请输入身份证信息',
						trigger: ['blur', 'change']
					}],

				},

			}
		},
		onLoad() {
			this.initData()
			this.getMonthData()
		},
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
		},
		onPullDownRefresh() {
			this.initData()
			this.getMonthData()
			uni.startPullDownRefresh({

			})
		},
		methods: {
			initData() {
				getYejiData({
					nianyue: this.filterDate
				}).then((res) => {
					uni.stopPullDownRefresh()
					console.log(res)
					this.yejiDta = res.yeji
				})
			},
			getMonthData() {
				this.actions = []
				getYejiMonth({}).then((res) => {
					res.ymonth.forEach((item) => {
						this.actions.push({
							name: item.yearmonth
						})
					})
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			dateSelect(e) {
				this.filterDate = e.name

			},
			clearFilter() {
				this.filterDate = ''
				this.initData()
			},
			selectStartTime(e) {
				console.log(uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
				// this.startTime = e.value
				this.startTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.showStartTime = false

			},
			selectEndTime(e) {
				console.log(e.value)
				// this.date2 = e.value
				this.endTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.showEndTime = false
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" >
	// .search{
	// 	font-size: 34rpx;
	// }
	

	.performance {
		padding: 0 22rpx;

		&-content {
			.pannel {
				background: url(data:image/png;base64,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) no-repeat;
				background-size: 100% 100%;
				// height: 590rpx;
				padding-bottom: 27rpx;

				.title {
					font-size: 38rpx;
					font-weight: bold;
					;
					font-style: italic;
					color: #FFFFFF;
					width: 268rpx;
					height: 62rpx;
					line-height: 62rpx;
					padding-left: 35rpx;
				}

				.u-button {
				    width: 80px !important;
				    height: 25px !important;
				    border-radius: 12px !important;
				    margin: 0;
					border: 1px solid #FA9C2D;
					font-size: 26rpx;
					color: #FA9C2D;
					margin-top: 16rpx;
					margin-right: 27rpx;
				}

				.datas {
					padding-top: 44rpx;
					text-align: center;

					h3 {
						font-size: 29rpx;

						color: #353535;


					}

					h1 {
						font-size: 57rpx;
						font-family: 'AlimamaFangYuanTiVF';
						color: #262626;
						line-height: 1.5;
					}
				}

				.menu-wrapper {
					padding: 0 42rpx;
					margin-top: 55rpx;

					.item {
						width: 48%;
						padding-top: 28rpx;
						padding-bottom: 28rpx;
						background: #F8F7F4;
						border-radius: 11rpx;
						
						.u-image {
							margin-left: 19rpx;
							// margin-top: 17rpx;
							margin-right: 19rpx;
						}

						.fs1 {
							// padding-top: 9rpx;
							font-size: 30rpx;
							color: #353535;
							opacity: 0.8;
							padding-bottom: 10rpx;
						}

						.fs2 {
							font-size: 36rpx;
							color: #262626;

						}
					}
				}

			}

			.pannel-blue {
				background: url(data:image/png;base64,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) no-repeat;
				background-size: 100% 100%;

				.btn {
				

				}
				.u-button {
				   border: 1px solid #0071FF;
				   color: #0071FF;
				}
			}
		}
	}

	.u-form {
		border-top: 2rpx solid #FA982B;
		padding: 20rpx 44rpx 44rpx 44rpx;

		/deep/ .u-form-item__body__left__content {
			padding-left: 26rpx;
		}

		/deep/ .u-form-item__body__left__content__label {
			color: #3F3F3F;
			font-size: 30rpx;
			line-height: 30rpx;
		}

		/deep/ .u-form-item__body__left__content__required {
			font-size: 28rpx;
			color: #ED7F43;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		/deep/ .uni-select {
			margin-top: 20rpx;
			border: 0;

			// border-bottom: 1rpx solid rgba(255, 255, 255, 0.2) !important;
		}

		/deep/ .uni-select__input-placeholder {
			color: #9A9A9A;
			font-size: 30rpx;
		}

		/deep/ .uni-input-placeholder {
			color: #9A9A9A !important;
			font-size: 30rpx;
			// font-family: 'AlibabaPuHuiTiR';
			// font-weight: 400;
		}

		.selectDate {
			color: #9A9A9A;
			font-size: 30rpx;

			.fs {
				color: #3F3F3F;
			}
		}

		.btn-action {
			margin-top: 60rpx;

			.u-button {
				width: 242rpx;
				height: 72rpx;
			}

			/deep/ .u-button--plain {
				height: 72rpx;
				border: 1px solid #FA992C !important;
				background: transparent;
				color: #FA992C;
			}
		}

	}
</style>
<style lang="scss">
	.btn {
		
	}
	
</style>