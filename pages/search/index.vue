<template>
	<view class="search-page">
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="1" :show="false" :button="'outside'" :placeholder="'搜索医生'"
				@search="doSearch(false)" @confirm="doSearch(false)" v-model="keyword" @input="inputChange">
			</mSearch>
		</view>
		<view class="search-list">
			<view class="item" v-for="(item,index) in 4" :key="index">
				<u-avatar size="54" :src="'../../static/images/avatar-default.png'"></u-avatar>
				<view class="dec">
					<view class="name">
						陈鹏  
					</view>
					<view class="fs1">
						消化内科
					</view>
					<view class="fs1">
						主任医生
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/rf-search/rf-search';

	export default {
		data() {
			return {
				keyword: '陈'
			}
		},
		components: {
			mSearch
		},
		methods: {
			inputChange(e) {
				console.log(e)
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
