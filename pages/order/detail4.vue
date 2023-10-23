<template>
	<view class="payOrder">
		<view class="userInfo">
			<view class="left">
				<u-row>
					<u-col span="3">
						<u-avatar v-if="detail.headImg" :src="detail.headImg"></u-avatar>
						<u-avatar v-else :src="'../../static/images/avatar.png'"></u-avatar>
						<!-- <u--image :src="'../../static/images/avatar.png'" width="85rpx" height="85rpx"></u--image> -->
					</u-col>
					<u-col span="12">
						<text>{{detail.patName}} | {{detail.patIdNo}} </text>
					</u-col>
				</u-row>
			</view>

		</view>
		<view class="payOrder-pannel">
			<view class="title">
				<text>费用类别</text>
				
				<text class="fs1" v-if="detail.payStatus == 1">已支付</text>
				<text class="fs1" v-if="detail.payStatus == 0">未支付</text>
				<text class="fs1" v-if="detail.payStatus == -1">已退费</text>
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="住院日期      " :value="`${detail.admisDate}-${detail.disDate}`"></u-cell>
				<u-cell :border="false" size="mini" title="住院天数" :value="detail.days"></u-cell>
				<u-cell :border="false" size="mini" title="就诊医院" :value="detail.hospitalName"></u-cell>
				<u-cell :border="false" size="mini" title="住院号" :value="detail.visitNo">
				</u-cell>
				<u-cell :border="false" size="mini" title="缴费总额" :value="`￥${detail.billTotalCost}`"></u-cell>
				<u-cell :border="false" size="mini" title="医保支付" :value="`￥${detail.billMedPay}`"></u-cell>
				<u-cell :border="false" size="mini" title="医保个账支付" :value="`￥${detail.billSelfPay}` ">
				</u-cell>
				<u-cell :border="false" size="mini" title="个人支付" :value="`￥${detail.billTotalCost - detail.billMedPay - detail.billSelfPay}`">
				</u-cell>
			</u-cell-group>
			<view class="bt">
				<u--image :src="'../../static/images/warn.png'" width="28rpx" height="28rpx"></u--image>
				<text>注 :医保支付包括不限于基本医疗保险统筹基金、公务员医疗补助资金、大病保险资金等</text>
			</view>
		</view>
		<view class="payOrder-pannel">
			<view class="title">
				<text>费用类别</text>
				<text class="fs1">金额（元）</text>
			</view>
			<u-cell-group :border="false">
				<u-cell v-for="(item, index) in detail.costTypeList" :key="index" :border="false" size="mini" :title="item.name " :value="item.cost"></u-cell>
				

			</u-cell-group>
			<u-button @tap="navToDetail()" type="primary" color="#388CEB" size="large" text="查看详情">
			</u-button>
		</view>
	</view>
</template>

<script>
	import {getInpAdmisListDetail} from '@/api/hospital/index.js'
	export default {
		data() {
			return {
				id: '',
				list: [],
				detail: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getList()
		},
		methods: {
			getList() {
				getInpAdmisListDetail({
					billId: this.id
				}).then((res) => {
					this.detail = res.data
				})
			},
			// 通用跳转
			navToDetail() {
				uni.navigateTo({
					url: '/pages/order/detail3?billId='+ this.id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f4f4f4;
	}

	.payOrder {
		.userInfo {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15rpx 22rpx;
			background-color: #fff;

			.left {
				display: flex;
				align-items: center;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #010101;

			}

			.right {
				padding-right: 22rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #0179DC;
			}
		}

		.fs1 {
			color: #000000;
			font-size: 33rpx;
		}

		.fs2 {
			color: #388CEB;
			font-size: 40rpx;
		}

		.fs3 {
			color: #388CEB;
			font-size: 20rpx;
		}


		&-pannel {
			background: #FFFFFF;
			border-radius: 7rpx;
			margin: 30rpx 10rpx;

			.title {
				font-size: 33rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #388CEB;
				padding: 13rpx 13rpx 13rpx 18rpx;
				border-bottom: 1rpx solid #8A8A8A;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.fs1 {
					font-size: 27rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #000000;
				}
			}

			.list {
				padding: 13rpx 18rpx;
			}

			.bt {
				font-size: 20rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #E93030;
				padding: 25rpx 20rpx;
				border-top: 1rpx solid #8A8A8A;
				display: flex;
				line-height: 1;

				text {
					padding-left: 15rpx;
				}
			}
		}
	}

	.u-cell-group {
		margin-top: 10rpx;
	}

	/deep/ .u-cell__title-text {
		font-size: 20rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #7F8081;

	}

	/deep/ .u-cell__value {
		font-size: 20rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #030303;
		flex: 2;
	}

	/deep/ .u-cell__body {
		padding: 0 30rpx;
	}

	/deep/ .u-button--large {
		margin-top: 50rpx;
		height: 67rpx;
		background: #388CEB;
		border-radius: 7rpx;
		color: #FFFCFC;
		font-size: 27rpx;
	}
</style>