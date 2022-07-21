<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList> </van-tab
    ></van-tabs>
    <!-- 更多的按钮 -->
    <span class="iconfont icon-gengduo" @click="showPopup"></span>
    <!-- 弹出层 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @del-myChannel="delMyChannel"
      @change-active="changeActive"
      @add-myChannel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannel,
  getMyChannelByLocal,
  setMyChannelToLocal,
  delMyChannel,
  addMyChannel
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import EditChannelPopup from './components/EditChannelPopup.vue'
export default {
  name: 'Home',

  data() {
    return {
      active: 0,
      myChannels: []
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },

  created() {
    this.getMyChannel()
  },

  methods: {
    // 获取我的频道列表
    async getMyChannel() {
      try {
        if (!this.isLogin) {
          const myChannelsInLocal = getMyChannelByLocal()
          if (myChannelsInLocal) {
            this.myChannels = myChannelsInLocal
          } else {
            const { data } = await getMyChannel()
            this.myChannels = data.data.channels
          }
        } else {
          // 登录状态 请求接口获取频道
          const { data } = await getMyChannel()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    },
    // 展示弹出层
    showPopup() {
      this.$refs.popup.isShow = true
    },
    // 删除我的频道
    async delMyChannel(id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        // 离线状态,数据存储在本地存储中
        setMyChannelToLocal(this.myChannels)
      } else {
        // 登录状态发请求
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除频道失败')
        }
      }
      this.$toast.success('删除频道成功')
    },
    // 点击频道实现切换
    changeActive(active) {
      this.active = active
    },
    // 添加我的频道
    async addMyChannel(channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        // 离线状态发请求
        setMyChannelToLocal(this.myChannels)
      } else {
        // 登录状态发请求
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
    font-size: 32px;
  }
  .van-icon-search {
    color: #fff;
    font-size: 34px;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 90px;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 2;
}
.icon-gengduo {
  position: fixed;
  top: 92px;
  z-index: 99;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
