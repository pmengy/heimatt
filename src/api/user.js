import request from '@/utils/request'

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

/**
 * 关注用户
 * @param {String} target 关注用户的id
 * @returns Promise
 */
export const followUser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target }
  })
}

/**
 * 取消关注用户
 * @param {String} target 取消关注用户的id
 * @returns Promise
 */
export const cancelFollowUser = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 获取用户个人信息
 * @returns Promise
 */
export const getUserDetailInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑个人信息
 * @param {Object} data name gender birthday real_name intro
 * @returns Promise
 */
export const editUserInfo = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
