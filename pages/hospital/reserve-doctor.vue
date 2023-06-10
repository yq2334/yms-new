<template>
	<view class="reDoctor">
		<view class="reDoctor-nav">
			<view class="keshi">
				风湿免疫科
			</view>
			<view class="hosp">
				长沙县星沙医院
			</view>
		</view>
		<view class="reDoctor-list" v-for="(item,index) in 2" :key="index">
			<view class="item">
				<view class="doctor">
					<img src="../../static/images/doctor.png" alt="">
					<view class="des">
						<view class="name">
							<text class="fs1">陈鹏  </text>
							<text class="fs2">名老专家</text>
						</view>
						<view class="fs2">
							擅长：擅长各种疑难杂症问题的整治
						</view>
					</view>
				</view>
				<view class="yuhao-list">
					<view class="yuhao" @tap="navToHospital(item)" v-for="(item,index) in list" :key="index">
						<view class="lf">
							<text class="icon icon-time"></text>
							<text>2023-05-01（星期一）上午                           </text>
						</view>
						<view class="rf">
							<text>余号2</text>
							<uni-icons size="18" color="#222" type="right"></uni-icons>
						</view>
					</view>
					<view class="yuhao">
						<view class="lf">
							<text class="icon icon-time"></text>
							<text>2023-05-01（星期一）上午                           </text>
						</view>
						<view class="rf">
							<text>余号2</text>
							<uni-icons size="18" color="#222" type="right"></uni-icons>
						</view>
					</view>
					<view class="yuhao no-border">
						<view class="lf">
							<text class="icon icon-more"></text>
							<text class="fs3">查看更多                          </text>
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
	export default {
		data() {
			return {
				list: [
					{
						time: '2023-05-01（星期一）上午',
						yuhao: 2,
						id: 1
					}
				]
			}
		},
		onLoad(option) {
			console.log(option.id)
			
		},
		methods: {
			navToHospital(item) {
				uni.navigateTo({
					url: "reserve-time?id="+ item.id, 
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
				font-size:33.33rpx;
				color: #fff;
				font-weight: bold;
			}
			.hosp{
				color: #0E0E0E;
				font-size:20rpx;
			}
		}
		&-list{
			background: #FFFFFF;
			border: 1rpx solid #315ACE;
			border-radius: 20rpx;
			margin: 30rpx ;
			.doctor{
				display: flex;
				align-items: center;
				padding: 25rpx;
				img{
					width: 119rpx;
					height: 119rpx;
					border-radius: 50%;
				}
				.des{
					padding-left: 30rpx;
					.name{
						font-family: Adobe Heiti Std;
						font-weight: normal;
						color: #010101;
						// padding-bottom: 10rpx;
					}
					.fs1{
						font-size: 33rpx;
						
					}
					.fs2{
						font-size: 27rpx;
					}
				}
			}
			.yuhao-list{
				.yuhao{
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
				.lf{
					display: flex;
					align-items: center;
					.icon{
						margin-right: 15rpx;
					}
				}
				.rf{
					display: flex;
					align-items: center;
					.uni-icons{
						margin-left: 15rpx;
					}
				}
				.fs3{
					font-size: 27rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #4493EC;
				}
				.icon-time{
					display: block;
					width: 40rpx;
					height: 40rpx;
					background: url(@/static/images/time.png) no-repeat;
					background-size: 100% 100%;
				}
				.icon-more{
					display: block;
					width: 40rpx;
					height: 40rpx;
					background: url(@/static/images/more.png) no-repeat;
					background-size: 100% 100%;
				}
				.no-border{
					border-bottom: 0;
				}
			}
			
		}
	}
</style>
