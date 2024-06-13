<template>
	<view class="day-list">
		<u-navbar leftText="返回" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right" @click="show=true">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>
		
			</view>
		</u-navbar>
		<common-view>
			<view class="top shadow flex align-center justify-between">
				<view class="left">
					<text class="margin-right-sm">2023-12</text>
					<text>合计：</text>
				</view>
				<view class="right">
					7456908.21
				</view>
			</view>
			<view class="table-head flex align-center justify-around">
				<view class="">
					代理商
				</view>
				<view class="">
					政策
				</view>
				<view class="">
					交易
				</view>
			</view>
			<view class="table-body">
				<view class="table-td flex align-center justify-around" v-for="(item,index) in 5" :key="index">
					<view class="">
						深圳汇通至信科技
					</view>
					<view class="">
						2023HTZX
					</view>
					<view class="">
						7456908.21
					</view>
				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #F6F5F8 ;
	}
</style>
<style lang="scss" scoped>
.day-list{
	.content{
		padding: 23rpx;
		.top{
			height: 83rpx;
			background: linear-gradient(130deg, #FA982B, #FFC079);
			box-shadow: 6upx 6upx 8upx rgba(217, 109, 26, 0.2);
			border-radius: 16rpx;
			color: #fff;
			padding: 0 20rpx;
			
			.left{
				font-size: 29rpx;
			}
			.right{
				font-size: 45rpx;
				font-weight: bold;
			}
		}
		.table-head{
			background: linear-gradient(180deg, #EAEAEA, #FEFEFE);
			border-radius: 10rpx;
			margin-top: 30rpx;
			&>view{
				
				height: 69rpx;
				line-height: 69rpx;
				flex: 1;
				color: #000000;
				font-size: 28rpx;
				text-align: center;
			}
		}
		.table-body{
			margin-top: 20rpx;
			.table-td{
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				padding: 0 20rpx;
				&>view{
					height: 69rpx;
					line-height: 69rpx;
					flex: 1;
					color: rgba(0, 0, 0, 0.7);
					font-size: 28rpx;
					text-align: center;
					
				}
			}
		}
	}
}
</style>
