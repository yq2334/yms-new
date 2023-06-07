<template>
  <view class="container">
    <u-gap height="5"></u-gap>

    <view class="info-item margin-bottom" v-for="(item, index) in dataList" :key="index">
      <view class="info-line">
        <text class="title">{{ item.title }}</text>
      </view>
      <view class="info-line">
        <text class="label-name">操作人</text>
        <text>{{ item.operName }}</text>
      </view>
      <view class="info-line">
        <text class="label-name">操作地址</text>
        <text>{{ item.operLocation }}({{ item.operIp }})</text>
      </view>
      <view class="info-line">
        <text class="label-name">接口地址</text>
        <text>{{ item.operUrl }}</text>
      </view>
      <view class="info-line">
        <text class="label-name">操作模块</text>
        <dict-tag :options="dict.type.sys_oper_type" :value="item.businessType" />
      </view>
      <view class="info-line">
        <text class="label-name">操作时间</text>
        <text>{{ item.operTime }}</text>
      </view>
      <view class="info-line" v-if="item.errorMsg">
        <text class="label-name">错误信息</text>
        <text class="text-danger">{{ item.errorMsg }}</text>
      </view>

      <u-collapse :border="false">
        <u-collapse-item :border="false">
          <text slot="value" class="u-page__item__title__slot-title text-blue">查看更多</text>
          <view class="u-collapse-content">
            <view class="info-line">
              <text class="label-name">请求参数</text>
              <rich-text class="typo m-padded-lr-responsive m-padded-tb-large ql-editor"
                :nodes="item.operParam"></rich-text>
            </view>

            <view class="info-line">
              <text class="label-name">返回结果</text>
              <rich-text class="typo m-padded-lr-responsive m-padded-tb-large ql-editor"
                :nodes="item.jsonResult"></rich-text>
            </view>

          </view>
        </u-collapse-item>

      </u-collapse>

      <!-- <u-line dashed></u-line> -->
    </view>

    <view class="page-footer">
      <u-empty mode="list" :marginTop="140" v-if="totalNum == 0"></u-empty>
      <uni-pagination v-else show-icon="true" :total="totalNum" :pageSize="queryParams.pageSize"
        :current="queryParams.pageNum" @change="getData"></uni-pagination>
    </view>

    <view class="text-grey padding text-center"> 共 {{ totalNum }}条数据 </view>
  </view>
</template>

<script>
  import "@/static/scss/page.scss";
  import {
    list
  } from "@/api/monitor/operlog.js";
  import store from '@/store'
  export default {
    dicts: ['sys_oper_type'],
    data() {
      return {
        dataList: [],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userName: '',
          sortType: "desc",
          sort: "",
        },
        totalNum: 0,
      };
    },
    onLoad() {
      this.queryParams.userName = store.getters.name
      this.getList();
    },
    methods: {
      getList() {
        list(this.queryParams).then((res) => {
          const {
            code,
            data
          } = res;

          this.totalNum = data.totalNum;
          if (this.queryParams.pageNum <= 1) {
            this.dataList = data.result;
          } else {
            this.dataList = [...this.dataList, ...data.result];
          }
        })
      },
      resetQuery() {
        this.$refs.uForm.resetFields();
        this.handleQuery();
      },
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.dataList = [];
        uni.startPullDownRefresh();
        this.getList();
      },
      onPullDownRefresh() {
        uni.stopPullDownRefresh();
        this.handleQuery();
      },
      getData(e) {
        this.queryParams.pageNum = e.current
        this.getList()
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 10px;
  }

  .info-item {
    border-radius: 10px;
  }

  // @import url("@/static/scss/page.scss");
</style>