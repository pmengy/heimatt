import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索建议的关键词
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 获取搜索结果
 * @param {Object} params page per_page q
 * @returns Promise
 */
export const getSearchResults = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
