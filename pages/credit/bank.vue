<template>
	<view class="credit-bank">
		<view class="credit-warpper">
			<view class="title">
				授信银行
			</view>
			<view class="content">
				<u-grid :border="false" col="3">
					<u-grid-item v-for="(item,index) in bankList" :key="index">
						<view class="yh">
							<view class="yh-top">
								<u--image :src="item.img" width="80rpx" height="80rpx"></u--image>
								<text>{{item.name}}</text>
							</view>
							<view class="yh-bottom">
								<text>{{item.status | statusName}}</text>
							</view>
						</view>
					</u-grid-item>
				</u-grid>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankList: [{
						name: '建设银行',
						status: 0,
						img: '../../static/images/bank/jsyh.png'
					},
					{
						name: '交通银行',
						status: 0,
						img: '../../static/images/bank/jtyh.png'
					},
					{
						name: '长沙银行',
						status: 0,
						img: '../../static/images/bank/csyh.png'
					},
					
					{
						name: '中国银行',
						status: 1,
						img: '../../static/images/bank/zgyh.png'
					},
					{
						name: '招商银行',
						status: 1,
						img: '../../static/images/bank/zsyh.png'
					},
					{
						name: '民生银行',
						status: 1,
						img: '../../static/images/bank/msyh.png'
					},
					{
						name: '农业银行',
						status: 1,
						img: '../../static/images/bank/nyyh.png'
					}
				]
			}
		},
		filters: {
			statusName: function(value) {
				switch (value) {
					case 0:
						return '即将上线'
						break;
					case 1:
						return '敬请期待'
						break;
					default:
						return '敬请期待'
						break;
				}

			}
		},
		methods: {
			navTo(route) {
				if (!route) return;

				uni.navigateTo({
					url: route
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.credit-warpper {
		background: #FFFFFF;
		border: 1px solid #315ACE;
		border-radius: 7rpx;
		margin: 40rpx 20rpx 0 20rpx;

		.title {
			background-color: #4095E5;
			padding: 15rpx 22rpx;
			color: #FFFEFE;
		}

		.content {
			padding: 35rpx 0;

			.yh {
				background-color: #ACD0FF;
				border-radius: 7rpx;
				margin: 0 auto;
				width: 80%;

				&-top {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-top: 30rpx;
					padding-bottom: 5rpx;
					line-height: 2;
				}

				&-bottom {
					background-color: #4095E5;
					text-align: center;

					font-size: 33rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #FFFFFF;
				}
			}
		}
	}

	/deep/ .u-grid-item {
		margin-bottom: 46rpx;
	}
</style>