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


		<view class="u-tab">
			<u-tabs :scrollable="false" :list="list" :lineWidth="50" :lineHeight="1" :activeStyle="{'color': '#4095E5'}"
				:inactiveStyle="{'color': '#040404'}" @click="changeQury"></u-tabs>
		</view>
		<view class="u-select">
			<view class="st" @click="showPicker = true">
				<text>{{query}}</text>
				<u-icon name="arrow-down-fill"></u-icon>
			</view>
			<u-picker :show="showPicker"  ref="uPicker" :columns="hospitalList" :keyName="'name'"
				:closeOnClickOverlay="true" @change="changeHandler" @confirm="confirm"
				@cancel="showPicker = false"></u-picker>
		</view>
		<view class="u-datepicker">
			<u-row justify="space-between">
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
				<view class="info">
					<view class="lft">
						<u--image v-if="item.status == 1 " src="../../static/images/success.png" width="88rpx"
							height="88rpx"></u--image>
						<u--image v-else src="../../static/images/fail.png" width="88rpx"
							height="88rpx"></u--image>
						<view class="dec">
							<view class="fs3">
								<span v-if="item.status == 0">未挂号</span>
								<span v-if="item.status == 1">挂号成功</span>
								<span v-if="item.status == -2">挂号失败</span> 
								<span v-if="item.status == -1">取消挂号</span>
								<!-- 0未挂号 1挂号成功 -1取消挂号 -2挂号失败 -->
							</view>
							<view class="fs1">
								{{item.patName}}
							</view>
							<view class="fs1">
								{{item.deptName}}
							</view>
							<view class="fs1">
								<span v-if="item.payStatus == 1">已支付</span>
								<span v-if="item.payStatus == 0">未支付</span>
								<span v-if="item.payStatus == -1">已退费</span>
								
							</view>
						</view>
					</view>
					<view class="rtf">
						<view class="">
							就诊时间
						</view>
						<view class="">
							{{item.clinicDate}}
						</view>
						<view class="">
							{{item.schedulePeriod}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		getAllHospital,
		getAppointmentRecordList
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
				tabList: [{
						name: '在院记录',
						key: '1'
					},
					{
						name: '历史记录',
						key: '2'
					}
				],
				list: [{
						name: '全部',
						key: 2
					},
					{
						name: '已支付',
						key: 1
					},
					{
						name: '已取消',
						key: -1
					},
					{
						name: '未支付',
						key: 0
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
				pageSize: 20,
				recordList: [],
				initList: []
			};
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		async onLoad() {
			await this.getAllHospitalList()
			await this.getFamilyList()
			this.startDate = uni.$u.timeFormat(this.date1, 'yyyy-mm-dd')
			this.endDate = uni.$u.timeFormat(this.date2, 'yyyy-mm-dd')
			this.getRecordList()
		},
		methods: {
			async getAllHospitalList() {
				await getAllHospital().then((res) => {
					this.hospitalList.push(res.data)
					let hospital = res.data.find((item) => item.name == this.userInfo.defaultHospitalName)
					this.hospitalId = hospital.id
					console.log(hospital)
				}).catch((err) => {

				})
			},
			async getFamilyList() {
				 await getFamilyShareList().then(response => {
					this.familyList = response.data
					this.familyName = this.familyList[0].name
					this.familyId = this.familyList[0].id
				})
			},
			getRecordList() {
				getAppointmentRecordList({
					familyId: this.familyId,
					hospitalId: this.hospitalId,
					startDate: this.startDate,
					endDate: this.endDate,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					totalNum: 100,
					sort: '',
					sortType: this.active

				}).then((res) => {
					this.initList = res.data.result
					this.recordList = res.data.result
				})
			},
			changeTab(item) {
				this.active = item.key
			},
			changeUser(id) {
				console.log(id)
				this.familyId = id
				let family = this.familyList.find((item) => item.id == id)
				console.log(family)
				this.familyName = family.name
			},
			changeQury(tab) {
				console.log('item', tab);
				if(tab.key == 2) {
					this.recordList = this.initList;
					return;
				}
				this.recordList = this.initList.filter((item) => item.payStatus == tab.key)
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
			}
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
		margin: 15rpx 15rpx;

		.item {
			background: #FFFFFF;
			margin-bottom: 40rpx;

			.title {
				background-color: #fff;
				border-bottom: 1rpx solid #8A8A8A;
				font-size: 31rpx;
				font-family: Adobe Heiti Std;
				padding: 14rpx 34rpx;
				color: #010101;

				text {
					margin-right: 20rpx;
				}
			}

			.info {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				padding: 40rpx 30rpx;

				.lft {
					display: flex;
					align-items: center;

					.dec {
						margin-left: 30rpx;
					}

					.fs1 {
						color: #878787;
						font-size: 20rpx;
						line-height: 1.8;
					}

					.fs3 {
						font-size: 27rpx;
						font-family: Adobe Heiti Std;
						line-height: 2;
						color: #4095E5;
					}
				}

				.rtf {
					font-size: 20rpx;
					font-family: Adobe Heiti Std;
					color: #010101;
					line-height: 1.5;
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

	/deep/ .u-button {
		height: 41rpx;
	}

	/deep/ .u-radio-group--row {
		display: block;
	}
</style>