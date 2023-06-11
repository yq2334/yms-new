<template>
	<view class="reserve-success">
		<view class="reserve-nav">
			<view class="keshi">
				预约挂号成功
			</view>
			<view class="hosp">
				流水号: 就诊日生成
			</view>
		</view>
		<view class="reserve-pannel">
			<view class="title">
				温馨提示
			</view>
			<ul>
				<li>1.请按照挂号时段就诊 (上午不看下午号) ，在就诊时段前15分钟凭缴费详情页到医院挂号科室排队候诊。</li>
				<li>2.呼吸内科、感染科、急症科、血液科、儿科、新生儿科建议诊前测体温。</li>
				<li>3.产科建议诊前测体重。</li>
				<li>4.当班挂号退号退费请线下处理。</li>
				<li>5.如需打印发票，凭就诊流水号或就诊卡至门诊缴费窗口办理。</li>
			</ul>
		</view>
		<view class="reserve-pannel">
			<view class="title">
				就诊信息
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="就诊人" value="202301010101010101    "></u-cell>
				<u-cell :border="false" size="mini" title="就诊时段" value="2023010101202020101010101"></u-cell>
				<u-cell :border="false" size="mini" title="医院名称" value="2023-05-23"></u-cell>
				<u-cell :border="false" size="mini" title="就诊科室" value=" 外科门诊  ">
				</u-cell>
				<u-cell :border="false" size="mini" title="医生姓名" value="陈鹏 "></u-cell>
				<u-cell :border="false" size="mini" title="医生职称" value="医生xxx[临床检验20.00]"></u-cell>
				
			</u-cell-group>
		</view>
		<view class="reserve-pannel">
			<view class="title">
				缴费详情
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" size="mini" title="交易金额" value="202301010101010101    "></u-cell>
				<u-cell :border="false" size="mini" title="医院名称" value="2023010101202020101010101"></u-cell>
				<u-cell :border="false" size="mini" title="医院单号" value="2023-05-23"></u-cell>
				<u-cell :border="false" size="mini" title="平台单号" value="2023010101202020101010101">
				</u-cell>
				<u-cell :border="false" size="mini" title="医生姓名" value="￥80.00元 "></u-cell>
				<u-cell :border="false" size="mini" title="医生职称" value="已确认 已支付"></u-cell>
				<u-cell :border="false" size="mini" title="支付状态" value="￥80.00元 "></u-cell>
				<u-cell :border="false" size="mini" title="支付时间" value="已确认 已支付"></u-cell>
				
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
	.reserve-success {
		.reserve-nav {
			width: 347.33rpx;
			height: 111.33rpx;
			background: url(@/static/images/duobianxing.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 48rpx;

			.keshi {
				font-size: 33.33rpx;
				color: #fff;
				font-weight: bold;
			}

			.hosp {
				color: #0E0E0E;
				font-size: 20rpx;
			}
		}
		.reserve-pannel {
			background: #FFFFFF;
			border-radius: 7rpx;
			margin: 30rpx 10rpx;
			padding: 25rpx 0;
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
			ul{
				padding-left: 15rpx;
				li{
					list-style: none;
					font-size: 20rpx;
					color: #000000;
					line-height: 41.33rpx;
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
