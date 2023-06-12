<template>
	<view class="about-container">
		<view class="header-section text-center">
			<image style="width: 386rpx;height: 386rpx;" src="@/static/logo.png" mode="widthFix">
			</image>
			<uni-title title="医疗+信用服务平台" color="#000000"></uni-title>
			<uni-title :title="'v'+ version" color="#000000"></uni-title>
		</view>

		<view class="content-section">
			<u-cell-group :border="false">
				<u-cell title="版本更新"  :isLink="true" url="/pages/mine/update/index"></u-cell>
				<u-cell title="信用医疗服务协议" :isLink="true" url="/pages/mine/auth/index"></u-cell>
				<u-cell title="用户隐私协议" :isLink="true" url="/pages/mine/auth/service"></u-cell>
				<u-cell title="注销账号" :isLink="true" url="/pages/mine/auth/logout"></u-cell>
			</u-cell-group>
			
		</view>

	<!-- 	<view class="copyright">
			<view>Copyright &copy; 2023 <uni-link :href="siteUrl" text="zradmin" showUnderLine="false"></uni-link> All
				Rights Reserved.</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteUrl: getApp().globalData.config.appInfo.site_url,
				version: '' //getApp().globalData.config.appInfo.version
			}
		},
		onLoad() {
			this.version = uni.getSystemInfoSync().appVersion
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.content-section{
		padding-top: 150rpx;
	}
	.copyright {
		margin-top: 50rpx;
		text-align: center;
		line-height: 60rpx;
		color: #999;
	}

	.header-section {
		display: flex;
		padding: 30rpx 0 0;
		flex-direction: column;
		align-items: center;
	}

	.menu-list .menu-item-box .text-right {
		color: #000000;
		font-size: 40rpx;
	}

	/deep/ .uni-title__box {
		padding: 5rpx 0;
	}

	/deep/ .uni-title__base {
		font-weight: normal;
		font-size: 33rpx;
	}
	/deep/ .u-cell__title-text[data-v-1c4434ae]{
		color: #000;
		font-size: 33rpx;
	}
	/deep/ .u-line[data-v-727e452e]{
		border-color: #315ACE !important;
	}
	/deep/ .u-icon__icon--info[data-v-2ee87dc9]{
		color: #3D3D3D;
	}
</style>
