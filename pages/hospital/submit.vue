<template>
	<view class="submit-reserve">
		<view class="countdown">
			请在
			<u-count-down :time="15  * 60 * 1000" format="mm:ss"></u-count-down>
			内完成支付
		</view>
		<view class="p ">
			<text class="fs1"> 支付金额（元） </text>
			<text class="fs2"> 18.00 </text>
		</view>
		<view class="">
			<u-cell-group>
				<u-cell title="医院名称" value="长沙县星沙医院" :titleStyle="titleStyle"></u-cell>
				<u-cell title="费用类型" value="预约挂号" :titleStyle="titleStyle"></u-cell>
				<u-cell title="就诊科室" value="风湿免疫科" :titleStyle="titleStyle"></u-cell>
				<u-cell title="医生名称" value="陈鹏" :titleStyle="titleStyle"></u-cell>
				<u-cell title="就诊日期" value="2023-05-01 星期二 " :titleStyle="titleStyle"></u-cell>
				<u-cell title="就诊时段" value="上午08：30——09:00" :titleStyle="titleStyle"></u-cell>

			</u-cell-group>
			<view class="select-pay">
				<view class="title">
					请选择支付方式
				</view>
				<view class="pay-list">
					<view class="item">
						<text>信用支付</text>
						<u--image  src="../../static/images/pay-credient.png" width="65rpx" height="55rpx" ></u--image>
						<u-gap height="10" ></u-gap>
						<u-checkbox v-model="checked" shape="square" label=""></u-checkbox>
					</view>
					<view class="item">
						<text>微信支付</text>
						<u--image  src="../../static/images/pay-weixin.png" width="58rpx" height="50rpx" ></u--image>
						<u-gap height="10" ></u-gap>
						<u-checkbox v-model="checked" shape="square" label=""></u-checkbox>
					</view>
					<view class="item">
						<text>信用支付</text>
						<u--image  src="../../static/images/pay-ali.png" width="58rpx" height="58rpx" ></u--image>
						<u-gap height="10" ></u-gap>
						<u-checkbox v-model="checked" shape="square" label=""></u-checkbox>
					</view>
				</view>
			</view>
			<u-button @tap="navTo('submit')" type="primary" color="#388CEB" size="large" text="确认支付">
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					'color': '#7F8081',
					'fontsize': '27rpx'
				},
				checked: true
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.submit-reserve {
		.countdown {
			height: 78rpx;
			background: #388CEB;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #FFFFFF;

		}

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
	}
	.select-pay{
		padding: 0 45rpx;
		.title{
			font-size: 27rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #7F8081;
			line-height: 81rpx;
		}
		.pay-list{
			display: flex;
			align-items: center;
			.item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 25%;
				color: #030303;
				font-size: 27rpx;
				font-family: Adobe Heiti Std;
				
			}
		}
	}
	/deep/ .u-count-down__text {
		color: #FFFFFF;
		font-size: 33rpx;
	}
	/deep/ .u-cell__value {
		color: #030303;
		font-size: 27rpx;
	}
	/deep/ .u-button--large {
		margin-top: 150rpx;
		height: 67rpx;
		background: #388CEB;
		border-radius: 7rpx;
		color: #FFFCFC;
		font-size: 27rpx;
	}
</style>
