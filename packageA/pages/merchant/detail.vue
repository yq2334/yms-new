<template>
	<view class="merchant">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right"  @click="openSearchPop"  v-if="current == 1 || current == 2" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>
			</view>
		</u-navbar>
		<common-view>
			<view class="merchant-content">
				<view class="tabs">
					<view class="item " :class="current == 0 && 'active'" @click="changeTab(0)">
						商户信息
					</view>
					<view class="item" :class="current == 1 && 'active'" @click="changeTab(1)">
						日交易汇总
					</view>
					<view class="item" :class="current == 2 && 'active'" @click="changeTab(2)">
						月交易汇总
					</view>
				</view>

				<merchant-info ref="info" :shanghuno="shanghuno" v-if="current == 0"></merchant-info>
				<merchant-date ref="dateList"  :shanghuno="shanghuno" :nianyue="nianyue" @clickItem="clickDateItem"
					v-if="current == 1"></merchant-date>
				<merchant-month ref="monthList" :shanghuno="shanghuno" @clickItem="clickItem" v-if="current == 2"></merchant-month>
				<merchant-date-detail :shanghuno="shanghuno" :riqi="riqi" v-if="current == 4"></merchant-date-detail>
				<search-pop ref="searchPop" :columns="columns" @submit="doSearch"></search-pop>
			</view>
		</common-view>
	</view>
</template>

<script>
	import {
		getMerchantInfo
	} from '@/api/system/user.js'
	import MerchantInfo from './merchant-info.vue'
	import MerchantDate from './merchant-date.vue'
	import MerchantMonth from './merchant-month.vue'
	import MerchantDateDetail from './merchant-date-detail.vue'
	import SearchPop from '@/components/search/index.vue'
	export default {
		data() {
			return {
				current: 0,
				rightX: 0,
				shanghuno: '',
				merchantInfo: {
					shinfo: {},
					fkalist: [],
					fewmlist: []
				},
				nianyue: '',
				riqi: '',
				columns: [{
						type: 'nianyue',
						label: '年月',
						model: 'nianyue',
						isShow: true,
						placeholder: '请选择',
						actions: []
					},
					{
						type: 'date',
						label: '交易日期',
						model: 'date',
						isShow: true,
						dateZone: [{
								model: 'startDate',
								showModel: 'DataFrom',
								placeholder: '请选择开始日期',
								showStartDate: false
							},
							{
								model: 'endDate',
								showModel: 'DataTo',
								placeholder: '请选择结束日期',
								showEndDate: false
							}
						]
					},

				],
				searh: {
					DataFrom: uni.$u.timeFormat(new Date(), 'yyyy-mm-dd'),
					DataTo: uni.$u.timeFormat(new Date(), 'yyyy-mm-dd')
				}
			};
		},
		components: {
			MerchantInfo,
			MerchantDate,
			MerchantMonth,
			MerchantDateDetail,
			SearchPop
		},
		onLoad(options) {
			this.shanghuno = options.jijuhao
			// this.getMerchantInfoData()
		},
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
		},
		methods: {
			getMerchantInfoData() {
				this.$refs.info.getMerchantInfoData()
			},
			changeTab(tab) {
				this.current = tab
				if (this.current == 1) {
					this.columns = [
						{
							type: 'date',
							label: '交易日期',
							model: 'date',
							isShow: true,
							dateZone: [{
									model: 'startDate',
									showModel: 'DataFrom',
									placeholder: '请选择开始日期',
									showStartDate: false
								},
								{
									model: 'endDate',
									showModel: 'DataTo',
									placeholder: '请选择结束日期',
									showEndDate: false
								}
							]
						},

					]
				} else {
					this.columns = [{
							type: 'nianyue',
							label: '年月',
							model: 'nianyue',
							isShow: true,
							placeholder: '请选择',
							actions: []
						},
						
					]
				}
			},
			copy(text) {
				// #ifdef H5
				this.$mHelper.h5Copy(text)
				// #endif
				uni.setClipboardData({
					data: text,
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						});
					}
				});

			},
			clickItem(item) {
				console.log(item)
				this.nianyue = item.nianyue;
				this.changeTab(1)
			},
			clickDateItem(item) {
				console.log(item)
				this.riqi = item.riqi2;
				this.changeTab(4)
			},
			openSearchPop() {
				this.$refs.searchPop.show = true
			},
			doSearch(form) {
				console.log(form)
				// // this.searh.DataFrom = uni.$u.timeFormat(form.startDate, 'yyyy-mm-dd') 
				// // this.searh.DataTo = uni.$u.timeFormat(form.endDate, 'yyyy-mm-dd')  
				this.searh.DataFrom = uni.$u.timeFormat(form.startDate, 'yyyy-mm-dd')
				this.searh.DataTo = uni.$u.timeFormat(form.endDate, 'yyyy-mm-dd')
				this.searh.nianyue = form.nianyue
				this.page = 1;
				if(this.current == 1) this.$refs.dateList.getList(this.searh) ;
				if(this.current == 2) this.$refs.monthList.getList(this.searh) ;
				console.log(this.searh)
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
		background-color: #F6F5F8
	}

	.merchant {
		&-content {
			padding: 25rpx;
		}

		.tabs {
			padding: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			border-radius: 12rpx;

			.item {
				width: 50%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				color: #545454;
				font-size: 32rpx;

				&.active {
					background: #F6F5F8;
					border-radius: 12rpx;
					color: #FA982B;
				}
			}
		}



		.month-list {
			margin-top: 19rpx;

			.item {
				height: 86rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				color: #747474;
				font-size: 34rpx;
				margin-bottom: 13rpx;
				padding: 0 25rpx 0 40rpx;

				text {
					color: #545454;
					font-size: 26rpx;
					margin-right: 25rpx;
				}
			}
		}


	}
</style>