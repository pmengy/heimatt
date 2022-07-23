<template>
  <div>
    <CommentItem :commentList="commentList"></CommentItem>
  </div>
</template>

<script>
import { getCommentList } from '@/api'
import CommentItem from './CommentItem.vue'
export default {
  name: 'Comments',

  data() {
    return {
      commentList: []
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
      const res = await getCommentList({ type: 'a', source: this.art_id })
      this.commentList = res.data.data.results
    }
  }
}
</script>

<style lang="less" scoped></style>
