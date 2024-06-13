<template>
	<view class="jiju-list">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="openSearchPop()" :style="{marginRight: rightX + 'px'}">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>

			</view>
		</u-navbar>
		<common-view>
			<view class="content">
				<view class="select-list padding-lr">
					<view class="cell flex " v-for="(item,index) in list" :key="index">
						<view class="checkbox flex align-center" @click="handleCheck(item)">
							<view class="checked" v-if="item.checked"></view>
							<view class="uncheck" v-else></view>

						</view>
						<view class="flex flex-direction align-start justify-start margin-left-xl">
							<view class="">
								<text class="">{{item.jijuhao}}</text>
							</view>
							<view class="">
								政策： <text class="margin-left-xl">{{item.zcname}}</text>
							</view>
							<view class="">
								代理：<text class="margin-left-xl">{{item.shangjiname}}</text>
							</view>
						</view>

					</view>
				</view>
				<view class="bottom-pannel flex align-center justify-between">
					<view class="checkbox flex align-center" @click="handleAllCheck">
						<view class="checked" v-if="allSelect == list.length"></view>
						<view class="uncheck" v-else></view>
						<text class="margin-left-sm">全选</text>
					</view>
					<view class="right flex align-center">
						<view class="margin-right">
							<text>回收数量</text>
							<text class="amount">{{allSelect}}</text>
							<text>台</text>
						</view>
						<view class="btn" @click="submit">
							确认回收
						</view>
					</view>
				</view>
				<u-loadmore :status="status" @loadmore="loadmore" />
			</view>
			<search-pop ref="searchPop" :columns="columns" @submit="doSearch"></search-pop>
		</common-view>
	</view>
</template>

<script>
	import {
		getMyHuishouPoslist,
		setSelectHuishou
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
				allSelect: 0,
				isAllSelect: false,
				poslist: [],
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
				
				// 	{
				// 		type: 'status',
				// 		label: '状态',
				// 		model: 'status',
				// 		isShow: true,
				// 		placeholder: '请选择',
				// 		actions: []
				// 	},
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
		onLoad() {
			this.getList()
		},
		onShow() {

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
			getList() {
				getMyHuishouPoslist({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.poslist
					} else {
						this.list = this.list.concat(res.poslist)

					}
					this.list.forEach((item) => {
						item['checked'] = false
					})
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
			handleCheck(item) {

				item.checked = !item.checked
				this.updateSelect()
			},
			updateSelect() {
				this.allSelect = 0;
				this.list.forEach((item) => {
					if (item.checked) {
						this.allSelect++;
					}
				})
			},
			handleAllCheck() {
				this.isAllSelect = !this.isAllSelect
				this.list.forEach((item) => {
					if (this.isAllSelect) {
						item.checked = false
					} else {
						item.checked = true
					}

					this.updateSelect()
				})
			},
			selectAgent() {
				this.$tab.navigateTo('/packageA/pages/agent/query?select=' + this.select_agent.bianhao)
			},
			handleSelectAgent(item) {
				console.log(item)
				this.select_agent = item
			},
			click(item) {
				this.current = item.val
				this.$tab.redirectTo(item.url)
			},
			getPosList() {
				this.poslist = []
				this.list.forEach((item) => {
					if (item.checked) {
						this.poslist.push(item.jijuhao)
					}
				})
			},
			submit() {
				this.getPosList()
				setSelectHuishou({
					dailishang: this.dailishang,
					poslist: this.poslist.join(','),
				}).then((res) => {

					if (res.code == '00') {
						uni.showToast({
							title: '划拨成功',
							icon: 'success'
						})
						setTimeout(() => {
							this.getList()
						}, 2000)
					}
				})
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
	.jiju-list{
		padding-bottom: 112rpx;
	}
	.select-list {
		padding-top: 30rpx;

		.cell {
			font-size: 28rpx;
			font-family: 'AlimamaFangYuanTiVF';
			color: #595959;
			padding: 25rpx;
			margin-bottom: 30rpx;
			background: #FFFAF5;
			box-shadow: 0 0 15rpx 5rpx rgba(114, 130, 138, 0.2);
			// &:nth-child(odd) {
			// 	background: #FFFAF5;
			// 	 box-shadow: 0 0 15rpx 5rpx rgba(114, 130, 138, 0.2);
			// }

			// &:nth-child(even) {
			// 	background: #FFFAF5;
			// }

			.uncheck {
				width: 26rpx;
				height: 26rpx;
				border: 2px solid #595959;
			}

			.checked {
				width: 31rpx;
				height: 29rpx;
				background: url(~@/static/images/checked.png) no-repeat;
				background-size: 100% 100%;
			}

		}
	}

	.bottom-pannel {
		height: 104rpx;
		background: #FA982B;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		padding: 0 44rpx;

		.checkbox {
			font-size: 36rpx;
			color: #F2F6F9;
		}

		.uncheck {
			width: 26rpx;
			height: 26rpx;
			border: 2px solid #fff;
		}

		.checked {
			width: 31rpx;
			height: 29rpx;
			background: url(~@/static/images/checked-white.png) no-repeat;
			background-size: 100% 100%;
		}

		.right {
			font-size: 28rpx;
			color: #F2F6F9;

			.amount {
				font-size: 48rpx;

			}

			.btn {
				width: 198rpx;
				height: 52rpx;
				background: linear-gradient(-44deg, #FF665E, #F34F47);
				border-radius: 25rpx;
				text-align: center;
				line-height: 52rpx;
				font-size: 36rpx;
				color: #F2F6F9;

			}
		}
	}
</style>