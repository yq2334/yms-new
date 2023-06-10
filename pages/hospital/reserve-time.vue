<template>
	<view class="reserve-time">
		<view class="doctor-pannel">
			<view class="doctor">
				<img src="../../static/images/doctor.png" alt="">
				<view class="des">
					<view class="name">
						<text class="fs1">陈鹏 </text>
						<text class="fs2">名老专家</text>
					</view>
					<view class="fs2">
						擅长：擅长各种疑难杂症问题的整治
					</view>
				</view>
			</view>
			<view class="">
				<u-cell-group>
					<u-cell title="就诊科室" value="风湿免疫科" :titleStyle="titleStyle"></u-cell>
					<u-cell title="挂号日期" value="2023-05-01" :titleStyle="titleStyle"></u-cell>
					<u-cell title="挂号类型" value="普通号" :titleStyle="titleStyle"></u-cell>
					<u-cell title="挂号费" value="元" :titleStyle="titleStyle"></u-cell>
				</u-cell-group>
			</view>
		</view>
		<view class="time-pannel">
			<u-collapse accordion>
				<u-collapse-item title="08:00——08:30" v-for="(item,index) in 4" :key="index">
					<text slot="value" class="u-page__item__title__slot-title">余号<text class="fs2">1个</text> </text>
					<text slot="right-icon">
						<img class="arrow-down" src="../../static/images/arrow-down.png" alt="">
					</text>
					<text class="u-collapse-content">
						<view class="tit">
							请选择就诊人
						</view>
						<view class="patient-list">
							<view class="item" :class="userId == item.id ? 'active' : ''"
								v-for="(item,index) in patients" :key="index" @tap="changeUser(item)">
								{{item.name}}
							</view>
							<view class="item add">
								+
							</view>
						</view>
						<u-button @tap="navTo('submit')" type="primary" color="#388CEB" size="large" text="确认挂号">
						</u-button>
					</text>
				</u-collapse-item>
			</u-collapse>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					'color': '#7F8081',
					'fontsize': '27rpx'
				},
				userId: 1,
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
			console.log(option.id)

		},
		methods: {
			changeUser(item) {
				this.userId = item.id
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

			img {
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
