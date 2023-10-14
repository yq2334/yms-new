<template>
	<view class="reserve">
		<view class="reserve-search">
			<mSearch class="mSearch-input-box" :mode="1" button="inside" :placeholder="'搜索'" @search="doSearch(false)"
				@confirm="doSearch(false)" v-model="keyword"></mSearch>
		</view>
		<view class="reserve-wrapper">
			<view class="left">
				<scroll-view scroll-y="true" class="scrollBox">
					<view :class="menzhen == item.id ? 'active' : ''" class="item" v-for="(item,index) in menzhenList"
						:key="item.id" @tap="changeMenzhen(item)">
						<text class="icon icon-selected"></text>
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view scroll-y="true" class="scrollBox">
					<view @tap="navToDoctor(item)" :class="keshi == item.id ? 'active' : ''" class="item"
						v-for="(item,index) in keshiList" :key="item.id">
						<text class="icon icon-selected"></text>
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/rf-search/rf-search';
	import {
		getDepartment,
	} from '@/api/hospital/index.js';
	export default {
		data() {
			return {
				keyword: '搜索',
				menzhen: 1,
				keshi: 1,
				dataList: [],
				menzhenList: [],
				keshiList: []
			}
		},
		components: {
			mSearch
		},
		onLoad() {
			this.getDepartmentList()
		},
		methods: {
			getDepartmentList() {
				getDepartment().then((res) => {
					this.dataList = res.data
					this.menzhenList = res.data.filter((item) => item.parentId == -1)
					this.keshiList = res.data.filter((item) => this.menzhenList[0].id == item.parentId)
				}).catch((err) => {

				})
			},
			changeMenzhen(item) {
				this.menzhen = item.id
				this.keshiList = this.dataList.filter((menzhen) => item.id == menzhen.parentId)
			},
			// 通用跳转
			navTo(route) {
				if (!route) return;

				this.$mRouter.push({
					route
				});
			},
			navToDoctor(item) {
				uni.navigateTo({
					url: 'reserve-doctor?id=' + item.id + "&name=" + item.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		overflow-y: hidden;
		background-color: #f5f5f5;
	}

	.reserve {
		&-search {
			padding: 20rpx;
			position: fixed;
			width: 100%;

			z-index: 99;
		}

		&-wrapper {
			display: flex;
			padding-top: 80rpx;

			.left {
				width: 40%;

				.scrollBox {
					height: 100vh;
				}

				.item {
					color: #020202;
					font-size: 27rpx;
					font-family: SimHei;
					padding: 30rpx 20rpx 30rpx 76rpx;
					position: relative;

					&.active {
						background: #FFFFFF;

						.icon-selected {
							display: block;
							background: url(../../static/images/selectd.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							left: 25rpx;
						}
					}
				}

			}

			.right {
				width: 60%;

				.scrollBox {
					height: 100vh;
				}

				.item {
					color: #020202;
					font-size: 27rpx;
					font-family: SimHei;
					padding: 30rpx 20rpx 30rpx 76rpx;
					position: relative;
					background: #FFFFFF;
					border-bottom: 1rpx solid #CACACA;
				}
			}
		}
	}
</style>