<template>
  <view class="container">
    <u-gap height="5"></u-gap>

    <view class="info-item margin-bottom" v-for="(item, index) in dataList" :key="index">
      <view class="info-line">
        <text class="title">{{ item.name }}</text>
      </view>

      <view class="info-line">
        <text class="label-name">登录时间</text>
        <text>{{ item.loginTime }}</text>
      </view>
      <view class="info-line">
        <text class="label-name">登录地点</text>
        <text>{{ item.userIP }}({{item.location}})</text>
      </view>

      <view class="info-line">
        <text class="label-name">登录浏览器</text>
        <text>{{ item.browser }}</text>
      </view>
    </view>

    <view class="page-footer">
      <u-empty mode="list" :marginTop="140" v-if="totalNum == 0"></u-empty>
      <uni-pagination v-else show-icon="true" :total="totalNum" :pageSize="queryParams.pageSize"
        :current="queryParams.pageNum" @change="getData"></uni-pagination>
    </view>
  </view>
</template>

<script>
  import "@/static/scss/page.scss";
  import {
    listOnline
  } from '@/api/monitor/online.js'
  export default {
    data() {
      return {
        queryParams: {
          pageNum: 1,
          pageSize: 20
        },
        totalNum: 0,
        dataList: []
      }
    },
    onLoad() {
      this.getList()
    },
    methods: {
      getList() {
        listOnline(this.queryParams).then((res) => {
          const {
            code,
            data
          } = res
          if (res.code == 200) {
            this.totalNum = data.totalNum;

            if (this.queryParams.pageNum <= 1) {
              this.dataList = data.result;
            } else {
              this.dataList = [...this.dataList, ...data.result];
            }
          }
        })
      },
      getData(e) {
        this.queryParams.pageNum = e.current
        this.getList()
      },
    }
  }
</script>

<style>

</style>