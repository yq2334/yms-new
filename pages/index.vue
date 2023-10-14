<template>
	<view class="hospital-home">
		<view class="select-hosp" @tap="handleSelect">
			<text class="name">{{ name }}</text>
			<view class="sel">
				选择
			</view>
		</view>
		<view class="hospital-content">
			<view class="hospital-wrapper">
				<view class="name">
					门急诊
				</view>
				<view class="list">
					<view class="item" @tap="navTo('/pages/hospital/reserve')">
						<view class="img">
							<img src="../static/images/yuyueguahao.png" alt="">
						</view>
						<text class="tit">预约挂号</text>
					</view>
					<view class="item" @tap="navTo('/pages/order/guahao')">
						<view class="img">
							<img src="../static/images/guahaojilu.png" alt="">
						</view>
						<text class="tit">挂号记录</text>
					</view>
					<view class="item">
						<view class="img">
							<img src="../static/images/jiaofeijilu.png" alt="">
						</view>
						<text class="tit">缴费订单</text>
					</view>
				</view>
			</view>
			<view class="hospital-wrapper">
				<view class="name">
					住院
				</view>
				<view class="list">
					<view class="item">
						<view class="img">
							<img src="../static/images/riqingdan.png" alt="">
						</view>
						<text class="tit">每日清单</text>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
import {
	selectHospital,
} from '@/api/hospital/index.js';
export default {
	data() {
		return {
			id: '',
			name: ''
		}
	},
	onLoad(option) {
		console.log(option.id)
		this.id = option.id
		this.name = this.$store.getters.userInfo.defaultHospitalName
		let token=this.$store.getters.token
		if(!token){
			this.$tab.navigateTo('/pages/login')
		}
		uni.setNavigationBarTitle({
			title: this.name
		})
	},
	created() {
		// this.getHospitalList()
	},
	methods: {
		// getHospitalList() {

		// },
		handleSelect() {
			this.$tab.navigateTo("/pages/hospital/index?id=" + this.id);
		},
		navTo(route) {
			if (!route) return;

			uni.navigateTo({
				url: route
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.hospital-home {
	padding-top: 20rpx;

	.select-hosp {
		display: flex;
		align-items: center;
		padding: 0 43rpx;

		.name {
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #090909;
			letter-spacing: 8rpx;
		}

		.sel {
			width: 106rpx;
			height: 40rpx;
			background: #659FEB;
			border-radius: 7rpx;
			font-size: 27rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #FFFFFF;
			text-align: center;
			line-height: 40rpx;
			margin-left: 10rpx;
		}
	}
}

.hospital-content {
	padding-top: 118rpx;
}

.hospital-wrapper {
	background: #FFFFFF;
	box-shadow: 2rpx 3rpx 6rpx 0rpx rgba(66, 66, 66, 0.44);
	border-radius: 7rpx;
	margin: 30rpx 30rpx;
	position: relative;
	margin-bottom: 80rpx;

	.name {
		width: 277rpx;
		height: 74rpx;
		background: linear-gradient(0deg, #74B3F0 0%, #3360DE 100%);
		border-radius: 7rpx;
		text-align: center;
		line-height: 74rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FEFEFE;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -37rpx;
	}

	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 100rpx 73rpx 54rpx 73rpx;

		.item {

			.img {
				width: 89rpx;
				height: 89rpx;
				border-radius: 50%;
				background-color: #3360DE;
				margin-bottom: 50rpx;
				margin: 0 auto;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.tit {
				display: block;
				text-align: center;
				font-size: 27rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #010101;
				padding-top: 20rpx;
			}



		}
	}

}</style>
