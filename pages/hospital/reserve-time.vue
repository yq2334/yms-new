<template>
	<view class="reserve-time">
		<view class="doctor-pannel">
			<view class="doctor">
				<image v-if="doctor.imgUrl" :src="item.imgUrl" mode=""></image>
				<image v-else src="/static/images/doctor.png" mode=""></image>
				
				<view class="des">
					<view class="name">
						<text class="fs1">{{doctor.name}} </text>
						<text class="fs2">{{doctor.levelName}}</text>
					</view>
					<view class="fs2">
						擅长：{{doctor.introduction}}
					</view>
				</view>
			</view>
			<view class="">
				<u-cell-group>
					<u-cell title="就诊科室" :value="doctor.departmentName" :titleStyle="titleStyle"></u-cell>
					<u-cell title="挂号日期" :value="doctor.registerDate" :titleStyle="titleStyle"></u-cell>
					<u-cell title="挂号类型" value="普通号" :titleStyle="titleStyle"></u-cell>
					<u-cell title="挂号费" :value="`${params.registerFee}元`" :titleStyle="titleStyle"></u-cell>
				</u-cell-group>
			</view>
		</view>
		<view class="time-pannel">
			<u-collapse accordion>
				<u-collapse-item :title="`${item.startTime}-${item.endTime}`" v-for="(item,index) in doctor.appointmentScheduleTimeList" :key="index">
					<text slot="value" class="u-page__item__title__slot-title">余号<text class="fs2">{{item.remainCount}}个</text> </text>
					<text slot="right-icon">
						<img class="arrow-down" src="../../static/images/arrow-down.png" alt="">
					</text>
					<text class="u-collapse-content">
						<view class="tit">
							请选择就诊人
						</view>
						<view class="patient-list">
							<view class="item" :class="userId == item.id ? 'active' : ''"
								v-for="(item,index) in doctor.familyList" :key="index" @tap="changeUser(item)">
								{{item.name}}
							</view>
							<view class="item add" @click="navTo('/pages/mine/add/add')">
								+
							</view>
						</view>
						<u-button @tap="handlePostAppointmentOrder(doctor, item)" type="primary" color="#388CEB" size="large" text="确认挂号">
						</u-button>
					</text>
				</u-collapse-item>
			</u-collapse>

		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		getDoctor,
		getDoctorScheduleTime,
		postAppointmentOrder,
		getAppointmentRecordDetail
	} from '@/api/hospital/index.js';
	export default {
		data() {
			return {
				params: {},
				titleStyle: {
					'color': '#7F8081',
					'fontsize': '27rpx'
				},
				doctor: {},
				userId: 11,
				patients: [{
						name: '陈鹏',
						id: 1
					},
					{
						name: '俊宇',
						id: 2
					}
				]
			}
		},
		onLoad(option) {
			console.log(option)
			this.params = option
			this.getDoctorScheduleTimeData()
			// doctorId: this.doctorId,
			// registerDate: this.registerDate,
			// noon: this.noon,
			// scheduleId: this.scheduleId
		},
		methods: {
			getDoctorScheduleTimeData() {
				getDoctorScheduleTime(this.params).then((res) => {
					this.doctor = res.data
				}).catch((err) => {
					uni.navigateBack()
				})
			},
			changeUser(item) {
				this.userId = item.id
			},
			handlePostAppointmentOrder(doctor,appoint ) {
				postAppointmentOrder({
						familyId: this.userId,
					  scheduleId: appoint.scheduleId,
					  timeId: appoint.id,
					  departmentId: doctor.departmentId,
					  doctorId:doctor.id,
					  registerDate: doctor.registerDate,
					  noon: appoint.noon,
					  startTime: appoint.startTime,
					  endTime: appoint.endTime,
					  registerFee: this.params.registerFee
				}).then((res) => {
					
					this.getAppointmentDetail(res.data.recordId)
				}).catch((err) => {
					console.log(err)
					uni.showToast({
						title: err.msg,
						icon:'error'
					})
					
					// uni.navigateBack()
				})
			},
			getAppointmentDetail(id) {
				getAppointmentRecordDetail({recordId: id}).then((res) => {
					if(res.data.status == 1) {
						if(res.data.payStatus == 0) {
							uni.navigateTo({
								url:'/pages/hospital/submit?recordId='+id
							})
						}else{
							uni.navigateTo({
								url:'/pages/hospital/reserve-success?recordId='+id
							})
						}
						
						return;
					}
					if(res.data.status == 1) {
						uni.navigateTo({
							url:'/pages/hospital/reserve-success?recordId='+id
						})
						return;
					}
				}).catch((err) => {
					
				})
			},
			// 通用跳转
			navTo(route) {
				if (!route) return;
				uni.navigateTo({
					url:route
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.reserve-time {
		.doctor-pannel {
			background: #FFFFFF;
		}

		.doctor {
			display: flex;
			align-items: center;
			padding: 25rpx;

			image {
				width: 119rpx;
				height: 119rpx;
				border-radius: 50%;
			}

			.des {
				padding-left: 30rpx;

				.name {
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #010101;
					// padding-bottom: 10rpx;
				}

				.fs1 {
					font-size: 33rpx;

				}

				.fs2 {
					font-size: 27rpx;
				}
			}
		}
	}

	.time-pannel {
		margin-top: 34rpx;
	}

	.u-collapse-content {
		.tit {
			font-size: 27rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #020202;
			line-height: 81rpx;
			padding: 20rpx 45rpx;
		}

		.patient-list {
			display: flex;
			align-items: center;
			padding: 0rpx 45rpx 40rpx 45rpx;

			.item {
				width: 86rpx;
				height: 86rpx;
				background: #FFFFFF;
				border: 1px solid #8A8A8A;
				border-radius: 50%;
				text-align: center;
				line-height: 86rpx;
				color: #020202;
				font-size: 27rpx;
				font-family: Adobe Heiti Std;
				margin-right: 30rpx;

				&.active {
					background: #388CEB;
					color: #FEFEFE;
				}
			}

		}
	}

	.arrow-down {
		width: 30.67rpx;
		height: 18rpx;
	}

	.fs2 {
		color: #388CEB;
	}

	/deep/ .u-cell__value {
		color: #030303;
		font-size: 27rpx;
	}

	/deep/ .u-cell__right-icon-wrap--down {
		transform: rotate(-90deg);
	}

	/deep/ .u-cell__right-icon-wrap--up {
		transform: rotate(0deg);
	}

	/deep/ .u-collapse-item__content__text {
		padding: 0;
		background: #fff
	}

	/deep/ .u-button--large {
		height: 67rpx;
		background: #388CEB;
		border-radius: 7rpx;
		color: #FFFCFC;
		font-size: 27rpx;
	}

	/deep/ .u-cell {
		background-color: #fff;
	}
</style>
