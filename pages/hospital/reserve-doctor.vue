<template>
	<view class="reDoctor">
		<view class="reDoctor-nav">
			<view class="keshi">
				{{name}}
			</view>
			<view class="hosp">
				{{userInfo.defaultHospitalName}}
			</view>
		</view>
		<view class="reDoctor-list" v-for="(item,index) in list" :key="index">
			<view class="item">
				<view class="doctor">
					
					<image v-if="item.imgUrl" :src="item.imgUrl" mode=""></image>
					<image v-else src="/static/images/doctor.png" mode=""></image>
					<view class="des">
						<view class="name">
							<text class="fs1">{{item.name}} </text>
							<text class="fs2">{{item.levelName}}</text>
						</view>
						<view class="fs2">
							擅长：{{item.introduction}}
						</view>
					</view>
				</view>
				<view class="yuhao-list">
					<view class="yuhao" @tap="navToHospital(item,schedule )" v-for="(schedule, indexs) in item.scheduleList" :key="indexs">
						<view class="lf">
							<text class="icon icon-time"></text>
							<text>{{schedule.registerDate}}（{{schedule.weekday}}）{{schedule.startTime}} </text>
						</view>
						<view class="rf">
							<text>余号{{schedule.remainCount}}</text>
							<uni-icons size="18" color="#222" type="right"></uni-icons>
						</view>
					</view>
					
					<view class="yuhao no-border">
						<view class="lf">
							<text class="icon icon-more"></text>
							<text class="fs3">查看更多 </text>
						</view>
						<view class="rf">

							<uni-icons size="18" color="#222" type="right"></uni-icons>
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
		getDoctor,
		getDoctorScheduleTime
	} from '@/api/hospital/index.js';
	export default {
		data() {
			return {
				id: '',
				doctorId: '',
				name: '',
				list: [{
					time: '2023-05-01（星期一）上午',
					yuhao: 2,
					id: 1
				}]
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad(option) {
			console.log(option.id)
			this.id = option.id
			if(option.doctorId) {
				this.doctorId = option.doctorId
			}
			  
			this.name = option.name
			this.getDoctorList()
		},
		methods: {
			getDoctorList() {
				getDoctor({
					departmentId: this.id,
					doctorId: this.doctorId
				}).then((res) => {
					this.list = res.data
				}).catch((err) => {
					uni.navigateBack()
				})
			},
			
			navToHospital(item, schedule) {
				uni.navigateTo({
					url: "reserve-time?departmentId=" + item.departmentId + "&doctorId=" + item.id + "&registerDate=" + schedule.registerDate + "&noon=" + schedule.noon+ "&scheduleId=" + schedule.id + "&registerFee=" + schedule.registerFee,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.reDoctor {
		&-nav {
			width: 347.33rpx;
			height: 111.33rpx;
			background: url(@/static/images/duobianxing.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 48rpx;

			.keshi {
				font-size: 33.33rpx;
				color: #fff;
				font-weight: bold;
			}

			.hosp {
				color: #0E0E0E;
				font-size: 20rpx;
			}
		}

		&-list {
			background: #FFFFFF;
			border: 1rpx solid #315ACE;
			border-radius: 20rpx;
			margin: 30rpx;

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

			.yuhao-list {
				.yuhao {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 18rpx 25rpx;
					border-top: 1rpx solid #8A8A8A;
					border-bottom: 1rpx solid #8A8A8A;
					font-size: 27rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #010101;
				}

				.lf {
					display: flex;
					align-items: center;

					.icon {
						margin-right: 15rpx;
					}
				}

				.rf {
					display: flex;
					align-items: center;

					.uni-icons {
						margin-left: 15rpx;
					}
				}

				.fs3 {
					font-size: 27rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #4493EC;
				}

				.icon-time {
					display: block;
					width: 40rpx;
					height: 40rpx;
					background: url(@/static/images/time.png) no-repeat;
					background-size: 100% 100%;
				}

				.icon-more {
					display: block;
					width: 40rpx;
					height: 40rpx;
					background: url(@/static/images/more.png) no-repeat;
					background-size: 100% 100%;
				}

				.no-border {
					border-bottom: 0;
				}
			}

		}
	}
</style>