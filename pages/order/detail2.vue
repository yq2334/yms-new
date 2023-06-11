<template>
	<view class="detail-table">
		<view class="table">
			<u-row justify="space-between" customStyle="margin-bottom: 10px" class="table-title">
				<u-col span="3">
					<text>姓名</text>
				</u-col>
				<u-col span="3" textAlign="center">
					<text>费用</text>
				</u-col>
				<u-col span="3" textAlign="center">
					<text>清单日期</text>
				</u-col>
				<u-col span="3" textAlign="center">
					<text>操作 </text>
				</u-col>
			</u-row>
			<u-row justify="space-between" customStyle="margin-bottom: 10px" class="table-body" v-for="(item,index) in 4" :key="index">
				<u-col span="3">
					<text>62床 王小虎</text>
				</u-col>
				
				<u-col span="3" textAlign="center">
					<text>00.00</text>
				</u-col>
				<u-col span="3" textAlign="center">
					<text>2023-05-01</text>
				</u-col>
				<u-col span="3" textAlign="center">
					<u-button type="primary" text="详情" size="mini"></u-button>
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
	.detail-table {
		.table {
			background: #FFFFFF;
			border-radius: 7rpx;
			margin:0 15rpx 30rpx 15rpx;
			padding-bottom: 64rpx;
			&-title {
				padding: 20rpx 0 20rpx 37rpx;
				border-bottom: 1rpx solid #8A8A8A;
			}

			&-body {
				color: #000000;
				font-size: 20rpx;
				padding-left: 40rpx;
				margin-bottom: 35rpx !important;
			}
		}
	}

	/deep/ .u-button--mini {
		max-width: 84rpx;
		height: 30rpx;
	}
</style>
