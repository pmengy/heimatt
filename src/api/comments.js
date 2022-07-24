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

/**
 * 对评论或评论回复点赞
 * @param {String} target 点赞的评论id
 * @returns Promise
 */
export const likeComment = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: { target }
  })
}

/**
 * 取消对评论或评论回复点赞
 * @param {String} target 取消点赞的评论id
 * @returns Promise
 */
export const cancelLikeComment = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 对文章或者评论进行评论
 * @param {Object} data target 评论的目标 id content 评论内容 art_id 文章id
 * @returns Promise
 */
export const publishComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
