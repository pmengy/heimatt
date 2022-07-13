<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="登录" @click-left="backToPrePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 手机号、验证码表单 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #left-icon>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #left-icon>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            size="small"
            text="获取验证码"
            class="code-btn"
          ></van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',

  data() {
    return {
      mobile: '',
      code: ''
    }
  },

  mounted() {},

  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
// 导航栏样式
// :deep 穿透 scoped 样式
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon-cross {
    color: #fff;
  }
}

// 表单样式
.form {
  .iconfont {
    font-size: 37px;
    color: #666;
  }

  .van-button {
    background-color: #6db4fb;
    font-size: 30px;
    border: none;
  }
  .code-btn {
    background-color: #ededed;
    width: 158px;
    height: 46px;
    line-height: 36px;
    font-size: 22px;
    color: #666;
    border-radius: 23px;
  }
}
</style>
