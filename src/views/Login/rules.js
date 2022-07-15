export const mobileRules = [
  { require: true, message: '请输入手机号' },
  {
    pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    message: '手机号格式不正确'
  }
]

export const codeRules = [
  { require: true, message: '请输入验证码' },
  { pattern: /^[0-9]{6}$/, message: '请输入六位数的验证码' }
]
