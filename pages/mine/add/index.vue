<template>
	<view class="mhome">
		<view class="title">
			我的家人
		</view>
		<view class="mhome-list">
			<view class="item" v-for="(item, index) in familyList" :key="index">
				<view class="info">
					<view class="name">
						姓名： {{ item.name }}
						<view class="tag">
							{{ item.relation }}
						</view>
					</view>
					<view class="idCard">
						身份证：{{ item.idNo }}
					</view>
				</view>
				<u-line direction="col" length="55" color="#9F9F9F"></u-line>
				<u--image :src="'../../../static/images/del.png'" width="44rpx" height="44rpx"
					@click="confirmDelete(item)"></u--image>

			</view>

		</view>
		<u-button @tap="navTo('add')" type="primary" color="#388CEB" size="large" text="添加家人">
		</u-button>
	</view>
</template>

<script>
import {
	getFamilyShareList,
	addFamilyMember,
	deleteFamilyMember
} from '@/api/setting/index.js'
import {
	mapGetters
} from 'vuex';
export default {
	data() {
		return {
			familyList: []
		}
	},
	onLoad() {
		// this.initData()
	},
	onShow() {
		this.initData()
	},
	methods: {
		initData() {
			getFamilyShareList().then(response => {
				this.familyList = response.data

			})
		},
		confirmDelete(item) {

			uni.showModal({
				title: '系统提示',
				content: '确认删除',
				cancelText: '取消',
				confirmText: '确定',
				success: (res) => {
					if (res.confirm) {
						this.deleteFamily(item)
					}
				}
			})

		},
		deleteFamily(item) {
			deleteFamilyMember(item.id).then(response => {
				this.$modal.msgSuccess("删除成功")
				this.initData()
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
	background-color: #fff;
}

.mhome {
	.title {
		text-align: center;
		height: 75rpx;
		background: #388CEB;
		border-radius: 7rpx 7rpx 0rpx 0rpx;
		line-height: 75rpx;
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
	}

	&-list {
		padding: 30rpx 60rpx;

		.item {
			padding: 34rpx 20rpx;
			background: #FFFFFF;
			border: 1px solid #388CEB;
			border-radius: 7rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 32rpx;

			.info {
				font-size: 33rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #010101;

				.name {

					display: flex;
					align-items: center;
				}

				.tag {
					width: 110rpx;
					height: 40rpx;
					background: #F4F4F4;
					border: 1px solid #315ACE;
					border-radius: 7rpx;
					text-align: center;
					line-height: 40rpx;
					font-size: 27rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #010101;
					margin-left: 15rpx;
				}
			}
		}
	}
}

/deep/ .u-button--large {
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 40rpx;
	height: 91rpx;
	background: #388CEB;
	border-radius: 7rpx;
	color: #FFFCFC;
	font-size: 27rpx;
	width: 606rpx;

}
</style>
