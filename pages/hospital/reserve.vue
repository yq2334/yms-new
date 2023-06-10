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
					<view @tap="navToDoctor(item)" :class="keshi == item.id ? 'active' : ''" class="item" v-for="(item,index) in keshiList"
						:key="item.id">
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
	export default {
		data() {
			return {
				keyword: '搜索',
				menzhen: 1,
				keshi: 1,
				menzhenList: [{
						name: '内科',
						id: 1
					},
					{
						name: '内科',
						id: 2
					},
					{
						name: '外科',
						id: 3
					},
					{
						name: '呼吸/咳嗽/哮喘/肺结节肺癌门诊',
						id: 4
					},
					{
						name: '内科',
						id: 5
					},
					{
						name: '内科',
						id: 6
					},
					{
						name: '外科',
						id: 7
					},
					{
						name: '呼吸/咳嗽/哮喘/肺结节肺癌门诊',
						id: 8
					},
					{
						name: '内科',
						id: 9
					},
					{
						name: '内科',
						id: 10
					},
					{
						name: '外科',
						id: 11
					},
					{
						name: '呼吸/咳嗽/哮喘/肺结节肺癌门诊',
						id: 12
					},
					{
						name: '内科',
						id: 13
					},
					{
						name: '内科',
						id: 14
					},
					{
						name: '外科',
						id: 15
					},
					{
						name: '呼吸/咳嗽/哮喘/肺结节肺癌门诊',
						id: 16
					}
				],
				keshiList: [{
						name: '风湿免疫科  ',
						id: 1
					},
					{
						name: ' 消化内科 ',
						id: 2
					},
					{
						name: ' 血液内科',
						id: 3
					}
				]
			}
		},
		components: {
			mSearch
		},
		methods: {
			changeMenzhen(item) {
				this.menzhen = item.id
			},
			// 通用跳转
			navTo(route) {
				if (!route) return;
			
				this.$mRouter.push({
					route
				});
			},
			navToDoctor(item){
				uni.navigateTo({
					url:'reserve-doctor?id='+item.id
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
