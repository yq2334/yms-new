<template>
	<view class="info-pannel" >
		<view class="pannel">
			<view class="cell flex align-center justify-between">
				<view class="left">
					商户编号
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.shinfo.shanghuno}}</text>
					<u--image class="copy margin-left-xs" :showLoading="true"
						@click="copy(merchantInfo.shinfo.shanghuno)" src="/packageA/static/images/copy.png"
						width="25rpx" height="26rpx" mode="aspectFit"></u--image>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					商户姓名
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.shinfo.shname}}</text>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					SN编号
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.shinfo.wlno}}</text>
					<u--image class="copy margin-left-xs" :showLoading="true"
						@click="copy(merchantInfo.shinfo.wlno)" src="/packageA/static/images/copy.png"
						width="25rpx" height="26rpx" mode="aspectFit"></u--image>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					注册时间
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.shinfo.bdtime}}</text>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					状态
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.shinfo.recflgname}}</text>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					活动政策
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.shinfo.zcname}}</text>
				</view>
			</view>
		</view>
		<view class="pannel-title">
			<span>商户费率</span>
			<view class="btn" @click="$tab.navigateTo('/packageA/pages/merchant/edit-fee?shanghuno='+merchantInfo.shinfo.wlno)">
				修改费率
			</view>
		</view>
		<view class="pannel table">
			<view class="cell flex align-center justify-between">
				<view class="left">
					信用卡
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.feilv.daijika || ''}}</text>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					借记卡
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.feilv.jiejika || ''}}</text>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					扫码
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.feilv.saoma || ''}}</text>
				</view>
			</view>
			<view class="cell flex align-center justify-between">
				<view class="left">
					提现费
				</view>
				<view class="right flex align-center">
					<text>{{merchantInfo.feilv.bishu || ''}}</text>
				</view>
			</view>
			<!-- <view class="table-head flex align-center justify-between">
				<view class="">
					卡类型
				</view>
				<view class="">
					T+1
				</view>
				<view class="">
					T+0
				</view>
				<view class="">
					提现费
				</view>
			</view>
			<view class="table-body">
				<view class="flex align-center justify-between" v-for="(item,index) in merchantInfo.fkalist" :key="index">
					<view class="">
						<h3>{{item.type}}</h3>
						<p class="text-xs "></p>
					</view>
					<view class="">
						<p>{{item.t1}}%</p>
						<p class="text-xs "></p>
					</view>
					<view class="">
						{{item.t0}}%
					</view>
					<view class="">
						{{item.tx == 0 ? '--' : `${item.tx}元/笔`}}
					</view>
				</view>
			
			</view> -->
		</view>
		<!-- <view class="pannel-title">
			扫码支付费率
		</view>
		<view class="pannel table">
			<view class="table-head flex align-center justify-between">
				<view class="">
					卡类型
				</view>
				<view class="">
					T+1
				</view>
				<view class="">
					T+0
				</view>
				<view class="">
					提现费
				</view>
			</view>
			<view class="table-body">
				<view class="flex align-center justify-between" v-for="(item,index) in merchantInfo.fewmlist" :key="index">
					<view class="">
						<h3>{{item.type}}</h3>
						<p class="text-xs "></p>
					</view>
					<view class="">
						<p>{{item.t1}}%</p>
						<p class="text-xs "></p>
					</view>
					<view class="">
						{{item.t0}}%
					</view>
					<view class="">
						{{item.tx == 0 ? '--' : `${item.tx}元/笔`}}
					</view>
				</view>
				
			</view>
		</view> -->
	</view>
</template>

<script>
	import {getMerchantInfo} from '@/api/system/user.js'
	export default {
		props: {
			shanghuno: {
				type: Number | String,
				default: ''
			},
		},
		data() {
			return {
				merchantInfo: {
					shinfo: {},
					fkalist: [],
					fewmlist: []
				}
				
			};
		},
		created() {
		
			this.getMerchantInfoData()
		},
		
		methods: {
			getMerchantInfoData() {
				getMerchantInfo({
					 jijuhao: this.shanghuno
				}).then((res) => {
					this.merchantInfo = res
				})
			},
		
			copy(text) {
				// #ifdef H5
				this.$mHelper.h5Copy(text)
				// #endif
				uni.setClipboardData({
					data: text,
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						});
					}
				});

			}
		},
	}
</script>

<style lang="scss" scoped>
	.info-pannel {
			margin-top: 25rpx;

			.pannel {
				background: #FFFFFF;
				border-radius: 12rpx;
				padding: 0 38rpx;
			}

			.pannel-title {
				position: relative;
				font-size: 32rpx;
				color: #000000;
				font-weight: bold;;
				font-weight: bold;
				padding-left: 25rpx;
				margin-top: 48rpx;
				margin-bottom: 23rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn{
					background: linear-gradient(90deg, #FA8E1C, #FABF5A);
					border-radius: 47rpx ;
					color: #FFFFFF;
					font-size: 30rpx ;
					padding: 8rpx 16rpx;
					font-weight: normal;
				}
				&::before {
					position: absolute;
					content: '';
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					width: 6rpx;
					height: 28rpx;
					background: #FA982B;
					border-radius: 3rpx;
				}
			}

			.cell {
				padding: 30rpx 0;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

				&:last-child {
					border-bottom: 0;
				}

				.left {
					color: rgba(27, 27, 27, 0.8);
					font-size: 30rpx;
				}

				.right {
					color: #747474;
					font-size: 30rpx;
				}
			}

			.table {
				&-head {
					padding: 40rpx 0;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					color: rgba(63, 63, 63, 0.8);
					font-size: 28rpx;
					&>view{
						width: 25%;
						text-align: center;
					}
				}

				&-body {
					&>view {
						padding: 40rpx 0;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
						color: #747474;
						font-size: 28rpx;
						font-weight: bold;;
						font-weight: bold;
						&>view{
							width: 25%;
							text-align: center;
						}
					}
				}
			}
		}
</style>
