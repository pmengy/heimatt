<template>
  <div class="profile">
    <!-- 头部区域 -->
    <header>
      <!-- 登录后的页面 -->
      <div class="user-info banner" v-if="isLogin">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row-2" type="flex">
          <van-col span="12">
            <!-- 头像 -->
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              ></van-image>
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" align="center" justify="end" class="code-row">
              <van-button
                size="mini"
                text="编辑资料"
                class="code-btn"
                @click="$router.push('/user')"
              ></van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的页面 -->
      <div class="login-register banner" v-else>
        <div class="wrap" @click="goLogin">
          <img src="@/assets/images/mobile.png" alt="" />
          <p>登录 / 注册</p>
        </div>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" class="grid">
        <van-grid-item text="收 藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历 史">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell-group class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
    </main>
    <!-- 退出按钮 -->
    <van-button block class="login-btn" v-if="isLogin" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
// 引入API
import { getUserInfo } from '@/api'
export default {
  name: 'My',

  data() {
    return {
      userInfo: {}
    }
  },

  created() {
    this.getUserInfo()
  },

  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          // 点击确认
          this.$store.commit('setUser', {})
          this.$toast('退出登录成功')
          this.$router.push('/login')
        })
        .catch(() => {
          // 点击取消
          console.log('取消')
        })
    },
    goLogin() {
      this.$router.push('/login')
    },
    async getUserInfo() {
      if (this.isLogin) {
        const {
          data: { data }
        } = await getUserInfo()
        this.userInfo = data
      }
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url(@/assets/images/banner.png) no-repeat 0 0 / cover;
}
// 用户信息
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
    .row-2 {
      height: 100%;
    }
    .mobile {
      font-size: 30px;
      color: #fff;
    }
  }
  .code-row {
    height: 100%;
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
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    font-size: 36px;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    > .van-grid-item__text {
      font-size: 28px;
    }
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0;
    .van-cell__title {
      font-size: 30px;
    }
  }
}
.login-btn {
  :deep(.van-button__content) {
    color: #d86262;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 10px;
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 28px;
    }
  }
}
</style>
