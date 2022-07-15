<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="登录" @click-left="backToPrePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 手机号、验证码表单 -->
    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <template #left-icon>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isCountDown"
            :time="3000"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            size="small"
            text="获取验证码"
            class="code-btn"
            @click.prevent="sendCode"
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
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',

  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isCountDown: null
    }
  },

  mounted() {},

  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (err) {
        const status = err.response.status
        let message = '登录失败，请刷新~'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    async sendCode() {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isCountDown = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
