<template>
  <div>
    <van-cell title="搜索历史">
      <template #right-icon>
        <div style="color: #969799">
          <van-icon
            name="delete-o"
            v-if="isShowDelete"
            @click="isShowDelete = false"
          />
          <div v-else>
            <span @click="delAll">全部删除</span>&nbsp;&nbsp;
            <span @click="isShowDelete = true">完成</span>
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="search(index)"
    >
      <template>
        <van-icon name="cross" v-show="!isShowDelete" @click="del(item)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  name: 'SearchHistory',

  data() {
    return {
      isShowDelete: true,
      searchHistory: []
    }
  },
  created() {
    this.searchHistory = storage.get('searchList')
  },

  methods: {
    del(val) {
      const index = this.searchHistory.findIndex((item) => val === item)
      this.searchHistory.splice(index, 1)
    },
    delAll() {
      this.searchHistory = []
      this.isShowDelete = true
    },
    search(index) {
      this.$emit('search', this.searchHistory[index])
    }
  },
  watch: {
    searchHistory(val) {
      storage.set('searchList', val)
    }
  }
}
</script>

<style lang="less" scoped></style>
