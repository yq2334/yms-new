<template>
	<view class="search-page">
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="1" :show="false" :button="'outside'" :placeholder="'搜索医院'"
				@search="doSearch(false)" @confirm="doSearch(false)" v-model="keyword" @input="inputChange">
			</mSearch>
		</view>
		<view class="search-list">
			<view class="item" v-for="(item,index) in filterList" :key="index" @tap="handleSelectHospital(item)">
				<u-avatar size="54" :src="'../../static/images/hospital2.png'"></u-avatar>
				<view class="dec">
					<view class="name">
						{{item.name}}  
					</view>
					<view class="fs1">
						{{item.underConstruction ? '（建设中）' : ''}}
					</view>
					<!-- <view class="fs1">
						主任医生
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getAllHospital, selectHospital} from '@/api/hospital/index.js'
	import mSearch from '@/components/rf-search/rf-search';
	
	export default {
		data() {
			return {
				keyword: '陈',
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
				getAllHospital().then((res) => {
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
			handleSelectHospital(item) {
				if(item.underConstruction) {
					this.showTips()
					return;
				}
				selectHospital({
					id: item.id
				}).then((res) => {
					this.$store.dispatch('GetInfo').then(res=>{
						this.$tab.reLaunch('/pages/index?id='+ item.id + '&name=' + item.name)
					})
					// this.$tab.reLaunch('/pages/index?id='+ item.id + '&name=' + item.name)
				
				}).catch((err) => {
					
				})
			},
			showTips() {
				this.$modal.showToast('模块建设中~')
			}
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
