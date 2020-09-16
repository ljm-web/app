import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { post ,get } from './request/http.js' 
Vue.prototype.$post = post;
Vue.prototype.$get = get;

//富文本的引用
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './mock/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
