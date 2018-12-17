// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from './store'
import Mint from 'mint-ui'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'

Vue.use(Mint);

Vue.config.productionTip = false
fastclick.attach(document.body)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuex,
  render:h=>h(App)
})
