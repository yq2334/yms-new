<template>
  <view class="page">
    <view class="title">
      <u--text type="primary" align="center" :lines="1" :text="info.noticeTitle"></u--text>
    </view>
    <u-line></u-line>
    <view class="time">
      {{info.createBy}} 发布于：{{info.createTime}}
    </view>

    <view class="content">
      <rich-text class="typo m-padded-lr-responsive m-padded-tb-large ql-editor"
        :nodes="info.noticeContent"></rich-text>
    </view>
  </view>
</template>

<script>
  import {
    getNotice
  } from '@/api/system/notice.js'
  export default {
    data() {
      return {
        info: {}
      }
    },
    onLoad(e) {
      console.log(e)
      if (e) {
        getNotice(e.noticeid).then(res => {
          console.log(res)
          this.info = res.data
        })
      }
    },
    methods: {
      init() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    background: #fff;
    padding: 10px;

    .title {
      font-size: 19px;
      font-weight: bold;
      margin: 20px;
      text-align: center;
    }

    .time {
      margin: 20px 0;
      color: #ccc;
    }
  }
</style>