<template>
	<view class="zhuyuanOrder">
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

		<view class="u-datepicker">
			<u-row justify="space-between">
				<!-- <u-col span="2">
					<text>选择日期</text>
				</u-col> -->
				<u-col span="5">
					<view class="date-picker" @click="showDatePicker1 = true">
						<text>{{date1 | date('yyyy-mm-dd')}}</text>
						<u-icon size="30" color="#333333" name="calendar"></u-icon>
					</view>
					<u-datetime-picker :show="showDatePicker1" v-model="date1" mode="date" @confirm="selectDate1">
					</u-datetime-picker>
				</u-col>
				<u-col span="5">
					<view class="date-picker" @click="showDatePicker2 = true">
						<text>{{date2 | date('yyyy-mm-dd')}}</text>
						<u-icon size="30" color="#333333" name="calendar"></u-icon>
					</view>
					<u-datetime-picker :show="showDatePicker2" v-model="date2" mode="date" @confirm="selectDate2">
					</u-datetime-picker>
				</u-col>

				<u-col span="1">
					<view class="serach" @click="getRecordList">
						<u-icon size="30" color="#4670B3" name="search"></u-icon>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="u-list">
			<view class="item" v-for="(item,index) in recordList" :key="index">
				<u-row>
					<u-col span="3">
						<text>{{item.name}} </text>
					</u-col>
					<u-col span="3">
						<text>{{item.cost}} </text>
					</u-col>
				</u-row>

			</view>
			
		</view>
		<u-button @click="navToDetail()" type="primary" color="#388CEB" size="large" text="查看详情">
		</u-button>
	</view>
</template>


<script>
	import {
		mapGetters
	} from 'vuex';
	import {

		getInpCostDailyFacilityList,
		getInpCostDailyItemTotal
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
						name: '在院记录',
						key: '1'
					},
					{
						name: '历史记录',
						key: '2'
					}
				],

				showDatePicker1: false,
				showDatePicker2: false,
				date1: Number(new Date().setDate(new Date().getDate() - 1)),
				date2: Number(new Date().setDate(new Date().getDate() + 1)),

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
		async onLoad(option) {
			this.id = option.id;
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

			async getFamilyList() {

				this.familyList = this.sysConfig.familyList
				this.familyName = this.sysConfig.currentFamily.name
				this.familyId = this.sysConfig.currentFamily.id
			},
			getRecordList() {
				getInpCostDailyItemTotal({
					admisId: this.id,
					familyId: this.familyId,
					startDate: this.startDate,
					endDate: this.endDate,
				}).then((res) => {
					this.recordList = res.data
					this.initList = res.data
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

			changeUser(id) {
				console.log(id)
				this.familyId = id
				let family = this.familyList.find((item) => item.id == id)
				console.log(family)
				this.familyName = family.name
				this.pageNum = 1
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
			navToDetail() {
				uni.navigateTo({
					url: '/pages/order/detail2?id=' + this.id
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	page {
		font-size: 27rpx;
		font-family: Adobe Heiti Std;
	}

	.zhuyuanOrder {

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
		margin-top: 15rpx;
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

	.u-datepicker {
		margin-top: 25rpx;
		padding: 0 20rpx;
		color: #010101;

		.date-picker {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12rpx 30rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			color: #A8A8A8;
			font-size: 27rpx;


		}
	}

	.u-list {
		margin: 30rpx 15rpx;

		.item {
			background: #FFFFFF;
			color: #000000;
			font-size: 20rpx;
			height: 45rpx;
			line-height: 45rpx;

			&:nth-child(odd) {
				background-color: #B8D7FF;
			}
		}

	}

	/deep/ .u-button--large {
		margin-top: 65rpx;
		height: 67rpx;
		background: #388CEB;
		border-radius: 7rpx;
		color: #FFFCFC;
		font-size: 27rpx;
	}

	/deep/ .u-radio-group--row {
		display: block;
	}

	/deep/ .u-datepicker .date-picker {
		padding: 12rpx 10rpx 12rpx 20rpx;
	}
</style>