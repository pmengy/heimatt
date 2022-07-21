<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highLightData"
      :key="index"
      @click="goSearch(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',

  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    highLightData() {
      const reg = new RegExp(this.keyWord, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  },
  props: {
    // 搜索关键词
    keyWord: {
      type: String,
      required: true
    }
  },
  created() {},

  methods: {
    async getSearchSuggestion() {
      try {
        const {
          data: { data }
        } = await getSearchSuggestion(this.keyWord)
        // 过滤后台返回数据的假值
        this.suggestions = data.options.filter(Boolean)
        if (this.suggestions.length === 0) {
          this.$toast('暂无搜索建议')
        }
      } catch (error) {
        console.log(error)
      }
    },
    goSearch(index) {
      this.$emit('goSearch', this.suggestions[index])
    }
  },
  watch: {
    // 监视属性绑定的函数,如果是methods里面的方法的话,支持字符串的写法
    keyWord: {
      handler: debounce(function () {
        this.getSearchSuggestion()
      }, 100),

      immediate: true
    }
  }
}
</script>

<style lang="less" scoped></style>
