<template>
	<view class="">
		<view class="auth">
			<view class="fs title">
				服务介绍 
			</view>
			<view class="fs" >
				<u-parse :content="content"></u-parse>
			</view>
			<view class="btn-box">
				<u-button @tap="confirm('确认开启信用服务', open)" type="primary" color="#388CEB"  text="开启服务">
				</u-button>
				<u-button @tap="confirm('确认关闭信用服务', close)" type="primary" color="#388CEB" text="关闭服务">
				</u-button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {openCm,closeCm } from '@/api/setting/index.js'
	export default {
		data() {
			return {
				checked: true,
				content: 'xxxxxxxxx'
			}
		},
		methods: {
			confirm(content, callback) {
				uni.showModal({
					title: '系统提示',
					content: content,
					cancelText: '取消',
					confirmText: '确定',
					success: function(res) {
						if (res.confirm) {
							callback()
						}
					}
				})
			},
			open() {
				openCm().then(() => {
					this.$modal.msgSuccess("开启服务成功")
				})
			},
			close() {
				closeCm().then(() => {
					this.$modal.msgSuccess("关闭服务成功")
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
.auth{
	background: #FFFFFF;
	border: 1px solid #315ACE;
	border-radius: 7rpx;
	margin: 30rpx;
	padding: 30rpx;
	.title{
		text-align: center;
		
	}
	&-content{
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #000000;
		padding: 5rpx 30rpx;
		height: 60vh;
	}
	.fs{
		color: #388CEB;
	}
	
}
.checkbox{
	padding: 0rpx 30rpx;
}
.btn-box{
	margin-top: 500rpx;
}
/deep/ .u-button{
	width: 600.67rpx;
	height: 91.33rpx;
	margin-bottom: 60rpx;
}
</style>
