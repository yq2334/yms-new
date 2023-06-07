<template>
  <view class="container">
    <view class="search-bar">
      <view class="info-btn-wrap">
        <u--text type="info" prefixIcon="search" text="筛选" @click="show=true"></u--text>
      </view>
    </view>
    <u-line dashed></u-line>
    <view class="info-item" v-for="(item,index) in dataList" :key="index">
      <view class="info-line">
        <text class="title">{{item.nickName}}</text>
      </view>
      <view class="info-line2">
        <text class="label-name">用户名</text>
        <text class="text-success">{{item.userName}}</text>
      </view>
      <view class="info-line2">
        <text class="label-name">用户性别</text>
        <dict-tag :options="dict.type.sys_user_sex" :value="item.sex" />
      </view>
      <view class="info-line2">
        <text class="label-name">头像</text>
        <u--image :showLoading="true" shape="circle" :src="item.photo" width="40px" height="40px"></u--image>
      </view>
      <view class="info-line2">
        <text class="label-name">添加时间</text>
        <text>{{item.addTime}}</text>
      </view>
      <view class="info-line2">
        <text class="label-name">备注</text>
        <text>{{item.remark}}</text>
      </view>
      <view class="info-btn-wrap justify-end">
        <view class="tag-item">
          <u-tag text="编辑" plain shape="circle" icon="edit-pen" @click="handleEdit(item)"
            v-if="checkPermi(['userinfo:edit'])"></u-tag>
        </view>

        <view class="tag-item">
          <u-tag text="删除" class="tag-item" plain shape="circle" type="error" icon="trash"
            v-if="checkPermi(['userinfo:delete'])" @click="handleDelete(item)"></u-tag>
        </view>
      </view>
      <u-line dashed></u-line>
    </view>

    <uni-pagination show-icon="true" :total="totalNum" :pageSize="queryParams.pageSize" :current="queryParams.pageNum"
      @change="getData"></uni-pagination>
    <u-back-top :scroll-top="scrollTop"></u-back-top>

    <u-popup :show="show" mode="top" @close="show = false" @open="show = true">
      <view class="search-form">
        <u--form labelPosition="left" :model="queryParams" labelWidth="100px" ref="uForm">
          <u-form-item label="时间查询" borderBottom>
            <uni-datetime-picker :border="false" v-model="dateRange" type="daterange" @change="timeSelect" />
          </u-form-item>
          <u-form-item label="排序字段" prop="sort" borderBottom>
            <uni-data-select v-model="queryParams.sort" :clear="true" :localdata="actions"
              @change="sortSelect"></uni-data-select>
          </u-form-item>

          <u-form-item label="排序方式" prop="sortType" borderBottom ref="item1">
            <u-radio-group v-model="queryParams.sortType">
              <u-radio label="升序" name="asc" :customStyle="{marginRight: '20px'}"></u-radio>
              <u-radio label="倒序" name="desc"></u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label="用户名" prop="userName" borderBottom ref="item1">
            <u--input v-model="queryParams.userName" border="none" placeholder="请输入用户名"></u--input>
          </u-form-item>

          <u-form-item label="性别" prop="sex" borderBottom ref="item1">
            <u-radio-group v-model="queryParams.sex">
              <u-radio :label="item.label" :name="item.value" :customStyle="{marginRight: '20px'}" v-for="(item, index) in
                dict.type.sys_user_sex"></u-radio>
            </u-radio-group>
          </u-form-item>

        </u--form>

        <view class="btn-group">
          <u-button text="重置" icon="reload" :customStyle="{marginRight: '10px'}" shape="circle" type="success"
            @click="resetQuery"></u-button>
          <u-button text="搜索" icon="search" shape="circle" type="primary" @click="handleQuery"></u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import {
    checkPermi
  } from '@/utils/permission.js'
  import "@/static/scss/page.scss";

  import {
    getDate
  } from '@/utils/common.js'
  export default {
    dicts: ['sys_user_sex'],
    data() {
      return {
        scrollTop: 0,
        dataList: [{
            nickName: '用户名',
            userName: '用户名',
            addTime: '21点24分',
            sex: 1,
            remark: '我是备注，我是备注',
            photo: 'https://cdn.uviewui.com/uview/album/1.jpg'
          },
          {
            nickName: '用户名',
            userName: '用户名',
            addTime: '21点24分',
            sex: 1,
            remark: '我是备注，我是备注'
          },
          {
            nickName: '用户名',
            userName: '用户名',
            addTime: '21点24分',
            sex: 1,
            remark: '我是备注，我是备注'
          },
          {
            nickName: '用户名',
            userName: '用户名',
            addTime: '21点24分',
            sex: 2,
            remark: '我是备注，我是备注'
          },
          {
            nickName: '用户名',
            userName: '用户名',
            addTime: '21点24分',
            sex: 0,
            remark: '我是备注，我是备注'
          },
          {
            nickName: '用户名',
            userName: '用户名',
            addTime: '21点24分',
            sex: 1,
            remark: '我是备注，我是备注'
          }
        ],
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          sex: 1,
          userName: undefined,
          sortType: 'desc',
          sort: 'id'
        },
        dateRange: [],
        totalNum: 0,
        loadStatus: 'more',
        show: false,
        showSort: false,
        actions: [{
            text: '添加时间',
            value: 'addTime'
          },
          {
            text: 'id',
            value: 'id'
          }
        ]
      }
    },
    onLoad() {
      this.getList()
    },
    methods: {
      checkPermi,
      getList() {

      },
      handleEdit(e) {
        this.$tab.navigateTo('/pages/demo/table/edit/edit?id=' + e.id)
      },
      handleDelete(e) {
        this.$modal.confirm('你确定要删除吗?').then(() => {
          console.log('点了确定')
        })
      },
      resetQuery() {
        this.$refs.uForm.resetFields()
        this.show = false
        this.handleQuery()
      },
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.dataList = []
        uni.startPullDownRefresh();
        this.getList()
        this.show = false
      },
      getData(e) {
        this.queryParams.pageNum = e.current
        this.getList()
      },
      onPullDownRefresh() {
        console.log('refresh')
        uni.stopPullDownRefresh()
        this.handleQuery()
      },
      sortSelect(e) {
        this.queryParams.sort = e
      },
      timeSelect(e) {
        this.dateRange = e
        console.log(e)
      },
      onPageScroll(e) {
        this.scrollTop = e.scrollTop;
      }
    }
  }
</script>

<style lang="scss">
  .container {
    padding-bottom: 20px;
  }

  // @import url("@/static/scss/page.scss");
</style>