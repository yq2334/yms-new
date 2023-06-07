<template>
  <view class="content">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :model="formData" :rules="rules" ref="form1">
      <u-form-item prop="content" borderBottom ref="item1">
        <u--textarea v-model="formData.content" :maxlength="80" border="none" :count="true" placeholder="请输入内容">
        </u--textarea>
      </u-form-item>

      <u-form-item prop="contact" borderBottom ref="item2">
        <u--input placeholder="请输入联系方式QQ/手机号/邮箱" border="none" v-model="formData.contact"></u--input>
      </u-form-item>

      <view class="btn-wrap">
        <u-button type="primary" @click="submit" shape="circle" text="确认提交"></u-button>
      </view>
    </u--form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        txt: '',
        formData: {
          content: '',
          contact: ''
        },
        rules: {
          'content': {
            type: 'string',
            required: true,
            message: '请填写建议内容',
            trigger: ['blur', 'change']
          },
        }
      }
    },
    methods: {
      submit() {
        this.$refs.form1.validate().then(res => {
          uni.$u.toast('校验通过' + JSON.stringify(this.formData))
        }).catch(errors => {
          uni.$u.toast('表单校验失败')
        })
      }
    },
    onReady() {
      //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
      this.$refs.form1.setRules(this.rules)
    },
  }
</script>

<style scoped>
  page {
    background: #fff;
  }

  .btn-wrap {
    margin: 150rpx auto 0 auto;
    width: 80%
  }
</style>
