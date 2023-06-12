<template>
	<view class="update">
		<u-cell-group :border="false">
			<u-cell title="版本更新"  :isLink="true"  v-for="(item,index) in childList" :key="index" @click="handleText(item)">
				<view class="cell-title" slot="title">
					<text>{{item.title}}</text>
					<text class="fs">2023-09-09</text>
				</view>
			</u-cell>
			
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childList: [{
				  title: '1.0.3版本更新？',
				  content: '请点击[我的] - [应用设置] - [退出登录]即可退出登录',
				}, {
				  title: '1.0.2版本更新？',
				  content: '请点击[我的] - [选择头像] - [点击提交]即可更换用户头像',
				}, {
				  title: '1.0.1版本更新？',
				  content: '请点击[我的] - [应用设置] - [修改密码]即可修改登录密码',
				}]
			}
		},
		methods: {
			handleText(item) {
			  this.$tab.navigateTo(`detail?title=${item.title}&content=${item.content}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.cell-title{
		text{
			display: block;
			font-size: 33rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #000000;
			line-height: 1.5;
		}
		.fs{
			font-size: 27rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #7E7E7E;
		}
	}
	/deep/ .u-cell__body{
		padding: 10rpx 30rpx;
	}
	/deep/ .u-cell__title-text{
		color: #000;
		font-size: 33rpx;
	}
	/deep/ .u-line{
		border-color: #315ACE !important;
	}
	/deep/ .u-icon__icon--info{
		color: #3D3D3D;
	}
</style>
