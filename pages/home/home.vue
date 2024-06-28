<template>
	<view class="home">
		
		<view class="home-top" >
			<view class="home-top-l">
				<u--image :showLoading="true" src="/static/images/avatar.png" width="52px" height="52px"
					mode="aspectFit"></u--image>
				<view class="pd">
					<h1>{{user.mingcheng ?user.mingcheng : '欢迎来到 翼秘书' }} </h1>
					<view class="vip-box">
						<!-- <view class="vip">
							<image src="/static/images/home/v.png" mode=""></image>
							<text>3</text>
						</view> -->
						<text>{{user.mobile || ''}}</text>
					</view>
				</view>
			</view>
			<view class="" :style="{paddingTop: rightY + 'px'}">
				<image @click="$tab.navigateTo('/packageC/pages/notice/notice')" class="bell" src="/static/images/home/bell.png"
					mode="aspectFit"></image>
			</view>
		
		</view>
		<view class="home-data" v-if="name.toLocaleLowerCase() !=  'test'.toLocaleLowerCase() && name">
			<view class="tab">
				<view class="item" :class="current == item.key && 'active'" @click="changeTab(item)"
					v-for="(item,index) in tabs" :key="index">
					<text>{{item.name}}</text>
					<u--image v-if="current == item.key" :showLoading="true" src="/static/images/home/arrow-down.png"
						width="15px" height="15px" mode="aspectFit"></u--image>
				</view>
			</view>
			<view class="tabbar-content" v-if="current == 'team'">
				<view class="data-box flex align-center">
					<view class="item">
						<h3>今日交易(元)</h3>
						<h1>{{yeji.jiaoyi_day_td}}</h1>
					</view>
					<view class="item">
						<h3>本月交易(元)</h3>
						<h1>{{yeji.jiaoyi_month_td}}</h1>
					</view>
				</view>
				<view class="data-box2 margin-top flex align-center justify-between">
					<view class="">
						<h3>今日激活(台)</h3>
						<h1>{{yeji.jihuo_day_td}}</h1>
					</view>
					<view class="split">

					</view>
					<view class="">
						<h3>本月激活(台)</h3>
						<h1>{{yeji.jihuo_month_td}}</h1>
					</view>
					<view class="split">

					</view>
					<view class="">
						<h3>累计激活(台)</h3>
						<h1>{{yeji.jihuo_td}}</h1>
					</view>
				</view>
			</view>
			<view class="tabbar-content" v-else>
				<view class="data-box flex align-center">
					<view class="item">
						<h3>今日交易(元)</h3>
						<h1>{{yeji.jiaoyi_day}}</h1>
					</view>
					<view class="item">
						<h3>本月交易(元)</h3>
						<h1>{{yeji.jiaoyi_month}}</h1>
					</view>
				</view>
				<view class="data-box2 margin-top flex align-center justify-between">
					<view class="">
						<h3>今日激活(台)</h3>
						<h1>{{yeji.jihuo_day}}</h1>
					</view>
					<view class="split">
			
					</view>
					<view class="">
						<h3>本月激活(台)</h3>
						<h1>{{yeji.jihuo_month}}</h1>
					</view>
					<view class="split">
			
					</view>
					<view class="">
						<h3>累计激活(台)</h3>
						<h1>{{yeji.jihuo}}</h1>
					</view>
				</view>
			</view>
		</view>
		<view class="notice-bar flex align-center margin-top-sm">
			<u--image src="/static/images/home/notice.png" width="64px" height="20px" mode="aspectFit"></u--image>
			<u-notice-bar bgColor="transparent" color="#FA8B18" :text="text1" direction="column"  @click="clickNoticeItem"
				speed="250" url="/pages/home/index"></u-notice-bar>
		</view>
		<view class="menu-wrapper margin-top-sm">
			<view class="flex align-center justify-around">
				<view class="flex flex-direction align-center justify-center"
					@click="$tab.navigateTo('/packageA/pages/merchant/merchant')">
					<u--image src="/static/images/home/shcx.png" width="40px" height="40px" mode="aspectFit"></u--image>
					<p class="text-blak-2 margin-top-sm ">商户查询</p>
				</view>
				<view class="flex flex-direction align-center justify-center"
					@click="$tab.navigateTo('/packageA/pages/team/team')" v-if="name.toLocaleLowerCase() != 'test'.toLocaleLowerCase() && name">
					<u--image src="/static/images/home/tdgl.png" width="40px" height="40px" mode="aspectFit"></u--image>
					<p class="text-blak-2 margin-top-sm">团队管理</p>
				</view>
				<view class="flex flex-direction align-center justify-center"
					@click="$tab.navigateTo('/packageA/pages/terminal/terminal')">
					<u--image src="/static/images/home/zdgl.png" width="40px" height="40px" mode="aspectFit"></u--image>
					<p class="text-blak-2 margin-top-sm">终端管理</p>
				</view>
				<view class="flex flex-direction align-center justify-center" @click="$tab.navigateTo('/packageA/pages/control/control')">
					<u--image src="/static/images/home/fkyj.png" width="40px" height="40px" mode="aspectFit"></u--image>
					<p class="text-blak-2 margin-top-sm">风控预警</p>
				</view>
			</view>
			<view class="flex margin-top-lg align-center justify-between flex-wrap menu-list">
				<view class="flex align-center basis-df-divider margin-bottom-sm"
					@click="$tab.navigateTo('/packageB/pages/wallet/wallet')" v-if="name.toLocaleLowerCase() != 'test'.toLocaleLowerCase() && name">
					<u--image class="" src="/static/images/home/syqb.png" width="40px" height="40px"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1 ">收益钱包</h1>
						<h3 class="text-gray">分润返现奖励</h3> 
					</view>
				</view>
				<view class="flex align-center basis-df-divider margin-bottom-sm"
					@click="$tab.navigateTo('/packageA/pages/transfer/recycle')">
					<u--image class="" src="/static/images/home/hbhs.png" width="40px" height="40px"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">划拨回收</h1>
						<h3 class="text-gray">设备划拨回收</h3>
					</view>
				</view>
				<view class="flex align-center basis-df-divider" @click="$tab.navigateTo('/packageC/pages/question/question')">
					<u--image class="" src="/static/images/home/shgl.png" width="40px" height="40px"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">常见问题</h1>
						<h3 class="text-gray">代理疑难解答</h3>
					</view>
				</view>
				<view class="flex align-center basis-df-divider" @click="$tab.navigateTo('/packageC/pages/share/share')" v-if="name.toLocaleLowerCase() != 'test'.toLocaleLowerCase() && name">
					<u--image class="" src="/static/images/home/yqfx.png" width="40px" height="40px"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">邀请分享</h1>
						<h3 class="text-gray">推广代理商</h3>
					</view>
				</view>
			</view>

		</view>
		<view class="swiper margin-top">
			<u-swiper height="130" radius="18" :list="bannerList"></u-swiper>
		</view>
	
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import configService from '@/api/config.service'
	import storage from '@/utils/storage'
	import {
		getHomeData,
		getHomeDataUnlogin
	} from "@/api/system/user.js"
	import {
		getToken
	} from '@/utils/auth';
	import {
		checkUpdate
	} from '@/utils/common.js'
	export default {
		data() {
			return {
				rightY: 0,
				user: {
					mingcheng: '',
					mobile: ''
				},
				homeData: {},
				yeji: {},
				list: [],
				bindCardUrl: '',
				current: 'team',
				tabs: [{
						name: '团队业绩',
						key: 'team'
					},
					{
						name: '个人业绩',
						key: 'person'
					}
				],
				text1: [],
				bannerList: [],
				newslist: []
			}
		},
		computed: {
			...mapGetters(['userInfo','name'])
		},
		onReady() {
			
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightY = res.height 
			// #endif
		},
		onLoad() {
			if(this.name.toLocaleLowerCase() == 'test'.toLocaleLowerCase() || !this.name) {
				uni.setTabBarItem({
					index:1,
					visible:false
				})
			}else{
				uni.setTabBarItem({
					index:1,
					visible:true
				})
			}
			console.log(this.globalConfig.appInfo)
			if(!getToken()) {
				// uni.redirectTo({
				// 	url:'/pages/login'
				// })
				this.getGroupUnlogin()
				return
			}
			this.getGroup()
		},
		onShow() {
			
			checkUpdate()
		},
		methods: {
			changeTab(item) {
				this.current = item.key
			},
			getGroup() {
				getHomeData({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'yhh.default',
					token: getToken()
				}).then((res) => {
					console.log(res)
					if(res.code == '00') {
						this.homeData = res
						this.yeji = res.yeji
						this.user = res.myinfo
						this.text1 = [];
						this.newslist = res.newslist
						res.newslist.forEach((item) => {
							this.text1.push(item.title)
						})
						res.imglist.forEach((item) => {
							this.bannerList.push(item.imurl)
						})
					}
					
				})
			},
			getGroupUnlogin() {
				getHomeDataUnlogin({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'yhh.Default_home',
					token: getToken()
				}).then((res) => {
					if(res.code == '00') {
						this.homeData = res
						this.yeji = res.yeji
						this.user = res.myinfo
						this.text1 = [];
						this.newslist = res.newslist
						res.newslist.forEach((item) => {
							this.text1.push(item.title)
						})
						res.imglist.forEach((item) => {
							this.bannerList.push(item.imurl)
						})
					}
			
				})
			},
			clickNoticeItem(index) {
				let item =this.newslist[index]
				this.$tab.navigateTo('/packageC/pages/notice/detail?id='+item.Id)
			}
		
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
	}

	.home {
		background: url(data:image/png;base64,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) no-repeat top;
		background-size: 100% 776rpx;
		padding: 0 30rpx;
		padding-top: var(--status-bar-height);

		&-top {

			padding-top: 55rpx;
			padding-bottom: 38rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-l {
				display: flex;
				align-items: center;

				.pd {
					padding-left: 21rpx;
				}

				h1 {
					font-size: 35rpx;
					font-weight: bold;;
					color: #FFFFFF;
				}

				.vip-box {
					// width: 150rpx;
					padding: 0 8rpx;
					height: 42rpx;
					margin-top: 13rpx;
					background: linear-gradient(-39deg, rgba(250, 139, 24, 0.95), rgba(255, 167, 75, 0.95));
					border-radius: 21rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.vip {
						position: relative;
						margin-right: 8rpx;

						image {
							width: 18.75rpx;
							height: 15.97rpx;
						}

						text {
							color: #000000;
							font-size: 12rpx;
							zoom: 0.6;
							font-style: italic;
							position: absolute;
							bottom: -5rpx;
							right: -2rpx;
							font-weight: bold;;
						}
					}

					font-size: 21rpx;
					color: #000000;
				}
			}

			.bell {
				width: 36.11rpx;
				height: 34.72rpx;
			}
		}

		&-data {
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 38rpx 40rpx;

			.tab {
				width: 550rpx;
				margin: 0 auto;
				height: 56rpx;
				background: #EFEFEF;
				border-radius: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.item {
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 29rpx;
					color: #4A4439;

					text {
						margin-right: 18rpx;
					}

					&.active {
						background: #FAC663;
						border: 1rpx solid #CF982F;
						border-radius: 28rpx;
						height: 56rpx;
					}
				}
			}

			.data-box {
				padding-top: 40rpx;

				.item {
					width: 50%;
				}

				h3 {
					font-size: 26rpx;
					color: #929399;
					font-weight: 400;
				}

				h1 {
					font-size: 51rpx;
					color: #252833;
					font-family: 'AlimamaFangYuanTiVF';
				}
			}

			.data-box2 {
				
				text-align: center;

				.split {
					width: 1rpx;
					height: 50rpx;
					background: #252833;
					opacity: 0.4;
				}

				h3 {
					font-size: 26rpx;
					color: #929399;
					font-weight: 400;
				}

				h1 {
					font-size: 51rpx;
					color: #252833;
					font-family: 'AlimamaFangYuanTiVF';
				}
			}
		}

		.notice-bar {
			background: #FEF3D8;
			border-radius: 24rpx;
			padding: 14rpx 20rpx;
			
		}

		.menu-wrapper {
			padding: 28rpx 28rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin-top: 28rpx;
		}

		.menu-list {
			

			&>view {
				background: url(~@/static/images/home/menu-bg.png) no-repeat;
				background-size: 100% 100%;
				height: 132rpx;
				border-radius: 14rpx;
				padding: 0 16rpx;

				h1 {
					font-size: 29rpx;
					font-weight: 400;
				}



				h3 {
					color: #929399;
					font-size: 22rpx;
					font-weight: 400;
					padding-top: 8rpx;
				}
			}
		}

		.swiper {
			// margin-top: 60rpx;
			padding-bottom: 60rpx;
		}
	}

	.team-content {
		// background: #FFFFFF;
		// border: 1px solid #B6B5B9;
		// border-radius: 15rpx;

		.table-head {
			padding: 0 53rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 117rpx;
			background: #FAFAFA;
			border-radius: 15rpx;

			// background: url(../images/bg-4.png) no-repeat;
			// background-size: 100% 100%;
			.item {
				text-align: center;

				color: #3C3B44;

				font-weight: bold;;
				font-weight: bold;
				font-size: 28rpx;

				// .fs1 {
				// 	font-size: 72rpx;
				// }
			}

			.split {
				width: 1rpx;
				height: 53rpx;
				background-color: #626162;
				border: solid 1rpx #c7d0f7;
			}
		}

		.scroll {
			height: calc(100vh-187rpx) !important;
		}

		.table-body {

			.item {
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1rpx #f1f1f1;
				border-radius: 12rpx;

				&:nth-of-type(even) {
					background: #FAFAFA;
				}

				.td {
					text-align: center;
					font-size: 38rpx;
					font-family: AlimamaFangYuanTiVF;
					font-size: 28rpx;
					color: #1D1D1D;
					padding: 36rpx 0;
					font-weight: 400;
				}

				.name {
					width: 96rpx;
					height: 96rpx;
					text-align: center;
					line-height: 96rpx;
					// background-image: linear-gradient(263deg, #8e19ff 0%, #7876ff 100%), linear-gradient( #000000, #000000);
					// background-blend-mode: normal, normal;
					// background: url(../images/circle.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 50%;
					color: #fff;
					font-size: 48rpx;
				}

				.tl {
					text-align: left;
					padding-left: 35rpx;
					flex: 1;

				}

				.fx {
					display: flex;
					align-items: center;
					// justify-content: center;
				}

				.jlx {
					justify-content: flex-end;
				}

				.mg {
					margin-left: 27rpx;
					// margin-right: 53rpx;
				}

				.fs1 {
					color: #000000;
				}

				.fs2 {
					color: #010101;
					font-size: 48rpx;
				}

				.fs3 {
					color: #999999;
					font-size: 38rpx;
				}

				.fs4 {
					color: #ff8c00;
					font-size: 38rpx;
				}

				.fs5 {
					color: #666;
					font-size: 38rpx;
				}

				.icon-you {
					color: #1D1D1D;
					font-size: 52rpx;
				}
			}
		}

		.w5 {
			width: 50%;
		}

		.w2 {
			width: 20%;
		}

		.w25 {
			width: 32%;
		}
	}
</style>