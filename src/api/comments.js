import request from '@/utils/request'

/**
 * 获取文章评论以及评论的回复
 * @param {Object} params type source offset limit
 * @returns Promise
 */
export const getCommentList = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
