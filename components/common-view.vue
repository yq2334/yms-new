<template>
	<view class="common" :style="{paddingTop: barHeight + 'px' }">
		<slot></slot>
	</view>
</template>

<script>
	  import storage from '@/utils/storage'
	export default {
		name: "common-view",
		data() {
			return {
				barHeight: uni.getStorageSync('barH')
				// return `calc(${this.$statusBarHeight } + 44px)`
			};
		},
		
		mounted() {
			console.log(uni.getStorageSync('barH'))
			
		},
		computed: {

		},
	}
</script>

<style lang="scss">

</style>