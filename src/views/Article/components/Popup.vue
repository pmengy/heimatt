<template>
  <div style="position: relative">
    <van-nav-bar
      class="navbar-fixed-top"
      :title="
        currentComments.reply_count
          ? `${currentComments.reply_count}条回复`
          : '暂无回复'
      "
      left-text="返回"
      left-arrow
      @click-left="$parent.$parent.show = false"
    />
    <!-- 评论的层主 -->
    <div class="comment" style="padding-top: 45px">
      <van-cell>
        <div slot="title" class="author-focus">
          <van-image
            width="40"
            height="40"
            :src="currentComments.aut_photo"
            round
          />
          <div class="author-name-time">
            <span class="author">{{ currentComments.aut_name }}</span>
          </div>
        </div>
        <span
          slot="default"
          class="icon"
          @click="likeComment(currentComments.com_id)"
        >
          <span
            v-if="!currentComments.is_liking"
            class="iconfont icon-dianzan"
            style="margin-right: 10px"
          ></span>
          <van-icon
            v-else
            name="good-job"
            color="#e22829"
            style="margin-right: 10px"
          />{{ currentComments.like_count ? currentComments.like_count : '赞' }}
        </span>
      </van-cell>
      <div class="comment-content-time">
        <div class="comment-content">{{ currentComments.content }}</div>
        <div class="comment-time">
          {{ currentComments.pubdate | timeFromNow
          }}<span>
            <van-button round
              >回复 {{ currentComments.reply_count }}</van-button
            >
          </span>
        </div>
      </div>
    </div>
    <div class="van-cells">
      <span>全部回复</span>
    </div>
    <!-- 回复 -->
    <div style="padding-bottom: 45px; padding-bottom: 55px">
      <div
        class="comment"
        v-for="(item, index) in $store.state.reply"
        :key="index"
      >
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
            {{ item.pubdate | timeFromNow }}<span> </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- 发布评论 -->
      <van-button
        type="primary"
        @click="showReply = true"
        size="large"
        style="width: 100%; height: 50px; position: fixed; left: 0; bottom: 0"
        >发布</van-button
      >

      <van-popup
        style="display: flex; padding-top: 0.4rem"
        v-model="showReply"
        position="bottom"
        :style="{ height: '20%' }"
        ><van-field
          style="flex: 9"
          v-model="content"
          rows="2"
          :autosize="{ minHeight: 100 }"
          type="textarea"
          maxlength="50"
          placeholder="请输入评论"
          show-word-limit
        />
        <van-button
          :disabled="!content"
          plain
          color="#3296fa"
          @click="publishReply"
          style="border: unset; flex: 1; padding-top: 0.5rem"
          >发布</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { publishComment, likeComment, cancelLikeComment } from '@/api'
export default {
  name: 'Popup',

  data() {
    return {
      content: '',
      showReply: false
    }
  },
  props: {
    currentComments: {
      type: Object,
      required: true
    },
    art_id: {
      type: String,
      required: true
    }
  },
  filters: {
    timeFromNow(time) {
      return dayjs(time).fromNow()
    }
  },
  created() {},

  methods: {
    // 回复评论
    async publishReply() {
      this.showReply = false
      const reply = this.$store.state.reply
      const res = await publishComment({
        target: this.currentComments.com_id,
        content: this.content,
        art_id: this.art_id
      })
      this.$toast.success('回复成功')
      reply.unshift(res.data.data.new_obj)
      this.content = ''
    },
    // 点赞回复
    async likeComment(id) {
      const reply = this.$store.state.reply
      const index = reply.findIndex((item) => item.com_id === id)
      if (reply[index].is_liking) {
        try {
          await cancelLikeComment(id)
          reply[index].is_liking = false
          reply[index].like_count -= 1
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
          reply[index].is_liking = true
          reply[index].like_count += 1
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
    }
  }
}
</script>

<style lang="less" scoped>
.navbar-fixed-top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
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
.van-cells {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  margin: 0.06667rem 0.0667rem;
  padding: 0.26667rem 0.2667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  border-bottom: 0.02667rem solid #ebedf0;
  border-top: 0.02667rem solid #ebedf0;
}
</style>
