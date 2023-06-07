<template>
  <view>

    <view class="item">
      <uni-section title="动态字典数据" type="line">
      </uni-section>

      <dict-tag :options="dict.type.sys_oper_type" :value="['0','1','5']" />
    </view>
    <view class="item">
      <uni-section title="静态字典数据" type="line">
      </uni-section>

      <dict-tag :options="dataList" :value="['2','3']" />
    </view>

    <view class="item">
      <uni-section title="字典数据" type="line">
      </uni-section>

      <view v-for="dict in dict.type.sys_user_sex" :key="dict.value"> {{dict.label}}</view>
    </view>

  </view>
</template>

<script>
  export default {
    dicts: ['sys_user_sex', 'sys_oper_type'],
    data() {
      return {
        dataList: [{
            label: '篮球',
            value: "1"
          },
          {
            label: '羽毛球',
            value: "2"
          },
          {
            label: '足球',
            value: "3"
          }
        ]
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .item {
    background-color: #fff;
    padding: 0 0 20px 10px;
    margin: 0 10px;
  }
</style>