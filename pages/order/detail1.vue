<template>
	<view class="fee-detail">
		<view class="wrapper">
			<view class="title">
				护理
			</view>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text>名称： </text>
				</u-col>
				<u-col span="4">
					I级护理（xxxx）

				</u-col>
			</u-row>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text>规格： </text>
				</u-col>
				<u-col span="4">
					规格：/ 
			
				</u-col>
			</u-row>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text> 数量/单位： </text>
				</u-col>
				<u-col span="4">
					数量/单位：1/项
				</u-col>
			</u-row>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text> 计价金额： </text>
				</u-col>
				<u-col span="4">
					100.00
				</u-col>
			</u-row>
		</view>
		<view class="wrapper">
			<view class="title">
				化验
			</view>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text>名称： </text>
				</u-col>
				<u-col span="4">
					I级护理（xxxx）
		
				</u-col>
			</u-row>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text>规格： </text>
				</u-col>
				<u-col span="4">
					规格：/ 
			
				</u-col>
			</u-row>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text> 数量/单位： </text>
				</u-col>
				<u-col span="4">
					数量/单位：1/项
				</u-col>
			</u-row>
			<u-row justify="center" customStyle="margin-bottom: 10px">
				<u-col span="4">
					<text> 计价金额： </text>
				</u-col>
				<u-col span="4">
					100.00
				</u-col>
			</u-row>
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
	.fee-detail{
		.wrapper{
			margin: 30rpx;
			background: #FFFFFF;
			border: 1px solid #315ACE;
			border-radius: 7rpx;
			.title{
				width: 299rpx;
				height: 65rpx;
				background: #4095E5;
				border-radius: 6rpx 6rpx 58rpx 59rpx;
				margin: 0 auto;
				color: #FEFEFE;
				font-size: 33rpx;
				text-align: center;
				line-height: 65rpx;
				margin-bottom: 27rpx;
			}
			text{
				color: #000000;
				font-size: 27rpx;
			}
		}
	}

</style>
