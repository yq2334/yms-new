<template>
	<view class="">
		
		
		<view class="date-list" >
			<view class="item margin-top-sm" v-for="(item,index) in list" :key="index">
				<view class="flex align-center justify-between margin-bottom-xs">
					<view class="left">
						<h3>{{item.jiaoyitype}}</h3>
						<p>{{item.jiaoyitime}}</p>
					</view>
					<view class="right ">
						<h1>{{item.jiaoyi_jine}}</h1>
						<p class="">（手续费{{item.shouxufei}}）</p>
					</view>
				</view>
					
			</view>
			
		</view>
		<u-loadmore :status="status" @loadmore="loadmore" />
	</view>
</template>

<script>
	import {
		getMerchantRptdayDetailList
	} from '@/api/system/user.js'
	export default {
		props: {
			shanghuno: {
				type: Number | String,
				default: ''
			},
			riqi: {
				type:  String,
				default: ''
			},
		},
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
			};
		},
		created() {
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
			getList() {
				getMerchantRptdayDetailList({
					page: this.page,
					pageSize: this.pageSize,
					jijuhao: this.shanghuno,
					riqi: this.riqi
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.rptdaylist
					} else {
						this.list = this.list.concat(res.rptdaylist)

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
		},
	}
</script>

<style lang="scss" scoped>
	.date-list {
		padding: 0 30rpx;
		background: #FFFFFF;
		border-radius: 12rpx;

		.item {

			padding: 15rpx 0 20rpx 0;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);


			.left {
				h3 {
					font-size: 29rpx;
					color: #545454;

				}

				p {
					color: #545454;
					font-size: 22rpx;
				}
			}

			.right {
				h1 {
					font-size: 34rpx;
					color: #747474;

				}

				p {
					color: #747474;
					font-size: 22rpx;
				}
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
</style>