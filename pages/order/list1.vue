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
						<text>就诊人 陈鹏</text>
					</u-col>
				</u-row>
			</view>
			<view class="right" @tap="showChangeUser = !showChangeUser">
				<text>切换</text>
				<text class="icon icon-change"></text>
			</view>
		</view>
		 <u-transition :show="showChangeUser" >
		       <view class="change-user" >
		       	<u-radio-group v-model="value" @change="changeUser">
		       		<view class="radio-item">
		       			<view class="left">
		       				<view class="circle">
		       					陈鹏
		       				</view>
		       				<text>陈鹏</text>
		       				<view class="tag">
		       					本人
		       				</view>
		       			</view>
		       			<u-radio shape="square" name="陈鹏" label=""></u-radio>
		       		</view>
		       		<view class="radio-item">
		       			<view class="left">
		       				<view class="circle">
		       					陈**
		       				</view>
		       				<text>陈**</text>
		       				<view class="tag">
		       					父母
		       				</view>
		       			</view>
		       			<u-radio shape="square" name="陈**" label=""></u-radio>
		       		</view>
		       	</u-radio-group>
		       </view>
		    </u-transition>
			<view class="u-select">
				<view class="st" @click="showPicker = true">
					<text>{{query}}</text>
					<u-icon name="arrow-down-fill"></u-icon>
				</view>
				<u-picker :show="showPicker" ref="uPicker" :columns="columns" :keyName="'label'" :closeOnClickOverlay="true"
					@change="changeHandler" @confirm="confirm" @cancel="showPicker = false"></u-picker>
			</view>
		<view class="tab">
			<view class="item" :class="active == item.key ? 'active' : ''" v-for="(item,index) in tabList" :key="item.key" @tap="changeTab(item)">
				{{item.name}}
			</view>
		</view>
		<view class="tab-list">
			<view class="item" v-for="(item,index) in 2" :key="index">
				<view class="title">
					<text>住院</text>    
				</view>
				<view class="info">
					<view class="lft">
						<u--image  src="../../static/images/hospital2.png" width="88rpx" height="88rpx" ></u--image>
						<view class="dec">
							<view class="name">
								陈鹏
							</view>
							<view class="fs1">
								某某某医院
							</view>
						</view>
					</view>
					<view class="rtf">
						已支付
					</view>
				</view>
				<view class="bottom">
					<view class="lft">
						<u--image  src="../../static/images/medbox.png" width="48rpx" height="46rpx" ></u--image>
						<view class="name">
							病区：xxx-病区
						</view>
					</view>
					<view class="rtf" @click="navTo('/pages/order/detail4')">
						<u-button type="primary" :plain="true" :hairline="true" shape="circle" text="查看详情"></u-button>
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
				showChangeUser: false,
				value: '陈**',
				active: 'menzhen',
				tabList: [
					{
						name: '门诊',
						key: 'menzhen'
					},
					{
						name: '急诊',
						key: 'jizhen'
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
				showPicker: false,
				query: '长沙县星沙医院1',
			};
		},
		methods: {
			changeTab(item) {
				this.active = item.key
			},
			changeUser(name) {
				console.log(name)
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
				this.query = e.value[0].label
				this.showPicker = false
			},
			navTo(route) {
				if (!route) return;
			
				uni.navigateTo({
					url: route
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
		.tab{
			
			margin: 30rpx auto;
			background: #FFFFFF;
			border: 1px solid #4095E5;
			border-radius: 41rpx;
			display: flex;
			align-items: center;
			width: 517rpx;
			.item{
				width: 50%;
				height: 82rpx;
				line-height: 82rpx;
				text-align: center;
				font-size: 33rpx;
				color: #030303;
				font-family: Adobe Heiti Std;
				border-radius: 41rpx;
				&.active{
					background: #3665DF;
					color: #FFFFFF;
					width: 65%;
				}
			}
		}
		.tab-list{
			margin: 15rpx 15rpx;
			.item{
				background: #FFFFFF;
				border: 1px solid #315ACE;
				border-radius: 20rpx;
				margin-bottom: 40rpx;
				.title{
					background-color: #3665DF;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					font-size: 33rpx;
					font-family: Adobe Heiti Std;
					padding: 14rpx 34rpx;
					color: #FFFFFF;
					text{
						margin-right: 20rpx;
					}
				}
				.info{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx 45rpx;
					border-bottom: 1rpx solid #8A8A8A;
					.lft{
						display: flex;
						align-items: center;
						.dec{
							margin-left: 30rpx;
						}
						.name{
							width: 169rpx;
							height: 41rpx;
							background: #F4F4F4;
							border-radius: 7rpx;
							text-align: center;
							line-height: 41rpx;
							margin-bottom: 15rpx;
						}
						.fs1{
							font-size: 33rpx;
							font-family: Adobe Heiti Std;
							line-height: 1;
							color: #4095E5;
						}
					}
					.rtf{
						font-size: 33rpx;
						font-family: Adobe Heiti Std;
						
						color: #010101;
					}
				}
				.bottom{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 35rpx;
					.lft{
						display: flex;
						align-items: center;
						font-size: 33rpx;
						font-family: Adobe Heiti Std;
						color: #010101;
						.name{
							margin-left: 18rpx;
						}
					}
					
				}
			}
		}
	}
	.change-user{
		.radio-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 13rpx 37rpx;
			background: #F4F4F4;
			border-bottom: 1rpx solid #7D7D7D;
			.left{
				display: flex;
				align-items: center;
				.circle{
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
				.name{
					color: #000000;
					
				}
				.tag{
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
	/deep/ .u-button{
		height: 41rpx;
	}
	/deep/ .u-radio-group--row{
		display: block;
	}
</style>
