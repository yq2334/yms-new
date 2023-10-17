<template>
	<view class="search-page">
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="1" :show="false" :button="'outside'" :placeholder="'搜索医生'"
				@search="doSearch(false)" @confirm="doSearch(false)" v-model="keyword" @input="inputChange">
			</mSearch>
		</view>
		<view class="search-list">
			<view class="item" v-for="(item,index) in filterList" :key="index" @tap="handleSelectDoctor(item)">
				<u-avatar v-if="item.imgUrl" size="54" :src="item.imgUrl"></u-avatar>
				<u-avatar v-else size="54" :src="'../../static/images/avatar-default.png'"></u-avatar>
				<view class="dec">
					<view class="name">
						{{item.name}}  
					</view>
					<view class="fs1">
						{{item.departmentName}}
					</view>
					<view class="fs1">
						{{item.levelName}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/rf-search/rf-search';
	import {getAllDoctor} from '@/api/hospital/index.js'
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				filterList: []
			}
		},
		components: {
			mSearch
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				getAllDoctor().then((res) => {
					this.list = res.data
					this.filterList = this.list
				}).catch((err) => {
					
				})
			},
			inputChange(e) {
				console.log(e)
				this.filterList = this.list.filter((item) => {
					return item.name.includes(e)
				})
			},
			handleSelectDoctor(item) {
				uni.navigateTo({
					url: '/pages/hospital/reserve-doctor?id=' + item.deptCode +  "&name=" + item.departmentName + "&doctorId=" + item.doctorId
				})
				
			},
		}
	}
</script>

<style lang="scss" scoped>
.search-box{
	margin: 18rpx;
}
.search-list{
	background-color: #fff;
	
	.item{
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #7D7D7D;
		padding: 30rpx 23rpx 20rpx 23rpx;
		.dec{
			padding-left: 20rpx;
		}
		.name{
			color: #070707;
			font-size: 33rpx;
		}
		.fs1{
			color: #716E6E;
			font-size: 20rpx;
		}
	}
}
</style>
