<template>
	<view class="orderHome">
		<view class="userInfo">
			<view class="left">
				<u-row>
					<u-col span="6">
						<u-avatar :src="'../../static/images/avatar.png'"></u-avatar>
						<!-- <u--image :src="'../../static/images/avatar.png'" width="85rpx" height="85rpx"></u--image> -->
					</u-col>
					<u-col span="12">
						<text>就诊人 {{familyName}}</text>
					</u-col>
				</u-row>
			</view>
			<view class="right" @tap="showChangeUser = !showChangeUser">
				<text>切换</text>
				<text class="icon icon-change"></text>
			</view>
		</view>
		<u-transition :show="showChangeUser">
			<view class="change-user">
				<u-radio-group v-model="familyId" @change="changeUser">
					<view class="radio-item" v-for="(item,index) in familyList" :key="index">
						<view class="left">
							<view class="circle">
								{{item.name}}
							</view>
							<text>{{item.name}}</text>
							<view class="tag">
								{{item.relation}}
							</view>
						</view>
						<u-radio shape="square" :name="item.id" label=""></u-radio>
					</view>
		
				</u-radio-group>
			</view>
		</u-transition>

		<view class="tab">
			<view class="item" :class="active == item.key ? 'active' : ''" v-for="(item,index) in tabList"
				:key="item.key" @tap="changeTab(item)">
				{{item.name}}
			</view>
		</view>
		<view class="tab-list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="title">
					<text>{{active == 'MZ' ? '门诊' : '急诊'}}</text> <text>{{item.addTime}}</text>
				</view>
				<view class="info">
					<view class="lft">
						<u--image v-if="item.hospitalImgUrl" :src="item.hospitalImgUrl" width="88rpx" height="88rpx"></u--image>
						<u--image v-else src="../../static/images/hospital2.png" width="88rpx" height="88rpx"></u--image>
						<view class="dec">
							<view class="name">
								{{item.familyName}}
							</view>
							<view class="fs1">
									{{item.hospitalName}}
							</view>
						</view>
					</view>
					<view class="rtf">
							{{item.payStatusStr}}
					</view>
				</view>
				<view class="bottom">
					<view class="lft">
						<u--image src="../../static/images/medbox.png" width="48rpx" height="46rpx"></u--image>
						<view class="name">
							就诊科室：{{item.departmentName}}
						</view>
					</view>
					<view class="rtf">
						<u-button @click="toDetail(item)" type="primary" :plain="true" :hairline="true" shape="circle" text="查看详情"></u-button>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {getBillRecordList} from '@/api/hospital/index.js'
	export default {
		data() {
			return {
				showChangeUser: false,
				value: '陈**',
				active: 'MZ',
				tabList: [{
						name: '门诊',
						key: 'MZ'
					},
					{
						name: '急诊',
						key: 'JZ'
					}
				],
				familyId: '',
				familyName: '',
				familyList: [],
				PageNum: 1,
				PageSize: 5,
				list: [],
				record: {},
				status: 'loadmore',
				
			};
		},
		computed: {
			...mapGetters(['userInfo', 'sysConfig'])
		},
		onLoad() {
			this.getFamilyList()
			this.getList()
		},
		onReachBottom() {
			if(this.PageNum >= this.record.totalPage) {
				this.status = 'nomore';
				return;
			}else{
				this.status = "loading"
			}
			this.PageNum ++;
			this.getList()
			console.log('我滚动到底部了~')
		},
		methods: {
			async getFamilyList() {
				this.familyList = this.sysConfig.familyList
				this.familyName = this.sysConfig.currentFamily.name
				this.familyId = this.sysConfig.currentFamily.id
			},
			getList() {
				getBillRecordList({
					FamilyId: this.familyId,
					Type: this.active,
					PageNum: this.PageNum,
					PageSize: this.PageSize
				}).then((res) => {
					if(res.data.pageIndex == 1) {
						this.list = res.data.result
					}else{
						this.list = this.list.concat(res.data.result)
					}
					if(this.PageNum >= res.data.totalPage) {
						this.status = 'nomore';
					}else{
						this.status = 'loadmore';
					}
					this.record = res.data
				})
			},
			changeTab(item) {
				this.active = item.key
				this.getList()
			},
			changeUser(id) {
				console.log(id)
				this.familyId = id
				let family = this.familyList.find((item) => item.id == id)
				console.log(family)
				this.familyName = family.name
				this.pageNum = 1
				this.getList()
			},
			toDetail(item) {
				uni.navigateTo({
					url:'/pages/hospital/paying-order?id='+ item.id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.orderHome {
		font-size: 27rpx;

		.userInfo {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15rpx 22rpx;
			background-color: #fff;

			.left {
				display: flex;
				align-items: center;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #010101;

			}

			.right {
				padding-right: 22rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #0179DC;
			}
		}

		.tab {

			margin: 30rpx auto;
			background: #FFFFFF;
			border: 1px solid #4095E5;
			border-radius: 41rpx;
			display: flex;
			align-items: center;
			width: 517rpx;

			.item {
				width: 50%;
				height: 82rpx;
				line-height: 82rpx;
				text-align: center;
				font-size: 33rpx;
				color: #030303;
				font-family: Adobe Heiti Std;
				border-radius: 41rpx;

				&.active {
					background: #3665DF;
					color: #FFFFFF;
					width: 65%;
				}
			}
		}

		.tab-list {
			margin: 15rpx 15rpx;

			.item {
				background: #FFFFFF;
				border: 1px solid #315ACE;
				border-radius: 20rpx;
				margin-bottom: 40rpx;

				.title {
					background-color: #3665DF;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					font-size: 33rpx;
					font-family: Adobe Heiti Std;
					padding: 14rpx 34rpx;
					color: #FFFFFF;

					text {
						margin-right: 20rpx;
					}
				}

				.info {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx 45rpx;
					border-bottom: 1rpx solid #8A8A8A;

					.lft {
						display: flex;
						align-items: center;

						.dec {
							margin-left: 30rpx;
						}

						.name {
							width: 169rpx;
							height: 41rpx;
							background: #F4F4F4;
							border-radius: 7rpx;
							text-align: center;
							line-height: 41rpx;
							margin-bottom: 15rpx;
						}

						.fs1 {
							font-size: 33rpx;
							font-family: Adobe Heiti Std;
							line-height: 1;
							color: #4095E5;
						}
					}

					.rtf {
						font-size: 33rpx;
						font-family: Adobe Heiti Std;

						color: #010101;
					}
				}

				.bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 35rpx;

					.lft {
						display: flex;
						align-items: center;
						font-size: 33rpx;
						font-family: Adobe Heiti Std;
						color: #010101;

						.name {
							margin-left: 18rpx;
						}
					}

				}
			}
		}
	}

	.change-user {
		.radio-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 13rpx 37rpx;
			background: #F4F4F4;
			border-bottom: 1rpx solid #7D7D7D;

			.left {
				display: flex;
				align-items: center;

				.circle {
					width: 71rpx;
					height: 71rpx;
					border-radius: 50%;
					text-align: center;
					line-height: 71rpx;
					background-color: #388CEB;
					color: #FEFEFE;
					font-size: 22rpx;
					margin-right: 19rpx;
				}

				.name {
					color: #000000;

				}

				.tag {
					padding: 0 21rpx;
					height: 28rpx;
					line-height: 28rpx;
					background: #E0E0E0;
					border-radius: 4rpx;
					margin-left: 10rpx;
				}
			}
		}
	}

	/deep/ .u-button {
		height: 41rpx;
	}

	/deep/ .u-radio-group--row {
		display: block;
	}
</style>