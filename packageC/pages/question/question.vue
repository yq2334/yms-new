<template>
	<view class="notice">
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="">
			<view class="notice-content">
				<view class="list">
					<view class="item flex align-center justify-between" v-for="(item,index) in list" :key="index"
						@click="$tab.navigateTo('/packageC/pages/question/detail?id='+item.Id)">
						<view class="flex align-center">
							<view class="msg margin-right-sm">
								<u--image class="arrow " :showLoading="true" src="/static/images/msg.png" width="28rpx"
									height="27rpx" mode="aspectFit"></u--image>
							</view>
							<text>{{item.title}}</text>
						</view>
						<u-icon class="margin-left-sm" color="#696969" size="18" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getQadList
	} from "@/api/system/user.js"
	import {
		getToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				getQadList().then((res) => {
					console.log(res)
					this.list = res.newslist
				})
			}
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" scoped>
	page {
		background-color: #F8F8F8;
	}

	.notice {
		&-content {
			padding: 41rpx 22rpx;

			.list {
				background: #FFFFFF;
				box-shadow: inset 0rpx 45rpx 110rpx 0rpx rgba(250, 197, 98, 0.35);
				border-radius: 17rpx;
				padding: 0 44rpx;

				.item {
					color: #282828;
					font-size: 29rpx;
					font-weight: bold;
					;
					padding: 29rpx 0;
					border-bottom: 1rpx solid rgba(169, 169, 169, 0.3);

					.msg {
						width: 47rpx;
						height: 47rpx;
						background: linear-gradient(-10deg, rgba(255, 153, 95, 0.9), rgba(255, 115, 36, 0.9));
						box-shadow: 2rpx 2rpx 4rpx 0rpx #141414;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>