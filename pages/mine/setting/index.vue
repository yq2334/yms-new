<template>
  <view class="setting-container" :style="{ height: `${windowHeight}px` }">
    <view class="menu-list">
      <u-cell-group :border="false" :customStyle="{ background: '#fff' }">
        <u-cell
          title="关于我们"
          :border="true"
          :isLink="true"
          :rightIconStyle="{
            fontSize: '20rpx',
            justifyContent: 'center',
            background: '#2359D8',
            color: '#fff',
            borderRadius: '50%',
            width: '32rpx',
            height: '32rpx',
          }"
          @click="handleAbout"
        >
        </u-cell>
        <u-cell
          title="联系我们"
          :border="true"
          :isLink="true"
          @click="handleJiaoLiuQun()"
          :rightIconStyle="{
            fontSize: '20rpx',
            justifyContent: 'center',
            background: '#2359D8',
            color: '#fff',
            borderRadius: '50%',
            width: '32rpx',
            height: '32rpx',
          }"
        >
        </u-cell>
        <u-cell
          title="开通关闭信用服务"
          :border="true"
          :isLink="true"
          @click="handleService()"
          :rightIconStyle="{
            fontSize: '20rpx',
            justifyContent: 'center',
            background: '#2359D8',
            color: '#fff',
            borderRadius: '50%',
            width: '32rpx',
            height: '32rpx',
          }"
        >
        </u-cell>
      </u-cell-group>
    </view>

    <!-- <view class="cu-list menu">
      <view class="cu-item item-box" style="border: .1px solid #ccc;">
        <view class="content text-center" @click="handleLogout">
          <text class="text-black">退出登录</text>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        windowHeight: uni.getSystemInfoSync().windowHeight
      }
    },
    methods: {
      handleToPwd() {
        this.$tab.navigateTo('/pages/mine/pwd/index')
      },
	  handleAbout() {
	  	this.$tab.navigateTo('/pages/mine/about/index')
	  },
	  handleService() {
	  	this.$tab.navigateTo('/pages/mine/auth/service')
	  },
	  handleJiaoLiuQun() {
	  	this.$modal.showToast('模块建设中~')
	  },
	  handleBuilding() {
	  	this.$modal.showToast('模块建设中~')
	  },
      handleToUpgrade() {
        this.$modal.showToast('模块建设中~')
      },
      handleCleanTmp() {
        this.$modal.showToast('模块建设中~')
      },
      handleLogout() {
        this.$modal.confirm('确定注销并退出系统吗？').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$tab.reLaunch('/pages/index')
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.page {
  background-color: #f8f8f8;
}
.menu-list {
  margin: 15px 0;
}
.item-box {
  background-color: #ffffff;
  margin: 30rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10rpx;
  border-radius: 8rpx;
  color: #303133;
  font-size: 32rpx;
}

.icon-arrow {
  // display: block;
  // width: 17rpx;
  // height: 17rpx;
  // background: url(@/static/images/arrow-1.png.png) no-repeat;
  // background-size: 100% 100%;
  // margin-left: 15rpx;
}
</style>
