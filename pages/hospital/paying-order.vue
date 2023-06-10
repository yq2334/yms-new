<template>
	<view class="payOrder">
		<view class="p">
			<text class="fs1"> 支付金额（元） </text>
			<text class="fs2"> 18.00 </text>
		</view>
		<view class="payOrder-pannel">
			<view class="title">
				交易信息
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="缴费时间      " value="202301010101010101    "></u-cell>
				<u-cell :border="false" size="mini" title="就诊医院" value="2023010101202020101010101"></u-cell>
				<u-cell :border="false" size="mini" title="就诊科室" value="2023-05-23"></u-cell>
				<u-cell :border="false" size="mini" title="缴费总额" value="陈鹏 外科门诊 医生xxx[临床检验20.00] [临床化学检查: 60.00元]">
				</u-cell>
				<u-cell :border="false" size="mini" title="医保支付" value="￥80.00元 "></u-cell>
				<u-cell :border="false" size="mini" title="个人支付" value="已确认 已支付"></u-cell>
				<u-cell :border="false" size="mini" title="个人实付">
					<text slot="value" class="fs3">99</text>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="payOrder-pannel">
			<view class="title">
				<text>费用明细</text>
				<text class="fs1">金额（元）</text>
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="已缴明细" value="60.00"></u-cell>
				<u-cell :border="false" size="mini" title="挂号费[1/次]" value=" 60.00"></u-cell>
				<u-cell :border="false" size="mini" title="xxxxxx胶囊[0.2g*30粒" value=" 60.00"></u-cell>
				<u-cell :border="false" size="mini" title="xxx门服液[1/支*30] " value=" 60.00元">
				</u-cell>
				
			</u-cell-group>
			<view class="bt">
				医保费用: 525      个人自费: 22.8元
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="退费明细 " value=""></u-cell>
				<u-cell :border="false" size="mini" title="xxx胶囊[0.2g*60粒]" value=" 60.00"></u-cell>
				
				
			</u-cell-group>
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
	page {
		background-color: #f4f4f4;
	}

	.payOrder {
		.p {
			text-align: center;
			padding: 40rpx 0 44rpx 0;

			text {
				display: block;
				line-height: 60rpx;
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

			.list {
				padding: 13rpx 18rpx;
			}
			.bt{
				font-size: 27rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #000000;
				padding: 25rpx 0;
				text-align: right;
				border-bottom: 1rpx solid #8A8A8A;
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
</style>
