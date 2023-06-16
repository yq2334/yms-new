<template>
	<view class="container">

		<u-cell-group>
			<u-cell title="头像" :isLink="true"  url="/pages/mine/info/edit">
				<view class="" slot="value">
					<u--image :showLoading="true" :src="userInfo.avatar" width="63rpx" height="63rpx" mode="widthFix"
						shape="circle">
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u--image>
				</view>
			</u-cell>
			<u-cell :isLink="true"  title="手机号码" :value="userInfo.phone" url="/pages/mine/info/phone-edit"></u-cell>
			<u-cell :isLink="true"  title="实名认证" :value="userInfo.isRealNameAuth ? '已认证' : '未认证'" url="/pages/mine/auth/identy"></u-cell>
		</u-cell-group>
		<u-button @tap="navTo('edit')" type="primary" color="#388CEB" size="large" text="更多就诊档案信息">
		</u-button>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		getUserProfile
	} from "@/api/system/user"

	export default {
		data() {
			return {
				user: {},
				roleGroup: "",
				postGroup: ""
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			// this.getUser()
		},
		methods: {
			getUser() {
				getUserProfile().then(response => {
					this.user = response.data.user
					this.postGroup = response.data.postGroup

					var groups = response.data.roles
					this.roleGroup = groups.toString()
				})
			},
			// 通用跳转
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
	page {
		background-color: #ffffff;
	}

	.avatar-wrap {
		margin: 10px 20px;
	}
	/deep/ .u-button--large {
		
		height: 91rpx;
		background: #388CEB;
		border-radius: 7rpx;
		color: #FFFCFC;
		font-size: 27rpx;
		width: 606rpx;
		margin: 67rpx auto;
	}
</style>
