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
		<view class="u-select">
			<view class="st" @click="showPicker = true">
				<text>{{query}}</text>
				<u-icon name="arrow-down-fill"></u-icon>
			</view>
			<u-picker :show="showPicker" ref="uPicker" :columns="hospitalList" :keyName="'name'"
				:closeOnClickOverlay="true" @change="changeHandler" @confirm="confirm"
				@cancel="showPicker = false"></u-picker>
		</view>

		<view class="tab-list">
			<view class="item" v-for="(item,index) in recordList" :key="index">
				<view class="title">
					<text>住院</text>
				</view>
				<view class="info">
					<view class="lft">
						<u--image src="../../static/images/hospital2.png" width="88rpx" height="88rpx"></u--image>
						<view class="dec">
							<view class="name">
								{{item.patName}}
							</view>
							<view class="fs1">
								{{item.hospitalName}}
							</view>
						</view>
					</view>
					<view class="rtf">
						已支付
					</view>
				</view>
				<view class="bottom">
					<view class="lft">
						<u--image v-if="item.imgUrl" :src="item.imgUrl" width="48rpx" height="46rpx"></u--image>
						<u--image v-else src="../../static/images/medbox.png" width="48rpx" height="46rpx"></u--image>
						<view class="name">
							病区：{{item.wardName}}-病区
						</view>
					</view>
					<view class="rtf" @click="navToDetail(item.id)">
						<u-button type="primary" :plain="true" :hairline="true" shape="circle" text="查看详情"></u-button>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" @loadmore="loadmore" />
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		getAllHospital,
		getInpAdmisList,
		getAppointmentRecordDetail
	} from '@/api/hospital/index.js'
	import {
		getFamilyShareList,

	} from '@/api/setting/index.js'
	export default {
		data() {
			return {
				showChangeUser: false,
				showPicker: false,
				value: '陈**',
				active: '1',
				timeType: 1,
				tabList: [{
						name: '门诊',
						key: '1'
					},
					{
						name: '住院',
						key: '2'
					}
				],
				list: [{
						name: '近半年',
						key: 1
					},
					{
						name: '近一年',
						key: 2
					},
					{
						name: '自定义查询',
						key: 3
					}
				],
				columns: [
					[{
						label: '长沙县星沙医院1',
						// 其他属性值
						id: 1
						// ...
					}, {
						label: '长沙县星沙医院2',
						id: 2
					}]
				],
				query: '长沙县星沙医院1',
				showDatePicker1: false,
				showDatePicker2: false,
				date1: Number(new Date().setDate(new Date().getDate() - 1)),
				date2: Number(new Date().setDate(new Date().getDate() + 1)),
				hospitalList: [],
				hospitalId: "",
				familyId: '',
				familyName: '',
				familyList: [],
				startDate: '',
				endDate: '',
				pageNum: 1,
				pageSize: 5,
				recordList: [],
				initList: [],
				record: {},
				status: 'loadmore',



			};
		},
		computed: {
			...mapGetters(['userInfo', 'sysConfig'])
		},
		async onLoad() {
			await this.getAllHospitalList()
			await this.getFamilyList()
			this.startDate = uni.$u.timeFormat(this.date1, 'yyyy-mm-dd')
			this.endDate = uni.$u.timeFormat(this.date2, 'yyyy-mm-dd')
			this.getRecordList()
			console.log(this.sysConfig)
		},
		onReachBottom() {
			console.log('我滚动到底部了~')
			if (this.pageNum >= this.record.totalPage) {
				this.status = 'nomore';
				return;
			} else {
				this.status = "loading"
			}
			this.pageNum++;
			this.getRecordList()
			// console.log('我滚动到底部了~')
		},
		methods: {
			async getAllHospitalList() {
				this.hospitalList.push(this.sysConfig.hospitalList)
				this.hospitalId = this.sysConfig.currentHospital.id
				this.query = this.sysConfig.currentHospital.name
				// await getAllHospital().then((res) => {
				// 	this.hospitalList.push(res.data)
				// 	let hospital = res.data.find((item) => item.name == this.userInfo.defaultHospitalName)
				// 	this.hospitalId = hospital.id
				// 	console.log(hospital)
				// }).catch((err) => {

				// })
			},
			async getFamilyList() {
				// await getFamilyShareList().then(response => {
				// 	this.familyList = response.data
				// 	this.familyName = this.familyList[0].name
				// 	this.familyId = this.familyList[0].id
				// })
				this.familyList = this.sysConfig.familyList
				this.familyName = this.sysConfig.currentFamily.name
				this.familyId = this.sysConfig.currentFamily.id
			},
			getRecordList() {
				getInpAdmisList({


					familyId: this.familyId,
					hospitalId: this.hospitalId,
					startDate: this.startDate,
					endDate: this.endDate,
					pageNum: this.pageNum,
					pageSize: this.pageSize,


				}).then((res) => {
					if (res.data.pageIndex == 1) {
						this.recordList = res.data.result
						this.initList = res.data.result
					} else {
						this.recordList = this.recordList.concat(res.data.result)
						this.initList = this.initList.concat(res.data.result)
					}
					if (this.pageNum >= res.data.totalPage) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}

					// this.recordList = res.data.result

					this.record = res.data
				})
			},
			loadmore() {
				if (this.pageNum >= this.record.totalPage) {
					this.status = 'nomore';
					return;
				} else {
					this.status = "loading"
				}
				this.pageNum++;
				this.getRecordList()
			},
			changeTab(item) {
				this.active = item.key
				this.pageNum = 1;
				this.getRecordList()
			},
			changeUser(id) {
				console.log(id)
				this.familyId = id
				let family = this.familyList.find((item) => item.id == id)
				console.log(family)
				this.familyName = family.name
				this.pageNum = 1
				this.getRecordList()
			},
			changeQury(tab) {
				console.log(tab)
				this.timeType = tab.key
				this.pageNum = 1;
				this.getRecordList()
			},
			changeHandler(e) {
				const {
					columnIndex,
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				console.log(e)
			},
			confirm(e) {
				console.log(e)
				this.query = e.value[0].name
				this.hospitalId = e.value[0].id
				this.showPicker = false
				this.pageNum = 1

				this.getRecordList()
			},
			selectDate1(e) {
				console.log(uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
				this.date1 = e.value
				this.startDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.showDatePicker1 = false

			},
			selectDate2(e) {
				console.log(e.value)
				this.date2 = e.value
				this.endDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.showDatePicker2 = false
			},
			navToDetail(id) {
				uni.navigateTo({
					url: '/pages/order/detail4?id=' + id
				})
			},
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

	.u-select {
		margin-bottom: 25rpx;

		.st {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 21rpx 24rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			font-size: 27rpx;
			font-family: Adobe Heiti Std;
			color: #A8A8A8;
		}
	}

	/deep/ .u-button {
		height: 41rpx;
	}

	/deep/ .u-radio-group--row {
		display: block;
	}
</style>