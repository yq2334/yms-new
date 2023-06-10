<template>
	<view class="payOrder">
		<view class="payOrder-pannel">
			<view class="title">
				交易信息
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="订单号" value="202301010101010101    "></u-cell>
				<u-cell :border="false" size="mini" title="交易号" value="2023010101202020101010101"></u-cell>
				<u-cell :border="false" size="mini" title="交易时间" value="2023-05-23"></u-cell>
				<u-cell :border="false" size="mini" title="类型" value="陈鹏 外科门诊 医生xxx[临床检验20.00] [临床化学检查: 60.00元]">
				</u-cell>
				<u-cell :border="false" size="mini" title="金额" value="￥80.00元 "></u-cell>
				<u-cell :border="false" size="mini" title="状态" value="已确认 已支付"></u-cell>
			</u-cell-group>
		</view>
		<view class="payOrder-pannel">
			<view class="title">
				<text>单据信息</text>
				<text class="fs1">金额（元）</text>
			</view>
			<view class="list">
				<u-row customStyle="margin-bottom: 10px" v-for="(item,index) in 5" :key="index"> 
					<u-col span="4" align="left">
						xxxxx费
					</u-col>
					<u-col span="4" align="center">
						1套
					</u-col>
					<u-col span="4" textAlign="right">
						60.00
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f4f4f4;
	}
	.payOrder {
		&-pannel {
			background: #FFFFFF;
			border-radius: 7rpx;
			margin: 30rpx 10rpx;
			
			.title {
				font-size: 33rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #388CEB;
				padding: 13rpx 0 13rpx 18rpx;
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
			.list{
				padding: 13rpx 18rpx;
			}
		}
	}
	.u-cell-group{
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
		flex: 3;
	}

	/deep/ .u-cell__body {
		padding: 0 30rpx;
	}
</style>
