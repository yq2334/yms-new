<template>
	<view class="home">
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="1" button="inside" :show="false" :placeholder="'搜索平台'"
				@focus="doSearch" v-model="keyword"></mSearch>
		</view>
		<view class="swiper">
			<swiper @change="handleDotChange" autoplay="true">
				<swiper-item>
					<view class="swiper-item">
						<image :src="banner" mode="aspectFill" />
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image :src="banner" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<uni-notice-bar :showIconImg="notice" scrollable backgroundColor="transparent" color="#121212"
				text="信用+医疗正式上线" />

		</view>
		<view class="home-list">
			<view class="item" @tap="navToHospital(item)" v-for="(item, index) in hospitalList" :key="item.id">
				<!-- <view class="city">
					{{item.contry}}
				</view> -->
				<text>{{ item.contry }}{{ item.name }} {{ item.underConstruction ? '（建设中）' : '' }}</text>
				<view class="icon-circle-arrow-right">

				</view>
			</view>


		</view>
		<view class="home-foot">
			<text>主办单位：长沙市发展和改革委员会</text>
		</view>
	</view>
</template>
<script>
import {
	logout,

} from '@/api/login';
import {
	getRegionList,
} from '@/api/hospital/index.js';
import mSearch from '@/components/rf-search/rf-search';
import banner from '@/static/images/banner.png'
import notice from '@/static/images/notice.png'
export default {
	data() {
		return {
			banner,
			notice,
			text1: '欢迎体验ZRAdmin移动版',
			keyword: '',
			hospitalList: []
		};
	},
	components: {
		mSearch
	},
	onLoad() {
		this.initData();
		uni.setNavigationBarTitle({
			title: "信用医疗"
		})
	},
	created() {
		this.getHospitalList()
	},
	methods: {
		// 初始化数据
		initData() {
			this.user = uni.getStorageSync('user');

		},
		getHospitalList() {
			getRegionList().then((res) => {

				this.hospitalList = res.data
				console.log(this.hospitalList)
			}).catch((err) => {

			})
		},
		handleDotChange() { },
		// 通用跳转
		navTo(route) {
			if (!route) return;
			uni.navigateTo({
				url: route
			})

		},
		navToHospital(item) {
			if (item.underConstruction) {
				this.showTips()
				return;
			}
			uni.navigateTo({
				url: "list?id=" + item.id,
			});
		},
		showTips() {
			this.$modal.showToast('模块建设中~')
		},
		doSearch() {
			console.log('focus')
			this.navTo('search')
		}

	}
};
</script>
<style lang="scss">
.home {
	padding: 15rpx;

	.swiper {
		margin: 25rpx 0;

		.swiper-item {
			height: 100%;
		}
	}

	&-list {
		padding-top: 20rpx;

		.item {
			background: linear-gradient(270deg, #325FDE 0%, #78B6F0 100%);
			border-radius: 20rpx;
			position: relative;
			box-shadow: 2px 3rpx 6rpx 0px rgba(66, 66, 66, 0.5);
			padding: 48rpx;
			font-size: 27rpx;
			color: #FEFEFE;
			text-align: center;
			margin-bottom: 35rpx;

			.city {
				position: absolute;
				width: 168rpx;
				height: 52rpx;
				background: #2060F0;
				box-shadow: 2px 3rpx 6rpx 0px rgba(66, 66, 66, 0.44);
				border-radius: 5rpx;
				text-align: center;
				line-height: 52rpx;
				font-size: 27rpx;
				color: #FEFEFE;
				top: -20rpx;
				left: 48rpx;
			}

			.icon-circle-arrow-right {
				position: absolute;
				top: 50%;
				right: 48rpx;
				transform: translateY(-50%);
			}
		}
	}

	&-foot {
		text-align: center;
		color: #010101;
		font-size: 27rpx;
		padding-bottom: 30rpx;
	}
}

.icon-circle-arrow-right {
	display: block;
	width: 47rpx;
	height: 47rpx;
	background: url(../../static/images/circle-arrow-right.png) no-repeat;
	background-size: 100% 100%;
}
</style>
