<template>
  <div>
    <van-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="getSearchResults"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api'
export default {
  name: 'SearchResult',

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pre_page: 20
    }
  },

  created() {
    this.getSearchResults()
  },
  props: {
    keyWord: {
      type: String,
      required: true
    }
  },

  methods: {
    async getSearchResults() {
      const res = await getSearchResults({
        page: this.page,
        per_page: this.pre_page,
        q: this.keyWord
      })
      if (res.status === 401) {
        this.$toast.fail('登录已过期，请重新登录')
        this.$router.push('/login')
        return
      }
      this.list.push(...res.data.data.results)
      this.loading = false
      if (res.data.data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
