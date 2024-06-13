<template>
	<view class="">
		<view class="month-list">
			<view class="item flex align-center justify-between" v-for="(item,index) in list" :key="index" @click="clickItem(item)">
				<view class="left">
					{{item.nianyue}}
				</view>
				<view class="right flex align-center">
					<view class="">
						{{item.jine}}<text>元</text>
					</view>
					<u-icon size="15" color="#3D3D3D" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" @loadmore="loadmore" />
	</view>
</template>

<script>
	import {
		getMerchantRptMonthList
	} from '@/api/system/user.js'
	export default {
		props: {
			shanghuno: {
				type: Number | String,
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
			getList(search) {
				getMerchantRptMonthList({
					page: this.page,
					pageSize: this.pageSize,
					 jijuhao: this.shanghuno,
					nianyue: search ? search.nianyue : '',
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
			clickItem(item) {
				this.$emit('clickItem',item)
			}
		},
	}
</script>

<style lang="scss" scoped>
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