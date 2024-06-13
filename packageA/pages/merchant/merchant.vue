<template>
	<view class="merchant">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="openSearchPop" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>
			</view>
		</u-navbar>
		<common-view>
			<view class="merchant-content">
				<view class="tabs">
					<view class="item " :class="current == 0 && 'active'" @click="changeTab(0)">
						直营商户
					</view>
					<view class="item" :class="current == 1 && 'active'" @click="changeTab(1)">
						伙伴商户
					</view>
				</view>
				<view class="list">
					<view class="item margin-top-sm" v-for="(item,index) in list" :key="index">
						<view class="top flex align-center justify-between">
							<view class="left">
								{{item.shname}} <text>{{item.recflgname}}</text>
							</view>
							<view class="detail" v-if="current == 0"
								@click="$tab.navigateTo('/packageA/pages/merchant/detail?jijuhao=' + item.wlno)">
								交易明细
							</view>
						</view>
						<view class="flex align-center justify-between margin-bottom-xs">
							<view class="label">
								SN：
							</view>
							<view class="right flex align-center">
								<text>{{item.wlno}}</text>
								<u--image @click="copy(item.wlno)" class="copy margin-left-xs" :showLoading="true"
									src="/static/images/copy.png" width="25rpx" height="26rpx"
									mode="aspectFit"></u--image>

							</view>
						</view>
						<view class="flex align-center justify-between margin-bottom-xs">
							<view class="label">
								商户号：
							</view>
							<view class="right flex align-center">
								<text>{{item.shanghuno}}</text>
								<u--image class="copy margin-left-xs" :showLoading="true" @click="copy(item.shanghuno)"
									src="/static/images/copy.png" width="25rpx" height="26rpx"
									mode="aspectFit"></u--image>

							</view>
						</view>
						<view class="flex align-center justify-between ">
							<view class="">
								<text class="label">绑定日期：</text>
								<text>{{item.bdtime}}</text>
							</view>
							<view class="">
								{{item.zcname}}
							</view>
						</view>
						<view class="flex align-center justify-between margin-top-xs" v-if="current == 1">
							<view class="">
								<text class="label">所属代理商 ：</text>
								<text>{{item.xiajiname}}</text>
							</view>

						</view>
						<view class="split margin-top margin-bottom-sm">

						</view>
						<view class="bottom flex align-center justify-around">
							<view class="">
								<h3>本月交易</h3>
								<h1>{{item.jiaoyijinemoth}}</h1>
							</view>
							<view class="">
								<h3>总笔数</h3>
								<h1>{{item.bishu || 0 }}</h1>
							</view>
							<view class="">
								<h3>总交易</h3>
								<h1>{{item.jiaoyijine}}</h1>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" @loadmore="loadmore" />
			</view>
		</common-view>
		<search-pop ref="searchPop" :columns="columns" @submit="doSearch"></search-pop>
	</view>
</template>

<script>
	import {
		getDirectMerchantList,
		getTeamMerchantList
	} from '@/api/system/user.js'
	import SearchPop from '@/components/search/index.vue'

	export default {
		data() {
			return {
				rightX: 0,
				current: 0,
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				columns: [{
						type: 'pinpai',
						label: '品牌',
						model: 'pinpai',
						placeholder: '请选择',
						isShow: true,
						actions: []
					},
					{
						type: 'zhengce',
						label: '政策',
						model: 'zhengce',
						isShow: true,
						placeholder: '请选择',
						actions: []
					},
					{
						type: 'date',
						label: '开通日期',
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
					{
						type: 'daili',
						label: '归属代理',
						model: 'daili',
						placeholder: '请选择 ',
						isShow: false,
						actions: []
					},
					// {
					// 	type: 'status',
					// 	label: '状态',
					// 	model: 'status',
					// 	isShow: true,
					// 	placeholder: '请选择',
					// 	actions: []
					// },
					{
						type: 'keyword',
						label: '模糊查询',
						model: 'daili',
						isShow: true,
						placeholder: '输入机具号/商户号/商户名',
						actions: []
					},
				],
			};
		},
		onLoad() {
			this.getList()
		},
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
		},
		components: {
			SearchPop
		},
		onReachBottom() {
			console.log('我滚动到底部了~')
			if (this.page >= this.pageNumber) {
				this.status = 'nomore';
				return;
			} else {
				this.status = "loading"
			}
			// this.page++; 
			this.pageSize += this.pageSize
			this.getList()
			// console.log('我滚动到底部了~')
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
			// #ifndef MP-WEIXIN
			uni.startPullDownRefresh({
			
			})
			// #endif
		},
		methods: {
			changeTab(tab) {
				this.page = 1;
				this.columns.forEach((item) => {

					if (item.type == 'daili') {
						item.isShow = true
					}

				})
				this.current = tab
				this.getList()

			},
			getList() {
				this.current == 0 ? this.getDirectList() : this.getTeamList()

			},
			getDirectList() {
				getDirectMerchantList({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.shanghulist
					} else {
						this.list = this.list.concat(res.shanghulist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}


				})
			},
			getTeamList() {
				getTeamMerchantList({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.shanghulist
					} else {
						this.list = this.list.concat(res.shanghulist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}


				})
			},
			openSearchPop() {
				this.$refs.searchPop.show = true
			},
			doSearch(form) {
				console.log(form)
				// this.searh.DataFrom = uni.$u.timeFormat(form.startDate, 'yyyy-mm-dd') 
				// this.searh.DataTo = uni.$u.timeFormat(form.endDate, 'yyyy-mm-dd')  
				this.page = 1;
				this.getList()
				console.log(this.searh)
			},
			loadmore() {
				if (this.page >= this.pageNumber) {
					this.status = 'nomore';
					return;
				} else {
					this.status = "loading"
				}
				// this.page++; 
				this.pageSize += this.pageSize
				this.getList()
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

		.list {
			.item {
				background: #FFFFFF;
				border-radius: 12rpx;
				padding: 0 35rpx;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 1);

				.top {
					padding: 18rpx 0;

					.left {
						color: #1B1B1B;
						font-size: 30rpx;

						text {
							color: #747474;
							margin-left: 18rpx;
						}
					}

					.detail {
						width: 129rpx;
						height: 37rpx;
						background: #FFF8ED;
						border-radius: 12rpx;
						text-align: center;
						line-height: 37rpx;
						color: #F49441;
						font-size: 26rpx;
					}
				}

				.label {
					color: rgba(63, 63, 63, 0.8);
					font-size: 26rpx;
				}

				.split {
					height: 1rpx;
					background: #000000;
					opacity: 0.1;
				}

				.bottom {
					padding-bottom: 25rpx;

					&>view {
						width: 33.33%;
					}

					h3 {
						font-size: 28rpx;
						color: rgba(63, 63, 63, 0.8);
						margin-bottom: 10rpx;
					}

					h1 {
						color: #000000;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>