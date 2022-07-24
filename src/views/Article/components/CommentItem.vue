<template>
  <div>
    <!-- 评论区域S -->
    <div v-if="commentList.length !== 0">
      <div class="comment" v-for="(item, index) in commentList" :key="index">
        <van-cell>
          <div slot="title" class="author-focus">
            <van-image width="40" height="40" :src="item.aut_photo" round />
            <div class="author-name-time">
              <span class="author">{{ item.aut_name }}</span>
            </div>
          </div>
          <span slot="default" class="icon" @click="likeComment(item.com_id)">
            <span
              v-if="!item.is_liking"
              class="iconfont icon-dianzan"
              style="margin-right: 10px"
            ></span>
            <van-icon
              v-else
              name="good-job"
              color="#e22829"
              style="margin-right: 10px"
            />{{ item.like_count ? item.like_count : '赞' }}
          </span>
        </van-cell>
        <div class="comment-content-time">
          <div class="comment-content">{{ item.content }}</div>
          <div class="comment-time">
            {{ item.pubdate | timeFromNow
            }}<span>
              <van-button round @click="reply(item)"
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
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { likeComment, cancelLikeComment, getCommentList } from '@/api'
export default {
  name: 'CommentItem',
  props: {
    commentList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },

  filters: {
    timeFromNow(time) {
      return dayjs(time).fromNow()
    }
  },

  mounted() {},

  methods: {
    // 点赞评论
    async likeComment(id) {
      const index = this.commentList.findIndex((item) => item.com_id === id)
      if (this.commentList[index].is_liking) {
        try {
          await cancelLikeComment(id)
          this.$emit('dislike', index)
          this.$toast('取消点赞成功')
        } catch (error) {
          if (error.status === 401) {
            this.$toast.fail('登录身份过期,请重新登录')
            this.$router.push('/login')
          } else {
            this.$toast.fail('网络不太稳定,请稍后再试')
          }
        }
      } else {
        try {
          await likeComment(id)
          this.$emit('like', index)
          this.$toast('点赞成功')
        } catch (error) {
          if (error.status === 401) {
            this.$toast.fail('登录身份过期,请重新登录')
            this.$router.push('/login')
          } else {
            this.$toast.fail('网络不太稳定,请稍后再试')
          }
        }
      }
    },
    async reply(item) {
      this.$parent.$parent.$parent.show = true
      this.$parent.$parent.$parent.currentComments = item
      this.getCommentList()
    },
    async getCommentList() {
      const res = await getCommentList({
        type: 'c',
        source: this.$parent.$parent.$parent.currentComments.com_id,
        limit: 50
      })
      this.$store.commit('setReply', res.data.data.results)
    }
  }
}
</script>

<style lang="less" scoped>
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
