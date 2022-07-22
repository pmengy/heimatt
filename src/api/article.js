import request from '@/utils/request'
/**
 * 获取文章详情
 * @param {String} articleId 文章id
 * @returns Promise
 */
export const getArticleInfo = (article_id) => {
  return request({
    url: '/v1_0/articles/' + article_id
  })
}

/**
 * 对文章点赞
 * @param {String} target 文章id
 * @returns Promise
 */
export const likingArticle = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target }
  })
}

/**
 * 取消文章点赞
 * @param {String} target 文章id
 * @returns Promise
 */
export const cancelLikingArticle = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 收藏文章
 * @param {String} target 文章id
 * @returns Promise
 */
export const collectArticle = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target }
  })
}

/**
 * 取消收藏文章
 * @param {String} target 文章id
 * @returns Promise
 */
export const cancelCollectArticle = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
