import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iconfont
import '@/assets/fonts/iconfont.css'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible/index.min.js'
import showdown from 'showdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
Vue.use(showdown)
Vue.use(Vant)

Vue.config.productionTip = false
// 代码高亮
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
