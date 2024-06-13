<template>
	<view class="income">
		<u-navbar leftText="返回" :fixed="true" bgColor="transparent" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#fff" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#fff',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="openSearchPop" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx;color: #fff;">筛选查询</text>
				<u-icon size="30" color="#fff" name="search"></u-icon>

			</view>
		</u-navbar>
		<common-view>
			
		
		<view class="income-top">
			<p class="margin-top-lg">筛选查询结果</p>
			<h1>{{detail.total}}</h1>
			<view class="datas flex align-center justify-between">
				<view class="item">
					<h3>今日收益</h3>
					<h1>{{detail.total_day}}</h1>
				</view>
				<view class="split">

				</view>
				<view class="item">
					<h3>本月收益</h3>
					<h1>{{detail.total_month}}</h1>
				</view>
			</view>
		</view>
		<view class="income-list">
			<view class="item" v-for="(item,index) in list" :key="item.jijuhao">
				<view class="flex align-center mg-33">
					<text class="fs1">SN：</text>
					<text class="fs2">{{item.jijuhao}}</text>
					<image class="copy" @click="$mHelper.h5Copy(item.jijuhao)" src="../../static/images/copy.png"
						mode=""></image>
				</view>
				<view class="flex align-center justify-between mg-24">
					<text class="fs3"> {{item.shname}}</text>
					<text class="text-orange text-lg">+ {{item.shouru}}</text>
				</view>
				<view class="flex align-center justify-between mg-24">
					<text class="fs3">政策 {{item.zcname}}</text>

				</view>
				<view class="flex align-center justify-between">
					<text class="fs3">{{item.frtype}} {{item.frtype && ':'}} {{item.jiaoyijine}} {{item.type}}</text>
					<text class="fs4 text-sm">{{item.jiaoyitime}}</text>
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
		getChenmo_td,
		getChenmo,
		getIncomDetailMap
	} from '@/api/system/user.js'
	import SearchPop from '@/components/search/index.vue'
	export default {
		data() {
			return {
				rightX: 0,
				current: 1,
				list: [],
				paramsMap: {

					qbtype1: {
						zy: {
							api: '/api_mymoney_fenrun_total_zy.ashx',
							name: 'yhh.mymoney_fenrun_total_zy'
						},
						xj: {
							api: '/api_mymoney_fenrun_total_xj.ashx',
							name: 'yhh.mymoney_fenrun_total_xj'
						},
						md: {
							api: '/api_mymoney_fenrun_total_md.ashx',
							name: 'yhh.mymoney_fenrun_total_md'
						},
						mdbt: {
							api: '/api_mymoney_fenrun_total_mdbt.ashx',
							name: 'yhh.mymoney_fenrun_total_mdbt'
						},
						yybt: {
							api: '/api_mymoney_fenrun_total_yybt.ashx',
							name: 'yhh.mymoney_fenrun_total_yybt'
						},
						yybt: {
							api: '/api_mymoney_fenrun_total_yybt.ashx',
							name: 'yhh.mymoney_fenrun_total_yybt'
						},

					},
					qbtype2: {
						zy: {
							api: '/api_mymoney_dabiao_total_zy.ashx',
							name: 'yhh.mymoney_dabiao_total_zy'
						},
						xj: {
							api: '/api_mymoney_dabiao_total_xj.ashx',
							name: 'yhh.mymoney_dabiao_total_xj'
						},
						md: {
							api: '/api_mymoney_dabiao_total_md.ashx',
							name: 'yhh.mymoney_dabiao_total_md'
						},
						mdbt: {
							api: '/api_mymoney_dabiao_total_mdbt.ashx',
							name: 'yhh.mymoney_dabiao_total_mdbt'
						},
						yybt: {
							api: '/api_mymoney_dabiao_total_yybt.ashx',
							name: 'yhh.mymoney_dabiao_total_yybt'
						},
						yybt: {
							api: '/api_mymoney_dabiao_total_yybt.ashx',
							name: 'yhh.mymoney_dabiao_total_yybt'
						},


					},
					qbtype3: {
						zy: {
							api: '/api_mymoney_yajin_total_zy.ashx',
							name: 'yhh.mymoney_yajin_total_zy'
						},
						xj: {
							api: '/api_mymoney_yajin_total_xj.ashx',
							name: 'yhh.mymoney_yajin_total_xj'
						},
						md: {
							api: '/api_mymoney_yajin_total_md.ashx',
							name: 'yhh.mymoney_yajin_total_md'
						},
						mdbt: {
							api: '/api_mymoney_yajin_total_mdbt.ashx',
							name: 'yhh.mymoney_yajin_total_mdbt'
						},
						yybt: {
							api: '/api_mymoney_yajin_total_yybt.ashx',
							name: 'yhh.mymoney_yajin_total_yybt'
						},
						yybt: {
							api: '/api_mymoney_yajin_total_yybt.ashx',
							name: 'yhh.mymoney_yajin_total_yybt'
						},

					},
					qbtype4: {
						zy: {
							api: '/api_mymoney_liuliangka_total_zy.ashx',
							name: 'yhh.mymoney_liuliangka_total_zy'
						},
						xj: {
							api: '/api_mymoney_liuliangka_total_xj.ashx',
							name: 'yhh.mymoney_liuliangka_total_xj'
						},
						md: {
							api: '/api_mymoney_liuliangka_total_md.ashx',
							name: 'yhh.mymoney_liuliangka_total_md'
						},
						mdbt: {
							api: '/api_mymoney_liuliangka_total_mdbt.ashx',
							name: 'yhh.mymoney_liuliangka_total_mdbt'
						},
						yybt: {
							api: '/api_mymoney_liuliangka_total_yybt.ashx',
							name: 'yhh.mymoney_liuliangka_total_yybt'
						},
						yybt: {
							api: '/api_mymoney_liuliangka_total_yybt.ashx',
							name: 'yhh.mymoney_liuliangka_total_yybt'
						},

					}
					
				},
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				params_name: '',
				params_type: '',
				detail: {
					total: 0,
					total_day: 0,
					total_month: 0,
				},
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
		onLoad(params) {
			this.params_name = params.name
			this.params_type = params.type
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
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
		},
		methods: {

			// getList() {
			// 	this.current == 0 ? this.getDirectOpenList() : this.getDirectUnOpenList()
			// },
			getList() {
				getIncomDetailMap({
					url: this.paramsMap[this.params_type][this.params_name].api,
					apiname: this.paramsMap[this.params_type][this.params_name].name,
				}, {
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					this.detail = res

					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					uni.stopPullDownRefresh()
					if (this.page == 1) {
						this.list = res.moneylist
					} else {
						this.list = this.list.concat(res.moneylist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}


				})
			},
			getDirectUnOpenList() {
				getFengkongMap({
					url: this.paramsMap[this.params_name].direct.api,
					apiname: this.paramsMap[this.params_name].direct.name,
				}, {
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
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
			loadmore() {
				if (this.page >= this.pageNumber) {
					this.status = 'nomore';
					return;
				} else {
					this.status = "loading"
				}
				// this.page++; this.pageSize += this.pageSize
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
<style lang="scss">
	page {
		background-color: #F6F5F8;
	}

	.income {
		background: url(data:image/png;base64,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) no-repeat top;
		background-size: 100% 468rpx;

		&-top {
			height: 448rpx;
			text-align: center;
			color: #fff;

			p {
				font-size: 29rpx;
			}

			h1 {
				font-size: 62rpx;
				font-family: 'AlimamaFangYuanTiVF';
			}

			.datas {
				padding: 40rpx 0;

				h3 {
					font-size: 26rpx;
					line-height: 28rpx;
					margin-bottom: 19rpx;
				}

				h1 {
					font-size: 40rpx;
					font-family: 'AlimamaFangYuanTiVF';
					line-height: 35rpx;
				}

				.split {
					width: 1rpx;
					height: 63rpx;
					background: #FFFFFF;
					opacity: 0.5;
				}

				.item {
					width: 48%;
				}
			}
		}

		&-list {
			transform: translateY(-150rpx);
			background: #FFFFFF;
			border-radius: 47rpx;
			width: 90%;
			margin: 0 auto;
			padding: 33rpx 37rpx;

			.item {
				padding: 37rpx 0;
				border-bottom: 1rpx solid #858585;
				line-height: 1;

				.copy {
					width: 22rpx;
					height: 24rpx;
					margin-left: 24rpx;
				}

				.fs1 {
					font-size: 30rpx;
					font-weight: bold;
					;
					color: #000000;

				}

				.fs2 {
					font-size: 31rpx;
					font-family: 'AlimamaFangYuanTiVF';

				}

				.fs3 {
					font-size: 25rpx;
					opacity: 0.8;
					color: #000000;
				}

				.fs4 {
					font-size: 24rpx;
					color: #000000;
					opacity: 0.45;
				}

				.mg-33 {
					margin-bottom: 33rpx;
				}

				.mg-24 {
					margin-bottom: 24rpx;
				}
			}
		}
	}
</style>