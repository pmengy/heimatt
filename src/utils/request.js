import axios from 'axios'

const request = axios.create({
  // 请求根路径
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 请求拦截器

// 相应拦截器

export default request
