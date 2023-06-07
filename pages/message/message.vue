<template>
  <view>
    <u-list>
      <u-empty mode="list" :marginTop="140" v-if="list.length == 0"></u-empty>
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="item-cell" @click="handleToDetails(item)">
          <view class="right-top ">
            <dict-tag :options="dict.type.sys_notice_type" :value="item.noticeType" />
            <u--text :lines="2" :text="item.noticeTitle" margin="10px"></u--text>
          </view>
          <view class="right-bm justify-end">
            <view class="">
              <u--text type="info" :text="item.createTime"></u--text>
            </view>
          </view>
        </view>
      </u-list-item>
    </u-list>

  </view>
</template>

<script>
  import {
    listNotice
  } from '@/api/system/notice.js'
  export default {
    dicts: ['sys_notice_type'],
    components: {},
    data() {
      return {
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          totalPage: 0
        },
        list: [],
        formData: {
          status: 'loading' // 加载状态
        },
        totalNum: 0,
        loading: false,
      }
    },
    onLoad() {
      this.init(1)
    },
    methods: {
      load(data, ended) {
        if (ended) {
          this.formData.status = 'noMore'
        }
      },
      init(page) {
        listNotice(this.queryParams).then(res => {
          const {
            code,
            data
          } = res
          if (code == 200) {
            this.list = data.result
          }
          uni.stopPullDownRefresh()
        })
      },
      handleToDetails(item) {
        uni.navigateTo({
          url: '/pages/message/details?noticeid=' + item.noticeId
        })
      }
    },
    /**
     * 下拉刷新回调函数
     */
    onPullDownRefresh() {
      this.formData.status = 'more'
      this.init(1)
    },
    /**
     * 上拉加载回调函数
     */
    onReachBottom() {
      console.log('底部')
      // this.$refs.udb.loadMore()
    }
  }
</script>

<style lang="scss">
  // @import '@/common/uni-ui.scss';

  page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 100%;
    height: auto;
  }

  .list-wrap {
    height: 55px;
    background-color: #fff;
  }

  .tips {
    color: #67c23a;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    background-color: #f0f9eb;
    height: 0;
    opacity: 0;
    transform: translateY(-100%);
    transition: all 0.3s;
  }

  .tips-ani {
    transform: translateY(0);
    height: 40px;
    opacity: 1;
  }

  .content {
    width: 100%;
    display: flex;
  }

  .list-picture {
    width: 100%;
    height: 145px;
  }

  .thumb-image {
    width: 100%;
    height: 100%;
  }

  .item-cell {
    display: flex;
    // height: 150rpx;
    border-bottom: 1px solid #f4f6f8;
    padding: 10rpx 0;
    background-color: #fff;
    margin: 5px 8px;
    flex-direction: column;

    .left {
      width: 220rpx;
      margin: auto 20rpx;
    }

    .right {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
    }

    .right-top {
      margin: 10rpx 0rpx;
      padding-right: 10px;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .right-bm {
      display: flex;
      align-items: center;
      color: #ccc;
      margin-bottom: 10rpx;
    }
  }
</style>