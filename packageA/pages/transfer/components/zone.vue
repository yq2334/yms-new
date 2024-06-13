<template>
	<view class="padding-lr operate">
		<view class="flex align-center item margin-bottom-sm">
			<view class="tag">
				代理商
			</view>
			<u--input placeholder="请选择下级代理" fontSize="18" color="#3F3F3F" border="none">
			</u--input>
			<u-icon size="25" color="#3D3D3D" name="arrow-down"></u-icon>
		</view>
		<view class="flex align-center item margin-bottom-sm">
			<view class="tag">
				起始SN
			</view>
			<u--input placeholder="请选择起始机具号" fontSize="18" color="#3F3F3F" border="none">
			</u--input>
			<u--image :showLoading="true" src="/static/images/scan.png" width="40rpx" height="40rpx"
				mode="aspectFit"></u--image>
		</view>
		<view class="flex align-center item margin-bottom-sm">
			<view class="tag">
				截止SN
			</view>
			<u--input placeholder="请选择截止机具号" fontSize="18" color="#3F3F3F" border="none">
			</u--input>
			<u--image :showLoading="true" src="/static/images/scan.png" width="40rpx" height="40rpx"
				mode="aspectFit"></u--image>
		</view>
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

<style lang="scss" scoped>
	.operate {
		margin-top: 52rpx;

		.item {
			padding: 6rpx 33rpx 6rpx 8rpx;
			background: #FFFFFF;
			border-radius: 10rpx;

		}

		.tag {
			width: 190rpx;
			height: 72rpx;
			background: #FA982B;
			border-radius: 10rpx;
			font-size: 28rpx;
			color: #F2F6F9;
			line-height: 72rpx;
			text-align: center;
			margin-right: 26rpx;
		}
	}
</style>