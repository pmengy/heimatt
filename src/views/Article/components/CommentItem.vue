<template>
  <div>
    <!-- 评论区域S -->
    <div v-if="commentList.length !== 0">
      <div class="comment" v-for="(item, index) in commentList" :key="index">
        <van-cell>
          <div slot="title" class="author-focus">
            <van-image width="50" height="50" :src="item.aut_photo" round />
            <div class="author-name-time">
              <span class="author">{{ item.aut_name }}</span>
            </div>
          </div>
          <span slot="default" class="icon">
            <span
              class="iconfont icon-dianzan"
              style="margin-right: 10px"
            ></span
            >赞
          </span>
        </van-cell>
        <div class="comment-content-time">
          <div class="comment-content">{{ item.content }}</div>
          <div class="comment-time">
            {{ item.pubdate | timeFromNow
            }}<span>
              <van-button round @click="reply(item.com_id)"
                >回复 {{ item.reply_count }}</van-button
              >
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noComment">
      <p>期待你的评论~~</p>
    </div>
    <!-- <Popup
      @closePopup="showPopup = false"
      :showPopup="showPopup"
      :contentList="currentObj"
    ></Popup> -->
    <!-- 评论区域E -->
    <!-- <Popup  @changeIsShow='showPopup=false' :showPopup=showPopup></Popup> -->
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
// import Popup from '../components/Popup.vue'
export default {
  //   components: { Popup },
  name: 'CommentItem',
  props: {
    commentList: {
      type: Array
      //   required: true
    },
    showList: {
      type: Array
    }
  },
  data() {
    return {
      //   showPopup: false,
      currentObj: {}
    }
  },
  filters: {
    timeFromNow(time) {
      return dayjs(time).fromNow()
    }
  },

  mounted() {},

  methods: {
    // 回复评论
    async reply(id) {
      // 展开弹出层
      console.log(id)
      //   this.showPopup = true
      // 显示弹出框

      //  保存对应id的对象
      const obj = this.commentList.find((item) => item.com_id === id)
      console.log(obj)
      this.currentObj = obj
      //   this.currentObj.push(obj)
      //   console.log(this.currentObj)
      //   定义一个数组传输到遮罩层组件中
    }
  }
}
</script>

<style lang="less" scoped>
.aplyContent {
  background-color: #fff !important;
  :deep(.van-icon) {
    color: #1989fa !important;
  }
  span {
    color: #323233;
    font-size: 32px;
  }
}
.author-focus {
  display: flex;
  align-items: center;
  .author-name-time {
    position: relative;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    .read-count {
      position: absolute;
      right: 0px;
      top: 60px;
      color: #d0beb7;
      font-size: 12px;
      .count {
        color: #3296fa;
      }
    }
    span.author {
      font-size: 26px;
      padding-top: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      color: #406599 !important;
    }
    span.time {
      font-size: 24px;
      color: #b7b7b7;
    }
  }
}
:deep(.van-button) {
  width: 170px;
  height: 60px;
}
.followAlready {
  color: #333 !important;
}
// 文章内容区域
.article-contents {
  padding: 55px 32px;
  font-size: 30px;
}
.author-focus {
  align-items: flex-start;
}
// 评论
.comment {
  .van-cell {
    padding-bottom: 0;
  }
  span.icon {
    font-size: 30px;
    color: #333;
  }
  .comment-content-time {
    padding: 0 155px;

    .comment-content {
      font-size: 32px;
    }
    .comment-time {
      display: flex;
      align-items: center;
      font-size: 24px;
      margin-top: 32px;
      span {
        white-space: nowrap;
        font-size: 24px;
        :deep(.van-button--normal) {
          width: 135px;
          height: 48px;
          background-color: #e6e6e6;
          margin-left: 24px;
        }
      }
    }
  }
}
.noComment {
  font-size: 28px;
  color: #969799;
  text-align: center;
}
</style>
