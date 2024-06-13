<template>
	<view class="transfer">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<!-- <view class="search flex align-center" slot="right" @click="openSearchPop()">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view> -->
		</u-navbar>
		<common-view>
			<view class="transfer-content">
				<view class="data-top flex align-center">
					<u--image class="arrow margin-right" :showLoading="true" src="/static/images/file.png" width="38rpx"
						height="45rpx" mode="aspectFit"></u--image>
					<text>回收数量</text>
					<text class="amount">{{list.length}}</text>
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in list" :key="index">
						<view class="no flex margin-bottom">
							<text>SN：{{item.posno}}</text>
							<u--image class="arrow  margin-left-sm" @click="copy(item.posno)" :showLoading="true"
								src="../../static/images/terminal/copy.png" width="30rpx" height="32rpx"
								mode="aspectFit"></u--image>
						</view>
						<view class="margin-bottom">
							回收下级：{{item.xxjdlname}}
						</view>
						<view class="">
							回收时间：{{item.addtime}}
						</view>
					</view>
					<u-loadmore :status="status" @loadmore="loadmore" />
				</view>
			</view>
		</common-view>
		<search-pop ref="searchPop" :columns="columns" @submit="doSearch"></search-pop>
	</view>
</template>

<script>
	import {
		getHuishouDetail
	} from '@/api/system/user.js'
	import SearchPop from '@/components/search/index.vue'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				riqi: '',
				dailishang: '',
				search: {},
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
						type: 'daili',
						label: '归属代理',
						model: 'daili',
						placeholder: '请选择 ',
						isShow: true,
						actions: []
					},
				
					{
						type: 'status',
						label: '状态',
						model: 'status',
						isShow: true,
						placeholder: '请选择',
						actions: []
					},
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
		components: {
			SearchPop
		},
		onLoad(options) {
			console.log()
			// let item = JSON.parse(options.item)
			// this.riqi = item.riqi;
			// this.dailishang = item.dailishang;
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
			uni.startPullDownRefresh({

			})
		},
		methods: {
			getList() {
				getHuishouDetail({
					page: this.page,
					pageSize: this.pageSize,

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
			padding: 18rpx;

			.data-top {
				height: 85rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				padding: 0 36rpx;
				color: #333333;
				font-size: 29rpx;

				.amount {
					font-size: 60rpx;
					font-family: 'AlimamaFangYuanTiVF';
					font-weight: bold;
					margin-left: 11rpx;
				}
			}

			.list {
				.item {
					background: #FFFFFF;
					border-radius: 10rpx;
					padding: 36rpx;
					font-size: 28rpx;
					color: rgba(63, 63, 63, 0.7);
					line-height: 1;
					margin-top: 17rpx;

					.no {
						color: #000000;
						font-size: 28rpx;
						font-family: 'AlimamaFangYuanTiVF';
					}
				}
			}
		}
	}
</style>