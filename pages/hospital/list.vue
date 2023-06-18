<template>
	<view class="hospital">
		<view class="hospital-list">
			<view class="item" @tap="navToHospital(item)" v-for="(item, index) in hospitalList" :key="item.id">

				<text>{{item.name}}{{item.underConstruction ? '（建设中）' : ''}}</text>
				<view class="icon-circle-arrow-right">

				</view>
			</view>
		</view>
		<view class="hospital-bottom">

			<view class="flex">
				<text class="tit">主办单位: </text>
				<ul class="cont">
					<li>{{mainDesc}}</li>

				</ul>
			</view>
			<view class="flex">
				<text class="tit">承办单位: </text>
				<!-- <u-parse :content="hostingDesc"></u-parse> -->
				<ul class="cont" >
					<li v-for="(item,index) in hostingDesc" :key="index">{{item}}</li>
					<!-- <li> 长沙县卫生健康局</li>
					<li>长沙县医疗保障局</li> -->
				</ul>
			</view>

		</view>
	</view>

</template>

<script>
	import {
		getHospitalById,
	} from '@/api/hospital/index.js';
	export default {
		data() {
			return {
				id: '',
				hospitalList: [
					{
						name: '长沙县星沙医院',
						id: 1
					}
				],
				hostingDesc: [],
				mainDesc: ''
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.id = option.id
			
		},
		created() {
			this.getHospitalList()
		},
		methods: {
			getHospitalList() {
				getHospitalById({
					id: this.id
				}).then((res) => {
					
					this.hospitalList = res.data.list
					this.hostingDesc =  res.data.hostingDesc.split('\r\n')
					this.mainDesc = res.data.mainDesc
					console.log(this.hospitalList)
					uni.setNavigationBarTitle({
						title: res.data.mainDesc
					})
				}).catch((err) => {
					
				})
			},
			// 通用跳转
			navTo(route) {
				if (!route) return;

				this.$mRouter.push({
					route
				});
			},
			navToHospital(item) {
				if(item.underConstruction) {
					this.showTips()
					return;
				}
				this.$tab.reLaunch('/pages/index?id='+ item.id)
				// uni.navigateTo({
				// 	url: "index?id=" + item.id,
				// });
			},
			showTips() {
				this.$modal.showToast('模块建设中~')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hospital-list {

		padding: 15rpx 20rpx;

		.item {
			background: linear-gradient(270deg, #325FDE 0%, #78B6F0 100%);
			border-radius: 20rpx;
			position: relative;
			box-shadow: 2px 3rpx 6rpx 0px rgba(66, 66, 66, 0.5);
			padding: 48rpx;
			font-size: 27rpx;
			color: #FEFEFE;

			margin-bottom: 35rpx;



			.icon-circle-arrow-right {
				position: absolute;
				top: 50%;
				right: 48rpx;
				transform: translateY(-50%);
			}
		}

		.icon-circle-arrow-right {
			display: block;
			width: 47rpx;
			height: 47rpx;
			background: url(../../static/images/circle-arrow-right.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.hospital-bottom {
		position: absolute;
		font-size: 27rpx;
		color: #0231B7;
		line-height: 37rpx;
		bottom: 150rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		letter-spacing: 8rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.flex {
			display: flex;
			justify-content: center;
			width: 100%;

			.tit {
				text-align: right;
				width: 40%;
			}

			.cont {
				width: 60%;
			}

			ul {
				text-align: left;
				padding-left: 0;

				li {
					list-style: none;
				}
			}
		}
	}
</style>
