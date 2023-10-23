<template>
	<view class="detail-table">
		<view class="table">
			<u-row justify="space-between" customStyle="margin-bottom: 10px" class="table-title" >
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
			<u-row justify="space-between" customStyle="margin-bottom: 10px" class="table-body"
				v-for="(item,index) in list" :key="index">
				<u-col span="3">
					<text>{{item.bedNo}}床 {{item.name}}</text>
				</u-col>

				<u-col span="3" textAlign="center">
					<text>{{item.cost}}</text>
				</u-col>
				<u-col span="3" textAlign="center">
					<text>{{item.billDate}}</text>
				</u-col>
				<u-col span="3" textAlign="center" @click="navToDetail(item)">
					<u-button type="primary" text="详情" size="mini"></u-button>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import {getInpCostDailyItemList} from '@/api/hospital/index.js'
	export default {
		data() {
			return {
				id: '',
				list: []
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getList()
		},
		methods: {
			getList() {
				getInpCostDailyItemList({
					admisId: this.id
				}).then((res) => {
					this.list = res.data	
				}).catch((err) => {
					
				})
			},
			navToDetail(item) {
				
				uni.navigateTo({
					url: '/pages/order/detail1?billId='+item.billId
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.detail-table {
		.table {
			background: #FFFFFF;
			border-radius: 7rpx;
			margin: 0 15rpx 30rpx 15rpx;
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