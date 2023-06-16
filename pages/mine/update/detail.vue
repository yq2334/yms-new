<template>
  <view class="update">
   <view class="view-title">
   	此版本更新内容：
   </view>
	<u-parse :content="content"></u-parse>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        content: ''
      }
    },
    onLoad(options) {
      this.title = options.title
      this.content = options.content
      uni.setNavigationBarTitle({
        title: options.title
      })
    }
  }
</script>

<style scoped>
  page {
    background-color: #ffffff;
  }
	.update{
		padding: 20rpx 50rpx;
	}
  .view-title {
	font-size: 33rpx;
	font-family: Adobe Heiti Std;
	font-weight: normal;
	color: #000000;
	padding-bottom: 20rpx;
  }

  .view-content {
    font-size: 26rpx;
    padding: 12px 5px 0;
    color: #333;
    line-height: 24px;
    font-weight: normal;
  }
</style>
