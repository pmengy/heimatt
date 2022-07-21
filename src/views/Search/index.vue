<template>
  <div>
    <!-- 搜索 -->
    <form action="/">
      <van-search
        class="search"
        v-model="keyWord"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="VisibleSearchSuggestion"
      />
    </form>
    <!-- 搜索历史
    <search-history></search-history>
    搜索建议
    <search-suggestion></search-suggestion>
    搜索结果
    <search-result></search-result> -->
    <component
      :is="componentName"
      :keyWord="keyWord"
      @goSearch="searchSuggestions"
      @search="search"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
// 引入storage
import storage from '@/utils/storage'
export default {
  name: 'Search',

  data() {
    return {
      keyWord: '',
      searchHistory: storage.get('searchList') || [],
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  computed: {
    componentName() {
      if (this.keyWord.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchSuggestion'
      }
      return 'SearchResult'
    }
  },

  mounted() {},

  methods: {
    // 搜索框按下回车时触发
    onSearch() {
      this.isShowSearchResult = false
      const index = this.searchHistory.indexOf(this.keyWord)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(this.keyWord)
    },
    // 点击取消时触发
    onCancel() {
      this.$router.go(-1)
    },
    VisibleSearchSuggestion() {
      this.isShowSearchResult = true
    },
    searchSuggestions(val) {
      this.keyWord = val
      this.onSearch()
    },
    search(val) {
      this.keyWord = val
      this.onSearch()
    }
  },
  watch: {
    searchHistory(val) {
      if (storage.get('searchList')) {
        storage.set('searchList', [])
      }
      storage.set('searchList', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
