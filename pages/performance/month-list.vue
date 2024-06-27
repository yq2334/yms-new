<template>
	<view class="terminal-query">
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="openSearchPop()"
				:style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view>
		</u-navbar>
		<view>
			<view class="content">
				<view class="top">
					<view class="margin-bottom-xl">
						<h3>{{initData.yue}}月新增{{type}}</h3>
						<h1>{{initData.yue_total}}</h1>
					</view>
					<view class="flex justify-between align-center">
						<view class="">
							<h3>本级新增{{type}}</h3>
							<h1>{{initData.self_total}}</h1>
						</view>
						<view class="">
							<h3>下级新增{{type}}</h3>
							<h1>{{initData.td_total}}</h1>
						</view>
					</view>
				</view>
				<view class="tabs flex align-center justify-between">
					<view class="item" :class="current == item.val && 'active'" @click="changeTab(item)"
						v-for="(item,index) in tabs" :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="list margin-top margin-bottom">
					<view @click="navToDetail(item)" class="item flex align-center justify-between margin-bottom-sm"
						v-for="(item,index) in list" :key="index">
						<view class="">
							<text class="margin-right-sm">{{item.nianf}}-{{item.yuef}}</text>
							<text>政策：{{item.zcname}}</text>
						</view>
						<view class="flex align-center">
							<text class="margin-right-xs">{{item.jihuo_heji ? item.jihuo_heji : item.jine_heji}}</text>
							<u-icon name="arrow-right" size="25" color="#CFCFCF"></u-icon>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" @loadmore="loadmore" />
			</view>
		</view>
		<search-pop ref="searchPop" :columns="columns" @submit="doSearch"></search-pop>
	</view>
</template>

<script>
	import {
		getYejichaxunMap
	} from '@/api/system/user.js'
	import SearchPop from '@/components/search/index.vue'

	export default {
		data() {
			return {
				rightX: 0,
				current: 0,
				tabs: [{
						name: '本级激活月报',
						val: 0
					},
					{
						name: '团队激活月报',
						val: 1
					}
				],
				paramsMap: {

					jiaoyi_month_xiaji: {
						key: 'jiaoyi',
						team: {
							api: '/api_yejichaxun_jiaoyi_month_xiaji.ashx',
							name: 'yhh.yejichaxun_jiaoyi_month_xiaji'
						},
						direct: {
							api: '/api_yejichaxun_jiaoyi_month.ashx',
							name: 'yhh.yejichaxun_jiaoyi_month'
						}

					},
					jihuo_month_xiaji: {
						key: 'jihuo',
						team: {
							api: '/api_yejichaxun_jihuo_month_xiaji.ashx',
							name: 'yhh.yejichaxun_jihuo_month_xiaji'
						},
						direct: {
							api: '/api_yejichaxun_jihuo_month.ashx',
							name: 'yhh.yejichaxun_jihuo_month'
						}

					},
				},
				page: 1,
				pageSize: 15,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				params_name: '',
				type: '',
				initData: {},
				searh: {},
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
						type: 'nianyue',
						label: '年月',
						model: 'nianyue',
						isShow: true,
						placeholder: '请选择',
						actions: []
					},



				],
			};
		},
		components: {
			SearchPop
		},
		onLoad(params) {
			this.params_name = params.name
			this.type = params.type
			this.current = params.tab
			this.tabs = [{
					name: `本级${this.type}月报`,
					val: 0
				},
				{
					name: `团队${this.type}月报`,
					val: 1
				}
			];
			console.log(this.paramsMap[this.params_name].team.api)
			this.getList()

		},
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
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
			changeTab(item) {
				this.current = item.val
				this.page = 1;
				this.getList()
			},
			getList() {
				this.current == 1 ? this.getDirectOpenList() : this.getDirectUnOpenList()
			},
			getDirectOpenList() {
				getYejichaxunMap({
					url: this.paramsMap[this.params_name].team.api,
					apiname: this.paramsMap[this.params_name].team.name,
				}, {
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum
					this.initData = res;
					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.yejilist
					} else {
						this.list = this.list.concat(res.yejilist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}

				})
			},
			getDirectUnOpenList() {
				getYejichaxunMap({
					url: this.paramsMap[this.params_name].direct.api,
					apiname: this.paramsMap[this.params_name].direct.name,
				}, {
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum
					this.initData = res;
					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.yejilist
					} else {
						this.list = this.list.concat(res.yejilist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}


				})
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
			navToDetail(item) {

				if (this.current == 0) {
					this.$tab.navigateTo('/pages/performance/direct-detail?name=' + 'month_' + this.paramsMap[this
							.params_name].key + '&type=month' + '&tab=' + this.paramsMap[this.params_name].key +
						'&nian=' + item.nianf + '&yue=' + item.yuef)

				} else {
					this.$tab.navigateTo('/pages/performance/team-detail?name=' + 'month_' + this.paramsMap[this
							.params_name]
						.key + '&type=month' +
						'&tab=' + this.paramsMap[this.params_name].key + '&nian=' + item.nianf + '&yue=' + item.yuef)
				}
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
	.terminal-query {
		.content {
			padding: 36rpx 44rpx;
		}

		.top {
			padding: 45rpx 74rpx;
			background: linear-gradient(130deg, #FA982B, #FFC079);
			box-shadow: 6upx 6upx 8upx rgba(217, 109, 26, 0.2);
			border-radius: 16rpx;
			color: #FFFFFF;

			h3 {
				font-size: 27rpx;
				font-weight: 400;
				margin-bottom: 25rpx;
			}

			h1 {
				font-size: 40rpx;
				font-weight: bold;
			}
		}

		.tabs {
			border-radius: 22rpx;
			background: linear-gradient(180deg, #EAEAEA, #FEFEFE);
			margin-top: 47rpx;

			.item {
				width: 100%;
				height: 69rpx;
				line-height: 69rpx;
				text-align: center;
				font-size: 28rpx;
				color: #000000;

				&.active {
					background: linear-gradient(130deg, #FA982B, #FFC079);
					border-radius: 22rpx 22rpx 0rpx 10rpx;
					color: #F6F6F6;
				}
			}
		}

		.list {
			.item {
				height: 69rpx;
				background: linear-gradient(180deg, #EAEAEA, #FEFEFE);
				border-radius: 10rpx;
				color: #000000;
				font-size: 29rpx;
				padding: 0 17rpx 0 27rpx;
			}
		}
	}
</style>