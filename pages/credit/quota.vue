<template>
	<view class="creditt-quota">
		<view class="swiper">
			<swiper autoplay="true">
				<swiper-item>
					<view class="swiper-item">
						<image :src="banner" mode="aspectFill" />
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image :src="banner" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="wrapper">
			<view class="title">
				缴费不排队，先就医后付费，享专项额度
			</view>
			<view class="list">
				<view class="item">
					<u--image src="../../static/images/sign.png" width="127rpx" height="127rpx">
					</u--image>

				</view>
				<view class="join">
					<text class="dot"></text>
					<text class="dot"></text>
					<text class="dot"></text>
				</view>
				<view class="item">
					<u--image src="../../static/images/yibao.png" width="127rpx" height="127rpx">
					</u--image>

				</view>
				<view class="join">
					<text class="dot"></text>
					<text class="dot"></text>
					<text class="dot"></text>
				</view>
				<view class="item">
					<u--image src="../../static/images/card.png" width="127rpx" height="127rpx">
					</u--image>

				</view>
				<view class="join">
					<text class="dot"></text>
					<text class="dot"></text>
					<text class="dot"></text>
				</view>
				<view class="item">
					<u--image src="../../static/images/qianbao.png" width="127rpx" height="127rpx">
					</u--image>

				</view>
			</view>
			<view class="list list2">
				<view class="item">

					<text>1.在本页完成 银行签约</text>
				</view>

				<view class="item">

					<text>2.就医刷医保 卡或电子凭证</text>
				</view>

				<view class="item">

					<text>3.自费部分自动扣款</text>
				</view>

				<view class="item">

					<text>4.离院还款(信用卡)</text>
				</view>

			</view>
			<view class="btn-box">
				<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB" text="去签约">
				</u-button>
				<u-button @tap="navTo('pay-order')" type="primary" color="#388CEB" text="去还款">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import banner from '@/static/images/banner1.png'

	export default {
		data() {
			return {
				banner
			}
		},
		methods: {
			navTo(route) {
				if (!route) return;

				uni.navigateTo({
					url: route
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.swiper {
		margin: 25rpx 0;

		.swiper-item {
			height: 100%;
		}
	}

	.wrapper {
		padding: 0 28rpx;
	}

	.title {
		color: #070707;
		font-size: 27rpx;
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 37rpx;

		.item {
			font-size: 20rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #070707;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			width: 20%;
		}

		.join {
			width: calc(20% / 3);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.dot {
				display: inline-block;
				width: 11rpx;
				height: 11rpx;
				background: #FFDEBB;
				border-radius: 50%;
			}
		}

	}

	.list2 {
		padding-top: 20rpx;

		.item {
			width: 23%;
			line-height: 1.5;
		}
	}

	.btn-box {
		margin-top: 150rpx;
	}

	/deep/ .u-button {

		width: 420rpx;
		height: 80rpx;
		background: linear-gradient(0deg, #1296DB 0%, #AFE8FB 100%);
		border-radius: 7rpx;
		color: #FFFFFF;
		font-size: 33rpx;
		border-width: 0 !important;
		margin-top: 43rpx;
	}
</style>
