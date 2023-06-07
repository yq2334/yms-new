<template>
  <view class="work-container">
    <!-- 宫格组件 -->
    <uni-section title="系统管理" type="line">
      <template v-slot:right>
        <view class="flex align-center">
          更多
          <view class="iconfont icon-right"></view>
        </view>
      </template>
    </uni-section>
    <view class="grid-body">
      <u-grid :border="false" :col="4">
        <u-grid-item v-for="(item, index) in menuList" :key="item.text">
          <view class="grid-item-box" @click="changeGrid(item)">
            <u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="item.icon" :color="item.color" :size="30"></u-icon>
            <text class="text">{{ item.text }}</text>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="grid-item-box" @click="handleDemo()">
            <u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" name="bookmark" color="#2389da" :size="30"></u-icon>
            <text class="text">字典演示</text>
          </view>
        </u-grid-item>
      </u-grid>

    </view>
    <uni-section title="常用功能" type="line"> </uni-section>
    <view class="grid-body">
      <u-grid :border="false" @click="changeFuncGridLog" :col="4">
        <u-grid-item v-for="(item, index) in funcMenuList" :key="index">
          <view class="grid-item-box">
            <u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="item.icon" :color="item.color" :size="30"></u-icon>
            <text class="text">{{ item.text }}</text>
          </view>
        </u-grid-item>
      </u-grid>
    </view>

    <uni-section title="日志查询" type="line"> </uni-section>
    <view class="grid-body">
      <u-grid :border="false" @click="changeGridLog" :col="4">
        <u-grid-item v-for="(item, index) in logMenuList" :key="index">
          <view class="grid-item-box">
            <u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="item.icon" :color="item.color" :size="30"></u-icon>
            <text class="text">{{ item.text }}</text>
          </view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script>
  import {
    checkPermi
  } from "@/utils/permission.js";
  export default {
    data() {
      return {
        menuList: [{
            text: "打赏作者",
            url: "",
            icon: "zhifubao",
            color: "#ccc",
          },
          {
            text: "系统设置",
            url: "",
            icon: "setting",
            color: "#ccc",
          },
          {
            text: "列表表格",
            url: "/pages/demo/table/table",
            icon: "grid",
            color: "#2389da",
          },
          {
            text: "水平表格",
            url: "/pages/demo/table/table2",
            icon: "grid",
            color: "#2389da",
          }
        ],
        funcMenuList: [{
          text: "在线用户",
          url: "/pages/monitor/onlineuser",
          icon: "grid",
          color: "#2389da",
        }],
        logMenuList: [{
            text: "登录日志",
            url: "/pages/monitor/logininfo",
            icon: "clock",
            color: "#2389da",
            permi: ["admin"],
          },
          {
            text: "操作日志",
            url: "/pages/monitor/operlog",
            icon: "clock",
            color: "#2389da",
            permi: ["admin"],
          },
        ],
      };
    },
    methods: {
      checkPermi,
      changeGrid(e) {
        console.log(e)
        if (e && e.url.length > 0) {
          uni.navigateTo({
            url: e.url,
          });
        } else {
          this.$modal.showToast("模块建设中~");
        }
      },
      handleDemo() {
        uni.navigateTo({
          url: "/pages/demo/demo",
        });
      },
      changeGridLog(e) {
        var info = this.logMenuList[e];

        this.$tab.navigateTo(info.url);
      },
      changeFuncGridLog(e) {
        var info = this.funcMenuList[e];

        this.$tab.navigateTo(info.url);
      },
    },
  };
</script>

<style lang="scss">
  /* #ifndef APP-NVUE */
  page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    min-height: 100%;
    height: auto;
  }

  view {
    font-size: 14px;
    line-height: inherit;
  }

  /* #endif */

  .text {
    text-align: center;
    font-size: 26rpx;
    margin-top: 10rpx;
  }

  .grid-item-box {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }

  .uni-margin-wrap {
    width: 690rpx;
    width: 100%;
  }
</style>