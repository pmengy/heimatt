# heima-m

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 移动端适配
### rem动态
amfe-flexible
不管处于什么分辨率, 1rem始终是 1/10视口大小

### 将px --> rem
postcss-pxtorem
vant官网
版本是5.1.1

### axios
await 修饰一个Promise对象
try{} catch(error){}
1   res 拿到的是 axios 对本次请求 resolve 封装后的结果
服务器返回的真正数据在 res.data
服务器返回的状态码 res.status
2   error 拿到的是 axios 对本次请求 reject 封装后的结果
服务器返回的真正数据在 error.response.data
服务器返回的状态码 error.response.status

### vuex
1   从vuex里面获取数据
~~~ this.$store.state.变量名
2   vuex的数据必须在vuex里修改数据
  mutations 声明一个方法去修改
  mutations 里的方法 第一个参数是state 第二个参数是传过来的数据
3   怎么去调用mutations的方法
  $store.commit(mutations里的方法名，参数)
