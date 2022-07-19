<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '95%' }"
    closeable
    round
    close-icon-position="top-left"
  >
    <!-- 弹出层内容 -->
    <div class="popup-main">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道内容 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :class="{ 'active-channel': item.id === 0 }"
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <van-icon
                name="cross"
                v-show="isEdit && item.id !== 0"
              ></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            icon="plus"
            @click="addMyChannel(item)"
          ></van-grid-item
        ></van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  name: 'EditChannelPopup',

  data() {
    return {
      isEdit: false,
      isShow: false,
      AllChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },

  created() {
    this.getAllChannels()
  },

  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.AllChannels = data.data.channels
    },
    onClickMyChannel(channel, index) {
      // 可编辑状态下且不是推荐频道
      if (this.isEdit && channel.id !== 0) {
        return this.$emit('del-myChannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        // 切换频道
        this.$emit('change-active', index)
      }
    },
    // 添加频道
    addMyChannel(myChannel) {
      // 解构数组,实现浅克隆
      this.$emit('add-myChannel', { ...myChannel })
    }
  },
  computed: {
    // 在所有频道中筛选掉我的频道里的内容
    recommendChannels() {
      return this.AllChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 高亮频道
.active-channel {
  :deep(.van-grid-item__text) {
    color: #f17575 !important;
  }
}
.popup-main {
  padding-top: 100px;
  .van-cell {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    color: #f68c8c;
    padding: 0 30px;
    font-size: 28px;
    height: 48px;
    border: 1px solid #f68c8c;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      .van-grid-item__text {
        font-size: 26px;
        color: #222;
      }

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.38rem;
          font-size: 28px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
