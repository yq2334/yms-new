<template>
	<view class="more-detail">
		<view class="warn-wrapper">
			<u--image  :src="'../../static/images/warn.png'" width="50rpx" height="50rpx" :customStyle="{'marginBottom': '10rpx'}"></u--image>
			<text>注:该明细仅供查右，如需报销等用途请到就诊医院打印明细清单</text>
		</view>
		<view class="detail-pannel">
			<u-collapse accordion>
				<u-collapse-item title="西药" v-for="(item,index) in 4" :key="index">
					<text slot="value" class="u-page__item__title__slot-title ">小计：100.00元 </text>
					<text slot="right-icon">
						<img class="arrow-down" src="../../static/images/arrow-down.png" alt="">
					</text>
					<view class="u-collapse-content">
						<view class="table">
							<u-row justify="space-between" customStyle="margin-bottom: 10px" class="table-title">
								<u-col span="3">
									<text>项目名称</text>
								</u-col>
								<u-col span="3" textAlign="center">
									<text>数量</text>
								</u-col>
								<u-col span="3" textAlign="center">
									<text>单价</text>
								</u-col>
								<u-col span="3" textAlign="center">
									<text>总价 </text>
								</u-col>
							</u-row>
							<u-row justify="space-between" customStyle="margin-bottom: 10px" class="table-body" v-for="(item,index) in 4" :key="index">
								<u-col span="3">
									<text>xxx</text>
								</u-col>
								
								<u-col span="3" textAlign="center">
									<text>1</text>
								</u-col>
								<u-col span="3" textAlign="center">
									<text>20</text>
								</u-col>
								<u-col span="3" textAlign="center">
									<text>20</text>
								</u-col>
							</u-row>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.more-detail{
	.warn-wrapper{
		margin-top: 15rpx;
		background: #FFFFFF;
		padding: 12rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #E93030;
	}
	.detail-pannel {
		margin-top: 34rpx;
	}
	.table{
		padding: 20rpx 0 20rpx  30rpx;
		&-title{
			color: #030303;
		}
		&-body{
			color: #7F8081;
		}
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
		font-size: 33rpx;
	}
	/deep/ .u-cell__title-text{
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
	
}
</style>
