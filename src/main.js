import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './permission.js'

Vue.use(Element);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })