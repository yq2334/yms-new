<template>
	<view class="detail">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<!-- <view class="search flex align-center" slot="right">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view> -->
		</u-navbar>
		<common-view>
			<view class="detail-content">
			<!-- 	<u-tabs :list="tabs" lineWidth="57"
					:activeStyle="{color: '#FA982B', fontSize: '28rpx', fontWeight: 'bold' }"
					:inactiveStyle="{color: '#3f3f3f',fontSize: '28rpx'  }" :scrollable="false" lineHeight="3"
					lineColor="#FA982B" @click="click"></u-tabs> -->
				<view class="list">
					<view class="item" v-for="(item, index) in list" :key="index">
						<view class="tag blue flex align-center justify-center" v-if="item.zhuangtai == '待处理'">
							<image src="/static/images/dui.png" mode="widthFix"></image>
							{{item.zhuangtai}}
						</view>
						<view class="tag orange flex align-center justify-center" v-else-if="item.zhuangtai == '未结算'">
							<image src="/static/images/cuo.png" mode="widthFix"></image>
							{{item.zhuangtai}}
						</view>
						<view class="tag green flex align-center justify-center" v-else>
							<image src="/static/images/dui.png" mode="widthFix"></image>
							{{item.zhuangtai}}
						</view>
						<view class="amount margin-bottom-sm">
							提现金额：{{item.jine}}
						</view>
						<view class="flex align-center margin-bottom-xs">
							<text class="basis-df">提现费：{{item.shouxufei}}</text>
							<text>提现钱包：{{item.qbtypename}}</text>
						</view>
						<view class="flex align-center margin-bottom-xs">
							<text class="basis-df">到账金额：{{item.shizhuan}}</text>
							<text>税点：{{item.shuishou}}</text>
						</view>
						<view class="flex align-center margin-bottom-xs">
							<text>申请时间：{{item.AddTime}}</text>
			
						</view>
						<view class="flex align-center">
							<text>开户行：{{item.bank}}</text>
			
						</view>
					</view>
			
				</view>
				<u-loadmore :status="status" @loadmore="loadmore" />
			</view>
		</common-view>
	</view>
</template>

<script>
	import {
		getWithdrawList
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				tabs: [{
						name: '全部',
						val: 0
					},
					{
						name: '待处理',
						val: 1
					},
					{
						name: '已结算',
						val: 2
					}
				],
				type: '',
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				initList : []
			};
		},
		onLoad(options) {
			this.type = options.type
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
		methods: {
			getList() {
				getWithdrawList({
					page: this.page,
					pageSize: this.pageSize,
					qbtype: this.type
				}).then((res) => {
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.tixianlist
						this.initList = res.tixianlist
					} else {
						this.list = this.list.concat(res.tixianlist)
						this.initList = this.initList.concat(res.tixianlist)
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
			click(e) {
				console.log(e)
				// this.page = 1;
				if(e.index == 0) {
					this.list = this.initList;
					return;
				}
				this.list = this.initList.filter((item) => item.zhuangtai == e.name)
			}
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #F6F5F8 ;
	}
</style>
<style lang="scss" scoped>
	

	.detail {
		
		&-content {
			.list {
				padding: 23rpx 45rpx;

				.item {
					position: relative;
					background: #FFFFFF;
					border-radius: 13rpx;
					padding: 37rpx 40rpx;
					color: rgba(63, 63, 63, 0.8);
					font-size: 26rpx;
					margin-bottom: 23rpx;

					.amount {
						color: #1B1B1B;
						font-size: 30rpx;
						font-weight: bold;
						;
					}

					.tag {
						width: 139rpx;
						height: 56rpx;
						font-size: 26rpx;
						position: absolute;
						top: 0;
						right: 0;
						border-bottom-left-radius: 45rpx;

						image {
							width: 25rpx;
							height: 25rpx;
							margin-right: 10rpx;
						}

						&.blue {
							background: linear-gradient(-58deg, #E7F0FF, #E7F0FF);
							color: #98BCFF;

						}

						&.orange {
							background: #FFF8ED;
							color: rgba(244, 148, 65, 1);

						}

						&.green {
							background: linear-gradient(-58deg, #E7F0FF, #E7F0FF);
							color: #98BCFF;
						}
					}
				}
			}
		}
	}

	.u-tabs {
		background-color: #fff;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
	}
</style>