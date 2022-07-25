<template>
  <div>
    <van-list
      offset="100"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        :commentList="commentList"
        @like="like"
        @dislike="dislike"
      ></CommentItem>
    </van-list>
    <!-- 发布评论 -->
    <van-popup
      style="display: flex; padding-top: 0.4rem"
      v-model="showComment"
      position="bottom"
      :style="{ height: '20%' }"
      ><van-field
        style="flex: 9"
        v-model.trim="content"
        rows="2"
        :autosize="{ minHeight: 100 }"
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      /><van-button
        :disabled="!content"
        plain
        color="#3296fa"
        @click="publish"
        style="border: unset; flex: 1; padding-top: 0.5rem"
        >发布</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import { getCommentList, publishComment } from '@/api'
import CommentItem from './CommentItem.vue'
export default {
  name: 'Comments',

  data() {
    return {
      commentList: [],
      loading: false,
      finished: false,
      showComment: false,
      content: '',
      last_id: ''
    }
  },
  components: { CommentItem },
  props: {
    art_id: {
      type: String,
      required: true
    }
  },

  created() {
    this.getCommentList()
  },

  methods: {
    async getCommentList() {
      const res = await getCommentList({
        type: 'a',
        source: this.art_id
      })
      this.commentList = res.data.data.results
      this.last_id = res.data.data.last_id
    },
    async onLoad() {
      const res = await getCommentList({
        type: 'a',
        source: this.art_id,
        offset: this.last_id
      })
      this.commentList.push(...res.data.data.results)
      this.last_id = res.data.data.last_id
      if (!this.last_id) {
        this.finished = true
      }
      this.loading = false
    },
    like(index) {
      this.commentList[index].is_liking = true
      this.commentList[index].like_count += 1
    },
    dislike(index) {
      this.commentList[index].is_liking = false
      this.commentList[index].like_count -= 1
    },
    // 发布文章评论
    async publish() {
      this.showComment = false
      try {
        const res = await publishComment({
          target: this.art_id,
          content: this.content
        })
        this.content = ''
        this.commentList.unshift(res.data.data.new_obj)
        this.$emit('publish')
      } catch (error) {
        if (error.status === 401) {
          this.$toast.fail('登录身份过期,请重新登录')
          this.$router.push('/login')
        } else if (error.status === 403) {
          this.$toast.fail('该文章暂未开放评论')
        } else {
          this.$toast.fail('网络不太稳定,请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
