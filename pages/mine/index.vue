<template>
	<view class="mine-container">
		<!--顶部个人信息栏-->
		 
		<view class="header-section btn" :style="{'padding-top':statusBarHeight + 'px'}">
			<!-- <u-navbar
			         title="我的账户"
			         @rightClick="rightClick"
			         :autoBack="false"
					 leftIcon=""
					 bgColor="transparent"
					 :titleStyle="{'fontSize': '33rpx'}"
			     >
			     </u-navbar> -->
			<view class="user-section">
				<view class="user-wrapper">
					<view class="user-info-box">
						<view class="portrait-box" @tap="navTo(userInfo ? '/pages/user/userinfo/userinfo' : 'login')">
							<image class="portrait" src="../../static/images/avatar.png"></image>
							<text class="username">
								信用用户 
							</text>
						</view>
						<view class="portrait-indent">
							我的信用
							<text class="icon icon-arrow"></text>
						</view>
					</view>
					<view class="tag-wrapper">
						<text>已实名 </text>
						<text class="split"></text>
						<text>医保待认证</text>
						<text class="split"></text>
						<text>信用申请已通过</text>
					</view>
				</view>
				<view class="user-order">
					<text class="title">我的订单</text>
					<view class="order-list">
						<view class="item" @click="handleBuilding">
							<view class="img-wrapper">
								<img src="../../static/images/guahao.png" alt="">
							</view>

							<text>挂号订单 </text>
						</view>
						<view class="item" @click="handleBuilding">
							<view class="img-wrapper">
								<img src="../../static/images/renmingbi.png" alt="">
							</view>

							<text> 缴费订单 </text>
						</view>
						<view class="item" @click="handleBuilding">
							<view class="img-wrapper">
								<img src="../../static/images/hospital.png" alt="">
							</view>

							<text> 住院缴费订单 </text>
						</view>
						<view class="item" @click="handleBuilding">
							<view class="img-wrapper">
								<img src="../../static/images/query.png" alt="">
							</view>

							<text> 住院日清单查询 </text>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="flex justify-between" style="padding: 30px 0 10px 0;">
        <view class="flex align-center">
          <u--image v-if="avatar" :showLoading="true" :src="avatar" width="60px" height="60px" mode="widthFix"
            shape="circle" @click="handleToAvatar">
            <view slot="error" style="font-size: 24rpx;">加载失败</view>
          </u--image>
          <view v-if="!name" @click="handleToLogin" class="login-tip">
            点击登录
          </view>
          <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">
              {{ name }}
            </view>
            <view class="u_content">
              {{userInfo.welcomeContent}}
            </view>
          </view>
        </view>
        <view @click="handleToInfo" class="flex align-center">
          <text>个人信息</text>
          <view class="iconfont icon-right"></view>
        </view>
      </view> -->
		</view>

		<view class="content-section">
			<view class="mine-pannel">
				<view class="mine-pannel-title">
					个人信息
				</view>
				<view class="mine-actions grid col-2 text-center">
					<view class="action-item" @click="handleBuilding">
						<!-- <view class="iconfont icon-friendfill text-warning icon"></view> -->
						<img src="../../static/images/user.png" alt="">
						<text class="text">个人中心</text>
					</view>
					<view class="action-item" @click="handleBuilding">
						<img src="../../static/images/home.png" alt="">
						<text class="text">家庭共享</text>
					</view>
					<view class="action-item" @click="handleBuilding">
						<img src="../../static/images/help.png" alt="">
						<text class="text">帮助</text>
					</view>
					<view class="action-item" @click="handleBuilding">
						<img src="../../static/images/setting.png" alt="">
						<text class="text">设置</text>
					</view>
				</view>
			</view>
			<view class="mine-hos">
				<view class="item lt">
					<view class="title">
						银联信用就医
					</view>
					<view class="tip">
						<text class="icon icon-li"></text>
						<text>支持银行储蓄卡/信用卡</text>
					</view>
					<view class="tip">
						<text class="icon icon-li"></text>
						<text>信用卡在线提额</text>
					</view>
					<view class="tip tip1">
						<text>目前由建设银行提供此服务</text>
					</view>
					<view class="tp">
						<img class="bank" src="../../static/images/bank.png" alt="">
						<view class="check" @click="handleBuilding()">
							<text>查看</text>
							<text class="icon icon-arrow-r"></text>
							
						</view>
					</view>
				</view>
				<view class="item rt">
					<view class="title">
						专属额度授信
					</view>
					<view class="tip">
						<text class="icon icon-li"></text>
						<text>60秒极速开通</text>
					</view>
					<view class="tip">
						<text class="icon icon-li"></text>
						<text>惠民专项额度</text>
					</view>
					<view class="tip ">
						<text class="icon icon-li"></text>
						<text>支持门急诊、住院场景</text>
					</view>
					<view class="tp">
						<img class="bank" src="../../static/images/wallet.png" alt="">
						<view class="check" @click="handleBuilding()">
							<text>查看</text>
							<text class="icon icon-arrow-r"></text>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'

	export default {
		data() {
			return {
				name: this.$store.state.user.name
			}
		},
		computed: {
			avatar() {
				return this.$store.state.user.avatar
			},
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight - 50
			},
			statusBarHeight() {
				return uni.getSystemInfoSync().statusBarHeight
			},
			userInfo() {
				return this.$store.getters.userInfo
			},
		},
		onLoad() {
			console.log(uni.getSystemInfoSync())
		},
		methods: {
			handleToInfo() {
				this.$tab.navigateTo('/pages/mine/info/index')
			},
			handleToEditInfo() {
				this.$tab.navigateTo('/pages/mine/info/edit')
			},
			handleToSetting() {
				this.$tab.navigateTo('/pages/mine/setting/index')
			},
			handleToLogin() {
				this.$tab.reLaunch('/pages/login')
			},
			handleToAvatar() {
				this.$tab.navigateTo('/pages/mine/avatar/index')
			},
			handleLogout() {
				this.$modal.confirm('确定注销并退出系统吗？').then(() => {
					this.$store.dispatch('LogOut').then(() => {
						this.$tab.reLaunch('/pages/index')
					})
				})
			},
			handleHelp() {
				this.$tab.navigateTo('/pages/mine/help/index')
			},
			handleAbout() {
				this.$tab.navigateTo('/pages/mine/about/index')
			},
			handleJiaoLiuQun() {
				this.$modal.showToast('客服QQ：249045216')
			},
			handleBuilding() {
				this.$modal.showToast('模块建设中~')
			},
			handleFeedback() {
				this.$tab.navigateTo('/pages/feedback/index')
			},
			handleToLoglog() {
				this.$tab.navigateTo('/pages/monitor/logininfo')
			},
			handleToChangelog() {
				this.$tab.navigateTo('/pages/changelog/changelog')
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef H5 */
	uni-page-head {
		display: none !important;
	}

	/* #endif */
	page {
		// background-color: #f5f6f7;
		font-size: 27rpx;
	}

	.mine-container {
		width: 100%;
		height: 100%;


		.header-section {
			// padding: 50px 15px 45px 15px;
			// background-color: #3c96f3;
			color: white;

			.login-tip {
				font-size: 18px;
				margin-left: 10px;
			}

			.cu-avatar {
				border: 2px solid #eaeaea;

				.icon {
					font-size: 40px;
				}
			}

			.user-info {
				margin-left: 30rpx;
				margin-right: 40rpx;

				.u_title {
					font-size: 18px;
					line-height: 30px;
				}

				.u_content {
					width: 160px;
				}
			}
		}

		.user-section {
			height: 500upx;
			// padding: 100upx 30upx 0;
			position: relative;


			.bg {
				position: absolute;
				left: 0;
				top: 0;
				// width: 100vw;
				height: 355rpx;
				// opacity: 0.84;
				width: 100%;
			}

			.user-wrapper {
				position: absolute;
				width: 100%;
				left: 0;
				top: 0;
				background: url(@/static/images/user-bg.png) no-repeat;
				background-size: 100% 100%;
				height: 255rpx;
				z-index: 9;
				padding-top: 80upx;
			}

			.user-info-box {
				padding: 0 120upx;
				margin-bottom: 20upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;

				.portrait-box {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.portrait {
						width: 100upx;
						height: 100upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}

					.username {
						font-size: 26upx;
						color: #fff;
						margin-left: 20upx;
					}

					button {
						background-color: transparent;
						font-size: 26upx;
						color: #333;
						border: none;
					}

					button::after {
						border: none;
					}
				}

				.portrait-indent {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #2359D8;
					font-size: 27rpx;
					height: 38rpx;
					background: #FFFFFF;
					border-radius: 7rpx;
					padding: 0 12rpx;

					.icon-arrow {
						display: block;
						width: 17rpx;
						height: 17rpx;
						background: url(../../static/images/arrow-1.png) no-repeat;
						background-size: 100% 100%;
						margin-left: 15rpx;
					}
				}

			}

			.tag-wrapper {
				padding: 0 120upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #FFFFFF;
				font-size: 27upx;

				.split {
					width: 1upx;
					height: 33upx;
					background: #FFFFFF;
					display: block;
				}
			}

			.user-order {
				padding: 50upx 40upx;
				background-color: #fff;
				width: 93%;
				margin: 0 auto;
				position: absolute;
				top: 0;
				transform: translateX(-50%);
				left: 50%;
				height: 500rpx;
				padding-top: 280upx;

				.title {
					display: block;
					color: #040404;
					font-size: 27upx;
				}

				.order-list {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item {
						text-align: center;
						font-size: 20upx;
						color: #040404;

						.img-wrapper {
							width: 57rpx;
							height: 57rpx;
							margin: 30rpx auto;

							img {
								max-width: 100%;
								height: inherit;
								object-fit: contain;
							}
						}
					}
				}
			}
		}

		.content-section {
			position: relative;
			
			
			.mine-pannel {
				margin: 30rpx 30rpx;
				background-color: white;
				border-radius: 8rpx;
				padding-bottom: 20rpx;
				&-title {
					font-size: 27rpx;
					color: #040404;
					padding: 30upx 40upx 0 40upx;
					
				}
			}

			.mine-actions {
				margin-top: 40rpx;
				
				padding: 0 40rpx 0 80rpx;
				border-radius: 8px;
				background-color: white;
				flex-wrap: wrap;
				position: relative;
				&::after{
					content: '';
					position: absolute;
					width: 100%;
					height: 1rpx;
					background-color: #D4D4D4;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.action-item {
					display: flex;
					align-items: center;  
					padding: 27upx 0;
					
					img{
						width: 59rpx;
						height: 59rpx;
					}
					.icon {
						font-size: 28px;
					}

					.text {
						display: block;
						font-size: 13px;
						margin: 0 20rpx; 
						color: #525252;
						font-size: 27upx;
					}
				}
			}
			.mine-hos{
				display: flex;
				justify-content: space-between;
				margin: 30rpx 30rpx;
				.item{
					background: #FFFFFF;
					border-radius: 7rpx;
					padding: 20rpx;
					width: 48%;
					.title{
						height: 39rpx;
						background: #FFFFFF;
						border: 1rpx solid #2359D8;
						border-radius: 7rpx;
						width: 201rpx;
						text-align: center;
						line-height: 39rpx;
						margin: 0 auto;
						color: #000000;
						margin-bottom: 30rpx;
					}
					.tip{
						padding-left: 40rpx;
						position: relative;
						color: #2359D8;
						font-size: 20rpx;
						margin-bottom: 22rpx;
						.icon-li{
							display: inline-block;
							background: url(@/static/images/confirm.png) no-repeat;
							background-size: 100% 100%;
							width: 29rpx;
							height: 29rpx;
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							
						}
					}
					.tip1{
						color: #656565;
					}
					.tp{
						position: relative;
						display: flex;
						justify-content: space-between;
						align-items: center;
						img{
							margin-left: -40rpx;
						}
						.bank{
							width: 117rpx;
						}
						.wallet{
							width: 100rpx;
						}
						.check{
							display: flex;
							align-items: center;
							color: #010101;
							font-size: 20rpx;
							.icon-arrow-r{
								display: inline-block;
								background: url(../../static/images/check.png) no-repeat;
								background-size: 100% 100%;
								width: 34rpx;
								height: 34rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
