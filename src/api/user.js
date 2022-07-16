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
