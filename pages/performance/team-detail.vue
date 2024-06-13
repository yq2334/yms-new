<template>
	<view class="day-list">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="show=true" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>
		
			</view>
		</u-navbar>
		<common-view>
		<view class="content">
			<view class="top shadow flex align-center justify-between">
				<view class="left">
					<text class="margin-right-sm">{{initData.nianyue ? initData.nianyue : initData.riqi}}</text>
					<text>合计：</text>
				</view>
				<view class="right">
					{{initData.ri_total ? initData.ri_total : initData.yue_total}}
				</view>
			</view>
			<view class="table-head flex align-center justify-around">
				<view class="">
					代理商
				</view>
				<view class="">
					政策
				</view>
				<view class="">
					交易
				</view>
			</view>
			<view class="table-body margin-bottom">
				<view class="table-td flex align-center justify-around" v-for="(item,index) in list" :key="index">
					<view class="">
						{{item.mingcheng}}
					</view>
					<view class="">
						{{item.zcname}}
					</view>
					<view class="">
						{{item.jihuo_heji ? item.jihuo_heji : item.jine_heji}}
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
		getYejichaxunMap
	} from '@/api/system/user.js'

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
						
						direct: {
							api: '/api_yejichaxun_jiaoyi_month_list.ashx',
							name: 'yhh.yejichaxun_jiaoyi_month_list'
						}

					},
					month_jiaoyi: {
						api: '/api_yejichaxun_jiaoyi_month_xiaji_list.ashx',
						name: 'yhh.yejichaxun_jiaoyi_month_xiaji_list'
					},
					day_jiaoyi: {
						api: '/api_yejichaxun_jiaoyi_day_xiaji_list.ashx',
						name: 'yhh.yejichaxun_jiaoyi_day_xiaji_list'
					},
					day_jihuo: {
						api: '/api_yejichaxun_jihuo_day_xiaji_list.ashx',
						name: 'yhh.yejichaxun_jihuo_day_xiaji_list'
					},
					month_jihuo: {
						api: '/api_yejichaxun_jihuo_month_xiaji_list.ashx',
						name: 'yhh.yejichaxun_jihuo_month_xiaji_list'
					},
					jihuo_month_xiaji: {
						
						direct: {
							api: '/api_yejichaxun_jihuo_month_list.ashx',
							name: 'yhh.yejichaxun_jihuo_month_list'
						}
					
					},
				},
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				params_name: '',
				
				type: '',
				riqi: '',
				nian: '',
				yue: '',
				initData: {}
			};
		},
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
		},
		onLoad(params) {
			this.params_name = params.name
			this.type = params.type
			params.riqi ? this.riqi = params.riqi : null
			params.nian ? this.nian = params.nian : null
			params.yue ? this.yue = params.yue : null
			this.tabs = [{
						name: `本级${this.type}月报`,
						val: 0
					},
					{
						name:  `团队${this.type}月报`,
						val: 1
					}
				];
			
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
				this.type == 'day' ? this.getDirectOpenList() : this.getDirectUnOpenList()
			},
			getDirectOpenList() {
				getYejichaxunMap({
				url: this.paramsMap[this.params_name].api,
				apiname: this.paramsMap[this.params_name].name,
				}, {
					page: this.page,
					pageSize: this.pageSize,
					riqi: this.riqi,
				
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
					url: this.paramsMap[this.params_name].api,
					apiname: this.paramsMap[this.params_name].name,
				}, {
					page: this.page,
					pageSize: this.pageSize,
					nian: this.nian,
					yue: this.yue
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
		background-color: #F6F5F8 ;
	}
</style>
<style lang="scss" scoped>
.day-list{
	.content{
		padding: 23rpx;
		.top{
			height: 83rpx;
			background: linear-gradient(130deg, #FA982B, #FFC079);
			box-shadow: 6upx 6upx 8upx rgba(217, 109, 26, 0.2);
			border-radius: 16rpx;
			color: #fff;
			padding: 0 20rpx;
			
			.left{
				font-size: 29rpx;
			}
			.right{
				font-size: 45rpx;
				font-weight: bold;
			}
		}
		.table-head{
			background: linear-gradient(180deg, #EAEAEA, #FEFEFE);
			border-radius: 10rpx;
			margin-top: 30rpx;
			&>view{
				
				height: 69rpx;
				line-height: 69rpx;
				flex: 1;
				color: #000000;
				font-size: 28rpx;
				text-align: center;
			}
		}
		.table-body{
			margin-top: 20rpx;
			.table-td{
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				padding: 0 20rpx;
				&>view{
					height: 69rpx;
					line-height: 69rpx;
					flex: 1;
					color: rgba(0, 0, 0, 0.7);
					font-size: 28rpx;
					text-align: center;
					
				}
			}
		}
	}
}
</style>
