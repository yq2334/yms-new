<template>
	<view class="transfer">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="openSearchPop"
				:style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view>
		</u-navbar>
		<common-view>
			<view class="transfer-content">
				<view class="list">
					<view class="item" v-for="(item,index) in list" :key="index">
						<view class="margin-bottom-sm">
							<text class="label">划拨代理：</text>
							<text class="value">{{item.mingcheng_xiaji}}</text>
						</view>
						<view class="flex align-center pd ">
							<view class="basis-df">
								<text class="label">数量：</text>
								<text class="value">{{item.shuliang}}</text>
							</view>
							<view class="basis-df">
								<text class="label">日期：</text>
								<text class="value">{{item.riqi}}</text>
							</view>
						</view>
						<view class="btn" @click="$tab.navigateTo('/packageA/pages/transfer/detail?item='+JSON.stringify(item))">
							点击查看
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
		getHuaboLog
	} from '@/api/system/user.js'
	import SearchPop from '@/components/search/index.vue'
	export default {
		data() {
			return {
				rightX: 0,
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				search: {},
				columns: [{
						type: 'daili',
						label: '划拨代理',
						model: 'daili',
						placeholder: '请选择 ',
						isShow: true,
						actions: []
					},
					{
						type: 'date',
						label: '划拨日期',
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
						type: 'keyword',
						label: '模糊查询',
						model: 'daili',
						isShow: true,
						placeholder: '输入机具号',
						actions: []
					},
				],
			};
		},
		components: {
			SearchPop
		},
		onLoad() {
			this.getList()
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
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
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
			getList() {
				getHuaboLog({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.huabolist
					} else {
						this.list = this.list.concat(res.huabolist)

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

	.transfer {
		&-content {
			padding: 26rpx 18rpx;

			.list {

				.item {
					padding: 29rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
					font-size: 28rpx;
					position: relative;
					margin-bottom: 16rpx;

					.label {

						color: rgba(63, 63, 63, 0.7);
					}

					.value {
						color: #3F3F3F;

					}

					.pd {
						padding-right: 180rpx;
					}

					.btn {
						position: absolute;
						width: 146rpx;
						height: 48rpx;
						border: 1px solid #FA992C;
						// background: linear-gradient(120deg, #FA8E1C, #FABF5A);
						border-radius: 24rpx;
						text-align: center;
						line-height: 44rpx;
						color: #FA992A;
						font-size: 24rpx;
						bottom: 25rpx;
						right: 25rpx;
					}
				}
			}
		}
	}
</style>