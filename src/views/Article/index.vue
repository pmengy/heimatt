<template>
  <div>
    <!-- 头部导航 -->
    <Header title="黑马头条"></Header>
    <div class="main-wrap">
      <!-- loading状态 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading size="2rem" vertical color="#3296fa" text-color="#3296fa"
          >加载中...</van-loading
        >
      </div>
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">{{ publishDate }}</div>
          <!-- 关注按钮 -->
          <van-button
            v-if="!articleInfo.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="following(articleInfo.aut_id)"
            >关注</van-button
          >
          <!-- 取消关注按钮 -->
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="following(articleInfo.aut_id)"
            >已关注</van-button
          >
        </van-cell>

        <!-- 文章内容 -->
        <article
          class="article-content markdown-body"
          v-highlight
          v-html="articleInfo.content"
        ></article>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="articleInfo.comm_count" color="#777" />
      <van-icon
        :color="isCollect ? '#e22829' : '#777'"
        :name="isCollect ? 'star' : 'star-o'"
        @click="collectArticle(articleInfo.art_id)"
      />
      <van-icon
        :color="isLike ? '#e22829' : '#777'"
        :name="isLike ? 'good-job' : 'good-job-o'"
        @click="likingArticle(articleInfo.art_id)"
      />
      <van-icon name="share" color="#777"></van-icon>
    </div>
  </div>
</template>

<script>
import {
  followUser,
  getArticleInfo,
  cancelFollowUser,
  likingArticle,
  cancelLikingArticle,
  collectArticle,
  cancelCollectArticle
} from '@/api'
import '../../../node_modules/github-markdown-css/github-markdown.css'
import dayjs from '@/utils/dayjs'
import Header from './components/Header.vue'

export default {
  name: 'Detail',
  components: {
    Header
  },
  data() {
    return {
      articleInfo: {},
      loading: true,
      errorStatus: null,
      isLike: false,
      isCollect: false,
      id: this.$router.currentRoute.params.article_id
    }
  },
  computed: {
    publishDate() {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return relativeTime
    }
  },
  created() {
    this.getArticleInfo()
  },

  methods: {
    // 获取文章信息
    async getArticleInfo() {
      try {
        const res = await getArticleInfo(this.id)
        this.articleInfo = res.data.data
      } catch (error) {
        if (error.response.status === 404) {
          this.errorStatus = 404
        }
        this.$toast.fail('文章获取失败')
      } finally {
        this.loading = false
      }
    },
    // 关注文章作者
    async following(id) {
      // 如果已经关注了
      try {
        if (this.articleInfo.is_followed) {
          const res = await cancelFollowUser(id)
          console.log(res)
        } else {
          const res = await followUser(id)
          console.log(res)
        }
        this.articleInfo.is_followed = !this.articleInfo.is_followed
      } catch (error) {
        if (error.status === 401) {
          this.$toast('登录身份过期，请重新登录')
          this.$router.push('/login')
        } else {
          this.$toast('网络不太好，请刷新重试')
        }
      }
    },
    // 点赞文章
    async likingArticle(id) {
      // 已经点赞过的时候就是要点击取消点赞
      if (this.isLike) {
        try {
          const res = await cancelLikingArticle(id)
          this.isLike = false
          this.$toast('取消点赞成功')
          console.log(res)
        } catch (error) {
          if (error.status === 401) {
            this.$toast('登录身份过期，请重新登录')
            this.$router.push('/login')
          } else {
            this.$toast('网络不太稳定,请刷新重试')
          }
        }
      } else {
        try {
          const res = await likingArticle(id)
          if (res.status === 201) {
            this.isLike = true
            this.$toast('点赞成功')
          }
        } catch (error) {
          if (error.status === 401) {
            this.$toast('登录身份过期，请重新登录')
            this.$router.push('/login')
          } else {
            this.$toast('网络不太稳定,请刷新重试')
          }
        }
      }
    },
    // 收藏文章
    async collectArticle(id) {
      // 已经收藏过的时候就是要点击取消收藏
      if (this.isCollect) {
        try {
          const res = await cancelCollectArticle(id)
          this.isCollect = false
          this.$toast('取消收藏成功')
          console.log(res)
        } catch (error) {
          if (error.status === 401) {
            this.$toast('登录身份过期，请重新登录')
            this.$router.push('/login')
          } else {
            this.$toast('网络不太稳定,请刷新重试')
          }
        }
      } else {
        try {
          const res = await collectArticle(id)
          if (res.status === 201) {
            this.isCollect = true
            this.$toast('收藏成功')
          }
        } catch (error) {
          if (error.status === 401) {
            this.$toast('登录身份过期，请重新登录')
            this.$router.push('/login')
          } else {
            this.$toast('网络不太稳定,请刷新重试')
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 88px;
  overflow-y: scroll;
  background-color: #fff;
}
.article-detail {
  .article-title {
    font-size: 40px;
    padding: 50px 32px;
    margin: 0;
    color: #3a3a3a;
  }

  .user-info {
    padding: 0 32px;
    .avatar {
      width: 70px;
      height: 70px;
      margin-right: 17px;
    }
    .van-cell__label {
      margin-top: 0;
    }
    .user-name {
      font-size: 24px;
      color: #3a3a3a;
    }
    .publish-date {
      font-size: 23px;
      color: #b7b7b7;
    }
    .follow-btn {
      width: 170px;
      height: 58px;
    }
  }

  .article-content {
    padding: 55px 32px;
    h1 {
      font-size: 50px;
    }
    :deep(p) {
      text-align: justify;
      font-size: 24px;
    }
  }
}

.loading-wrap {
  padding: 200px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.error-wrap {
  padding: 200px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .van-icon {
    font-size: 122px;
    color: #b4b4b4;
  }
  .text {
    font-size: 30px;
    color: #666666;
    margin: 33px 0 46px;
  }
  .retry-btn {
    width: 280px;
    height: 70px;
    line-height: 70px;
    border: 1px solid #c3c3c3;
    font-size: 30px;
    color: #666666;
  }
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}
</style>
