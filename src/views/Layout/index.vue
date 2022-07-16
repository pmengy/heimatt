<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar route active-color="#3296fa" inactive-color="#707070">
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="iconfont icon-wode"></span>
        </template>
        {{ !!$store.state.user.token ? '我的' : '未登录' }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped>
.van-tabbar-item__icon .iconfont {
  font-size: 40px;
}
</style>
